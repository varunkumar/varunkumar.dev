export const VALID_PAGES = new Set(['home', 'projects', 'about']);

export function pageFromPath(pathname = window.location.pathname) {
  const seg = pathname.replace(/^\//, '') || 'home';
  return VALID_PAGES.has(seg) ? seg : 'home';
}
