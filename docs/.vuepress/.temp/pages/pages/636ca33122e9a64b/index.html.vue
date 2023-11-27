<template><div><h1 id="动态组件与-v-once-指令" tabindex="-1"><a class="header-anchor" href="#动态组件与-v-once-指令" aria-hidden="true">#</a> 动态组件与 v-once 指令</h1>
<h2 id="动态组件" tabindex="-1"><a class="header-anchor" href="#动态组件" aria-hidden="true">#</a> 动态组件</h2>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>root<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>type<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">></span></span> <span class="token comment">&lt;!--其效果如同下面两行被注释的代码--></span>
	<span class="token comment">&lt;!-- &lt;child-one v-if="type === 'child-one'">&lt;/child-one>
	    &lt;child-two v-if="type === 'child-two'">&lt;/child-two> --></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleClick<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>change<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text/javascript<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">'child-one'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'&lt;div>child-one&lt;/div>'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">'child-two'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'&lt;div>child-two&lt;/div>'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">var</span> vm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">'#root'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'child-one'</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">'child-one'</span> <span class="token operator">?</span> <span class="token string">'child-two'</span> <span class="token operator">:</span> <span class="token string">'child-one'</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，点击按钮在两个组件间切换，可使用<code v-pre>&lt;component&gt;</code>标签并绑定<code v-pre>:is</code>为动态组件名。</p>
<h3 id="动态组件-demo" tabindex="-1"><a class="header-anchor" href="#动态组件-demo" aria-hidden="true">#</a> 动态组件 demo</h3>
<p class="codepen" data-height="300" data-theme-id="light" data-default-tab="js,result" data-user="xugaoyi" data-slug-hash="YzXqNMO" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="动态组件">
  <span>See the Pen <a href="https://codepen.io/xugaoyi/pen/YzXqNMO">
  动态组件</a> by xugaoyi (<a href="https://codepen.io/xugaoyi">@xugaoyi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
<h2 id="v-once-指令" tabindex="-1"><a class="header-anchor" href="#v-once-指令" aria-hidden="true">#</a> v-once 指令</h2>
<ul>
<li>
<p><strong>不需要表达式</strong></p>
</li>
<li>
<p><strong>详细</strong>：</p>
<p>只渲染元素和组件<strong>一次</strong>。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token comment">&lt;!-- 单个元素 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-once</span><span class="token punctuation">></span></span>This will never change: {{msg}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- 有子元素 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-once</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>comment<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>{{msg}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- 组件 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-component</span> <span class="token attr-name">v-once</span> <span class="token attr-name">:comment</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>msg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-component</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- `v-for` 指令--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>i in list<span class="token punctuation">"</span></span> <span class="token attr-name">v-once</span><span class="token punctuation">></span></span>{{i}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>参考</strong>：</p>
<ul>
<li><a href="https://cn.vuejs.org/v2/guide/syntax.html#%E6%8F%92%E5%80%BC" target="_blank" rel="noopener noreferrer">数据绑定语法- 插值<ExternalLinkIcon/></a></li>
<li><a href="https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E9%80%9A%E8%BF%87-v-once-%E5%88%9B%E5%BB%BA%E4%BD%8E%E5%BC%80%E9%94%80%E7%9A%84%E9%9D%99%E6%80%81%E7%BB%84%E4%BB%B6" target="_blank" rel="noopener noreferrer">组件 - 对低开销的静态组件使用 <code v-pre>v-once</code><ExternalLinkIcon/></a></li>
</ul>
</li>
</ul>
<h3 id="通过-v-once-创建低开销的静态组件" tabindex="-1"><a class="header-anchor" href="#通过-v-once-创建低开销的静态组件" aria-hidden="true">#</a> 通过 <code v-pre>v-once</code> 创建低开销的静态组件</h3>
<p>渲染普通的 HTML 元素在 Vue 中是非常快速的，但有的时候你可能有一个组件，这个组件包含了<strong>大量</strong>静态内容。在这种情况下，你可以在根元素上添加 <code v-pre>v-once</code> attribute 以确保这些内容只计算一次然后缓存起来，就像这样：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">'terms-of-service'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
    &lt;div v-once>
      &lt;h1>Terms of Service&lt;/h1>
      ... a lot of static content ...
    &lt;/div>
  </span><span class="token template-punctuation string">`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger"><p class="custom-container-title">DANGER</p>
<p>再说一次，试着不要过度使用这个模式。当你需要渲染大量静态内容时，极少数的情况下它会给你带来便利，除非你非常留意渲染变慢了，不然它完全是没有必要的——再加上它在后期会带来很多困惑。例如，设想另一个开发者并不熟悉 <code v-pre>v-once</code> 或漏看了它在模板中，他们可能会花很多个小时去找出模板为什么无法正确更新。</p>
</div>
</div></template>


