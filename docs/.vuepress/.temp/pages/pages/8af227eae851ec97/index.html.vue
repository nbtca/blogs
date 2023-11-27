<template><div><h1 id="axios-函数重载" tabindex="-1"><a class="header-anchor" href="#axios-函数重载" aria-hidden="true">#</a> axios 函数重载</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>目前我们的 axios 函数只支持传入 1 个参数，如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  url<span class="token operator">:</span> <span class="token string">'/extend/post'</span><span class="token punctuation">,</span>
  method<span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    msg<span class="token operator">:</span> <span class="token string">'hi'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们希望该函数也能支持传入 2 个参数，如下：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token function">axios</span><span class="token punctuation">(</span><span class="token string">'/extend/post'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    msg<span class="token operator">:</span> <span class="token string">'hello'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个参数是 <code v-pre>url</code>，第二个参数是 <code v-pre>config</code>，这个函数有点类似 <code v-pre>axios.get</code> 方法支持的参数类型，不同的是如果我们想要指定 HTTP 方法类型，仍然需要在 <code v-pre>config</code> 传入 <code v-pre>method</code>。</p>
<p>这就用到我们之前所学的函数重载知识点了，接下来我们来实现它。</p>
<h2 id="重载实现" tabindex="-1"><a class="header-anchor" href="#重载实现" aria-hidden="true">#</a> 重载实现</h2>
<p>首先我们要修改 <code v-pre>AxiosInstance</code> 的类型定义。</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">AxiosInstance</span> <span class="token keyword">extends</span> <span class="token class-name">Axios</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token function">AxiosPromise</span>

  <span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们增加一种函数的定义，它支持 2 个参数，其中 <code v-pre>url</code> 是必选参数，<code v-pre>config</code> 是可选参数。</p>
<p>由于 <code v-pre>axios</code> 函数实际上指向的是 <code v-pre>request</code> 函数，所以我们来修改 <code v-pre>request</code> 函数的实现。</p>
<p><code v-pre>core/Axios.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>  <span class="token function">request</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> url <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>config<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        config <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      config<span class="token punctuation">.</span>url <span class="token operator">=</span> url
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      config <span class="token operator">=</span> url
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">dispatchRequest</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们把 <code v-pre>request</code> 函数的参数改成 2 个，<code v-pre>url</code> 和 <code v-pre>config</code> 都是 <code v-pre>any</code> 类型，<code v-pre>config</code> 还是可选参数。</p>
<p>接着在函数体我们判断 <code v-pre>url</code> 是否为字符串类型，一旦它为字符串类型，则继续对 <code v-pre>config</code> 判断，因为它可能不传，如果为空则构造一个空对象，然后把 <code v-pre>url</code> 添加到 <code v-pre>config.url</code> 中。如果 <code v-pre>url</code> 不是字符串类型，则说明我们传入的就是单个参数，且 <code v-pre>url</code> 就是 <code v-pre>config</code>，因此把 <code v-pre>url</code> 赋值给 <code v-pre>config</code>。</p>
<p>这里要注意的是，我们虽然修改了 <code v-pre>request</code> 的实现，支持了 2 种参数，但是我们对外提供的 <code v-pre>request</code> 接口仍然不变，可以理解为这仅仅是内部的实现的修改，与对外接口不必一致，只要保留实现兼容接口即可。</p>
<h2 id="编写-demo" tabindex="-1"><a class="header-anchor" href="#编写-demo" aria-hidden="true">#</a> 编写 demo</h2>
<p><code v-pre>examples/extend/app.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  url<span class="token operator">:</span> <span class="token string">'/extend/post'</span><span class="token punctuation">,</span>
  method<span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    msg<span class="token operator">:</span> <span class="token string">'hi'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">axios</span><span class="token punctuation">(</span><span class="token string">'/extend/post'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    msg<span class="token operator">:</span> <span class="token string">'hello'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用了 <code v-pre>axios</code> 2 种请求方式，打开页面运行 <code v-pre>demo</code>，通过 network 我们可以看到 2 种请求都是运行正常的。</p>
<p>至此我们实现了 <code v-pre>axios</code> 函数的重载。官方 axios 支持了一种能力，我们可以去定义返回数据的类型，并在请求的时候指定该类型，然后在响应数据中我们就可以获取到该数据类型。下一节课我们就来实现这个 feature。</p>
</div></template>


