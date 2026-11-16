// The API reference (api-reference): the pinned release's OpenAPI description, read from the
// bundle's api/openapi.json at build time and turned into plain data for static pages. A bundle
// without the file (releases before the description existed) yields null, and no page is built.
import fs from 'node:fs';
import path from 'node:path';
import { bundle } from './bundle';

type Json = any;

export interface Field { name: string; type: string; required: boolean; description: string; ref?: string }
export interface Body { ref?: string; fields: Field[] }
export interface Operation {
  method: string; path: string; id: string; summary: string; description: string;
  auth: string; deprecated: boolean; params: Field[]; request?: Body; responses: { status: string; description: string; body?: Body }[];
}
export interface Group { name: string; slug: string; description: string; docs?: string; operations: Operation[] }
export interface Api { version: string; groups: Group[]; schemas: { name: string; description: string; fields: Field[] }[] }

const file = path.join(bundle.dir, 'api/openapi.json');
const doc: Json | null = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : null;

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const refName = (r: string) => r.split('/').pop() ?? r;

/** A schema's type in words: "string", "integer | null", "Task", "array of Task". */
export function typeOf(s: Json): string {
  if (!s || typeof s !== 'object') return 'any';
  if (s.$ref) return refName(s.$ref);
  if (s.allOf) return s.allOf.map(typeOf).join(' + ');
  if (s.anyOf || s.oneOf) return (s.anyOf ?? s.oneOf).map(typeOf).join(' | ');
  if (s.enum) return s.enum.map((v: unknown) => JSON.stringify(v)).join(' | ');
  const t = Array.isArray(s.type) ? s.type : s.type ? [s.type] : [];
  if (t.includes('array')) return `array of ${typeOf(s.items)}`.replace('array of any', 'array');
  return t.length ? t.join(' | ') + (s.format ? ` (${s.format})` : '') : 'any';
}

/** Rows for an object schema: its properties, nested objects as dotted names, at most three deep. */
export function fieldsOf(s: Json, prefix = '', depth = 0): Field[] {
  if (!s || typeof s !== 'object') return [];
  if (s.allOf) return s.allOf.flatMap((p: Json) => (p.$ref ? [] : fieldsOf(p, prefix, depth)));
  const props = s.properties ?? (s.items?.properties ? s.items.properties : null);
  if (!props) return [];
  const required = new Set<string>(s.required ?? []);
  const out: Field[] = [];
  for (const name of Object.keys(props).sort()) {
    const p = props[name];
    const ref = p.$ref ? refName(p.$ref) : p.items?.$ref ? refName(p.items.$ref) : undefined;
    out.push({ name: prefix + name, type: typeOf(p), required: required.has(name), description: p.description ?? '', ref });
    const inner = p.type === 'array' ? p.items : p;
    if (depth < 2 && inner && !inner.$ref && (inner.properties || inner.allOf)) out.push(...fieldsOf(inner, `${prefix}${name}${p.type === 'array' ? '[]' : ''}.`, depth + 1));
  }
  return out;
}

const bodyOf = (s: Json): Body | undefined => {
  if (!s) return undefined;
  const ref = s.$ref ? refName(s.$ref) : s.allOf?.find((p: Json) => p.$ref) ? refName(s.allOf.find((p: Json) => p.$ref).$ref) : undefined;
  return { ref, fields: fieldsOf(s) };
};

function authOf(op: Json): string {
  if (Array.isArray(op.security) && op.security.length === 0) return 'No authentication';
  if (Array.isArray(op.security) && op.security.length === 1 && op.security[0].session) return 'Session only';
  return 'Token or session';
}

function build(d: Json): Api {
  const tagInfo = new Map<string, Json>((d.tags ?? []).map((t: Json) => [t.name, t]));
  const groups = new Map<string, Group>();
  for (const [p, item] of Object.entries<Json>(d.paths ?? {})) {
    for (const [method, op] of Object.entries<Json>(item)) {
      const name: string = op.tags?.[0] ?? 'Other';
      if (!groups.has(name)) {
        const t = tagInfo.get(name) ?? {};
        groups.set(name, { name, slug: slugify(name), description: t.description ?? '', docs: t.externalDocs?.url, operations: [] });
      }
      const json = (c: Json) => c?.content?.['application/json']?.schema;
      groups.get(name)!.operations.push({
        method: method.toUpperCase(), path: p, id: op.operationId, summary: op.summary ?? '', description: op.description ?? '',
        auth: authOf(op), deprecated: !!op.deprecated,
        params: (op.parameters ?? []).map((x: Json) => ({ name: x.name, type: typeOf(x.schema), required: !!x.required, description: x.in })),
        request: bodyOf(json(op.requestBody)),
        responses: Object.entries<Json>(op.responses ?? {}).filter(([st]) => /^2|^3/.test(st)).map(([status, r]) => ({ status, description: r.description ?? '', body: bodyOf(json(r)) })),
      });
    }
  }
  const order = (o: Operation) => `${o.path} ${['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].indexOf(o.method)}`;
  const list = [...groups.values()].sort((a, b) => a.name.localeCompare(b.name));
  for (const g of list) g.operations.sort((a, b) => order(a).localeCompare(order(b)));
  const schemas = Object.entries<Json>(d.components?.schemas ?? {}).sort(([a], [b]) => a.localeCompare(b))
    .map(([name, s]) => ({ name, description: s.description ?? '', fields: fieldsOf(s) }));
  return { version: d.info?.version ?? '', groups: list, schemas };
}

export const api: Api | null = doc ? build(doc) : null;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The inline Markdown the description uses (code, bold, links), as safe HTML; everything else is escaped. */
export function inline(md: string): string {
  return esc(md)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*|#[^)\s]*)\)/g, (_m, text, url) => `<a href="${url.replace(/^https:\/\/open-todo\.app/, '')}">${text}</a>`)
    .replace(/\n\n+/g, '</p><p>');
}
