<template><div><h1 id="css3之animation动画" tabindex="-1"><a class="header-anchor" href="#css3之animation动画" aria-hidden="true">#</a> CSS3之animation动画</h1>
<blockquote>
<p>可用<kbd>F12</kbd>开发者工具查看元素及样式，可打开codepen在线编辑代码。</p>
</blockquote>
<p>::: demo [vanilla]</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>animationBox<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>rotate<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>旋转动画1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>play<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>img<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>旋转动画2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>p2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>p2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>elasticity<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>弹性动画<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>elasticity2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>曲线弹性<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">.animationBox</span><span class="token punctuation">{</span><span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span><span class="token punctuation">}</span>
  <span class="token selector">.animationBox>div</span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span><span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span><span class="token property">background</span><span class="token punctuation">:</span> #eee<span class="token punctuation">;</span><span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span><span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span><span class="token property">line-height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span><span class="token property">margin</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span><span class="token property">float</span><span class="token punctuation">:</span>left<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.rotate</span><span class="token punctuation">{</span>
    <span class="token property">animation</span><span class="token punctuation">:</span> rotate 5s linear infinite
  <span class="token punctuation">}</span>
  <span class="token selector">.rotate:hover</span><span class="token punctuation">{</span> <span class="token property">animation-play-state</span><span class="token punctuation">:</span> paused<span class="token punctuation">}</span>
  <span class="token atrule"><span class="token rule">@keyframes</span> rotate</span> <span class="token punctuation">{</span>
    <span class="token selector">0%</span><span class="token punctuation">{</span><span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotate</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span>
  <span class="token selector">100%</span><span class="token punctuation">{</span><span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotate</span><span class="token punctuation">(</span>360deg<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.animationBox>.play</span> <span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 50px 30px<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span>none<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.play .img</span><span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">left</span><span class="token punctuation">:</span>0<span class="token punctuation">;</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span><span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span> <span class="token property">background</span><span class="token punctuation">:</span> #eee<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>

    <span class="token property">animation</span><span class="token punctuation">:</span> rotate 5s linear infinite
  <span class="token punctuation">}</span>
  <span class="token selector">.play span</span> <span class="token punctuation">{</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>
    <span class="token property">left</span><span class="token punctuation">:</span>1px<span class="token punctuation">;</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 96px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 96px<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #999<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.play span p</span><span class="token punctuation">{</span><span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span><span class="token property">width</span><span class="token punctuation">:</span> 4px<span class="token punctuation">;</span><span class="token property">height</span><span class="token punctuation">:</span> 4px<span class="token punctuation">;</span><span class="token property">background</span><span class="token punctuation">:</span> #000<span class="token punctuation">;</span><span class="token property">margin</span><span class="token punctuation">:</span> -2px 0 0 50%<span class="token punctuation">;</span><span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span><span class="token property">opacity</span><span class="token punctuation">:</span> 0.5<span class="token punctuation">;</span><span class="token punctuation">}</span>
  <span class="token selector">.play span .p2</span><span class="token punctuation">{</span><span class="token property">margin</span><span class="token punctuation">:</span> 50% 0 0 -2px<span class="token punctuation">;</span><span class="token punctuation">}</span>
  <span class="token selector">.play span</span><span class="token punctuation">{</span>
    <span class="token property">animation</span><span class="token punctuation">:</span> wave 5s linear infinite
  <span class="token punctuation">}</span>
  <span class="token selector">.play>span:nth-child(3)</span><span class="token punctuation">{</span>
    <span class="token comment">/* 延迟时间 */</span>
    <span class="token property">animation-delay</span><span class="token punctuation">:</span>1s<span class="token punctuation">;</span> 
  <span class="token punctuation">}</span>
  <span class="token selector">.play>span:nth-child(4)</span><span class="token punctuation">{</span>
    <span class="token property">animation-delay</span><span class="token punctuation">:</span>2.2s<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.play>span:nth-child(5)</span><span class="token punctuation">{</span>
    <span class="token property">animation-delay</span><span class="token punctuation">:</span>3.8s<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token atrule"><span class="token rule">@keyframes</span> wave</span> <span class="token punctuation">{</span>
    <span class="token selector">0%</span>
    <span class="token punctuation">{</span>
      <span class="token property">transform</span><span class="token punctuation">:</span><span class="token function">scale</span><span class="token punctuation">(</span>1<span class="token punctuation">)</span> <span class="token function">rotate</span><span class="token punctuation">(</span>360deg<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token property">opacity</span><span class="token punctuation">:</span> 0.8<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token selector">100%</span>
    <span class="token punctuation">{</span>
      <span class="token property">transform</span><span class="token punctuation">:</span><span class="token function">scale</span><span class="token punctuation">(</span>1.8<span class="token punctuation">)</span> <span class="token function">rotate</span><span class="token punctuation">(</span>0deg<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>


  <span class="token selector">.elasticity</span><span class="token punctuation">{</span>
    <span class="token comment">/* 参数说明
      动画名称 花费时间 贝塞尔曲线 延迟开始时间 播放次数n|infinite  是否反向播放动画
    */</span>
    <span class="token property">animation</span><span class="token punctuation">:</span> elasticity 1s linear 2s infinite
  <span class="token punctuation">}</span>
  
  <span class="token atrule"><span class="token rule">@keyframes</span> elasticity</span><span class="token punctuation">{</span>
    <span class="token selector">0%</span><span class="token punctuation">{</span>
      <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">60%</span><span class="token punctuation">{</span>
      <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>1.1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">90%</span><span class="token punctuation">{</span>
      <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  

  <span class="token selector">.elasticity2</span><span class="token punctuation">{</span>
    <span class="token comment">/**
    贝塞尔曲线 cubic-bezier(x1,y1,x2,y2)

    通过调整贝塞尔曲线可以设置出多种动画效果，比如反弹效果等
    X轴的范围是0~1，Y轴的取值没有规定，但是也不宜过大
    直线：linear，即cubic-bezier(0,0,1,1)

    贝塞尔曲线在线工具：https://cubic-bezier.com/#.17,.67,.83,.67
      */</span>
    <span class="token property">animation</span><span class="token punctuation">:</span> elasticity2 1s <span class="token function">cubic-bezier</span><span class="token punctuation">(</span>.39<span class="token punctuation">,</span>.62<span class="token punctuation">,</span>.74<span class="token punctuation">,</span>1.39<span class="token punctuation">)</span> 2s infinite
  <span class="token punctuation">}</span>
  <span class="token atrule"><span class="token rule">@keyframes</span> elasticity2</span><span class="token punctuation">{</span>
    <span class="token selector">0%</span><span class="token punctuation">{</span>
      <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">90%</span><span class="token punctuation">{</span>
      <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
<h3 id="贝塞尔曲线-cubic-bezier-x1-y1-x2-y2" tabindex="-1"><a class="header-anchor" href="#贝塞尔曲线-cubic-bezier-x1-y1-x2-y2" aria-hidden="true">#</a> 贝塞尔曲线 cubic-bezier(x1,y1,x2,y2)</h3>
<p>通过调整贝塞尔曲线可以设置出多种动画效果，比如反弹效果等 X轴的范围是0~1，Y轴的取值没有规定，但是也不宜过大。 如：直线linear，即cubic-bezier(0,0,1,1)</p>
<p>贝塞尔曲线在线工具：<a href="https://cubic-bezier.com/#.17,.67,.83,.67" target="_blank" rel="noopener noreferrer">https://cubic-bezier.com/#.17,.67,.83,.67<ExternalLinkIcon/></a></p>
<blockquote>
<p>参考：<a href="https://www.w3school.com.cn/css3/index.asp" target="_blank" rel="noopener noreferrer">https://www.w3school.com.cn/css3/index.asp<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


