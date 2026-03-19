import data from '@data/Data.json';
import labels from '@data/Labels.json';
import componentLabels from '@data/ComponentLabels.json';
import {normalizeSiteLocale, withZhHantFallback} from '@utils/siteI18n';

const zhHantData =
    (import.meta.glob('/src/data/generated/zh-Hant/Data.json', {
        eager: true,
        import: 'default',
    })['/src/data/generated/zh-Hant/Data.json'] as any | undefined) ??
    withZhHantFallback(data);

const zhHantLabels =
    (import.meta.glob('/src/data/generated/zh-Hant/Labels.json', {
        eager: true,
        import: 'default',
    })['/src/data/generated/zh-Hant/Labels.json'] as any | undefined) ??
    withZhHantFallback(labels);

const zhHantComponentLabels =
    (import.meta.glob('/src/data/generated/zh-Hant/ComponentLabels.json', {
        eager: true,
        import: 'default',
    })['/src/data/generated/zh-Hant/ComponentLabels.json'] as any | undefined) ??
    withZhHantFallback(componentLabels);

export function getData(locale?: string | null) {
    return normalizeSiteLocale(locale) === 'zh-Hant' ? zhHantData : data;
}

export function getLabels(locale?: string | null) {
    return normalizeSiteLocale(locale) === 'zh-Hant' ? zhHantLabels : labels;
}

export function getComponentLabels(locale?: string | null) {
    return normalizeSiteLocale(locale) === 'zh-Hant'
        ? zhHantComponentLabels
        : componentLabels;
}

export const Data: any = data;
export const Labels: any = labels;
