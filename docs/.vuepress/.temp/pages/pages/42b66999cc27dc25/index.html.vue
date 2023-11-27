<template><div><h1 id="文字在一行或多行时超出显示省略号" tabindex="-1"><a class="header-anchor" href="#文字在一行或多行时超出显示省略号" aria-hidden="true">#</a> 文字在一行或多行时超出显示省略号</h1>
<h2 id="一行超出显示省略" tabindex="-1"><a class="header-anchor" href="#一行超出显示省略" aria-hidden="true">#</a> 一行超出显示省略</h2>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
<span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><!-- more -->
<p>:::demo [vanilla]</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box-42b6<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
    <span class="token selector">.box-42b6</span><span class="token punctuation">{</span>
        <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #999<span class="token punctuation">;</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>

        <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
        <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
        <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
<h2 id="两行-多行-超出显示省略号" tabindex="-1"><a class="header-anchor" href="#两行-多行-超出显示省略号" aria-hidden="true">#</a> 两行（多行）超出显示省略号</h2>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token property">white-space</span><span class="token punctuation">:</span> normal<span class="token punctuation">;</span>
<span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
<span class="token property">display</span><span class="token punctuation">:</span> -webkit-box<span class="token punctuation">;</span>
<span class="token property">-webkit-line-clamp</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>
<span class="token property">-webkit-box-orient</span><span class="token punctuation">:</span> vertical<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>显示的行数由<code v-pre>line-clamp</code>样式的值决定。</p>
<p>:::demo [vanilla]</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box2-42b6<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字演示文字<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
    <span class="token selector">.box2-42b6</span><span class="token punctuation">{</span>
        <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #999<span class="token punctuation">;</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>

        <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
        <span class="token property">white-space</span><span class="token punctuation">:</span> normal<span class="token punctuation">;</span>
        <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
        <span class="token property">display</span><span class="token punctuation">:</span> -webkit-box<span class="token punctuation">;</span>
        <span class="token property">-webkit-line-clamp</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>
        <span class="token property">-webkit-box-orient</span><span class="token punctuation">:</span> vertical<span class="token punctuation">;</span>

      <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
<h2 id="js判断是否显示了省略号" tabindex="-1"><a class="header-anchor" href="#js判断是否显示了省略号" aria-hidden="true">#</a> JS判断是否显示了省略号</h2>
<p>有时候我们需要知道是否已经溢出，显示了省略号，可以用到<code v-pre>clientHeight</code>和<code v-pre>scrollHeight</code>的知识：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> cHeight <span class="token operator">=</span> noWrapDiv<span class="token punctuation">.</span>clientHeight<span class="token punctuation">;</span>
<span class="token keyword">let</span> sHeight <span class="token operator">=</span> noWrapDiv<span class="token punctuation">.</span>scrollHeight<span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>sHeight <span class="token operator">></span> cHeight<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"已经溢出显示省略号"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"没有溢出"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>这里可以用于判断是否溢出显示展开收缩按钮。</p>
</blockquote>
<h4 id="知识点拓展" tabindex="-1"><a class="header-anchor" href="#知识点拓展" aria-hidden="true">#</a> 知识点拓展</h4>
<p>scrollHeight：元素内容的高度，包括由于溢出导致的视图中不可见内容。不包含滚动条、边框和外边距。</p>
<p>clientHeight：元素内容的可视区的高度，包含内边距，但不包括水平滚动条、边框和外边距。</p>
<p>offsetHeight：元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数。</p>
</div></template>


