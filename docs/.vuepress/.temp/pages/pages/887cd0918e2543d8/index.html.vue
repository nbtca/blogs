<template><div><h1 id="处理请求-body-数据" tabindex="-1"><a class="header-anchor" href="#处理请求-body-数据" aria-hidden="true">#</a> 处理请求 body 数据</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>我们通过执行 <code v-pre>XMLHttpRequest</code> 对象实例的 <code v-pre>send</code> 方法来发送请求，并通过该方法的参数设置请求 <code v-pre>body</code> 数据，我们可以去 <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send" target="_blank" rel="noopener noreferrer">mdn<ExternalLinkIcon/></a> 查阅该方法支持的参数类型。</p>
<p>我们发现 <code v-pre>send</code> 方法的参数支持 <code v-pre>Document</code> 和 <code v-pre>BodyInit</code> 类型，<code v-pre>BodyInit</code> 包括了 <code v-pre>Blob</code>, <code v-pre>BufferSource</code>, <code v-pre>FormData</code>, <code v-pre>URLSearchParams</code>, <code v-pre>ReadableStream</code>、<code v-pre>USVString</code>，当没有数据的时候，我们还可以传入 <code v-pre>null</code>。</p>
<p>但是我们最常用的场景还是传一个普通对象给服务端，例如：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/base/post'</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    b<span class="token operator">:</span> <span class="token number">2</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个时候 <code v-pre>data</code>是不能直接传给 <code v-pre>send</code> 函数的，我们需要把它转换成 JSON 字符串。</p>
<h2 id="transformrequest-函数实现" tabindex="-1"><a class="header-anchor" href="#transformrequest-函数实现" aria-hidden="true">#</a> transformRequest 函数实现</h2>
<p>根据需求分析，我们要实现一个工具函数，对 request 中的 <code v-pre>data</code> 做一层转换。我们在 <code v-pre>helpers</code> 目录新建 <code v-pre>data.ts</code> 文件。</p>
<p><code v-pre>helpers/data.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> isPlainObject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./util'</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">transformRequest</span> <span class="token punctuation">(</span>data<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPlainObject</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> data
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>helpers/util.js</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">isPlainObject</span> <span class="token punctuation">(</span>val<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> val <span class="token keyword">is</span> Object <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'[object Object]'</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里为什么要使用 <code v-pre>isPlainObject</code> 函数判断，而不用之前的 <code v-pre>isObject</code> 函数呢，因为 <code v-pre>isObject</code> 的判断方式，对于 <code v-pre>FormData</code>、<code v-pre>ArrayBuffer</code> 这些类型，<code v-pre>isObject</code> 判断也为 <code v-pre>true</code>，但是这些类型的数据我们是不需要做处理的，而 <code v-pre>isPlainObject</code> 的判断方式，只有我们定义的普通 <code v-pre>JSON</code> 对象才能满足。</p>
<p><code v-pre>helpers/url.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDate</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  val <span class="token operator">=</span> val<span class="token punctuation">.</span><span class="token function">toISOString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPlainObject</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  val <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于上节课我们对请求参数值的判断，我们也应该用 <code v-pre>isPlainObject</code> 才更加合理。</p>
<p><code v-pre>helpers/util.js</code></p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// export function isObject (val: any): val is Object {</span>
<span class="token comment">//   return val !== null &amp;&amp; typeof val === 'object'</span>
<span class="token comment">// }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>既然现在 <code v-pre>isObject</code> 方法不再使用，我们先将其注释。</p>
<h2 id="实现请求-body-处理逻辑" tabindex="-1"><a class="header-anchor" href="#实现请求-body-处理逻辑" aria-hidden="true">#</a> 实现请求 body 处理逻辑</h2>
<p><code v-pre>index.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> transformRequest <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./helpers/data'</span>

<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token template-punctuation string">`</span></span>`typescript
<span class="token keyword">function</span> <span class="token function">processConfig</span> <span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  config<span class="token punctuation">.</span>url <span class="token operator">=</span> <span class="token function">transformURL</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
  config<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token function">transformRequestData</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">transformRequestData</span> <span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">transformRequest</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们定义了 <code v-pre>transformRequestData</code> 函数，去转换请求 <code v-pre>body</code> 的数据，内部调用了我们刚刚实现的的 <code v-pre>transformRequest</code> 方法。</p>
<p>然后我们在 <code v-pre>processConfig</code> 内部添加了这段逻辑，在处理完 url 后接着对 <code v-pre>config</code> 中的 <code v-pre>data</code> 做处理。</p>
<h2 id="编写-demo" tabindex="-1"><a class="header-anchor" href="#编写-demo" aria-hidden="true">#</a> 编写 demo</h2>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/base/post'</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    b<span class="token operator">:</span> <span class="token number">2</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Int32Array</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">21</span><span class="token punctuation">,</span> <span class="token number">31</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/base/buffer'</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> arr
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在 <code v-pre>examples/base/app.ts</code> 添加 2 段代码，第一个 post 请求的 <code v-pre>data</code> 是一个普通对象，第二个请求的 <code v-pre>data</code> 是一个 <code v-pre>Int32Array</code> 类型的数据，它是可以直接传给 <code v-pre>XMLHttpRequest</code> 对象的 <code v-pre>send</code> 方法的。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>router<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/base/post'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>body<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

router<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/base/buffer'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> msg <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  req<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'data'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">chunk</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>chunk<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      msg<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>chunk<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  req<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'end'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> buf <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
    res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span>buf<span class="token punctuation">.</span><span class="token function">toJSON</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们接着在 <code v-pre>examples/server.js</code> 中添加 2 个路由，分别针对这俩种请求，返回请求传入的数据。</p>
<p>然后我们打开浏览器运行 demo，看一下结果，我们发现 <code v-pre>/base/buffer</code> 的请求是可以拿到数据，但是 <code v-pre>base/post</code> 请求的 response 里却返回的是一个空对象，这是什么原因呢？</p>
<p>实际上是因为我们虽然执行 <code v-pre>send</code> 方法的时候把普通对象 <code v-pre>data</code> 转换成一个 <code v-pre>JSON</code> 字符串，但是我们请求<code v-pre>header</code> 的 <code v-pre>Content-Type</code> 是 <code v-pre>text/plain;charset=UTF-8</code>，导致了服务端接受到请求并不能正确解析请求 <code v-pre>body</code> 的数据。</p>
<p>知道这个问题后，下面一节课我们来实现对请求 <code v-pre>header</code> 的处理。</p>
</div></template>


