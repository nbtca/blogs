<template><div><h1 id="使用gitalk实现静态博客无后台评论系统" tabindex="-1"><a class="header-anchor" href="#使用gitalk实现静态博客无后台评论系统" aria-hidden="true">#</a> 使用Gitalk实现静态博客无后台评论系统</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>Gitalk，一个基于 Github Issue 和 Preact 开发的评论插件。</p>
<p>下面我们来用它在vuepress搭建的博客中搭建评论区吧</p>
<!-- more -->
<h2 id="准备" tabindex="-1"><a class="header-anchor" href="#准备" aria-hidden="true">#</a> 准备</h2>
<p>使用一个新的东西首先当然是要了解它</p>
<p>Gitalk demo：<a href="https://gitalk.github.io/" target="_blank" rel="noopener noreferrer">https://gitalk.github.io/<ExternalLinkIcon/></a></p>
<p>Gitalk github：<a href="https://github.com/gitalk/gitalk" target="_blank" rel="noopener noreferrer">https://github.com/gitalk/gitalk<ExternalLinkIcon/></a></p>
<h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2>
<p>如何实现？最好的方法我认为是看<a href="https://github.com/gitalk/gitalk/blob/master/readme-cn.md" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>，这里我只是记录一下实现的步骤。</p>
<p>使用一个别人已经开发好的 <a href="https://github.com/dongyuanxin/vuepress-plugin-comment" target="_blank" rel="noopener noreferrer">vuepress-plugin-comment<ExternalLinkIcon/></a> 插件来帮助我们把Gitalk应用到vuepress搭建的静态博客。</p>
<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">--save</span> vuepress-plugin-comment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3>
<p><code v-pre>options</code>的配置和<code v-pre>Gitalk</code>的配置相同</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span>
      <span class="token string">'vuepress-plugin-comment'</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">choosen</span><span class="token operator">:</span> <span class="token string">'gitalk'</span><span class="token punctuation">,</span> 
        <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">clientID</span><span class="token operator">:</span> <span class="token string">'GitHub Application Client ID'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">clientSecret</span><span class="token operator">:</span> <span class="token string">'GitHub Application Client Secret'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">repo</span><span class="token operator">:</span> <span class="token string">'GitHub repo'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">owner</span><span class="token operator">:</span> <span class="token string">'GitHub repo owner'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">admin</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'GitHub repo owner and collaborators, only these guys can initialize github issues'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token literal-property property">distractionFreeMode</span><span class="token operator">:</span> <span class="token boolean">false</span> 
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要 <strong>GitHub Application</strong>，如果没有 <a href="https://github.com/settings/applications/new" target="_blank" rel="noopener noreferrer">点击这里申请<ExternalLinkIcon/></a>，<code v-pre>Authorization callback URL</code> 填写当前使用插件页面的域名。</p>
<p><img src="https://raw.githubusercontent.com/xugaoyi/image_store/master/blog/QQ截图20191220124134.jpg" alt=""></p>
<p>申请完成就会得 Client ID 和 Client Secret。然后把对应参数填写到配置中，例：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span>
      <span class="token string">'vuepress-plugin-comment'</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">choosen</span><span class="token operator">:</span> <span class="token string">'gitalk'</span><span class="token punctuation">,</span> 
        <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">clientID</span><span class="token operator">:</span> <span class="token string">'a6e*******4709b88b'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">clientSecret</span><span class="token operator">:</span> <span class="token string">'f0e***************beb8b2d54d7241'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">repo</span><span class="token operator">:</span> <span class="token string">'blog'</span><span class="token punctuation">,</span> <span class="token comment">// GitHub 仓库</span>
          <span class="token literal-property property">owner</span><span class="token operator">:</span> <span class="token string">'xugaoyi'</span><span class="token punctuation">,</span> <span class="token comment">// GitHub仓库所有者</span>
          <span class="token literal-property property">admin</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'xugaoyi'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 对仓库有写权限的人</span>
          <span class="token literal-property property">distractionFreeMode</span><span class="token operator">:</span> <span class="token boolean">false</span> 
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置好之后重启项目就发现页面上多了一个评论区，说明评论功能实现啦。但还是有一些bug，继续完善它~</p>
<h3 id="bug修复" tabindex="-1"><a class="header-anchor" href="#bug修复" aria-hidden="true">#</a> BUG修复</h3>
<p><strong>评论区与博客样式不匹配</strong></p>
<p>解决办法：新增全局样式文件<code v-pre>.vuepress/styles/index.styl</code>，写入样式</p>
<div class="language-stylus line-numbers-mode" data-ext="styl"><pre v-pre class="language-stylus"><code><span class="token selector">#vuepress-plugin-comment</span>
  <span class="token property-declaration"><span class="token property">max-width</span> $contentWidth</span>
  <span class="token property-declaration"><span class="token property">margin</span> <span class="token number">0</span> auto</span>
  <span class="token property-declaration"><span class="token property">padding</span> <span class="token number">2</span><span class="token unit">rem</span> <span class="token number">2.5</span><span class="token unit">rem</span></span>
  <span class="token atrule-declaration"><span class="token atrule">@media</span> <span class="token punctuation">(</span>max-width<span class="token punctuation">:</span> $MQNarrow<span class="token punctuation">)</span></span>
    <span class="token property-declaration"><span class="token property">padding</span> <span class="token number">2</span><span class="token unit">rem</span></span>
  <span class="token atrule-declaration"><span class="token atrule">@media</span> <span class="token punctuation">(</span>max-width<span class="token punctuation">:</span> $MQMobileNarrow<span class="token punctuation">)</span></span>
    <span class="token property-declaration"><span class="token property">padding</span> <span class="token number">1.5</span><span class="token unit">rem</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>评论区出现 Error: Validation Failed.</strong></p>
<p>问题分析：当页面 链接过长  或 存在中文链接，导致整个链接字符串长度超过50时，会造成请求issues接口失败，出现422状态码。（中文链接会自动转码，变得很长，id参数默认取的是链接，长度不能超过50）</p>
<p>解决办法：手动设置id取值，限制长度不超过50。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
 <span class="token literal-property property">choosen</span><span class="token operator">:</span> <span class="token string">'gitalk'</span><span class="token punctuation">,</span> 
 <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
   <span class="token operator">...</span>
   <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">"&lt;%- (window.location.origin + (frontmatter.to.path || window.location.pathname)).slice(-50) %>"</span><span class="token punctuation">,</span> <span class="token comment">//  页面的唯一标识,长度不能超过50</span>
   <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">"「评论」&lt;%- document.title %>"</span><span class="token punctuation">,</span> <span class="token comment">// GitHub issue 的标题</span>
   <span class="token literal-property property">labels</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"Gitalk"</span><span class="token punctuation">,</span> <span class="token string">"Comment"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// GitHub issue 的标签</span>
   <span class="token literal-property property">body</span><span class="token operator">:</span><span class="token string">"&lt;%- document.title %>：&lt;%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>"</span> <span class="token comment">// GitHub issue 的内容</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>访问变量时，如 <code v-pre>$frontmatter</code> 或 <code v-pre>window</code>等，请使用  <strong>EJS</strong> 语法。因为在配置中不能使用回调函数，会被vuepress过滤，因此使用 <strong>EJS</strong> 语法。 ——插件作者文档说明</p>
</blockquote>
<p><strong>切换页面后评论区内容还是上一个页面的评论</strong></p>
<p>解决：id在获取<code v-pre>path</code>时使用 <code v-pre>frontmatter.to.path</code>，插件内置了 ``frontmatter.from<code v-pre>、</code>frontmatter.to`。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
 <span class="token literal-property property">choosen</span><span class="token operator">:</span> <span class="token string">'gitalk'</span><span class="token punctuation">,</span> 
 <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
   <span class="token operator">...</span>
   <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">"&lt;%- (window.location.origin + (frontmatter.to.path || window.location.pathname)).slice(-50) %>"</span><span class="token punctuation">,</span> <span class="token comment">//  页面的唯一标识,长度不能超过50</span>
   <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">"「评论」&lt;%- document.title %>"</span><span class="token punctuation">,</span> <span class="token comment">// GitHub issue 的标题</span>
   <span class="token literal-property property">labels</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"Gitalk"</span><span class="token punctuation">,</span> <span class="token string">"Comment"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// GitHub issue 的标签</span>
   <span class="token literal-property property">body</span><span class="token operator">:</span><span class="token string">"&lt;%- document.title %>：&lt;%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>"</span> <span class="token comment">// GitHub issue 的内容</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


