<template><div><h1 id="flex布局案例-输入框布局" tabindex="-1"><a class="header-anchor" href="#flex布局案例-输入框布局" aria-hidden="true">#</a> flex布局案例-输入框布局</h1>
<blockquote>
<p>可用<kbd>F12</kbd>开发者工具查看元素及样式，可打开codepen在线编辑代码。</p>
</blockquote>
<p>::: demo [vanilla]</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>InputAddOn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>InputAddOn-item<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>icon<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>InputAddOn-field<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>input宽度自适应<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>InputAddOn-item<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>提交<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Media<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Media-figure<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>左侧固定<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Media-body<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应右侧自适应<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">.InputAddOn</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.InputAddOn-field</span> <span class="token punctuation">{</span>
    <span class="token property">flex</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.Media</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">align-items</span><span class="token punctuation">:</span> flex-start<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.Media-figure</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> #eee<span class="token punctuation">;</span>
    <span class="token property">margin-right</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.Media-body</span> <span class="token punctuation">{</span>
    <span class="token property">flex</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">/* 基础样式 */</span>
  <span class="token selector">input:-webkit-autofill,
  select:-webkit-autofill</span> <span class="token punctuation">{</span>
    <span class="token property">-webkit-box-shadow</span><span class="token punctuation">:</span> 0 0 0px 1000px white inset <span class="token important">!important</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">input</span> <span class="token punctuation">{</span>
    <span class="token property">outline-color</span><span class="token punctuation">:</span> invert<span class="token punctuation">;</span>
    <span class="token property">outline-style</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token property">outline-width</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
    <span class="token property">text-shadow</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token property">-webkit-appearance</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token property">-webkit-user-select</span><span class="token punctuation">:</span> text<span class="token punctuation">;</span>
    <span class="token property">outline-color</span><span class="token punctuation">:</span> transparent<span class="token punctuation">;</span>
    <span class="token property">box-shadow</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.InputAddOn-item</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #ccc<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> #eee
  <span class="token punctuation">}</span>
  <span class="token selector">.InputAddOn-field</span> <span class="token punctuation">{</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 1px 6px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #ccc<span class="token punctuation">;</span>
    <span class="token property">border-left</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token property">border-right</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
<blockquote>
<p>参考：<a href="http://www.ruanyifeng.com/blog/2015/07/flex-examples.html" target="_blank" rel="noopener noreferrer">http://www.ruanyifeng.com/blog/2015/07/flex-examples.html<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


