export const productVersions = [
    {
        id: 'lyricify-4',
        badge: {
            'zh-CN': '推荐',
            en: 'Recommended',
        },
        name: {
            'zh-CN': 'Lyricify 4',
            en: 'Lyricify 4',
        },
        summary: {
            'zh-CN': '面向 Spotify 的完整桌面歌词与增强功能方案，适合 Windows 用户。',
            en: 'A full desktop lyrics and enhancement solution for Spotify, designed for Windows users.',
        },
        bestFor: {
            'zh-CN': '适合：主要在 Windows 上使用 Spotify，并需要完整歌词、管理与高级功能的用户。',
            en: 'Best for: Windows users who primarily use Spotify and want the full lyrics, management, and advanced feature set.',
        },
        platforms: {
            'zh-CN': '平台：Windows',
            en: 'Platform: Windows',
        },
        requirement: {
            'zh-CN': '运行要求：.NET Desktop Runtime 6.0',
            en: '.NET Desktop Runtime 6.0 required',
        },
        docsUrl: {
            'zh-CN': 'https://docs.lyricify.app/lyricify-4/guide/',
            en: 'https://docs.lyricify.app/en/lyricify-4/guide/',
        },
        downloads: [
            {
                kind: 'store',
                url: 'https://apps.microsoft.com/store/detail/9P4WB75RHWCH?launch=true&mode=full',
            },
            {
                kind: 'link',
                label: {
                    'zh-CN': 'GitHub Releases',
                    en: 'GitHub Releases',
                },
                url: 'https://github.com/WXRIW/Lyricify-App/releases',
            },
        ],
    },
    {
        id: 'lyricify-lite',
        badge: {
            'zh-CN': '轻量',
            en: 'Lightweight',
        },
        name: {
            'zh-CN': 'Lyricify Lite',
            en: 'Lyricify Lite',
        },
        summary: {
            'zh-CN': '面向支持 SMTC 的 Windows 播放器，提供桌面歌词与灵动词岛等轻量功能。',
            en: 'Desktop lyrics and Dynamic Island style lyrics for Windows players that support SMTC.',
        },
        bestFor: {
            'zh-CN': '适合：不主要使用 Spotify，而是使用 Apple Music、QQ 音乐、网易云音乐等 Windows 播放器的用户。',
            en: 'Best for: Windows users who do not mainly use Spotify and instead use Apple Music, QQ Music, Netease Cloud Music, or other SMTC-enabled players.',
        },
        platforms: {
            'zh-CN': '平台：Windows',
            en: 'Platform: Windows',
        },
        requirement: {
            'zh-CN': '运行要求：.NET Desktop Runtime 8.0',
            en: '.NET Desktop Runtime 8.0 required',
        },
        docsUrl: {
            'zh-CN': 'https://docs.lyricify.app/lyricify-lite/guide/',
            en: 'https://docs.lyricify.app/en/lyricify-lite/guide/',
        },
        downloads: [
            {
                kind: 'store',
                url: 'https://apps.microsoft.com/store/detail/9NLTPSV395K2?launch=true&mode=full',
            },
            {
                kind: 'link',
                label: {
                    'zh-CN': 'GitHub Releases',
                    en: 'GitHub Releases',
                },
                url: 'https://github.com/WXRIW/Lyricify-App/releases',
            },
        ],
    },
    {
        id: 'lyricify-mobile',
        badge: {
            'zh-CN': '跨平台',
            en: 'Cross-platform',
        },
        name: {
            'zh-CN': 'Lyricify Mobile',
            en: 'Lyricify Mobile',
        },
        summary: {
            'zh-CN': '面向 Android、iPhone、iPad、macOS 等平台的移动端歌词体验。',
            en: 'A mobile lyrics experience for Android, iPhone, iPad, macOS, and more.',
        },
        bestFor: {
            'zh-CN': '适合：需要在手机、平板、Apple 设备或跨平台场景下使用 Lyricify 的用户。',
            en: 'Best for: users who want Lyricify on phones, tablets, Apple devices, or across multiple platforms.',
        },
        platforms: {
            'zh-CN': '平台：Android / iPhone / iPad / macOS / Windows 内置视图',
            en: 'Platforms: Android / iPhone / iPad / macOS / built-in Windows view',
        },
        requirement: {
            'zh-CN': '安装提示：Apple 设备可参考自签安装教程',
            en: 'Install note: Apple devices may require the sideloading guide',
        },
        docsUrl: {
            'zh-CN': 'https://docs.lyricify.app/lyricify-mobile/guide/',
            en: 'https://docs.lyricify.app/en/lyricify-mobile/guide/',
        },
        downloads: [
            {
                kind: 'link',
                label: {
                    'zh-CN': 'GitHub Releases',
                    en: 'GitHub Releases',
                },
                url: 'https://github.com/WXRIW/Lyricify-App/releases',
            },
            {
                kind: 'link',
                label: {
                    'zh-CN': 'Apple 设备安装教程',
                    en: 'Apple Device Install Guide',
                },
                url: 'https://docs.lyricify.app/lyricify-mobile/ios-ipa-guide/',
                urlEn: 'https://docs.lyricify.app/en/lyricify-mobile/ios-ipa-guide/',
            },
        ],
    },
    {
        id: 'lyricify-3',
        badge: {
            'zh-CN': '旧版本',
            en: 'Legacy',
        },
        name: {
            'zh-CN': 'Lyricify 3',
            en: 'Lyricify 3',
        },
        summary: {
            'zh-CN': 'Lyricify 3 已停止功能更新与维护，适合仍在使用旧工作流或历史版本的用户。',
            en: 'Lyricify 3 has reached end of life and is only intended for users who still rely on older workflows or historical builds.',
        },
        bestFor: {
            'zh-CN': '适合：仅在确实需要旧版兼容性时使用。新用户建议直接选择 Lyricify 4。',
            en: 'Best for: legacy compatibility only. New users should go straight to Lyricify 4.',
        },
        platforms: {
            'zh-CN': '状态：已于 2024 年 6 月结束功能更新与维护',
            en: 'Status: feature updates and maintenance ended in June 2024',
        },
        requirement: {
            'zh-CN': '说明：仅作为历史版本保留',
            en: 'Note: retained as a historical version only',
        },
        docsUrl: {
            'zh-CN': 'https://github.com/WXRIW/Lyricify-App/blob/main/docs/Lyricify%203/README.md',
            en: 'https://github.com/WXRIW/Lyricify-App/blob/main/docs/Lyricify%203/README.md',
        },
        downloads: [
            {
                kind: 'link',
                label: {
                    'zh-CN': 'GitHub Releases',
                    en: 'GitHub Releases',
                },
                url: 'https://github.com/WXRIW/Lyricify-App/releases',
            },
            {
                kind: 'link',
                label: {
                    'zh-CN': '旧版使用指南',
                    en: 'Legacy Guide',
                },
                url: 'https://github.com/WXRIW/Lyricify-App/blob/main/docs/Lyricify%203/README.md',
            },
        ],
    },
] as const;
