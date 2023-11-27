<template><div><h1 id="处理请求-url-参数" tabindex="-1"><a class="header-anchor" href="#处理请求-url-参数" aria-hidden="true">#</a> 处理请求 url 参数</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>还记得我们上节课遗留了一个问题，再来看这个例子：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'get'</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/base/get'</span><span class="token punctuation">,</span>
  params<span class="token operator">:</span> <span class="token punctuation">{</span>
    a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    b<span class="token operator">:</span> <span class="token number">2</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们希望最终请求的 <code v-pre>url</code> 是 <code v-pre>/base/get?a=1&amp;b=2</code>，这样服务端就可以通过请求的 url 解析到我们传来的参数数据了。实际上就是把 <code v-pre>params</code> 对象的 key 和 value 拼接到 <code v-pre>url</code> 上。</p>
<p>再来看几个更复杂的例子。</p>
<h3 id="参数值为数组" tabindex="-1"><a class="header-anchor" href="#参数值为数组" aria-hidden="true">#</a> 参数值为数组</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'get'</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/base/get'</span><span class="token punctuation">,</span>
  params<span class="token operator">:</span> <span class="token punctuation">{</span>
    foo<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'bar'</span><span class="token punctuation">,</span> <span class="token string">'baz'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终请求的 <code v-pre>url</code> 是 <code v-pre>/base/get?foo[]=bar&amp;foo[]=baz'</code>。</p>
<h3 id="参数值为对象" tabindex="-1"><a class="header-anchor" href="#参数值为对象" aria-hidden="true">#</a> 参数值为对象</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'get'</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/base/get'</span><span class="token punctuation">,</span>
  params<span class="token operator">:</span> <span class="token punctuation">{</span>
    foo<span class="token operator">:</span> <span class="token punctuation">{</span>
      bar<span class="token operator">:</span> <span class="token string">'baz'</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终请求的 <code v-pre>url</code> 是 <code v-pre>/base/get?foo=%7B%22bar%22:%22baz%22%7D</code>，<code v-pre>foo</code> 后面拼接的是 <code v-pre>{&quot;bar&quot;:&quot;baz&quot;}</code> encode 后的结果。</p>
<h3 id="参数值为-date-类型" tabindex="-1"><a class="header-anchor" href="#参数值为-date-类型" aria-hidden="true">#</a> 参数值为 Date 类型</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> date <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'get'</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/base/get'</span><span class="token punctuation">,</span>
  params<span class="token operator">:</span> <span class="token punctuation">{</span>
    date
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终请求的 <code v-pre>url</code> 是 <code v-pre>/base/get?date=2019-04-01T05:55:39.030Z</code>，<code v-pre>date</code> 后面拼接的是 <code v-pre>date.toISOString()</code> 的结果。</p>
<h3 id="特殊字符支持" tabindex="-1"><a class="header-anchor" href="#特殊字符支持" aria-hidden="true">#</a> 特殊字符支持</h3>
<p>对于字符 <code v-pre>@</code>、<code v-pre>:</code>、<code v-pre>$</code>、<code v-pre>,</code>、<code v-pre> </code>、<code v-pre>[</code>、<code v-pre>]</code>，我们是允许出现在 <code v-pre>url</code> 中的，不希望被 encode。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'get'</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/base/get'</span><span class="token punctuation">,</span>
  params<span class="token operator">:</span> <span class="token punctuation">{</span>
    foo<span class="token operator">:</span> <span class="token string">'@:$, '</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终请求的 <code v-pre>url</code> 是 <code v-pre>/base/get?foo=@:$+</code>，注意，我们会把空格 <code v-pre> </code> 转换成 <code v-pre>+</code>。</p>
<h3 id="空值忽略" tabindex="-1"><a class="header-anchor" href="#空值忽略" aria-hidden="true">#</a> 空值忽略</h3>
<p>对于值为 <code v-pre>null</code> 或者 <code v-pre>undefined</code> 的属性，我们是不会添加到 url 参数中的。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'get'</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/base/get'</span><span class="token punctuation">,</span>
  params<span class="token operator">:</span> <span class="token punctuation">{</span>
    foo<span class="token operator">:</span> <span class="token string">'bar'</span><span class="token punctuation">,</span>
    baz<span class="token operator">:</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终请求的 <code v-pre>url</code> 是 <code v-pre>/base/get?foo=bar</code>。</p>
<h3 id="丢弃-url-中的哈希标记" tabindex="-1"><a class="header-anchor" href="#丢弃-url-中的哈希标记" aria-hidden="true">#</a> 丢弃 url 中的哈希标记</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'get'</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/base/get#hash'</span><span class="token punctuation">,</span>
  params<span class="token operator">:</span> <span class="token punctuation">{</span>
    foo<span class="token operator">:</span> <span class="token string">'bar'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终请求的 <code v-pre>url</code> 是 <code v-pre>/base/get?foo=bar</code></p>
<h3 id="保留-url-中已存在的参数" tabindex="-1"><a class="header-anchor" href="#保留-url-中已存在的参数" aria-hidden="true">#</a> 保留 url 中已存在的参数</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'get'</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/base/get?foo=bar'</span><span class="token punctuation">,</span>
  params<span class="token operator">:</span> <span class="token punctuation">{</span>
    bar<span class="token operator">:</span> <span class="token string">'baz'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终请求的 <code v-pre>url</code> 是 <code v-pre>/base/get?foo=bar&amp;bar=baz</code></p>
<h2 id="buildurl-函数实现" tabindex="-1"><a class="header-anchor" href="#buildurl-函数实现" aria-hidden="true">#</a> buildURL 函数实现</h2>
<p>根据我们之前的需求分析，我们要实现一个工具函数，把 <code v-pre>params</code> 拼接到 <code v-pre>url</code> 上。我们希望把项目中的一些工具函数、辅助方法独立管理，于是我们创建一个 <code v-pre>helpers</code> 目录，在这个目录下创建 <code v-pre>url.ts</code> 文件，未来会把处理 <code v-pre>url</code> 相关的工具函数都放在该文件中。</p>
<p><code v-pre>helpers/url.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> isDate<span class="token punctuation">,</span> isObject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./util'</span>

<span class="token keyword">function</span> <span class="token function">encode</span> <span class="token punctuation">(</span>val<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">encodeURIComponent</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">%40</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'@'</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">%3A</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gi</span></span><span class="token punctuation">,</span> <span class="token string">':'</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">%24</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'$'</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">%2C</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gi</span></span><span class="token punctuation">,</span> <span class="token string">','</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">%20</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'+'</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">%5B</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gi</span></span><span class="token punctuation">,</span> <span class="token string">'['</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">%5D</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gi</span></span><span class="token punctuation">,</span> <span class="token string">']'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">bulidURL</span> <span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> params<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>params<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> url
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> parts<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

  Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> val <span class="token operator">=</span> params<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>val <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token keyword">typeof</span> val <span class="token operator">===</span> <span class="token string">'undefined'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> values<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token builtin">Array</span><span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      values <span class="token operator">=</span> val
      key <span class="token operator">+=</span> <span class="token string">'[]'</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      values <span class="token operator">=</span> <span class="token punctuation">[</span>val<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    values<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDate</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        val <span class="token operator">=</span> val<span class="token punctuation">.</span><span class="token function">toISOString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isObject</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        val <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      parts<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token function">encode</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token function">encode</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">let</span> serializedParams <span class="token operator">=</span> parts<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">'&amp;'</span><span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>serializedParams<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> markIndex <span class="token operator">=</span> url<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'#'</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>markIndex <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      url <span class="token operator">=</span> url<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> markIndex<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    url <span class="token operator">+=</span> <span class="token punctuation">(</span>url<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'?'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">?</span> <span class="token string">'?'</span> <span class="token operator">:</span> <span class="token string">'&amp;'</span><span class="token punctuation">)</span> <span class="token operator">+</span> serializedParams
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> url
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>helpers/util.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> toString <span class="token operator">=</span> Object<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>toString

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">isDate</span> <span class="token punctuation">(</span>val<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> val <span class="token keyword">is</span> Date <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'[object Date]'</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">isObject</span> <span class="token punctuation">(</span>val<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> val <span class="token keyword">is</span> Object <span class="token punctuation">{</span>
  <span class="token keyword">return</span> val <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> val <span class="token operator">===</span> <span class="token string">'object'</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实现-url-参数处理逻辑" tabindex="-1"><a class="header-anchor" href="#实现-url-参数处理逻辑" aria-hidden="true">#</a> 实现 url 参数处理逻辑</h2>
<p>我们已经实现了 <code v-pre>buildURL</code> 函数，接下来我们来利用它实现 <code v-pre>url</code> 参数的处理逻辑。</p>
<p>在 <code v-pre>index.ts</code> 文件中添加如下代码：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">axios</span> <span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token function">processConfig</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
  <span class="token function">xhr</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">processConfig</span> <span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  config<span class="token punctuation">.</span>url <span class="token operator">=</span> <span class="token function">transformUrl</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">transformUrl</span> <span class="token punctuation">(</span>config<span class="token operator">:</span> AxiosRequestConfig<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> url<span class="token punctuation">,</span> params <span class="token punctuation">}</span> <span class="token operator">=</span> config
  <span class="token keyword">return</span> <span class="token function">bulidURL</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> params<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在执行 <code v-pre>xhr</code> 函数前，我们先执行 <code v-pre>processConfig</code> 方法，对 <code v-pre>config</code> 中的数据做处理，除了对 <code v-pre>url</code> 和 <code v-pre>params</code> 处理之外，未来还会处理其它属性。</p>
<p>在 <code v-pre>processConfig</code> 函数内部，我们通过执行 <code v-pre>transformUrl</code> 函数修改了 <code v-pre>config.url</code>，该函数内部调用了 <code v-pre>buildURL</code>。</p>
<p>那么至此，我们对 <code v-pre>url</code> 参数处理逻辑就实现完了，接下来我们就开始编写 demo 了。</p>
<h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<p>在 <code v-pre>examples</code> 目录下创建 <code v-pre>base</code> 目录，在 <code v-pre>base</code> 目录下创建 <code v-pre>index.html</code>:</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>utf-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Base example<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/__build__/base.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着创建 <code v-pre>app.ts</code> 作为入口文件：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">'../../src/index'</span>

<span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'get'</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/base/get'</span><span class="token punctuation">,</span>
  params<span class="token operator">:</span> <span class="token punctuation">{</span>
    foo<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'bar'</span><span class="token punctuation">,</span> <span class="token string">'baz'</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'get'</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/base/get'</span><span class="token punctuation">,</span>
  params<span class="token operator">:</span> <span class="token punctuation">{</span>
    foo<span class="token operator">:</span> <span class="token punctuation">{</span>
      bar<span class="token operator">:</span> <span class="token string">'baz'</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> date <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'get'</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/base/get'</span><span class="token punctuation">,</span>
  params<span class="token operator">:</span> <span class="token punctuation">{</span>
    date
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'get'</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/base/get'</span><span class="token punctuation">,</span>
  params<span class="token operator">:</span> <span class="token punctuation">{</span>
    foo<span class="token operator">:</span> <span class="token string">'@:$, '</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'get'</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/base/get'</span><span class="token punctuation">,</span>
  params<span class="token operator">:</span> <span class="token punctuation">{</span>
    foo<span class="token operator">:</span> <span class="token string">'bar'</span><span class="token punctuation">,</span>
    baz<span class="token operator">:</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'get'</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/base/get#hash'</span><span class="token punctuation">,</span>
  params<span class="token operator">:</span> <span class="token punctuation">{</span>
    foo<span class="token operator">:</span> <span class="token string">'bar'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">axios</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  method<span class="token operator">:</span> <span class="token string">'get'</span><span class="token punctuation">,</span>
  url<span class="token operator">:</span> <span class="token string">'/base/get?foo=bar'</span><span class="token punctuation">,</span>
  params<span class="token operator">:</span> <span class="token punctuation">{</span>
    bar<span class="token operator">:</span> <span class="token string">'baz'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着在 <code v-pre>server.js</code> 添加新的接口路由：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>router<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/base/get'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>query<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在命令行运行 <code v-pre>npm run dev</code>，接着打开 chrome 浏览器，访问 <code v-pre>http://localhost:8080/</code> 即可访问我们的 demo 了，我们点到 <code v-pre>Base</code> 目录下，通过开发者工具的 network 部分我们可以看到成功发送的多条请求，并可以观察它们最终请求的 url，已经如期添加了请求参数。</p>
<p>那么至此我们的请求 <code v-pre>url</code> 参数处理编写完了，下一小节我们会对 <code v-pre>request body</code> 数据做处理。</p>
</div></template>


