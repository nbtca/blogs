<template><div><h1 id="axios-实例模块单元测试" tabindex="-1"><a class="header-anchor" href="#axios-实例模块单元测试" aria-hidden="true">#</a> Axios 实例模块单元测试</h1>
<p><code v-pre>ts-axios</code> 提供了 <code v-pre>axios.create</code> 静态方法，返回一个 <code v-pre>instance</code> 实例，我们需要对这个模块做测试。</p>
<h2 id="测试代码编写" tabindex="-1"><a class="header-anchor" href="#测试代码编写" aria-hidden="true">#</a> 测试代码编写</h2>
<p><code v-pre>test/instance.spec.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> axios<span class="token punctuation">,</span> <span class="token punctuation">{</span> AxiosRequestConfig<span class="token punctuation">,</span> AxiosResponse <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../src/index'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> getAjaxRequest <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./helper'</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'instance'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    jasmine<span class="token punctuation">.</span>Ajax<span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">afterEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    jasmine<span class="token punctuation">.</span>Ajax<span class="token punctuation">.</span><span class="token function">uninstall</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should make a http request without verb helper'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token function">instance</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should make a http request'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>method<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'GET'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should make a post request'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>method<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'POST'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should make a put request'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>method<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'PUT'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should make a patch request'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span><span class="token function">patch</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>method<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'PATCH'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should make a options request'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span><span class="token function">options</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>method<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'OPTIONS'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should make a delete request'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>method<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'DELETE'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should make a head request'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span><span class="token function">head</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>method<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'HEAD'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should use instance options'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span> timeout<span class="token operator">:</span> <span class="token number">1000</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>timeout<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should have defaults.headers'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span> baseURL<span class="token operator">:</span> <span class="token string">'https://api.example.com'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">expect</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> instance<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>headers<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'object'</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> instance<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>common<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'object'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should have interceptors on the instance'</span><span class="token punctuation">,</span> done <span class="token operator">=></span> <span class="token punctuation">{</span>
    axios<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>config <span class="token operator">=></span> <span class="token punctuation">{</span>
      config<span class="token punctuation">.</span>timeout <span class="token operator">=</span> <span class="token number">2000</span>
      <span class="token keyword">return</span> config
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>config <span class="token operator">=></span> <span class="token punctuation">{</span>
      config<span class="token punctuation">.</span>withCredentials <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token keyword">return</span> config
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">let</span> response<span class="token operator">:</span> AxiosResponse
    instance<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>res <span class="token operator">=></span> <span class="token punctuation">{</span>
      response <span class="token operator">=</span> res
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      request<span class="token punctuation">.</span><span class="token function">respondWith</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        status<span class="token operator">:</span> <span class="token number">200</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>config<span class="token punctuation">.</span>timeout<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>config<span class="token punctuation">.</span>withCredentials<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
        <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should get the computed uri'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> fakeConfig<span class="token operator">:</span> AxiosRequestConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
      baseURL<span class="token operator">:</span> <span class="token string">'https://www.baidu.com/'</span><span class="token punctuation">,</span>
      url<span class="token operator">:</span> <span class="token string">'/user/12345'</span><span class="token punctuation">,</span>
      params<span class="token operator">:</span> <span class="token punctuation">{</span>
        idClient<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        idTest<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
        testString<span class="token operator">:</span> <span class="token string">'thisIsATest'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>axios<span class="token punctuation">.</span><span class="token function">getUri</span><span class="token punctuation">(</span>fakeConfig<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span>
      <span class="token string">'https://www.baidu.com/user/12345?idClient=1&amp;idTest=2&amp;testString=thisIsATest'</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此我们完成了 <code v-pre>ts-axios</code> 库 <code v-pre>Axios</code> 实例模块相关业务逻辑的测试，下一节课我们会对拦截器模块做测试。</p>
</div></template>


