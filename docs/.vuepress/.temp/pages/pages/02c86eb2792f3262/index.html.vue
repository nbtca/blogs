<template><div><h1 id="symbol" tabindex="-1"><a class="header-anchor" href="#symbol" aria-hidden="true">#</a> Symbol</h1>
<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，<strong>保证每个属性的名字都是独一无二</strong>的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入<code v-pre>Symbol</code>的原因。</p>
<!-- more -->
<p>ES6 引入了一种新的<strong>原始数据类型<code v-pre>Symbol</code>，表示独一无二的值</strong>。它是 JavaScript 语言的第七种数据类型，前六种是：<code v-pre>undefined</code>、<code v-pre>null</code>、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。</p>
<p><strong>Symbol 值通过<code v-pre>Symbol</code>函数生成</strong>。这就是说，**对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。**凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> s <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">typeof</span> s
<span class="token comment">// "symbol"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，变量<code v-pre>s</code>就是一个独一无二的值。<code v-pre>typeof</code>运算符的结果，表明变量<code v-pre>s</code>是 Symbol 数据类型，而不是字符串之类的其他类型。</p>
<p>注意，<strong><code v-pre>Symbol</code>函数前不能使用<code v-pre>new</code>命令，否则会报错</strong>。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 <strong>Symbol 值不是对象，所以不能添加属性</strong>。基本上，它是一种类似于字符串的数据类型。</p>
<p><strong><code v-pre>Symbol</code>函数可以接受一个字符串作为参数</strong>，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> s1 <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> s2 <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'bar'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

s1 <span class="token comment">// Symbol(foo)</span>
s2 <span class="token comment">// Symbol(bar)</span>

s1<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// "Symbol(foo)"</span>
s2<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// "Symbol(bar)"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>s1</code>和<code v-pre>s2</code>是两个 Symbol 值。如果不加参数，它们在控制台的输出都是<code v-pre>Symbol()</code>，不利于区分。有了参数以后，就等于为它们加上了描述，输出的时候就能够分清，到底是哪一个值。</p>
<p>如果 <strong>Symbol 的参数是一个对象，就会调用该对象的<code v-pre>toString</code>方法，将其转为字符串</strong>，然后才生成一个 Symbol 值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'abc'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> sym <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
sym <span class="token comment">// Symbol(abc)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<strong><code v-pre>Symbol</code>函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的<code v-pre>Symbol</code>函数的返回值是不相等的。</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 没有参数的情况</span>
<span class="token keyword">let</span> s1 <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> s2 <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

s1 <span class="token operator">===</span> s2 <span class="token comment">// false</span>

<span class="token comment">// 有参数的情况</span>
<span class="token keyword">let</span> s1 <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> s2 <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

s1 <span class="token operator">===</span> s2 <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>s1</code>和<code v-pre>s2</code>都是<code v-pre>Symbol</code>函数的返回值，而且参数相同，但是它们是<strong>不相等的</strong>。</p>
<p>Symbol 值<strong>不能与其他类型的值进行运算</strong>，会报错。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> sym <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'My symbol'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token string">"your symbol is "</span> <span class="token operator">+</span> sym
<span class="token comment">// TypeError: can't convert symbol to string</span>
<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">your symbol is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>sym<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
<span class="token comment">// TypeError: can't convert symbol to string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是，<strong>Symbol 值可以显式转为字符串</strong>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> sym <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'My symbol'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">String</span><span class="token punctuation">(</span>sym<span class="token punctuation">)</span> <span class="token comment">// 'Symbol(My symbol)'</span>
sym<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 'Symbol(My symbol)'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，<strong>Symbol 值也可以转为布尔值，但是不能转为数值</strong>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> sym <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span>sym<span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token operator">!</span>sym  <span class="token comment">// false</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>sym<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token function">Number</span><span class="token punctuation">(</span>sym<span class="token punctuation">)</span> <span class="token comment">// TypeError</span>
sym <span class="token operator">+</span> <span class="token number">2</span> <span class="token comment">// TypeError</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="symbol-prototype-description" tabindex="-1"><a class="header-anchor" href="#symbol-prototype-description" aria-hidden="true">#</a> Symbol.prototype.description</h2>
<p>创建 Symbol 的时候，可以添加一个描述。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> sym <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>sym</code>的描述就是字符串<code v-pre>foo</code>。</p>
<p>但是，读取这个描述需要将 Symbol 显式转为字符串，即下面的写法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> sym <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">String</span><span class="token punctuation">(</span>sym<span class="token punctuation">)</span> <span class="token comment">// "Symbol(foo)"</span>
sym<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// "Symbol(foo)"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的用法不是很方便。<a href="https://github.com/tc39/proposal-Symbol-description" target="_blank" rel="noopener noreferrer">ES2019<ExternalLinkIcon/></a> 提供了一个实例属性<code v-pre>description</code>，直接返回 Symbol 的描述。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> sym <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

sym<span class="token punctuation">.</span>description <span class="token comment">// "foo"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="作为属性名的-symbol" tabindex="-1"><a class="header-anchor" href="#作为属性名的-symbol" aria-hidden="true">#</a> 作为属性名的 Symbol</h2>
<p>由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> mySymbol <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 第一种写法</span>
<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
a<span class="token punctuation">[</span>mySymbol<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'Hello!'</span><span class="token punctuation">;</span>

<span class="token comment">// 第二种写法</span>
<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>mySymbol<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token string">'Hello!'</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 第三种写法</span>
<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> mySymbol<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'Hello!'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 以上写法都得到同样结果</span>
a<span class="token punctuation">[</span>mySymbol<span class="token punctuation">]</span> <span class="token comment">// "Hello!"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码<strong>通过方括号结构和<code v-pre>Object.defineProperty</code>，将对象的属性名指定为一个 Symbol 值</strong>。</p>
<p>注意，Symbol 值作为对象属性名时，不能用点运算符。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> mySymbol <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

a<span class="token punctuation">.</span>mySymbol <span class="token operator">=</span> <span class="token string">'Hello!'</span><span class="token punctuation">;</span>
a<span class="token punctuation">[</span>mySymbol<span class="token punctuation">]</span> <span class="token comment">// undefined</span>
a<span class="token punctuation">[</span><span class="token string">'mySymbol'</span><span class="token punctuation">]</span> <span class="token comment">// "Hello!"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，因为点运算符后面总是字符串，所以不会读取<code v-pre>mySymbol</code>作为标识名所指代的那个值，导致<code v-pre>a</code>的属性名实际上是一个字符串，而不是一个 Symbol 值。</p>
<p>同理，在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> s <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>s<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">arg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

obj<span class="token punctuation">[</span>s<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，如果<code v-pre>s</code>不放在方括号中，该属性的键名就是字符串<code v-pre>s</code>，而不是<code v-pre>s</code>所代表的那个 Symbol 值。</p>
<p>采用增强的对象写法，上面代码的<code v-pre>obj</code>对象可以写得更简洁一些。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>s<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">arg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> log <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

log<span class="token punctuation">.</span>levels <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token constant">DEBUG</span><span class="token operator">:</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'debug'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token constant">INFO</span><span class="token operator">:</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'info'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token constant">WARN</span><span class="token operator">:</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'warn'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>log<span class="token punctuation">.</span>levels<span class="token punctuation">.</span><span class="token constant">DEBUG</span><span class="token punctuation">,</span> <span class="token string">'debug message'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>log<span class="token punctuation">.</span>levels<span class="token punctuation">.</span><span class="token constant">INFO</span><span class="token punctuation">,</span> <span class="token string">'info message'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是另外一个例子。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token constant">COLOR_RED</span>    <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token constant">COLOR_GREEN</span>  <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">getComplement</span><span class="token punctuation">(</span><span class="token parameter">color</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>color<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token constant">COLOR_RED</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token constant">COLOR_GREEN</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token constant">COLOR_GREEN</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token constant">COLOR_RED</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'Undefined color'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>常量使用 Symbol 值最大的好处，就是其他任何值都不可能有相同的值了，因此可以保证上面的<code v-pre>switch</code>语句会按设计的方式工作。</p>
<p>还有一点需要注意，Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。</p>
<h2 id="实例-消除魔术字符串" tabindex="-1"><a class="header-anchor" href="#实例-消除魔术字符串" aria-hidden="true">#</a> 实例：消除魔术字符串</h2>
<p><strong>魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值</strong>。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getArea</span><span class="token punctuation">(</span><span class="token parameter">shape<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> area <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

  <span class="token keyword">switch</span> <span class="token punctuation">(</span>shape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">'Triangle'</span><span class="token operator">:</span> <span class="token comment">// 魔术字符串</span>
      area <span class="token operator">=</span> <span class="token number">.5</span> <span class="token operator">*</span> options<span class="token punctuation">.</span>width <span class="token operator">*</span> options<span class="token punctuation">.</span>height<span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token comment">/* ... more code ... */</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> area<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">getArea</span><span class="token punctuation">(</span><span class="token string">'Triangle'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">100</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 魔术字符串</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，字符串<code v-pre>Triangle</code>就是一个魔术字符串。它多次出现，与代码形成“强耦合”，不利于将来的修改和维护。</p>
<blockquote>
<p>笔记：</p>
<p><code v-pre>Triangle</code>字符串在代码中出现多次，如果后期想修改这个字符串需要修改很多处，不利于维护。</p>
</blockquote>
<p>常用的消除魔术字符串的方法，就是把它写成一个变量。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> shapeType <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">triangle</span><span class="token operator">:</span> <span class="token string">'Triangle'</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">getArea</span><span class="token punctuation">(</span><span class="token parameter">shape<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> area <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>shape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> shapeType<span class="token punctuation">.</span>triangle<span class="token operator">:</span>
      area <span class="token operator">=</span> <span class="token number">.5</span> <span class="token operator">*</span> options<span class="token punctuation">.</span>width <span class="token operator">*</span> options<span class="token punctuation">.</span>height<span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> area<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">getArea</span><span class="token punctuation">(</span>shapeType<span class="token punctuation">.</span>triangle<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">100</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，我们把<code v-pre>Triangle</code>写成<code v-pre>shapeType</code>对象的<code v-pre>triangle</code>属性，这样就消除了强耦合。</p>
<p>如果仔细分析，可以发现<code v-pre>shapeType.triangle</code><strong>等于哪个值并不重要，只要确保不会跟其他<code v-pre>shapeType</code>属性的值冲突即可。因此，这里就很适合改用 Symbol 值</strong>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> shapeType <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">triangle</span><span class="token operator">:</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，除了将<code v-pre>shapeType.triangle</code>的值设为一个 Symbol，其他地方都不用修改。</p>
<h2 id="属性名的遍历" tabindex="-1"><a class="header-anchor" href="#属性名的遍历" aria-hidden="true">#</a> 属性名的遍历</h2>
<p><strong>Symbol 作为属性名，遍历对象的时候，该属性不会出现在<code v-pre>for...in</code>、<code v-pre>for...of</code>循环中，也不会被<code v-pre>Object.keys()</code>、<code v-pre>Object.getOwnPropertyNames()</code>、<code v-pre>JSON.stringify()</code>返回</strong>。</p>
<p>但是，它也不是私有属性，有一个**<code v-pre>Object.getOwnPropertySymbols()</code>方法，可以获取指定对象的所有 Symbol 属性名**。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'b'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

obj<span class="token punctuation">[</span>a<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'Hello'</span><span class="token punctuation">;</span>
obj<span class="token punctuation">[</span>b<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'World'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> objectSymbols <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertySymbols</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>

objectSymbols
<span class="token comment">// [Symbol(a), Symbol(b)]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码是<code v-pre>Object.getOwnPropertySymbols()</code>方法的示例，可以获取所有 Symbol 属性名。</p>
<p>下面是另一个例子，<code v-pre>Object.getOwnPropertySymbols()</code>方法与<code v-pre>for...in</code>循环、<code v-pre>Object.getOwnPropertyNames</code>方法进行对比的例子。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> foo <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

obj<span class="token punctuation">[</span>foo<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'bar'</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 无输出</span>
<span class="token punctuation">}</span>

Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyNames</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token comment">// []</span>
Object<span class="token punctuation">.</span><span class="token function">getOwnPropertySymbols</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token comment">// [Symbol(foo)]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，使用<code v-pre>for...in</code>循环和<code v-pre>Object.getOwnPropertyNames()</code>方法都得不到 Symbol 键名，需要使用<code v-pre>Object.getOwnPropertySymbols()</code>方法。</p>
<p>另一个新的 API，<code v-pre>Reflect.ownKeys()</code>方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'my_key'</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token keyword">enum</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token literal-property property">nonEnum</span><span class="token operator">:</span> <span class="token number">3</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

Reflect<span class="token punctuation">.</span><span class="token function">ownKeys</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
<span class="token comment">//  ["enum", "nonEnum", Symbol(my_key)]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于以 Symbol 值作为键名，不会被常规方法遍历得到。我们可以利用这个特性，<strong>为对象定义一些非私有的、但又希望只用于内部的方法</strong>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> size <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'size'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Collection</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">[</span>size<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">[</span>size<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> item<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">[</span>size<span class="token punctuation">]</span><span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">static</span> <span class="token function">sizeOf</span><span class="token punctuation">(</span><span class="token parameter">instance</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> instance<span class="token punctuation">[</span>size<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Collection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Collection<span class="token punctuation">.</span><span class="token function">sizeOf</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token comment">// 0</span>

x<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Collection<span class="token punctuation">.</span><span class="token function">sizeOf</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token comment">// 1</span>

Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token comment">// ['0']</span>
Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyNames</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token comment">// ['0']</span>
Object<span class="token punctuation">.</span><span class="token function">getOwnPropertySymbols</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token comment">// [Symbol(size)]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，对象<code v-pre>x</code>的<code v-pre>size</code>属性是一个 Symbol 值，所以<code v-pre>Object.keys(x)</code>、<code v-pre>Object.getOwnPropertyNames(x)</code>都无法获取它。这就造成了一种非私有的内部方法的效果。</p>
<h2 id="symbol-for-symbol-keyfor" tabindex="-1"><a class="header-anchor" href="#symbol-for-symbol-keyfor" aria-hidden="true">#</a> Symbol.for()，Symbol.keyFor()</h2>
<p>有时，我们希望重新使用同一个 Symbol 值，<code v-pre>Symbol.for()</code>方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> s1 <span class="token operator">=</span> Symbol<span class="token punctuation">.</span><span class="token function">for</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> s2 <span class="token operator">=</span> Symbol<span class="token punctuation">.</span><span class="token function">for</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

s1 <span class="token operator">===</span> s2 <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>s1</code>和<code v-pre>s2</code>都是 Symbol 值，但是它们都是同样参数的<code v-pre>Symbol.for</code>方法生成的，所以实际上是同一个值。</p>
<p><code v-pre>Symbol.for()</code>与<code v-pre>Symbol()</code>这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。<strong><code v-pre>Symbol.for()</code>不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的<code v-pre>key</code>是否已经存在，如果不存在才会新建一个值</strong>。比如，如果你调用<code v-pre>Symbol.for(&quot;cat&quot;)</code>30 次，每次都会返回同一个 Symbol 值，但是调用<code v-pre>Symbol(&quot;cat&quot;)</code>30 次，会返回 30 个不同的 Symbol 值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Symbol<span class="token punctuation">.</span><span class="token function">for</span><span class="token punctuation">(</span><span class="token string">"bar"</span><span class="token punctuation">)</span> <span class="token operator">===</span> Symbol<span class="token punctuation">.</span><span class="token function">for</span><span class="token punctuation">(</span><span class="token string">"bar"</span><span class="token punctuation">)</span>
<span class="token comment">// true</span>

<span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">"bar"</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">"bar"</span><span class="token punctuation">)</span>
<span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，由于<code v-pre>Symbol()</code>写法没有登记机制，所以每次调用都会返回一个不同的值。</p>
<p><code v-pre>Symbol.keyFor()</code>方法返回一个已登记的 Symbol 类型值的<code v-pre>key</code>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> s1 <span class="token operator">=</span> Symbol<span class="token punctuation">.</span><span class="token function">for</span><span class="token punctuation">(</span><span class="token string">"foo"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Symbol<span class="token punctuation">.</span><span class="token function">keyFor</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span> <span class="token comment">// "foo"</span>

<span class="token keyword">let</span> s2 <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">"foo"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Symbol<span class="token punctuation">.</span><span class="token function">keyFor</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span> <span class="token comment">// undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，变量<code v-pre>s2</code>属于未登记的 Symbol 值，所以返回<code v-pre>undefined</code>。</p>
<p>注意，<strong><code v-pre>Symbol.for()</code>为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> Symbol<span class="token punctuation">.</span><span class="token function">for</span><span class="token punctuation">(</span><span class="token string">'bar'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> x <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> y <span class="token operator">=</span> Symbol<span class="token punctuation">.</span><span class="token function">for</span><span class="token punctuation">(</span><span class="token string">'bar'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x <span class="token operator">===</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>Symbol.for('bar')</code>是函数内部运行的，但是生成的 Symbol 值是登记在全局环境的。所以，第二次运行<code v-pre>Symbol.for('bar')</code>可以取到这个 Symbol 值。</p>
<p><code v-pre>Symbol.for()</code>的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>iframe <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'iframe'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
iframe<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token function">String</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>location<span class="token punctuation">)</span><span class="token punctuation">;</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>iframe<span class="token punctuation">)</span><span class="token punctuation">;</span>

iframe<span class="token punctuation">.</span>contentWindow<span class="token punctuation">.</span>Symbol<span class="token punctuation">.</span><span class="token function">for</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token operator">===</span> Symbol<span class="token punctuation">.</span><span class="token function">for</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span>
<span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，iframe 窗口生成的 Symbol 值，可以在主页面得到。</p>
<h2 id="实例-模块的-singleton-模式" tabindex="-1"><a class="header-anchor" href="#实例-模块的-singleton-模式" aria-hidden="true">#</a> 实例：模块的 Singleton 模式</h2>
<p>Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例。</p>
<p>对于 Node 来说，模块文件可以看成是一个类。怎么保证每次执行这个模块文件，返回的都是同一个实例呢？</p>
<p>很容易想到，可以把实例放到顶层对象<code v-pre>global</code>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// mod.js</span>
<span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">'hello'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>global<span class="token punctuation">.</span>_foo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  global<span class="token punctuation">.</span>_foo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> global<span class="token punctuation">.</span>_foo<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，加载上面的<code v-pre>mod.js</code>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./mod.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，变量<code v-pre>a</code>任何时候加载的都是<code v-pre>A</code>的同一个实例。</p>
<p>但是，这里有一个问题，全局变量<code v-pre>global._foo</code>是可写的，任何文件都可以修改。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>global<span class="token punctuation">.</span>_foo <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token string">'world'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./mod.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码，会使得加载<code v-pre>mod.js</code>的脚本都失真。</p>
<p>为了防止这种情况出现，我们就可以使用 Symbol。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// mod.js</span>
<span class="token keyword">const</span> <span class="token constant">FOO_KEY</span> <span class="token operator">=</span> Symbol<span class="token punctuation">.</span><span class="token function">for</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">'hello'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>global<span class="token punctuation">[</span><span class="token constant">FOO_KEY</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  global<span class="token punctuation">[</span><span class="token constant">FOO_KEY</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> global<span class="token punctuation">[</span><span class="token constant">FOO_KEY</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，可以保证<code v-pre>global[FOO_KEY]</code>不会被无意间覆盖，但还是可以被改写。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>global<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span><span class="token function">for</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token string">'world'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./mod.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果键名使用<code v-pre>Symbol</code>方法生成，那么外部将无法引用这个值，当然也就无法改写。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// mod.js</span>
<span class="token keyword">const</span> <span class="token constant">FOO_KEY</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 后面代码相同 ……</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码将导致其他脚本都无法引用<code v-pre>FOO_KEY</code>。但这样也有一个问题，就是如果多次执行这个脚本，每次得到的<code v-pre>FOO_KEY</code>都是不一样的。虽然 Node 会将脚本的执行结果缓存，一般情况下，不会多次执行同一个脚本，但是用户可以手动清除缓存，所以也不是绝对可靠。</p>
<h2 id="内置的-symbol-值" tabindex="-1"><a class="header-anchor" href="#内置的-symbol-值" aria-hidden="true">#</a> 内置的 Symbol 值</h2>
<p>除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。</p>
<h3 id="symbol-hasinstance" tabindex="-1"><a class="header-anchor" href="#symbol-hasinstance" aria-hidden="true">#</a> Symbol.hasInstance</h3>
<p>对象的<code v-pre>Symbol.hasInstance</code>属性，指向一个内部方法。当其他对象使用<code v-pre>instanceof</code>运算符，判断是否为该对象的实例时，会调用这个方法。比如，<code v-pre>foo instanceof Foo</code>在语言内部，实际调用的是<code v-pre>Foo[Symbol.hasInstance](foo)</code>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>hasInstance<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">foo</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> foo <span class="token keyword">instanceof</span> <span class="token class-name">Array</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name">new</span> <span class="token function">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>MyClass</code>是一个类，<code v-pre>new MyClass()</code>会返回一个实例。该实例的<code v-pre>Symbol.hasInstance</code>方法，会在进行<code v-pre>instanceof</code>运算时自动调用，判断左侧的运算子是否为<code v-pre>Array</code>的实例。</p>
<p>下面是另一个例子。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Even</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>hasInstance<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">Number</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 等同于</span>
<span class="token keyword">const</span> Even <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>hasInstance<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">Number</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token number">1</span> <span class="token keyword">instanceof</span> <span class="token class-name">Even</span> <span class="token comment">// false</span>
<span class="token number">2</span> <span class="token keyword">instanceof</span> <span class="token class-name">Even</span> <span class="token comment">// true</span>
<span class="token number">12345</span> <span class="token keyword">instanceof</span> <span class="token class-name">Even</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="symbol-isconcatspreadable" tabindex="-1"><a class="header-anchor" href="#symbol-isconcatspreadable" aria-hidden="true">#</a> Symbol.isConcatSpreadable</h3>
<p>对象的<code v-pre>Symbol.isConcatSpreadable</code>属性等于一个布尔值，表示该对象用于<code v-pre>Array.prototype.concat()</code>时，是否可以展开。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> arr1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'c'</span><span class="token punctuation">,</span> <span class="token string">'d'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>arr1<span class="token punctuation">,</span> <span class="token string">'e'</span><span class="token punctuation">)</span> <span class="token comment">// ['a', 'b', 'c', 'd', 'e']</span>
arr1<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>isConcatSpreadable<span class="token punctuation">]</span> <span class="token comment">// undefined</span>

<span class="token keyword">let</span> arr2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'c'</span><span class="token punctuation">,</span> <span class="token string">'d'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
arr2<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>isConcatSpreadable<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>arr2<span class="token punctuation">,</span> <span class="token string">'e'</span><span class="token punctuation">)</span> <span class="token comment">// ['a', 'b', ['c','d'], 'e']</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码说明，数组的默认行为是可以展开，<code v-pre>Symbol.isConcatSpreadable</code>默认等于<code v-pre>undefined</code>。该属性等于<code v-pre>true</code>时，也有展开的效果。</p>
<p>类似数组的对象正好相反，默认不展开。它的<code v-pre>Symbol.isConcatSpreadable</code>属性设为<code v-pre>true</code>，才可以展开。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">length</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token operator">:</span> <span class="token string">'c'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token string">'d'</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">'e'</span><span class="token punctuation">)</span> <span class="token comment">// ['a', 'b', obj, 'e']</span>

obj<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>isConcatSpreadable<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">'e'</span><span class="token punctuation">)</span> <span class="token comment">// ['a', 'b', 'c', 'd', 'e']</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Symbol.isConcatSpreadable</code>属性也可以定义在类里面。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A1</span> <span class="token keyword">extends</span> <span class="token class-name">Array</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>isConcatSpreadable<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">A2</span> <span class="token keyword">extends</span> <span class="token class-name">Array</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">get</span> <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>isConcatSpreadable<span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> a1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">A1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
a1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> a2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">A2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
a2<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>
<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>a1<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>a2<span class="token punctuation">)</span>
<span class="token comment">// [1, 2, 3, 4, [5, 6]]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，类<code v-pre>A1</code>是可展开的，类<code v-pre>A2</code>是不可展开的，所以使用<code v-pre>concat</code>时有不一样的结果。</p>
<p>注意，<code v-pre>Symbol.isConcatSpreadable</code>的位置差异，<code v-pre>A1</code>是定义在实例上，<code v-pre>A2</code>是定义在类本身，效果相同。</p>
<h3 id="symbol-species" tabindex="-1"><a class="header-anchor" href="#symbol-species" aria-hidden="true">#</a> Symbol.species</h3>
<p>对象的<code v-pre>Symbol.species</code>属性，指向一个构造函数。创建衍生对象时，会使用该属性。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MyArray</span> <span class="token keyword">extends</span> <span class="token class-name">Array</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyArray</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> a<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> c <span class="token operator">=</span> a<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> x <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

b <span class="token keyword">instanceof</span> <span class="token class-name">MyArray</span> <span class="token comment">// true</span>
c <span class="token keyword">instanceof</span> <span class="token class-name">MyArray</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，子类<code v-pre>MyArray</code>继承了父类<code v-pre>Array</code>，<code v-pre>a</code>是<code v-pre>MyArray</code>的实例，<code v-pre>b</code>和<code v-pre>c</code>是<code v-pre>a</code>的衍生对象。你可能会认为，<code v-pre>b</code>和<code v-pre>c</code>都是调用数组方法生成的，所以应该是数组（<code v-pre>Array</code>的实例），但实际上它们也是<code v-pre>MyArray</code>的实例。</p>
<p><code v-pre>Symbol.species</code>属性就是为了解决这个问题而提供的。现在，我们可以为<code v-pre>MyArray</code>设置<code v-pre>Symbol.species</code>属性。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MyArray</span> <span class="token keyword">extends</span> <span class="token class-name">Array</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token keyword">get</span> <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>species<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> Array<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，由于定义了<code v-pre>Symbol.species</code>属性，创建衍生对象时就会使用这个属性返回的函数，作为构造函数。这个例子也说明，定义<code v-pre>Symbol.species</code>属性要采用<code v-pre>get</code>取值器。默认的<code v-pre>Symbol.species</code>属性等同于下面的写法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">static</span> <span class="token keyword">get</span> <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>species<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，再来看前面的例子。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MyArray</span> <span class="token keyword">extends</span> <span class="token class-name">Array</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token keyword">get</span> <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>species<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> Array<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> a<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>

b <span class="token keyword">instanceof</span> <span class="token class-name">MyArray</span> <span class="token comment">// false</span>
b <span class="token keyword">instanceof</span> <span class="token class-name">Array</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>a.map(x =&gt; x)</code>生成的衍生对象，就不是<code v-pre>MyArray</code>的实例，而直接就是<code v-pre>Array</code>的实例。</p>
<p>再看一个例子。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">T1</span> <span class="token keyword">extends</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">T2</span> <span class="token keyword">extends</span> <span class="token class-name">Promise</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token keyword">get</span> <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>species<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Promise<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">new</span> <span class="token class-name">T1</span><span class="token punctuation">(</span><span class="token parameter">r</span> <span class="token operator">=></span> <span class="token function">r</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> v<span class="token punctuation">)</span> <span class="token keyword">instanceof</span> <span class="token class-name">T1</span> <span class="token comment">// true</span>
<span class="token keyword">new</span> <span class="token class-name">T2</span><span class="token punctuation">(</span><span class="token parameter">r</span> <span class="token operator">=></span> <span class="token function">r</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> v<span class="token punctuation">)</span> <span class="token keyword">instanceof</span> <span class="token class-name">T2</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>T2</code>定义了<code v-pre>Symbol.species</code>属性，<code v-pre>T1</code>没有。结果就导致了创建衍生对象时（<code v-pre>then</code>方法），<code v-pre>T1</code>调用的是自身的构造方法，而<code v-pre>T2</code>调用的是<code v-pre>Promise</code>的构造方法。</p>
<p>总之，<code v-pre>Symbol.species</code>的作用在于，实例对象在运行过程中，需要再次调用自身的构造函数时，会调用该属性指定的构造函数。它主要的用途是，有些类库是在基类的基础上修改的，那么子类使用继承的方法时，作者可能希望返回基类的实例，而不是子类的实例。</p>
<h3 id="symbol-match" tabindex="-1"><a class="header-anchor" href="#symbol-match" aria-hidden="true">#</a> Symbol.match</h3>
<p>对象的<code v-pre>Symbol.match</code>属性，指向一个函数。当执行<code v-pre>str.match(myObject)</code>时，如果该属性存在，会调用它，返回该方法的返回值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token class-name">String</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>regexp<span class="token punctuation">)</span>
<span class="token comment">// 等同于</span>
regexp<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>match<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">MyMatcher</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>match<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'hello world'</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>string<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token string">'e'</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MyMatcher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="symbol-replace" tabindex="-1"><a class="header-anchor" href="#symbol-replace" aria-hidden="true">#</a> Symbol.replace</h3>
<p>对象的<code v-pre>Symbol.replace</code>属性，指向一个方法，当该对象被<code v-pre>String.prototype.replace</code>方法调用时，会返回该方法的返回值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token class-name">String</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>searchValue<span class="token punctuation">,</span> replaceValue<span class="token punctuation">)</span>
<span class="token comment">// 等同于</span>
searchValue<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>replace<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> replaceValue<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是一个例子。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> x <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
x<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>replace<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>s</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token string">'Hello'</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> <span class="token string">'World'</span><span class="token punctuation">)</span> <span class="token comment">// ["Hello", "World"]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Symbol.replace</code>方法会收到两个参数，第一个参数是<code v-pre>replace</code>方法正在作用的对象，上面例子是<code v-pre>Hello</code>，第二个参数是替换后的值，上面例子是<code v-pre>World</code>。</p>
<h3 id="symbol-search" tabindex="-1"><a class="header-anchor" href="#symbol-search" aria-hidden="true">#</a> Symbol.search</h3>
<p>对象的<code v-pre>Symbol.search</code>属性，指向一个方法，当该对象被<code v-pre>String.prototype.search</code>方法调用时，会返回该方法的返回值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token class-name">String</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span>regexp<span class="token punctuation">)</span>
<span class="token comment">// 等同于</span>
regexp<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>search<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">MySearch</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>search<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> string<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token string">'foobar'</span><span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MySearch</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="symbol-split" tabindex="-1"><a class="header-anchor" href="#symbol-split" aria-hidden="true">#</a> Symbol.split</h3>
<p>对象的<code v-pre>Symbol.split</code>属性，指向一个方法，当该对象被<code v-pre>String.prototype.split</code>方法调用时，会返回该方法的返回值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token class-name">String</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span>separator<span class="token punctuation">,</span> limit<span class="token punctuation">)</span>
<span class="token comment">// 等同于</span>
separator<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>split<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> limit<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是一个例子。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MySplitter</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>split<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> index <span class="token operator">=</span> string<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> string<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span>
      string<span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">,</span>
      string<span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span>index <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token string">'foobar'</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MySplitter</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// ['', 'bar']</span>

<span class="token string">'foobar'</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MySplitter</span><span class="token punctuation">(</span><span class="token string">'bar'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// ['foo', '']</span>

<span class="token string">'foobar'</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MySplitter</span><span class="token punctuation">(</span><span class="token string">'baz'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// 'foobar'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面方法使用<code v-pre>Symbol.split</code>方法，重新定义了字符串对象的<code v-pre>split</code>方法的行为，</p>
<h3 id="symbol-iterator" tabindex="-1"><a class="header-anchor" href="#symbol-iterator" aria-hidden="true">#</a> Symbol.iterator</h3>
<p>对象的<code v-pre>Symbol.iterator</code>属性，指向该对象的默认遍历器方法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> myIterable <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
myIterable<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token operator">*</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">yield</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">yield</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token keyword">yield</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token punctuation">[</span><span class="token operator">...</span>myIterable<span class="token punctuation">]</span> <span class="token comment">// [1, 2, 3]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对象进行<code v-pre>for...of</code>循环时，会调用<code v-pre>Symbol.iterator</code>方法，返回该对象的默认遍历器，详细介绍参见《Iterator 和 for...of 循环》一章。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Collection</span> <span class="token punctuation">{</span>
  <span class="token operator">*</span><span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">yield</span> <span class="token keyword">this</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token operator">++</span>i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> myCollection <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Collection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
myCollection<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
myCollection<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> value <span class="token keyword">of</span> myCollection<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 1</span>
<span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="symbol-toprimitive" tabindex="-1"><a class="header-anchor" href="#symbol-toprimitive" aria-hidden="true">#</a> Symbol.toPrimitive</h3>
<p>对象的<code v-pre>Symbol.toPrimitive</code>属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。</p>
<p><code v-pre>Symbol.toPrimitive</code>被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。</p>
<ul>
<li>Number：该场合需要转成数值</li>
<li>String：该场合需要转成字符串</li>
<li>Default：该场合可以转成数值，也可以转成字符串</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>toPrimitive<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">hint</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>hint<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token string">'number'</span><span class="token operator">:</span>
        <span class="token keyword">return</span> <span class="token number">123</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token string">'string'</span><span class="token operator">:</span>
        <span class="token keyword">return</span> <span class="token string">'str'</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token string">'default'</span><span class="token operator">:</span>
        <span class="token keyword">return</span> <span class="token string">'default'</span><span class="token punctuation">;</span>
      <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token number">2</span> <span class="token operator">*</span> obj <span class="token comment">// 246</span>
<span class="token number">3</span> <span class="token operator">+</span> obj <span class="token comment">// '3default'</span>
obj <span class="token operator">==</span> <span class="token string">'default'</span> <span class="token comment">// true</span>
<span class="token function">String</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token comment">// 'str'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="symbol-tostringtag" tabindex="-1"><a class="header-anchor" href="#symbol-tostringtag" aria-hidden="true">#</a> Symbol.toStringTag</h3>
<p>对象的<code v-pre>Symbol.toStringTag</code>属性，指向一个方法。在该对象上面调用<code v-pre>Object.prototype.toString</code>方法时，如果这个属性存在，它的返回值会出现在<code v-pre>toString</code>方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制<code v-pre>[object Object]</code>或<code v-pre>[object Array]</code>中<code v-pre>object</code>后面的那个字符串。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 例一</span>
<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>toStringTag<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token string">'Foo'</span><span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// "[object Foo]"</span>

<span class="token comment">// 例二</span>
<span class="token keyword">class</span> <span class="token class-name">Collection</span> <span class="token punctuation">{</span>
  <span class="token keyword">get</span> <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>toStringTag<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'xxx'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Collection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token comment">// "[object xxx]"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ES6 新增内置对象的<code v-pre>Symbol.toStringTag</code>属性值如下。</p>
<ul>
<li><code v-pre>JSON[Symbol.toStringTag]</code>：'JSON'</li>
<li><code v-pre>Math[Symbol.toStringTag]</code>：'Math'</li>
<li>Module 对象<code v-pre>M[Symbol.toStringTag]</code>：'Module'</li>
<li><code v-pre>ArrayBuffer.prototype[Symbol.toStringTag]</code>：'ArrayBuffer'</li>
<li><code v-pre>DataView.prototype[Symbol.toStringTag]</code>：'DataView'</li>
<li><code v-pre>Map.prototype[Symbol.toStringTag]</code>：'Map'</li>
<li><code v-pre>Promise.prototype[Symbol.toStringTag]</code>：'Promise'</li>
<li><code v-pre>Set.prototype[Symbol.toStringTag]</code>：'Set'</li>
<li><code v-pre>%TypedArray%.prototype[Symbol.toStringTag]</code>：'Uint8Array'等</li>
<li><code v-pre>WeakMap.prototype[Symbol.toStringTag]</code>：'WeakMap'</li>
<li><code v-pre>WeakSet.prototype[Symbol.toStringTag]</code>：'WeakSet'</li>
<li><code v-pre>%MapIteratorPrototype%[Symbol.toStringTag]</code>：'Map Iterator'</li>
<li><code v-pre>%SetIteratorPrototype%[Symbol.toStringTag]</code>：'Set Iterator'</li>
<li><code v-pre>%StringIteratorPrototype%[Symbol.toStringTag]</code>：'String Iterator'</li>
<li><code v-pre>Symbol.prototype[Symbol.toStringTag]</code>：'Symbol'</li>
<li><code v-pre>Generator.prototype[Symbol.toStringTag]</code>：'Generator'</li>
<li><code v-pre>GeneratorFunction.prototype[Symbol.toStringTag]</code>：'GeneratorFunction'</li>
</ul>
<h3 id="symbol-unscopables" tabindex="-1"><a class="header-anchor" href="#symbol-unscopables" aria-hidden="true">#</a> Symbol.unscopables</h3>
<p>对象的<code v-pre>Symbol.unscopables</code>属性，指向一个对象。该对象指定了使用<code v-pre>with</code>关键字时，哪些属性会被<code v-pre>with</code>环境排除。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>unscopables<span class="token punctuation">]</span>
<span class="token comment">// {</span>
<span class="token comment">//   copyWithin: true,</span>
<span class="token comment">//   entries: true,</span>
<span class="token comment">//   fill: true,</span>
<span class="token comment">//   find: true,</span>
<span class="token comment">//   findIndex: true,</span>
<span class="token comment">//   includes: true,</span>
<span class="token comment">//   keys: true</span>
<span class="token comment">// }</span>

Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>unscopables<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">// ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'includes', 'keys']</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码说明，数组有 7 个属性，会被<code v-pre>with</code>命令排除。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 没有 unscopables 时</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">with</span> <span class="token punctuation">(</span><span class="token class-name">MyClass</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
<span class="token punctuation">}</span>

<span class="token comment">// 有 unscopables 时</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
  <span class="token keyword">get</span> <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>unscopables<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">with</span> <span class="token punctuation">(</span><span class="token class-name">MyClass</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码通过指定<code v-pre>Symbol.unscopables</code>属性，使得<code v-pre>with</code>语法块不会在当前作用域寻找<code v-pre>foo</code>属性，即<code v-pre>foo</code>将指向外层作用域的变量。</p>
</div></template>


