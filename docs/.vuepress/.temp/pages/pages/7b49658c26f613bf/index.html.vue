<template><div><h1 id="扩展-axios-create-静态接口" tabindex="-1"><a class="header-anchor" href="#扩展-axios-create-静态接口" aria-hidden="true">#</a> 扩展 axios.create 静态接口</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>目前为止，我们的 axios 都是一个单例，一旦我们修改了 axios 的默认配置，会影响所有的请求。我们希望提供了一个 <code v-pre>axios.create</code> 的静态接口允许我们创建一个新的 <code v-pre>axios</code> 实例，同时允许我们传入新的配置和默认配置合并，并做为新的默认配置。</p>
<p>举个例子：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  transformRequest<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> qs<span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">(</span>axios<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>transformRequest <span class="token keyword">as</span> AxiosTransformer<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  transformResponse<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">(</span>axios<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>transformResponse <span class="token keyword">as</span> AxiosTransformer<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> data <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      data<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> data
  <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">instance</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  url<span class="token operator">:</span> <span class="token string">'/config/post'</span><span class="token punctuation">,</span>
  method<span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    a<span class="token operator">:</span> <span class="token number">1</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="静态方法扩展" tabindex="-1"><a class="header-anchor" href="#静态方法扩展" aria-hidden="true">#</a> 静态方法扩展</h2>
<p>由于 <code v-pre>axios</code> 扩展了一个静态接口，因此我们先来修改接口类型定义。</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">AxiosStatic</span> <span class="token keyword">extends</span> <span class="token class-name">AxiosInstance</span><span class="token punctuation">{</span>
  <span class="token function">create</span><span class="token punctuation">(</span>config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosInstance
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>create</code> 函数可以接受一个 <code v-pre>AxiosRequestConfig</code> 类型的配置，作为默认配置的扩展，也可以接受不传参数。</p>
<p>接着我们来实现 <code v-pre>axios.create</code> 静态方法。</p>
<p><code v-pre>axios.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">createInstance</span><span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosStatic <span class="token punctuation">{</span>
  <span class="token keyword">const</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Axios</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
  <span class="token keyword">const</span> instance <span class="token operator">=</span> Axios<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span>

  <span class="token function">extend</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> context<span class="token punctuation">)</span>

  <span class="token keyword">return</span> instance <span class="token keyword">as</span> AxiosStatic
<span class="token punctuation">}</span>
axios<span class="token punctuation">.</span><span class="token function-variable function">create</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">create</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">createInstance</span><span class="token punctuation">(</span><span class="token function">mergeConfig</span><span class="token punctuation">(</span>defaults<span class="token punctuation">,</span> config<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>内部调用了 <code v-pre>createInstance</code> 函数，并且把参数 <code v-pre>config</code> 与 <code v-pre>defaults</code> 合并，作为新的默认配置。注意这里我们需要 <code v-pre>createInstance</code> 函数的返回值类型为 <code v-pre>AxiosStatic</code>。</p>
<h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  transformRequest<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> qs<span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">(</span>axios<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>transformRequest <span class="token keyword">as</span> AxiosTransformer<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  transformResponse<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">(</span>axios<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>transformResponse <span class="token keyword">as</span> AxiosTransformer<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> data <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      data<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> data
  <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">instance</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  url<span class="token operator">:</span> <span class="token string">'/config/post'</span><span class="token punctuation">,</span>
  method<span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    a<span class="token operator">:</span> <span class="token number">1</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们对上节课的示例做了小小的修改，通过 <code v-pre>axios.create</code> 方法创建一个新的实例 <code v-pre>instance</code>，并传入了 <code v-pre>transformRequest</code> 和 <code v-pre>transformResponse</code> 的配置修改了默认配置，然后通过 <code v-pre>instance</code> 发送请求，效果和之前是一样的。</p>
<p>至此我们实现了 <code v-pre>axios.create</code> 静态接口的扩展，整个 <code v-pre>ts-axios</code> 的配置化也告一段落。官方 axios 库还支持了对请求取消的能力，在发送请求前以及请求发送出去未响应前都可以取消该请求。下一章我们就来实现这个 feature。</p>
</div></template>


