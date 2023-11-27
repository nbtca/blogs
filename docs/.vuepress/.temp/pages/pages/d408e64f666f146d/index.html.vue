<template><div><h1 id="非父子组件间传值" tabindex="-1"><a class="header-anchor" href="#非父子组件间传值" aria-hidden="true">#</a> 非父子组件间传值</h1>
<p>当组件的嵌套多时，非父子组件间传值就显得复杂，除了使用<a href="https://vuex.vuejs.org/zh/" target="_blank" rel="noopener noreferrer">vuex<ExternalLinkIcon/></a>实现之外，还可以通过Bus（或者叫 总线/发布订阅模式/观察者模式）的方式实现非父子组件间传值。</p>
<!-- more -->
<div id="root">
		<child1 content="组件1：点我传出值"></child1>
		<child2 content="组件2"></child2>
	</div>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>root<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>child1</span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>组件1：点我传出值<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>child1</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>child2</span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>组件2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>child2</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text/javascript<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>bus <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 每个Vue原型上都会有bus属性,而且指向同一个Vue实例</span>

	Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">'child1'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token literal-property property">content</span><span class="token operator">:</span> String
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'&lt;button @click="handleClick">{{content}}&lt;/button>'</span><span class="token punctuation">,</span>
		<span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>bus<span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">'change'</span><span class="token punctuation">,</span> <span class="token string">'我是组件1过来的~'</span><span class="token punctuation">)</span> <span class="token comment">// 触发change事件，传出值</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">'child2'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
		<span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token punctuation">{</span>
				<span class="token literal-property property">childVal</span><span class="token operator">:</span> <span class="token string">''</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token literal-property property">content</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'&lt;button>{{content}} + {{childVal}}&lt;/button>'</span><span class="token punctuation">,</span>
		<span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>bus<span class="token punctuation">.</span><span class="token function">$on</span><span class="token punctuation">(</span><span class="token string">'change'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">msg</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token comment">// 绑定change事件，执行函数接收值</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>childVal <span class="token operator">=</span> msg
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token keyword">var</span> vm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
		<span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">'#root'</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，在Vue原型上绑定一个<code v-pre>bus</code>属性，指向一个Vue实例，之后每个Vue实例都会有一个<code v-pre>bus</code>属性。</p>
<blockquote>
<p>此方法传值，不限于兄弟组件之间，其他关系组件间都适用。</p>
</blockquote>
<p class="codepen" data-height="400" data-theme-id="light" data-default-tab="js,result" data-user="xugaoyi" data-slug-hash="wvaGwEj" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="非父子组件间传值2（Bus /总线/发布订阅模式/观察者模式）">
  <span>See the Pen <a href="https://codepen.io/xugaoyi/pen/wvaGwEj">
  非父子组件间传值2（Bus /总线/发布订阅模式/观察者模式）</a> by xugaoyi (<a href="https://codepen.io/xugaoyi">@xugaoyi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</div></template>


