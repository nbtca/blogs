<template><div><h1 id="mergeconfig-模块单元测试" tabindex="-1"><a class="header-anchor" href="#mergeconfig-模块单元测试" aria-hidden="true">#</a> mergeConfig 模块单元测试</h1>
<p>合并配置是 <code v-pre>ts-axios</code> 核心流程中非常重要的一个环节，我们需要为它的各种情况去编写测试。</p>
<h2 id="测试代码编写" tabindex="-1"><a class="header-anchor" href="#测试代码编写" aria-hidden="true">#</a> 测试代码编写</h2>
<p><code v-pre>test/mergeConfig.spec.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">'../src/index'</span>
<span class="token keyword">import</span> mergeConfig <span class="token keyword">from</span> <span class="token string">'../src/core/mergeConfig'</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'mergeConfig'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> defaults <span class="token operator">=</span> axios<span class="token punctuation">.</span>defaults

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should accept undefined for second argument'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">expect</span><span class="token punctuation">(</span><span class="token function">mergeConfig</span><span class="token punctuation">(</span>defaults<span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span>defaults<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should accept an object for second argument'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">expect</span><span class="token punctuation">(</span><span class="token function">mergeConfig</span><span class="token punctuation">(</span>defaults<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span>defaults<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should not leave references'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> merged <span class="token operator">=</span> <span class="token function">mergeConfig</span><span class="token punctuation">(</span>defaults<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>merged<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span>defaults<span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>merged<span class="token punctuation">.</span>headers<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span>defaults<span class="token punctuation">.</span>headers<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should allow setting request options'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
      url<span class="token operator">:</span> <span class="token string">'__sample url__'</span><span class="token punctuation">,</span>
      params<span class="token operator">:</span> <span class="token string">'__sample params__'</span><span class="token punctuation">,</span>
      data<span class="token operator">:</span> <span class="token punctuation">{</span> foo<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> merged <span class="token operator">=</span> <span class="token function">mergeConfig</span><span class="token punctuation">(</span>defaults<span class="token punctuation">,</span> config<span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>merged<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>url<span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>merged<span class="token punctuation">.</span>params<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>params<span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>merged<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should not inherit request options'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> localDefaults <span class="token operator">=</span> <span class="token punctuation">{</span>
      url<span class="token operator">:</span> <span class="token string">'__sample url__'</span><span class="token punctuation">,</span>
      params<span class="token operator">:</span> <span class="token string">'__sample params__'</span><span class="token punctuation">,</span>
      data<span class="token operator">:</span> <span class="token punctuation">{</span> foo<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> merged <span class="token operator">=</span> <span class="token function">mergeConfig</span><span class="token punctuation">(</span>localDefaults<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>merged<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeUndefined</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>merged<span class="token punctuation">.</span>params<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeUndefined</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>merged<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeUndefined</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should return default headers if pass config2 with undefined'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>
      <span class="token function">mergeConfig</span><span class="token punctuation">(</span>
        <span class="token punctuation">{</span>
          headers<span class="token operator">:</span> <span class="token string">'x-mock-header'</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token keyword">undefined</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      headers<span class="token operator">:</span> <span class="token string">'x-mock-header'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should merge auth, headers with defaults'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>
      <span class="token function">mergeConfig</span><span class="token punctuation">(</span>
        <span class="token punctuation">{</span>
          auth<span class="token operator">:</span> <span class="token keyword">undefined</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          auth<span class="token operator">:</span> <span class="token punctuation">{</span>
            username<span class="token operator">:</span> <span class="token string">'foo'</span><span class="token punctuation">,</span>
            password<span class="token operator">:</span> <span class="token string">'test'</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      auth<span class="token operator">:</span> <span class="token punctuation">{</span>
        username<span class="token operator">:</span> <span class="token string">'foo'</span><span class="token punctuation">,</span>
        password<span class="token operator">:</span> <span class="token string">'test'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>
      <span class="token function">mergeConfig</span><span class="token punctuation">(</span>
        <span class="token punctuation">{</span>
          auth<span class="token operator">:</span> <span class="token punctuation">{</span>
            username<span class="token operator">:</span> <span class="token string">'foo'</span><span class="token punctuation">,</span>
            password<span class="token operator">:</span> <span class="token string">'test'</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          auth<span class="token operator">:</span> <span class="token punctuation">{</span>
            username<span class="token operator">:</span> <span class="token string">'baz'</span><span class="token punctuation">,</span>
            password<span class="token operator">:</span> <span class="token string">'foobar'</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      auth<span class="token operator">:</span> <span class="token punctuation">{</span>
        username<span class="token operator">:</span> <span class="token string">'baz'</span><span class="token punctuation">,</span>
        password<span class="token operator">:</span> <span class="token string">'foobar'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should overwrite auth, headers with a non-object value'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>
      <span class="token function">mergeConfig</span><span class="token punctuation">(</span>
        <span class="token punctuation">{</span>
          headers<span class="token operator">:</span> <span class="token punctuation">{</span>
            common<span class="token operator">:</span> <span class="token punctuation">{</span>
              Accept<span class="token operator">:</span> <span class="token string">'application/json, text/plain, */*'</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          headers<span class="token operator">:</span> <span class="token keyword">null</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      headers<span class="token operator">:</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should allow setting other options'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> merged <span class="token operator">=</span> <span class="token function">mergeConfig</span><span class="token punctuation">(</span>defaults<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      timeout<span class="token operator">:</span> <span class="token number">123</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>merged<span class="token punctuation">.</span>timeout<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行测试后我们发现 <code v-pre>mergeConfig.ts</code> 文件的分支覆盖率并未达到 100%，提示是 23 行，打开文件后发现最后一个 <code v-pre>else</code> 逻辑并未走到，也就是 <code v-pre>val1</code> 为 <code v-pre>undefined</code> 的情况。但实际上即使 <code v-pre>val1</code> 为 <code v-pre>undefined</code>，我们也是返回 <code v-pre>undefined</code>，也就是返回 <code v-pre>val1</code>，所以这块代码的逻辑可以优化。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">deepMergeStrat</span><span class="token punctuation">(</span>val1<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> val2<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPlainObject</span><span class="token punctuation">(</span>val2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">deepMerge</span><span class="token punctuation">(</span>val1<span class="token punctuation">,</span> val2<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> val2 <span class="token operator">!==</span> <span class="token string">'undefined'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> val2
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPlainObject</span><span class="token punctuation">(</span>val1<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">deepMerge</span><span class="token punctuation">(</span>val1<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> val1
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2 个分支可以合并到一个分支，这样我们再次跑测试，分支覆盖率就可以达到 100% 了。</p>
<p>至此我们完成了 <code v-pre>ts-axios</code> 库对 <code v-pre>mergeConfig</code> 模块的测试，下一节课我们来测试取消模块相关代码。</p>
</div></template>


