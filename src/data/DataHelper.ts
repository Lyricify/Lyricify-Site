import data from '@data/Data.json';
import labels from '@data/Labels.json'

export const Data: object = data;
export const Labels: object = labels;

export function useArgs(origin: string, variables: Record<string, string>): string {
    let output: string = origin;
    Object.entries(variables).map(([key, item]) => {
        output = output.replace(new RegExp(`\\[${key}]`), item);
    })
    return output;
}

export const t = (translatable: object, locale: string) => {
    return translatable[locale]
}