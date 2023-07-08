export interface DataForm {
  field: string;
  label: string;
  type: string;
  message: string;
  placeholder?: string;
  items?: any;
  empty?: boolean;
  emptyMessage?: string;
  multiple?: boolean;
  readonly?: boolean;
  icon?: boolean;
  add?: boolean;
  service?: any;
  component?: any;
  rows?: number;
  cols?: number;
}
