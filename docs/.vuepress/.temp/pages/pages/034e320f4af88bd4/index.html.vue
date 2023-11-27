<template><div><h1 id="扩展接口" tabindex="-1"><a class="header-anchor" href="#扩展接口" aria-hidden="true">#</a> 扩展接口</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>为了用户更加方便地使用 axios 发送请求，我们可以为所有支持请求方法扩展一些接口：</p>
<ul>
<li>
<p><code v-pre>axios.request(config)</code></p>
</li>
<li>
<p><code v-pre>axios.get(url[, config])</code></p>
</li>
<li>
<p><code v-pre>axios.delete(url[, config])</code></p>
</li>
<li>
<p><code v-pre>axios.head(url[, config])</code></p>
</li>
<li>
<p><code v-pre>axios.options(url[, config])</code></p>
</li>
<li>
<p><code v-pre>axios.post(url[, data[, config]])</code></p>
</li>
<li>
<p><code v-pre>axios.put(url[, data[, config]])</code></p>
</li>
<li>
<p><code v-pre>axios.patch(url[, data[, config]])</code></p>
</li>
</ul>
<p>如果使用了这些方法，我们就不必在 <code v-pre>config</code> 中指定 <code v-pre>url</code>、<code v-pre>method</code>、<code v-pre>data</code> 这些属性了。</p>
<p>从需求上来看，<code v-pre>axios</code> 不再单单是一个方法，更像是一个混合对象，本身是一个方法，又有很多方法属性，接下来我们就来实现这个混合对象。</p>
<h2 id="接口类型定义" tabindex="-1"><a class="header-anchor" href="#接口类型定义" aria-hidden="true">#</a> 接口类型定义</h2>
<p>根据需求分析，混合对象 <code v-pre>axios</code> 本身是一个函数，我们再实现一个包括它属性方法的类，然后把这个类的原型属性和自身属性再拷贝到 <code v-pre>axios</code> 上。</p>
<p>我们先来给 <code v-pre>axios</code> 混合对象定义接口：</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">Axios</span> <span class="token punctuation">{</span>
  <span class="token function">request</span><span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise

  <span class="token function">get</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise

  <span class="token keyword">delete</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise

  <span class="token function">head</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise

  <span class="token function">options</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise

  <span class="token function">post</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> data<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise

  <span class="token function">put</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> data<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise

  <span class="token function">patch</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> data<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">AxiosInstance</span> <span class="token keyword">extends</span> <span class="token class-name">Axios</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">AxiosRequestConfig</span> <span class="token punctuation">{</span>
  url<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先定义一个 <code v-pre>Axios</code> 类型接口，它描述了 <code v-pre>Axios</code> 类中的公共方法，接着定义了 <code v-pre>AxiosInstance</code> 接口继承 <code v-pre>Axios</code>，它就是一个混合类型的接口。</p>
<p>另外 <code v-pre>AxiosRequestConfig</code> 类型接口中的 <code v-pre>url</code> 属性变成了可选属性。</p>
<h2 id="创建-axios-类" tabindex="-1"><a class="header-anchor" href="#创建-axios-类" aria-hidden="true">#</a> 创建 Axios 类</h2>
<p>我们创建一个 <code v-pre>Axios</code> 类，来实现接口定义的公共方法。我们创建了一个 <code v-pre>core</code> 目录，用来存放发送请求核心流程的代码。我们在 <code v-pre>core</code> 目录下创建 <code v-pre>Axios.ts</code> 文件。</p>
<p><code v-pre>core/Axios.ts</code></p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> AxiosRequestConfig<span class="token punctuation">,</span> AxiosPromise<span class="token punctuation">,</span> Method <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../types'</span>
<span class="token keyword">import</span> dispatchRequest <span class="token keyword">from</span> <span class="token string">'./dispatchRequest'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Axios</span> <span class="token punctuation">{</span>
  <span class="token function">request</span><span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">dispatchRequest</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">get</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_requestMethodWithoutData</span><span class="token punctuation">(</span><span class="token string">'get'</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> config<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">delete</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_requestMethodWithoutData</span><span class="token punctuation">(</span><span class="token string">'delete'</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> config<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">head</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_requestMethodWithoutData</span><span class="token punctuation">(</span><span class="token string">'head'</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> config<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">options</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_requestMethodWithoutData</span><span class="token punctuation">(</span><span class="token string">'options'</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> config<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">post</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> data<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_requestMethodWithData</span><span class="token punctuation">(</span><span class="token string">'post'</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> data<span class="token punctuation">,</span> config<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">put</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> data<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_requestMethodWithData</span><span class="token punctuation">(</span><span class="token string">'put'</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> data<span class="token punctuation">,</span> config<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">patch</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> data<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_requestMethodWithData</span><span class="token punctuation">(</span><span class="token string">'patch'</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> data<span class="token punctuation">,</span> config<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">_requestMethodWithoutData</span><span class="token punctuation">(</span>method<span class="token operator">:</span> Method<span class="token punctuation">,</span> url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span>
      Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>config <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        method<span class="token punctuation">,</span>
        url
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">_requestMethodWithData</span><span class="token punctuation">(</span>method<span class="token operator">:</span> Method<span class="token punctuation">,</span> url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> data<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> config<span class="token operator">?</span><span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span>
      Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>config <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        method<span class="token punctuation">,</span>
        url<span class="token punctuation">,</span>
        data
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code v-pre>request</code> 方法的功能和我们之前的 <code v-pre>axios</code> 函数功能是一致。<code v-pre>axios</code> 函数的功能就是发送请求，基于模块化编程的思想，我们把这部分功能抽出一个单独的模块，在 <code v-pre>core</code> 目录下创建 <code v-pre>dispatchRequest</code> 方法，把之前 <code v-pre>axios.ts</code> 的相关代码拷贝过去。另外我们把 <code v-pre>xhr.ts</code> 文件也迁移到 <code v-pre>core</code> 目录下。</p>
<p><code v-pre>core/dispatchRequest.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> AxiosPromise<span class="token punctuation">,</span> AxiosRequestConfig<span class="token punctuation">,</span> AxiosResponse <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../types'</span>
<span class="token keyword">import</span> xhr <span class="token keyword">from</span> <span class="token string">'./xhr'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> buildURL <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../helpers/url'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> transformRequest<span class="token punctuation">,</span> transformResponse <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../helpers/data'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> processHeaders <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../helpers/headers'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">dispatchRequest</span><span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise <span class="token punctuation">{</span>
  <span class="token function">processConfig</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token function">xhr</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>res <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">transformResponseData</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">processConfig</span><span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  config<span class="token punctuation">.</span>url <span class="token operator">=</span> <span class="token function">transformURL</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
  config<span class="token punctuation">.</span>headers <span class="token operator">=</span> <span class="token function">transformHeaders</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
  config<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token function">transformRequestData</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">transformURL</span><span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> url<span class="token punctuation">,</span> params <span class="token punctuation">}</span> <span class="token operator">=</span> config
  <span class="token keyword">return</span> <span class="token function">buildURL</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> params<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">transformRequestData</span><span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">transformRequest</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">transformHeaders</span><span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> headers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> data <span class="token punctuation">}</span> <span class="token operator">=</span> config
  <span class="token keyword">return</span> <span class="token function">processHeaders</span><span class="token punctuation">(</span>headers<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">transformResponseData</span><span class="token punctuation">(</span>res<span class="token operator">:</span> AxiosResponse<span class="token punctuation">)</span><span class="token operator">:</span> AxiosResponse <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token function">transformResponse</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
  <span class="token keyword">return</span> res
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>回到 <code v-pre>Axios.ts</code> 文件，对于 <code v-pre>get</code>、<code v-pre>delete</code>、<code v-pre>head</code>、<code v-pre>options</code>、<code v-pre>post</code>、<code v-pre>patch</code>、<code v-pre>put</code> 这些方法，都是对外提供的语法糖，内部都是通过调用 <code v-pre>request</code> 方法实现发送请求，只不过在调用之前对 <code v-pre>config</code> 做了一层合并处理。</p>
<h2 id="混合对象实现" tabindex="-1"><a class="header-anchor" href="#混合对象实现" aria-hidden="true">#</a> 混合对象实现</h2>
<p>混合对象实现思路很简单，首先这个对象是一个函数，其次这个对象要包括 <code v-pre>Axios</code> 类的所有原型属性和实例属性，我们首先来实现一个辅助函数 <code v-pre>extend</code>。</p>
<p><code v-pre>helpers/util.ts</code></p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">extend</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>to<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span> from<span class="token operator">:</span> <span class="token constant">U</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span> <span class="token operator">&amp;</span> <span class="token constant">U</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> from<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">;</span><span class="token punctuation">(</span>to <span class="token keyword">as</span> <span class="token constant">T</span> <span class="token operator">&amp;</span> <span class="token constant">U</span><span class="token punctuation">)</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> from<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token keyword">as</span> <span class="token builtin">any</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> to <span class="token keyword">as</span> <span class="token constant">T</span> <span class="token operator">&amp;</span> <span class="token constant">U</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>extend</code> 方法的实现用到了交叉类型，并且用到了类型断言。<code v-pre>extend</code> 的最终目的是把 <code v-pre>from</code> 里的属性都扩展到 <code v-pre>to</code> 中，包括原型上的属性。</p>
<p>我们接下来对 <code v-pre>axios.ts</code> 文件做修改，我们用工厂模式去创建一个 <code v-pre>axios</code> 混合对象。</p>
<p><code v-pre>axios.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> AxiosInstance <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./types'</span>
<span class="token keyword">import</span> Axios <span class="token keyword">from</span> <span class="token string">'./core/Axios'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> extend <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./helpers/util'</span>

<span class="token keyword">function</span> <span class="token function">createInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> AxiosInstance <span class="token punctuation">{</span>
  <span class="token keyword">const</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Axios</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> instance <span class="token operator">=</span> Axios<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span>

  <span class="token function">extend</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> context<span class="token punctuation">)</span>

  <span class="token keyword">return</span> instance <span class="token keyword">as</span> AxiosInstance
<span class="token punctuation">}</span>

<span class="token keyword">const</span> axios <span class="token operator">=</span> <span class="token function">createInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> axios
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>createInstance</code> 工厂函数的内部，我们首先实例化了 <code v-pre>Axios</code> 实例 <code v-pre>context</code>，接着创建<code v-pre>instance</code> 指向 <code v-pre>Axios.prototype.request</code> 方法，并绑定了上下文 <code v-pre>context</code>；接着通过 <code v-pre>extend</code> 方法把 <code v-pre>context</code> 中的原型方法和实例方法全部拷贝到 <code v-pre>instance</code> 上，这样就实现了一个混合对象：<code v-pre>instance</code> 本身是一个函数，又拥有了 <code v-pre>Axios</code> 类的所有原型和实例属性，最终把这个 <code v-pre>instance</code> 返回。由于这里 <code v-pre>TypeScript</code> 不能正确推断 <code v-pre>instance</code> 的类型，我们把它断言成 <code v-pre>AxiosInstance</code> 类型。</p>
<p>这样我们就可以通过 <code v-pre>createInstance</code> 工厂函数创建了 <code v-pre>axios</code>，当直接调用 <code v-pre>axios</code> 方法就相当于执行了 <code v-pre>Axios</code> 类的 <code v-pre>request</code> 方法发送请求，当然我们也可以调用 <code v-pre>axios.get</code>、<code v-pre>axios.post</code> 等方法。</p>
<h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<p>在 <code v-pre>examples</code> 目录下创建 <code v-pre>extend</code> 目录，在 <code v-pre>extend</code> 目录下创建 <code v-pre>index.html</code>:</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>utf-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Extend example<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/__build__/extend.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着创建 <code v-pre>app.ts</code> 作为入口文件：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">'../../src/index'</span>

<span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  url<span class="token operator">:</span> <span class="token string">'/extend/post'</span><span class="token punctuation">,</span>
  method<span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    msg<span class="token operator">:</span> <span class="token string">'hi'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

axios<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  url<span class="token operator">:</span> <span class="token string">'/extend/post'</span><span class="token punctuation">,</span>
  method<span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    msg<span class="token operator">:</span> <span class="token string">'hello'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/extend/get'</span><span class="token punctuation">)</span>

axios<span class="token punctuation">.</span><span class="token function">options</span><span class="token punctuation">(</span><span class="token string">'/extend/options'</span><span class="token punctuation">)</span>

axios<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">'/extend/delete'</span><span class="token punctuation">)</span>

axios<span class="token punctuation">.</span><span class="token function">head</span><span class="token punctuation">(</span><span class="token string">'/extend/head'</span><span class="token punctuation">)</span>

axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/extend/post'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> msg<span class="token operator">:</span> <span class="token string">'post'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

axios<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">'/extend/put'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> msg<span class="token operator">:</span> <span class="token string">'put'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

axios<span class="token punctuation">.</span><span class="token function">patch</span><span class="token punctuation">(</span><span class="token string">'/extend/patch'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> msg<span class="token operator">:</span> <span class="token string">'patch'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在命令行运行 <code v-pre>npm run dev</code>，接着打开 chrome 浏览器，访问 <code v-pre>http://localhost:8080/</code> 即可访问我们的 demo 了，我们点到 <code v-pre>Extend</code> 目录下，通过开发者工具的 network 部分我们可以看到每个请求的发送情况。</p>
<p>至此我们支持了对 <code v-pre>axios</code> API 的扩展，把它变成了一个混合对象。官方的 <code v-pre>axios</code> 实例除了支持了 <code v-pre>axios(config)</code>，还支持了传入 2 个参数 <code v-pre>axios(url, config)</code>，这里就涉及到函数重载的概念了，下一节我们来实现这个 feature。</p>
</div></template>


