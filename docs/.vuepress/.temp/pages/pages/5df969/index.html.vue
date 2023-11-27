<template><div><h1 id="_01-jsx简介" tabindex="-1"><a class="header-anchor" href="#_01-jsx简介" aria-hidden="true">#</a> 01. JSX简介</h1>
<h2 id="什么是jsx" tabindex="-1"><a class="header-anchor" href="#什么是jsx" aria-hidden="true">#</a> 什么是JSX？</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token operator">&lt;</span>h1<span class="token operator">></span>Hello<span class="token punctuation">,</span> world<span class="token operator">!</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以类似模板语法的方式描述UI的一种语法。它是JS的<strong>语法糖</strong>，<strong>本质上也是JS</strong>。可以在其中使用<strong>变量或表达式、函数等</strong>。</p>
<h2 id="为什么使用jsx" tabindex="-1"><a class="header-anchor" href="#为什么使用jsx" aria-hidden="true">#</a> 为什么使用JSX？</h2>
<p>将<em>标记与逻辑</em> 共同存放在称之为“组件”的松散耦合单元之中，来实现<a href="https://en.wikipedia.org/wiki/Separation_of_concerns" target="_blank" rel="noopener noreferrer"><em>关注点分离</em><ExternalLinkIcon/></a>。</p>
<p>React不强制使用JSX，但在 JavaScript 代码中将 JSX 和 UI 放在一起时，会在<strong>视觉上有辅助作用</strong>。</p>
<h2 id="在-jsx-中嵌入表达式" tabindex="-1"><a class="header-anchor" href="#在-jsx-中嵌入表达式" aria-hidden="true">#</a> 在 JSX 中嵌入表达式</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token operator">&lt;</span>h1<span class="token operator">></span>Hello<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token number">2</span><span class="token operator">+</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 JSX 语法中，你可以在大括号内放置任何有效的 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions" target="_blank" rel="noopener noreferrer">JavaScript 表达式<ExternalLinkIcon/></a>。</p>
<h2 id="jsx-也是一个表达式" tabindex="-1"><a class="header-anchor" href="#jsx-也是一个表达式" aria-hidden="true">#</a> JSX 也是一个表达式</h2>
<p>在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后<strong>得到 JavaScript 对象</strong></p>
<blockquote>
<p>可以把JSX当初一个对象来对待，可以使用它赋值给变量、当参数输入函数、返回JSX等。</p>
</blockquote>
<h2 id="jsx-特定属性" tabindex="-1"><a class="header-anchor" href="#jsx-特定属性" aria-hidden="true">#</a> JSX 特定属性</h2>
<p>通过使用引号，来将属性值指定为字符串字面量：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token operator">&lt;</span>div tabIndex<span class="token operator">=</span><span class="token string">"0"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>JSX中的属性名使用camelCase(小驼峰)命名。如上面例子中的<code v-pre>tabIndex</code></p>
</blockquote>
<p>使用大括号，来在属性值中插入一个 JavaScript 表达式：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token operator">&lt;</span>img src<span class="token operator">=</span><span class="token punctuation">{</span>user<span class="token punctuation">.</span>avatarUrl<span class="token punctuation">}</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>img<span class="token operator">></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="使用-jsx-指定子元素" tabindex="-1"><a class="header-anchor" href="#使用-jsx-指定子元素" aria-hidden="true">#</a> 使用 JSX 指定子元素</h2>
<p>JSX 标签里能够包含很多子元素:</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token punctuation">(</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span><span class="token plain-text">Hello!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span><span class="token plain-text">Good to see you here.</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="jsx-防止注入攻击" tabindex="-1"><a class="header-anchor" href="#jsx-防止注入攻击" aria-hidden="true">#</a> JSX 防止注入攻击</h2>
<p>React DOM 在渲染所有输入内容之前，默认会进行<a href="https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html" target="_blank" rel="noopener noreferrer">转义<ExternalLinkIcon/></a>。它可以确保在你的应用中，<strong>永远不会注入那些并非自己明确编写的内容</strong>。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 <a href="https://en.wikipedia.org/wiki/Cross-site_scripting" target="_blank" rel="noopener noreferrer">XSS（cross-site-scripting, 跨站脚本）<ExternalLinkIcon/></a>攻击。</p>
<h2 id="jsx-表示对象" tabindex="-1"><a class="header-anchor" href="#jsx-表示对象" aria-hidden="true">#</a> JSX 表示对象</h2>
<p>Babel 会把 JSX 转译成一个名为 <code v-pre>React.createElement()</code> 函数调用。</p>
<p>以下两种示例代码完全等效：</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token punctuation">(</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>greeting<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">
    Hello, world!
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> element <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>
  <span class="token string">'h1'</span><span class="token punctuation">,</span> <span class="token comment">// 标签名</span>
  <span class="token punctuation">{</span><span class="token literal-property property">className</span><span class="token operator">:</span> <span class="token string">'greeting'</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 属性对象</span>
  <span class="token string">'Hello, world!'</span> <span class="token comment">// 内容</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


