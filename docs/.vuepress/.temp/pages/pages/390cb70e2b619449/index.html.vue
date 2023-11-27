<template><div><h1 id="xsrf-防御" tabindex="-1"><a class="header-anchor" href="#xsrf-防御" aria-hidden="true">#</a> XSRF 防御</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>XSRF 又名 <a href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security#Cross-Site_Request_Forgery_(CSRF)" target="_blank" rel="noopener noreferrer">CSRF<ExternalLinkIcon/></a>，跨站请求伪造，它是前端常见的一种攻击方式，我们先通过一张图来认识它的攻击手段。</p>
<p><img src="https://jsd.cdn.zzko.cn/gh/xugaoyi/image_store/blog/20200105110743.png" alt="xsrf" title="xsrf"></p>
<p>CSRF 的防御手段有很多，比如验证请求的 referer，但是 referer 也是可以伪造的，所以杜绝此类攻击的一种方式是服务器端要求每次请求都包含一个 <code v-pre>token</code>，这个 <code v-pre>token</code> 不在前端生成，而是在我们每次访问站点的时候生成，并通过 <code v-pre>set-cookie</code> 的方式种到客户端，然后客户端发送请求的时候，从 <code v-pre>cookie</code> 中对应的字段读取出 <code v-pre>token</code>，然后添加到请求 <code v-pre>headers</code> 中。这样服务端就可以从请求 <code v-pre>headers</code> 中读取这个 <code v-pre>token</code> 并验证，由于这个 <code v-pre>token</code> 是很难伪造的，所以就能区分这个请求是否是用户正常发起的。</p>
<p>对于我们的 <code v-pre>ts-axios</code> 库，我们要自动把这几件事做了，每次发送请求的时候，从 <code v-pre>cookie</code> 中读取对应的 <code v-pre>token</code> 值，然后添加到请求 <code v-pre>headers</code>中。我们允许用户配置 <code v-pre>xsrfCookieName</code> 和 <code v-pre>xsrfHeaderName</code>，其中 <code v-pre>xsrfCookieName</code> 表示存储 <code v-pre>token</code> 的 <code v-pre>cookie</code> 名称，<code v-pre>xsrfHeaderName</code> 表示请求 <code v-pre>headers</code> 中 <code v-pre>token</code> 对应的 <code v-pre>header</code> 名称。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/more/get'</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
  xsrfCookieName<span class="token operator">:</span> <span class="token string">'XSRF-TOKEN'</span><span class="token punctuation">,</span> <span class="token comment">// default</span>
  xsrfHeaderName<span class="token operator">:</span> <span class="token string">'X-XSRF-TOKEN'</span> <span class="token comment">// default</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>res <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们提供 <code v-pre>xsrfCookieName</code> 和 <code v-pre>xsrfHeaderName</code> 的默认值，当然用户也可以根据自己的需求在请求中去配置 <code v-pre>xsrfCookieName</code> 和 <code v-pre>xsrfHeaderName</code>。</p>
<h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2>
<p>先修改 <code v-pre>AxiosRequestConfig</code> 的类型定义。</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">AxiosRequestConfig</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  xsrfCookieName<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span>
  xsrfHeaderName<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后修改默认配置。</p>
<p><code v-pre>defaults.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> defaults<span class="token operator">:</span> AxiosRequestConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  xsrfCookieName<span class="token operator">:</span> <span class="token string">'XSRF-TOKEN'</span><span class="token punctuation">,</span>

  xsrfHeaderName<span class="token operator">:</span> <span class="token string">'X-XSRF-TOKEN'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来我们要做三件事：</p>
<ul>
<li>
<p>首先判断如果是配置 <code v-pre>withCredentials</code> 为 <code v-pre>true</code> 或者是同域请求，我们才会请求 <code v-pre>headers</code> 添加 <code v-pre>xsrf</code> 相关的字段。</p>
</li>
<li>
<p>如果判断成功，尝试从 cookie 中读取 <code v-pre>xsrf</code> 的 <code v-pre>token</code> 值。</p>
</li>
<li>
<p>如果能读到，则把它添加到请求 <code v-pre>headers</code> 的 <code v-pre>xsrf</code> 相关字段中。</p>
</li>
</ul>
<p>我们先来实现同域请求的判断。</p>
<p><code v-pre>helpers/url.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">URLOrigin</span> <span class="token punctuation">{</span>
  protocol<span class="token operator">:</span> <span class="token builtin">string</span>
  host<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>


<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">isURLSameOrigin</span><span class="token punctuation">(</span>requestURL<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> parsedOrigin <span class="token operator">=</span> <span class="token function">resolveURL</span><span class="token punctuation">(</span>requestURL<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    parsedOrigin<span class="token punctuation">.</span>protocol <span class="token operator">===</span> currentOrigin<span class="token punctuation">.</span>protocol <span class="token operator">&amp;&amp;</span> parsedOrigin<span class="token punctuation">.</span>host <span class="token operator">===</span> currentOrigin<span class="token punctuation">.</span>host
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> urlParsingNode <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> currentOrigin <span class="token operator">=</span> <span class="token function">resolveURL</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>href<span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">resolveURL</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> URLOrigin <span class="token punctuation">{</span>
  urlParsingNode<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'href'</span><span class="token punctuation">,</span> url<span class="token punctuation">)</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> protocol<span class="token punctuation">,</span> host <span class="token punctuation">}</span> <span class="token operator">=</span> urlParsingNode

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    protocol<span class="token punctuation">,</span>
    host
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同域名的判断主要利用了一个技巧，创建一个 a 标签的 DOM，然后设置 <code v-pre>href</code> 属性为我们传入的 <code v-pre>url</code>，然后可以获取该 DOM 的 <code v-pre>protocol</code>、<code v-pre>host</code>。当前页面的 <code v-pre>url</code> 和请求的 <code v-pre>url</code> 都通过这种方式获取，然后对比它们的 <code v-pre>protocol</code> 和 <code v-pre>host</code> 是否相同即可。</p>
<p>接着实现 cookie 的读取。</p>
<p><code v-pre>helpers/cookie.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> cookie <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">read</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> match <span class="token operator">=</span> document<span class="token punctuation">.</span>cookie<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token string">'(^|;\\s*)('</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">')=([^;]*)'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> match <span class="token operator">?</span> <span class="token function">decodeURIComponent</span><span class="token punctuation">(</span>match<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> cookie
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>cookie</code> 的读取逻辑很简单，利用了正则表达式可以解析到 <code v-pre>name</code> 对应的值。</p>
<p>最后实现完整的逻辑。</p>
<p><code v-pre>core/xhr.ts</code>：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span>
  <span class="token comment">/*...*/</span>
  xsrfCookieName<span class="token punctuation">,</span>
  xsrfHeaderName
<span class="token punctuation">}</span> <span class="token operator">=</span> config

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>withCredentials <span class="token operator">||</span> <span class="token function">isURLSameOrigin</span><span class="token punctuation">(</span>url<span class="token operator">!</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> xsrfCookieName<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">const</span> xsrfValue <span class="token operator">=</span> cookie<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>xsrfCookieName<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>xsrfValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    headers<span class="token punctuation">[</span>xsrfHeaderName<span class="token operator">!</span><span class="token punctuation">]</span> <span class="token operator">=</span> xsrfValue
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  xsrfCookieName<span class="token operator">:</span> <span class="token string">'XSRF-TOKEN-D'</span><span class="token punctuation">,</span>
  xsrfHeaderName<span class="token operator">:</span> <span class="token string">'X-XSRF-TOKEN-D'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

instance<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/more/get'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>res <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>examples/server.js</code>：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">setHeaders</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">cookie</span><span class="token punctuation">(</span><span class="token string">'XSRF-TOKEN-D'</span><span class="token punctuation">,</span> <span class="token string">'1234abc'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在访问页面的时候，服务端通过 <code v-pre>set-cookie</code> 往客户端种了 <code v-pre>key</code> 为 <code v-pre>XSRF-TOKEN</code>，值为 <code v-pre>1234abc</code> 的 <code v-pre>cookie</code>，作为 <code v-pre>xsrf</code> 的 <code v-pre>token</code> 值。</p>
<p>然后我们在前端发送请求的时候，就能从 cookie 中读出 <code v-pre>key</code> 为 <code v-pre>XSRF-TOKEN</code> 的值，然后把它添加到 <code v-pre>key</code> 为 <code v-pre>X-XSRF-TOKEN</code> 的请求 <code v-pre>headers</code> 中。</p>
<p>至此，我们实现了 XSRF 的自动防御的能力，下节课我们来实现 ts-axios 对上传和下载请求的支持。</p>
</div></template>


