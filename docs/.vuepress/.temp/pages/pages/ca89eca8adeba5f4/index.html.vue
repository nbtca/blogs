<template><div><h1 id="字符串的扩展" tabindex="-1"><a class="header-anchor" href="#字符串的扩展" aria-hidden="true">#</a> 字符串的扩展</h1>
<p>本章介绍 ES6 对字符串的改造和增强，下一章介绍字符串对象的新增方法。</p>
<h2 id="字符的-unicode-表示法" tabindex="-1"><a class="header-anchor" href="#字符的-unicode-表示法" aria-hidden="true">#</a> 字符的 Unicode 表示法</h2>
<p>ES6 加强了对 Unicode 的支持，允许采用<code v-pre>\uxxxx</code>形式表示一个字符，其中<code v-pre>xxxx</code>表示字符的 Unicode 码点。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token string">"\u0061"</span>
<span class="token comment">// "a"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><!-- more -->
<p>但是，这种表示法只限于码点在<code v-pre>\u0000</code>~<code v-pre>\uFFFF</code>之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token string">"\uD842\uDFB7"</span>
<span class="token comment">// "𠮷"</span>

<span class="token string">"\u20BB7"</span>
<span class="token comment">// " 7"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表示，如果直接在<code v-pre>\u</code>后面跟上超过<code v-pre>0xFFFF</code>的数值（比如<code v-pre>\u20BB7</code>），JavaScript 会理解成<code v-pre>\u20BB+7</code>。由于<code v-pre>\u20BB</code>是一个不可打印字符，所以只会显示一个空格，后面跟着一个<code v-pre>7</code>。</p>
<p>ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token string">"\u{20BB7}"</span>
<span class="token comment">// "𠮷"</span>

<span class="token string">"\u{41}\u{42}\u{43}"</span>
<span class="token comment">// "ABC"</span>

<span class="token keyword">let</span> hello <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>
hell\u<span class="token punctuation">{</span>6F<span class="token punctuation">}</span> <span class="token comment">// 123</span>

<span class="token string">'\u{1F680}'</span> <span class="token operator">===</span> <span class="token string">'\uD83D\uDE80'</span>
<span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，最后一个例子表明，大括号表示法与四字节的 UTF-16 编码是等价的。</p>
<p>有了这种表示法之后，JavaScript 共有 6 种方法可以表示一个字符。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token string">'\z'</span> <span class="token operator">===</span> <span class="token string">'z'</span>  <span class="token comment">// true</span>
<span class="token string">'\172'</span> <span class="token operator">===</span> <span class="token string">'z'</span> <span class="token comment">// true</span>
<span class="token string">'\x7A'</span> <span class="token operator">===</span> <span class="token string">'z'</span> <span class="token comment">// true</span>
<span class="token string">'\u007A'</span> <span class="token operator">===</span> <span class="token string">'z'</span> <span class="token comment">// true</span>
<span class="token string">'\u{7A}'</span> <span class="token operator">===</span> <span class="token string">'z'</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="字符串的遍历器接口" tabindex="-1"><a class="header-anchor" href="#字符串的遍历器接口" aria-hidden="true">#</a> 字符串的遍历器接口</h2>
<p>ES6 为字符串添加了遍历器接口（详见《Iterator》一章），使得<strong>字符串可以被<code v-pre>for...of</code>循环遍历</strong>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> codePoint <span class="token keyword">of</span> <span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>codePoint<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// "f"</span>
<span class="token comment">// "o"</span>
<span class="token comment">// "o"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了遍历字符串，这个遍历器最大的优点是可以识别大于<code v-pre>0xFFFF</code>的码点，传统的<code v-pre>for</code>循环无法识别这样的码点。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> text <span class="token operator">=</span> String<span class="token punctuation">.</span><span class="token function">fromCodePoint</span><span class="token punctuation">(</span><span class="token number">0x20BB7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> text<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>text<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// " "</span>
<span class="token comment">// " "</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">of</span> text<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// "𠮷"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，字符串<code v-pre>text</code>只有一个字符，但是<code v-pre>for</code>循环会认为它包含两个字符（都不可打印），而<code v-pre>for...of</code>循环会正确识别出这一个字符。</p>
<h2 id="直接输入-u-2028-和-u-2029" tabindex="-1"><a class="header-anchor" href="#直接输入-u-2028-和-u-2029" aria-hidden="true">#</a> 直接输入 U+2028 和 U+2029</h2>
<p>JavaScript 字符串允许直接输入字符，以及输入字符的转义形式。举例来说，“中”的 Unicode 码点是 U+4e2d，你可以直接在字符串里面输入这个汉字，也可以输入它的转义形式<code v-pre>\u4e2d</code>，两者是等价的。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token string">'中'</span> <span class="token operator">===</span> <span class="token string">'\u4e2d'</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是，JavaScript 规定有5个字符，不能在字符串里面直接使用，只能使用转义形式。</p>
<ul>
<li>U+005C：反斜杠（reverse solidus)</li>
<li>U+000D：回车（carriage return）</li>
<li>U+2028：行分隔符（line separator）</li>
<li>U+2029：段分隔符（paragraph separator）</li>
<li>U+000A：换行符（line feed）</li>
</ul>
<p>举例来说，字符串里面不能直接包含反斜杠，一定要转义写成<code v-pre>\\</code>或者<code v-pre>\u005c</code>。</p>
<p>这个规定本身没有问题，麻烦在于 JSON 格式允许字符串里面直接使用 U+2028（行分隔符）和 U+2029（段分隔符）。这样一来，服务器输出的 JSON 被<code v-pre>JSON.parse</code>解析，就有可能直接报错。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> json <span class="token operator">=</span> <span class="token string">'"\u2028"'</span><span class="token punctuation">;</span>
<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 可能报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>JSON 格式已经冻结（RFC 7159），没法修改了。为了消除这个报错，<a href="https://github.com/tc39/proposal-json-superset" target="_blank" rel="noopener noreferrer">ES2019<ExternalLinkIcon/></a> 允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token constant">PS</span> <span class="token operator">=</span> <span class="token function">eval</span><span class="token punctuation">(</span><span class="token string">"'\u2029'"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>根据这个提案，上面的代码不会报错。</p>
<p>注意，模板字符串现在就允许直接输入这两个字符。另外，正则表达式依然不允许直接输入这两个字符，这是没有问题的，因为 JSON 本来就不允许直接包含正则表达式。</p>
<h2 id="json-stringify-的改造" tabindex="-1"><a class="header-anchor" href="#json-stringify-的改造" aria-hidden="true">#</a> JSON.stringify() 的改造</h2>
<p>根据标准，JSON 数据必须是 UTF-8 编码。但是，现在的<code v-pre>JSON.stringify()</code>方法有可能返回不符合 UTF-8 标准的字符串。</p>
<p>具体来说，UTF-8 标准规定，<code v-pre>0xD800</code>到<code v-pre>0xDFFF</code>之间的码点，不能单独使用，必须配对使用。比如，<code v-pre>\uD834\uDF06</code>是两个码点，但是必须放在一起配对使用，代表字符<code v-pre>𝌆</code>。这是为了表示码点大于<code v-pre>0xFFFF</code>的字符的一种变通方法。单独使用<code v-pre>\uD834</code>和<code v-pre>\uDFO6</code>这两个码点是不合法的，或者颠倒顺序也不行，因为<code v-pre>\uDF06\uD834</code>并没有对应的字符。</p>
<p><code v-pre>JSON.stringify()</code>的问题在于，它可能返回<code v-pre>0xD800</code>到<code v-pre>0xDFFF</code>之间的单个码点。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token string">'\u{D834}'</span><span class="token punctuation">)</span> <span class="token comment">// "\u{D834}"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了确保返回的是合法的 UTF-8 字符，<a href="https://github.com/tc39/proposal-well-formed-stringify" target="_blank" rel="noopener noreferrer">ES2019<ExternalLinkIcon/></a> 改变了<code v-pre>JSON.stringify()</code>的行为。如果遇到<code v-pre>0xD800</code>到<code v-pre>0xDFFF</code>之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token string">'\u{D834}'</span><span class="token punctuation">)</span> <span class="token comment">// ""\\uD834""</span>
<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token string">'\uDF06\uD834'</span><span class="token punctuation">)</span> <span class="token comment">// ""\\udf06\\ud834""</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模板字符串" tabindex="-1"><a class="header-anchor" href="#模板字符串" aria-hidden="true">#</a> 模板字符串</h2>
<p>传统的 JavaScript 语言，输出模板通常是这样写的（下面使用了 jQuery 的方法）。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#result'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>
  <span class="token string">'There are &lt;b>'</span> <span class="token operator">+</span> basket<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token string">'&lt;/b> '</span> <span class="token operator">+</span>
  <span class="token string">'items in your basket, '</span> <span class="token operator">+</span>
  <span class="token string">'&lt;em>'</span> <span class="token operator">+</span> basket<span class="token punctuation">.</span>onSale <span class="token operator">+</span>
  <span class="token string">'&lt;/em> are on sale!'</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这种写法相当繁琐不方便，ES6 引入了模板字符串解决这个问题。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#result'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
  There are &lt;b></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>basket<span class="token punctuation">.</span>count<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/b> items
   in your basket, &lt;em></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>basket<span class="token punctuation">.</span>onSale<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/em>
  are on sale!
</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 普通字符串</span>
<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">In JavaScript '\n' is a line-feed.</span><span class="token template-punctuation string">`</span></span>

<span class="token comment">// 多行字符串</span>
<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">In JavaScript this is
 not legal.</span><span class="token template-punctuation string">`</span></span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">string text line 1
string text line 2</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 字符串中嵌入变量</span>
<span class="token keyword">let</span> name <span class="token operator">=</span> <span class="token string">"Bob"</span><span class="token punctuation">,</span> time <span class="token operator">=</span> <span class="token string">"today"</span><span class="token punctuation">;</span>
<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, how are you </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>time<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">?</span><span class="token template-punctuation string">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中的模板字符串，都是用反引号表示。如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> greeting <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">\`Yo\` World!</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#list'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
&lt;ul>
  &lt;li>first&lt;/li>
  &lt;li>second&lt;/li>
&lt;/ul>
</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，所有模板字符串的空格和换行，都是被保留的，比如<code v-pre>&lt;ul&gt;</code>标签前面会有一个换行。如果你不想要这个换行，可以使用<code v-pre>trim</code>方法消除它。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'#list'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
&lt;ul>
  &lt;li>first&lt;/li>
  &lt;li>second&lt;/li>
&lt;/ul>
</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>模板字符串中嵌入变量，需要将变量名写在<code v-pre>${}</code>之中。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">authorize</span><span class="token punctuation">(</span><span class="token parameter">user<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>user<span class="token punctuation">.</span><span class="token function">hasPrivilege</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>
      <span class="token comment">// 传统写法为</span>
      <span class="token comment">// 'User '</span>
      <span class="token comment">// + user.name</span>
      <span class="token comment">// + ' is not authorized to do '</span>
      <span class="token comment">// + action</span>
      <span class="token comment">// + '.'</span>
      <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">User </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>user<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> is not authorized to do </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>action<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> y <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>x<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> + </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>y<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> = </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>x <span class="token operator">+</span> y<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
<span class="token comment">// "1 + 2 = 3"</span>

<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>x<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> + </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>y <span class="token operator">*</span> <span class="token number">2</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> = </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>x <span class="token operator">+</span> y <span class="token operator">*</span> <span class="token number">2</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
<span class="token comment">// "1 + 4 = 5"</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>obj<span class="token punctuation">.</span>x <span class="token operator">+</span> obj<span class="token punctuation">.</span>y<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
<span class="token comment">// "3"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>模板字符串之中还能调用函数。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token string">"Hello World"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">foo </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> bar</span><span class="token template-punctuation string">`</span></span>
<span class="token comment">// foo Hello World bar</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的<code v-pre>toString</code>方法。</p>
<p>如果模板字符串中的变量没有声明，将报错。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 变量place没有声明</span>
<span class="token keyword">let</span> msg <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>place<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
<span class="token comment">// 报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于模板字符串的大括号内部，就是执行 JavaScript 代码，因此如果大括号内部是一个字符串，将会原样输出。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token string">'World'</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
<span class="token comment">// "Hello World"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>模板字符串甚至还能嵌套。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">tmpl</span> <span class="token operator">=</span> <span class="token parameter">addrs</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
  &lt;table>
  </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>addrs<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">addr</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
    &lt;tr>&lt;td></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>addr<span class="token punctuation">.</span>first<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/td>&lt;/tr>
    &lt;tr>&lt;td></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>addr<span class="token punctuation">.</span>last<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/td>&lt;/tr>
  </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
  &lt;/table>
</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，模板字符串的变量之中，又嵌入了另一个模板字符串，使用方法如下。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">first</span><span class="token operator">:</span> <span class="token string">'&lt;Jane>'</span><span class="token punctuation">,</span> <span class="token literal-property property">last</span><span class="token operator">:</span> <span class="token string">'Bond'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">first</span><span class="token operator">:</span> <span class="token string">'Lars'</span><span class="token punctuation">,</span> <span class="token literal-property property">last</span><span class="token operator">:</span> <span class="token string">'&lt;Croft>'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">tmpl</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// &lt;table></span>
<span class="token comment">//</span>
<span class="token comment">//   &lt;tr>&lt;td>&lt;Jane>&lt;/td>&lt;/tr></span>
<span class="token comment">//   &lt;tr>&lt;td>Bond&lt;/td>&lt;/tr></span>
<span class="token comment">//</span>
<span class="token comment">//   &lt;tr>&lt;td>Lars&lt;/td>&lt;/tr></span>
<span class="token comment">//   &lt;tr>&lt;td>&lt;Croft>&lt;/td>&lt;/tr></span>
<span class="token comment">//</span>
<span class="token comment">// &lt;/table></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果需要引用模板字符串本身，在需要时执行，可以写成函数。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token function-variable function">func</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">!</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
<span class="token function">func</span><span class="token punctuation">(</span><span class="token string">'Jack'</span><span class="token punctuation">)</span> <span class="token comment">// "Hello Jack!"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，模板字符串写成了一个函数的返回值。执行这个函数，就相当于执行这个模板字符串了。</p>
<h2 id="实例-模板编译" tabindex="-1"><a class="header-anchor" href="#实例-模板编译" aria-hidden="true">#</a> 实例：模板编译</h2>
<p>下面，我们来看一个通过模板字符串，生成正式模板的实例。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> template <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
&lt;ul>
  &lt;% for(let i=0; i &lt; data.supplies.length; i++) { %>
    &lt;li>&lt;%= data.supplies[i] %>&lt;/li>
  &lt;% } %>
&lt;/ul>
</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码在模板字符串之中，放置了一个常规模板。该模板使用<code v-pre>&lt;%...%&gt;</code>放置 JavaScript 代码，使用<code v-pre>&lt;%= ... %&gt;</code>输出 JavaScript 表达式。</p>
<p>怎么编译这个模板字符串呢？</p>
<p>一种思路是将其转换为 JavaScript 表达式字符串。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">echo</span><span class="token punctuation">(</span><span class="token string">'&lt;ul>'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> data<span class="token punctuation">.</span>supplies<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">echo</span><span class="token punctuation">(</span><span class="token string">'&lt;li>'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">echo</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>supplies<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">echo</span><span class="token punctuation">(</span><span class="token string">'&lt;/li>'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token function">echo</span><span class="token punctuation">(</span><span class="token string">'&lt;/ul>'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个转换使用正则表达式就行了。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> evalExpr <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">&lt;%=(.+?)%></span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> expr <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">&lt;%([\s\S]+?)%></span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>

template <span class="token operator">=</span> template
  <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>evalExpr<span class="token punctuation">,</span> <span class="token string">'`); \n  echo( $1 ); \n  echo(`'</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>expr<span class="token punctuation">,</span> <span class="token string">'`); \n $1 \n  echo(`'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

template <span class="token operator">=</span> <span class="token string">'echo(`'</span> <span class="token operator">+</span> template <span class="token operator">+</span> <span class="token string">'`);'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，将<code v-pre>template</code>封装在一个函数里面返回，就可以了。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> script <span class="token operator">=</span>
<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">(function parse(data){
  let output = "";

  function echo(html){
    output += html;
  }

  </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> template <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">

  return output;
})</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>

<span class="token keyword">return</span> script<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将上面的内容拼装成一个模板编译函数<code v-pre>compile</code>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">compile</span><span class="token punctuation">(</span><span class="token parameter">template</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">const</span> evalExpr <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">&lt;%=(.+?)%></span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> expr <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">&lt;%([\s\S]+?)%></span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>

  template <span class="token operator">=</span> template
    <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>evalExpr<span class="token punctuation">,</span> <span class="token string">'`); \n  echo( $1 ); \n  echo(`'</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>expr<span class="token punctuation">,</span> <span class="token string">'`); \n $1 \n  echo(`'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  template <span class="token operator">=</span> <span class="token string">'echo(`'</span> <span class="token operator">+</span> template <span class="token operator">+</span> <span class="token string">'`);'</span><span class="token punctuation">;</span>

  <span class="token keyword">let</span> script <span class="token operator">=</span>
  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">(function parse(data){
    let output = "";

    function echo(html){
      output += html;
    }

    </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> template <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">

    return output;
  })</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> script<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>compile</code>函数的用法如下。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> parse <span class="token operator">=</span> <span class="token function">eval</span><span class="token punctuation">(</span><span class="token function">compile</span><span class="token punctuation">(</span>template<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
div<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token function">parse</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">supplies</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token string">"broom"</span><span class="token punctuation">,</span> <span class="token string">"mop"</span><span class="token punctuation">,</span> <span class="token string">"cleaner"</span> <span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//   &lt;ul></span>
<span class="token comment">//     &lt;li>broom&lt;/li></span>
<span class="token comment">//     &lt;li>mop&lt;/li></span>
<span class="token comment">//     &lt;li>cleaner&lt;/li></span>
<span class="token comment">//   &lt;/ul></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="标签模板" tabindex="-1"><a class="header-anchor" href="#标签模板" aria-hidden="true">#</a> 标签模板</h2>
<p>模板字符串的功能，不仅仅是上面这些。它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>alert<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">123</span><span class="token template-punctuation string">`</span></span>
<span class="token comment">// 等同于</span>
<span class="token function">alert</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>标签模板其实不是模板，而是函数调用的一种特殊形式</strong>。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。</p>
<p>但是，如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>

tag<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> a <span class="token operator">+</span> b <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> world </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> a <span class="token operator">*</span> b <span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
<span class="token function">tag</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'Hello '</span><span class="token punctuation">,</span> <span class="token string">' world '</span><span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，模板字符串前面有一个标识名<code v-pre>tag</code>，它是一个函数。整个表达式的返回值，就是<code v-pre>tag</code>函数处理模板字符串后的返回值。</p>
<p>函数<code v-pre>tag</code>依次会接收到多个参数。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">tag</span><span class="token punctuation">(</span><span class="token parameter">stringArr<span class="token punctuation">,</span> value1<span class="token punctuation">,</span> value2</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token comment">// 等同于</span>

<span class="token keyword">function</span> <span class="token function">tag</span><span class="token punctuation">(</span><span class="token parameter">stringArr<span class="token punctuation">,</span> <span class="token operator">...</span>values</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>tag</code>函数的第一个参数是一个数组，该数组的成员是模板字符串中那些没有变量替换的部分，也就是说，变量替换只发生在数组的第一个成员与第二个成员之间、第二个成员与第三个成员之间，以此类推。</p>
<p><code v-pre>tag</code>函数的其他参数，都是模板字符串各个变量被替换后的值。由于本例中，模板字符串含有两个变量，因此<code v-pre>tag</code>会接受到<code v-pre>value1</code>和<code v-pre>value2</code>两个参数。</p>
<p><code v-pre>tag</code>函数所有参数的实际值如下。</p>
<ul>
<li>第一个参数：<code v-pre>['Hello ', ' world ', '']</code></li>
<li>第二个参数: 15</li>
<li>第三个参数：50</li>
</ul>
<p>也就是说，<code v-pre>tag</code>函数实际上以下面的形式调用。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">tag</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'Hello '</span><span class="token punctuation">,</span> <span class="token string">' world '</span><span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以按照需要编写<code v-pre>tag</code>函数的代码。下面是<code v-pre>tag</code>函数的一种写法，以及运行结果。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">tag</span><span class="token punctuation">(</span><span class="token parameter">s<span class="token punctuation">,</span> v1<span class="token punctuation">,</span> v2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>s<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>s<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>s<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>v1<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>v2<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token string">"OK"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

tag<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> a <span class="token operator">+</span> b <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> world </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> a <span class="token operator">*</span> b<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
<span class="token comment">// "Hello "</span>
<span class="token comment">// " world "</span>
<span class="token comment">// ""</span>
<span class="token comment">// 15</span>
<span class="token comment">// 50</span>
<span class="token comment">// "OK"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是一个更复杂的例子。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> total <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> msg <span class="token operator">=</span> passthru<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">The total is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>total<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>total<span class="token operator">*</span><span class="token number">1.05</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> with tax)</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">passthru</span><span class="token punctuation">(</span><span class="token parameter">literals</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> literals<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result <span class="token operator">+=</span> literals<span class="token punctuation">[</span>i<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      result <span class="token operator">+=</span> arguments<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

msg <span class="token comment">// "The total is 30 (31.5 with tax)"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这个例子展示了，如何将各个参数按照原来的位置拼合回去。</p>
<p><code v-pre>passthru</code>函数采用 rest 参数的写法如下。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">passthru</span><span class="token punctuation">(</span><span class="token parameter">literals<span class="token punctuation">,</span> <span class="token operator">...</span>values</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> output <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> index<span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span>index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index <span class="token operator">&lt;</span> values<span class="token punctuation">.</span>length<span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    output <span class="token operator">+=</span> literals<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">+</span> values<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  output <span class="token operator">+=</span> literals<span class="token punctuation">[</span>index<span class="token punctuation">]</span>
  <span class="token keyword">return</span> output<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>“标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> message <span class="token operator">=</span>
  SaferHTML<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;p></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>sender<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> has sent you a message.&lt;/p></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">SaferHTML</span><span class="token punctuation">(</span><span class="token parameter">templateData</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> s <span class="token operator">=</span> templateData<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> arg <span class="token operator">=</span> <span class="token function">String</span><span class="token punctuation">(</span>arguments<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Escape special characters in the substitution.</span>
    s <span class="token operator">+=</span> arg<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">&amp;</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">"&amp;amp;"</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">&lt;</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">"&amp;lt;"</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">></span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">"&amp;gt;"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Don't escape special characters in the template.</span>
    s <span class="token operator">+=</span> templateData<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>sender</code>变量往往是用户提供的，经过<code v-pre>SaferHTML</code>函数处理，里面的特殊字符都会被转义。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> sender <span class="token operator">=</span> <span class="token string">'&lt;script>alert("abc")&lt;/script>'</span><span class="token punctuation">;</span> <span class="token comment">// 恶意代码</span>
<span class="token keyword">let</span> message <span class="token operator">=</span> SaferHTML<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;p></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>sender<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> has sent you a message.&lt;/p></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>

message
<span class="token comment">// &lt;p>&amp;lt;script&amp;gt;alert("abc")&amp;lt;/script&amp;gt; has sent you a message.&lt;/p></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>标签模板的另一个应用，就是多语言转换（国际化处理）</strong>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>i18n<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Welcome to </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>siteName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, you are visitor number </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>visitorNumber<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">!</span><span class="token template-punctuation string">`</span></span>
<span class="token comment">// "欢迎访问xxx，您是第xxxx位访问者！"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>模板字符串本身并不能取代 Mustache 之类的模板库，因为没有条件判断和循环处理功能，但是通过标签函数，你可以自己添加这些功能。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 下面的hashTemplate函数</span>
<span class="token comment">// 是一个自定义的模板处理函数</span>
<span class="token keyword">let</span> libraryHtml <span class="token operator">=</span> hashTemplate<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
  &lt;ul>
    #for book in </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>myBooks<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
      &lt;li>&lt;i>#{book.title}&lt;/i> by #{book.author}&lt;/li>
    #end
  &lt;/ul>
</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外，你甚至可以使用标签模板，在 JavaScript 语言之中嵌入其他语言。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>jsx<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
  &lt;div>
    &lt;input
      ref='input'
      onChange='</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>handleChange<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">'
      defaultValue='</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">' />
      </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
   &lt;/div>
</span><span class="token template-punctuation string">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码通过<code v-pre>jsx</code>函数，将一个 DOM 字符串转为 React 对象。你可以在 GitHub 找到<code v-pre>jsx</code>函数的<a href="https://gist.github.com/lygaret/a68220defa69174bdec5" target="_blank" rel="noopener noreferrer">具体实现<ExternalLinkIcon/></a>。</p>
<p>下面则是一个假想的例子，通过<code v-pre>java</code>函数，在 JavaScript 代码之中运行 Java 代码。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>java<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
class HelloWorldApp {
  public static void main(String[] args) {
    System.out.println("Hello World!"); // Display the string.
  }
}
</span><span class="token template-punctuation string">`</span></span>
HelloWorldApp<span class="token punctuation">.</span><span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>模板处理函数的第一个参数（模板字符串数组），还有一个<code v-pre>raw</code>属性。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span>log<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">123</span><span class="token template-punctuation string">`</span></span>
<span class="token comment">// ["123", raw: Array[1]]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>console.log</code>接受的参数，实际上是一个数组。该数组有一个<code v-pre>raw</code>属性，保存的是转义后的原字符串。</p>
<p>请看下面的例子。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>tag<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">First line\nSecond line</span><span class="token template-punctuation string">`</span></span>

<span class="token keyword">function</span> <span class="token function">tag</span><span class="token punctuation">(</span><span class="token parameter">strings</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span>raw<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// strings.raw[0] 为 "First line\\nSecond line"</span>
  <span class="token comment">// 打印输出 "First line\nSecond line"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>tag</code>函数的第一个参数<code v-pre>strings</code>，有一个<code v-pre>raw</code>属性，也指向一个数组。该数组的成员与<code v-pre>strings</code>数组完全一致。比如，<code v-pre>strings</code>数组是<code v-pre>[&quot;First line\nSecond line&quot;]</code>，那么<code v-pre>strings.raw</code>数组就是<code v-pre>[&quot;First line\\nSecond line&quot;]</code>。两者唯一的区别，就是字符串里面的斜杠都被转义了。比如，strings.raw 数组会将<code v-pre>\n</code>视为<code v-pre>\\</code>和<code v-pre>n</code>两个字符，而不是换行符。这是为了方便取得转义之前的原始模板而设计的。</p>
<h2 id="模板字符串的限制" tabindex="-1"><a class="header-anchor" href="#模板字符串的限制" aria-hidden="true">#</a> 模板字符串的限制</h2>
<p>前面提到标签模板里面，可以内嵌其他语言。但是，模板字符串默认会将字符串转义，导致无法嵌入其他语言。</p>
<p>举例来说，标签模板里面可以嵌入 LaTEX 语言。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">latex</span><span class="token punctuation">(</span><span class="token parameter">strings</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> document <span class="token operator">=</span> latex<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
\newcommand{\fun}{\textbf{Fun!}}  // 正常工作
\newcommand{\unicode}{\textbf{Unicode!}} // 报错
\newcommand{\xerxes}{\textbf{King!}} // 报错

Breve over the h goes \u{h}ere // 报错
</span><span class="token template-punctuation string">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，变量<code v-pre>document</code>内嵌的模板字符串，对于 LaTEX 语言来说完全是合法的，但是 JavaScript 引擎会报错。原因就在于字符串的转义。</p>
<p>模板字符串会将<code v-pre>\u00FF</code>和<code v-pre>\u{42}</code>当作 Unicode 字符进行转义，所以<code v-pre>\unicode</code>解析时报错；而<code v-pre>\x56</code>会被当作十六进制字符串转义，所以<code v-pre>\xerxes</code>会报错。也就是说，<code v-pre>\u</code>和<code v-pre>\x</code>在 LaTEX 里面有特殊含义，但是 JavaScript 将它们转义了。</p>
<p>为了解决这个问题，ES2018 <a href="https://tc39.github.io/proposal-template-literal-revision/" target="_blank" rel="noopener noreferrer">放松<ExternalLinkIcon/></a>了对标签模板里面的字符串转义的限制。如果遇到不合法的字符串转义，就返回<code v-pre>undefined</code>，而不是报错，并且从<code v-pre>raw</code>属性上面可以得到原始字符串。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">tag</span><span class="token punctuation">(</span><span class="token parameter">strs</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  strs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token keyword">undefined</span>
  strs<span class="token punctuation">.</span>raw<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">"\\unicode and \\u{55}"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
tag<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">\unicode and \u{55}</span><span class="token template-punctuation string">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，模板字符串原本是应该报错的，但是由于放松了对字符串转义的限制，所以不报错了，JavaScript 引擎将第一个字符设置为<code v-pre>undefined</code>，但是<code v-pre>raw</code>属性依然可以得到原始字符串，因此<code v-pre>tag</code>函数还是可以对原字符串进行处理。</p>
<p>注意，这种对字符串转义的放松，只在标签模板解析字符串时生效，不是标签模板的场合，依然会报错。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> bad <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">bad escape sequence: \unicode</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span> <span class="token comment">// 报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


