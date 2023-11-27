<template><div><h1 id="从box-sizing属性入手-了解盒子模型" tabindex="-1"><a class="header-anchor" href="#从box-sizing属性入手-了解盒子模型" aria-hidden="true">#</a> 从box-sizing属性入手，了解盒子模型</h1>
<h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2>
<p>先声明一下运用的场景，假如项目布局使用的是<strong>自适应</strong>的布局方式，div给出的宽度是<strong>百分比</strong>的形式，即占窗口宽度的100%，但边框<code v-pre>border</code>和内边距<code v-pre>padding</code>是用像素来表示的，此时就会造成一个问题是div总宽度超过窗口宽度。为了避免这种问题，可以使用属性<code v-pre>box-sizing:border-box</code>来把 <strong>标准盒模型</strong> 变成 <strong>代替(IE)盒模型</strong> ，从而使div的总宽度依然是100%</p>
<!-- more -->
<h2 id="什么是css-盒模型" tabindex="-1"><a class="header-anchor" href="#什么是css-盒模型" aria-hidden="true">#</a> 什么是CSS 盒模型?</h2>
<p>页面布局中，一个元素的外边距（margin）、 边框（border）、内边距（padding）、内容（content）组成一个盒模型。盒模型可分为<strong>标准盒模型</strong> 和 <strong>代替（IE）盒模型</strong>。</p>
<h2 id="标准盒模型" tabindex="-1"><a class="header-anchor" href="#标准盒模型" aria-hidden="true">#</a> 标准盒模型</h2>
<p>在标准模型中，如果你给盒设置 <code v-pre>width</code> 和 <code v-pre>height</code>，实际设置的是内容区域( <em>content box</em>)的宽高。 <code v-pre>padding</code> 和 <code v-pre>border</code> 再加上设置的宽高一起决定整个盒子的大小。</p>
<p><strong>示例：</strong></p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 25px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 5px solid black<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果使用标准模型，元素总宽度 = 160px （100+25+25+5+5），总高度 = 110px (50 + 25 + 25 + 5 + 5)，即内容区域<code v-pre>content box</code>加 <code v-pre>padding</code> 和 <code v-pre>border</code> 。</p>
<blockquote>
<p><strong>注</strong>: margin 不计入实际大小 —— 当然，它会影响盒子在页面所占空间，但是影响的是盒子外部空间。</p>
</blockquote>
<h2 id="代替-ie-盒模型" tabindex="-1"><a class="header-anchor" href="#代替-ie-盒模型" aria-hidden="true">#</a> 代替（IE）盒模型</h2>
<p>你可能会认为盒子的大小还要加上边框和内边距，这样很麻烦。 因为这个原因，css还有一个替代盒模型。使用这个模型，所有宽度都是可见宽度，所以内容宽度是该宽度减去边框和填充部分。使用上面相同的样式得到总宽高是 width = 100px, height = 50px。</p>
<p>默认浏览器会使用标准模型。如果需要使用替代模型，您可以通过为其设置 <code v-pre>box-sizing: border-box</code> 来实现。 这样就可以告诉浏览器使用 <code v-pre>border-box</code> 来定义区域，从而设定您想要的大小。</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span> 
  <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span> 
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="box-sizing属性" tabindex="-1"><a class="header-anchor" href="#box-sizing属性" aria-hidden="true">#</a> box-sizing属性</h2>
<p>CSS中的 <strong><code v-pre>box-sizing</code></strong> 属性用于告诉浏览器如何计算一个元素是总宽度和总高度</p>
<iframe class="interactive" frameborder="0" height="390" src="https://interactive-examples.mdn.mozilla.net/pages/css/box-sizing.html" title="MDN Web Docs Interactive Example" width="100%"></iframe>
<p>在 <a href="https://developer.mozilla.org/zh-CN/docs/CSS/Box_model" target="_blank" rel="noopener noreferrer">CSS盒子模型<ExternalLinkIcon/></a> 的默认定义里，你对一个元素所设置的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/width" target="_blank" rel="noopener noreferrer"><code v-pre>width</code><ExternalLinkIcon/></a> 与 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/height" target="_blank" rel="noopener noreferrer"><code v-pre>height</code><ExternalLinkIcon/></a> 只会应用到这个元素的内容区。如果这个元素有任何的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/border" target="_blank" rel="noopener noreferrer"><code v-pre>border</code><ExternalLinkIcon/></a> 或 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding" target="_blank" rel="noopener noreferrer"><code v-pre>padding</code><ExternalLinkIcon/></a> ，绘制到屏幕上时的盒子宽度和高度会加上设置的边框和内边距值。这意味着当你调整一个元素的宽度和高度时需要时刻注意到这个元素的边框和内边距。当我们实现响应式布局时，这个特点尤其烦人。</p>
<p>box-sizing 属性可以被用来调整这些表现:</p>
<ul>
<li>
<p><code v-pre>content-box</code> 是默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。</p>
<ul>
<li>
<p>尺寸计算公式：</p>
<p><code v-pre>width</code> = 内容的宽度</p>
<p><code v-pre>height</code> = 内容的高度</p>
</li>
</ul>
</li>
<li>
<p><code v-pre>border-box</code> 告诉浏览器：你想要设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px，那么这100px会包含它的border和padding，内容区的实际宽度是width减去(border + padding)的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。</p>
<ul>
<li>
<p>尺寸计算公式：</p>
<p><em><code v-pre>width</code> = border + padding + 内容的宽度</em></p>
<p><em><code v-pre>height</code> = border + padding + 内容的高度</em></p>
</li>
</ul>
</li>
</ul>
<p>来源：<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing" target="_blank" rel="noopener noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing<ExternalLinkIcon/></a></p>
</div></template>


