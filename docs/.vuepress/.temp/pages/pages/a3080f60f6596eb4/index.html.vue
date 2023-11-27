<template><div><h1 id="prop-验证-与-非-prop-的-attribute" tabindex="-1"><a class="header-anchor" href="#prop-验证-与-非-prop-的-attribute" aria-hidden="true">#</a> Prop 验证 与 非 Prop 的 Attribute</h1>
<h2 id="prop-验证" tabindex="-1"><a class="header-anchor" href="#prop-验证" aria-hidden="true">#</a> Prop 验证</h2>
<p><a href="https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81" target="_blank" rel="noopener noreferrer">API<ExternalLinkIcon/></a></p>
<p>子组件对父组件传递来的参数进行校验</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">'my-component'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)</span>
    <span class="token literal-property property">propA</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>
    <span class="token comment">// 多个可能的类型</span>
    <span class="token literal-property property">propB</span><span class="token operator">:</span> <span class="token punctuation">[</span>String<span class="token punctuation">,</span> Number<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 必填的字符串</span>
    <span class="token literal-property property">propC</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
      <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 带有默认值的数字</span>
    <span class="token literal-property property">propD</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">100</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 带有默认值的对象</span>
    <span class="token literal-property property">propE</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
      <span class="token comment">// 对象或数组默认值必须从一个工厂函数获取</span>
      <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">'hello'</span> <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 自定义验证函数</span>
    <span class="token literal-property property">propF</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">validator</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 这个值必须匹配下列字符串中的一个</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token string">'success'</span><span class="token punctuation">,</span> <span class="token string">'warning'</span><span class="token punctuation">,</span> <span class="token string">'danger'</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="非-prop-的-attribute" tabindex="-1"><a class="header-anchor" href="#非-prop-的-attribute" aria-hidden="true">#</a> 非 Prop 的 Attribute</h2>
<p><a href="https://cn.vuejs.org/v2/guide/components-props.html#%E9%9D%9E-Prop-%E7%9A%84-Attribute" target="_blank" rel="noopener noreferrer">API<ExternalLinkIcon/></a></p>
<p>当子组件没有定义对应的Prop来接收父组件传来的值时，这个值将会出现在组件根元素的<code v-pre>Attribute</code>上面。</p>
<h3 id="用处" tabindex="-1"><a class="header-anchor" href="#用处" aria-hidden="true">#</a> 用处</h3>
<p>例如，想象一下你通过一个 Bootstrap 插件使用了一个第三方的 <code v-pre>&lt;bootstrap-date-input&gt;</code> 组件，这个插件需要在其 <code v-pre>&lt;input&gt;</code> 上用到一个 <code v-pre>data-date-picker</code> attribute。我们可以将这个 attribute 添加到你的组件实例上：</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bootstrap-date-input</span> <span class="token attr-name">data-date-picker</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>activated<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bootstrap-date-input</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后这个 <code v-pre>data-date-picker=&quot;activated&quot;</code> attribute 就会自动添加到 <code v-pre>&lt;bootstrap-date-input&gt;</code>组件的根元素上。</p>
</div></template>


