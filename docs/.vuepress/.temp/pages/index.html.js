export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"heroText\":\"Evan's blog\",\"tagline\":\"Web前端技术博客，积跬步以至千里，致敬每个爱学习的你。\",\"features\":[{\"title\":\"前端\",\"details\":\"JavaScript、ES6、Vue框架等前端技术\",\"link\":\"/web/\",\"imgUrl\":\"/img/web.png\"},{\"title\":\"页面\",\"details\":\"html(5)/css(3)，前端页面相关技术\",\"link\":\"/ui/\",\"imgUrl\":\"/img/ui.png\"},{\"title\":\"技术\",\"details\":\"技术文档、教程、技巧、总结等文章\",\"link\":\"/technology/\",\"imgUrl\":\"/img/other.png\"}]},\"headers\":[],\"git\":{},\"filePathRelative\":\"index.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
