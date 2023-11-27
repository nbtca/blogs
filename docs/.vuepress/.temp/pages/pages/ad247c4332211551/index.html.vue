<template><div><h1 id="markdown使用教程" tabindex="-1"><a class="header-anchor" href="#markdown使用教程" aria-hidden="true">#</a> Markdown使用教程</h1>
<h2 id="一、markdown" tabindex="-1"><a class="header-anchor" href="#一、markdown" aria-hidden="true">#</a> 一、Markdown</h2>
<h3 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h3>
<p><img src="https://raw.githubusercontent.com/xugaoyi/image_store/master/blog/md_logo.png" alt="logo"></p>
<p><code v-pre>Markdown</code> 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。</p>
<!-- more -->
<h3 id="应用" tabindex="-1"><a class="header-anchor" href="#应用" aria-hidden="true">#</a> 应用</h3>
<p>当前许多网站都广泛使用 <code v-pre>Markdown</code> 来撰写帮助文档或是用于论坛上发表消息。例如：GitHub、简书、知乎等</p>
<h3 id="编辑器" tabindex="-1"><a class="header-anchor" href="#编辑器" aria-hidden="true">#</a> 编辑器</h3>
<p>推荐使用<code v-pre>Typora</code>，官网：<a href="https://typora.io/" target="_blank" rel="noopener noreferrer">https://typora.io/<ExternalLinkIcon/></a></p>
<h2 id="二、徽章" tabindex="-1"><a class="header-anchor" href="#二、徽章" aria-hidden="true">#</a> 二、徽章</h2>
<h4 id="什么是徽章" tabindex="-1"><a class="header-anchor" href="#什么是徽章" aria-hidden="true">#</a> 什么是徽章</h4>
<p>徽章是一种小巧精美的小图标，一般配有相关文字进行辅助说明，可对数据进行监控，链接跳转等，富有表现力。</p>
<p>常见于<code v-pre>github</code>项目主页，但其不仅出现于 <code v-pre>github</code> 项目主页，凡是能够表现图片的地方都可以出现徽章。</p>
<h4 id="徽章的使用" tabindex="-1"><a class="header-anchor" href="#徽章的使用" aria-hidden="true">#</a> 徽章的使用</h4>
<ul>
<li>在<code v-pre>markdown</code>中使用</li>
</ul>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>格式:
<span class="token url">[<span class="token content">![图片文字说明</span>](<span class="token url">图片源地址</span>)</span>](超链接地址)  # 即超链接内部嵌套图片

语法：
<span class="token url">[<span class="token content">![github</span>](<span class="token url">https://img.shields.io/badge/github-xugaoyi-brightgreen.svg</span>)</span>](https://github.com/xugaoyi)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://github.com/xugaoyi" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/github-xugaoyi-brightgreen.svg" alt="github"><ExternalLinkIcon/></a></p>
<p>徽章生成网站：<a href="https://shields.io/" target="_blank" rel="noopener noreferrer">https://shields.io/<ExternalLinkIcon/></a></p>
<p>本文档主要介绍markdown，不对徽章做过多介绍，详细介绍请 <a href="https://segmentfault.com/a/1190000019552597" target="_blank" rel="noopener noreferrer"> 戳我 <ExternalLinkIcon/></a> 了解。</p>
<h2 id="三、设置目录" tabindex="-1"><a class="header-anchor" href="#三、设置目录" aria-hidden="true">#</a> 三、设置目录</h2>
<p>设置之后会根据分级标题来自动生成目录。</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>[TOC]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>注：github暂未支持。</p>
</blockquote>
<p>[TOC]</p>
<p>在github生成TOC的方法：<a href="https://github.com/ekalinin/github-markdown-toc" target="_blank" rel="noopener noreferrer">https://github.com/ekalinin/github-markdown-toc<ExternalLinkIcon/></a></p>
<p>windows系统需要基于golang实现的工具：https://github.com/ekalinin/github-markdown-toc.go</p>
<blockquote>
<p>如果你有GO语言的编译环境，可以尝试自己编译，如果没有，可以直接下载编译好的二进制文件。</p>
<p>如windows系统64位 下载：gh-md-toc.windows.amd64.tgz （386 是32位，amd64是64位）</p>
<p>下载解压后，发现没有后缀名无法识别，实际上这是个exe文件，所以只需要暴力地在后面加上.exe就可以开始愉快使用了。</p>
<p>使用方法：</p>
<ol>
<li>首先将.md文档复制到gh-md-toc.exe的根目录下</li>
<li>在该目录下打开系统命令行，输入命令：gh-md-toc.exe README.MD 生成目录</li>
<li>把生成的目录复制到.md文件即可。</li>
</ol>
</blockquote>
<p><strong>这是gh-md-toc生成的目录：</strong></p>
<ul>
<li><a href="#%E4%B8%80markdown">一、Markdown</a>
<ul>
<li><a href="#%E7%AE%80%E4%BB%8B">简介</a></li>
<li><a href="#%E5%BA%94%E7%94%A8">应用</a></li>
<li><a href="#%E7%BC%96%E8%BE%91%E5%99%A8">编辑器</a></li>
</ul>
</li>
<li><a href="#%E4%BA%8C%E5%BE%BD%E7%AB%A0">二、徽章</a>
<ul>
<li><a href="#%E4%BB%80%E4%B9%88%E6%98%AF%E5%BE%BD%E7%AB%A0">什么是徽章</a></li>
<li><a href="#%E5%BE%BD%E7%AB%A0%E7%9A%84%E4%BD%BF%E7%94%A8">徽章的使用</a></li>
</ul>
</li>
<li><a href="#%E4%B8%89%E8%AE%BE%E7%BD%AE%E7%9B%AE%E5%BD%95">三、设置目录</a></li>
<li><a href="#%E5%9B%9B%E6%A0%87%E9%A2%98">四、标题</a></li>
<li><a href="#%E4%B8%80%E7%BA%A7%E6%A0%87%E9%A2%98">一级标题</a>
<ul>
<li><a href="#%E4%BA%8C%E7%BA%A7%E6%A0%87%E9%A2%98">二级标题</a>
<ul>
<li><a href="#%E4%B8%89%E7%BA%A7%E6%A0%87%E9%A2%98">三级标题</a>
<ul>
<li><a href="#%E5%9B%9B%E7%BA%A7%E6%A0%87%E9%A2%98">四级标题</a>
<ul>
<li><a href="#%E4%BA%94%E7%BA%A7%E6%A0%87%E9%A2%98">五级标题</a>
<ul>
<li><a href="#%E5%85%AD%E7%BA%A7%E6%A0%87%E9%A2%98">六级标题</a></li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li><a href="#%E4%BA%94%E6%96%87%E6%9C%AC">五、文本</a>
<ul>
<li><a href="#%E6%AE%B5%E8%90%BD">段落</a></li>
<li><a href="#%E5%AD%97%E4%BD%93">字体</a></li>
<li><a href="#%E5%88%A0%E9%99%A4%E7%BA%BF">删除线</a></li>
<li><a href="#%E4%B8%8B%E5%88%92%E7%BA%BF">下划线</a></li>
<li><a href="#%E6%96%87%E5%AD%97%E9%AB%98%E4%BA%AE">文字高亮</a></li>
<li><a href="#%E5%88%86%E9%9A%94%E7%BA%BF">分隔线</a></li>
<li><a href="#%E8%84%9A%E6%B3%A8">脚注</a></li>
</ul>
</li>
<li><a href="#%E5%85%AD%E5%88%97%E8%A1%A8">六、列表</a>
<ul>
<li><a href="#%E6%97%A0%E5%BA%8F%E5%88%97%E8%A1%A8">无序列表</a></li>
<li><a href="#%E6%9C%89%E5%BA%8F%E5%88%97%E8%A1%A8">有序列表</a></li>
<li><a href="#%E6%8A%98%E5%8F%A0%E5%88%97%E8%A1%A8">折叠列表</a></li>
<li><a href="#%E5%B8%A6%E5%A4%8D%E9%80%89%E6%A1%86%E5%88%97%E8%A1%A8">带复选框列表</a></li>
<li><a href="#%E5%88%97%E8%A1%A8%E5%B5%8C%E5%A5%97">列表嵌套</a></li>
</ul>
</li>
<li><a href="#%E4%B8%83%E5%8C%BA%E5%9D%97%E5%BC%95%E7%94%A8">七、区块引用</a>
<ul>
<li><a href="#%E5%8C%BA%E5%9D%97%E5%B5%8C%E5%A5%97">区块嵌套</a></li>
<li><a href="#%E5%8C%BA%E5%9D%97%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%88%97%E8%A1%A8">区块中使用列表</a></li>
<li><a href="#%E5%88%97%E8%A1%A8%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%8C%BA%E5%9D%97">列表中使用区块</a></li>
</ul>
</li>
<li><a href="#%E5%85%AB%E4%BB%A3%E7%A0%81">八、代码</a>
<ul>
<li><a href="#%E4%BB%A3%E7%A0%81%E5%8C%BA%E5%9D%97">代码区块</a></li>
</ul>
</li>
<li><a href="#%E4%B9%9D%E9%93%BE%E6%8E%A5">九、链接</a>
<ul>
<li><a href="#%E5%8F%98%E9%87%8F%E9%93%BE%E6%8E%A5">变量链接</a></li>
<li><a href="#github%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%86%85%E9%83%A8%E9%93%BE%E6%8E%A5">Github中使用内部链接</a></li>
<li><a href="#%E9%94%9A%E7%82%B9%E9%93%BE%E6%8E%A5">锚点链接</a></li>
</ul>
</li>
<li><a href="#%E5%8D%81%E5%9B%BE%E7%89%87">十、图片</a>
<ul>
<li><a href="#%E5%9B%BE%E7%89%87%E5%AE%BD%E9%AB%98">图片宽高</a></li>
<li><a href="#%E7%9B%B8%E5%AF%B9%E8%B7%AF%E5%BE%84%E4%BB%A5%E5%8F%8Agithub%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%9B%BE%E7%89%87">相对路径以及Github中使用图片</a></li>
</ul>
</li>
<li><a href="#%E5%8D%81%E4%B8%80%E8%A1%A8%E6%A0%BC">十一、表格</a></li>
<li><a href="#%E5%8D%81%E4%BA%8Cemoji%E8%A1%A8%E6%83%85%E5%8C%85">十二、Emoji表情包</a></li>
<li><a href="#%E5%8D%81%E4%B8%89%E5%85%B6%E4%BB%96%E6%8A%80%E5%B7%A7">十三、其他技巧</a>
<ul>
<li><a href="#%E6%94%AF%E6%8C%81%E7%9A%84-html-%E5%85%83%E7%B4%A0">支持的 HTML 元素</a></li>
<li><a href="#%E8%BD%AC%E4%B9%89">转义</a></li>
<li><a href="#%E6%95%B0%E5%AD%A6%E5%85%AC%E5%BC%8F">数学公式</a></li>
<li><a href="#%E5%9B%BE%E8%A1%A8">图表</a></li>
<li><a href="#%E6%B5%81%E7%A8%8B%E5%9B%BE">流程图</a></li>
<li><a href="#%E6%97%B6%E5%BA%8F%E5%9B%BE">时序图</a></li>
<li><a href="#%E7%94%98%E7%89%B9%E5%9B%BE">甘特图</a></li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="四、标题" tabindex="-1"><a class="header-anchor" href="#四、标题" aria-hidden="true">#</a> 四、标题</h2>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 一级标题</span>
<span class="token title important"><span class="token punctuation">##</span> 二级标题</span>
<span class="token title important"><span class="token punctuation">###</span> 三级标题</span>
<span class="token title important"><span class="token punctuation">####</span> 四级标题</span>
<span class="token title important"><span class="token punctuation">#####</span> 五级标题</span>
<span class="token title important"><span class="token punctuation">######</span> 六级标题</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="一级标题" tabindex="-1"><a class="header-anchor" href="#一级标题" aria-hidden="true">#</a> 一级标题</h1>
<h2 id="二级标题" tabindex="-1"><a class="header-anchor" href="#二级标题" aria-hidden="true">#</a> 二级标题</h2>
<h3 id="三级标题" tabindex="-1"><a class="header-anchor" href="#三级标题" aria-hidden="true">#</a> 三级标题</h3>
<h4 id="四级标题" tabindex="-1"><a class="header-anchor" href="#四级标题" aria-hidden="true">#</a> 四级标题</h4>
<h5 id="五级标题" tabindex="-1"><a class="header-anchor" href="#五级标题" aria-hidden="true">#</a> 五级标题</h5>
<h6 id="六级标题" tabindex="-1"><a class="header-anchor" href="#六级标题" aria-hidden="true">#</a> 六级标题</h6>
<h2 id="五、文本" tabindex="-1"><a class="header-anchor" href="#五、文本" aria-hidden="true">#</a> 五、文本</h2>
<h3 id="段落" tabindex="-1"><a class="header-anchor" href="#段落" aria-hidden="true">#</a> 段落</h3>
<p>Markdown 段落没有特殊的格式，直接编写文字，<strong>需要段落缩进时使用2个Tab</strong></p>
<h3 id="字体" tabindex="-1"><a class="header-anchor" href="#字体" aria-hidden="true">#</a> 字体</h3>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token italic"><span class="token punctuation">*</span><span class="token content">斜体文本</span><span class="token punctuation">*</span></span>
或 <span class="token italic"><span class="token punctuation">_</span><span class="token content">斜体文本</span><span class="token punctuation">_</span></span>
<span class="token bold"><span class="token punctuation">**</span><span class="token content">粗体文本</span><span class="token punctuation">**</span></span>
或  <span class="token bold"><span class="token punctuation">__</span><span class="token content">粗体文本</span><span class="token punctuation">__</span></span>
<span class="token bold"><span class="token punctuation">**</span><span class="token content"><span class="token italic"><span class="token punctuation">*</span><span class="token content">粗斜体文本</span><span class="token punctuation">*</span></span></span><span class="token punctuation">**</span></span>
或 <span class="token bold"><span class="token punctuation">__</span><span class="token content"><span class="token italic"><span class="token punctuation">_</span><span class="token content">粗斜体文本</span><span class="token punctuation">_</span></span></span><span class="token punctuation">__</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>斜体文本</em></p>
<p><em>斜体文本</em></p>
<p><strong>粗体文本</strong></p>
<p><strong>粗体文本</strong></p>
<p><em><strong>粗斜体文本</strong></em></p>
<p><em><strong>粗斜体文本</strong></em></p>
<h3 id="删除线" tabindex="-1"><a class="header-anchor" href="#删除线" aria-hidden="true">#</a> 删除线</h3>
<p>如果段落上的文字要添加删除线，只需要在文字的两端加上两个波浪线 <strong>~~</strong> 即可，实例如下：</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token strike"><span class="token punctuation">~~</span><span class="token content">BAIDU.COM</span><span class="token punctuation">~~</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><s>BAIDU.COM</s></p>
<h3 id="下划线" tabindex="-1"><a class="header-anchor" href="#下划线" aria-hidden="true">#</a> 下划线</h3>
<p>下划线可以通过 HTML 的<code v-pre>&lt;u&gt;</code> 标签来实现：</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>u</span><span class="token punctuation">></span></span>带下划线的文本<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>u</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><u>带下划线的文本</u></p>
<h3 id="文字高亮" tabindex="-1"><a class="header-anchor" href="#文字高亮" aria-hidden="true">#</a> 文字高亮</h3>
<p>文字高亮能使行内部分文字高亮，使用一对反引号。</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token code-snippet code keyword">`html`</span> <span class="token code-snippet code keyword">`css`</span> <span class="token code-snippet code keyword">`javascript`</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>html</code> <code v-pre>css</code> <code v-pre>javascript</code></p>
<h3 id="分隔线" tabindex="-1"><a class="header-anchor" href="#分隔线" aria-hidden="true">#</a> 分隔线</h3>
<p>你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token hr punctuation">***</span>

<span class="token hr punctuation">*****</span>

<span class="token hr punctuation">- - -</span>

<span class="token hr punctuation">----------</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="脚注" tabindex="-1"><a class="header-anchor" href="#脚注" aria-hidden="true">#</a> 脚注</h3>
<p>脚注是对文本的补充说明。</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>[^变量]
在文档结尾或其他位置給变量赋值：
<span class="token url-reference url"><span class="token punctuation">[</span><span class="token variable">^变量</span><span class="token punctuation">]</span><span class="token punctuation">:</span> 注明框内显示的内容</span>

鼠标移到这里> [^哈喽]
<span class="token url-reference url"><span class="token punctuation">[</span><span class="token variable">^哈喽</span><span class="token punctuation">]</span><span class="token punctuation">:</span> 注明框内显示的内容</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注：在部分线上预览未支持</p>
</blockquote>
<p>鼠标移到这里&gt; <a href="%E6%B3%A8%E6%98%8E%E6%A1%86%E5%86%85%E6%98%BE%E7%A4%BA%E7%9A%84%E5%86%85%E5%AE%B9">^哈喽</a></p>
<h2 id="六、列表" tabindex="-1"><a class="header-anchor" href="#六、列表" aria-hidden="true">#</a> 六、列表</h2>
<h3 id="无序列表" tabindex="-1"><a class="header-anchor" href="#无序列表" aria-hidden="true">#</a> 无序列表</h3>
<p>使用星号<code v-pre>*</code>、加号<code v-pre>+</code>或是减号<code v-pre>-</code>作为列表标记：</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token list punctuation">*</span> 第一项
<span class="token list punctuation">*</span> 第二项

<span class="token list punctuation">+</span> 第一项
<span class="token list punctuation">+</span> 第二项

<span class="token list punctuation">-</span> 第一项
<span class="token list punctuation">-</span> 第二项
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>第一项</li>
<li>第二项</li>
</ul>
<h3 id="有序列表" tabindex="-1"><a class="header-anchor" href="#有序列表" aria-hidden="true">#</a> 有序列表</h3>
<p>使用数字并加上<code v-pre> .</code> 号来表示</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token list punctuation">1.</span> 第一项
<span class="token list punctuation">2.</span> 第二项
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>第一项</li>
<li>第二项</li>
</ol>
<h3 id="折叠列表" tabindex="-1"><a class="header-anchor" href="#折叠列表" aria-hidden="true">#</a> 折叠列表</h3>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>details</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span>点我打开关闭折叠<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span>
 折叠内容
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>details</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注意：&lt;details&gt; 标签内写markdown代码无效，可写html代码，如ul&gt;li、table等</p>
</blockquote>
<details>
<summary>点我打开关闭折叠</summary>
 折叠内容
 <ul>
     <li>1</li>
     <li>2</li>
     <li>3</li>
 </ul>
</details>
<details>
<summary>包含table的折叠</summary>
    <table>
        <thead>
            <tr>
                <th align="center">分类</th>
                <th align="center">例词</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td align="center">人称代词-主格</td>
                <td align="center">I我，you你，he他，she她，they他们， we我们</td>
            </tr>
            <tr>
                <td align="center">人称代词-宾格</td>
                <td align="center">me我， you你， him他， her她， them他们， us我们</td>
            </tr>
            <tr>
                <td align="center">物主代词</td>
                <td align="center">my我的， his他的， your你的（your你们的）， their他们的， hers她的</td>
            </tr>
            <tr>
                <td align="center">指示代词</td>
                <td align="center">this这， that那， these这些， those 那些</td>
            </tr>
            <tr>
                <td align="center">反身代词</td>
                <td align="center">myself我自己， himself他自己， themselves他们自己， yourself你(们)自己，herself她自己</td>
            </tr>
            <tr>
                <td align="center">疑问代词</td>
                <td align="center">who谁， what什么， which哪个</td>
            </tr>
            <tr>
                <td align="center">不定代词</td>
                <td align="center">some一些， many许多， both两个、两个都， any许多</td>
            </tr>
            <tr>
                <td align="center">关系代词</td>
                <td align="center">which……的物， who……的人， that……的人或物， who谁， that引导定语从句</td>
            </tr>
            <tr>
                <td align="center">相互代词</td>
                <td align="center">each other 互相， one another互相</td>
            </tr>
            <tr>
                <td align="center">连接代词</td>
                <td align="center">who,whom,whose,what,which,whatever,whichever,whoever,whomever</td>
            </tr>
            <tr>
                <td align="center">替代词</td>
                <td align="center">one（单数），ones（复数）</td>
            </tr>
        </tbody>
    </table>
</details>
<h3 id="带复选框列表" tabindex="-1"><a class="header-anchor" href="#带复选框列表" aria-hidden="true">#</a> 带复选框列表</h3>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token list punctuation">*</span> [x] 第一项
<span class="token list punctuation">*</span> [ ] 第二项
<span class="token list punctuation">*</span> [ ] 第三项
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注：在部分线上预览未支持</p>
</blockquote>
<ul>
<li>
<p>[x] 第一项</p>
</li>
<li>
<p>[ ] 第二项</p>
</li>
<li>
<p>[ ] 第三项</p>
</li>
</ul>
<h3 id="列表嵌套" tabindex="-1"><a class="header-anchor" href="#列表嵌套" aria-hidden="true">#</a> 列表嵌套</h3>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token list punctuation">1.</span> 第一项：
    <span class="token list punctuation">-</span> 第一项嵌套的第一个元素
    <span class="token list punctuation">-</span> 第一项嵌套的第二个元素
<span class="token list punctuation">2.</span> 第二项：
    <span class="token list punctuation">-</span> 第二项嵌套的第一个元素
       <span class="token list punctuation">-</span> 第三层嵌套
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>第一项
<ul>
<li>嵌套1</li>
<li>嵌套2</li>
</ul>
</li>
<li>第二项
<ul>
<li>嵌套1
<ul>
<li>嵌套2</li>
</ul>
</li>
</ul>
</li>
</ol>
<h2 id="七、区块引用" tabindex="-1"><a class="header-anchor" href="#七、区块引用" aria-hidden="true">#</a> 七、区块引用</h2>
<p>区块引用是在段落开头使用 <code v-pre>&gt;</code>符号 ，然后后面紧跟一个<strong>空格</strong>符号：</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token blockquote punctuation">></span> 区块引用
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>区块引用</p>
<p>Typora中回车键自动延伸区块</p>
</blockquote>
<h4 id="区块嵌套" tabindex="-1"><a class="header-anchor" href="#区块嵌套" aria-hidden="true">#</a> 区块嵌套</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token blockquote punctuation">></span> 第一层
<span class="token blockquote punctuation">> ></span> 第二层
<span class="token blockquote punctuation">> > ></span> 第三层
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>第一层</p>
<blockquote>
<p>第二层</p>
<blockquote>
<p>第三层</p>
</blockquote>
</blockquote>
</blockquote>
<h4 id="区块中使用列表" tabindex="-1"><a class="header-anchor" href="#区块中使用列表" aria-hidden="true">#</a> 区块中使用列表</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token blockquote punctuation">></span> 区块中使用列表
<span class="token blockquote punctuation">></span> <span class="token list punctuation">1.</span> 第一项
<span class="token blockquote punctuation">></span> <span class="token list punctuation">2.</span> 第二项
<span class="token blockquote punctuation">></span> <span class="token list punctuation">*</span> 111
<span class="token blockquote punctuation">></span> <span class="token list punctuation">*</span> 222
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>区块中使用列表</p>
<ol>
<li>第一项</li>
<li>第二项
<ul>
<li>111</li>
<li>222</li>
</ul>
</li>
</ol>
</blockquote>
<h4 id="列表中使用区块" tabindex="-1"><a class="header-anchor" href="#列表中使用区块" aria-hidden="true">#</a> 列表中使用区块</h4>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token list punctuation">*</span> 第一项
    > 区块
<span class="token list punctuation">*</span> 第二项
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>第一项</p>
<blockquote>
<p>区块</p>
<p>区块</p>
</blockquote>
</li>
<li>
<p>第二项</p>
</li>
</ul>
<h2 id="八、代码" tabindex="-1"><a class="header-anchor" href="#八、代码" aria-hidden="true">#</a> 八、代码</h2>
<p>如果是段落上的一个代码片段可以用反引号把它包起来（<strong>`</strong>），示例：</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token code-snippet code keyword">`alert()`</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>alert()</code></p>
<h3 id="代码区块" tabindex="-1"><a class="header-anchor" href="#代码区块" aria-hidden="true">#</a> 代码区块</h3>
<p>用三个反引号 <strong>```</strong> 包裹一段代码，并指定一种语言（也可以不指定），指定代码语言后会有代码的颜色高亮</p>
<p>本代码区块为示例说明：</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>​```javascript
function test() {
	alert('test')
}
​```
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'test'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="九、链接" tabindex="-1"><a class="header-anchor" href="#九、链接" aria-hidden="true">#</a> 九、链接</h2>
<p>格式：</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token url">[<span class="token content">链接名称</span>](<span class="token url">链接地址</span>)</span>

<span class="token url">[<span class="token content">链接名称</span>](<span class="token url">链接地址,可选的alt</span>)</span>

或

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>链接地址</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例：</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token url">[<span class="token content">百度</span>](<span class="token url">http://www.baidu.com,'百度'</span>)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><a href="http://www.baidu.com,'%E7%99%BE%E5%BA%A6'" target="_blank" rel="noopener noreferrer">百度<ExternalLinkIcon/></a></p>
<p>直接显示链接地址：</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>&lt;http://www.baidu.com>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">http://www.baidu.com<ExternalLinkIcon/></a></p>
<h3 id="变量链接" tabindex="-1"><a class="header-anchor" href="#变量链接" aria-hidden="true">#</a> 变量链接</h3>
<p>链接可以用变量来代替，文档末尾或其他位置附带变量地址：</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>这个链接用 1 作为网址变量 <span class="token url">[<span class="token content">Google</span>][<span class="token variable">1</span>]</span>
这个链接用 baidu 作为网址变量 <span class="token url">[<span class="token content">Baidu</span>][<span class="token variable">baidu</span>]</span>

然后在文档的结尾或其他位置给变量赋值（网址）
  <span class="token url-reference url"><span class="token punctuation">[</span><span class="token variable">1</span><span class="token punctuation">]</span><span class="token punctuation">:</span> http://www.google.com/</span>
  <span class="token url-reference url"><span class="token punctuation">[</span><span class="token variable">baidu</span><span class="token punctuation">]</span><span class="token punctuation">:</span> http://www.baidu.com/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个链接用 1 作为网址变量 <a href="http://www.google.com" target="_blank" rel="noopener noreferrer">Google<ExternalLinkIcon/></a></p>
<p>这个链接用 baidu 作为网址变量 <a href="http://www.baidu.com/" target="_blank" rel="noopener noreferrer">Baidu<ExternalLinkIcon/></a></p>
<h3 id="github仓库中使用内部链接" tabindex="-1"><a class="header-anchor" href="#github仓库中使用内部链接" aria-hidden="true">#</a> Github仓库中使用内部链接</h3>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>可使用相对路径（前提是有该路径下的文件）
<span class="token url">[<span class="token content">test</span>](<span class="token url">test.md</span>)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><RouterLink to="/03.%E6%8A%80%E6%9C%AF/01.%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3/md-img/test.html">test</RouterLink></p>
<h3 id="锚点链接" tabindex="-1"><a class="header-anchor" href="#锚点链接" aria-hidden="true">#</a> 锚点链接</h3>
<p>本文件中每一个标题都是一个锚点，和HTML的锚点（<code v-pre>#</code>）类似</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token url">[<span class="token content">Markdown</span>](<span class="token url">#Markdown</span>)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>注： github对含有标点符号的标题进行锚点时会忽略掉标点符号，
本页中，如果这样写则无法跳转：[链接](#九、链接)
正确写法：[链接](#九链接)</p>
</blockquote>
<p><a href="#%E4%B8%80Markdown">Markdown</a></p>
<p><a href="#%E4%B9%9D%E9%93%BE%E6%8E%A5">链接</a></p>
<p><a href="#%E6%B5%81%E7%A8%8B%E5%9B%BE">流程图</a></p>
<h2 id="十、图片" tabindex="-1"><a class="header-anchor" href="#十、图片" aria-hidden="true">#</a> 十、图片</h2>
<p>和链接的区别是前面多一个感叹号<code v-pre>!</code></p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token url"><span class="token operator">!</span>[<span class="token content">图片名</span>](<span class="token url">图片链接</span>)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当然，你也可以像链接那样对图片地址使用变量:</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>这里链接用 img 作为图片地址变量
然后在文档的结尾或其他位置给变量赋值（图片地址）
<span class="token url"><span class="token operator">!</span>[<span class="token content">RUNOOB</span>][<span class="token variable">img</span>]</span>
<span class="token url-reference url"><span class="token punctuation">[</span><span class="token variable">img</span><span class="token punctuation">]</span><span class="token punctuation">:</span> https://raw.githubusercontent.com/xugaoyi/image_store/master/blog/md_logo.png</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://raw.githubusercontent.com/xugaoyi/image_store/master/blog/md_logo.png" alt="RUNOOB"></p>
<h3 id="图片宽高" tabindex="-1"><a class="header-anchor" href="#图片宽高" aria-hidden="true">#</a> 图片宽高</h3>
<p>如下想设置图片宽高，可以使用 <code v-pre>&lt;img&gt;</code> 标签。</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/xugaoyi/image_store/master/blog/md_logo.png<span class="token punctuation">"</span></span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>50px<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>30px<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><img src="https://raw.githubusercontent.com/xugaoyi/image_store/master/blog/md_logo.png" width="50px" height="30px">
<h3 id="相对路径以及github中使用图片" tabindex="-1"><a class="header-anchor" href="#相对路径以及github中使用图片" aria-hidden="true">#</a> 相对路径以及Github中使用图片</h3>
<p>不管是在本地还是在github同一个仓库中，如果图片存在，可以使用<strong>相对路径</strong>。</p>
<p>相对路径图片：</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token url"><span class="token operator">!</span>[<span class="token content">头像图片</span>](<span class="token url">./md-img/test.jpg</span>)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>github上如果引用其他github仓库中的图片则要注意地址格式：<code v-pre>仓库地址/raw/分支名/图片路径</code> 或 <code v-pre>https://raw.githubusercontent.com/用户名/仓库名/分支名/图片路径</code></p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token url"><span class="token operator">!</span>[<span class="token content">其他仓库的图片1</span>](<span class="token url">https://github.com/xugaoyi/vue-music/raw/master/src/common/image/default.png</span>)</span>
或
<span class="token url"><span class="token operator">!</span>[<span class="token content">其他仓库的图片2</span>](<span class="token url">https://raw.githubusercontent.com/xugaoyi/image_store/master/blog/md_logo.png</span>)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://github.com/xugaoyi/vue-music/raw/master/src/common/image/default.png" alt="其他仓库的图片"></p>
<p><img src="https://raw.githubusercontent.com/xugaoyi/image_store/master/blog/md_logo.png" alt="其他仓库的图片2"></p>
<h2 id="十一、表格" tabindex="-1"><a class="header-anchor" href="#十一、表格" aria-hidden="true">#</a> 十一、表格</h2>
<p>制作表格使用 <code v-pre>|</code>来分隔不同的单元格，使用<code v-pre>-</code>来分隔表头和其他行。</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token table"><span class="token table-header-row"><span class="token punctuation">|</span><span class="token table-header important">  表头   </span><span class="token punctuation">|</span><span class="token table-header important"> 表头  </span><span class="token punctuation">|</span>
</span><span class="token table-line"><span class="token punctuation">|</span>  <span class="token punctuation">----</span>  <span class="token punctuation">|</span> <span class="token punctuation">----</span>  <span class="token punctuation">|</span>
</span><span class="token table-data-rows"><span class="token punctuation">|</span><span class="token table-data"> 单元格  </span><span class="token punctuation">|</span><span class="token table-data"> 单元格 </span><span class="token punctuation">|</span>
<span class="token punctuation">|</span><span class="token table-data"> 单元格  </span><span class="token punctuation">|</span><span class="token table-data"> 单元格 </span><span class="token punctuation">|</span>
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table>
<thead>
<tr>
<th style="text-align:center">表头</th>
<th style="text-align:center">表头</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">单元格</td>
<td style="text-align:center">单元格</td>
</tr>
<tr>
<td style="text-align:center">单元格</td>
<td style="text-align:center">单元格</td>
</tr>
</tbody>
</table>
<p><strong>对齐方式</strong></p>
<ul>
<li><strong>-:</strong> 设置内容和标题栏居右对齐</li>
<li><strong>:-</strong> 设置内容和标题栏居左对齐</li>
<li><strong>:-:</strong> 设置内容和标题栏居中对齐</li>
</ul>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token table"><span class="token table-header-row"><span class="token punctuation">|</span><span class="token table-header important"> 左对齐 </span><span class="token punctuation">|</span><span class="token table-header important"> 右对齐 </span><span class="token punctuation">|</span><span class="token table-header important"> 居中对齐 </span><span class="token punctuation">|</span>
</span><span class="token table-line"><span class="token punctuation">|</span> <span class="token punctuation">:-----</span><span class="token punctuation">|</span> <span class="token punctuation">----:</span> <span class="token punctuation">|</span> <span class="token punctuation">:----:</span> <span class="token punctuation">|</span>
</span><span class="token table-data-rows"><span class="token punctuation">|</span><span class="token table-data"> 单元格 </span><span class="token punctuation">|</span><span class="token table-data"> 单元格 </span><span class="token punctuation">|</span><span class="token table-data"> 单元格 </span><span class="token punctuation">|</span>
<span class="token punctuation">|</span><span class="token table-data"> 单元格 </span><span class="token punctuation">|</span><span class="token table-data"> 单元格 </span><span class="token punctuation">|</span><span class="token table-data"> 单元格 </span><span class="token punctuation">|</span>
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table>
<thead>
<tr>
<th style="text-align:left">左对齐</th>
<th style="text-align:right">右对齐</th>
<th style="text-align:center">居中对齐</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">单元格</td>
<td style="text-align:right">单元格</td>
<td style="text-align:center">单元格</td>
</tr>
<tr>
<td style="text-align:left">单元格</td>
<td style="text-align:right">单元格</td>
<td style="text-align:center">单元格</td>
</tr>
</tbody>
</table>
<h2 id="十二、emoji表情包" tabindex="-1"><a class="header-anchor" href="#十二、emoji表情包" aria-hidden="true">#</a> 十二、Emoji表情包</h2>
<p>Emoji表情英文名的前后加冒号，Typore上先输入冒号再输入首字母有表情提示</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>:smirk:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>💋
😸🙈🐴
😏😊😃😄 ☀️</p>
<p>更多表情名称请查看：<a href="https://www.webfx.com/tools/emoji-cheat-sheet/" target="_blank" rel="noopener noreferrer">表情包清单<ExternalLinkIcon/></a></p>
<h2 id="十三、其他技巧" tabindex="-1"><a class="header-anchor" href="#十三、其他技巧" aria-hidden="true">#</a> 十三、其他技巧</h2>
<h3 id="支持的-html-元素" tabindex="-1"><a class="header-anchor" href="#支持的-html-元素" aria-hidden="true">#</a> 支持的 HTML 元素</h3>
<p>不在 Markdown 语法涵盖范围之内的标签，都可以直接在文档里面用 HTML 撰写。</p>
<p>目前支持的 HTML 元素有：<code v-pre>&lt;kbd&gt; &lt;b&gt; &lt;i&gt; &lt;em&gt; &lt;sup&gt; &lt;sub&gt; &lt;br&gt;</code>等等 ，如：</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>使用 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>kbd</span><span class="token punctuation">></span></span>Ctrl<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>kbd</span><span class="token punctuation">></span></span>+<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>kbd</span><span class="token punctuation">></span></span>Alt<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>kbd</span><span class="token punctuation">></span></span>+<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>kbd</span><span class="token punctuation">></span></span>Del<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>kbd</span><span class="token punctuation">></span></span> 重启电脑
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd> 重启电脑</p>
<p><b>我是使用b标签的加粗字体</b></p>
<h3 id="转义" tabindex="-1"><a class="header-anchor" href="#转义" aria-hidden="true">#</a> 转义</h3>
<p>Markdown 使用了很多特殊符号来表示特定的意义，如果需要显示特定的符号则需要使用反斜杠转义字符：</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code><span class="token bold"><span class="token punctuation">**</span><span class="token content">未转义星号显示加粗</span><span class="token punctuation">**</span></span>
\*\* 转义显示星号 \*\*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>未转义星号显示加粗</strong>
** 转义显示星号 **</p>
<p>Markdown 支持以下这些符号前面加上反斜杠来帮助插入普通的符号：</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>\   反斜线
`   反引号
<span class="token list punctuation">*</span>   星号
_   下划线
{}  花括号
[]  方括号
()  小括号
<span class="token title important"><span class="token punctuation">#</span>   井字号</span>
<span class="token list punctuation">+</span>   加号
<span class="token list punctuation">-</span>   减号
.   英文句点
!   感叹号
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p>*** <strong>以下部分在Github或其他在线预览中暂未支持</strong> ***</p>
<hr>
<h3 id="数学公式" tabindex="-1"><a class="header-anchor" href="#数学公式" aria-hidden="true">#</a> 数学公式</h3>
<p>当你需要在编辑器中插入数学公式时，可以使用两个美元符 $$ 包裹 TeX 或 LaTeX 格式的数学公式来实现。提交后，问答和文章页会根据需要加载 Mathjax 对数学公式进行渲染。如：</p>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>$$
\mathbf{V}_1 \times \mathbf{V}_2 =  \begin{vmatrix}
\mathbf{i} &amp; \mathbf{j} &amp; \mathbf{k} \\
\frac{\partial X}{\partial u} &amp;  \frac{\partial Y}{\partial u} &amp; 0 \\
\frac{\partial X}{\partial v} &amp;  \frac{\partial Y}{\partial v} &amp; 0 \\
\end{vmatrix}
$$tep1}{\style{visibility:hidden}{(x+1)(x+1)}}
$$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>$$
\mathbf{V}_1 \times \mathbf{V}_2 =  \begin{vmatrix}
\mathbf{i} &amp; \mathbf{j} &amp; \mathbf{k} \
\frac{\partial X}{\partial u} &amp;  \frac{\partial Y}{\partial u} &amp; 0 \
\frac{\partial X}{\partial v} &amp;  \frac{\partial Y}{\partial v} &amp; 0 \
\end{vmatrix}
$$</p>
<h3 id="图表" tabindex="-1"><a class="header-anchor" href="#图表" aria-hidden="true">#</a> 图表</h3>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>​```chart
,Budget,Income,Expenses,Debt
June,5000,8000,4000,6000
July,3000,1000,4000,3000
Aug,5000,7000,6000,3000
Sep,7000,2000,3000,1000
Oct,6000,5000,4000,2000
Nov,4000,3000,5000,

type: pie
title: Monthly Revenue
x.title: Amount
y.title: Month
y.suffix: $
​```
​```mermaid
sequenceDiagram
A->>B: 是否已收到消息？
B-->>A: 已收到消息
​```
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注：在Typora中未支持</p>
</blockquote>
<h3 id="流程图" tabindex="-1"><a class="header-anchor" href="#流程图" aria-hidden="true">#</a> 流程图</h3>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>语法：
​```mermaid
graph TD
A[模块A] -->|A1| B(模块B)
B --> C{判断条件C}
C -->|条件C1| D[模块D]
C -->|条件C2| E[模块E]
C -->|条件C3| F[模块F]
​```
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>流程图相关文章：</p>
<p><a href="https://www.jianshu.com/p/b421cc723da5" target="_blank" rel="noopener noreferrer">https://www.jianshu.com/p/b421cc723da5<ExternalLinkIcon/></a></p>
<p><a href="http://www.imooc.com/article/292708" target="_blank" rel="noopener noreferrer">http://www.imooc.com/article/292708<ExternalLinkIcon/></a></p>
<h3 id="时序图" tabindex="-1"><a class="header-anchor" href="#时序图" aria-hidden="true">#</a> 时序图</h3>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>​```mermaid
sequenceDiagram
A->>B: 是否已收到消息？
B-->>A: 已收到消息
​```
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="甘特图" tabindex="-1"><a class="header-anchor" href="#甘特图" aria-hidden="true">#</a> 甘特图</h3>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre v-pre class="language-markdown"><code>​```mermaid
gantt
title 甘特图
dateFormat  YYYY-MM-DD
section 项目A
任务1           :a1, 2018-06-06, 30d
任务2     :after a1  , 20d
section 项目B
任务3      :2018-06-12  , 12d
任务4      : 24d
​```
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​																														     									<a href="#markdown%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B">回到顶部</a></p>
</div></template>


