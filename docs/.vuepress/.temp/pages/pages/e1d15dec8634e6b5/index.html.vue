<template><div><h1 id="请求模块单元测试" tabindex="-1"><a class="header-anchor" href="#请求模块单元测试" aria-hidden="true">#</a> 请求模块单元测试</h1>
<p>请求模块是 axios 最基础的模块，通过一个 axios 方法发送 Ajax 请求。</p>
<h2 id="jasmine-ajax" tabindex="-1"><a class="header-anchor" href="#jasmine-ajax" aria-hidden="true">#</a> jasmine-ajax</h2>
<p><a href="https://jasmine.github.io/pages/getting_started.html" target="_blank" rel="noopener noreferrer">Jasmine<ExternalLinkIcon/></a> 是一个 BDD(行为驱动开发)的测试框架，它有很多成熟的插件，比如我们要用到的 <a href="https://github.com/jasmine/jasmine-ajax" target="_blank" rel="noopener noreferrer"><code v-pre>jasmine-ajax</code><ExternalLinkIcon/></a>，它会为我们发出的 Ajax 请求根据规范定义一组假的响应，并跟踪我们发出的Ajax请求，可以让我们方便的为结果做断言。</p>
<p>其实 Jest 也可以去写插件，但并没有现成的 Ajax 相关的 Jest 插件，但是 Jest 测试中我们仍然可以使用 Jasmine 相关的插件，只需要做一些小小的配置即可。</p>
<p>当然，未来我也会考虑去编写一个 Ajax 相关的 Jest 插件，目前我们仍然使用 <code v-pre>jasmine-ajax</code> 去配合我们编写测试。</p>
<p><code v-pre>jasmine-ajax</code> 依赖 <code v-pre>jasmine-core</code>，因此首先我们要安装几个依赖包，<code v-pre>jasmine-ajax</code>、<code v-pre>jasmine-core</code> 和 <code v-pre>@types/jasmine-ajax</code>。</p>
<p>这个时候我们需要去修改 <code v-pre>test/boot.ts</code> 文件，因为每次跑具体测试代码之前会先运行该文件，我们可以在这里去初始化 <code v-pre>jasmine-ajax</code>。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> JasmineCore <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">'jasmine-core'</span><span class="token punctuation">)</span>
<span class="token comment">// @ts-ignore</span>
global<span class="token punctuation">.</span><span class="token function-variable function">getJasmineRequireObj</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> JasmineCore
<span class="token punctuation">}</span>
<span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">'jasmine-ajax'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里为了让 <code v-pre>jasmine-ajax</code> 插件运行成功，我们需要手动添加全局的 <code v-pre>getJasmineRequireObj</code> 方法，参考 <a href="https://github.com/jasmine/jasmine-ajax/issues/178" target="_blank" rel="noopener noreferrer">issue<ExternalLinkIcon/></a>。</p>
<p>接下来，我们就开始编写请求模块的单元测试。</p>
<h2 id="测试代码编写" tabindex="-1"><a class="header-anchor" href="#测试代码编写" aria-hidden="true">#</a> 测试代码编写</h2>
<p><code v-pre>test/requests.spec.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> axios<span class="token punctuation">,</span> <span class="token punctuation">{</span> AxiosResponse<span class="token punctuation">,</span> AxiosError <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../src/index'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> getAjaxRequest <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./helper'</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'requests'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    jasmine<span class="token punctuation">.</span>Ajax<span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">afterEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    jasmine<span class="token punctuation">.</span>Ajax<span class="token punctuation">.</span><span class="token function">uninstall</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should treat single string arg as url'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">axios</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>method<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'GET'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should treat method value as lowercase string'</span><span class="token punctuation">,</span> done <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      url<span class="token operator">:</span> <span class="token string">'/foo'</span><span class="token punctuation">,</span>
      method<span class="token operator">:</span> <span class="token string">'POST'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>response <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>config<span class="token punctuation">.</span>method<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'post'</span><span class="token punctuation">)</span>
      <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      request<span class="token punctuation">.</span><span class="token function">respondWith</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        status<span class="token operator">:</span> <span class="token number">200</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should reject on network errors'</span><span class="token punctuation">,</span> done <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> resolveSpy <span class="token operator">=</span> jest<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token operator">:</span> AxiosResponse<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> res
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> rejectSpy <span class="token operator">=</span> jest<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token operator">:</span> AxiosError<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> e
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    jasmine<span class="token punctuation">.</span>Ajax<span class="token punctuation">.</span><span class="token function">uninstall</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token function">axios</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolveSpy<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span>rejectSpy<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>next<span class="token punctuation">)</span>

    <span class="token keyword">function</span> <span class="token function">next</span><span class="token punctuation">(</span>reason<span class="token operator">:</span> AxiosResponse <span class="token operator">|</span> AxiosError<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>resolveSpy<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toHaveBeenCalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>rejectSpy<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>reason <span class="token keyword">instanceof</span> <span class="token class-name">Error</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeTruthy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span>reason <span class="token keyword">as</span> AxiosError<span class="token punctuation">)</span><span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'Network Error'</span><span class="token punctuation">)</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>reason<span class="token punctuation">.</span>request<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span>expect<span class="token punctuation">.</span><span class="token function">any</span><span class="token punctuation">(</span>XMLHttpRequest<span class="token punctuation">)</span><span class="token punctuation">)</span>

      jasmine<span class="token punctuation">.</span>Ajax<span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

      <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should reject when request timeout'</span><span class="token punctuation">,</span> done <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> err<span class="token operator">:</span> AxiosError

    <span class="token function">axios</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      timeout<span class="token operator">:</span> <span class="token number">2000</span><span class="token punctuation">,</span>
      method<span class="token operator">:</span> <span class="token string">'post'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span>error <span class="token operator">=></span> <span class="token punctuation">{</span>
      err <span class="token operator">=</span> error
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// @ts-ignore</span>
      request<span class="token punctuation">.</span>eventBus<span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token string">'timeout'</span><span class="token punctuation">)</span>

      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>err <span class="token keyword">instanceof</span> <span class="token class-name">Error</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeTruthy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'Timeout of 2000 ms exceeded'</span><span class="token punctuation">)</span>
        <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should reject when validateStatus returns false'</span><span class="token punctuation">,</span> done <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> resolveSpy <span class="token operator">=</span> jest<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token operator">:</span> AxiosResponse<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> res
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> rejectSpy <span class="token operator">=</span> jest<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token operator">:</span> AxiosError<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> e
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">axios</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token function">validateStatus</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> status <span class="token operator">!==</span> <span class="token number">500</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolveSpy<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span>rejectSpy<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>next<span class="token punctuation">)</span>

    <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      request<span class="token punctuation">.</span><span class="token function">respondWith</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        status<span class="token operator">:</span> <span class="token number">500</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">function</span> <span class="token function">next</span><span class="token punctuation">(</span>reason<span class="token operator">:</span> AxiosError <span class="token operator">|</span> AxiosResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>resolveSpy<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toHaveBeenCalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>rejectSpy<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>reason <span class="token keyword">instanceof</span> <span class="token class-name">Error</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeTruthy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span>reason <span class="token keyword">as</span> AxiosError<span class="token punctuation">)</span><span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'Request failed with status code 500'</span><span class="token punctuation">)</span>
      <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span>reason <span class="token keyword">as</span> AxiosError<span class="token punctuation">)</span><span class="token punctuation">.</span>response<span class="token operator">!</span><span class="token punctuation">.</span>status<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span>

      <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should resolve when validateStatus returns true'</span><span class="token punctuation">,</span> done <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> resolveSpy <span class="token operator">=</span> jest<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token operator">:</span> AxiosResponse<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> res
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> rejectSpy <span class="token operator">=</span> jest<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token operator">:</span> AxiosError<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> e
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">axios</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token function">validateStatus</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> status <span class="token operator">===</span> <span class="token number">500</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolveSpy<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span>rejectSpy<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>next<span class="token punctuation">)</span>

    <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      request<span class="token punctuation">.</span><span class="token function">respondWith</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        status<span class="token operator">:</span> <span class="token number">500</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">function</span> <span class="token function">next</span><span class="token punctuation">(</span>res<span class="token operator">:</span> AxiosResponse <span class="token operator">|</span> AxiosError<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>resolveSpy<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>rejectSpy<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toHaveBeenCalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>config<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span>

      <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should return JSON when resolved'</span><span class="token punctuation">,</span> done <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> response<span class="token operator">:</span> AxiosResponse

    <span class="token function">axios</span><span class="token punctuation">(</span><span class="token string">'/api/account/signup'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      auth<span class="token operator">:</span> <span class="token punctuation">{</span>
        username<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
        password<span class="token operator">:</span> <span class="token string">''</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      method<span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
      headers<span class="token operator">:</span> <span class="token punctuation">{</span>
        Accept<span class="token operator">:</span> <span class="token string">'application/json'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>res <span class="token operator">=></span> <span class="token punctuation">{</span>
      response <span class="token operator">=</span> res
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      request<span class="token punctuation">.</span><span class="token function">respondWith</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        status<span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
        statusText<span class="token operator">:</span> <span class="token string">'OK'</span><span class="token punctuation">,</span>
        responseText<span class="token operator">:</span> <span class="token string">'{"a": 1}'</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span> a<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should return JSON when rejecting'</span><span class="token punctuation">,</span> done <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> response<span class="token operator">:</span> AxiosResponse

    <span class="token function">axios</span><span class="token punctuation">(</span><span class="token string">'/api/account/signup'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      auth<span class="token operator">:</span> <span class="token punctuation">{</span>
        username<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
        password<span class="token operator">:</span> <span class="token string">''</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      method<span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span>
      headers<span class="token operator">:</span> <span class="token punctuation">{</span>
        Accept<span class="token operator">:</span> <span class="token string">'application/json'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span>error <span class="token operator">=></span> <span class="token punctuation">{</span>
      response <span class="token operator">=</span> error<span class="token punctuation">.</span>response
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      request<span class="token punctuation">.</span><span class="token function">respondWith</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        status<span class="token operator">:</span> <span class="token number">400</span><span class="token punctuation">,</span>
        statusText<span class="token operator">:</span> <span class="token string">'Bad Request'</span><span class="token punctuation">,</span>
        responseText<span class="token operator">:</span> <span class="token string">'{"error": "BAD USERNAME", "code": 1}'</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">expect</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> response<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'object'</span><span class="token punctuation">)</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>data<span class="token punctuation">.</span>error<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'BAD USERNAME'</span><span class="token punctuation">)</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>data<span class="token punctuation">.</span>code<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should supply correct response'</span><span class="token punctuation">,</span> done <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> response<span class="token operator">:</span> AxiosResponse

    axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>res <span class="token operator">=></span> <span class="token punctuation">{</span>
      response <span class="token operator">=</span> res
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      request<span class="token punctuation">.</span><span class="token function">respondWith</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        status<span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
        statusText<span class="token operator">:</span> <span class="token string">'OK'</span><span class="token punctuation">,</span>
        responseText<span class="token operator">:</span> <span class="token string">'{"foo": "bar"}'</span><span class="token punctuation">,</span>
        responseHeaders<span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token string-property property">'Content-Type'</span><span class="token operator">:</span> <span class="token string">'application/json'</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>data<span class="token punctuation">.</span>foo<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'bar'</span><span class="token punctuation">)</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>status<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>statusText<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'OK'</span><span class="token punctuation">)</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>headers<span class="token punctuation">[</span><span class="token string">'content-type'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'application/json'</span><span class="token punctuation">)</span>
        <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should allow overriding Content-Type header case-insensitive'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> response<span class="token operator">:</span> AxiosResponse

    axios
      <span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span>
        <span class="token string">'/foo'</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> prop<span class="token operator">:</span> <span class="token string">'value'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          headers<span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token string-property property">'content-type'</span><span class="token operator">:</span> <span class="token string">'application/json'</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>res <span class="token operator">=></span> <span class="token punctuation">{</span>
        response <span class="token operator">=</span> res
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>requestHeaders<span class="token punctuation">[</span><span class="token string">'Content-Type'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'application/json'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们要注意的一些点，在这里列出：</p>
<ul>
<li>beforeEach &amp; afterEach</li>
</ul>
<p><a href="https://jestjs.io/docs/en/api#beforeeachfn-timeout" target="_blank" rel="noopener noreferrer">beforeEach<ExternalLinkIcon/></a>表示每个测试用例运行前的钩子函数，在这里我们执行 <code v-pre>jasmine.Ajax.install()</code> 安装 <code v-pre>jasmine.Ajax</code>。</p>
<p><a href="https://jestjs.io/docs/en/api#aftereachfn-timeout" target="_blank" rel="noopener noreferrer">afterEach<ExternalLinkIcon/></a>表示每个测试用例运行后的钩子函数，在这里我们执行 <code v-pre>jasmine.Ajax.uninstall()</code> 卸载 <code v-pre>jasmine.Ajax</code>。</p>
<ul>
<li><code v-pre>getAjaxRequest</code></li>
</ul>
<p><code v-pre>getAjaxRequest</code> 是我们在 <code v-pre>test/helper.ts</code> 定义的一个辅助方法，通过 <code v-pre>jasmine.Ajax.requests.mostRecent()</code> 拿到最近一次请求的 <code v-pre>request</code> 对象，这个 <code v-pre>request</code> 对象是 <code v-pre>jasmine-ajax</code> 库伪造的 <code v-pre>xhr</code> 对象，它模拟了 <code v-pre>xhr</code> 对象上的方法，并且提供一些 <code v-pre>api</code> 让我们使用，比如 <code v-pre>request.respondWith</code> 方法返回一个响应。</p>
<ul>
<li>异步测试</li>
</ul>
<p>注意到我们这里大部分的测试用例不再是同步的代码了，几乎都是一些异步逻辑，Jest 非常好地支持<a href="https://jestjs.io/docs/en/asynchronous" target="_blank" rel="noopener noreferrer">异步测试代码<ExternalLinkIcon/></a>。通常有 2 种解决方案。</p>
<p>第一种是利用 <code v-pre>done</code> 参数，每个测试用例函数有一个 <code v-pre>done</code> 参数，一旦我们使用了该参数，只有当 <code v-pre>done</code> 函数执行的时候表示这个测试用例结束。</p>
<p>第二种是我们的测试函数返回一个 Promise 对象，一旦这个 Promise 对象 <code v-pre>resolve</code> 了，表示这个测试结束。</p>
<ul>
<li>expect.any(constructor)</li>
</ul>
<p>它表示匹配任意由 <code v-pre>constructor</code> 创建的对象实例。</p>
<ul>
<li><code v-pre>request.eventBus.trigger</code></li>
</ul>
<p>由于 <code v-pre>request.responseTimeout</code> 方法内部依赖了 <code v-pre>jasmine.clock</code> 方法会导致运行失败，这里我直接用了 <code v-pre>request.eventBus.trigger('timeout')</code> 方法触发了 <code v-pre>timeout</code> 事件。因为这个方法不在接口定义中，所以需要加 <code v-pre>// @ts-ignore</code>。</p>
<p>另外，我们在测试中发现 2 个 case 没有通过。</p>
<p>第一个是 <code v-pre>should treat method value as lowercase string</code>，这个测试用例是我们发送请求的 <code v-pre> method</code> 需要转换成小写字符串，这么做的目的也是为了之后 <code v-pre>flattenHeaders</code> 能正常处理这些 <code v-pre>method</code>，所以我们需要修改源码逻辑。</p>
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

    config <span class="token operator">=</span> <span class="token function">mergeConfig</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>defaults<span class="token punctuation">,</span> config<span class="token punctuation">)</span>
    config<span class="token punctuation">.</span>method <span class="token operator">=</span> config<span class="token punctuation">.</span>method<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在合并配置后，我们需要把 <code v-pre>config.method</code> 转成小写字符串。</p>
<p>另一个是 <code v-pre>should return JSON when rejecting</code>，这个测试用例是当我们发送请求失败后，也能把响应数据转换成 JSON 格式，所以也需要修改源码逻辑。</p>
<p><code v-pre>core/dispatchRequest.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">dispatchRequest</span><span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> AxiosPromise <span class="token punctuation">{</span>
  <span class="token function">throwIfCancellationRequested</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
  <span class="token function">processConfig</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token function">xhr</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
    res <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">transformResponseData</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    e <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">&amp;&amp;</span> e<span class="token punctuation">.</span>response<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span>response <span class="token operator">=</span> <span class="token function">transformResponseData</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>response<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token builtin">Promise</span><span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了对正常情况的响应数据做转换，我们也需要对异常情况的响应数据做转换。</p>
<p>至此我们完成了 <code v-pre>ts-axios</code> 库对请求模块的测试，下一节课我们会从业务的角度来测试 <code v-pre>headers</code> 模块。</p>
</div></template>


