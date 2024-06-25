export type translatableString = Record<string, string> | string;

export class Community {
    name: translatableString;
    value: string;
    url: string | null = null;
    isFull: boolean = false;

    constructor({name, value, url = null, isFull = false}: {
        name: translatableString,
        value: string,
        url?: string,
        isFull?: boolean
    }) {
        this.name = name;
        this.value = value;
        this.url = url;
        this.isFull = isFull;
    };
}