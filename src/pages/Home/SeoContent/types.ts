export interface Item {
  id: number;
  title: string;
  description: string;
  href: string;
}

export interface TabItem {
  id: number;
  title: string;
  hrefs: Item[];
}
