<template><div><h1 id="列表渲染之数组、对象更新检测" tabindex="-1"><a class="header-anchor" href="#列表渲染之数组、对象更新检测" aria-hidden="true">#</a> 列表渲染之数组、对象更新检测</h1>
<p><a href="https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B" target="_blank" rel="noopener noreferrer">数组更新检测API<ExternalLinkIcon/></a> <a href="https://cn.vuejs.org/v2/guide/list.html#%E5%AF%B9%E8%B1%A1%E5%8F%98%E6%9B%B4%E6%A3%80%E6%B5%8B%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9" target="_blank" rel="noopener noreferrer">对象更新检测API<ExternalLinkIcon/></a></p>
<h2 id="数组更新检测" tabindex="-1"><a class="header-anchor" href="#数组更新检测" aria-hidden="true">#</a> 数组更新检测</h2>
<h4 id="变异方法-mutation-method" tabindex="-1"><a class="header-anchor" href="#变异方法-mutation-method" aria-hidden="true">#</a> 变异方法 (mutation method)</h4>
<p>Vue 将被侦听的数组的变异方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：</p>
<!-- more -->
<ul>
<li><code v-pre>push()</code>末尾添加</li>
<li><code v-pre>pop()</code>末尾删除</li>
<li><code v-pre>shift()</code> 首位删除</li>
<li><code v-pre>unshift() </code> 首位添加</li>
<li><code v-pre>splice()</code> 拼合</li>
<li><code v-pre>sort()</code> 排序</li>
<li><code v-pre>reverse()</code> 反转</li>
</ul>
<p><a href="https://xugaoyi.com/pages/74d2ab3fbfeaaa68/#_3%E3%80%81%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95" target="_blank" rel="noopener noreferrer">数组实例方法<ExternalLinkIcon/></a></p>
<h4 id="替换数组" tabindex="-1"><a class="header-anchor" href="#替换数组" aria-hidden="true">#</a> 替换数组</h4>
<p>变异方法，顾名思义，会改变调用了这些方法的原始数组。相比之下，也有非变异 (non-mutating method) 方法，例如 <code v-pre>filter()</code>、<code v-pre>concat()</code> 和 <code v-pre>slice()</code> 。它们不会改变原始数组，而<strong>总是返回一个新数组</strong>。当使用非变异方法时，可以用新数组替换旧数组：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>example1<span class="token punctuation">.</span>items <span class="token operator">=</span> example1<span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> item<span class="token punctuation">.</span>message<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">Foo</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。</p>
<h4 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项" aria-hidden="true">#</a> 注意事项</h4>
<p><strong>由于 JavaScript 的限制，Vue 不能检测以下数组的变动</strong></p>
<ol>
<li>当你利用索引直接设置一个数组项时，例如：<code v-pre>vm.items[indexOfItem] = newValue</code></li>
<li>当你修改数组的长度时，例如：<code v-pre>vm.items.length = newLength</code></li>
</ol>
<p>为了解决第一类问题，以下两种方式都可以实现和 <code v-pre>vm.items[indexOfItem] = newValue</code> 相同的效果，同时也将在响应式系统内触发状态更新：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// Vue.set</span>
Vue<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>items<span class="token punctuation">,</span> indexOfItem<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span>
<span class="token comment">// Array.prototype.splice</span>
vm<span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>indexOfItem<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> newValue<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你也可以使用 <a href="https://cn.vuejs.org/v2/api/#vm-set" target="_blank" rel="noopener noreferrer"><code v-pre>vm.$set</code><ExternalLinkIcon/></a> 实例方法，该方法是全局方法 <code v-pre>Vue.set</code> 的一个别名：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>vm<span class="token punctuation">.</span><span class="token function">$set</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>items<span class="token punctuation">,</span> indexOfItem<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了解决第二类问题，你可以使用 <code v-pre>splice</code>：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>vm<span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>newLength<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="对象变更检测注意事项" tabindex="-1"><a class="header-anchor" href="#对象变更检测注意事项" aria-hidden="true">#</a> 对象变更检测注意事项</h2>
<blockquote>
<p>列表循环对象示例</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(item, key, index) in obj<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<p>还是由于 JavaScript 的限制，<strong>Vue 不能检测对象属性的添加或删除</strong>：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> vm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// `vm.a` 现在是响应式的</span>

vm<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">2</span>
<span class="token comment">// `vm.b` 不是响应式的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于已经创建的实例，Vue 不允许动态添加根级别的响应式属性。</p>
<p>但是，可以使用 <code v-pre>Vue.set(object, propertyName, value)</code> 方法向嵌套对象添加响应式属性。例如，对于：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> vm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">userProfile</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Anika'</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以添加一个新的 <code v-pre>age</code> 属性到嵌套的 <code v-pre>userProfile</code> 对象：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Vue<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>userProfile<span class="token punctuation">,</span> <span class="token string">'age'</span><span class="token punctuation">,</span> <span class="token number">27</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>你还可以使用 <code v-pre>vm.$set</code> 实例方法，它只是全局 <code v-pre>Vue.set</code> 的别名：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>vm<span class="token punctuation">.</span><span class="token function">$set</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>userProfile<span class="token punctuation">,</span> <span class="token string">'age'</span><span class="token punctuation">,</span> <span class="token number">27</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>有时你可能需要为已有对象赋值多个新属性，比如使用 <code v-pre>Object.assign()</code> 或 <code v-pre>_.extend()</code>。在这种情况下，你应该用两个对象的属性创建一个新的对象。所以，如果你想添加新的响应式属性，不要像这样：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>userProfile<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">27</span><span class="token punctuation">,</span>
  <span class="token literal-property property">favoriteColor</span><span class="token operator">:</span> <span class="token string">'Vue Green'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你应该这样做：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>vm<span class="token punctuation">.</span>userProfile <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> vm<span class="token punctuation">.</span>userProfile<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">27</span><span class="token punctuation">,</span>
  <span class="token literal-property property">favoriteColor</span><span class="token operator">:</span> <span class="token string">'Vue Green'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>一、使数组更新具有响应式可使用的办法：</p>
<ol>
<li>使用变异方法 （push、pop、unshift、shift、splice、sort、reverse）</li>
<li>替换数组引用  （对不改变原数组的方法可使用替换数组）</li>
<li>使用Vue.set()方法</li>
</ol>
<p>二、使对象属性的添加或删除具有响应式可使用的办法：</p>
<ol>
<li>替换对象引用</li>
<li>使用Vue.set()方法</li>
</ol>
<p>三、Vue.set() 语法：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 向数组更新数据</span>
Vue<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>items<span class="token punctuation">,</span> indexOfItem<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span>
即 Vue<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>原数组<span class="token punctuation">,</span> 索引<span class="token punctuation">,</span> 新数据<span class="token punctuation">)</span>

<span class="token comment">// 向对象更新数据</span>
Vue<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>object<span class="token punctuation">,</span> propertyName<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
即 Vue<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>原对象<span class="token punctuation">,</span> 属性名<span class="token punctuation">,</span> 值<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>vm.$set() 实例方法是 Vue.set() 全局方法的别名</p>
</blockquote>
</div></template>


