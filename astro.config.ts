import starlight from '@astrojs/starlight';
import {defineConfig} from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://lyricify.app',
    integrations: [
        starlight({
            title: 'Lyricify',
            logo: {
                src: '/public/LyricifyIcon.png',
            },
            favicon: 'favicon.ico',
            social: {
                github: 'https://github.com/WXRIW/Lyricify-App',
            },
            sidebar: [
                {
                    label: 'Get started',
                    autogenerate: {directory: 'get-started'},
                    translations: {
                        'zh-CN': '快速上手',
                    },
                },
                {
                    label: 'FAQ',
                    autogenerate: {directory: 'faq'},
                    translations: {
                        'zh-CN': '常见问题',
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
                    },
                    link: '/i18n-instruction',
                    badge: {
                        text: 'NEW',
                        variant: 'default'
                    },
                }
            ],
            customCss: [
                './src/styles/custom.css',
                './src/fonts/fontface.css',
            ],
            components: {
                Footer: './src/components/rewrite/Footer.astro',
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
            },
            plugins: [],
        }),
    ],
    trailingSlash: 'always',
    build: {
        assets: '_asset'
    }
});
