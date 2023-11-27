<template><div><h1 id="new命令原理" tabindex="-1"><a class="header-anchor" href="#new命令原理" aria-hidden="true">#</a> new命令原理</h1>
<p>使用new命令时，它后面的函数依次执行下面的步骤：</p>
<ol>
<li>创建一个空对象，作为将要返回的实例对象。</li>
<li>将这个空对象的原型，指向构造函数的prototype属性。</li>
<li>将这个空对象赋值给函数内部的this关键字。</li>
<li>开始执行构造函数内部的代码。</li>
<li>如果构造函数内有返回值且为对象类型，则返回该对象，否则返回上面创建的实例对象。</li>
</ol>
<!-- more -->
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 构造函数</span>
<span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span>age</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age
<span class="token punctuation">}</span>

<span class="token comment">// 自定义_new</span>
<span class="token keyword">function</span> <span class="token function">_new</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 将 arguments 对象转为数组</span>
  <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 取出构造函数</span>
  <span class="token keyword">var</span> constructor <span class="token operator">=</span> args<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 创建一个空对象，继承构造函数的 prototype 属性</span>
  <span class="token keyword">var</span> context <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>constructor<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 执行构造函数，并将context对象赋值给函数内部的this</span>
  <span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token function">constructor</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 如果返回结果是对象，就直接返回，否则返回 context 对象</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> result <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">&amp;&amp;</span> result <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> result <span class="token operator">:</span> context<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 自定义_new2</span>
<span class="token keyword">function</span> <span class="token function">_new2</span><span class="token punctuation">(</span><span class="token comment">/* 构造函数 */</span> constructor<span class="token punctuation">,</span> <span class="token comment">/* 构造函数参数 */</span> params<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 创建一个空对象，并继承构造函数的 prototype 属性</span>
  <span class="token keyword">var</span> context <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>constructor<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 执行构造函数，并将context对象赋值给函数内部的this</span>
  <span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token function">constructor</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 如果返回结果是对象，就直接返回，否则返回 context 对象</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> result <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">&amp;&amp;</span> result <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> result <span class="token operator">:</span> context<span class="token punctuation">;</span>
  <span class="token comment">// （当用户在构造函数内部自定义返回对象的话则使用该对象，否则返回context）</span>
<span class="token punctuation">}</span>


<span class="token comment">// 通过自定义_new 返回实例</span>
<span class="token keyword">var</span> actor <span class="token operator">=</span> <span class="token function">_new</span><span class="token punctuation">(</span>Person<span class="token punctuation">,</span> <span class="token string">'张三'</span><span class="token punctuation">,</span> <span class="token number">28</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>actor<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// 张三</span>

<span class="token comment">// 通过自定义_new2 返回实例</span>
<span class="token keyword">var</span> actor2 <span class="token operator">=</span> <span class="token function">_new2</span><span class="token punctuation">(</span>Person<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">'李四'</span><span class="token punctuation">,</span> <span class="token number">29</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>actor2<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// 李四</span>

<span class="token comment">// 通过new命令 返回实例</span>
<span class="token keyword">var</span> actor3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'王五'</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>actor3<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// 王五</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


