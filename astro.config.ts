import starlight from '@astrojs/starlight';
import {defineConfig} from 'astro/config';

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: 'Lyricify',
            logo: {
                src: '/src/assets/icon.webp',
            },
            social: {
                github: 'https://github.com/WXRIW/Lyricify-App',
            },
            sidebar: [
                {
                    label: '快速上手',
                    autogenerate: {directory: 'get-started'}
                },
                {
                    label: '常见问题',
                    autogenerate: {directory: 'faq'},
                },
            ],
            customCss: [
                // 你的自定义 CSS 文件的相对路径
                './src/styles/custom.css',
                './src/fonts/fontface.css',
            ],
            components: {

            }
        }),
    ],
});
