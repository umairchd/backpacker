export interface CustomDropdownItemProps {
  onSelect: (eventKey: string, e: any) => void;
  eventKey: string;
  children: React.ReactNode;
  className?: string;
}

export interface CustomDropdownItemProps {
  onSelect: (eventKey: string, e: any) => void;
  eventKey: string;
}

export interface CustomDropdownProps {
  onSelect: (eventKey: string, e: any) => void;
  children: React.ReactNode;
}

export interface CurrencyDropdownMobileProps {
  title: string;
  contentEl: JSX.Element;
}
