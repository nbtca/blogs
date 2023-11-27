<template><div><h1 id="请求和响应配置化" tabindex="-1"><a class="header-anchor" href="#请求和响应配置化" aria-hidden="true">#</a> 请求和响应配置化</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>官方的 axios 库 给默认配置添加了 <code v-pre>transformRequest</code> 和 <code v-pre>transformResponse</code> 两个字段，它们的值是一个数组或者是一个函数。</p>
<p>其中 <code v-pre>transformRequest</code> 允许你在将请求数据发送到服务器之前对其进行修改，这只适用于请求方法 <code v-pre>put</code>、<code v-pre>post</code> 和 <code v-pre>patch</code>，如果值是数组，则数组中的最后一个函数必须返回一个字符串或 <code v-pre>FormData</code>、<code v-pre>URLSearchParams</code>、<code v-pre>Blob</code> 等类型作为 <code v-pre>xhr.send</code> 方法的参数，而且在 <code v-pre>transform</code> 过程中可以修改  <code v-pre>headers</code> 对象。</p>
<p>而 <code v-pre>transformResponse</code> 允许你在把响应数据传递给 <code v-pre>then</code> 或者 <code v-pre>catch</code> 之前对它们进行修改。</p>
<p>当值为数组的时候，数组的每一个函数都是一个转换函数，数组中的函数就像管道一样依次执行，前者的输出作为后者的输入。</p>
<p>举个例子：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  transformRequest<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> qs<span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">...</span>axios<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>transformRequest<span class="token punctuation">]</span><span class="token punctuation">,</span>
  transformResponse<span class="token operator">:</span> <span class="token punctuation">[</span>axios<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>transformResponse<span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> data <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      data<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> data
  <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/config/post'</span><span class="token punctuation">,</span>
  method<span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    a<span class="token operator">:</span> <span class="token number">1</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改默认配置" tabindex="-1"><a class="header-anchor" href="#修改默认配置" aria-hidden="true">#</a> 修改默认配置</h2>
<p>先修改 <code v-pre>AxiosRequestConfig</code> 的类型定义，添加 <code v-pre>transformRequest</code> 和 <code v-pre>transformResponse</code> 俩个可选属性。</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">AxiosRequestConfig</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  transformRequest<span class="token operator">?</span><span class="token operator">:</span> AxiosTransformer <span class="token operator">|</span> AxiosTransformer<span class="token punctuation">[</span><span class="token punctuation">]</span>
  transformResponse<span class="token operator">?</span><span class="token operator">:</span> AxiosTransformer <span class="token operator">|</span> AxiosTransformer<span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">AxiosTransformer</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span>data<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> headers<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着修改默认配置，如下：</p>
<p><code v-pre>defaults.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> processHeaders <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./helpers/headers'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> transformRequest<span class="token punctuation">,</span> transformResponse <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./helpers/data'</span>

<span class="token keyword">const</span> defaults<span class="token operator">:</span> AxiosRequestConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  transformRequest<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">function</span><span class="token punctuation">(</span>data<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> headers<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">{</span>
      <span class="token function">processHeaders</span><span class="token punctuation">(</span>headers<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token function">transformRequest</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>

  transformResponse<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">function</span><span class="token punctuation">(</span>data<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">transformResponse</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们把之前对请求数据和响应数据的处理逻辑，放到了默认配置中，也就是默认处理逻辑。</p>
<h2 id="transform-逻辑重构" tabindex="-1"><a class="header-anchor" href="#transform-逻辑重构" aria-hidden="true">#</a> transform 逻辑重构</h2>
<p>接下来，我们就要重构之前写的对请求数据和响应数据的处理逻辑了。由于我们可能会编写多个转换函数，我们先定义一个 <code v-pre>transform</code> 函数来处理这些转换函数的调用逻辑。</p>
<p><code v-pre>core/transform.ts</code></p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> AxiosTransformer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../types'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">transform</span><span class="token punctuation">(</span>
  data<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span>
  headers<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span>
  fns<span class="token operator">?</span><span class="token operator">:</span> AxiosTransformer <span class="token operator">|</span> AxiosTransformer<span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>fns<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> data
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token builtin">Array</span><span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>fns<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fns <span class="token operator">=</span> <span class="token punctuation">[</span>fns<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  fns<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>fn <span class="token operator">=></span> <span class="token punctuation">{</span>
    data <span class="token operator">=</span> <span class="token function">fn</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> headers<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> data
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>transform</code> 函数中接收 <code v-pre>data</code>、<code v-pre>headers</code>、<code v-pre>fns</code> 3 个参数，其中 <code v-pre>fns</code> 代表一个或者多个转换函数，内部逻辑很简单，遍历 <code v-pre>fns</code>，执行这些转换函数，并且把 <code v-pre>data</code> 和 <code v-pre>headers</code> 作为参数传入，每个转换函数返回的 <code v-pre>data</code> 会作为下一个转换函数的参数 <code v-pre>data</code> 传入。</p>
<p>接下来修改对请求数据和响应数据的处理逻辑。</p>
<p><code v-pre>dispatchRequest.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>
<span class="token keyword">import</span> transform <span class="token keyword">from</span> <span class="token string">'./transform'</span>

<span class="token keyword">function</span> <span class="token function">processConfig</span><span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  config<span class="token punctuation">.</span>url <span class="token operator">=</span> <span class="token function">transformURL</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
  config<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token function">transform</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>data<span class="token punctuation">,</span> config<span class="token punctuation">.</span>headers<span class="token punctuation">,</span> config<span class="token punctuation">.</span>transformRequest<span class="token punctuation">)</span>
  config<span class="token punctuation">.</span>headers <span class="token operator">=</span> <span class="token function">flattenHeaders</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>headers<span class="token punctuation">,</span> config<span class="token punctuation">.</span>method<span class="token operator">!</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">transformResponseData</span><span class="token punctuation">(</span>res<span class="token operator">:</span> AxiosResponse<span class="token punctuation">)</span><span class="token operator">:</span> AxiosResponse <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token function">transform</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>data<span class="token punctuation">,</span> res<span class="token punctuation">.</span>headers<span class="token punctuation">,</span> res<span class="token punctuation">.</span>config<span class="token punctuation">.</span>transformResponse<span class="token punctuation">)</span>
  <span class="token keyword">return</span> res
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们把对请求数据的处理和对响应数据的处理改成使用 <code v-pre>transform</code> 函数实现，并把配置中的 <code v-pre>transformRequest</code> 及 <code v-pre>transformResponse</code> 分别传入。</p>
<h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  transformRequest<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> qs<span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">(</span>axios<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>transformRequest <span class="token keyword">as</span> AxiosTransformer<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  transformResponse<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">(</span>axios<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>transformResponse <span class="token keyword">as</span> AxiosTransformer<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> data <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      data<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> data
  <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/config/post'</span><span class="token punctuation">,</span>
  method<span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    a<span class="token operator">:</span> <span class="token number">1</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们对 <code v-pre>transformRequest</code> 做了修改，在执行它默认的 <code v-pre>transformRequest</code> 之前，我们先用 <code v-pre>qs.stringify</code> 库对传入的数据 <code v-pre>data</code> 做了一层转换。同时也对 <code v-pre>transformResponse</code> 做了修改，在执行完默认的 <code v-pre>transformResponse</code> 后，会给响应的 <code v-pre>data</code> 对象添加一个 <code v-pre>data.b = 2</code>。</p>
<p>因为之前我们实现了配置的合并，而且我们传入的 <code v-pre>transformRequest</code> 和 <code v-pre>transformResponse</code> 遵循默认合并策略，它们会覆盖默认的值。</p>
<p>至此，我们就实现了请求和响应的配置化。到目前为止，我们的 axios 都是一个单例，一旦我们修改了 axios 的默认配置，会影响所有的请求。官网提供了一个 <code v-pre>axios.create</code> 的工厂方法允许我们创建一个新的 <code v-pre>axios</code> 实例，同时允许我们传入新的配置和默认配置合并，并做为新的默认配置。下面一节课我们就来实现这个 feature。</p>
</div></template>


