export type SiteLocale = 'en' | 'zh-CN' | 'zh-Hant';
export type SiteTranslationKey = 'en' | 'zh-CN';

export function normalizeSiteLocale(locale?: string | null): SiteLocale {
    const normalized = (locale ?? '').toLowerCase();

    if (!normalized || normalized === 'root' || normalized.startsWith('en')) {
        return 'en';
    }

    if (
        normalized.startsWith('zh-hant') ||
        normalized.startsWith('zh-tw') ||
        normalized.startsWith('zh-hk') ||
        normalized.startsWith('zh-mo')
    ) {
        return 'zh-Hant';
    }

    if (normalized.startsWith('zh')) {
        return 'zh-CN';
    }

    return 'en';
}

export function getSiteTranslationKey(
    locale?: string | null,
): SiteTranslationKey {
    return normalizeSiteLocale(locale) === 'en' ? 'en' : 'zh-CN';
}

export function translateSiteValue(
    value: string | Record<string, string>,
    locale?: string | null,
) {
    if (typeof value === 'string') {
        return value;
    }

    const normalizedLocale = normalizeSiteLocale(locale);
    const translationKey = getSiteTranslationKey(normalizedLocale);

    return (
        value[normalizedLocale] ??
        value[translationKey] ??
        value.en ??
        value.root ??
        Object.values(value).find(
            (entry): entry is string => typeof entry === 'string',
        ) ??
        ''
    );
}

export function withZhHantFallback<T>(value: T): T {
    if (Array.isArray(value)) {
        return value.map((entry) => withZhHantFallback(entry)) as T;
    }

    if (!value || typeof value !== 'object') {
        return value;
    }

    const record = value as Record<string, unknown>;
    const nextValue: Record<string, unknown> = {};

    for (const [key, entry] of Object.entries(record)) {
        nextValue[key] = withZhHantFallback(entry);
    }

    if ('zh-CN' in record && !('zh-Hant' in record)) {
        nextValue['zh-Hant'] = withZhHantFallback(record['zh-CN']);
    }

    return nextValue as T;
}

export function getSitePathPrefix(locale?: string | null) {
    const normalizedLocale = normalizeSiteLocale(locale);

    if (normalizedLocale === 'zh-CN') {
        return '/zh-cn';
    }

    if (normalizedLocale === 'zh-Hant') {
        return '/zh-hant';
    }

    return '';
}

export function localizeDocsUrl(url: string, locale?: string | null) {
    try {
        const normalizedLocale = normalizeSiteLocale(locale);
        const parsedUrl = new URL(url);

        if (parsedUrl.origin !== 'https://docs.lyricify.app') {
            return url;
        }

        const pathname = parsedUrl.pathname.replace(/\/{2,}/g, '/');

        if (normalizedLocale === 'zh-Hant') {
            parsedUrl.pathname =
                pathname === '/' || pathname === ''
                    ? '/zh-hant/'
                    : pathname.startsWith('/zh-hant/') ||
                        pathname.startsWith('/en/')
                      ? pathname
                      : `/zh-hant${pathname}`.replace(/\/{2,}/g, '/');
            return parsedUrl.toString();
        }

        if (normalizedLocale === 'en') {
            parsedUrl.pathname =
                pathname === '/' || pathname === ''
                    ? '/en/'
                    : pathname.startsWith('/en/') ||
                        pathname.startsWith('/zh-hant/')
                      ? pathname
                      : `/en${pathname}`.replace(/\/{2,}/g, '/');
            return parsedUrl.toString();
        }

        if (pathname === '/zh-hant') {
            parsedUrl.pathname = '/';
            return parsedUrl.toString();
        }

        if (pathname.startsWith('/zh-hant/')) {
            parsedUrl.pathname = pathname.replace(/^\/zh-hant\//, '/');
            return parsedUrl.toString();
        }

        return url;
    } catch {
        return url;
    }
}
