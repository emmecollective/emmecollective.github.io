const { description } = require('../../package')
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from '@vuepress/utils'
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  markdown: {
    lineNumbers: false,
    anchor: false,
  },
  base: '/Cafe/',
  lang: 'ko-KR',
  title: 'emme',
  description: description,
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "./favicons/apple-touch-icon.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "./favicons/favicon-32x32.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "./favicons/favicon-16x16.png" }],
    ['meta', { name: 'theme-color', media:"(prefers-color-scheme: light)", content: 'white' }],
    ['meta', { name: 'theme-color', media:"(prefers-color-scheme: dark)", content: '#22272e' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    /*
    googleAnalyticsPlugin({
      id: 'G-123456789',
    }),
    */
  ],
  theme: defaultTheme({
    // set config here
    logo: './logo_original.png',
    navbar: [
      {
        text: 'About',
        link: '/about/'
        //children: ['/intro/README.md', '/intro/contact-us.md']
      },
      {
        text: 'Menu1',
        link: '/menu/'
      },
      {
        text: 'Menu2',
        link: '/menu2/'
      },
      {
        text: 'Location',
        link: '/location/'
      },
    ],
    sidebar: {
      '/intro/': [
        {
          text: 'Introduction',
          collapsable: true,
          children: [
            '/intro/README.md',
            '/intro/benefit.md',
            '/intro/contact-us.md',
          ]
        }
      ],
      '/guide/': [
        {
          text: 'Guild System Guide',
          collapsable: true,
          children: [
            '/guide/README.md',
            '/guide/guild-window.md',
            '/guide/guild-member-list.md',
            '/guide/guild-quest.md',
            '/guide/guild-boss-raid.md'
          ]
        }
      ],
    },
    lastUpdated: false,
    contributors: false
  }),
})