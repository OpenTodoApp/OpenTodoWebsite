// Focus boxes for cropped screenshots (website-section-system D3), in percent of the
// screenshot's width and height. The bundle lists screenshots by path only, so the
// site keeps the boxes; they are relative, so a new release's capture of the same
// screen keeps working, and the bundle-bump preview shows it if a screen moved.
export interface Crop { x: number; y: number; w: number; h: number }

export const crops: Record<string, Crop> = {
  // The assistant panel and its proposed change set, right of the Inbox.
  assistant: { x: 62.5, y: 0, w: 37.5, h: 66 },
  // The Loop home (docs image): the sidebar arranged by the Places, and the Catch and Clarify tiles.
  loop: { x: 0, y: 0, w: 70, h: 64 },
  // The Today list, overdue first, without the sidebar.
  today: { x: 30, y: 3, w: 56, h: 60 },
};
