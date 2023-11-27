<template><div><h1 id="vue中使用animate-css库" tabindex="-1"><a class="header-anchor" href="#vue中使用animate-css库" aria-hidden="true">#</a> vue中使用Animate.css库</h1>
<h2 id="自定义过渡类名" tabindex="-1"><a class="header-anchor" href="#自定义过渡类名" aria-hidden="true">#</a> 自定义过渡类名</h2>
<p>我们可以通过以下 attribute 来自定义过渡类名：</p>
<ul>
<li><code v-pre>enter-class</code></li>
<li><code v-pre>enter-active-class</code></li>
<li><code v-pre>enter-to-class</code> (2.1.8+)</li>
<li><code v-pre>leave-class</code></li>
<li><code v-pre>leave-active-class</code></li>
<li><code v-pre>leave-to-class</code> (2.1.8+)</li>
</ul>
<!-- more -->
<p>他们的优先级高于普通的类名，这对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 <a href="https://daneden.github.io/animate.css/" target="_blank" rel="noopener noreferrer">Animate.css<ExternalLinkIcon/></a>结合使用十分有用。</p>
<h2 id="使用animate-css库" tabindex="-1"><a class="header-anchor" href="#使用animate-css库" aria-hidden="true">#</a> 使用Animate.css库</h2>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>transition</span>
            <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>custom-classes-transition<span class="token punctuation">"</span></span>
            <span class="token attr-name">enter-active-class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>animated tada<span class="token punctuation">"</span></span>
            <span class="token attr-name">leave-active-class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>animated bounceOutRight<span class="token punctuation">"</span></span>
            <span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>show<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>transition</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按 <a href="https://github.com/daneden/animate.css" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a> 引入Animate.css库，再配合vue的自定义过渡类名，指定<code v-pre>enter-active-class</code>和<code v-pre>leave-active-class</code>的自定义类，两者都要有<code v-pre>animated</code>类，用于说明其使用的是Animate.css库，再根据需求定义另外一个<code v-pre>动画类名</code>。</p>
<p>动画类名：在 <a href="https://daneden.github.io/animate.css/" target="_blank" rel="noopener noreferrer">Animate官网<ExternalLinkIcon/></a> 获取。</p>
<h2 id="demo" tabindex="-1"><a class="header-anchor" href="#demo" aria-hidden="true">#</a> Demo</h2>
<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="xugaoyi" data-slug-hash="JjdXBmy" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="vue中使用animate.css库">
  <span>See the Pen <a href="https://codepen.io/xugaoyi/pen/JjdXBmy">
  vue中使用animate.css库</a> by xugaoyi (<a href="https://codepen.io/xugaoyi">@xugaoyi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</div></template>


