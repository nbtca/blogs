// import vue from 'vue/dist/vue.esm.browser'
import Vue from 'vue'
import LetItSnow from 'vue-let-it-snow';
import Vssue from 'vssue'
import GithubV3 from '@vssue/api-github-v3'

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // window.Vue = vue // 使页面中可以使用Vue构造函数 （使页面中的vue demo生效）
  Vue.use(LetItSnow)
  // options.LetItSnow = new LetItSnow()
  Vue.use(Vssue, {
    api: GithubV3,
    owner: 'nbtca',
    repo: 'blogs',
    clientId: '85c75557c8864591fdea',
    clientSecret: '6cc0ee9a068cd26f0d0c57ad081ebfad036e7a0c',
    autoCreateIssue: true,//自动创建评论
  })
}
