// Types of scripts/lib/presskit.mjs for the press kit page (press-kit D2).
export interface PressFile { label: string; href: string; size: string }
export interface PressItem { id: string; title: string; alt: string; background: 'light' | 'dark'; preview?: string; files: PressFile[] }
export interface PressGroup { id: string; title: string; use: string; items: PressItem[] }
export interface PressKit { full: boolean; groups: PressGroup[] }
export function pressKit(bundleDir: string): PressKit;
