<template><div><h1 id="拦截器模块单元测试" tabindex="-1"><a class="header-anchor" href="#拦截器模块单元测试" aria-hidden="true">#</a> 拦截器模块单元测试</h1>
<p>拦截器是 <code v-pre>ts-axios</code> 库一个非常实用的功能，接下来我们来编写它的测试代码。</p>
<h2 id="测试代码编写" tabindex="-1"><a class="header-anchor" href="#测试代码编写" aria-hidden="true">#</a> 测试代码编写</h2>
<p><code v-pre>test/interceptor.spec.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> axios<span class="token punctuation">,</span> <span class="token punctuation">{</span> AxiosRequestConfig<span class="token punctuation">,</span> AxiosResponse <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../src/index'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> getAjaxRequest <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./helper'</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'interceptors'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    jasmine<span class="token punctuation">.</span>Ajax<span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">afterEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    jasmine<span class="token punctuation">.</span>Ajax<span class="token punctuation">.</span><span class="token function">uninstall</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should add a request interceptor'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      config<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>test <span class="token operator">=</span> <span class="token string">'added by interceptor'</span>
      <span class="token keyword">return</span> config
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">instance</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>requestHeaders<span class="token punctuation">.</span>test<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'added by interceptor'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should add a request interceptor that returns a new config object'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        url<span class="token operator">:</span> <span class="token string">'/bar'</span><span class="token punctuation">,</span>
        method<span class="token operator">:</span> <span class="token string">'post'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">instance</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>method<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'POST'</span><span class="token punctuation">)</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'/bar'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should add a request interceptor that returns a promise'</span><span class="token punctuation">,</span> done <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span>resolve <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          config<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>async <span class="token operator">=</span> <span class="token string">'promise'</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">instance</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span>

    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>requestHeaders<span class="token punctuation">.</span>async<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'promise'</span><span class="token punctuation">)</span>
        <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should add multiple request interceptors'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>config <span class="token operator">=></span> <span class="token punctuation">{</span>
      config<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>test1 <span class="token operator">=</span> <span class="token string">'1'</span>
      <span class="token keyword">return</span> config
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>config <span class="token operator">=></span> <span class="token punctuation">{</span>
      config<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>test2 <span class="token operator">=</span> <span class="token string">'2'</span>
      <span class="token keyword">return</span> config
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>config <span class="token operator">=></span> <span class="token punctuation">{</span>
      config<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>test3 <span class="token operator">=</span> <span class="token string">'3'</span>
      <span class="token keyword">return</span> config
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">instance</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>requestHeaders<span class="token punctuation">.</span>test1<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>requestHeaders<span class="token punctuation">.</span>test2<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'2'</span><span class="token punctuation">)</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>requestHeaders<span class="token punctuation">.</span>test3<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'3'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should add a response interceptor'</span><span class="token punctuation">,</span> done <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> response<span class="token operator">:</span> AxiosResponse
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token punctuation">{</span>
      data<span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">.</span>data <span class="token operator">+</span> <span class="token string">' - modified by interceptor'</span>
      <span class="token keyword">return</span> data
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">instance</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token punctuation">{</span>
      response <span class="token operator">=</span> data
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      request<span class="token punctuation">.</span><span class="token function">respondWith</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        status<span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
        responseText<span class="token operator">:</span> <span class="token string">'OK'</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'OK - modified by interceptor'</span><span class="token punctuation">)</span>
        <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should add a response interceptor that returns a new data object'</span><span class="token punctuation">,</span> done <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> response<span class="token operator">:</span> AxiosResponse
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        data<span class="token operator">:</span> <span class="token string">'stuff'</span><span class="token punctuation">,</span>
        headers<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        status<span class="token operator">:</span> <span class="token number">500</span><span class="token punctuation">,</span>
        statusText<span class="token operator">:</span> <span class="token string">'ERR'</span><span class="token punctuation">,</span>
        request<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        config<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">instance</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>res <span class="token operator">=></span> <span class="token punctuation">{</span>
      response <span class="token operator">=</span> res
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      request<span class="token punctuation">.</span><span class="token function">respondWith</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        status<span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
        responseText<span class="token operator">:</span> <span class="token string">'OK'</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'stuff'</span><span class="token punctuation">)</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>headers<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>status<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>statusText<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'ERR'</span><span class="token punctuation">)</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>request<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>config<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should add a response interceptor that returns a promise'</span><span class="token punctuation">,</span> done <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> response<span class="token operator">:</span> AxiosResponse
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span>resolve <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// do something async</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          data<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token string">'you have been promised!'</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">instance</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>res <span class="token operator">=></span> <span class="token punctuation">{</span>
      response <span class="token operator">=</span> res
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      request<span class="token punctuation">.</span><span class="token function">respondWith</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        status<span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
        responseText<span class="token operator">:</span> <span class="token string">'OK'</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'you have been promised!'</span><span class="token punctuation">)</span>
        <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should add multiple response interceptors'</span><span class="token punctuation">,</span> done <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> response<span class="token operator">:</span> AxiosResponse
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token punctuation">{</span>
      data<span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">.</span>data <span class="token operator">+</span> <span class="token string">'1'</span>
      <span class="token keyword">return</span> data
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token punctuation">{</span>
      data<span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">.</span>data <span class="token operator">+</span> <span class="token string">'2'</span>
      <span class="token keyword">return</span> data
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token punctuation">{</span>
      data<span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">.</span>data <span class="token operator">+</span> <span class="token string">'3'</span>
      <span class="token keyword">return</span> data
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">instance</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token punctuation">{</span>
      response <span class="token operator">=</span> data
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      request<span class="token punctuation">.</span><span class="token function">respondWith</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        status<span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
        responseText<span class="token operator">:</span> <span class="token string">'OK'</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'OK123'</span><span class="token punctuation">)</span>
        <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'should allow removing interceptors'</span><span class="token punctuation">,</span> done <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> response<span class="token operator">:</span> AxiosResponse
    <span class="token keyword">let</span> intercept
    <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token punctuation">{</span>
      data<span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">.</span>data <span class="token operator">+</span> <span class="token string">'1'</span>
      <span class="token keyword">return</span> data
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    intercept <span class="token operator">=</span> instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token punctuation">{</span>
      data<span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">.</span>data <span class="token operator">+</span> <span class="token string">'2'</span>
      <span class="token keyword">return</span> data
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token punctuation">{</span>
      data<span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">.</span>data <span class="token operator">+</span> <span class="token string">'3'</span>
      <span class="token keyword">return</span> data
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">eject</span><span class="token punctuation">(</span>intercept<span class="token punctuation">)</span>
    instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">eject</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>

    <span class="token function">instance</span><span class="token punctuation">(</span><span class="token string">'/foo'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token punctuation">{</span>
      response <span class="token operator">=</span> data
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">getAjaxRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>request <span class="token operator">=></span> <span class="token punctuation">{</span>
      request<span class="token punctuation">.</span><span class="token function">respondWith</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        status<span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
        responseText<span class="token operator">:</span> <span class="token string">'OK'</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">'OK13'</span><span class="token punctuation">)</span>
        <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行测试后我们发现在测试用例 <code v-pre>should add a request interceptor that returns a new config object</code> 报错了，是代码运行的报错，而不是测试期望结果的报错，顺着报错信息，我们可以找到报错原因。</p>
<p>在 <code v-pre>core/xhr.ts</code> 中，执行到 <code v-pre>processHeaders</code> 中的 <code v-pre>Object.keys(headers).forEach</code> 代码报错，因为我们在拦截器对请求配置做了修改，导致 <code v-pre>headers</code> 为空，所以报错。</p>
<p>于是我们在解构赋值 <code v-pre>headers</code> 的时候，给它添加默认值即可。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  headers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token operator">=</span> config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次运行测试，发现全部测试通过。</p>
<p>至此，我们完成了 <code v-pre>ts-axios</code> 库对拦截器模块的单元测试，下节课我们来测试 <code v-pre>mergeConfig</code> 模块的业务逻辑。</p>
</div></template>


