<template><div><h1 id="flex布局案例-基础" tabindex="-1"><a class="header-anchor" href="#flex布局案例-基础" aria-hidden="true">#</a> flex布局案例-基础</h1>
<blockquote>
<p>可用<kbd>F12</kbd>开发者工具查看元素及样式，可打开codepen在线编辑代码。</p>
</blockquote>
<p>::: demo [vanilla]</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>6<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>7<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
<span class="token comment">/* 父元素上定义弹性盒模型，称之为 “容器” */</span>
<span class="token selector">.box</span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 350px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #eee<span class="token punctuation">;</span>
  <span class="token comment">/* 基本概念：.box为容器，.box下的span为项目；.box的x轴为主轴，y轴为交叉轴 */</span>
  <span class="token comment">/* flex 定义为弹性盒模型 */</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token comment">/*flex-direction 排列方向： row 行（默认） | row-reverse 行-反转  | column 列 | column-reverse 列-反转 */</span>
  <span class="token property">flex-direction</span><span class="token punctuation">:</span> row<span class="token punctuation">;</span> 
  <span class="token comment">/*flex-wrap 是否换行： nowrap 不换行（默认，可能会压缩项目宽度） | wrap 换行 | wrap-reverse 换行-反转，第一行在下方 */</span>
  <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap<span class="token punctuation">;</span>
  <span class="token comment">/* flex-flow  方向和换行的简写：默认值为row nowrap，方向 和 是否换行 的取值 */</span>
  <span class="token property">flex-flow</span><span class="token punctuation">:</span> row wrap<span class="token punctuation">;</span>
  <span class="token comment">/* justify-content 项目在主轴上的对齐方式: flex-start 左对齐（默认） | flex-end 右对齐 | center 居中 | space-between 两端对齐 | space-around 项目两侧的间隔相等*/</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> space-around<span class="token punctuation">;</span>
  <span class="token comment">/* align-items 项目在交叉轴上的对齐方式：stretch（默认）伸展，如果项目未设置高度或设为auto，将占满整个容器的高度 | 
  flex-start 交叉轴的起点对齐 | flex-end 交叉轴的终点对齐 | center 交叉轴的中心点对齐 | baseline 项目的第一行文字的基线对齐（适用于每个项目高度不一致，以项目中的文字为基准对齐） */</span>
  <span class="token property">align-items</span><span class="token punctuation">:</span> center
  <span class="token comment">/* align-content 多根轴线的对齐方式（一排项目为一根轴线，只有一根轴线时此样式不起作用）: 
  stretch（默认）伸展，轴线占满整个交叉轴 | flex-start 容器顶部对齐 | flex-end 容器底部对齐 | center 与交叉轴的中点对齐 |
  space-between 与交叉轴两端对齐，轴线之间的间隔平均分布| space-around 每根轴线两侧的间隔都相等*/</span>
  align-content：flex-start
  <span class="token comment">/* 代码单词中文含义 ：
  flex 弹性； direction 方向； wrap 外套、包； flow 流动
  justify 对齐； content 内容；space 空间、距离；between 在...之间；around 周围的
  align 排列；stretch 伸展；
  */</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 子元素称之为 “项目” */</span>
<span class="token selector">.box span</span><span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span>block<span class="token punctuation">;</span><span class="token property">width</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span><span class="token property">height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span><span class="token property">background</span><span class="token punctuation">:</span> mediumspringgreen<span class="token punctuation">;</span><span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span><span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span><span class="token property">line-height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
  <span class="token comment">/* flex-grow 项目的放大比例，默认为0，即如果存在剩余空间，也不放大;
  如果所有为1时，则它们将等分剩余空间（如果有的话）。
  如果其中一个项目为2，其他项目都为1，则为2的占据的剩余空间将比其他项多一倍。
  */</span>
  <span class="token property">flex-grow</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token comment">/* grow 扩大 */</span>
  <span class="token comment">/* flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。 
  如果所有项目都为1，当空间不足时，都将等比例缩小。
  如果其中一个项目为0，其他项目都为1，则空间不足时，为0的不缩小*/</span>
  <span class="token property">flex-shrink</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span> <span class="token comment">/* shrink 缩小 */</span>
  <span class="token comment">/* flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（宽度）。
  浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。
  它可以设为跟`width`或`height`属性一样的值（比如50px），则项目将占据固定空间*/</span>
  <span class="token property">flex-basis</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span> <span class="token comment">/* basis 基础 */</span>
  <span class="token comment">/* flex属性是flex-grow,flex-shrink 和 flex-basis的简写，默认值为`0 1 auto`。后两个属性可选。
  该属性有两个快捷值：auto (1 1 auto)，即放大 和 none (0 0 auto)，即缩小。
  建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。*/</span>
  <span class="token property">flex</span><span class="token punctuation">:</span>0 1 auto<span class="token punctuation">;</span> <span class="token comment">/* flex: 0放大 1缩小 auto原本宽度*/</span>
<span class="token punctuation">}</span>
<span class="token selector">.box span:nth-child(2)</span><span class="token punctuation">{</span>
  <span class="token comment">/* order 项目的排列顺序。数值越小，排列越靠前，默认为0 ; 取值：正负整数。*/</span>
  <span class="token property">order</span><span class="token punctuation">:</span> -1<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box span:nth-child(7)</span><span class="token punctuation">{</span>
  <span class="token comment">/* align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。
  默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
  取值：auto（默认） | flex-start | flex-end | center | baseline | stretch。
  */</span>
  <span class="token property">align-self</span><span class="token punctuation">:</span> flex-end<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
<blockquote>
<p>参考：<a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html" target="_blank" rel="noopener noreferrer">http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


