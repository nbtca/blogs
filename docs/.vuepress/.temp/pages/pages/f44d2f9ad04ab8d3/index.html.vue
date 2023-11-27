<template><div><h1 id="github-actions-定时运行代码-每天定时百度链接推送" tabindex="-1"><a class="header-anchor" href="#github-actions-定时运行代码-每天定时百度链接推送" aria-hidden="true">#</a> GitHub Actions 定时运行代码：每天定时百度链接推送</h1>
<p>博客上线已经有些日子了，却发现百度迟迟没有收录我的博客页面，在百度推送工具当中除了有自动推送的代码嵌入网站之外，还有一个实时的主动推送更高效。</p>
<p>最近刚好了解到GitHub Actions的定时运行代码功能，可以用它来每天自动运行命令生成所有博客链接并进行一次性推送给百度。</p>
<p>GitHub Actions 是一个 CI/CD（持续集成/持续部署）工具，但也可用作代码运行环境。<strong>功能非常强大，能够玩出许多花样。</strong></p>
<!-- more -->
<h2 id="百度主动链接推送" tabindex="-1"><a class="header-anchor" href="#百度主动链接推送" aria-hidden="true">#</a> 百度主动链接推送</h2>
<p>链接主动推送在百度站长中有介绍，如图。</p>
<p><img src="https://jsd.cdn.zzko.cn/gh/xugaoyi/image_store/blog/20200103124306.png" alt="主动提交"></p>
<p>具体使用方法就是创建一个文件<code v-pre>urls.txt</code>，文件内每行一条链接的格式写入提交的多个链接，如图。</p>
<p><img src="https://jsd.cdn.zzko.cn/gh/xugaoyi/image_store/blog/20200103124305.png" alt="urls.txt"></p>
<p>运行命令</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-H</span> <span class="token string">'Content-Type:text/plain'</span> --data-binary @urls.txt <span class="token string">"http://data.zz.baidu.com/urls?site=xugaoyi.com&amp;token=T5PEAzhG*****"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面命令的地址和参数由百度站长提供。运行完命令会返回推送结果，不出意外的话就会把<code v-pre>urls.txt</code>内的所有链接一次性推送给百度。</p>
<p>这个方法虽然比嵌入网站头部的自动推送更高效，但是也有它的麻烦之处，就是得自己填入链接到<code v-pre>urls.txt</code>文件，然后手动运行命令。</p>
<h2 id="自动生成urls-txt" tabindex="-1"><a class="header-anchor" href="#自动生成urls-txt" aria-hidden="true">#</a> 自动生成urls.txt</h2>
<p>没关系，技术的本质就是让人&quot;偷懒&quot;的。于是，我写了一个nodejs工具，用于把所有的博客页面链接生成到<code v-pre>urls.txt</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// baiduPush.js</span>

<span class="token doc-comment comment">/**
 * 生成百度链接推送文件
 */</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> logger <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'tracer'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">colorConsole</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> matter <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'gray-matter'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// FrontMatter解析器 https://github.com/jonschlinkert/gray-matter</span>
<span class="token keyword">const</span> readFileList <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./modules/readFileList'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> urlsRoot <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'..'</span><span class="token punctuation">,</span> <span class="token string">'urls.txt'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 百度链接推送文件</span>
<span class="token keyword">const</span> <span class="token constant">DOMAIN</span> <span class="token operator">=</span> process<span class="token punctuation">.</span>argv<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 获取命令行传入的参数</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token constant">DOMAIN</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  logger<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'请在运行此文件时指定一个你要进行百度推送的域名参数，例：node utils/baiduPush.js https://xugaoyi.com'</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  fs<span class="token punctuation">.</span><span class="token function">writeFileSync</span><span class="token punctuation">(</span>urlsRoot<span class="token punctuation">,</span> <span class="token constant">DOMAIN</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> files <span class="token operator">=</span> <span class="token function">readFileList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 读取所有md文件数据</span>

  files<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span> <span class="token parameter">file</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> data <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">matter</span><span class="token punctuation">(</span>fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span>filePath<span class="token punctuation">,</span> <span class="token string">'utf8'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>data<span class="token punctuation">.</span>permalink<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> link <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">\r\n</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">DOMAIN</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>data<span class="token punctuation">.</span>permalink<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>link<span class="token punctuation">)</span>
      fs<span class="token punctuation">.</span><span class="token function">appendFileSync</span><span class="token punctuation">(</span>urlsRoot<span class="token punctuation">,</span> link<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码仅是针对我个人的博客生成链接到<code v-pre>urls.txt</code>文件。更多代码在 <a href="https://github.com/xugaoyi/vuepress-theme-vdoing/blob/master/utils/baiduPush.js" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a>。</p>
<p>运行如下命令就可以生产一个包含博客所有链接的<code v-pre>urls.txt</code>文件：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">node</span> utils/baiduPush.js https://xugaoyi.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>哈哈，第一个麻烦解决了😏，接下来是解决第二个需要手动运行推送命令的问题。</p>
<blockquote>
<p><strong>如果你没办法自动生成，你也可以自己手动创建一个<code v-pre>urls.txt</code>文件，放到github仓库。</strong></p>
</blockquote>
<h2 id="github-actions-定时运行代码" tabindex="-1"><a class="header-anchor" href="#github-actions-定时运行代码" aria-hidden="true">#</a> GitHub Actions 定时运行代码</h2>
<p>今天的主角GitHub Actions 要登场了。（相关：<a href="http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html?20191227113947#comment-last" target="_blank" rel="noopener noreferrer">GitHub Actions 入门教程<ExternalLinkIcon/></a>、<a href="https://xugaoyi.com/pages/6b9d359ec5aa5019/" target="_blank" rel="noopener noreferrer">GitHub Actions 实现自动部署静态博客<ExternalLinkIcon/></a>）</p>
<p>GitHub Actions 是一个 CI/CD（持续集成/持续部署）工具，但也可用作代码运行环境。<strong>功能非常强大，能够玩出许多花样。</strong></p>
<h3 id="配置-github-actions" tabindex="-1"><a class="header-anchor" href="#配置-github-actions" aria-hidden="true">#</a> 配置 GitHub Actions</h3>
<p>触发 GitHub Actions 需要在项目仓库新建一个<code v-pre>.github/workflows</code>子目录，里面是 <a href="https://xugaoyi.com/pages/4e8444e2d534d14f/" target="_blank" rel="noopener noreferrer">YAML 格式<ExternalLinkIcon/></a>配置文件，文件名可以随便取。GitHub 只要发现配置文件，就会运行 Actions。</p>
<p>配置文件的第一部分是触发条件。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">## baiduPush.yml</span>
name: <span class="token string">'baiduPush'</span>

on:
  push:
  schedule:
    - cron: <span class="token string">'0 23 * * *'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>name</code>字段是配置文件的描述，<code v-pre>on</code>字段是触发条件。我们指定两种情况下触发，第一种是代码 Push 进仓库，第二种是<a href="https://help.github.com/en/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows#scheduled-events-schedule" target="_blank" rel="noopener noreferrer">定时任务<ExternalLinkIcon/></a>，每天在国际标准时间23点（北京时间+8，即早上7点）运行。</p>
<blockquote>
<p>定时设置看<a href="https://help.github.com/en/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows#scheduled-events-schedule" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a></p>
</blockquote>
<p>接着，就是运行流程。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>jobs:
  bot:
    runs-on: ubuntu-latest <span class="token comment"># 运行环境为最新版的Ubuntu</span>
    steps:
      - name: <span class="token string">'Checkout codes'</span> <span class="token comment"># 步骤一，获取仓库代码</span>
        uses: actions/checkout@v1
      - name: <span class="token string">'Run baiduPush.sh'</span> <span class="token comment"># 步骤二，执行sh命令文件</span>
        run: <span class="token function">npm</span> <span class="token function">install</span> <span class="token operator">&amp;&amp;</span> <span class="token function">npm</span> run baiduPush <span class="token comment"># 运行命令。（注意，运行目录是仓库根目录）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，指定运行环境是最新的ubuntu，流程的第一步是从代码仓库获取代码，第二步运行两个命令，先安装项目依赖，再运行写在<code v-pre>package.json</code>的<code v-pre>baiduPush</code>命令。完整代码看 <a href="https://github.com/xugaoyi/vuepress-theme-vdoing/blob/master/.github/workflows/baiduPush.yml" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a></p>
<h3 id="baidupush命令在package-json配置" tabindex="-1"><a class="header-anchor" href="#baidupush命令在package-json配置" aria-hidden="true">#</a> <code v-pre>baiduPush</code>命令在<code v-pre>package.json</code>配置</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// package.json</span>
<span class="token string-property property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
	<span class="token string-property property">"baiduPush"</span><span class="token operator">:</span> <span class="token string">"node utils/baiduPush.js https://xugaoyi.com &amp;&amp; bash baiduPush.sh"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面脚本中在<code v-pre>node utils/baiduPush.js</code>的后面加入你的域名参数。运行此命令生成<code v-pre>urls.txt</code>文件，然后执行<code v-pre>baiduPush.sh</code>文件。</p>
<p>注意，在使用window系统时，请使用git bash命令窗运行上面的脚本。</p>
<blockquote>
<p><code v-pre>baiduPush</code>命令之所以没有放在<code v-pre>baiduPush.yml</code>的 run 里面是因为我想在本地也可以执行<code v-pre>npm run baiduPush</code>命令。</p>
</blockquote>
<h3 id="baidupush-sh执行百度推送命令" tabindex="-1"><a class="header-anchor" href="#baidupush-sh执行百度推送命令" aria-hidden="true">#</a> <code v-pre>baiduPush.sh</code>执行百度推送命令</h3>
<p><code v-pre>baiduPush.sh</code>文件：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env sh</span>

<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token comment"># 百度链接推送</span>
<span class="token function">curl</span> <span class="token parameter variable">-H</span> <span class="token string">'Content-Type:text/plain'</span> --data-binary @urls.txt <span class="token string">"http://data.zz.baidu.com/urls?site=https://xugaoyi.com&amp;token=T5PEAzhGa*****"</span>

<span class="token function">rm</span> <span class="token parameter variable">-rf</span> urls.txt <span class="token comment"># 灭迹</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，把<code v-pre>urls.txt</code>文件中的所有链接一次性推送。</p>
<blockquote>
<p>baiduPush.sh内的命令之所以没有写在<code v-pre>package.json</code>是因为我觉得命令太长了，不方便阅读。</p>
</blockquote>
<p>写好配置，推送到仓库，就会在每天的早上7点钟，自动运行命令生成一个包含博客所有页面链接的<code v-pre>urls.txt</code>文件，并把所有链接一次性推送到百度。麻麻再也不用担心我的网站不被收录~~😘 😘 😘</p>
<p>在这个基础上可以扩展，使用GitHub Actions满足你自己的各种定时需求。</p>
<h2 id="相关文章" tabindex="-1"><a class="header-anchor" href="#相关文章" aria-hidden="true">#</a> 相关文章</h2>
<p><a href="https://xugaoyi.com/pages/6b9d359ec5aa5019/" target="_blank" rel="noopener noreferrer">《 GitHub Actions 实现自动部署静态博客》<ExternalLinkIcon/></a></p>
<p><a href="https://xugaoyi.com/pages/41f87d890d0a02af/" target="_blank" rel="noopener noreferrer">《解决百度无法收录搭建在GitHub上的静态博客的问题》<ExternalLinkIcon/></a></p>
</div></template>


