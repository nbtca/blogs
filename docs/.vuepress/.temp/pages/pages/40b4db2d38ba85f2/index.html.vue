<template><div><h1 id="js随机打乱数组" tabindex="-1"><a class="header-anchor" href="#js随机打乱数组" aria-hidden="true">#</a> JS随机打乱数组</h1>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">shuffle</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 随机打乱数组</span>
  <span class="token keyword">let</span> _arr <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 调用数组副本，不改变原数组</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> _arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token function">getRandomInt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
    <span class="token keyword">let</span> t <span class="token operator">=</span> _arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    _arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> _arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span>
    _arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> t
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> _arr
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">getRandomInt</span><span class="token punctuation">(</span><span class="token parameter">min<span class="token punctuation">,</span> max</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 获取min到max的一个随机数，包含min和max本身</span>
  <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>max <span class="token operator">-</span> min <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> min<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><!-- ## vue demo
::: demo

```html
<template>
  <div>
    原数组：{{arr}}
    <button @click="clickBut">click me！打乱数组</button></br></br>
    打乱结果：{{result}}
  </div>
</template>

<script>
  export default {
    data(){
      return {
        arr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        result: []
      }
    },
    methods:{
      clickBut(){
        this.result = this.shuffle(this.arr)
      },
      shuffle(arr) { // 随机打乱数组
        let _arr = arr.slice() // 调用数组副本，不改变原数组
        for (let i = 0; i < _arr.length; i++) {
          let j = this.getRandomInt(0, i)
          let t = _arr[i]
          _arr[i] = _arr[j]
          _arr[j] = t
        }
        return _arr
      },
      getRandomInt(min, max) { // 获取min到max的一个随机数，包含min和max本身
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
    }
  }
</script>
```
::: -->
<p>::: demo [vanilla]</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  原数组：<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>span1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>click me！打乱数组<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>br</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>br</span><span class="token punctuation">></span></span>
  打乱结果：<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>span2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">function</span> <span class="token function">getRandomInt</span><span class="token punctuation">(</span><span class="token parameter">min<span class="token punctuation">,</span> max</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 获取min到max的一个随机数，包含min和max本身</span>
      <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>max <span class="token operator">-</span> min <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> min<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">shuffle</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 随机打乱数组</span>
      <span class="token keyword">let</span> _arr <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 调用数组副本，不改变原数组</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> _arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token function">getRandomInt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
        <span class="token keyword">let</span> t <span class="token operator">=</span> _arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
        _arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> _arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span>
        _arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> t
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> _arr
    <span class="token punctuation">}</span>

    <span class="token comment">//使用</span>
    <span class="token keyword">function</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> $span2 <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#span2'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#span1'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>textContent <span class="token operator">=</span> arr<span class="token punctuation">;</span>
    <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#btn'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      $span2<span class="token punctuation">.</span>textContent <span class="token operator">=</span> <span class="token function">shuffle</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
</div></template>


