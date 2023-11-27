<template><div><h1 id="transition过渡-动画" tabindex="-1"><a class="header-anchor" href="#transition过渡-动画" aria-hidden="true">#</a> transition过渡&amp;动画</h1>
<p><a href="https://cn.vuejs.org/v2/guide/transitions.html" target="_blank" rel="noopener noreferrer">API<ExternalLinkIcon/></a></p>
<h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2>
<p>需要设置动画的元素或组件要在外边包裹一个<code v-pre>&lt;transition&gt;</code>标签，设置自定义的<code v-pre>name</code>，vue会根据元素的切换（进入/离开）过程添加相应的css类名，你可以<strong>自由地使用css类名来设置css过渡&amp;动画</strong>。</p>
<!-- more -->
<h2 id="过渡的类名" tabindex="-1"><a class="header-anchor" href="#过渡的类名" aria-hidden="true">#</a> 过渡的类名</h2>
<p>在进入/离开的过渡中，会有 6 个 class 切换。</p>
<p><strong>各类名的生命周期</strong></p>
<ul>
<li>
<p>进入</p>
<ul>
<li><code v-pre>v-enter</code> 只存在于第一帧</li>
<li><code v-pre>v-enter-active</code> 第一帧到最后一帧，结束后移除</li>
<li><code v-pre>v-enter-to</code> 第二帧到最后一帧，结束后移除</li>
</ul>
</li>
<li>
<p>离开</p>
<ul>
<li><code v-pre>v-leave</code> 只存在于第一帧</li>
<li><code v-pre>v-leave-active</code> 第一帧到最后一帧，结束后移除</li>
<li><code v-pre>v-leave-to</code> 第二帧到最后一帧，结束后移除</li>
</ul>
</li>
</ul>
<p>如果你使用一个没有<code v-pre>name</code>的<code v-pre>&lt;transition&gt;</code> ，则 <code v-pre>v-</code> 是这些类名的默认前缀。如果你使用了<code v-pre>name=&quot;fade&quot;</code>，那么 <code v-pre>v-</code> 前缀会替换为 <code v-pre>fade-</code>。</p>
<h2 id="css过渡-demo" tabindex="-1"><a class="header-anchor" href="#css过渡-demo" aria-hidden="true">#</a> css过渡 demo</h2>
<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="xugaoyi" data-slug-hash="jOPqxvm" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="vue的过渡动画">
  <span>See the Pen <a href="https://codepen.io/xugaoyi/pen/jOPqxvm">
  vue的过渡动画</a> by xugaoyi (<a href="https://codepen.io/xugaoyi">@xugaoyi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
<h2 id="css动画-demo" tabindex="-1"><a class="header-anchor" href="#css动画-demo" aria-hidden="true">#</a> css动画 demo</h2>
<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="xugaoyi" data-slug-hash="qBdZyRR" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="vue的动画">
  <span>See the Pen <a href="https://codepen.io/xugaoyi/pen/qBdZyRR">
  vue的动画</a> by xugaoyi (<a href="https://codepen.io/xugaoyi">@xugaoyi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
<h3 id="组件中使用的示例" tabindex="-1"><a class="header-anchor" href="#组件中使用的示例" aria-hidden="true">#</a> 组件中使用的示例</h3>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>transition</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>slide<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
         <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>add-song<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
             ...
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>transition</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code> .add-song
    &amp;.slide-enter-active<span class="token punctuation">,</span> &amp;.slide-leave-active
      <span class="token property">transition</span><span class="token punctuation">:</span> all 0.3s
    &amp;.slide-enter<span class="token punctuation">,</span> &amp;.slide-leave-to
      <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate3d</span><span class="token punctuation">(</span>100%<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


