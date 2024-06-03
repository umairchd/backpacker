export function stripSiteFromPathname(pathname: string) {
  return pathname?.replace(/\/sites\/\w*\/[a-zA-Z0-9]*\/[a-z]*\//, `/`);
}
