<template><div><h1 id="「布局技巧」图片未加载前自动撑开元素高度" tabindex="-1"><a class="header-anchor" href="#「布局技巧」图片未加载前自动撑开元素高度" aria-hidden="true">#</a> 「布局技巧」图片未加载前自动撑开元素高度</h1>
<p>在移动端开发中，有一些元素是根据图片高度来自动撑开的 ，高度不能写死（如轮播图的外层元素）。在网络较慢的情况下，图片加载需要一些时间，此时该元素的高度没有被撑开，在网页布局上会有一些不想看到的效果。</p>
<!-- more -->
<p>这种情况我们可以设置如下样式来设置该元素的高度：</p>
<div class="language-stylus line-numbers-mode" data-ext="styl"><pre v-pre class="language-stylus"><code><span class="token selector">.wrapper</span>
  <span class="token property-declaration"><span class="token property">overflow</span> hidden</span>
  <span class="token property-declaration"><span class="token property">width</span> <span class="token number">100</span><span class="token unit">%</span></span>
  <span class="token property-declaration"><span class="token property">height</span> <span class="token number">0</span></span>
  <span class="token property-declaration"><span class="token property">padding-bottom</span> <span class="token number">26.66</span><span class="token unit">%</span> <span class="token comment">// 这个数值是图片的高宽比，即 高/宽</span></span>
  <span class="token property-declaration"><span class="token property">background</span> <span class="token hexcode">#eee</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>padding-bottom</code> 的取值是图片的高宽比（即，高/宽），它会根据 <code v-pre>width</code>值的<code v-pre>26.66%</code>计算，最终元素的高度会和图片加载完成后的高度一致。</p>
<p>也可以使用<code v-pre>vw</code>的方法，但在一些浏览器可能有兼容性问题：</p>
<div class="language-stylus line-numbers-mode" data-ext="styl"><pre v-pre class="language-stylus"><code><span class="token selector">.wrapper</span>
  <span class="token property-declaration"><span class="token property">width</span> <span class="token number">100</span><span class="token unit">%</span></span>
  <span class="token property-declaration"><span class="token property">height</span> <span class="token number">26.66</span><span class="token unit">vw</span></span>
  <span class="token property-declaration"><span class="token property">background</span> <span class="token hexcode">#eee</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>vw</code>，viewpoint width，视窗宽度，1vw=视窗宽度的1%</p>
<p><code v-pre>vh</code>，viewpoint height，视窗高度，1vh=视窗高度的1%</p>
<p>更多 <a href="https://www.runoob.com/cssref/css-units.html" target="_blank" rel="noopener noreferrer">CSS单位<ExternalLinkIcon/></a>。</p>
</blockquote>
</div></template>


