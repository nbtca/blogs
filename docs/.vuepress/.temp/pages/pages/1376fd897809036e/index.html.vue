<template><div><h1 id="上传和下载的进度监控" tabindex="-1"><a class="header-anchor" href="#上传和下载的进度监控" aria-hidden="true">#</a> 上传和下载的进度监控</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>有些时候，当我们上传文件或者是请求一个大体积数据的时候，希望知道实时的进度，甚至可以基于此做一个进度条的展示。</p>
<p>我们希望给 <code v-pre>axios</code> 的请求配置提供 <code v-pre>onDownloadProgress</code> 和 <code v-pre>onUploadProgress</code> 2 个函数属性，用户可以通过这俩函数实现对下载进度和上传进度的监控。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/more/get'</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
  <span class="token function">onDownloadProgress</span><span class="token punctuation">(</span>progressEvent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 监听下载进度</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/more/post'</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
  <span class="token function">onUploadProgress</span><span class="token punctuation">(</span>progressEvent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 监听上传进度</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>xhr</code> 对象提供了一个 <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event" target="_blank" rel="noopener noreferrer"><code v-pre>progress</code><ExternalLinkIcon/></a> 事件，我们可以监听此事件对数据的下载进度做监控；另外，<a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload" target="_blank" rel="noopener noreferrer"><code v-pre>xhr.uplaod</code><ExternalLinkIcon/></a> 对象也提供了 <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event" target="_blank" rel="noopener noreferrer"><code v-pre>progress</code><ExternalLinkIcon/></a> 事件，我们可以基于此对上传进度做监控。</p>
<h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2>
<p>首先修改一下类型定义。</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">AxiosRequestConfig</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  onDownloadProgress<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> ProgressEvent<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span>
  onUploadProgress<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> ProgressEvent<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着在发送请求前，给 <code v-pre>xhr</code> 对象添加属性。</p>
<p><code v-pre>core/xhr.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span>
  <span class="token comment">/*...*/</span>
  onDownloadProgress<span class="token punctuation">,</span>
  onUploadProgress
<span class="token punctuation">}</span> <span class="token operator">=</span> config

<span class="token keyword">if</span> <span class="token punctuation">(</span>onDownloadProgress<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  request<span class="token punctuation">.</span>onprogress <span class="token operator">=</span> onDownloadProgress
<span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>onUploadProgress<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  request<span class="token punctuation">.</span>upload<span class="token punctuation">.</span>onprogress <span class="token operator">=</span> onUploadProgress
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，如果请求的数据是 <code v-pre>FormData</code> 类型，我们应该主动删除请求 <code v-pre>headers</code> 中的 <code v-pre>Content-Type</code> 字段，让浏览器自动根据请求数据设置 <code v-pre>Content-Type</code>。比如当我们通过 <code v-pre>FormData</code> 上传文件的时候，浏览器会把请求 <code v-pre>headers</code> 中的 <code v-pre>Content-Type</code> 设置为 <code v-pre>multipart/form-data</code>。</p>
<p>我们先添加一个判断 <code v-pre>FormData</code> 的方法。</p>
<p><code v-pre>helpers/util.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">isFormData</span><span class="token punctuation">(</span>val<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">typeof</span> val <span class="token operator">!==</span> <span class="token string">'undefined'</span> <span class="token operator">&amp;&amp;</span> val <span class="token keyword">instanceof</span> <span class="token class-name">FormData</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再添加相关逻辑。</p>
<p><code v-pre>core/xhr.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isFormData</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">delete</span> headers<span class="token punctuation">[</span><span class="token string">'Content-Type'</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们发现，<code v-pre>xhr</code> 函数内部随着需求越来越多，代码也越来越臃肿，我们可以把逻辑梳理一下，把内部代码做一层封装优化。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">xhr</span><span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span>
      data <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
      url<span class="token punctuation">,</span>
      method <span class="token operator">=</span> <span class="token string">'get'</span><span class="token punctuation">,</span>
      headers<span class="token punctuation">,</span>
      responseType<span class="token punctuation">,</span>
      timeout<span class="token punctuation">,</span>
      cancelToken<span class="token punctuation">,</span>
      withCredentials<span class="token punctuation">,</span>
      xsrfCookieName<span class="token punctuation">,</span>
      xsrfHeaderName<span class="token punctuation">,</span>
      onDownloadProgress<span class="token punctuation">,</span>
      onUploadProgress
    <span class="token punctuation">}</span> <span class="token operator">=</span> config

    <span class="token keyword">const</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    request<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>method<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> url<span class="token operator">!</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>

    <span class="token function">configureRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token function">addEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token function">processHeaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token function">processCancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    request<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>

    <span class="token keyword">function</span> <span class="token function">configureRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>responseType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        request<span class="token punctuation">.</span>responseType <span class="token operator">=</span> responseType
      <span class="token punctuation">}</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>timeout<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        request<span class="token punctuation">.</span>timeout <span class="token operator">=</span> timeout
      <span class="token punctuation">}</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>withCredentials<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        request<span class="token punctuation">.</span>withCredentials <span class="token operator">=</span> withCredentials
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">addEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
      request<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">handleLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>request<span class="token punctuation">.</span>readyState <span class="token operator">!==</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>request<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">const</span> responseHeaders <span class="token operator">=</span> <span class="token function">parseHeaders</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span><span class="token function">getAllResponseHeaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">const</span> responseData <span class="token operator">=</span>
          responseType <span class="token operator">&amp;&amp;</span> responseType <span class="token operator">!==</span> <span class="token string">'text'</span> <span class="token operator">?</span> request<span class="token punctuation">.</span>response <span class="token operator">:</span> request<span class="token punctuation">.</span>responseText
        <span class="token keyword">const</span> response<span class="token operator">:</span> AxiosResponse <span class="token operator">=</span> <span class="token punctuation">{</span>
          data<span class="token operator">:</span> responseData<span class="token punctuation">,</span>
          status<span class="token operator">:</span> request<span class="token punctuation">.</span>status<span class="token punctuation">,</span>
          statusText<span class="token operator">:</span> request<span class="token punctuation">.</span>statusText<span class="token punctuation">,</span>
          headers<span class="token operator">:</span> responseHeaders<span class="token punctuation">,</span>
          config<span class="token punctuation">,</span>
          request
        <span class="token punctuation">}</span>
        <span class="token function">handleResponse</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      request<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">handleError</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token function">createError</span><span class="token punctuation">(</span><span class="token string">'Network Error'</span><span class="token punctuation">,</span> config<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> request<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      request<span class="token punctuation">.</span><span class="token function-variable function">ontimeout</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">handleTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span>
          <span class="token function">createError</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Timeout of </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>config<span class="token punctuation">.</span>timeout<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> ms exceeded</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> config<span class="token punctuation">,</span> <span class="token string">'ECONNABORTED'</span><span class="token punctuation">,</span> request<span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>onDownloadProgress<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        request<span class="token punctuation">.</span>onprogress <span class="token operator">=</span> onDownloadProgress
      <span class="token punctuation">}</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>onUploadProgress<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        request<span class="token punctuation">.</span>upload<span class="token punctuation">.</span>onprogress <span class="token operator">=</span> onUploadProgress
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">processHeaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isFormData</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">delete</span> headers<span class="token punctuation">[</span><span class="token string">'Content-Type'</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>withCredentials <span class="token operator">||</span> <span class="token function">isURLSameOrigin</span><span class="token punctuation">(</span>url<span class="token operator">!</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> xsrfCookieName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> xsrfValue <span class="token operator">=</span> cookie<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>xsrfCookieName<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>xsrfValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          headers<span class="token punctuation">[</span>xsrfHeaderName<span class="token operator">!</span><span class="token punctuation">]</span> <span class="token operator">=</span> xsrfValue
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>

      Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>headers<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>name <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> name<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'content-type'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">delete</span> headers<span class="token punctuation">[</span>name<span class="token punctuation">]</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          request<span class="token punctuation">.</span><span class="token function">setRequestHeader</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> headers<span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">processCancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>cancelToken<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        cancelToken<span class="token punctuation">.</span>promise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>reason <span class="token operator">=></span> <span class="token punctuation">{</span>
          request<span class="token punctuation">.</span><span class="token function">abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">handleResponse</span><span class="token punctuation">(</span>response<span class="token operator">:</span> AxiosResponse<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>response<span class="token punctuation">.</span>status <span class="token operator">>=</span> <span class="token number">200</span> <span class="token operator">&amp;&amp;</span> response<span class="token punctuation">.</span>status <span class="token operator">&lt;</span> <span class="token number">300</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span>
          <span class="token function">createError</span><span class="token punctuation">(</span>
            <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Request failed with status code </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>response<span class="token punctuation">.</span>status<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
            config<span class="token punctuation">,</span>
            <span class="token keyword">null</span><span class="token punctuation">,</span>
            request<span class="token punctuation">,</span>
            response
          <span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们把整个流程分为 7 步：</p>
<ul>
<li>创建一个 <code v-pre>request</code> 实例。</li>
<li>执行 <code v-pre>request.open</code> 方法初始化。</li>
<li>执行 <code v-pre>configureRequest</code> 配置 <code v-pre>request</code> 对象。</li>
<li>执行 <code v-pre>addEvents</code> 给 <code v-pre>request</code> 添加事件处理函数。</li>
<li>执行 <code v-pre>processHeaders</code> 处理请求 <code v-pre>headers</code>。</li>
<li>执行 <code v-pre>processCancel</code> 处理请求取消逻辑。</li>
<li>执行 <code v-pre>request.send</code> 方法发送请求。</li>
</ul>
<p>这样拆分后整个流程就会显得非常清晰，未来我们再去新增需求的时候代码也不会显得越来越臃肿。</p>
<h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<p>这节课的 demo 非常有意思，我们第一次给界面上增加了一些交互的按钮。</p>
<p><code v-pre>examples/more/index.html</code></p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>utf-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>More example<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text/css<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>file download<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>download<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn btn-primary<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Download<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>file upload<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">role</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>form<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>form<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">onsubmit</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript"><span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>file<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>file<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>form-control<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>upload<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn btn-primary<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Upload<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/__build__/more.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，我们为了友好地展示上传和下载进度，我们引入了一个开源库 <a href="https://github.com/rstacruz/nprogress" target="_blank" rel="noopener noreferrer">nprogress<ExternalLinkIcon/></a>，它可以在页面的顶部展示进度条。</p>
<p><code v-pre>examples/more/app.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">calculatePercentage</span><span class="token punctuation">(</span>loaded<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> total<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>loaded <span class="token operator">*</span> <span class="token number">1.0</span><span class="token punctuation">)</span> <span class="token operator">/</span> total
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">loadProgressBar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token function-variable function">setupStartProgress</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>config <span class="token operator">=></span> <span class="token punctuation">{</span>
      NProgress<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> config
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> <span class="token function-variable function">setupUpdateProgress</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token function-variable function">update</span> <span class="token operator">=</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> ProgressEvent<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
      NProgress<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token function">calculatePercentage</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>loaded<span class="token punctuation">,</span> e<span class="token punctuation">.</span>total<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    instance<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>onDownloadProgress <span class="token operator">=</span> update
    instance<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>onUploadProgress <span class="token operator">=</span> update
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> <span class="token function-variable function">setupStopProgress</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>response <span class="token operator">=></span> <span class="token punctuation">{</span>
      NProgress<span class="token punctuation">.</span><span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> response
    <span class="token punctuation">}</span><span class="token punctuation">,</span> error <span class="token operator">=></span> <span class="token punctuation">{</span>
      NProgress<span class="token punctuation">.</span><span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token builtin">Promise</span><span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">setupStartProgress</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">setupUpdateProgress</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">setupStopProgress</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">loadProgressBar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> downloadEl <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'download'</span><span class="token punctuation">)</span>

downloadEl<span class="token operator">!</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> e <span class="token operator">=></span> <span class="token punctuation">{</span>
  instance<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'https://img.mukewang.com/5cc01a7b0001a33718720632.jpg'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> uploadEl <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'upload'</span><span class="token punctuation">)</span>

uploadEl<span class="token operator">!</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> e <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> fileEl <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'file'</span><span class="token punctuation">)</span> <span class="token keyword">as</span> HTMLInputElement
  <span class="token keyword">if</span> <span class="token punctuation">(</span>fileEl<span class="token punctuation">.</span>files<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    data<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">'file'</span><span class="token punctuation">,</span> fileEl<span class="token punctuation">.</span>files<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/more/upload'</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 <code v-pre>progress</code> 事件参数 <code v-pre>e</code>，会有 <code v-pre>e.total</code> 和 <code v-pre>e.loaded</code> 属性，表示进程总体的工作量和已经执行的工作量，我们可以根据这 2 个值算出当前进度，然后通过 <code v-pre>Nprogess.set</code> 设置。另外，我们通过配置请求拦截器和响应拦截器执行 <code v-pre>NProgress.start()</code> 和 <code v-pre>NProgress.done()</code>。</p>
<p>我们给下载按钮绑定了一个 <code v-pre>click</code> 事件，请求一张图片，我们可以看到实时的进度；另外我们也给上传按钮绑定了一个 <code v-pre>click</code> 事件，上传我们选择的文件，同样也能看到实时进度。</p>
<p>在服务端，我们为了处理上传请求，需要下载安装一个 <code v-pre>express</code> 的中间件 <code v-pre>connect-multiparty</code>，然后使用它。</p>
<p><code v-pre>example/server.js</code>：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> multipart <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'connect-multiparty'</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">multipart</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">uploadDir</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'upload-file'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

router<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/more/upload'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>body<span class="token punctuation">,</span> req<span class="token punctuation">.</span>files<span class="token punctuation">)</span>
  res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token string">'upload success!'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们需要在 <code v-pre>examples</code> 目录下创建一个 <code v-pre>upload-file</code> 的空目录，用于存放上传的文件。</p>
<p>通过这个中间件，我们就可以处理上传请求并且可以把上传的文件存储在 <code v-pre>upload-file</code> 目录下。</p>
<p>为了保证代码正常运行，我们还需要在 <code v-pre>examples/webpack.config.js</code> 中添加 <code v-pre>css-loader</code> 和 <code v-pre>css-loader</code>，不要忘记先安装它们。</p>
<p>至此，<code v-pre>ts-axios</code> 支持了上传下载进度事件的回调函数的配置，用户可以通过配置这俩函数实现对下载进度和上传进度的监控。下一节课我们来实现 http 的认证授权功能。</p>
</div></template>


