export type translatable = Record<string, any> | string;

export class Community {
    name: translatable;
    value: string;
    url?: string;
    isFull?: boolean;

    constructor({
        name,
        value,
        url = void 0,
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
