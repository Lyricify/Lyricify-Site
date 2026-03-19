import {normalizeSiteLocale} from '@utils/siteI18n';

import {productVersions as baseProductVersions} from '@data/ProductVersions.data';

const zhHantProductVersionsModule = import.meta.glob(
    '/src/data/generated/zh-Hant/ProductVersions.data.ts',
    {eager: true},
)['/src/data/generated/zh-Hant/ProductVersions.data.ts'] as
    | {productVersions: typeof baseProductVersions}
    | undefined;

const zhHantProductVersions =
    zhHantProductVersionsModule?.productVersions ?? baseProductVersions;

export const productVersions = baseProductVersions;

export function getProductVersions(locale?: string | null) {
    return normalizeSiteLocale(locale) === 'zh-Hant'
        ? zhHantProductVersions
        : baseProductVersions;
}
