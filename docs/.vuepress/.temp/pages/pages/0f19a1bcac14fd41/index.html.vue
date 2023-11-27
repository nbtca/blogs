<template><div><h1 id="子组件派发事件和值给父组件" tabindex="-1"><a class="header-anchor" href="#子组件派发事件和值给父组件" aria-hidden="true">#</a> 子组件派发事件和值给父组件</h1>
<p><a href="https://cn.vuejs.org/v2/guide/components.html#%E7%9B%91%E5%90%AC%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BA%8B%E4%BB%B6" target="_blank" rel="noopener noreferrer">API<ExternalLinkIcon/></a></p>
<p>子组件通过<code v-pre>$emit</code>派发事件和值给父组件（值可以有多个）</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">'fnX'</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><!-- more -->
<p>父组件通过<code v-pre>v-on</code>绑定子组件派发的事件，并触发一个新的事件，新的事件内可以接收传来的值</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>ComponentName @fnX<span class="token operator">=</span><span class="token string">"fnY"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>ComponentName<span class="token operator">></span>


<span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
	<span class="token function">fnY</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="父子组件间传递数据-demo" tabindex="-1"><a class="header-anchor" href="#父子组件间传递数据-demo" aria-hidden="true">#</a> 父子组件间传递数据 demo</h2>
<p class="codepen" data-height="400" data-theme-id="light" data-default-tab="js,result" data-user="xugaoyi" data-slug-hash="mdJVqgg" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="mdJVqgg">
  <span>See the Pen <a href="https://codepen.io/xugaoyi/pen/mdJVqgg">
  mdJVqgg</a> by xugaoyi (<a href="https://codepen.io/xugaoyi">@xugaoyi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</div></template>


