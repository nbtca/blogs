<template><div><h1 id="变量声明" tabindex="-1"><a class="header-anchor" href="#变量声明" aria-hidden="true">#</a> 变量声明</h1>
<p><code v-pre>let</code> 和 <code v-pre>const</code> 是 JavaScript 里相对较新的变量声明方式。<code v-pre>let</code> 在很多方面与 <code v-pre>var</code> 是相似的，但是可以帮助大家避免在 JavaScript 里常见一些问题。<code v-pre>const</code> 是对 <code v-pre>let</code> 的一个增强，它能阻止对一个变量再次赋值。</p>
<p>因为 TypeScript 是 JavaScript 的超集，所以它本身就支持 <code v-pre>let</code> 和 <code v-pre>const</code>。 下面我们会详细说明这些新的声明方式以及为什么推荐使用它们来代替 <code v-pre>var</code>。</p>
<p>如果你已经对 <code v-pre>var</code> 声明的怪异之处了如指掌，那么你可以轻松地略过这节。</p>
<h2 id="var-声明" tabindex="-1"><a class="header-anchor" href="#var-声明" aria-hidden="true">#</a> var 声明</h2>
<p>在 ES5 的时代，我们都是通过 <code v-pre>var</code> 关键字定义JavaScript 变量：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>大家都能理解，这里定义了一个名为 <code v-pre>a</code> 值为 <code v-pre>10</code> 的变量。</p>
<p>我们也可以在函数内部定义变量：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> message <span class="token operator">=</span> <span class="token string">'Hello World!'</span>

  <span class="token keyword">return</span> message
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并且我们也可以在其它函数内部访问相同的变量：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">10</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">g</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> b <span class="token operator">=</span> a <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token keyword">return</span> b
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> g <span class="token operator">=</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">g</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// returns 11</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子是一个典型的闭包场景，<code v-pre>g</code> 可以获取到 <code v-pre>f</code> 函数里定义的 <code v-pre>a</code> 变量。 每当 <code v-pre>g</code> 被调用时，它都可以访问到 <code v-pre>f</code> 里的 <code v-pre>a</code> 变量。 即使当 <code v-pre>g</code> 在 <code v-pre>f</code> 已经执行完后才被调用，它仍然可以访问 <code v-pre>a</code>。</p>
<h3 id="作用域规则" tabindex="-1"><a class="header-anchor" href="#作用域规则" aria-hidden="true">#</a> 作用域规则</h3>
<p><code v-pre>var</code> 声明有些奇怪的作用域规则。 看下面的例子：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token parameter">shouldInitialize</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>shouldInitialize<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">10</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> x
<span class="token punctuation">}</span>

<span class="token function">f</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>  <span class="token comment">// returns '10'</span>
<span class="token function">f</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token comment">// returns 'undefined'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有些同学可能要多看几遍这个例子。 变量 <code v-pre>x</code> 是定义在 <code v-pre>if</code> 语句里面，但是我们却可以在语句的外面访问它。 这是因为 <code v-pre>var</code> 声明的作用域是函数作用域，函数参数也使用函数作用域。</p>
<p>这些作用域规则可能会引发一些错误。 其中之一就是，多次声明同一个变量并不会报错：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">sumMatrix</span><span class="token punctuation">(</span><span class="token parameter">matrix</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> sum <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> matrix<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> currentRow <span class="token operator">=</span> matrix<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> currentRow<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      sum <span class="token operator">+=</span> currentRow<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> sum
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里很容易看出一些问题，里层的 <code v-pre>for</code> 循环会覆盖变量 <code v-pre>i</code>，因为所有 <code v-pre>i</code> 都引用相同的函数作用域内的变量。 有经验的开发者们很清楚，这些问题可能在代码审查时漏掉，引发无穷的麻烦。</p>
<h3 id="捕获变量怪异之处" tabindex="-1"><a class="header-anchor" href="#捕获变量怪异之处" aria-hidden="true">#</a> 捕获变量怪异之处</h3>
<p>猜一下下面的代码会返回什么：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span> <span class="token operator">*</span> i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>答案是，<code v-pre>setTimeout</code> 会在若干毫秒的延时后执行一个函数（等待其它代码执行完毕）：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token number">10</span>
<span class="token number">10</span>
<span class="token number">10</span>
<span class="token number">10</span>
<span class="token number">10</span>
<span class="token number">10</span>
<span class="token number">10</span>
<span class="token number">10</span>
<span class="token number">10</span>
<span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很多 JavaScript 程序员对这种行为已经很熟悉了，但如果你很不解也没有关系，因为你并不是一个人。 大多数人期望输出结果是这样：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token number">0</span>
<span class="token number">1</span>
<span class="token number">2</span>
<span class="token number">3</span>
<span class="token number">4</span>
<span class="token number">5</span>
<span class="token number">6</span>
<span class="token number">7</span>
<span class="token number">8</span>
<span class="token number">9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>我们传给 <code v-pre>setTimeout</code> 的每一个函数表达式实际上都引用了相同作用域里的同一个 <code v-pre>i</code>。</p>
</blockquote>
<p>让我们花点时间思考一下这是为什么。 <code v-pre>setTimeout</code> 在若干毫秒后执行一个函数，并且是在 <code v-pre>for</code> 循环结束后。<code v-pre>for</code> 循环结束后，<code v-pre>i</code> 的值为 <code v-pre>10</code>。 所以当函数被调用的时候，它会打印出 <code v-pre>10</code>。</p>
<p>一个通常的解决方法是使用立即执行的函数表达式（IIFE）来捕获每次迭代时 <code v-pre>i</code> 的值：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span> <span class="token operator">*</span> i<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种奇怪的形式我们已经司空见惯了。 参数 <code v-pre>i</code> 会覆盖 <code v-pre>for</code> 循环里的 <code v-pre>i</code>，但是因为我们起了同样的名字，所以我们不用怎么改 <code v-pre>for</code> 循环体里的代码。</p>
<h2 id="let-声明" tabindex="-1"><a class="header-anchor" href="#let-声明" aria-hidden="true">#</a> let 声明</h2>
<p>现在你已经知道了 <code v-pre>var</code> 存在一些问题，这恰好说明了为什么用 <code v-pre>let</code> 语句来声明变量。 除了名字不同外， <code v-pre>let</code> 与 <code v-pre>var</code> 的写法一致：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> hello <span class="token operator">=</span> <span class="token string">'Hello!'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>主要的区别不在语法上，而是语义，我们接下来会深入研究。</p>
<h3 id="块作用域" tabindex="-1"><a class="header-anchor" href="#块作用域" aria-hidden="true">#</a> 块作用域</h3>
<p>当用 <code v-pre>let</code> 声明一个变量，它使用的是块作用域。 不同于使用 <code v-pre>var</code> 声明的变量那样可以在包含它们的函数外访问，块作用域变量在包含它们的块或 <code v-pre>for</code> 循环之外是不能访问的。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span>input<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">100</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// OK: 仍然能访问到 a</span>
    <span class="token keyword">let</span> b <span class="token operator">=</span> a <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token keyword">return</span> b
  <span class="token punctuation">}</span>

  <span class="token comment">// Error: 'b' 在这里不存在</span>
  <span class="token keyword">return</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们定义了 2 个变量 <code v-pre>a</code> 和 <code v-pre>b</code>。 <code v-pre>a</code> 的作用域是 <code v-pre>f</code> 函数体内，而 <code v-pre>b</code> 的作用域是 <code v-pre>if</code> 语句块里。</p>
<p>在 <code v-pre>catch</code> 语句里声明的变量也具有同样的作用域规则。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token string">'Oh no!'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Catch it.'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Error: 'e' 在这里不存在</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>拥有块级作用域的变量的另一个特点是，它们不能在被声明之前读或写。 虽然这些变量始终“存在”于它们的作用域里，但在直到声明它的代码之前的区域都属于<em>暂时性死区</em>。 它只是用来说明我们不能在 <code v-pre>let</code> 语句之前访问它们，幸运的是 <code v-pre>TypeScript</code> 可以告诉我们这些信息。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>a<span class="token operator">++</span> <span class="token comment">// TS2448: Block-scoped variable 'a' used before its declaration.</span>
<span class="token keyword">let</span> a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意一点，我们仍然可以在一个拥有块作用域变量被声明前获取它。 只是我们不能在变量声明前去调用那个函数。 如果生成代码目标为 ES2015，现代的运行时会抛出一个错误；然而，现今 TypeScript 是不会报错的。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// okay to capture 'a'</span>
  <span class="token keyword">return</span> a
<span class="token punctuation">}</span>

<span class="token comment">// 不能在'a'被声明前调用'foo'</span>
<span class="token comment">// 运行时应该抛出错误</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">let</span> a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于<em>暂时性死区</em>的更多信息，查看这里 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_let" target="_blank" rel="noopener noreferrer">Mozilla Developer Network<ExternalLinkIcon/></a>。</p>
<h3 id="重定义及屏蔽" tabindex="-1"><a class="header-anchor" href="#重定义及屏蔽" aria-hidden="true">#</a> 重定义及屏蔽</h3>
<p>我们提过使用 <code v-pre>var</code> 声明时，它不在乎你声明多少次；你只会得到 1 个。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> x
  <span class="token keyword">var</span> x

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> x
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子里，所有 <code v-pre>x</code> 的声明实际上都引用一个相同的<code v-pre>x</code>，并且这是完全有效的代码，但这经常会成为 <code v-pre>bug</code> 的来源。幸运的是 <code v-pre>let</code> 的声明就不会这么宽松了。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token number">10</span>
<span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token number">20</span> <span class="token comment">// 错误，不能在 1 个作用域里多次声明 x</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>并不是要求两个均是块级作用域的声明 TypeScript 才会给出一个错误的警告。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token number">100</span> <span class="token comment">// Error: 干扰参数声明</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">g</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token number">100</span>
  <span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">100</span> <span class="token comment">// Error: 不能同时具有 x 的两个声明</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并不是说块级作用域变量不能用函数作用域变量来声明。 而是块级作用域变量需要在明显不同的块里声明。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span>condition<span class="token punctuation">,</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>condition<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token number">100</span>
    <span class="token keyword">return</span> x
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> x
<span class="token punctuation">}</span>

<span class="token function">f</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// returns 0</span>
<span class="token function">f</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>  <span class="token comment">// returns 100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在一个嵌套作用域里引入一个新名字的行为称做屏蔽。 它是一把双刃剑，它可能会不小心地引入新问题，同时也可能会解决一些错误。 例如，假设我们现在用 <code v-pre>let</code> 重写之前的 <code v-pre>sumMatrix</code> 函数。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">sumMatrix</span><span class="token punctuation">(</span>matrix<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> sum <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> matrix<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> currentRow <span class="token operator">=</span> matrix<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> currentRow<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      sum <span class="token operator">+=</span> currentRow<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> sum
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个版本的循环能得到正确的结果，因为内层循环的 <code v-pre>i</code> 可以屏蔽掉外层循环的 <code v-pre>i</code>。</p>
<p>通常来讲应该避免使用屏蔽，因为我们需要写出清晰的代码。 同时也有些场景适合利用它，你需要好好权衡一下。</p>
<h3 id="块级作用域变量的获取" tabindex="-1"><a class="header-anchor" href="#块级作用域变量的获取" aria-hidden="true">#</a> 块级作用域变量的获取</h3>
<p>每次进入一个作用域时，<code v-pre>let</code> 会创建一个变量的环境。就算作用域内代码已经执行完毕，这个环境与其捕获的变量依然存在。</p>
<p>回想一下前面 <code v-pre>setTimeout</code> 的例子，我们最后需要使用立即执行的函数表达式来获取每次 <code v-pre>for</code> 循环迭代里的状态。 实际上，我们做的是为获取到的变量创建了一个新的变量环境。 这样做挺痛苦的，但是幸运的是，你不必在 <code v-pre>TypeScript</code> 里这样做了。</p>
<p>当 <code v-pre>let</code> 声明出现在循环体里时拥有完全不同的行为。不仅是在循环里引入了一个新的变量环境，而且针对每次迭代都会创建这样一个新作用域，这就相当于我们在使用立即执行的函数表达式时做的事。所以在 <code v-pre>setTimeout</code> 例子里我们仅使用 <code v-pre>let</code> 声明就可以了。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span> <span class="token operator">*</span> i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会输出与预料一致的结果：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token number">0</span>
<span class="token number">1</span>
<span class="token number">2</span>
<span class="token number">3</span>
<span class="token number">4</span>
<span class="token number">5</span>
<span class="token number">6</span>
<span class="token number">7</span>
<span class="token number">8</span>
<span class="token number">9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="const-声明" tabindex="-1"><a class="header-anchor" href="#const-声明" aria-hidden="true">#</a> const 声明</h2>
<p><code v-pre>const</code> 声明是声明变量的另一种方式。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> numLivesForCat <span class="token operator">=</span> <span class="token number">9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它们与 <code v-pre>let</code> 声明相似，但是就像它的名字所表达的，它们被赋值后不能再改变。 换句话说，它们拥有与 <code v-pre>let</code> 相同的作用域规则，但是不能对它们重新赋值。</p>
<p>这很好理解，它们引用的值是不可变的。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> numLivesForCat <span class="token operator">=</span> <span class="token number">9</span>
<span class="token keyword">const</span> kitty <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">'Kitty'</span><span class="token punctuation">,</span>
  numLives<span class="token operator">:</span> numLivesForCat
<span class="token punctuation">}</span>

<span class="token comment">// Error</span>
kitty <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">'Tommy'</span><span class="token punctuation">,</span>
  numLives<span class="token operator">:</span> numLivesForCat
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// OK</span>
kitty<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'Jerry'</span>
kitty<span class="token punctuation">.</span>numLives<span class="token operator">--</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除非你使用特殊的方法去避免，实际上 <code v-pre>const</code> 变量的内部状态是可修改的。 幸运的是，<code v-pre>TypeScript</code> 允许你将对象的成员设置成只读的。接口一章有详细说明。</p>
<h2 id="let-vs-const" tabindex="-1"><a class="header-anchor" href="#let-vs-const" aria-hidden="true">#</a> let vs. const</h2>
<p>现在我们有两种作用域相似的声明方式，我们自然会问到底应该使用哪个。与大多数泛泛的问题一样，答案是：依情况而定。</p>
<p>使用最小特权原则，所有变量除了你计划去修改的都应该使用 <code v-pre>const</code>。 基本原则就是如果一个变量不需要对它写入，那么其它使用这些代码的人也不能够写入它们，并且要思考为什么会需要对这些变量重新赋值。使用 <code v-pre>const</code> 也可以让我们更容易的推测数据的流动。</p>
<h2 id="解构" tabindex="-1"><a class="header-anchor" href="#解构" aria-hidden="true">#</a> 解构</h2>
<h3 id="解构数组" tabindex="-1"><a class="header-anchor" href="#解构数组" aria-hidden="true">#</a> 解构数组</h3>
<p>最简单的解构莫过于数组的解构赋值了：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> input <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> <span class="token punctuation">[</span>first<span class="token punctuation">,</span> second<span class="token punctuation">]</span> <span class="token operator">=</span> input
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>first<span class="token punctuation">)</span> <span class="token comment">// outputs 1</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>second<span class="token punctuation">)</span> <span class="token comment">// outputs 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这创建了 2 个命名变量 <code v-pre>first</code> 和 <code v-pre>second</code>。 相当于使用了索引，但更为方便：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> first <span class="token operator">=</span> input<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> second <span class="token operator">=</span> input<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>作用于函数参数：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> input<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token builtin">number</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span>

<span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">[</span>first<span class="token punctuation">,</span> second<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token builtin">number</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>first<span class="token punctuation">)</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>second<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">f</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以在数组里使用 <code v-pre>...</code> 语法创建剩余变量：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> <span class="token punctuation">[</span>first<span class="token punctuation">,</span> <span class="token operator">...</span>rest<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>first<span class="token punctuation">)</span> <span class="token comment">// outputs 1</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>rest<span class="token punctuation">)</span> <span class="token comment">// outputs [ 2, 3, 4 ]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你也可以忽略你不关心的尾随元素：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> <span class="token punctuation">[</span>first<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>first<span class="token punctuation">)</span> <span class="token comment">// outputs 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>或其它元素：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> <span class="token punctuation">[</span><span class="token punctuation">,</span> second<span class="token punctuation">,</span> <span class="token punctuation">,</span> fourth<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="对象解构" tabindex="-1"><a class="header-anchor" href="#对象解构" aria-hidden="true">#</a> 对象解构</h3>
<p>你也可以解构对象：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> o <span class="token operator">=</span> <span class="token punctuation">{</span>
    a<span class="token operator">:</span> <span class="token string">'foo'</span><span class="token punctuation">,</span>
    b<span class="token operator">:</span> <span class="token number">12</span><span class="token punctuation">,</span>
    c<span class="token operator">:</span> <span class="token string">'bar'</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> <span class="token punctuation">{</span> a<span class="token punctuation">,</span> b <span class="token punctuation">}</span> <span class="token operator">=</span> o

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这通过 <code v-pre>o.a</code> 和 <code v-pre>o.b</code> 创建了 <code v-pre>a</code> 和 <code v-pre>b</code> 。 注意，如果你不需要 <code v-pre>c</code> 你可以忽略它。</p>
<p>你可以在对象里使用 <code v-pre>...</code> 语法创建剩余变量：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> <span class="token punctuation">{</span> a<span class="token punctuation">,</span> <span class="token operator">...</span>passthrough <span class="token punctuation">}</span> <span class="token operator">=</span> o
<span class="token keyword">let</span> total <span class="token operator">=</span> passthrough<span class="token punctuation">.</span>b <span class="token operator">+</span> passthrough<span class="token punctuation">.</span>c<span class="token punctuation">.</span>length
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="属性重命名" tabindex="-1"><a class="header-anchor" href="#属性重命名" aria-hidden="true">#</a> 属性重命名</h3>
<p>你也可以给属性以不同的名字：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> <span class="token punctuation">{</span> a<span class="token operator">:</span> newName1<span class="token punctuation">,</span> b<span class="token operator">:</span> newName2 <span class="token punctuation">}</span> <span class="token operator">=</span> o
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里的语法开始变得混乱。 你可以将 <code v-pre>a: newName1</code> 读做 <code v-pre>&quot;a 作为 newName1&quot;</code>。 方向是从左到右，好像你写成了以下样子：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> newName1 <span class="token operator">=</span> o<span class="token punctuation">.</span>a
<span class="token keyword">let</span> newName2 <span class="token operator">=</span> o<span class="token punctuation">.</span>b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>令人困惑的是，这里的冒号不是指示类型的。 如果你想指定它的类型，仍然需要在其后写上完整的模式。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> <span class="token punctuation">{</span>a<span class="token punctuation">,</span> b<span class="token punctuation">}</span><span class="token operator">:</span> <span class="token punctuation">{</span>a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">}</span> <span class="token operator">=</span> o
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="默认值" tabindex="-1"><a class="header-anchor" href="#默认值" aria-hidden="true">#</a> 默认值</h3>
<p>默认值可以让你在属性为 <code v-pre>undefined</code> 时使用缺省值：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">keepWholeObject</span><span class="token punctuation">(</span>wholeObject<span class="token operator">:</span> <span class="token punctuation">{</span> a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> b<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> <span class="token punctuation">{</span> a<span class="token punctuation">,</span> b <span class="token operator">=</span> <span class="token number">1001</span> <span class="token punctuation">}</span> <span class="token operator">=</span> wholeObject
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，即使 <code v-pre>b</code> 为 <code v-pre>undefined</code> ， <code v-pre>keepWholeObject</code> 函数的变量 <code v-pre>wholeObject</code> 的属性 <code v-pre>a</code> 和 <code v-pre>b</code> 都会有值。</p>
<h3 id="函数声明" tabindex="-1"><a class="header-anchor" href="#函数声明" aria-hidden="true">#</a> 函数声明</h3>
<p>解构也能用于函数声明。 看以下简单的情况：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name"><span class="token constant">C</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> b<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">{</span> a<span class="token punctuation">,</span> b <span class="token punctuation">}</span><span class="token operator">:</span> <span class="token constant">C</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是，通常情况下更多的是指定默认值，解构默认值有些棘手。 首先，你需要在默认值之前设置其格式。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">{</span> a <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">,</span> b <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>上面的代码是一个类型推断的例子，将在后续章节介绍。</p>
</blockquote>
<p>其次，你需要知道在解构属性上给予一个默认或可选的属性用来替换主初始化列表。 要知道 C 的定义有一个 b 可选属性：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">{</span> a<span class="token punctuation">,</span> b <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span> a<span class="token operator">:</span> <span class="token string">''</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">{</span> a<span class="token operator">:</span> <span class="token string">'yes'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// OK, 默认 b = 0</span>
<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// OK, 默认 a: '', b = 0</span>
<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// Error, 一旦传入参数则 a 是必须的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要小心使用解构。 从前面的例子可以看出，就算是最简单的解构表达式也是难以理解的。 尤其当存在深层嵌套解构的时候，就算这时没有堆叠在一起的重命名，默认值和类型注解，也是令人难以理解的。 解构表达式要尽量保持小而简单。</p>
<h2 id="展开" tabindex="-1"><a class="header-anchor" href="#展开" aria-hidden="true">#</a> 展开</h2>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> first <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> second <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> bothPlus <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">...</span>first<span class="token punctuation">,</span> <span class="token operator">...</span>second<span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这会令 <code v-pre>bothPlus</code> 的值为 <code v-pre>[0, 1, 2, 3, 4, 5]</code>。 展开操作创建了 <code v-pre>first</code> 和 <code v-pre>second的</code> 一份浅拷贝。 它们不会被展开操作所改变。</p>
<p>你还可以展开对象：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> defaults <span class="token operator">=</span> <span class="token punctuation">{</span> food<span class="token operator">:</span> <span class="token string">'spicy'</span><span class="token punctuation">,</span> price<span class="token operator">:</span> <span class="token string">'$10'</span><span class="token punctuation">,</span> ambiance<span class="token operator">:</span> <span class="token string">'noisy'</span> <span class="token punctuation">}</span>
<span class="token keyword">let</span> search <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">...</span>defaults<span class="token punctuation">,</span> food<span class="token operator">:</span> <span class="token string">'rich'</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>search的值为 <code v-pre>{ food: 'rich', price: '$10', ambiance: 'noisy' }</code>。 对象的展开比数组的展开要复杂的多。像数组展开一样，它是从左至右进行处理，但结果仍为对象。这就意味着出现在展开对象后面的属性会覆盖前面的属性。因此，如果我们修改上面的例子，在结尾处进行展开的话：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> defaults <span class="token operator">=</span> <span class="token punctuation">{</span> food<span class="token operator">:</span> <span class="token string">'spicy'</span><span class="token punctuation">,</span> price<span class="token operator">:</span> <span class="token string">'$10'</span><span class="token punctuation">,</span> ambiance<span class="token operator">:</span> <span class="token string">'noisy'</span> <span class="token punctuation">}</span>
<span class="token keyword">let</span> search <span class="token operator">=</span> <span class="token punctuation">{</span> food<span class="token operator">:</span> <span class="token string">'rich'</span><span class="token punctuation">,</span> <span class="token operator">...</span>defaults <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>那么，<code v-pre>defaults</code> 里的 <code v-pre>food</code> 属性会重写 <code v-pre>food: 'rich'</code>，在这里这并不是我们想要的结果。</p>
</div></template>


