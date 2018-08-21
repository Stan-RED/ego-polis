export interface MenuItem {
  label: string;

  action?: () => void;
  children? : Array<MenuItem>;
  icon?: any;
}
