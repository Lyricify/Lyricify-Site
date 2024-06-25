// import {Data} from "dataclass";

export type translatableString = Record<string, string> | string;

/*
export class Community extends Data {
    name: i18nString;
    value: string;
    isFull: boolean = false;
}
*/

export class Community {
    name: translatableString;
    value: string;
    url: string | null;
    isFull: boolean = false;

    constructor({name, value, isFull = false}: { name: translatableString, value: string, url?: string, isFull?: boolean }) {
        this.name = name;
        this.value = value;
        this.url = url;
        this.isFull = isFull;
    };
}