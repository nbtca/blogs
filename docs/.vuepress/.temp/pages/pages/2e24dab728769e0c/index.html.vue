<template><div><h1 id="父组件调用子组件方法并传入值" tabindex="-1"><a class="header-anchor" href="#父组件调用子组件方法并传入值" aria-hidden="true">#</a> 父组件调用子组件方法并传入值</h1>
<p>通过<code v-pre>ref</code>引用调用子组件内的方法并传入参数</p>
<p>父组件：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>子组件标签  ref<span class="token operator">=</span><span class="token string">"refName"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>子组件标签<span class="token operator">></span>

<span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">fnX</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>refName<span class="token punctuation">.</span><span class="token function">fnY</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token comment">// 调用子组件方法并传入值</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>子组件：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">fnY</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


