<template><div><h1 id="js获取和修改url参数" tabindex="-1"><a class="header-anchor" href="#js获取和修改url参数" aria-hidden="true">#</a> JS获取和修改url参数</h1>
<h2 id="获取url参数" tabindex="-1"><a class="header-anchor" href="#获取url参数" aria-hidden="true">#</a> 获取url参数</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 获取url里的参数
 * <span class="token keyword">@param</span> <span class="token parameter">arg</span> 参数名
 * <span class="token keyword">@returns</span>
 */</span>
<span class="token keyword">function</span> <span class="token function">getURLString</span><span class="token punctuation">(</span><span class="token parameter">arg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> reg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token string">"(^|&amp;)"</span> <span class="token operator">+</span> arg <span class="token operator">+</span> <span class="token string">"=([^&amp;]*)(&amp;|$)"</span><span class="token punctuation">,</span> <span class="token string">"i"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> r <span class="token operator">=</span> window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>search<span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>r <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token function">unescape</span><span class="token punctuation">(</span>r<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改url参数" tabindex="-1"><a class="header-anchor" href="#修改url参数" aria-hidden="true">#</a> 修改url参数</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * url地址修改
 * <span class="token keyword">@param</span> <span class="token parameter">url</span> 待修改url
 * <span class="token keyword">@param</span> <span class="token parameter">arg</span> 修改的参数名
 * <span class="token keyword">@param</span> <span class="token parameter">arg_val</span> 修改的具体值
 * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>String<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">function</span> <span class="token function">changeURLArg</span><span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span> arg<span class="token punctuation">,</span> arg_val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> pattern <span class="token operator">=</span> arg <span class="token operator">+</span> <span class="token string">'=([^&amp;]*)'</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> replaceText <span class="token operator">=</span> arg <span class="token operator">+</span> <span class="token string">'='</span> <span class="token operator">+</span> arg_val<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>url<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>pattern<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> tmp <span class="token operator">=</span> <span class="token string">'/('</span> <span class="token operator">+</span> arg <span class="token operator">+</span> <span class="token string">'=)([^&amp;]*)/gi'</span><span class="token punctuation">;</span>
        tmp <span class="token operator">=</span> url<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token function">eval</span><span class="token punctuation">(</span>tmp<span class="token punctuation">)</span><span class="token punctuation">,</span> replaceText<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> tmp<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>url<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token string">'[\?]'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> url <span class="token operator">+</span> <span class="token string">'&amp;'</span> <span class="token operator">+</span> replaceText<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> url <span class="token operator">+</span> <span class="token string">'?'</span> <span class="token operator">+</span> replaceText<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="不刷新页面修改url参数" tabindex="-1"><a class="header-anchor" href="#不刷新页面修改url参数" aria-hidden="true">#</a> 不刷新页面修改url参数</h2>
<p><a href="https://www.cnblogs.com/wuting/p/8946927.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/wuting/p/8946927.html<ExternalLinkIcon/></a></p>
<h2 id="url-的编码和解码" tabindex="-1"><a class="header-anchor" href="#url-的编码和解码" aria-hidden="true">#</a> URL 的编码和解码</h2>
<p>比如，UTF-8 的操作系统上，<code v-pre>http://www.example.com/q=春节</code>这个 URL 之中，汉字“春节”不是 URL 的合法字符，所以被浏览器自动转成<code v-pre>http://www.example.com/q=%E6%98%A5%E8%8A%82</code>。其中，“春”转成了<code v-pre>%E6%98%A5</code>，“节”转成了<code v-pre>%E8%8A%82</code>。这是因为“春”和“节”的 UTF-8 编码分别是<code v-pre>E6 98 A5</code>和<code v-pre>E8 8A 82</code>，将每个字节前面加上百分号，就构成了 URL 编码。</p>
<p>JavaScript 提供四个 URL 的编码/解码方法。</p>
<ul>
<li><code v-pre>encodeURI()</code></li>
<li><code v-pre>encodeURIComponent()</code></li>
<li><code v-pre>decodeURI()</code></li>
<li><code v-pre>decodeURIComponent()</code></li>
</ul>
<p><a href="https://xugaoyi.com/pages/bab4930124ad2c10/#_2%E3%80%81url-%E7%9A%84%E7%BC%96%E7%A0%81%E5%92%8C%E8%A7%A3%E7%A0%81" target="_blank" rel="noopener noreferrer">查看文档<ExternalLinkIcon/></a></p>
</div></template>


