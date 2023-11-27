<template><div><h1 id="vuex操作相关" tabindex="-1"><a class="header-anchor" href="#vuex操作相关" aria-hidden="true">#</a> vuex操作相关</h1>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mapActions<span class="token punctuation">,</span> mapMutations<span class="token punctuation">,</span> mapGetters <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vuex'</span>

<span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span><span class="token function">mapGetters</span><span class="token punctuation">(</span><span class="token punctuation">[</span> <span class="token comment">// 获取数据，内部为数组</span>
        <span class="token string">'searchHistory'</span> <span class="token comment">// 相当于在data插入searchHistory和获取到的数据</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>

<span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
	<span class="token function">某方法</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">saveSearchHistory</span><span class="token punctuation">(</span>传入值<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token operator">...</span><span class="token function">mapActions</span><span class="token punctuation">(</span><span class="token punctuation">[</span> <span class="token comment">// 提交actions修改数据，内部为数组 因为actions文件已对方法进行了封装所有是数组类型</span>
      <span class="token string">'saveSearchHistory'</span> <span class="token comment">// 相当于在methods绑定了事件saveSearchHistory</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

	<span class="token function">某方法</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setFullScreen</span><span class="token punctuation">(</span>传入值<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	 <span class="token operator">...</span><span class="token function">mapMutations</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token comment">// 提交mutations，内部为对象</span>
      <span class="token literal-property property">setFullScreen</span><span class="token operator">:</span> <span class="token string">'SET_FULL_SCREEN'</span> <span class="token comment">// 相当于在methods绑定了事件setFullScreen</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


