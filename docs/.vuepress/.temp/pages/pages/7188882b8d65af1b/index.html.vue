<template><div><h1 id="最新提案" tabindex="-1"><a class="header-anchor" href="#最新提案" aria-hidden="true">#</a> 最新提案</h1>
<p>本章介绍一些尚未进入标准、但很有希望的最新提案。</p>
<h2 id="do-表达式" tabindex="-1"><a class="header-anchor" href="#do-表达式" aria-hidden="true">#</a> do 表达式</h2>
<p>本质上，块级作用域是一个语句，将多个操作封装在一起，没有返回值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token keyword">let</span> t <span class="token operator">=</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  t <span class="token operator">=</span> t <span class="token operator">*</span> t <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><!-- more -->
<p>上面代码中，块级作用域将两个语句封装在一起。但是，在块级作用域以外，没有办法得到<code v-pre>t</code>的值，因为块级作用域不返回值，除非<code v-pre>t</code>是全局变量。</p>
<p>现在有一个<a href="https://github.com/tc39/proposal-do-expressions" target="_blank" rel="noopener noreferrer">提案<ExternalLinkIcon/></a>，使得块级作用域可以变为表达式，也就是说可以返回值，办法就是在块级作用域之前加上<code v-pre>do</code>，使它变为<code v-pre>do</code>表达式，然后就会返回内部最后执行的表达式的值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token keyword">do</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> t <span class="token operator">=</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  t <span class="token operator">*</span> t <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，变量<code v-pre>x</code>会得到整个块级作用域的返回值（<code v-pre>t * t + 1</code>）。</p>
<p><code v-pre>do</code>表达式的逻辑非常简单：封装的是什么，就会返回什么。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 等同于 &lt;表达式></span>
<span class="token keyword">do</span> <span class="token punctuation">{</span> <span class="token operator">&lt;</span>表达式<span class="token operator">></span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token comment">// 等同于 &lt;语句></span>
<span class="token keyword">do</span> <span class="token punctuation">{</span> <span class="token operator">&lt;</span>语句<span class="token operator">></span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>do</code>表达式的好处是可以封装多个语句，让程序更加模块化，就像乐高积木那样一块块拼装起来。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token keyword">do</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">g</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的本质，就是根据函数<code v-pre>foo</code>的执行结果，调用不同的函数，将返回结果赋给变量<code v-pre>x</code>。使用<code v-pre>do</code>表达式，就将这个操作的意图表达得非常简洁清晰。而且，<code v-pre>do</code>块级作用域提供了单独的作用域，内部操作可以与全局作用域隔绝。</p>
<p>值得一提的是，<code v-pre>do</code>表达式在 JSX 语法中非常好用。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">return</span> <span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>nav<span class="token operator">></span>
    <span class="token operator">&lt;</span>Home <span class="token operator">/</span><span class="token operator">></span>
    <span class="token punctuation">{</span>
      <span class="token keyword">do</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>loggedIn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token operator">&lt;</span>LogoutButton <span class="token operator">/</span><span class="token operator">></span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token operator">&lt;</span>LoginButton <span class="token operator">/</span><span class="token operator">></span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>nav<span class="token operator">></span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，如果不用<code v-pre>do</code>表达式，就只能用三元判断运算符（<code v-pre>?:</code>）。那样的话，一旦判断逻辑复杂，代码就会变得很不易读。</p>
<h2 id="throw-表达式" tabindex="-1"><a class="header-anchor" href="#throw-表达式" aria-hidden="true">#</a> throw 表达式</h2>
<p>JavaScript 语法规定<code v-pre>throw</code>是一个命令，用来抛出错误，不能用于表达式之中。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 报错</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>console.log</code>的参数必须是一个表达式，如果是一个<code v-pre>throw</code>语句就会报错。</p>
<p>现在有一个<a href="https://github.com/tc39/proposal-throw-expressions" target="_blank" rel="noopener noreferrer">提案<ExternalLinkIcon/></a>，允许<code v-pre>throw</code>用于表达式。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 参数的默认值</span>
<span class="token keyword">function</span> <span class="token function">save</span><span class="token punctuation">(</span>filename <span class="token operator">=</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">"Argument required"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">// 箭头函数的返回值</span>
<span class="token function">lint</span><span class="token punctuation">(</span>ast<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">with</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"avoid using 'with' statements."</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 条件表达式</span>
<span class="token keyword">function</span> <span class="token function">getEncoder</span><span class="token punctuation">(</span><span class="token parameter">encoding</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> encoder <span class="token operator">=</span> encoding <span class="token operator">===</span> <span class="token string">"utf8"</span> <span class="token operator">?</span>
    <span class="token keyword">new</span> <span class="token class-name">UTF8Encoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span>
    encoding <span class="token operator">===</span> <span class="token string">"utf16le"</span> <span class="token operator">?</span>
      <span class="token keyword">new</span> <span class="token class-name">UTF16Encoder</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token operator">:</span>
      encoding <span class="token operator">===</span> <span class="token string">"utf16be"</span> <span class="token operator">?</span>
        <span class="token keyword">new</span> <span class="token class-name">UTF16Encoder</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token operator">:</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"Unsupported encoding"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 逻辑表达式</span>
<span class="token keyword">class</span> <span class="token class-name">Product</span> <span class="token punctuation">{</span>
  <span class="token keyword">get</span> <span class="token function">id</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_id<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">set</span> <span class="token function">id</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_id <span class="token operator">=</span> value <span class="token operator">||</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"Invalid value"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>throw</code>都出现在表达式里面。</p>
<p>语法上，<code v-pre>throw</code>表达式里面的<code v-pre>throw</code>不再是一个命令，而是一个运算符。为了避免与<code v-pre>throw</code>命令混淆，规定<code v-pre>throw</code>出现在行首，一律解释为<code v-pre>throw</code>语句，而不是<code v-pre>throw</code>表达式。</p>
<h2 id="函数的部分执行" tabindex="-1"><a class="header-anchor" href="#函数的部分执行" aria-hidden="true">#</a> 函数的部分执行</h2>
<h3 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h3>
<p>多参数的函数有时需要绑定其中的一个或多个参数，然后返回一个新函数。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">add7</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> x <span class="token operator">+</span> <span class="token number">7</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>add7</code>函数其实是<code v-pre>add</code>函数的一个特殊版本，通过将一个参数绑定为<code v-pre>7</code>，就可以从<code v-pre>add</code>得到<code v-pre>add7</code>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// bind 方法</span>
<span class="token keyword">const</span> add7 <span class="token operator">=</span> <span class="token function">add</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 箭头函数</span>
<span class="token keyword">const</span> <span class="token function-variable function">add7</span> <span class="token operator">=</span> <span class="token parameter">x</span> <span class="token operator">=></span> <span class="token function">add</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面两种写法都有些冗余。其中，<code v-pre>bind</code>方法的局限更加明显，它必须提供<code v-pre>this</code>，并且只能从前到后一个个绑定参数，无法只绑定非头部的参数。</p>
<p>现在有一个<a href="https://github.com/tc39/proposal-partial-application" target="_blank" rel="noopener noreferrer">提案<ExternalLinkIcon/></a>，使得绑定参数并返回一个新函数更加容易。这叫做函数的部分执行（partial application）。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token operator">=></span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token keyword">const</span> addOne <span class="token operator">=</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> maxGreaterThanZero <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据新提案，<code v-pre>?</code>是单个参数的占位符，<code v-pre>...</code>是多个参数的占位符。以下的形式都属于函数的部分执行。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">f</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">)</span>
<span class="token function">f</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">)</span>
<span class="token function">f</span><span class="token punctuation">(</span><span class="token operator">?</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
<span class="token function">f</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
<span class="token function">f</span><span class="token punctuation">(</span><span class="token operator">?</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">)</span>
<span class="token function">f</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>?</code>和<code v-pre>...</code>只能出现在函数的调用之中，并且会返回一个新函数。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> g <span class="token operator">=</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
<span class="token keyword">const</span> <span class="token function-variable function">g</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> <span class="token operator">...</span>y</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">f</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">...</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数的部分执行，也可以用于对象的方法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">f</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> g <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">g</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// 4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="注意点" tabindex="-1"><a class="header-anchor" href="#注意点" aria-hidden="true">#</a> 注意点</h3>
<p>函数的部分执行有一些特别注意的地方。</p>
<p>（1）函数的部分执行是基于原函数的。如果原函数发生变化，部分执行生成的新函数也会立即反映这种变化。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token function-variable function">f</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token operator">=></span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>

<span class="token keyword">const</span> g <span class="token operator">=</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">g</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 4</span>

<span class="token comment">// 替换函数 f</span>
<span class="token function-variable function">f</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token operator">=></span> x <span class="token operator">*</span> y<span class="token punctuation">;</span>

<span class="token function">g</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，定义了函数的部分执行以后，更换原函数会立即影响到新函数。</p>
<p>（2）如果预先提供的那个值是一个表达式，那么这个表达式并不会在定义时求值，而是在每次调用时求值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">f</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token operator">=></span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>

<span class="token keyword">const</span> g <span class="token operator">=</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token operator">?</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">g</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 4</span>

<span class="token comment">// 改变 a 的值</span>
a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token function">g</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 11</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，预先提供的参数是变量<code v-pre>a</code>，那么每次调用函数<code v-pre>g</code>的时候，才会对<code v-pre>a</code>进行求值。</p>
<p>（3）如果新函数的参数多于占位符的数量，那么多余的参数将被忽略。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">f</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> <span class="token operator">...</span>y</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">[</span>x<span class="token punctuation">,</span> <span class="token operator">...</span>y<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> g <span class="token operator">=</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">g</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [2, 1]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，函数<code v-pre>g</code>只有一个占位符，也就意味着它只能接受一个参数，多余的参数都会被忽略。</p>
<p>写成下面这样，多余的参数就没有问题。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">f</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> <span class="token operator">...</span>y</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">[</span>x<span class="token punctuation">,</span> <span class="token operator">...</span>y<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> g <span class="token operator">=</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">g</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [2, 1, 3, 4];</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（4）<code v-pre>...</code>只会被采集一次，如果函数的部分执行使用了多个<code v-pre>...</code>，那么每个<code v-pre>...</code>的值都将相同。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">f</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>x</span><span class="token punctuation">)</span> <span class="token operator">=></span> x<span class="token punctuation">;</span>
<span class="token keyword">const</span> g <span class="token operator">=</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">g</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [1, 2, 3, 9, 1, 2, 3]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>g</code>定义了两个<code v-pre>...</code>占位符，真正执行的时候，它们的值是一样的。</p>
<h2 id="管道运算符" tabindex="-1"><a class="header-anchor" href="#管道运算符" aria-hidden="true">#</a> 管道运算符</h2>
<p>Unix 操作系统有一个管道机制（pipeline），可以把前一个操作的值传给后一个操作。这个机制非常有用，使得简单的操作可以组合成为复杂的操作。许多语言都有管道的实现，现在有一个<a href="https://github.com/tc39/proposal-pipeline-operator" target="_blank" rel="noopener noreferrer">提案<ExternalLinkIcon/></a>，让 JavaScript 也拥有管道机制。</p>
<p>JavaScript 的管道是一个运算符，写作<code v-pre>|&gt;</code>。它的左边是一个表达式，右边是一个函数。管道运算符把左边表达式的值，传入右边的函数进行求值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>x <span class="token operator">|</span><span class="token operator">></span> f
<span class="token comment">// 等同于</span>
<span class="token function">f</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>管道运算符最大的好处，就是可以把嵌套的函数，写成从左到右的链式表达式。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">doubleSay</span> <span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> str <span class="token operator">+</span> <span class="token string">", "</span> <span class="token operator">+</span> str<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">capitalize</span> <span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> str<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> str<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">exclaim</span> <span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> str <span class="token operator">+</span> <span class="token string">'!'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面是三个简单的函数。如果要嵌套执行，传统的写法和管道的写法分别如下。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 传统的写法</span>
<span class="token function">exclaim</span><span class="token punctuation">(</span><span class="token function">capitalize</span><span class="token punctuation">(</span><span class="token function">doubleSay</span><span class="token punctuation">(</span><span class="token string">'hello'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// "Hello, hello!"</span>

<span class="token comment">// 管道的写法</span>
<span class="token string">'hello'</span>
  <span class="token operator">|</span><span class="token operator">></span> doubleSay
  <span class="token operator">|</span><span class="token operator">></span> capitalize
  <span class="token operator">|</span><span class="token operator">></span> exclaim
<span class="token comment">// "Hello, hello!"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>管道运算符只能传递一个值，这意味着它右边的函数必须是一个单参数函数。如果是多参数函数，就必须进行柯里化，改成单参数的版本。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">double</span> <span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> x <span class="token operator">+</span> x<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">add</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">score</span><span class="token operator">:</span> <span class="token number">25</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
person<span class="token punctuation">.</span>score
  <span class="token operator">|</span><span class="token operator">></span> double
  <span class="token operator">|</span><span class="token operator">></span> <span class="token punctuation">(</span><span class="token parameter">_</span> <span class="token operator">=></span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> _<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// 57</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>add</code>函数需要两个参数。但是，管道运算符只能传入一个值，因此需要事先提供另一个参数，并将其改成单参数的箭头函数<code v-pre>_ =&gt; add(7, _)</code>。这个函数里面的下划线并没有特别的含义，可以用其他符号代替，使用下划线只是因为，它能够形象地表示这里是占位符。</p>
<p>管道运算符对于<code v-pre>await</code>函数也适用。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>x <span class="token operator">|</span><span class="token operator">></span> <span class="token keyword">await</span> f
<span class="token comment">// 等同于</span>
<span class="token keyword">await</span> <span class="token function">f</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>

<span class="token keyword">const</span> userAge <span class="token operator">=</span> userId <span class="token operator">|</span><span class="token operator">></span> <span class="token keyword">await</span> fetchUserById <span class="token operator">|</span><span class="token operator">></span> getAgeFromUser<span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
<span class="token keyword">const</span> userAge <span class="token operator">=</span> <span class="token function">getAgeFromUser</span><span class="token punctuation">(</span><span class="token keyword">await</span> <span class="token function">fetchUserById</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数值分隔符" tabindex="-1"><a class="header-anchor" href="#数值分隔符" aria-hidden="true">#</a> 数值分隔符</h2>
<p>欧美语言中，较长的数值允许每三位添加一个分隔符（通常是一个逗号），增加数值的可读性。比如，<code v-pre>1000</code>可以写作<code v-pre>1,000</code>。</p>
<p>现在有一个<a href="https://github.com/tc39/proposal-numeric-separator" target="_blank" rel="noopener noreferrer">提案<ExternalLinkIcon/></a>，允许 JavaScript 的数值使用下划线（<code v-pre>_</code>）作为分隔符。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> budget <span class="token operator">=</span> <span class="token number">1_000_000_000_000</span><span class="token punctuation">;</span>
budget <span class="token operator">===</span> <span class="token number">10</span> <span class="token operator">**</span> <span class="token number">12</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>JavaScript 的数值分隔符没有指定间隔的位数，也就是说，可以每三位添加一个分隔符，也可以每一位、每两位、每四位添加一个。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token number">123_00</span> <span class="token operator">===</span> <span class="token number">12_300</span> <span class="token comment">// true</span>

<span class="token number">12345_00</span> <span class="token operator">===</span> <span class="token number">123_4500</span> <span class="token comment">// true</span>
<span class="token number">12345_00</span> <span class="token operator">===</span> <span class="token number">1_234_500</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>小数和科学计数法也可以使用数值分隔符。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 小数</span>
<span class="token number">0.000_001</span>
<span class="token comment">// 科学计数法</span>
<span class="token number">1e10_000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数值分隔符有几个使用注意点。</p>
<ul>
<li>不能在数值的最前面（leading）或最后面（trailing）。</li>
<li>不能两个或两个以上的分隔符连在一起。</li>
<li>小数点的前后不能有分隔符。</li>
<li>科学计数法里面，表示指数的<code v-pre>e</code>或<code v-pre>E</code>前后不能有分隔符。</li>
</ul>
<p>下面的写法都会报错。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 全部报错</span>
3_<span class="token punctuation">.</span><span class="token number">141</span>
<span class="token number">3</span><span class="token punctuation">.</span>_141
1_e12
1e_12
123__456
_1464301
1464301_
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了十进制，其他进制的数值也可以使用分隔符。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 二进制</span>
<span class="token number">0b1010_0001_1000_0101</span>
<span class="token comment">// 十六进制</span>
<span class="token number">0xA0_B0_C0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，分隔符不能紧跟着进制的前缀<code v-pre>0b</code>、<code v-pre>0B</code>、<code v-pre>0o</code>、<code v-pre>0O</code>、<code v-pre>0x</code>、<code v-pre>0X</code>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 报错</span>
0_b111111000
0b_111111000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面三个将字符串转成数值的函数，不支持数值分隔符。主要原因是提案的设计者认为，数值分隔符主要是为了编码时书写数值的方便，而不是为了处理外部输入的数据。</p>
<ul>
<li>Number()</li>
<li>parseInt()</li>
<li>parseFloat()</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">'123_456'</span><span class="token punctuation">)</span> <span class="token comment">// NaN</span>
<span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">'123_456'</span><span class="token punctuation">)</span> <span class="token comment">// 123</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="math-signbit" tabindex="-1"><a class="header-anchor" href="#math-signbit" aria-hidden="true">#</a> Math.signbit()</h2>
<p><code v-pre>Math.sign()</code>用来判断一个值的正负，但是如果参数是<code v-pre>-0</code>，它会返回<code v-pre>-0</code>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Math<span class="token punctuation">.</span><span class="token function">sign</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// -0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这导致对于判断符号位的正负，<code v-pre>Math.sign()</code>不是很有用。JavaScript 内部使用 64 位浮点数（国际标准 IEEE 754）表示数值，IEEE 754 规定第一位是符号位，<code v-pre>0</code>表示正数，<code v-pre>1</code>表示负数。所以会有两种零，<code v-pre>+0</code>是符号位为<code v-pre>0</code>时的零值，<code v-pre>-0</code>是符号位为<code v-pre>1</code>时的零值。实际编程中，判断一个值是<code v-pre>+0</code>还是<code v-pre>-0</code>非常麻烦，因为它们是相等的。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">+</span><span class="token number">0</span> <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">0</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>目前，有一个<a href="http://jfbastien.github.io/papers/Math.signbit.html" target="_blank" rel="noopener noreferrer">提案<ExternalLinkIcon/></a>，引入了<code v-pre>Math.signbit()</code>方法判断一个数的符号位是否设置了。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Math<span class="token punctuation">.</span><span class="token function">signbit</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">//false</span>
Math<span class="token punctuation">.</span><span class="token function">signbit</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">//true</span>
Math<span class="token punctuation">.</span><span class="token function">signbit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">//false</span>
Math<span class="token punctuation">.</span><span class="token function">signbit</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">//true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，该方法正确返回了<code v-pre>-0</code>的符号位是设置了的。</p>
<p>该方法的算法如下。</p>
<ul>
<li>如果参数是<code v-pre>NaN</code>，返回<code v-pre>false</code></li>
<li>如果参数是<code v-pre>-0</code>，返回<code v-pre>true</code></li>
<li>如果参数是负值，返回<code v-pre>true</code></li>
<li>其他情况返回<code v-pre>false</code></li>
</ul>
<h2 id="双冒号运算符" tabindex="-1"><a class="header-anchor" href="#双冒号运算符" aria-hidden="true">#</a> 双冒号运算符</h2>
<p>箭头函数可以绑定<code v-pre>this</code>对象，大大减少了显式绑定<code v-pre>this</code>对象的写法（<code v-pre>call</code>、<code v-pre>apply</code>、<code v-pre>bind</code>）。但是，箭头函数并不适用于所有场合，所以现在有一个<a href="https://github.com/zenparsing/es-function-bind" target="_blank" rel="noopener noreferrer">提案<ExternalLinkIcon/></a>，提出了“函数绑定”（function bind）运算符，用来取代<code v-pre>call</code>、<code v-pre>apply</code>、<code v-pre>bind</code>调用。</p>
<p>函数绑定运算符是并排的两个冒号（<code v-pre>::</code>），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即<code v-pre>this</code>对象），绑定到右边的函数上面。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">foo</span><span class="token operator">:</span><span class="token operator">:</span>bar<span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
<span class="token function">bar</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token literal-property property">foo</span><span class="token operator">:</span><span class="token operator">:</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token operator">...</span>arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
<span class="token function">bar</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> hasOwnProperty <span class="token operator">=</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>hasOwnProperty<span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">hasOwn</span><span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token literal-property property">obj</span><span class="token operator">:</span><span class="token operator">:</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> method <span class="token operator">=</span> obj<span class="token operator">:</span><span class="token operator">:</span>obj<span class="token punctuation">.</span>foo<span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
<span class="token keyword">var</span> method <span class="token operator">=</span> <span class="token operator">:</span><span class="token operator">:</span>obj<span class="token punctuation">.</span>foo<span class="token punctuation">;</span>

<span class="token keyword">let</span> log <span class="token operator">=</span> <span class="token operator">:</span><span class="token operator">:</span>console<span class="token punctuation">.</span>log<span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
<span class="token keyword">var</span> log <span class="token operator">=</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>console<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果双冒号运算符的运算结果，还是一个对象，就可以采用链式写法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> map<span class="token punctuation">,</span> takeWhile<span class="token punctuation">,</span> forEach <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"iterlib"</span><span class="token punctuation">;</span>

<span class="token function">getPlayers</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token operator">:</span><span class="token operator">:</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> x<span class="token punctuation">.</span><span class="token function">character</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token operator">:</span><span class="token operator">:</span><span class="token function">takeWhile</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> x<span class="token punctuation">.</span>strength <span class="token operator">></span> <span class="token number">100</span><span class="token punctuation">)</span>
<span class="token operator">:</span><span class="token operator">:</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="realm-api" tabindex="-1"><a class="header-anchor" href="#realm-api" aria-hidden="true">#</a> Realm API</h2>
<p><a href="https://github.com/tc39/proposal-realms" target="_blank" rel="noopener noreferrer">Realm API<ExternalLinkIcon/></a> 提供沙箱功能（sandbox），允许隔离代码，防止那些被隔离的代码拿到全局对象。</p>
<p>以前，经常使用<code v-pre>&lt;iframe&gt;</code>作为沙箱。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> globalOne <span class="token operator">=</span> window<span class="token punctuation">;</span>
<span class="token keyword">let</span> iframe <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'iframe'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>iframe<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> globalTwo <span class="token operator">=</span> iframe<span class="token punctuation">.</span>contentWindow<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>&lt;iframe&gt;</code>的全局对象是独立的（<code v-pre>iframe.contentWindow</code>）。Realm API 可以取代这个功能。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> globalOne <span class="token operator">=</span> window<span class="token punctuation">;</span>
<span class="token keyword">const</span> globalTwo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Realm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>global<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Realm API</code>单独提供了一个全局对象<code v-pre>new Realm().global</code>。</p>
<p>Realm API 提供一个<code v-pre>Realm()</code>构造函数，用来生成一个 Realm 对象。该对象的<code v-pre>global</code>属性指向一个新的顶层对象，这个顶层对象跟原始的顶层对象类似。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> globalOne <span class="token operator">=</span> window<span class="token punctuation">;</span>
<span class="token keyword">const</span> globalTwo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Realm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>global<span class="token punctuation">;</span>

globalOne<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span><span class="token string">'1 + 2'</span><span class="token punctuation">)</span> <span class="token comment">// 3</span>
globalTwo<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span><span class="token string">'1 + 2'</span><span class="token punctuation">)</span> <span class="token comment">// 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，Realm 生成的顶层对象的<code v-pre>evaluate()</code>方法，可以运行代码。</p>
<p>下面的代码可以证明，Realm 顶层对象与原始顶层对象是两个对象。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a1 <span class="token operator">=</span> globalOne<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span><span class="token string">'[1,2,3]'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> a2 <span class="token operator">=</span> globalTwo<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span><span class="token string">'[1,2,3]'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a1<span class="token punctuation">.</span>prototype <span class="token operator">===</span> a2<span class="token punctuation">.</span>prototype<span class="token punctuation">;</span> <span class="token comment">// false</span>
a1 <span class="token keyword">instanceof</span> <span class="token class-name">globalTwo<span class="token punctuation">.</span>Array</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
a2 <span class="token keyword">instanceof</span> <span class="token class-name">globalOne<span class="token punctuation">.</span>Array</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，Realm 沙箱里面的数组的原型对象，跟原始环境里面的数组是不一样的。</p>
<p>Realm 沙箱里面只能运行 ECMAScript 语法提供的 API，不能运行宿主环境提供的 API。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>globalTwo<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span><span class="token string">'console.log(1)'</span><span class="token punctuation">)</span>
<span class="token comment">// throw an error: console is undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，Realm 沙箱里面没有<code v-pre>console</code>对象，导致报错。因为<code v-pre>console</code>不是语法标准，是宿主环境提供的。</p>
<p>如果要解决这个问题，可以使用下面的代码。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>globalTwo<span class="token punctuation">.</span>console <span class="token operator">=</span> globalOne<span class="token punctuation">.</span>console<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>Realm()</code>构造函数可以接受一个参数对象，该参数对象的<code v-pre>intrinsics</code>属性可以指定 Realm 沙箱继承原始顶层对象的方法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> r1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Realm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
r1<span class="token punctuation">.</span>global <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
r1<span class="token punctuation">.</span>global<span class="token punctuation">.</span><span class="token constant">JSON</span> <span class="token operator">===</span> <span class="token constant">JSON</span><span class="token punctuation">;</span> <span class="token comment">// false</span>

<span class="token keyword">const</span> r2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Realm</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">intrinsics</span><span class="token operator">:</span> <span class="token string">'inherit'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
r2<span class="token punctuation">.</span>global <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
r2<span class="token punctuation">.</span>global<span class="token punctuation">.</span><span class="token constant">JSON</span> <span class="token operator">===</span> <span class="token constant">JSON</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，正常情况下，沙箱的<code v-pre>JSON</code>方法不同于原始的<code v-pre>JSON</code>对象。但是，<code v-pre>Realm()</code>构造函数接受<code v-pre>{ intrinsics: 'inherit' }</code>作为参数以后，就会继承原始顶层对象的方法。</p>
<p>用户可以自己定义<code v-pre>Realm</code>的子类，用来定制自己的沙箱。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">FakeWindow</span> <span class="token keyword">extends</span> <span class="token class-name">Realm</span> <span class="token punctuation">{</span>
  <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> global <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>global<span class="token punctuation">;</span>

    global<span class="token punctuation">.</span>document <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FakeDocument</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    global<span class="token punctuation">.</span>alert <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>fakeAlert<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>FakeWindow</code>模拟了一个假的顶层对象<code v-pre>window</code>。</p>
<h2 id="命令" tabindex="-1"><a class="header-anchor" href="#命令" aria-hidden="true">#</a> <code v-pre>#!</code>命令</h2>
<p>Unix 的命令行脚本都支持<code v-pre>#!</code>命令，又称为 Shebang 或 Hashbang。这个命令放在脚本的第一行，用来指定脚本的执行器。</p>
<p>比如 Bash 脚本的第一行。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Python 脚本的第一行。</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment">#!/usr/bin/env python</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在有一个<a href="https://github.com/tc39/proposal-hashbang" target="_blank" rel="noopener noreferrer">提案<ExternalLinkIcon/></a>，为 JavaScript 脚本引入了<code v-pre>#!</code>命令，写在脚本文件或者模块文件的第一行。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 写在脚本文件第一行</span>
#<span class="token operator">!</span><span class="token operator">/</span>usr<span class="token operator">/</span>bin<span class="token operator">/</span>env node
<span class="token string">'use strict'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 写在模块文件第一行</span>
#<span class="token operator">!</span><span class="token operator">/</span>usr<span class="token operator">/</span>bin<span class="token operator">/</span>env node
<span class="token keyword">export</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这一行以后，Unix 命令行就可以直接执行脚本。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 以前执行脚本的方式</span>
$ <span class="token function">node</span> hello.js

<span class="token comment"># hashbang 的方式</span>
$ hello.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 JavaScript 引擎来说，会把<code v-pre>#!</code>理解成注释，忽略掉这一行。</p>
<h2 id="import-meta" tabindex="-1"><a class="header-anchor" href="#import-meta" aria-hidden="true">#</a> import.meta</h2>
<p>开发者使用一个模块时，有时需要知道模板本身的一些信息（比如模块的路径）。现在有一个<a href="https://github.com/tc39/proposal-import-meta" target="_blank" rel="noopener noreferrer">提案<ExternalLinkIcon/></a>，为 import 命令添加了一个元属性<code v-pre>import.beta</code>，返回当前模块的元信息。</p>
<p><code v-pre>import.meta</code>只能在模块内部使用，如果在模块外部使用会报错。</p>
<p>这个属性返回一个对象，该对象的各种属性就是当前运行的脚本的元信息。具体包含哪些属性，标准没有规定，由各个运行环境自行决定。一般来说，<code v-pre>import.meta</code>至少会有下面两个属性。</p>
<p><strong>（1）import.meta.url</strong></p>
<p><code v-pre>import.meta.url</code>返回当前模块的 URL 路径。举例来说，当前模块主文件的路径是<code v-pre>https://foo.com/main.js</code>，<code v-pre>import.meta.url</code>就返回这个路径。如果模块里面还有一个数据文件<code v-pre>data.txt</code>，那么就可以用下面的代码，获取这个数据文件的路径。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span><span class="token string">'data.txt'</span><span class="token punctuation">,</span> <span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>url<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意，Node.js 环境中，<code v-pre>import.meta.url</code>返回的总是本地路径，即是<code v-pre>file:URL</code>协议的字符串，比如<code v-pre>file:///home/user/foo.js</code>。</p>
<p><strong>（2）import.meta.scriptElement</strong></p>
<p><code v-pre>import.meta.scriptElement</code>是浏览器特有的元属性，返回加载模块的那个<code v-pre>&lt;script&gt;</code>元素，相当于<code v-pre>document.currentScript</code>属性。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// HTML 代码为</span>
<span class="token comment">// &lt;script type="module" src="my-module.js" data-foo="abc">&lt;/script></span>

<span class="token comment">// my-module.js 内部执行下面的代码</span>
<span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>scriptElement<span class="token punctuation">.</span>dataset<span class="token punctuation">.</span>foo
<span class="token comment">// "abc"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


