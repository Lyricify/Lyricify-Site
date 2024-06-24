import {Data} from "dataclass";

export type i18nString = Record<string, string>

/*
export class Community extends Data {
    name: i18nString;
    value: string;
    isFull: boolean = false;
}
*/

export class Community {
    name: i18nString;
    value: string;
    isFull: boolean = false;

    constructor({name, value, isFull = false}: { name: i18nString, value: string, isFull?: boolean }) {
        this.name = name;
        this.value = value;
        this.isFull = isFull;
    };
}