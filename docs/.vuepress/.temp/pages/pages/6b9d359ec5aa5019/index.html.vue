<template><div><h1 id="github-actions-实现自动部署静态博客" tabindex="-1"><a class="header-anchor" href="#github-actions-实现自动部署静态博客" aria-hidden="true">#</a> GitHub Actions 实现自动部署静态博客</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>我使用vuepress搭建了一个静态博客，挂在了Github pages和<a href="https://dev.tencent.com/" target="_blank" rel="noopener noreferrer">Coding pages<ExternalLinkIcon/></a>上面。</p>
<p>coding pages在国内的访问速度比github pages要快很多，而且还可以被百度收录。</p>
<!-- more -->
<p>一开始的部署方式是使用<a href="https://github.com/xugaoyi/vuepress-theme-vdoing/blob/master/deploy.sh" target="_blank" rel="noopener noreferrer">sh部署脚本<ExternalLinkIcon/></a>把代码提交到这两个平台的仓库分支，虽然已经很方便了，但是我还想把博客未打包的源码提交到Github主分支上。这就需要我操作两次命令，<strong>我就想能不能只需要一次操作就可以同时把源码、部署代码一次性提交到两个平台呢？</strong></p>
<h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2>
<p>在了解GitHub Actions最近（2019.12）刚正式发布了之后，尝试使用它发现能够满足我的需求。<a href="http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html?20191227113947#comment-last" target="_blank" rel="noopener noreferrer">GitHub Actions 入门教程<ExternalLinkIcon/></a></p>
<p>首先，需要获取token，后面会用到。获取方法：github获取token<a href="https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>、coding获取token<a href="https://dev.tencent.com/help/doc/account/access-token" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>。</p>
<p>然后，将这两个token同时储存到github仓库的<code v-pre>Settings/Secrets</code>里面。变量名可以随便取，但是注意要和后面的<code v-pre>ci.yml</code>文件内的变量名一致，这里取的是<code v-pre>ACCESS_TOKEN</code>和<code v-pre>CODING_TOKEN</code>。</p>
<p><img src="https://jsd.cdn.zzko.cn/gh/xugaoyi/image_store/blog/20200103124812.jpg" alt="token设置" title="token设置"></p>
<p>GitHub Actions 的配置文件叫做 workflow 文件，存放在代码仓库的<code v-pre>.github/workflows</code>目录。</p>
<p>workflow 文件采用 <a href="https://xugaoyi.com/pages/4e8444e2d534d14f/" target="_blank" rel="noopener noreferrer">YAML 格式<ExternalLinkIcon/></a>，文件名可以任意取，但是后缀名统一为<code v-pre>.yml</code>，比如<code v-pre>ci.yml</code>。一个库可以有多个 workflow 文件。GitHub 只要发现<code v-pre>.github/workflows</code>目录里面有<code v-pre>.yml</code>文件，就会自动运行该文件。</p>
<p>我的<code v-pre>ci.yml</code>文件：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> CI

<span class="token comment"># 在master分支发生push事件时触发。</span>
<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> master
<span class="token key atrule">jobs</span><span class="token punctuation">:</span> <span class="token comment"># 工作流</span>
  <span class="token key atrule">build</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest <span class="token comment">#运行在虚拟机环境ubuntu-latest</span>

    <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
      <span class="token key atrule">matrix</span><span class="token punctuation">:</span>
        <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>10.x<span class="token punctuation">]</span>

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout <span class="token comment"># 步骤1</span>
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v1 <span class="token comment"># 使用的动作。格式：userName/repoName。作用：检出仓库，获取源码。 官方actions库：https://github.com/actions</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Use Node.js $<span class="token punctuation">{</span><span class="token punctuation">{</span> matrix.node<span class="token punctuation">-</span>version <span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token comment"># 步骤2</span>
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v1 <span class="token comment"># 作用：安装nodejs</span>
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> matrix.node<span class="token punctuation">-</span>version <span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token comment"># 版本</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> run deploy.sh <span class="token comment"># 步骤3 （同时部署到github和coding）</span>
        <span class="token key atrule">env</span><span class="token punctuation">:</span> <span class="token comment"># 设置环境变量</span>
          <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.ACCESS_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token comment"># toKen私密变量</span>
          <span class="token key atrule">CODING_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.CODING_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token comment"># 腾讯云开发者平台（coding）私密token</span>
        <span class="token key atrule">run</span><span class="token punctuation">:</span> npm install <span class="token important">&amp;&amp;</span> npm run deploy <span class="token comment"># 执行的命令</span>
        <span class="token comment"># package.json 中添加 "deploy": "bash deploy.sh"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个配置文件会在我push提交代码到主分支时触发工作，运行环境是<code v-pre>ubuntu-latest</code>，工作步骤：</p>
<ul>
<li>
<p>一，获取仓库源码</p>
</li>
<li>
<p>二，安装nodejs，打包项目有用到nodejs</p>
</li>
<li>
<p>三，把token设置到环境变量，安装项目依赖，并运行<code v-pre>deploy.sh</code>文件，</p>
</li>
</ul>
<blockquote>
<p>ACCESS_TOKE 和 CODING_TOKEN 都是保存在github仓库的<code v-pre>Settings/Secrets</code>位置的私密变量，仓库代码中可以通过&lt;secrets.变量名&gt;来获取，保证了token的私密性。</p>
</blockquote>
<p>再来看看将要被运行的<code v-pre>deploy.sh</code>部署代码：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env sh</span>
<span class="token comment"># 确保脚本抛出遇到的错误</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>
<span class="token function">npm</span> run build <span class="token comment"># 生成静态文件</span>
<span class="token builtin class-name">cd</span> docs/.vuepress/dist <span class="token comment"># 进入生成的文件夹</span>

<span class="token comment"># deploy to github</span>
<span class="token builtin class-name">echo</span> <span class="token string">'blog.xugaoyi.com'</span> <span class="token operator">></span> CNAME
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable">$GITHUB_TOKEN</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token assign-left variable">msg</span><span class="token operator">=</span><span class="token string">'deploy'</span>
  <span class="token assign-left variable">githubUrl</span><span class="token operator">=</span>git@github.com:xugaoyi/blog.git
<span class="token keyword">else</span>
  <span class="token assign-left variable">msg</span><span class="token operator">=</span><span class="token string">'来自github action的自动部署'</span>
  <span class="token assign-left variable">githubUrl</span><span class="token operator">=</span>https://xugaoyi:<span class="token variable">${GITHUB_TOKEN}</span>@github.com/xugaoyi/blog.git
  <span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token string">"xugaoyi"</span>
  <span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email <span class="token string">"894072666@qq.com"</span>
<span class="token keyword">fi</span>
<span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">"<span class="token variable">${msg}</span>"</span>
<span class="token function">git</span> push <span class="token parameter variable">-f</span> <span class="token variable">$githubUrl</span> master:gh-pages <span class="token comment"># 推送到github</span>

<span class="token comment"># deploy to coding</span>
<span class="token builtin class-name">echo</span> <span class="token string">'www.xugaoyi.com\nxugaoyi.com'</span> <span class="token operator">></span> CNAME  <span class="token comment"># 自定义域名</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable">$CODING_TOKEN</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>  <span class="token comment"># -z 字符串 长度为0则为true；$CODING_TOKEN来自于github仓库`Settings/Secrets`设置的私密环境变量</span>
  <span class="token assign-left variable">codingUrl</span><span class="token operator">=</span>git@git.dev.tencent.com:xugaoyi/xugaoyi.git
<span class="token keyword">else</span>
  <span class="token assign-left variable">codingUrl</span><span class="token operator">=</span>https://xugaoyi:<span class="token variable">${CODING_TOKEN}</span>@git.dev.tencent.com/xugaoyi/xugaoyi.git
<span class="token keyword">fi</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">"<span class="token variable">${msg}</span>"</span>
<span class="token function">git</span> push <span class="token parameter variable">-f</span> <span class="token variable">$codingUrl</span> master <span class="token comment"># 推送到coding</span>

<span class="token builtin class-name">cd</span> -
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> docs/.vuepress/dist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个文件使用<a href="https://ipcmen.com/" target="_blank" rel="noopener noreferrer">Shell命令<ExternalLinkIcon/></a>写的，它会先运行打包命令，进入打包好的文件，创建一个自定义域名的CNAME文件（如果你没有自定义域名可去掉这个命令），判断是否有token环境变量，如果没有说明是在本地自己的电脑上运行的部署，使用ssh代码仓库地址，如果有token环境变量，说明是GitHub Actions自动触发的部署，此时使用的是可以通过toKen来获取代码提交权限的提交地址。最后通过git命令提交到各自的仓库，完成部署。</p>
<blockquote>
<p>提示：</p>
<ul>
<li>
<p>Shell 可以获取到环境变量。</p>
</li>
<li>
<p>我想给两个平台上部署的博客不一样的自定义域名，因此做了分开创建CNAME文件，分开提交。</p>
</li>
</ul>
</blockquote>
<p>至此，我前面提到的需求就实现啦，只需要把源码push到github仓库这一个步骤，后面的博客打包、部署到github和coding等工作都由GitHub Actions来自动完成。</p>
<p>如下你想查看部署日志，你可以到github仓库的Actions这一项查看。</p>
<p><img src="https://jsd.cdn.zzko.cn/gh/xugaoyi/image_store/blog/20200103124813.png" alt="部署日志" title="部署日志"></p>
<h2 id="相关文章" tabindex="-1"><a class="header-anchor" href="#相关文章" aria-hidden="true">#</a> 相关文章</h2>
<p><a href="https://xugaoyi.com/pages/f44d2f9ad04ab8d3/" target="_blank" rel="noopener noreferrer">《GitHub Actions 定时运行代码：每天定时百度链接推送》<ExternalLinkIcon/></a></p>
</div></template>


