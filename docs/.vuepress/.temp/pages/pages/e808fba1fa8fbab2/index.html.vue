<template><div><h1 id="多种数组去重性能对比" tabindex="-1"><a class="header-anchor" href="#多种数组去重性能对比" aria-hidden="true">#</a> 多种数组去重性能对比</h1>
<h2 id="测试模板" tabindex="-1"><a class="header-anchor" href="#测试模板" aria-hidden="true">#</a> 测试模板</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 创建一个 1 ~ 10w 的数组，Array.from为ES6语法</span>
<span class="token keyword">let</span> arr1 <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">1000000</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> 
  <span class="token keyword">return</span> index
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">let</span> arr2 <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">500000</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> index <span class="token operator">+</span> index
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">let</span> start <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'开始数组去重'</span><span class="token punctuation">)</span>

<span class="token comment">// 数组去重</span>
<span class="token keyword">function</span> <span class="token function">distinct</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> arr <span class="token operator">=</span> a<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 去重方法</span>
<span class="token punctuation">}</span>



console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'去重后的长度'</span><span class="token punctuation">,</span> <span class="token function">distinct</span><span class="token punctuation">(</span>arr1<span class="token punctuation">,</span> arr2<span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span>
<span class="token keyword">let</span> end <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'耗时'</span><span class="token punctuation">,</span> end <span class="token operator">-</span> start <span class="token operator">+</span> <span class="token string">'ms'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="测试代码" tabindex="-1"><a class="header-anchor" href="#测试代码" aria-hidden="true">#</a> 测试代码</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 创建一个 1 ~ 10w 的数组，Array.from为ES6语法</span>
<span class="token keyword">let</span> arr1 <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">1000000</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> 
  <span class="token keyword">return</span> index
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">let</span> arr2 <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">500000</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> index <span class="token operator">+</span> index
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">let</span> start <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'开始数组去重'</span><span class="token punctuation">)</span>

<span class="token comment">// 数组去重</span>
<span class="token keyword">function</span> <span class="token function">distinct</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> arr <span class="token operator">=</span> a<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token comment">// 方法1，耗时约11675ms，约11s</span>
  <span class="token comment">// return arr.filter((item, index) => {</span>
  <span class="token comment">//   return arr.indexOf(item) === index</span>
  <span class="token comment">// })</span>

  <span class="token comment">// 方法2，耗时约22851ms，约22s，性能最差</span>
  <span class="token comment">// for (let i = 0, len = arr.length; i &lt; len; i++) {</span>
  <span class="token comment">//   for (let j = i + 1; j &lt; len; j++) {</span>
  <span class="token comment">//     if (arr[i] == arr[j]) {</span>
  <span class="token comment">//       arr.splice(j, 1);</span>
  <span class="token comment">//       // splice 会改变数组长度，所以要将数组长度 len 和下标 j 减一</span>
  <span class="token comment">//       len--;</span>
  <span class="token comment">//       j--;</span>
  <span class="token comment">//     }</span>
  <span class="token comment">//   }</span>
  <span class="token comment">// }</span>
  <span class="token comment">// return arr</span>

  <span class="token comment">//方法3，耗时约12789ms，约12s，和方法1相当</span>
  <span class="token comment">// let result = []</span>
  <span class="token comment">// for (let i of arr) {</span>
  <span class="token comment">//   !result.includes(i) &amp;&amp; result.push(i)</span>
  <span class="token comment">// }</span>
  <span class="token comment">// return result</span>

  <span class="token comment">//方法4，耗时约23ms，ES5标准中性能最高</span>
  <span class="token comment">// arr = arr.sort()</span>
  <span class="token comment">// let result = [arr[0]]</span>
  <span class="token comment">// for (let i = 1, len = arr.length; i &lt; len; i++) {</span>
  <span class="token comment">//   arr[i] !== arr[i - 1] &amp;&amp; result.push(arr[i])</span>
  <span class="token comment">// }</span>
  <span class="token comment">// return result</span>

  <span class="token comment">// 方法5，ES6的Set数据结构，耗时约20ms，性能高，代码简洁</span>
  <span class="token comment">// return Array.from(new Set([...a, ...b]))</span>

  <span class="token comment">// 方法6，耗时约16ms，所有方法中 性能最高！ (千万级数据量下效率比方法5高4倍，for...of 为ES6语法)</span>
  <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">of</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>obj<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
      obj<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> result

<span class="token punctuation">}</span>



console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'去重后的长度'</span><span class="token punctuation">,</span> <span class="token function">distinct</span><span class="token punctuation">(</span>arr1<span class="token punctuation">,</span> arr2<span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span>
<span class="token keyword">let</span> end <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'耗时'</span><span class="token punctuation">,</span> end <span class="token operator">-</span> start <span class="token operator">+</span> <span class="token string">'ms'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论" aria-hidden="true">#</a> 结论</h2>
<p>ES5标准中性能最高的数组去重方法为:</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 耗时约23ms</span>
arr <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token punctuation">[</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> len <span class="token operator">=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!==</span> arr<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">return</span> result
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ES6标准中性能最高的数组去重方法为:</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 耗时约16ms (千万级数据量下效率比使用Set数据结构方法高4倍，for...of 为ES6语法)</span>
<span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">of</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>obj<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
        obj<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">return</span> result
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码既简洁性能又相对高的去重方法为：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 耗时约20ms，性能高，代码简洁</span>
<span class="token keyword">return</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span>a<span class="token punctuation">,</span> <span class="token operator">...</span>b<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


