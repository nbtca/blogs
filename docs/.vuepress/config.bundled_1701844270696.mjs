// docs/.vuepress/config.ts
import { defineConfig4CustomTheme } from "vuepress/config";
import dayjs from "dayjs";

// docs/.vuepress/config/baiduCode.ts
var baiduCode_default = "503f098e7e5b3a5b5d8c5fc2938af002";

// docs/.vuepress/config.ts
var DOMAIN_NAME = "xugaoyi.com";
var WEB_SITE = `https://${DOMAIN_NAME}`;
var config_default = defineConfig4CustomTheme({
  theme: "vdoing",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "nbtca's blog",
      description: "nbtca\u535A\u5BA2"
    }
  },
  themeConfig: {
    nav: [
      { text: "\u9996\u9875", link: "/" },
      {
        text: "\u524D\u7AEF",
        link: "/web/",
        items: [
          {
            text: "\u524D\u7AEF\u6587\u7AE0",
            items: [
              { text: "JavaScript", link: "/pages/8143cc480faf9a11/" }
            ]
          },
          {
            text: "\u5B66\u4E60\u7B14\u8BB0",
            items: [
              { text: "\u300AJavaScript\u6559\u7A0B\u300B", link: "/note/javascript/" },
              { text: "\u300AJavaScript\u9AD8\u7EA7\u7A0B\u5E8F\u8BBE\u8BA1\u300B", link: "/note/js/" },
              { text: "\u300AES6 \u6559\u7A0B\u300B", link: "/note/es6/" },
              { text: "\u300AVue\u300B", link: "/note/vue/" },
              { text: "\u300AReact\u300B", link: "/note/react/" },
              {
                text: "\u300ATypeScript \u4ECE\u96F6\u5B9E\u73B0 axios\u300B",
                link: "/note/typescript-axios/"
              },
              {
                text: "\u300AGit\u300B",
                link: "/note/git/"
              },
              {
                text: "TypeScript",
                link: "/pages/51afd6/"
              },
              {
                text: "JS\u8BBE\u8BA1\u6A21\u5F0F\u603B\u7ED3",
                link: "/pages/4643cd/"
              }
            ]
          }
        ]
      },
      {
        text: "\u9875\u9762",
        link: "/ui/",
        items: [
          { text: "HTML", link: "/pages/8309a5b876fc95e3/" },
          { text: "CSS", link: "/pages/0a83b083bdf257cb/" }
        ]
      },
      {
        text: "\u6280\u672F",
        link: "/technology/",
        items: [
          { text: "\u6280\u672F\u6587\u6863", link: "/pages/9a7ee40fc232253e/" },
          { text: "GitHub\u6280\u5DE7", link: "/pages/4c778760be26d8b3/" },
          { text: "Nodejs", link: "/pages/117708e0af7f0bd9/" },
          { text: "\u535A\u5BA2\u642D\u5EFA", link: "/pages/41f87d890d0a02af/" }
        ]
      },
      {
        text: "\u66F4\u591A",
        link: "/more/",
        items: [
          { text: "\u5B66\u4E60", link: "/pages/f2a556/" },
          { text: "\u9762\u8BD5", link: "/pages/aea6571b7a8bae86/" },
          { text: "\u5FC3\u60C5\u6742\u8D27", link: "/pages/2d615df9a36a98ed/" },
          { text: "\u5B9E\u7528\u6280\u5DE7", link: "/pages/baaa02/" },
          { text: "\u53CB\u60C5\u94FE\u63A5", link: "/friends/" }
        ]
      },
      { text: "\u5173\u4E8E", link: "/about/" },
      {
        text: "\u6536\u85CF",
        link: "/pages/beb6c0bd8a66cea6/"
      },
      {
        text: "\u7D22\u5F15",
        link: "/archives/",
        items: [
          { text: "\u5206\u7C7B", link: "/categories/" },
          { text: "\u6807\u7B7E", link: "/tags/" },
          { text: "\u5F52\u6863", link: "/archives/" }
        ]
      }
    ],
    sidebarDepth: 2,
    logo: "/img/logo.png",
    repo: "nbtca",
    searchMaxSuggestions: 10,
    lastUpdated: "\u4E0A\u6B21\u66F4\u65B0",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "\u7F16\u8F91",
    sidebar: "structuring",
    author: {
      name: "nbtca",
      link: "https://github.com/nbtca"
    },
    blogger: {
      avatar: "https://nbtca-1310707740.cos.ap-shanghai.myqcloud.com/logo.jpg",
      name: "nbtca",
      slogan: "\u8BA1\u534F"
    },
    social: {
      icons: [
        {
          iconClass: "icon-github",
          title: "GitHub",
          link: "https://github.com/nbtca"
        }
      ]
    },
    footer: {
      createYear: 2023
    },
    extendFrontmatter: {
      author: {
        name: "nbtca",
        link: "https://github.com/nbtca"
      }
    }
  },
  head: [
    ["link", { rel: "icon", href: "/img/favicon.ico" }],
    [
      "meta",
      {
        name: "keywords",
        content: "\u524D\u7AEF\u535A\u5BA2,\u4E2A\u4EBA\u6280\u672F\u535A\u5BA2,\u524D\u7AEF,\u524D\u7AEF\u5F00\u53D1,\u524D\u7AEF\u6846\u67B6,web\u524D\u7AEF,\u524D\u7AEF\u9762\u8BD5\u9898,\u6280\u672F\u6587\u6863,\u5B66\u4E60,\u9762\u8BD5,JavaScript,js,ES6,TypeScript,vue,python,css3,html5,Node,git,github,markdown"
      }
    ],
    ["meta", { name: "baidu-site-verification", content: "7F55weZDDc" }],
    ["meta", { name: "theme-color", content: "#11a8cd" }]
  ],
  plugins: [
    [
      "sitemap",
      {}
    ],
    "vuepress-plugin-baidu-autopush",
    [
      "vuepress-plugin-baidu-tongji",
      {
        hm: baiduCode_default
      }
    ],
    [
      "thirdparty-search",
      {
        thirdparty: [
          {
            title: "\u5728MDN\u4E2D\u641C\u7D22",
            frontUrl: "https://developer.mozilla.org/zh-CN/search?q=",
            behindUrl: ""
          },
          {
            title: "\u5728Runoob\u4E2D\u641C\u7D22",
            frontUrl: "https://www.runoob.com/?s="
          },
          {
            title: "\u5728Vue API\u4E2D\u641C\u7D22",
            frontUrl: "https://cn.vuejs.org/v2/api/#"
          },
          {
            title: "\u5728Bing\u4E2D\u641C\u7D22",
            frontUrl: "https://cn.bing.com/search?q="
          },
          {
            title: "\u901A\u8FC7\u767E\u5EA6\u641C\u7D22\u672C\u7AD9\u7684",
            frontUrl: `https://www.baidu.com/s?wd=site%3A${DOMAIN_NAME}%20`
          }
        ]
      }
    ],
    [
      "one-click-copy",
      {
        copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'],
        copyMessage: "\u590D\u5236\u6210\u529F",
        duration: 1e3,
        showInMobile: false
      }
    ],
    [
      "demo-block",
      {
        settings: {
          jsfiddle: false,
          codepen: true,
          horizontal: false
        }
      }
    ],
    [
      "vuepress-plugin-zooming",
      {
        selector: ".theme-vdoing-content img:not(.no-zoom)",
        options: {
          bgColor: "rgba(0,0,0,0.6)"
        }
      }
    ],
    [
      "vuepress-plugin-comment",
      {
        choosen: "gitalk",
        options: {
          clientID: "85c75557c8864591fdea",
          clientSecret: "6cc0ee9a068cd26f0d0c57ad081ebfad036e7a0c",
          repo: "blogs",
          owner: "nbtca",
          admin: ["lyq777-Xing", "nbtca"],
          pagerDirection: "last",
          id: "<%- (frontmatter.permalink || frontmatter.to.path).slice(-16) %>",
          title: "\u300C\u8BC4\u8BBA\u300D<%- frontmatter.title %>",
          labels: ["Gitalk", "Comment"],
          body: "\u9875\u9762\uFF1A<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>"
        }
      }
    ],
    [
      "@vuepress/last-updated",
      {
        transformer: (timestamp, lang) => {
          return dayjs(timestamp).format("YYYY/MM/DD, HH:mm:ss");
        }
      }
    ]
  ],
  markdown: {
    lineNumbers: true,
    extractHeaders: ["h2", "h3", "h4", "h5", "h6"]
  },
  extraWatchFiles: [
    ".vuepress/config.ts",
    ".vuepress/config/htmlModules.ts"
  ]
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzIiwgImRvY3MvLnZ1ZXByZXNzL2NvbmZpZy9iYWlkdUNvZGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxyXG4gKiBcdTYzRDBcdTc5M0FcdUZGMUFcdTU5ODJcdTYwQThcdTYwRjNcdTRGN0ZcdTc1MjhKU1x1NzI0OFx1NjcyQ1x1NzY4NFx1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNlx1NTNFRlx1NTNDMlx1ODAwM1x1RkYxQWh0dHBzOi8vZ2l0aHViLmNvbS94dWdhb3lpL3Z1ZXByZXNzLXRoZW1lLXZkb2luZy90cmVlL2EyZjAzZTk5M2RkMmYyYTNhZmRjNTdjZjcyYWRmYzZmMWI2YjBjMzIvZG9jcy8udnVlcHJlc3NcclxuICovXHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWc0Q3VzdG9tVGhlbWUsIFVzZXJQbHVnaW5zIH0gZnJvbSAndnVlcHJlc3MvY29uZmlnJ1xyXG5pbXBvcnQgeyBWZG9pbmdUaGVtZUNvbmZpZyB9IGZyb20gJ3Z1ZXByZXNzLXRoZW1lLXZkb2luZy90eXBlcydcclxuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xyXG5pbXBvcnQgYmFpZHVDb2RlIGZyb20gJy4vY29uZmlnL2JhaWR1Q29kZScgLy8gXHU3NjdFXHU1RUE2XHU3RURGXHU4QkExaG1cdTc4MDFcclxuaW1wb3J0IGh0bWxNb2R1bGVzIGZyb20gJy4vY29uZmlnL2h0bWxNb2R1bGVzJyAvLyBcdTgxRUFcdTVCOUFcdTRFNDlcdTYzRDJcdTUxNjVcdTc2ODRodG1sXHU1NzU3XHJcblxyXG5cclxuY29uc3QgRE9NQUlOX05BTUUgPSAneHVnYW95aS5jb20nIC8vIFx1NTdERlx1NTQwRCAoXHU0RTBEXHU1RTI2aHR0cHMpXHJcbmNvbnN0IFdFQl9TSVRFID0gYGh0dHBzOi8vJHtET01BSU5fTkFNRX1gIC8vIFx1N0Y1MVx1NTc0MFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnNEN1c3RvbVRoZW1lPFZkb2luZ1RoZW1lQ29uZmlnPih7XHJcbiAgdGhlbWU6ICd2ZG9pbmcnLCAvLyBcdTRGN0ZcdTc1MjhucG1cdTRFM0JcdTk4OThcdTUzMDVcclxuICAvLyB0aGVtZTogcmVzb2x2ZShcIkQ6XFxcXGRlbW9cXFxcYmxvZ1xcXFxibG9nc1xcXFxkb2NzXFxcXC52dWVwcmVzc1wiLCAnLi4vLi4vdmRvaW5nJyksIC8vIFx1NEY3Rlx1NzUyOFx1NjcyQ1x1NTczMFx1NEUzQlx1OTg5OFx1NTMwNVxyXG5cclxuICBsb2NhbGVzOiB7XHJcbiAgICAnLyc6IHtcclxuICAgICAgbGFuZzogJ3poLUNOJyxcclxuICAgICAgdGl0bGU6IFwibmJ0Y2EncyBibG9nXCIsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiAnbmJ0Y2FcdTUzNUFcdTVCQTInLFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8gYmFzZTogJy8nLCAvLyBcdTlFRDhcdThCQTQnLydcdTMwMDJcdTU5ODJcdTY3OUNcdTRGNjBcdTYwRjNcdTVDMDZcdTRGNjBcdTc2ODRcdTdGNTFcdTdBRDlcdTkwRThcdTdGNzJcdTUyMzBcdTU5ODIgaHR0cHM6Ly9mb28uZ2l0aHViLmlvL2Jhci9cdUZGMENcdTkwQTNcdTRFNDggYmFzZSBcdTVFOTRcdThCRTVcdTg4QUJcdThCQkVcdTdGNkVcdTYyMTAgXCIvYmFyL1wiLFx1RkYwOFx1NTQyNlx1NTIxOVx1OTg3NVx1OTc2Mlx1NUMwNlx1NTkzMVx1NTNCQlx1NjgzN1x1NUYwRlx1N0I0OVx1NjU4N1x1NEVGNlx1RkYwOVxyXG5cclxuICAvLyBcdTRFM0JcdTk4OThcdTkxNERcdTdGNkVcclxuICB0aGVtZUNvbmZpZzoge1xyXG4gICAgLy8gXHU1QkZDXHU4MjJBXHU5MTREXHU3RjZFXHJcbiAgICBuYXY6IFtcclxuICAgICAgeyB0ZXh0OiAnXHU5OTk2XHU5ODc1JywgbGluazogJy8nIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnXHU1MjREXHU3QUVGJyxcclxuICAgICAgICBsaW5rOiAnL3dlYi8nLCAvL1x1NzZFRVx1NUY1NVx1OTg3NVx1OTRGRVx1NjNBNVx1RkYwQ1x1NkI2NFx1NTkwNGxpbmtcdTY2MkZ2ZG9pbmdcdTRFM0JcdTk4OThcdTY1QjBcdTU4OUVcdTc2ODRcdTkxNERcdTdGNkVcdTk4NzlcdUZGMENcdTY3MDlcdTRFOENcdTdFQTdcdTVCRkNcdTgyMkFcdTY1RjZcdUZGMENcdTUzRUZcdTRFRTVcdTcwQjlcdTUxRkJcdTRFMDBcdTdFQTdcdTVCRkNcdTgyMkFcdThERjNcdTUyMzBcdTc2RUVcdTVGNTVcdTk4NzVcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgLy8gXHU4QkY0XHU2NjBFXHVGRjFBXHU0RUU1XHU0RTBCXHU2MjQwXHU2NzA5bGlua1x1NzY4NFx1NTAzQ1x1NTNFQVx1NjYyRlx1NTcyOFx1NzZGOFx1NUU5NG1kXHU2NTg3XHU0RUY2XHU1OTM0XHU5MEU4XHU1QjlBXHU0RTQ5XHU3Njg0XHU2QzM4XHU0RTQ1XHU5NEZFXHU2M0E1XHVGRjA4XHU0RTBEXHU2NjJGXHU0RUMwXHU0RTQ4XHU3Mjc5XHU2QjhBXHU3RjE2XHU3ODAxXHVGRjA5XHUzMDAyXHU1M0U2XHU1OTE2XHVGRjBDXHU2Q0U4XHU2MTBGXHU3RUQzXHU1QzNFXHU2NjJGXHU2NzA5XHU2NTlDXHU2NzYwXHU3Njg0XHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdcdTUyNERcdTdBRUZcdTY1ODdcdTdBRTAnLFxyXG4gICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0phdmFTY3JpcHQnLCBsaW5rOiAnL3BhZ2VzLzgxNDNjYzQ4MGZhZjlhMTEvJyB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dDogJ1x1NUI2Nlx1NEU2MFx1N0IxNFx1OEJCMCcsXHJcbiAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHUzMDBBSmF2YVNjcmlwdFx1NjU1OVx1N0EwQlx1MzAwQicsIGxpbms6ICcvbm90ZS9qYXZhc2NyaXB0LycgfSxcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdcdTMwMEFKYXZhU2NyaXB0XHU5QUQ4XHU3RUE3XHU3QTBCXHU1RThGXHU4QkJFXHU4QkExXHUzMDBCJywgbGluazogJy9ub3RlL2pzLycgfSxcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdcdTMwMEFFUzYgXHU2NTU5XHU3QTBCXHUzMDBCJywgbGluazogJy9ub3RlL2VzNi8nIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHUzMDBBVnVlXHUzMDBCJywgbGluazogJy9ub3RlL3Z1ZS8nIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHUzMDBBUmVhY3RcdTMwMEInLCBsaW5rOiAnL25vdGUvcmVhY3QvJyB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICdcdTMwMEFUeXBlU2NyaXB0IFx1NEVDRVx1OTZGNlx1NUI5RVx1NzNCMCBheGlvc1x1MzAwQicsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiAnL25vdGUvdHlwZXNjcmlwdC1heGlvcy8nLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ1x1MzAwQUdpdFx1MzAwQicsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiAnL25vdGUvZ2l0LycsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVHlwZVNjcmlwdCcsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiAnL3BhZ2VzLzUxYWZkNi8nLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ0pTXHU4QkJFXHU4QkExXHU2QTIxXHU1RjBGXHU2MDNCXHU3RUQzJyxcclxuICAgICAgICAgICAgICAgIGxpbms6ICcvcGFnZXMvNDY0M2NkLycsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdcdTk4NzVcdTk3NjInLFxyXG4gICAgICAgIGxpbms6ICcvdWkvJyxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnSFRNTCcsIGxpbms6ICcvcGFnZXMvODMwOWE1Yjg3NmZjOTVlMy8nIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdDU1MnLCBsaW5rOiAnL3BhZ2VzLzBhODNiMDgzYmRmMjU3Y2IvJyB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnXHU2MjgwXHU2NzJGJyxcclxuICAgICAgICBsaW5rOiAnL3RlY2hub2xvZ3kvJyxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU2MjgwXHU2NzJGXHU2NTg3XHU2ODYzJywgbGluazogJy9wYWdlcy85YTdlZTQwZmMyMzIyNTNlLycgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ0dpdEh1Ylx1NjI4MFx1NURFNycsIGxpbms6ICcvcGFnZXMvNGM3Nzg3NjBiZTI2ZDhiMy8nIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdOb2RlanMnLCBsaW5rOiAnL3BhZ2VzLzExNzcwOGUwYWY3ZjBiZDkvJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU1MzVBXHU1QkEyXHU2NDJEXHU1RUZBJywgbGluazogJy9wYWdlcy80MWY4N2Q4OTBkMGEwMmFmLycgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ1x1NjZGNFx1NTkxQScsXHJcbiAgICAgICAgbGluazogJy9tb3JlLycsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHsgdGV4dDogJ1x1NUI2Nlx1NEU2MCcsIGxpbms6ICcvcGFnZXMvZjJhNTU2LycgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ1x1OTc2Mlx1OEJENScsIGxpbms6ICcvcGFnZXMvYWVhNjU3MWI3YThiYWU4Ni8nIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTVGQzNcdTYwQzVcdTY3NDJcdThEMjcnLCBsaW5rOiAnL3BhZ2VzLzJkNjE1ZGY5YTM2YTk4ZWQvJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU1QjlFXHU3NTI4XHU2MjgwXHU1REU3JywgbGluazogJy9wYWdlcy9iYWFhMDIvJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU1M0NCXHU2MEM1XHU5NEZFXHU2M0E1JywgbGluazogJy9mcmllbmRzLycgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICB7IHRleHQ6ICdcdTUxNzNcdTRFOEUnLCBsaW5rOiAnL2Fib3V0LycgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdcdTY1MzZcdTg1Q0YnLFxyXG4gICAgICAgIGxpbms6ICcvcGFnZXMvYmViNmMwYmQ4YTY2Y2VhNi8nLFxyXG4gICAgICAgIC8vIGl0ZW1zOiBbXHJcbiAgICAgICAgLy8gICB7IHRleHQ6ICdcdTdGNTFcdTdBRDknLCBsaW5rOiAnL3BhZ2VzL2JlYjZjMGJkOGE2NmNlYTYvJyB9LFxyXG4gICAgICAgIC8vICAgeyB0ZXh0OiAnXHU4RDQ0XHU2RTkwJywgbGluazogJy9wYWdlcy9lZWU4M2E5MjExYTcwZjlkLycgfSxcclxuICAgICAgICAvLyAgIHsgdGV4dDogJ1Z1ZVx1OEQ0NFx1NkU5MCcsIGxpbms6ICcvcGFnZXMvMTJkZjhhY2U1MmQ0OTNmNi8nIH0sXHJcbiAgICAgICAgLy8gXSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdcdTdEMjJcdTVGMTUnLFxyXG4gICAgICAgIGxpbms6ICcvYXJjaGl2ZXMvJyxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU1MjA2XHU3QzdCJywgbGluazogJy9jYXRlZ29yaWVzLycgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ1x1NjgwN1x1N0I3RScsIGxpbms6ICcvdGFncy8nIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTVGNTJcdTY4NjMnLCBsaW5rOiAnL2FyY2hpdmVzLycgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICAgIHNpZGViYXJEZXB0aDogMiwgLy8gXHU0RkE3XHU4RkI5XHU2ODBGXHU2NjNFXHU3OTNBXHU2REYxXHU1RUE2XHVGRjBDXHU5RUQ4XHU4QkE0MVx1RkYwQ1x1NjcwMFx1NTkyNzJcdUZGMDhcdTY2M0VcdTc5M0FcdTUyMzBoM1x1NjgwN1x1OTg5OFx1RkYwOVxyXG4gICAgbG9nbzogJy9pbWcvbG9nby5wbmcnLCAvLyBcdTVCRkNcdTgyMkFcdTY4MEZsb2dvXHJcbiAgICByZXBvOiAnbmJ0Y2EnLCAvLyBcdTVCRkNcdTgyMkFcdTY4MEZcdTUzRjNcdTRGQTdcdTc1MUZcdTYyMTBHaXRodWJcdTk0RkVcdTYzQTVcclxuICAgIHNlYXJjaE1heFN1Z2dlc3Rpb25zOiAxMCwgLy8gXHU2NDFDXHU3RDIyXHU3RUQzXHU2NzlDXHU2NjNFXHU3OTNBXHU2NzAwXHU1OTI3XHU2NTcwXHJcbiAgICBsYXN0VXBkYXRlZDogJ1x1NEUwQVx1NkIyMVx1NjZGNFx1NjVCMCcsIC8vIFx1NUYwMFx1NTQyRlx1NjZGNFx1NjVCMFx1NjVGNlx1OTVGNFx1RkYwQ1x1NUU3Nlx1OTE0RFx1N0Y2RVx1NTI0RFx1N0YwMFx1NjU4N1x1NUI1NyAgIHN0cmluZyB8IGJvb2xlYW4gKFx1NTNENlx1NTAzQ1x1NEUzQWdpdFx1NjNEMFx1NEVBNFx1NjVGNlx1OTVGNClcclxuICAgIGRvY3NEaXI6ICdkb2NzJywgLy8gXHU3RjE2XHU4RjkxXHU3Njg0XHU2NTg3XHU0RUY2XHU1OTM5XHJcbiAgICAvLyBkb2NzQnJhbmNoOiAnbWFzdGVyJywgLy8gXHU3RjE2XHU4RjkxXHU3Njg0XHU2NTg3XHU0RUY2XHU2MjQwXHU1NzI4XHU1MjA2XHU2NTJGXHVGRjBDXHU5RUQ4XHU4QkE0bWFzdGVyXHUzMDAyIFx1NkNFOFx1NjEwRlx1RkYxQVx1NTk4Mlx1Njc5Q1x1NEY2MFx1NzY4NFx1NTIwNlx1NjUyRlx1NjYyRm1haW5cdTUyMTlcdTRGRUVcdTY1MzlcdTRFM0FtYWluXHJcbiAgICBlZGl0TGlua3M6IHRydWUsIC8vIFx1NTQyRlx1NzUyOFx1N0YxNlx1OEY5MVxyXG4gICAgZWRpdExpbmtUZXh0OiAnXHU3RjE2XHU4RjkxJyxcclxuXHJcbiAgICAvLyoqKiBcdTRFRTVcdTRFMEJcdTY2MkZWZG9pbmdcdTRFM0JcdTk4OThcdTc2RjhcdTUxNzNcdTkxNERcdTdGNkVcdUZGMENcdTY1ODdcdTY4NjNcdUZGMUFodHRwczovL2RvYy54dWdhb3lpLmNvbS9wYWdlcy9hMjBjZTgvICoqKi8vXHJcblxyXG4gICAgLy8gY2F0ZWdvcnk6IGZhbHNlLCAvLyBcdTY2MkZcdTU0MjZcdTYyNTNcdTVGMDBcdTUyMDZcdTdDN0JcdTUyOUZcdTgwRkRcdUZGMENcdTlFRDhcdThCQTR0cnVlXHJcbiAgICAvLyB0YWc6IGZhbHNlLCAvLyBcdTY2MkZcdTU0MjZcdTYyNTNcdTVGMDBcdTY4MDdcdTdCN0VcdTUyOUZcdTgwRkRcdUZGMENcdTlFRDhcdThCQTR0cnVlXHJcbiAgICAvLyBhcmNoaXZlOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU2MjUzXHU1RjAwXHU1RjUyXHU2ODYzXHU1MjlGXHU4MEZEXHVGRjBDXHU5RUQ4XHU4QkE0dHJ1ZVxyXG4gICAgLy8gY2F0ZWdvcnlUZXh0OiAnXHU5NjhGXHU3QjE0JywgLy8gXHU3ODhFXHU3MjQ3XHU1MzE2XHU2NTg3XHU3QUUwXHVGRjA4X3Bvc3RzXHU2NTg3XHU0RUY2XHU1OTM5XHU3Njg0XHU2NTg3XHU3QUUwXHVGRjA5XHU5ODg0XHU4QkJFXHU3NTFGXHU2MjEwXHU3Njg0XHU1MjA2XHU3QzdCXHU1MDNDXHVGRjBDXHU5RUQ4XHU4QkE0J1x1OTY4Rlx1N0IxNCdcclxuXHJcbiAgICAvLyBwYWdlU3R5bGU6ICdsaW5lJywgLy8gXHU5ODc1XHU5NzYyXHU5OENFXHU2ODNDXHVGRjBDXHU1M0VGXHU5MDA5XHU1MDNDXHVGRjFBJ2NhcmQnXHU1MzYxXHU3MjQ3IHwgJ2xpbmUnIFx1N0VCRlx1RkYwOFx1NjcyQVx1OEJCRVx1N0Y2RWJvZHlCZ0ltZ1x1NjVGNlx1NjI0RFx1NzUxRlx1NjU0OFx1RkYwOVx1RkYwQyBcdTlFRDhcdThCQTQnY2FyZCdcdTMwMDIgXHU4QkY0XHU2NjBFXHVGRjFBY2FyZFx1NjVGNlx1ODBDQ1x1NjY2Rlx1NjYzRVx1NzkzQVx1NzA3MFx1ODI3Mlx1ODg2Q1x1NjI1OFx1NTFGQVx1NTM2MVx1NzI0N1x1NjgzN1x1NUYwRlx1RkYwQ2xpbmVcdTY1RjZcdTgwQ0NcdTY2NkZcdTY2M0VcdTc5M0FcdTdFQUZcdTgyNzJcdUZGMENcdTVFNzZcdTRFMTRcdTkwRThcdTUyMDZcdTZBMjFcdTU3NTdcdTVFMjZcdTdFQkZcdTY3NjFcdThGQjlcdTY4NDZcclxuXHJcbiAgICAvLyBib2R5QmdJbWc6IFtcclxuICAgIC8vICAgJ2h0dHBzOi8vanNkLmNkbi56emtvLmNuL2doL3h1Z2FveWkvaW1hZ2Vfc3RvcmUvYmxvZy8yMDIwMDUwNzE3NTgyOC5qcGVnJyxcclxuICAgIC8vICAgJ2h0dHBzOi8vanNkLmNkbi56emtvLmNuL2doL3h1Z2FveWkvaW1hZ2Vfc3RvcmUvYmxvZy8yMDIwMDUwNzE3NTg0NS5qcGVnJyxcclxuICAgIC8vICAgJ2h0dHBzOi8vanNkLmNkbi56emtvLmNuL2doL3h1Z2FveWkvaW1hZ2Vfc3RvcmUvYmxvZy8yMDIwMDUwNzE3NTg0Ni5qcGVnJ1xyXG4gICAgLy8gXSwgLy8gYm9keVx1ODBDQ1x1NjY2Rlx1NTkyN1x1NTZGRVx1RkYwQ1x1OUVEOFx1OEJBNFx1NjVFMFx1MzAwMiBcdTUzNTVcdTVGMjBcdTU2RkVcdTcyNDcgU3RyaW5nIHwgXHU1OTFBXHU1RjIwXHU1NkZFXHU3MjQ3IEFycmF5LCBcdTU5MUFcdTVGMjBcdTU2RkVcdTcyNDdcdTY1RjZcdTk2OTRib2R5QmdJbWdJbnRlcnZhbFx1NTIwN1x1NjM2Mlx1NEUwMFx1NUYyMFx1MzAwMlxyXG4gICAgLy8gYm9keUJnSW1nT3BhY2l0eTogMC41LCAvLyBib2R5XHU4MENDXHU2NjZGXHU1NkZFXHU5MDBGXHU2NjBFXHU1RUE2XHVGRjBDXHU5MDA5XHU1MDNDIDAuMX4xLjAsIFx1OUVEOFx1OEJBNDAuNVxyXG4gICAgLy8gYm9keUJnSW1nSW50ZXJ2YWw6IDE1LCAvLyBib2R5XHU1OTFBXHU1RjIwXHU4MENDXHU2NjZGXHU1NkZFXHU2NUY2XHU3Njg0XHU1MjA3XHU2MzYyXHU5NUY0XHU5Njk0LCBcdTlFRDhcdThCQTQxNVx1RkYwQ1x1NTM1NVx1NEY0RHNcclxuICAgIC8vIHRpdGxlQmFkZ2U6IGZhbHNlLCAvLyBcdTY1ODdcdTdBRTBcdTY4MDdcdTk4OThcdTUyNERcdTc2ODRcdTU2RkVcdTY4MDdcdTY2MkZcdTU0MjZcdTY2M0VcdTc5M0FcdUZGMENcdTlFRDhcdThCQTR0cnVlXHJcbiAgICAvLyB0aXRsZUJhZGdlSWNvbnM6IFsgLy8gXHU2NTg3XHU3QUUwXHU2ODA3XHU5ODk4XHU1MjREXHU1NkZFXHU2ODA3XHU3Njg0XHU1NzMwXHU1NzQwXHVGRjBDXHU5RUQ4XHU4QkE0XHU0RTNCXHU5ODk4XHU1MTg1XHU3RjZFXHU1NkZFXHU2ODA3XHJcbiAgICAvLyAgICdcdTU2RkVcdTY4MDdcdTU3MzBcdTU3NDAxJyxcclxuICAgIC8vICAgJ1x1NTZGRVx1NjgwN1x1NTczMFx1NTc0MDInXHJcbiAgICAvLyBdLFxyXG4gICAgLy8gY29udGVudEJnU3R5bGU6IDEsIC8vIFx1NjU4N1x1N0FFMFx1NTE4NVx1NUJCOVx1NTc1N1x1NzY4NFx1ODBDQ1x1NjY2Rlx1OThDRVx1NjgzQ1x1RkYwQ1x1OUVEOFx1OEJBNFx1NjVFMC4gMSBcdTY1QjlcdTY4M0MgfCAyIFx1NkEyQVx1N0VCRiB8IDMgXHU3QUQ2XHU3RUJGIHwgNCBcdTVERTZcdTY1OUNcdTdFQkYgfCA1IFx1NTNGM1x1NjU5Q1x1N0VCRiB8IDYgXHU3MEI5XHU3MkI2XHJcblxyXG4gICAgLy8gdXBkYXRlQmFyOiB7IC8vIFx1NjcwMFx1OEZEMVx1NjZGNFx1NjVCMFx1NjgwRlxyXG4gICAgLy8gICBzaG93VG9BcnRpY2xlOiB0cnVlLCAvLyBcdTY2M0VcdTc5M0FcdTUyMzBcdTY1ODdcdTdBRTBcdTk4NzVcdTVFOTVcdTkwRThcdUZGMENcdTlFRDhcdThCQTR0cnVlXHJcbiAgICAvLyAgIG1vcmVBcnRpY2xlOiAnL2FyY2hpdmVzJyAvLyBcdTIwMUNcdTY2RjRcdTU5MUFcdTY1ODdcdTdBRTBcdTIwMURcdThERjNcdThGNkNcdTc2ODRcdTk4NzVcdTk3NjJcdUZGMENcdTlFRDhcdThCQTQnL2FyY2hpdmVzJ1xyXG4gICAgLy8gfSxcclxuICAgIC8vIHJpZ2h0TWVudUJhcjogZmFsc2UsIC8vIFx1NjYyRlx1NTQyNlx1NjYzRVx1NzkzQVx1NTNGM1x1NEZBN1x1NjU4N1x1N0FFMFx1NTkyN1x1N0VCMlx1NjgwRlx1RkYwQ1x1OUVEOFx1OEJBNHRydWUgKFx1NUM0Rlx1NUJCRFx1NUMwRlx1NEU4RTEzMDBweFx1NEUwQlx1NjVFMFx1OEJCQVx1NTk4Mlx1NEY1NVx1OTBGRFx1NEUwRFx1NjYzRVx1NzkzQSlcclxuICAgIC8vIHNpZGViYXJPcGVuOiBmYWxzZSwgLy8gXHU1MjFEXHU1OUNCXHU3MkI2XHU2MDAxXHU2NjJGXHU1NDI2XHU2MjUzXHU1RjAwXHU1REU2XHU0RkE3XHU4RkI5XHU2ODBGXHVGRjBDXHU5RUQ4XHU4QkE0dHJ1ZVxyXG4gICAgLy8gcGFnZUJ1dHRvbjogZmFsc2UsIC8vIFx1NjYyRlx1NTQyNlx1NjYzRVx1NzkzQVx1NUZFQlx1NjM3N1x1N0ZGQlx1OTg3NVx1NjMwOVx1OTRBRVx1RkYwQ1x1OUVEOFx1OEJBNHRydWVcclxuXHJcbiAgICAvLyBcdTlFRDhcdThCQTRcdTU5MTZcdTg5QzJcdTZBMjFcdTVGMEZcdUZGMDhcdTc1MjhcdTYyMzdcdTY3MkFcdTU3MjhcdTk4NzVcdTk3NjJcdTYyNEJcdTUyQThcdTRGRUVcdTY1MzlcdThGQzdcdTZBMjFcdTVGMEZcdTY1RjZcdTYyNERcdTc1MUZcdTY1NDhcdUZGMENcdTU0MjZcdTUyMTlcdTRFRTVcdTc1MjhcdTYyMzdcdThCQkVcdTdGNkVcdTc2ODRcdTZBMjFcdTVGMEZcdTRFM0FcdTUxQzZcdUZGMDlcdUZGMENcdTUzRUZcdTkwMDlcdUZGMUEnYXV0bycgfCAnbGlnaHQnIHwgJ2RhcmsnIHwgJ3JlYWQnXHVGRjBDXHU5RUQ4XHU4QkE0J2F1dG8nXHUzMDAyXHJcbiAgICAvLyBkZWZhdWx0TW9kZTogJ2F1dG8nLFxyXG5cclxuICAgIC8vIFx1NEZBN1x1OEZCOVx1NjgwRiAgJ3N0cnVjdHVyaW5nJyB8IHsgbW9kZTogJ3N0cnVjdHVyaW5nJywgY29sbGFwc2FibGU6IEJvb2xlYW59IHwgJ2F1dG8nIHwgPFx1ODFFQVx1NUI5QVx1NEU0OT4gICAgXHU2RTI5XHU5OUE4XHU2M0QwXHU3OTNBXHVGRjFBXHU3NkVFXHU1RjU1XHU5ODc1XHU2NTcwXHU2MzZFXHU0RjlEXHU4RDU2XHU0RThFXHU3RUQzXHU2Nzg0XHU1MzE2XHU3Njg0XHU0RkE3XHU4RkI5XHU2ODBGXHU2NTcwXHU2MzZFXHVGRjBDXHU1OTgyXHU2NzlDXHU0RjYwXHU0RTBEXHU4QkJFXHU3RjZFXHU0RTNBJ3N0cnVjdHVyaW5nJyxcdTVDMDZcdTY1RTBcdTZDRDVcdTRGN0ZcdTc1MjhcdTc2RUVcdTVGNTVcdTk4NzVcclxuICAgIHNpZGViYXI6ICdzdHJ1Y3R1cmluZycsXHJcblxyXG4gICAgLy8gXHU2NTg3XHU3QUUwXHU5RUQ4XHU4QkE0XHU3Njg0XHU0RjVDXHU4MDA1XHU0RkUxXHU2MDZGXHVGRjBDKFx1NTNFRlx1NTcyOG1kXHU2NTg3XHU0RUY2XHU0RTJEXHU1MzU1XHU3MkVDXHU5MTREXHU3RjZFXHU2QjY0XHU0RkUxXHU2MDZGKSBzdHJpbmcgfCB7bmFtZTogc3RyaW5nLCBsaW5rPzogc3RyaW5nfVxyXG4gICAgYXV0aG9yOiB7XHJcbiAgICAgIG5hbWU6ICduYnRjYScsIC8vIFx1NUZDNVx1OTcwMFxyXG4gICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL25idGNhJywgLy8gXHU1M0VGXHU5MDA5XHU3Njg0XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFx1NTM1QVx1NEUzQlx1NEZFMVx1NjA2RiAoXHU2NjNFXHU3OTNBXHU1NzI4XHU5OTk2XHU5ODc1XHU0RkE3XHU4RkI5XHU2ODBGKVxyXG4gICAgYmxvZ2dlcjoge1xyXG4gICAgICBhdmF0YXI6ICdodHRwczovL25idGNhLTEzMTA3MDc3NDAuY29zLmFwLXNoYW5naGFpLm15cWNsb3VkLmNvbS9sb2dvLmpwZycsXHJcbiAgICAgIG5hbWU6ICduYnRjYScsXHJcbiAgICAgIHNsb2dhbjogJ1x1OEJBMVx1NTM0RicsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFx1NzkzRVx1NEVBNFx1NTZGRVx1NjgwNyAoXHU2NjNFXHU3OTNBXHU0RThFXHU1MzVBXHU0RTNCXHU0RkUxXHU2MDZGXHU2ODBGXHU1NDhDXHU5ODc1XHU4MTFBXHU2ODBGXHUzMDAyXHU1MTg1XHU3RjZFXHU1NkZFXHU2ODA3XHVGRjFBaHR0cHM6Ly9kb2MueHVnYW95aS5jb20vcGFnZXMvYTIwY2U4LyNzb2NpYWwpXHJcbiAgICBzb2NpYWw6IHtcclxuICAgICAgLy8gaWNvbmZvbnRDc3NGaWxlOiAnLy9hdC5hbGljZG4uY29tL3QveHh4LmNzcycsIC8vIFx1NTNFRlx1OTAwOVx1RkYwQ1x1OTYzRlx1OTFDQ1x1NTZGRVx1NjgwN1x1NUU5M1x1NTcyOFx1N0VCRmNzc1x1NjU4N1x1NEVGNlx1NTczMFx1NTc0MFx1RkYwQ1x1NUJGOVx1NEU4RVx1NEUzQlx1OTg5OFx1NkNBMVx1NjcwOVx1NzY4NFx1NTZGRVx1NjgwN1x1NTNFRlx1ODFFQVx1NURGMVx1NkRGQlx1NTJBMFx1MzAwMlx1OTYzRlx1OTFDQ1x1NTZGRVx1NzI0N1x1NUU5M1x1RkYxQWh0dHBzOi8vd3d3Lmljb25mb250LmNuL1xyXG4gICAgICBpY29uczogW1xyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgIGljb25DbGFzczogJ2ljb24teW91amlhbicsXHJcbiAgICAgICAgLy8gICB0aXRsZTogJ1x1NTNEMVx1OTBBRVx1NEVGNicsXHJcbiAgICAgICAgLy8gICBsaW5rOiAnbWFpbHRvOjg5NDA3MjY2NkBxcS5jb20nLFxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWNvbkNsYXNzOiAnaWNvbi1naXRodWInLFxyXG4gICAgICAgICAgdGl0bGU6ICdHaXRIdWInLFxyXG4gICAgICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9uYnRjYScsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICBpY29uQ2xhc3M6ICdpY29uLWVyamknLFxyXG4gICAgICAgIC8vICAgdGl0bGU6ICdcdTU0MkNcdTk3RjNcdTRFNTAnLFxyXG4gICAgICAgIC8vICAgbGluazogJ2h0dHBzOi8vbXVzaWMuMTYzLmNvbS8jL3BsYXlsaXN0P2lkPTc1NTU5NzE3MycsXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gXHU5ODc1XHU4MTFBXHU0RkUxXHU2MDZGXHJcbiAgICBmb290ZXI6IHtcclxuICAgICAgY3JlYXRlWWVhcjogMjAyMywgLy8gXHU1MzVBXHU1QkEyXHU1MjFCXHU1RUZBXHU1RTc0XHU0RUZEXHJcbiAgICAgIC8vIGNvcHlyaWdodEluZm86XHJcbiAgICAgIC8vICAgJ0V2YW4gWHUgfCA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3h1Z2FveWkvdnVlcHJlc3MtdGhlbWUtdmRvaW5nL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcIiB0YXJnZXQ9XCJfYmxhbmtcIj5NSVQgTGljZW5zZTwvYT4nLCAvLyBcdTUzNUFcdTVCQTJcdTcyNDhcdTY3NDNcdTRGRTFcdTYwNkZcdTMwMDFcdTU5MDdcdTY4NDhcdTRGRTFcdTYwNkZcdTdCNDlcdUZGMENcdTY1MkZcdTYzMDFhXHU2ODA3XHU3QjdFXHU2MjE2XHU2MzYyXHU4ODRDXHU2ODA3XHU3QjdFPC9icj5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gXHU2MjY5XHU1QzU1XHU4MUVBXHU1MkE4XHU3NTFGXHU2MjEwZnJvbnRtYXR0ZXJcdTMwMDJcdUZGMDhcdTVGNTNtZFx1NjU4N1x1NEVGNlx1NzY4NGZyb250bWF0dGVyXHU0RTBEXHU1QjU4XHU1NzI4XHU3NkY4XHU1RTk0XHU3Njg0XHU1QjU3XHU2QkI1XHU2NUY2XHU1QzA2XHU4MUVBXHU1MkE4XHU2REZCXHU1MkEwXHUzMDAyXHU0RTBEXHU0RjFBXHU4OTg2XHU3NkQ2XHU1REYyXHU2NzA5XHU3Njg0XHU2NTcwXHU2MzZFXHUzMDAyXHVGRjA5XHJcbiAgICBleHRlbmRGcm9udG1hdHRlcjoge1xyXG4gICAgICBhdXRob3I6IHtcclxuICAgICAgICBuYW1lOiAnbmJ0Y2EnLFxyXG4gICAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vbmJ0Y2EnXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gXHU4MUVBXHU1QjlBXHU0RTQ5aG10bChcdTVFN0ZcdTU0NEEpXHU2QTIxXHU1NzU3XHJcbiAgICAvLyBodG1sTW9kdWxlc1xyXG4gIH0sXHJcblxyXG4gIC8vIFx1NkNFOFx1NTE2NVx1NTIzMFx1OTg3NVx1OTc2MjxoZWFkPlx1NEUyRFx1NzY4NFx1NjgwN1x1N0I3RVx1RkYwQ1x1NjgzQ1x1NUYwRlt0YWdOYW1lLCB7IGF0dHJOYW1lOiBhdHRyVmFsdWUgfSwgaW5uZXJIVE1MP11cclxuICBoZWFkOiBbXHJcbiAgICBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCBocmVmOiAnL2ltZy9mYXZpY29uLmljbycgfV0sIC8vZmF2aWNvbnNcdUZGMENcdThENDRcdTZFOTBcdTY1M0VcdTU3MjhwdWJsaWNcdTY1ODdcdTRFRjZcdTU5MzlcclxuICAgIFtcclxuICAgICAgJ21ldGEnLFxyXG4gICAgICB7XHJcbiAgICAgICAgbmFtZTogJ2tleXdvcmRzJyxcclxuICAgICAgICBjb250ZW50OiAnXHU1MjREXHU3QUVGXHU1MzVBXHU1QkEyLFx1NEUyQVx1NEVCQVx1NjI4MFx1NjcyRlx1NTM1QVx1NUJBMixcdTUyNERcdTdBRUYsXHU1MjREXHU3QUVGXHU1RjAwXHU1M0QxLFx1NTI0RFx1N0FFRlx1Njg0Nlx1NjdCNix3ZWJcdTUyNERcdTdBRUYsXHU1MjREXHU3QUVGXHU5NzYyXHU4QkQ1XHU5ODk4LFx1NjI4MFx1NjcyRlx1NjU4N1x1Njg2MyxcdTVCNjZcdTRFNjAsXHU5NzYyXHU4QkQ1LEphdmFTY3JpcHQsanMsRVM2LFR5cGVTY3JpcHQsdnVlLHB5dGhvbixjc3MzLGh0bWw1LE5vZGUsZ2l0LGdpdGh1YixtYXJrZG93bicsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgWydtZXRhJywgeyBuYW1lOiAnYmFpZHUtc2l0ZS12ZXJpZmljYXRpb24nLCBjb250ZW50OiAnN0Y1NXdlWkREYycgfV0sIC8vIFx1NzY3RVx1NUVBNlx1N0VERlx1OEJBMVx1NzY4NFx1N0FEOVx1OTU3Rlx1OUE4Q1x1OEJDMVx1RkYwOFx1NEY2MFx1NTNFRlx1NEVFNVx1NTNCQlx1NjM4OVx1RkYwOVxyXG4gICAgWydtZXRhJywgeyBuYW1lOiAndGhlbWUtY29sb3InLCBjb250ZW50OiAnIzExYThjZCcgfV0sIC8vIFx1NzlGQlx1NTJBOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1NEUzQlx1OTg5OFx1OTg5Q1x1ODI3MlxyXG4gICAgLy8gW1xyXG4gICAgLy8gICAnc2NyaXB0JyxcclxuICAgIC8vICAge1xyXG4gICAgLy8gICAgICdkYXRhLWFkLWNsaWVudCc6ICdjYS1wdWItNzgyODMzMzcyNTk5MzU1NCcsXHJcbiAgICAvLyAgICAgYXN5bmM6ICdhc3luYycsXHJcbiAgICAvLyAgICAgc3JjOiAnaHR0cHM6Ly9wYWdlYWQyLmdvb2dsZXN5bmRpY2F0aW9uLmNvbS9wYWdlYWQvanMvYWRzYnlnb29nbGUuanMnLFxyXG4gICAgLy8gICB9LFxyXG4gICAgLy8gXSwgLy8gXHU3RjUxXHU3QUQ5XHU1MTczXHU4MDU0R29vZ2xlIEFkU2Vuc2UgXHU0RTBFIGh0bWxcdTY4M0NcdTVGMEZcdTVFN0ZcdTU0NEFcdTY1MkZcdTYzMDFcdUZGMDhcdTRGNjBcdTUzRUZcdTRFRTVcdTUzQkJcdTYzODlcdUZGMDlcclxuICBdLFxyXG5cclxuXHJcbiAgLy8gXHU2M0QyXHU0RUY2XHU5MTREXHU3RjZFXHJcbiAgcGx1Z2luczogPFVzZXJQbHVnaW5zPltcclxuICAgIFtcclxuICAgICAgXCJzaXRlbWFwXCIsIC8vIFx1N0Y1MVx1N0FEOVx1NTczMFx1NTZGRVxyXG4gICAgICB7XHJcbiAgICAgICAgLy8gaG9zdG5hbWU6IFdFQl9TSVRFLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuXHJcbiAgICAndnVlcHJlc3MtcGx1Z2luLWJhaWR1LWF1dG9wdXNoJywgLy8gXHU3NjdFXHU1RUE2XHU4MUVBXHU1MkE4XHU2M0E4XHU5MDAxXHJcblxyXG4gICAgW1xyXG4gICAgICAndnVlcHJlc3MtcGx1Z2luLWJhaWR1LXRvbmdqaScsIC8vIFx1NzY3RVx1NUVBNlx1N0VERlx1OEJBMVxyXG4gICAgICB7XHJcbiAgICAgICAgaG06IGJhaWR1Q29kZSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcblxyXG4gICAgLy8gXHU1MTY4XHU2NTg3XHU2NDFDXHU3RDIyXHUzMDAyIFx1MjZBMFx1RkUwRlx1NkNFOFx1NjEwRlx1RkYxQVx1NkI2NFx1NjNEMlx1NEVGNlx1NEYxQVx1NTcyOFx1NjI1M1x1NUYwMFx1N0Y1MVx1N0FEOVx1NjVGNlx1NTkxQVx1NTJBMFx1OEY3RFx1OTBFOFx1NTIwNmpzXHU2NTg3XHU0RUY2XHU3NTI4XHU0RThFXHU2NDFDXHU3RDIyXHVGRjBDXHU1QkZDXHU4MUY0XHU1MjFEXHU2QjIxXHU4QkJGXHU5NUVFXHU3RjUxXHU3QUQ5XHU1M0Q4XHU2MTYyXHUzMDAyXHU1OTgyXHU1NzI4XHU2MTBGXHU1MjFEXHU2QjIxXHU4QkJGXHU5NUVFXHU5MDFGXHU1RUE2XHU3Njg0XHU4QkREXHU1M0VGXHU0RUU1XHU0RTBEXHU0RjdGXHU3NTI4XHU2QjY0XHU2M0QyXHU0RUY2XHVGRjAxXHVGRjA4XHU2M0E4XHU4MzUwXHVGRjFBdnVlcHJlc3MtcGx1Z2luLXRoaXJkcGFydHktc2VhcmNoXHVGRjA5XHJcbiAgICAvLyAnZnVsbHRleHQtc2VhcmNoJyxcclxuXHJcbiAgICAvLyBcdTUzRUZcdTRFRTVcdTZERkJcdTUyQTBcdTdCMkNcdTRFMDlcdTY1QjlcdTY0MUNcdTdEMjJcdTk0RkVcdTYzQTVcdTc2ODRcdTY0MUNcdTdEMjJcdTY4NDZcdUZGMDhcdTdFRTdcdTYyN0ZcdTUzOUZcdTVCOThcdTY1QjlcdTY0MUNcdTdEMjJcdTY4NDZcdTc2ODRcdTkxNERcdTdGNkVcdTUzQzJcdTY1NzBcdUZGMDlcclxuICAgIFtcclxuICAgICAgJ3RoaXJkcGFydHktc2VhcmNoJyxcclxuICAgICAge1xyXG4gICAgICAgIHRoaXJkcGFydHk6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6ICdcdTU3MjhNRE5cdTRFMkRcdTY0MUNcdTdEMjInLFxyXG4gICAgICAgICAgICBmcm9udFVybDogJ2h0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL3poLUNOL3NlYXJjaD9xPScsIC8vIFx1NjQxQ1x1N0QyMlx1OTRGRVx1NjNBNVx1NzY4NFx1NTI0RFx1OTc2Mlx1OTBFOFx1NTIwNlxyXG4gICAgICAgICAgICBiZWhpbmRVcmw6ICcnLCAvLyBcdTY0MUNcdTdEMjJcdTk0RkVcdTYzQTVcdTc2ODRcdTU0MEVcdTk3NjJcdTkwRThcdTUyMDZcdUZGMENcdTUzRUZcdTkwMDlcdUZGMENcdTlFRDhcdThCQTQgJydcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnXHU1NzI4UnVub29iXHU0RTJEXHU2NDFDXHU3RDIyJyxcclxuICAgICAgICAgICAgZnJvbnRVcmw6ICdodHRwczovL3d3dy5ydW5vb2IuY29tLz9zPScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogJ1x1NTcyOFZ1ZSBBUElcdTRFMkRcdTY0MUNcdTdEMjInLFxyXG4gICAgICAgICAgICBmcm9udFVybDogJ2h0dHBzOi8vY24udnVlanMub3JnL3YyL2FwaS8jJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnXHU1NzI4QmluZ1x1NEUyRFx1NjQxQ1x1N0QyMicsXHJcbiAgICAgICAgICAgIGZyb250VXJsOiAnaHR0cHM6Ly9jbi5iaW5nLmNvbS9zZWFyY2g/cT0nLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6ICdcdTkwMUFcdThGQzdcdTc2N0VcdTVFQTZcdTY0MUNcdTdEMjJcdTY3MkNcdTdBRDlcdTc2ODQnLFxyXG4gICAgICAgICAgICBmcm9udFVybDogYGh0dHBzOi8vd3d3LmJhaWR1LmNvbS9zP3dkPXNpdGUlM0Eke0RPTUFJTl9OQU1FfSUyMGAsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH1cclxuICAgIF0sXHJcblxyXG4gICAgW1xyXG4gICAgICAnb25lLWNsaWNrLWNvcHknLCAvLyBcdTRFRTNcdTc4MDFcdTU3NTdcdTU5MERcdTUyMzZcdTYzMDlcdTk0QUVcclxuICAgICAge1xyXG4gICAgICAgIGNvcHlTZWxlY3RvcjogWydkaXZbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdIHByZScsICdkaXZbY2xhc3MqPVwiYXNpZGUtY29kZVwiXSBhc2lkZSddLCAvLyBTdHJpbmcgb3IgQXJyYXlcclxuICAgICAgICBjb3B5TWVzc2FnZTogJ1x1NTkwRFx1NTIzNlx1NjIxMFx1NTI5RicsIC8vIGRlZmF1bHQgaXMgJ0NvcHkgc3VjY2Vzc2Z1bGx5IGFuZCB0aGVuIHBhc3RlIGl0IGZvciB1c2UuJ1xyXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLCAvLyBwcm9tcHQgbWVzc2FnZSBkaXNwbGF5IHRpbWUuXHJcbiAgICAgICAgc2hvd0luTW9iaWxlOiBmYWxzZSwgLy8gd2hldGhlciB0byBkaXNwbGF5IG9uIHRoZSBtb2JpbGUgc2lkZSwgZGVmYXVsdDogZmFsc2UuXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG5cclxuICAgIFtcclxuICAgICAgJ2RlbW8tYmxvY2snLCAvLyBkZW1vXHU2RjE0XHU3OTNBXHU2QTIxXHU1NzU3IGh0dHBzOi8vZ2l0aHViLmNvbS94aWd1YXhpZ3VhL3Z1ZXByZXNzLXBsdWdpbi1kZW1vLWJsb2NrXHJcbiAgICAgIHtcclxuICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgLy8ganNMaWI6IFsnaHR0cDovL3h4eCddLCAvLyBcdTU3MjhcdTdFQkZcdTc5M0FcdTRGOEIoanNmaWRkbGUsIGNvZGVwZW4pXHU0RTJEXHU3Njg0anNcdTRGOURcdThENTZcclxuICAgICAgICAgIC8vIGNzc0xpYjogWydodHRwOi8veHh4J10sIC8vIFx1NTcyOFx1N0VCRlx1NzkzQVx1NEY4Qlx1NEUyRFx1NzY4NGNzc1x1NEY5RFx1OEQ1NlxyXG4gICAgICAgICAgLy8gdnVlOiAnaHR0cHM6Ly9qc2QuY2RuLnp6a28uY24vbnBtL3Z1ZS9kaXN0L3Z1ZS5taW4uanMnLCAvLyBcdTU3MjhcdTdFQkZcdTc5M0FcdTRGOEJcdTRFMkRcdTc2ODR2dWVcdTRGOURcdThENTZcclxuICAgICAgICAgIGpzZmlkZGxlOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU2NjNFXHU3OTNBIGpzZmlkZGxlIFx1OTRGRVx1NjNBNVxyXG4gICAgICAgICAgY29kZXBlbjogdHJ1ZSwgLy8gXHU2NjJGXHU1NDI2XHU2NjNFXHU3OTNBIGNvZGVwZW4gXHU5NEZFXHU2M0E1XHJcbiAgICAgICAgICBob3Jpem9udGFsOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU1QzU1XHU3OTNBXHU0RTNBXHU2QTJBXHU1NDExXHU2ODM3XHU1RjBGXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgICBbXHJcbiAgICAgICd2dWVwcmVzcy1wbHVnaW4tem9vbWluZycsIC8vIFx1NjUzRVx1NTkyN1x1NTZGRVx1NzI0N1xyXG4gICAgICB7XHJcbiAgICAgICAgc2VsZWN0b3I6ICcudGhlbWUtdmRvaW5nLWNvbnRlbnQgaW1nOm5vdCgubm8tem9vbSknLCAvLyBcdTYzOTJcdTk2NjRjbGFzc1x1NjYyRm5vLXpvb21cdTc2ODRcdTU2RkVcdTcyNDdcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICBiZ0NvbG9yOiAncmdiYSgwLDAsMCwwLjYpJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICAgIFtcclxuICAgICAgJ3Z1ZXByZXNzLXBsdWdpbi1jb21tZW50JywgLy8gXHU4QkM0XHU4QkJBXHJcbiAgICAgIHtcclxuICAgICAgICBjaG9vc2VuOiAnZ2l0YWxrJyxcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICBjbGllbnRJRDogJzg1Yzc1NTU3Yzg4NjQ1OTFmZGVhJyxcclxuICAgICAgICAgIGNsaWVudFNlY3JldDogJzZjYzBlZTlhMDY4Y2QyNmYwZDBjNTdhZDA4MWViZmFkMDM2ZTdhMGMnLFxyXG4gICAgICAgICAgcmVwbzogJ2Jsb2dzJywgLy8gR2l0SHViIFx1NEVEM1x1NUU5M1xyXG4gICAgICAgICAgb3duZXI6ICduYnRjYScsIC8vIEdpdEh1Ylx1NEVEM1x1NUU5M1x1NjI0MFx1NjcwOVx1ODAwNVxyXG4gICAgICAgICAgYWRtaW46IFsnbHlxNzc3LVhpbmcnLCduYnRjYSddLCAvLyBcdTVCRjlcdTRFRDNcdTVFOTNcdTY3MDlcdTUxOTlcdTY3NDNcdTk2NTBcdTc2ODRcdTRFQkFcclxuICAgICAgICAgIC8vIGRpc3RyYWN0aW9uRnJlZU1vZGU6IHRydWUsXHJcbiAgICAgICAgICBwYWdlckRpcmVjdGlvbjogJ2xhc3QnLCAvLyAnZmlyc3QnXHU2QjYzXHU1RThGIHwgJ2xhc3QnXHU1MDEyXHU1RThGXHJcbiAgICAgICAgICBpZDogJzwlLSAoZnJvbnRtYXR0ZXIucGVybWFsaW5rIHx8IGZyb250bWF0dGVyLnRvLnBhdGgpLnNsaWNlKC0xNikgJT4nLCAvLyAgXHU5ODc1XHU5NzYyXHU3Njg0XHU1NTJGXHU0RTAwXHU2ODA3XHU4QkM2LFx1OTU3Rlx1NUVBNlx1NEUwRFx1ODBGRFx1OEQ4NVx1OEZDNzUwXHJcbiAgICAgICAgICB0aXRsZTogJ1x1MzAwQ1x1OEJDNFx1OEJCQVx1MzAwRDwlLSBmcm9udG1hdHRlci50aXRsZSAlPicsIC8vIEdpdEh1YiBpc3N1ZSBcdTc2ODRcdTY4MDdcdTk4OThcclxuICAgICAgICAgIGxhYmVsczogWydHaXRhbGsnLCAnQ29tbWVudCddLCAvLyBHaXRIdWIgaXNzdWUgXHU3Njg0XHU2ODA3XHU3QjdFXHJcbiAgICAgICAgICBib2R5OlxyXG4gICAgICAgICAgICAnXHU5ODc1XHU5NzYyXHVGRjFBPCUtIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAoZnJvbnRtYXR0ZXIudG8ucGF0aCB8fCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpICU+JywgLy8gR2l0SHViIGlzc3VlIFx1NzY4NFx1NTE4NVx1NUJCOVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgLy8gW1xyXG4gICAgLy8gICAnQHZzc3VlL3Z1ZXByZXNzLXBsdWdpbi12c3N1ZScsIHtcclxuICAgIC8vICAgICBwbGF0Zm9ybTogJ2dpdGh1YicsXHJcbiAgICAvLyAgICAgb3duZXI6ICduYnRjYScsXHJcbiAgICAvLyAgICAgcmVwbzogJ2Jsb2dzJyxcclxuICAgIC8vICAgICBjbGllbnRJZDogJzg1Yzc1NTU3Yzg4NjQ1OTFmZGVhJyxcclxuICAgIC8vICAgICBjbGllbnRTZWNyZXQ6ICc2Y2MwZWU5YTA2OGNkMjZmMGQwYzU3YWQwODFlYmZhZDAzNmU3YTBjJyxcclxuICAgIC8vICAgfVxyXG4gICAgLy8gXSxcclxuICAgIFtcclxuICAgICAgJ0B2dWVwcmVzcy9sYXN0LXVwZGF0ZWQnLCAvLyBcIlx1NEUwQVx1NkIyMVx1NjZGNFx1NjVCMFwiXHU2NUY2XHU5NUY0XHU2ODNDXHU1RjBGXHJcbiAgICAgIHtcclxuICAgICAgICB0cmFuc2Zvcm1lcjogKHRpbWVzdGFtcCwgbGFuZykgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGRheWpzKHRpbWVzdGFtcCkuZm9ybWF0KCdZWVlZL01NL0RELCBISDptbTpzcycpXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgXSxcclxuXHJcbiAgbWFya2Rvd246IHtcclxuICAgIGxpbmVOdW1iZXJzOiB0cnVlLFxyXG4gICAgZXh0cmFjdEhlYWRlcnM6IFsnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnXSwgLy8gXHU2M0QwXHU1M0Q2XHU2ODA3XHU5ODk4XHU1MjMwXHU0RkE3XHU4RkI5XHU2ODBGXHU3Njg0XHU3RUE3XHU1MjJCXHVGRjBDXHU5RUQ4XHU4QkE0WydoMicsICdoMyddXHJcbiAgfSxcclxuXHJcbiAgLy8gXHU3NkQxXHU1NDJDXHU2NTg3XHU0RUY2XHU1M0Q4XHU1MzE2XHU1RTc2XHU5MUNEXHU2NUIwXHU2Nzg0XHU1RUZBXHJcbiAgZXh0cmFXYXRjaEZpbGVzOiBbXHJcbiAgICAnLnZ1ZXByZXNzL2NvbmZpZy50cycsXHJcbiAgICAnLnZ1ZXByZXNzL2NvbmZpZy9odG1sTW9kdWxlcy50cycsXHJcbiAgXVxyXG59KVxyXG4iLCAiZXhwb3J0IGRlZmF1bHQgJzUwM2YwOThlN2U1YjNhNWI1ZDhjNWZjMjkzOGFmMDAyJ1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBSUE7QUFFQTs7O0FDTkEsSUFBTyxvQkFBUTs7O0FEV2YsSUFBTSxjQUFjO0FBQ3BCLElBQU0sV0FBVyxXQUFXO0FBRTVCLElBQU8saUJBQVEseUJBQTRDO0FBQUEsRUFDekQsT0FBTztBQUFBLEVBR1AsU0FBUztBQUFBLElBQ1AsS0FBSztBQUFBLE1BQ0gsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsYUFBYTtBQUFBO0FBQUE7QUFBQSxFQU1q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
