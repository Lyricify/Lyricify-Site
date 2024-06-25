import starlight from '@astrojs/starlight';
import lunaria from '@lunariajs/starlight';
import {defineConfig} from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://lyricify.app',
    integrations: [
        starlight({
            title: 'Lyricify',
            logo: {
                src: '/src/assets/icon.webp',
            },
            favicon: 'favicon.ico',
            social: {
                github: 'https://github.com/WXRIW/Lyricify-App',
            },
            sidebar: [
                {
                    label: '快速上手',
                    autogenerate: {directory: 'get-started'},
                    translations: {
                        'en': 'Get started',
                    },
                },
                {
                    label: '常见问题',
                    autogenerate: {directory: 'faq'},
                    translations: {
                        'en': 'FAQ',
                    },
                },
                {
                    label: 'Lyricify mobile',
                    items: [
                        // To be updated
                    ],
                },
            ],
            customCss: [
                './src/styles/custom.css',
                './src/fonts/fontface.css',
            ],
            components: {

            },
            defaultLocale: 'root',
            locales: {
                root: {
                    label: '简体中文',
                    lang: 'zh-CN',
                },
                en: {
                    label: 'English',
                },
            },
            plugins: [lunaria({
                sync: true,
                route: "/i18n",
            })],
        }),
    ],
});
