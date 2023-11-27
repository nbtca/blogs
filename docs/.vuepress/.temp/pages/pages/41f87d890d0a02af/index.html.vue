<template><div><h1 id="解决百度无法收录搭建在github上的静态博客的问题" tabindex="-1"><a class="header-anchor" href="#解决百度无法收录搭建在github上的静态博客的问题" aria-hidden="true">#</a> 解决百度无法收录搭建在GitHub上的静态博客的问题</h1>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>如果你正在寻找本博客的搭建文档，博主建议您查看这个仓库的<a href="https://github.com/xugaoyi/vuepress-theme-vdoing" target="_blank" rel="noopener noreferrer">README<ExternalLinkIcon/></a>。</p>
</div>
<h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2>
<p>由于GitHub禁止百度爬虫访问，造成托管在GitHub Pages上的博客无法被百度收录。相关问题可以通过百度站长平台的<code v-pre>抓取诊断</code>再现，每次都是403 Forbidden的错误。</p>
<!-- more -->
<h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h2>
<p>同时将博客同时同步托管到GitHub Pages和<a href="https://dev.tencent.com/" target="_blank" rel="noopener noreferrer">coding pages<ExternalLinkIcon/></a>上，解决百度不收录问题。最后发现在国内使用coding pages打开速度特别快，而且还会被百度收录，因此我把coding pages的站点作为主站点，原本在github pages的作为分站点。</p>
<p>步骤：</p>
<p>1、注册<a href="https://dev.tencent.com/" target="_blank" rel="noopener noreferrer">coding<ExternalLinkIcon/></a>账号，创建仓库，把代码推送到coding仓库，并开启pages服务。</p>
<blockquote>
<p>git 操作部分和使用github的差不多，不了解git操作的可以看我的另一篇文章：<a href="https://xugaoyi.com/pages/9a7ee40fc232253e/" target="_blank" rel="noopener noreferrer">Git使用手册<ExternalLinkIcon/></a></p>
</blockquote>
<p>2、我的博客项目使用vuepress搭建的，使用的是如下自动部署脚本，同时将代码推送到github和conding。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env sh</span>

<span class="token comment"># 确保脚本抛出遇到的错误</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token comment"># 生成静态文件</span>
<span class="token function">npm</span> run build

<span class="token comment"># 进入生成的文件夹</span>
<span class="token builtin class-name">cd</span> docs/.vuepress/dist

<span class="token comment"># github</span>
<span class="token builtin class-name">echo</span> <span class="token string">'b.xugaoyi.com'</span> <span class="token operator">></span> CNAME
<span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">'deploy'</span>
<span class="token function">git</span> push <span class="token parameter variable">-f</span> git@github.com:xugaoyi/blog.git master:gh-pages <span class="token comment"># 发布到github</span>

<span class="token comment"># coding</span>
<span class="token builtin class-name">echo</span> <span class="token string">'xugaoyi.com'</span> <span class="token operator">></span> CNAME
<span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">'deploy'</span>
<span class="token function">git</span> push <span class="token parameter variable">-f</span> git@git.dev.tencent.com:xugaoyi/xugaoyi.git master <span class="token comment"># 发布到coding</span>

<span class="token builtin class-name">cd</span> - <span class="token comment"># 退回开始所在目录</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> docs/.vuepress/dist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>因为我想给两个平台上绑定不同的自定义域名，因此我分开创建了CNAME文件。</p>
</blockquote>
<p>3、有自定义域名的，也可以在coding pages绑定自定义域名，域名DNS解析中添加CNAME记录指向coding pages的站点地址即可。（没有自定义域名的可忽略，同时把自动部署脚本中的创建CNAME文件的脚本去掉）</p>
<p>最后，使用百度站长的抓取诊断，发现抓取成功啦，再使用百度站长的<a href="https://ziyuan.baidu.com/linksubmit/index" target="_blank" rel="noopener noreferrer">链接提交<ExternalLinkIcon/></a>功能，把链接提交给百度，过一段时间就可能在百度搜索中搜索到啦。</p>
<h3 id="如何知道百度有没有收录" tabindex="-1"><a class="header-anchor" href="#如何知道百度有没有收录" aria-hidden="true">#</a> 如何知道百度有没有收录？</h3>
<p>在百度搜索框中使用site:&lt;链接地址&gt;，如：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>site:xugaoyi.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="相关文章" tabindex="-1"><a class="header-anchor" href="#相关文章" aria-hidden="true">#</a> 相关文章</h2>
<p><a href="https://xugaoyi.com/pages/f44d2f9ad04ab8d3/" target="_blank" rel="noopener noreferrer">《GitHub Actions 定时运行代码：每天定时百度链接推送》<ExternalLinkIcon/></a></p>
</div></template>


