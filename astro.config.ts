import starlight from '@astrojs/starlight';
import {defineConfig} from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://lyricify.app',
    integrations: [
        starlight({
            title: 'Lyricify',
            logo: {
                src: '/public/Lyricify-icon.png',
            },
            favicon: 'favicon.ico',
            social: {
                github: 'https://github.com/WXRIW/Lyricify-App',
            },
            head: [
                {
                    tag: 'meta',
                    attrs: {
                        name: 'keywords',
                        content:
                            'Lyricify, Spotify, lyrics, Apple Music, style, customization, ' +
                            '声破天, 歌词, 逐字, 滚动歌词, 苹果音乐, 动画, 自定义, 歌词软件',
                    },
                },
                {
                    tag: 'meta',
                    attrs: {
                        charset: 'UTF-8'
                    }
                },
                {
                    tag: 'meta',
                    attrs: {
                        name: 'viewport',
                        content: 'width=device-width, initial-scale=1.0',
                    },
                },
                {
                    tag: 'script',
                    content: `
                        (() => {
                            let removeScrollListener;
                            const homepageLocaleStorageKey =
                                'lyricify-homepage-locale';

                            const setHomepageLocalePreference = (locale) => {
                                try {
                                    window.localStorage.setItem(
                                        homepageLocaleStorageKey,
                                        locale
                                    );
                                } catch {}
                            };

                            const getHomepageLocalePreference = () => {
                                try {
                                    const locale = window.localStorage.getItem(
                                        homepageLocaleStorageKey
                                    );

                                    if (
                                        locale === 'root' ||
                                        locale === 'zh-cn' ||
                                        locale === 'zh-hant'
                                    ) {
                                        return locale;
                                    }
                                } catch {}

                                return undefined;
                            };

                            const getPreferredHomepageLocale = () => {
                                const storedLocale =
                                    getHomepageLocalePreference();

                                if (storedLocale) {
                                    return storedLocale;
                                }

                                const browserLanguages =
                                    window.navigator.languages?.length
                                        ? window.navigator.languages
                                        : [window.navigator.language];

                                for (const language of browserLanguages) {
                                    if (typeof language !== 'string') {
                                        continue;
                                    }

                                    const normalizedLanguage =
                                        language.toLowerCase();

                                    if (
                                        normalizedLanguage.startsWith(
                                            'zh-hant'
                                        ) ||
                                        normalizedLanguage.startsWith('zh-tw') ||
                                        normalizedLanguage.startsWith('zh-hk') ||
                                        normalizedLanguage.startsWith('zh-mo')
                                    ) {
                                        return 'zh-hant';
                                    }

                                    if (normalizedLanguage.startsWith('zh')) {
                                        return 'zh-cn';
                                    }
                                }

                                return 'root';
                            };

                            const bindHomepageLocalePreference = () => {
                                if (window.__lyricifyLocalePreferenceBound) {
                                    return;
                                }

                                window.__lyricifyLocalePreferenceBound = true;
                                document.addEventListener('change', (event) => {
                                    const target = event.target;

                                    if (!(target instanceof HTMLSelectElement)) {
                                        return;
                                    }

                                    if (!target.closest('starlight-lang-select')) {
                                        return;
                                    }

                                    const locale =
                                        target.value.startsWith('/zh-hant/') ||
                                        target.value === '/zh-hant'
                                            ? 'zh-hant'
                                            : target.value.startsWith(
                                                    '/zh-cn/'
                                                ) ||
                                                  target.value === '/zh-cn'
                                              ? 'zh-cn'
                                              : 'root';

                                    setHomepageLocalePreference(locale);
                                });
                            };

                            const applyHomepageLocaleRedirect = () => {
                                if (window.location.pathname !== '/') {
                                    return false;
                                }

                                const preferredLocale =
                                    getPreferredHomepageLocale();

                                if (preferredLocale === 'root') {
                                    return false;
                                }

                                const targetUrl = new URL(window.location.href);
                                targetUrl.pathname =
                                    preferredLocale === 'zh-hant'
                                        ? '/zh-hant/'
                                        : '/zh-cn/';
                                window.location.replace(targetUrl.toString());
                                return true;
                            };

                            const applyFontScheme = () => {
                                const pathname = window.location.pathname;
                                const isSpotifyPage =
                                    pathname === '/lyricify-4/' ||
                                    pathname === '/zh-cn/lyricify-4/' ||
                                    pathname === '/zh-hant/lyricify-4/';
                                const isDocsPage =
                                    pathname.startsWith('/get-started/') ||
                                    pathname.startsWith('/zh-cn/get-started/') ||
                                    pathname.startsWith('/zh-hant/get-started/') ||
                                    pathname.startsWith('/faq/') ||
                                    pathname.startsWith('/zh-cn/faq/') ||
                                    pathname.startsWith('/zh-hant/faq/') ||
                                    pathname === '/i18n-instruction/' ||
                                    pathname === '/zh-cn/i18n-instruction/' ||
                                    pathname === '/zh-hant/i18n-instruction/';
                                const shouldHideSearch = !isDocsPage;

                                if (isSpotifyPage) {
                                    document.documentElement.dataset.fontScheme = 'spotify';
                                } else {
                                    delete document.documentElement.dataset.fontScheme;
                                }

                                if (shouldHideSearch) {
                                    document.documentElement.dataset.hideSearch = 'true';
                                } else {
                                    delete document.documentElement.dataset.hideSearch;
                                }
                            };

                            const applyHeroHeaderVisibility = () => {
                                if (removeScrollListener) {
                                    removeScrollListener();
                                    removeScrollListener = undefined;
                                }

                                const root = document.documentElement;
                                const hasHero = root.hasAttribute('data-has-hero');

                                if (!hasHero) {
                                    root.style.setProperty('--hero-header-visibility', '1');
                                    return;
                                }

                                const updateVisibility = () => {
                                    const progress = Math.min(window.scrollY / 120, 1);
                                    root.style.setProperty(
                                        '--hero-header-visibility',
                                        progress.toFixed(3)
                                    );
                                };

                                updateVisibility();
                                window.addEventListener('scroll', updateVisibility, {
                                    passive: true,
                                });
                                removeScrollListener = () =>
                                    window.removeEventListener('scroll', updateVisibility);
                            };

                            const applyPageChrome = () => {
                                applyFontScheme();
                                applyHeroHeaderVisibility();
                            };

                            bindHomepageLocalePreference();

                            if (applyHomepageLocaleRedirect()) {
                                return;
                            }

                            applyPageChrome();
                            document.addEventListener('astro:page-load', applyPageChrome);
                        })();
                    `,
                },
            ],
            sidebar: [
                {
                    label: 'Get started',
                    autogenerate: {directory: 'get-started'},
                    translations: {
                        'zh-CN': '快速上手',
                        'zh-Hant': '快速上手',
                        'zh-hant': '快速上手',
                    },
                },
                {
                    label: 'FAQ',
                    autogenerate: {directory: 'faq'},
                    translations: {
                        'zh-CN': '常见问题',
                        'zh-Hant': '常見問題',
                        'zh-hant': '常見問題',
                    },
                },
                {
                    label: 'Lyricify Mobile',
                    items: [
                        // To be updated
                    ],
                },
                {
                    label: 'i18n Guide',
                    translations: {
                        'zh-CN': '本站 i18n 指导',
                        'zh-Hant': '本站 i18n 指導',
                        'zh-hant': '本站 i18n 指導',
                    },
                    link: '/i18n-instruction',
                    badge: {
                        text: 'NEW',
                        variant: 'default',
                    },
                },
            ],
            customCss: [
                './src/styles/custom.css',
                './src/fonts/fontface.css',
                './src/styles/theme.css',
            ],
            components: {
                Footer: './src/components/rewrite/Footer.astro',
                Header: './src/components/rewrite/Header.astro',
                Hero: './src/components/rewrite/Hero.astro',
            },
            defaultLocale: 'root',
            locales: {
                root: {
                    label: 'English',
                    lang: 'en',
                },
                'zh-cn': {
                    label: '简体中文',
                    lang: 'zh-CN',
                },
                'zh-hant': {
                    label: '繁體中文',
                    lang: 'zh-Hant',
                },
            },
            plugins: [],
        }),
    ],
    trailingSlash: 'always',
    build: {
        assets: '_asset',
    },
});
