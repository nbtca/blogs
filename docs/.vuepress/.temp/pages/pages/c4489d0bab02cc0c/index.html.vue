<template><div><h1 id="响应数据支持泛型" tabindex="-1"><a class="header-anchor" href="#响应数据支持泛型" aria-hidden="true">#</a> 响应数据支持泛型</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>通常情况下，我们会把后端返回数据格式单独放入一个接口中：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// 请求接口数据</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">ResponseData<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span></span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/**
   * 状态码
   * <span class="token keyword">@type</span> <span class="token punctuation">{</span> number <span class="token punctuation">}</span>
   */</span>
  code<span class="token operator">:</span> <span class="token builtin">number</span>

  <span class="token doc-comment comment">/**
   * 数据
   * <span class="token keyword">@type</span> <span class="token punctuation">{</span> T <span class="token punctuation">}</span>
   */</span>
  result<span class="token operator">:</span> <span class="token constant">T</span>

  <span class="token doc-comment comment">/**
   * 消息
   * <span class="token keyword">@type</span> <span class="token punctuation">{</span> string <span class="token punctuation">}</span>
   */</span>
  message<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以把 API 抽离成单独的模块：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ResponseData <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./interface.ts'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">getUser</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> axios<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span>ResponseData<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span></span></span><span class="token punctuation">(</span><span class="token string">'/somepath'</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>res <span class="token operator">=></span> res<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span>err <span class="token operator">=></span> <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着我们写入返回的数据类型 <code v-pre>User</code>，这可以让 TypeScript 顺利推断出我们想要的类型：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// user 被推断出为</span>
  <span class="token comment">// {</span>
  <span class="token comment">//  code: number,</span>
  <span class="token comment">//  result: { name: string, age: number },</span>
  <span class="token comment">//  message: string</span>
  <span class="token comment">// }</span>
  <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token generic-function"><span class="token function">getUser</span><span class="token generic class-name"><span class="token operator">&lt;</span>User<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="接口添加泛型参数" tabindex="-1"><a class="header-anchor" href="#接口添加泛型参数" aria-hidden="true">#</a> 接口添加泛型参数</h2>
<p>根据需求分析，我们需要给相关的接口定义添加泛型参数。</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">AxiosResponse<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span></span> <span class="token punctuation">{</span>
  data<span class="token operator">:</span> <span class="token constant">T</span>
  status<span class="token operator">:</span> <span class="token builtin">number</span>
  statusText<span class="token operator">:</span> <span class="token builtin">string</span>
  headers<span class="token operator">:</span> <span class="token builtin">any</span>
  config<span class="token operator">:</span> AxiosRequestConfig
  request<span class="token operator">:</span> <span class="token builtin">any</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">AxiosPromise<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span></span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">Promise</span><span class="token operator">&lt;</span>AxiosResponse<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">Axios</span> <span class="token punctuation">{</span>
  <span class="token generic-function"><span class="token function">request</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>

  <span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>

  <span class="token keyword">delete</span><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>

  <span class="token generic-function"><span class="token function">head</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>

  <span class="token generic-function"><span class="token function">options</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>

  <span class="token generic-function"><span class="token function">post</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> data<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>

  <span class="token generic-function"><span class="token function">put</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> data<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>

  <span class="token generic-function"><span class="token function">patch</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> data<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">AxiosInstance</span> <span class="token keyword">extends</span> <span class="token class-name">Axios</span> <span class="token punctuation">{</span>
  <span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span><span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>

  <span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们先给 <code v-pre>AxiosResponse</code> 接口添加了泛型参数 <code v-pre>T</code>，<code v-pre>T=any</code> 表示泛型的类型参数默认值为 <code v-pre>any</code>。</p>
<p>接着我们为 <code v-pre>AxiosPromise</code>、<code v-pre>Axios</code> 以及 <code v-pre>AxiosInstance</code> 接口都加上了泛型参数。我们可以看到这些请求的返回类型都变成了 <code v-pre>AxiosPromise&lt;T&gt;</code>，也就是 <code v-pre>Promise&lt;AxiosResponse&lt;T&gt;&gt;</code>，这样我们就可以从响应中拿到了类型 <code v-pre>T</code> 了。</p>
<h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<p><code v-pre>examples/extend/app.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">ResponseData<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">></span></span> <span class="token punctuation">{</span>
  code<span class="token operator">:</span> <span class="token builtin">number</span>
  result<span class="token operator">:</span> <span class="token constant">T</span>
  message<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">getUser</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token generic-function"><span class="token function">axios</span><span class="token generic class-name"><span class="token operator">&lt;</span>ResponseData<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span></span></span><span class="token punctuation">(</span><span class="token string">'/extend/user'</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>res <span class="token operator">=></span> res<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span>err <span class="token operator">=></span> <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>


<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token generic-function"><span class="token function">getUser</span><span class="token generic class-name"><span class="token operator">&lt;</span>User<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>result<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们调用 <code v-pre>getUser&lt;User&gt;</code> 的时候，相当于调用了 <code v-pre>axios&lt;ResponseData&lt;User&gt;&gt;</code>，也就是我们传入给 <code v-pre>axios</code> 函数的类型 <code v-pre>T</code> 为 <code v-pre>ResponseData&lt;User&gt;</code>；相当于返回值 <code v-pre>AxiosPromise&lt;T&gt;</code> 的 <code v-pre>T</code>，实际上也是 <code v-pre>Promise&lt;AxiosResponse&lt;T&gt;&gt;</code> 中的 <code v-pre>T</code> 的类型是 <code v-pre>ResponseData&lt;User&gt;</code>，所以响应数据中的 <code v-pre>data</code> 类型就是 <code v-pre>ResponseData&lt;User&gt;</code>，也就是如下数据结构：</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  code<span class="token operator">:</span> number
  result<span class="token operator">:</span> User
  message<span class="token operator">:</span> string
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个也是 <code v-pre>const user = await getUser&lt;User&gt;()</code> 返回值 <code v-pre>user</code> 的数据类型，所以 TypeScript 能正确推断出 <code v-pre>user</code> 的类型。</p>
<p>至此，我们的 <code v-pre>ts-axios</code> 接口扩展章节就告一段落了，下一章我们来实现 <code v-pre>axios</code> 的一个非常好用的功能 —— 拦截器。</p>
</div></template>


