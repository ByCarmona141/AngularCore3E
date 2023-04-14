export interface Menu {
  id: string;
  name: string;
  ref: string;
  icon: string;
  prioridad: number;
  items: Menu[];
}
