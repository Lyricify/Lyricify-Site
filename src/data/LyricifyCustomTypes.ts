export type translatable = Record<string, any> | string;

export class Community {
  name: translatable;
  value: string;
  url: string | null = null;
  isFull: boolean = false;

  constructor({
    name,
    value,
    url = null,
    isFull = false,
  }: {
    name: translatable;
    value: string;
    url?: string;
    isFull?: boolean;
  }) {
    this.name = name;
    this.value = value;
    this.url = url;
    this.isFull = isFull;
  }
}
