<template><div><h1 id="github高级搜索技巧" tabindex="-1"><a class="header-anchor" href="#github高级搜索技巧" aria-hidden="true">#</a> GitHub高级搜索技巧</h1>
<p><code v-pre>in:name &lt;关键字&gt;</code>
仓库名称带关键字查询</p>
<p><code v-pre>in:description &lt;关键字&gt;</code>
仓库描述带关键字查询</p>
<p><code v-pre>in:readme &lt;关键字&gt;</code>
README文件带关键字查询</p>
<!-- more -->
<p><code v-pre>stars(fork): &gt;(=) &lt;数字&gt; &lt;关键字&gt;</code>
star或fork数大于(或等于)指定数字的带关键字查询</p>
<p><code v-pre>stars(fork): 10..20 &lt;关键词&gt;</code>
star或fork数在10到20之间的带关键字查询</p>
<p><code v-pre>size:&gt;=5000 &lt;关键词&gt;</code>
限定仓库大于等于5000K的带关键字查询</p>
<p><code v-pre>pushed(created):&gt;2019-11-15 &lt;关键字&gt;</code>
更新 或 创建 日期在2019年11月16日之后的带关键字查询</p>
<p><code v-pre>license:apache-2.0 &lt;关键字&gt;</code>
LICENSE为apache-2.0的带关键字查询</p>
<p><code v-pre>language:java &lt;关键词&gt;</code>
仓库语言为Java的带关键字查询</p>
<p><code v-pre>user:&lt;用户名&gt;</code>
查询某个用户的项目</p>
<p><code v-pre>org:&lt;组织名&gt;</code>
查询某个组织的项目</p>
<p>*<strong>以上查询条件可组合使用，空格隔开</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 示例1：搜索仓库名包含javascript，并且stars数大于1000的项目</span>
in:name javascript stars:<span class="token operator">></span><span class="token number">1000</span>

<span class="token comment"># 示例2：搜索描述中包含"小程序"，并且fork大于100，并且最近更新时间在2019-11-15之后的，并且使用开发语言为vue的项目</span>
in:description 小程序 fork:<span class="token operator">></span><span class="token number">100</span> pushed:<span class="token operator">></span><span class="token number">2019</span>-11-15 language:vue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>*<strong>或使用高级搜索页搜索：</strong></p>
<p><a href="https://github.com/search/advanced" target="_blank" rel="noopener noreferrer">https://github.com/search/advanced<ExternalLinkIcon/></a></p>
</div></template>


