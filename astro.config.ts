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
            ],
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
            },
            plugins: [],
        }),
    ],
    trailingSlash: 'always',
    build: {
        assets: '_asset',
    },
});
