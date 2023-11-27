<template><div><h1 id="使用组件的细节点" tabindex="-1"><a class="header-anchor" href="#使用组件的细节点" aria-hidden="true">#</a> 使用组件的细节点</h1>
<h2 id="解析-dom-模板时的注意事项" tabindex="-1"><a class="header-anchor" href="#解析-dom-模板时的注意事项" aria-hidden="true">#</a> 解析 DOM 模板时的注意事项</h2>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>root<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>table</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tbody</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>row</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>row</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>row</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>row</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>row</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>row</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tbody</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>table</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text/javascript<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">'row'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'&lt;tr>&lt;td>this is a row&lt;/td>&lt;/tr>'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">var</span> vm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">'#root'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>row</code> 组件在渲染页面时，并不会把<code v-pre>tr</code>节点渲染到<code v-pre>tbody</code>里面，而是被提升到了和<code v-pre>table</code>同一个级别的地方。原因是在html编码规范中，<code v-pre>tbody</code>里面只能放<code v-pre>tr</code>，正确的做法是使用<code v-pre>tr</code>标签添加<code v-pre>is</code>属性等于组件名称<code v-pre>row</code> :</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tbody</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span> <span class="token attr-name">is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>row<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span> <span class="token attr-name">is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>row<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span> <span class="token attr-name">is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>row<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tbody</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，<code v-pre>ul&gt;li</code>、<code v-pre>ol&gt;li</code>、<code v-pre>select &gt; option</code> 标签也要注意这样的问题。</p>
<p>需要注意的是<strong>如果我们从以下来源使用模板的话，这条限制是不存在的</strong>：</p>
<ul>
<li>字符串 (例如：<code v-pre>template: '...'</code>)</li>
<li><a href="https://cn.vuejs.org/v2/guide/single-file-components.html" target="_blank" rel="noopener noreferrer">单文件组件 (<code v-pre>.vue</code>)<ExternalLinkIcon/></a></li>
<li><a href="https://cn.vuejs.org/v2/guide/components-edge-cases.html#X-Templates" target="_blank" rel="noopener noreferrer"><code v-pre>&lt;script type=&quot;text/x-template&quot;&gt;</code><ExternalLinkIcon/></a></li>
</ul>
<h2 id="子组件内的data要使用函数返回" tabindex="-1"><a class="header-anchor" href="#子组件内的data要使用函数返回" aria-hidden="true">#</a> 子组件内的data要使用函数返回</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">'row'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">'this is content'</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'&lt;tr>&lt;td>{{content}}&lt;/td>&lt;/tr>'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之所以这样设计是因为子组件有可能会被调用多次，而每次调用时的data数据都应该是独立的。因此需要通过一个函数来实现，每个实例可以维护一份被返回对象的独立的拷贝。</p>
<p>这样才不会出现每个子组件数据相互影响的情况。</p>
<h2 id="通过-ref-引用操作dom" tabindex="-1"><a class="header-anchor" href="#通过-ref-引用操作dom" aria-hidden="true">#</a> 通过 ref 引用操作DOM</h2>
<p><a href="https://cn.vuejs.org/v2/api/#ref" target="_blank" rel="noopener noreferrer">ref<ExternalLinkIcon/></a></p>
<p>虽然并不推荐我们在使用vue的时候操作DOM，但是某些情况下我们必须要操作DOM来实现一些功能，因此可以通过ref引用的形式来获取到DOM节点。</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token comment">&lt;!-- `vm.$refs.p` 指向DOM元素节点 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>p<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- `vm.$refs.child` 指向组件实例 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>child-component</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>child<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>child-component</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>ref</code> 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 <code v-pre>$refs</code> 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向<strong>组件实例</strong>。</p>
<p><strong>组件实例对象 VueComponent</strong></p>
<blockquote>
<p>打开控制台，点击demo中的按钮可查看组件实例</p>
</blockquote>
<p class="codepen" data-height="460" data-theme-id="light" data-default-tab="js,result" data-user="xugaoyi" data-slug-hash="VwLeMoM" style="height: 460px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 20px solid; margin: 1em 0; padding: 1em;" data-pen-title="VwLeMoM">
  <span>See the Pen <a href="https://codepen.io/xugaoyi/pen/VwLeMoM">
  VwLeMoM</a> by xugaoyi (<a href="https://codepen.io/xugaoyi">@xugaoyi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</div></template>


