<template><div><h1 id="module-的语法" tabindex="-1"><a class="header-anchor" href="#module-的语法" aria-hidden="true">#</a> Module 的语法</h1>
<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>历史上，JavaScript 一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。其他语言都有这项功能，比如 Ruby 的<code v-pre>require</code>、Python 的<code v-pre>import</code>，甚至就连 CSS 都有<code v-pre>@import</code>，但是 JavaScript 任何这方面的支持都没有，这对开发大型的、复杂的项目形成了巨大障碍。</p>
<!-- more -->
<p>在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。</p>
<p>ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// CommonJS模块</span>
<span class="token keyword">let</span> <span class="token punctuation">{</span> stat<span class="token punctuation">,</span> exists<span class="token punctuation">,</span> readFile <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 等同于</span>
<span class="token keyword">let</span> _fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> stat <span class="token operator">=</span> _fs<span class="token punctuation">.</span>stat<span class="token punctuation">;</span>
<span class="token keyword">let</span> exists <span class="token operator">=</span> _fs<span class="token punctuation">.</span>exists<span class="token punctuation">;</span>
<span class="token keyword">let</span> readfile <span class="token operator">=</span> _fs<span class="token punctuation">.</span>readfile<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的实质是整体加载<code v-pre>fs</code>模块（即加载<code v-pre>fs</code>的所有方法），生成一个对象（<code v-pre>_fs</code>），然后再从这个对象上面读取 3 个方法。<strong>这种加载称为“运行时加载”</strong>，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。</p>
<p>ES6 模块不是对象，而是通过<code v-pre>export</code>命令显式指定输出的代码，再通过<code v-pre>import</code>命令输入。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// ES6模块</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> stat<span class="token punctuation">,</span> exists<span class="token punctuation">,</span> readFile <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'fs'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的实质是从<code v-pre>fs</code>模块加载 3 个方法，其他方法不加载。<strong>这种加载称为“编译时加载”或者静态加载</strong>，**即 ES6 可以在编译时就完成模块加载，**效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。</p>
<p>由于 ES6 模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。</p>
<p>除了静态加载带来的各种好处，ES6 模块还有以下好处。</p>
<ul>
<li>不再需要<code v-pre>UMD</code>模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。</li>
<li>将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者<code v-pre>navigator</code>对象的属性。</li>
<li>不再需要对象作为命名空间（比如<code v-pre>Math</code>对象），未来这些功能可以通过模块提供。</li>
</ul>
<p>本章介绍 ES6 模块的语法，下一章介绍如何在浏览器和 Node 之中，加载 ES6 模块。</p>
<h2 id="严格模式" tabindex="-1"><a class="header-anchor" href="#严格模式" aria-hidden="true">#</a> 严格模式</h2>
<p><strong>ES6 的模块自动采用严格模式</strong>，不管你有没有在模块头部加上<code v-pre>&quot;use strict&quot;;</code>。</p>
<p>严格模式主要有以下限制。</p>
<ul>
<li>变量必须声明后再使用</li>
<li>函数的参数不能有同名属性，否则报错</li>
<li>不能使用<code v-pre>with</code>语句</li>
<li>不能对只读属性赋值，否则报错</li>
<li>不能使用前缀 0 表示八进制数，否则报错</li>
<li>不能删除不可删除的属性，否则报错</li>
<li>不能删除变量<code v-pre>delete prop</code>，会报错，只能删除属性<code v-pre>delete global[prop]</code></li>
<li><code v-pre>eval</code>不会在它的外层作用域引入变量</li>
<li><code v-pre>eval</code>和<code v-pre>arguments</code>不能被重新赋值</li>
<li><code v-pre>arguments</code>不会自动反映函数参数的变化</li>
<li>不能使用<code v-pre>arguments.callee</code></li>
<li>不能使用<code v-pre>arguments.caller</code></li>
<li>禁止<code v-pre>this</code>指向全局对象</li>
<li>不能使用<code v-pre>fn.caller</code>和<code v-pre>fn.arguments</code>获取函数调用的堆栈</li>
<li>增加了保留字（比如<code v-pre>protected</code>、<code v-pre>static</code>和<code v-pre>interface</code>）</li>
</ul>
<p>上面这些限制，模块都必须遵守。由于严格模式是 ES5 引入的，不属于 ES6，所以请参阅相关 ES5 书籍，本书不再详细介绍了。</p>
<p>其中，尤其需要注意<code v-pre>this</code>的限制。ES6 模块之中，顶层的<code v-pre>this</code>指向<code v-pre>undefined</code>，即不应该在顶层代码使用<code v-pre>this</code>。</p>
<h2 id="export-命令" tabindex="-1"><a class="header-anchor" href="#export-命令" aria-hidden="true">#</a> export 命令</h2>
<p>模块功能主要由两个命令构成：<code v-pre>export</code>和<code v-pre>import</code>。<code v-pre>export</code>命令用于规定模块的对外接口，<code v-pre>import</code>命令用于输入其他模块提供的功能。</p>
<p><strong>一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用<code v-pre>export</code>关键字输出该变量</strong>。下面是一个 JS 文件，里面使用<code v-pre>export</code>命令输出变量。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// profile.js</span>
<span class="token keyword">export</span> <span class="token keyword">var</span> firstName <span class="token operator">=</span> <span class="token string">'Michael'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">var</span> lastName <span class="token operator">=</span> <span class="token string">'Jackson'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">var</span> year <span class="token operator">=</span> <span class="token number">1958</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码是<code v-pre>profile.js</code>文件，保存了用户信息。ES6 将其视为一个模块，里面用<code v-pre>export</code>命令对外部输出了三个变量。</p>
<p><code v-pre>export</code>的写法，除了像上面这样，还有另外一种。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// profile.js</span>
<span class="token keyword">var</span> firstName <span class="token operator">=</span> <span class="token string">'Michael'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> lastName <span class="token operator">=</span> <span class="token string">'Jackson'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> year <span class="token operator">=</span> <span class="token number">1958</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span> firstName<span class="token punctuation">,</span> lastName<span class="token punctuation">,</span> year <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码在<code v-pre>export</code>命令后面，使用大括号指定所要输出的一组变量。它与前一种写法（直接放置在<code v-pre>var</code>语句前）是等价的，但是应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。</p>
<p><code v-pre>export</code>命令除了输出变量，还可以输出函数或类（class）。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">multiply</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">*</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码对外输出一个函数<code v-pre>multiply</code>。</p>
<p>通常情况下，<code v-pre>export</code>输出的变量就是本来的名字，但是<strong>可以使用<code v-pre>as</code>关键字重命名</strong>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">v1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">v2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span>
  v1 <span class="token keyword">as</span> streamV1<span class="token punctuation">,</span>
  v2 <span class="token keyword">as</span> streamV2<span class="token punctuation">,</span>
  v2 <span class="token keyword">as</span> streamLatestVersion
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码使用<code v-pre>as</code>关键字，重命名了函数<code v-pre>v1</code>和<code v-pre>v2</code>的对外接口。重命名后，<code v-pre>v2</code>可以用不同的名字输出两次。</p>
<p>需要特别注意的是，<code v-pre>export</code>命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 报错</span>
<span class="token keyword">export</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">// 报错</span>
<span class="token keyword">var</span> m <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> m<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面两种写法都会报错，因为没有提供对外的接口。第一种写法直接输出 1，第二种写法通过变量<code v-pre>m</code>，还是直接输出 1。<code v-pre>1</code>只是一个值，不是接口。正确的写法是下面这样。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 写法一</span>
<span class="token keyword">export</span> <span class="token keyword">var</span> m <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">// 写法二</span>
<span class="token keyword">var</span> m <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span>m<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 写法三</span>
<span class="token keyword">var</span> n <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span>n <span class="token keyword">as</span> m<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面三种写法都是正确的，规定了对外的接口<code v-pre>m</code>。其他脚本可以通过这个接口，取到值<code v-pre>1</code>。它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。</p>
<p>同样的，<code v-pre>function</code>和<code v-pre>class</code>的输出，也必须遵守这样的写法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 报错</span>
<span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">export</span> f<span class="token punctuation">;</span>

<span class="token comment">// 正确</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 正确</span>
<span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span>f<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，<code v-pre>export</code>语句输出的接口，与其对应的<strong>值是动态绑定关系</strong>，即通过该接口，可以取到模块内部实时的值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token string">'bar'</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> foo <span class="token operator">=</span> <span class="token string">'baz'</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码输出变量<code v-pre>foo</code>，值为<code v-pre>bar</code>，500 毫秒之后变成<code v-pre>baz</code>。</p>
<p>这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新，详见下文《Module 的加载实现》一节。</p>
<p>最后，<code v-pre>export</code>命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下一节的<code v-pre>import</code>命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token string">'bar'</span> <span class="token comment">// SyntaxError</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>export</code>语句放在函数之中，结果报错。</p>
<h2 id="import-命令" tabindex="-1"><a class="header-anchor" href="#import-命令" aria-hidden="true">#</a> import 命令</h2>
<p>使用<code v-pre>export</code>命令定义了模块的对外接口以后，其他 JS 文件就可以通过<code v-pre>import</code>命令加载这个模块。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// main.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> firstName<span class="token punctuation">,</span> lastName<span class="token punctuation">,</span> year <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./profile.js'</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token parameter">element</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  element<span class="token punctuation">.</span>textContent <span class="token operator">=</span> firstName <span class="token operator">+</span> <span class="token string">' '</span> <span class="token operator">+</span> lastName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的<code v-pre>import</code>命令，用于加载<code v-pre>profile.js</code>文件，并从中输入变量。<code v-pre>import</code>命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的<strong>变量名，必须与被导入模块（<code v-pre>profile.js</code>）对外接口的名称相同。</strong></p>
<p>如果想为输入的变量重新取一个名字**，<code v-pre>import</code>命令要使用<code v-pre>as</code>关键字，将输入的变量重命名。**</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> lastName <span class="token keyword">as</span> surname <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./profile.js'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong><code v-pre>import</code>命令输入的变量都是只读的</strong>，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>a<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./xxx.js'</span>

a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// Syntax Error : 'a' is read-only;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，脚本加载了变量<code v-pre>a</code>，对其重新赋值就会报错，因为<code v-pre>a</code>是一个只读的接口。但是**，如果<code v-pre>a</code>是一个对象，改写<code v-pre>a</code>的属性是允许的**。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>a<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./xxx.js'</span>

a<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">'hello'</span><span class="token punctuation">;</span> <span class="token comment">// 合法操作</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>a</code>的属性可以成功改写，并且其他模块也可以读到改写后的值。不过，这种写法很难查错，<strong>建议凡是输入的变量，都当作完全只读，不要轻易改变它的属性</strong>。</p>
<p><code v-pre>import</code>后面的<code v-pre>from</code>指定模块文件的位置，可以是相对路径，也可以是绝对路径，<strong><code v-pre>.js</code>后缀可以省略</strong>。<strong>如果只是模块名，不带有路径，那么必须有配置文件</strong>，告诉 JavaScript 引擎该模块的位置。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>myMethod<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'util'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>util</code>是模块文件名，由于不带有路径，必须通过配置，告诉引擎怎么取到这个模块。</p>
<p>注意，<strong><code v-pre>import</code>命令具有提升效果，会提升到整个模块的头部</strong>，首先执行。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> foo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'my_module'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码不会报错，因为<code v-pre>import</code>的执行早于<code v-pre>foo</code>的调用。这种行为的本质是，<code v-pre>import</code>命令是编译阶段执行的，在代码运行之前。</p>
<p>由于<code v-pre>import</code>是静态执行，所以<strong>不能使用表达式和变量</strong>，这些只有在运行时才能得到结果的语法结构。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 报错</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token string">'f'</span> <span class="token operator">+</span> <span class="token string">'oo'</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'my_module'</span><span class="token punctuation">;</span>

<span class="token comment">// 报错</span>
<span class="token keyword">let</span> module <span class="token operator">=</span> <span class="token string">'my_module'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> foo <span class="token punctuation">}</span> from module<span class="token punctuation">;</span>

<span class="token comment">// 报错</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">import</span> <span class="token punctuation">{</span> foo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'module1'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token keyword">import</span> <span class="token punctuation">{</span> foo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'module2'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面三种写法都会报错，因为它们用到了表达式、变量和<code v-pre>if</code>结构。在静态分析阶段，这些语法都是没法得到值的。</p>
<p>最后，<code v-pre>import</code>语句会执行所加载的模块，因此可以有下面的写法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token string">'lodash'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码仅仅执行<code v-pre>lodash</code>模块，但是不输入任何值。</p>
<p>如果多次重复执行同一句<code v-pre>import</code>语句，那么只会执行一次，而不会执行多次。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token string">'lodash'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">'lodash'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码加载了两次<code v-pre>lodash</code>，但是只会执行一次。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> foo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'my_module'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> bar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'my_module'</span><span class="token punctuation">;</span>

<span class="token comment">// 等同于</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> foo<span class="token punctuation">,</span> bar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'my_module'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，虽然<code v-pre>foo</code>和<code v-pre>bar</code>在两个语句中加载，但是它们对应的是同一个<code v-pre>my_module</code>实例。也就是说，<code v-pre>import</code>语句是 Singleton 模式。</p>
<p>目前阶段，通过 Babel 转码，CommonJS 模块的<code v-pre>require</code>命令和 ES6 模块的<code v-pre>import</code>命令，可以写在同一个模块里面，但是最好不要这样做。因为<code v-pre>import</code>在静态解析阶段执行，所以它是一个模块之中最早执行的。下面的代码可能不会得到预期结果。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'core-js/modules/es6.symbol'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'core-js/modules/es6.promise'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'React'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模块的整体加载-星号" tabindex="-1"><a class="header-anchor" href="#模块的整体加载-星号" aria-hidden="true">#</a> 模块的整体加载-(星号*)</h2>
<p>除了指定加载某个输出值，还可以使用整体加载，即用星号（<code v-pre>*</code>）指定一个对象，所有输出值都加载在这个对象上面。</p>
<p>下面是一个<code v-pre>circle.js</code>文件，它输出两个方法<code v-pre>area</code>和<code v-pre>circumference</code>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// circle.js</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">area</span><span class="token punctuation">(</span><span class="token parameter">radius</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> radius <span class="token operator">*</span> radius<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">circumference</span><span class="token punctuation">(</span><span class="token parameter">radius</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token number">2</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> radius<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，加载这个模块。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// main.js</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> area<span class="token punctuation">,</span> circumference <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./circle'</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'圆面积：'</span> <span class="token operator">+</span> <span class="token function">area</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'圆周长：'</span> <span class="token operator">+</span> <span class="token function">circumference</span><span class="token punctuation">(</span><span class="token number">14</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面写法是逐一指定要加载的方法，整体加载的写法如下。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> circle <span class="token keyword">from</span> <span class="token string">'./circle'</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'圆面积：'</span> <span class="token operator">+</span> circle<span class="token punctuation">.</span><span class="token function">area</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'圆周长：'</span> <span class="token operator">+</span> circle<span class="token punctuation">.</span><span class="token function">circumference</span><span class="token punctuation">(</span><span class="token number">14</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<strong>模块整体加载所在的那个对象（上例是<code v-pre>circle</code>），应该是可以静态分析的，所以不允许运行时改变</strong>。下面的写法都是不允许的。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> circle <span class="token keyword">from</span> <span class="token string">'./circle'</span><span class="token punctuation">;</span>

<span class="token comment">// 下面两行都是不允许的</span>
circle<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">'hello'</span><span class="token punctuation">;</span>
circle<span class="token punctuation">.</span><span class="token function-variable function">area</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="export-default-命令" tabindex="-1"><a class="header-anchor" href="#export-default-命令" aria-hidden="true">#</a> export default 命令</h2>
<p>从前面的例子可以看出，使用<code v-pre>import</code>命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。</p>
<p>为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到**<code v-pre>export default</code>命令，为模块指定默认输出。**</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// export-default.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码是一个模块文件<code v-pre>export-default.js</code>，它的默认输出是一个函数。</p>
<p>其他模块加载该模块时，<strong><code v-pre>import</code>命令可以为该匿名函数指定任意名字。</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// import-default.js</span>
<span class="token keyword">import</span> customName <span class="token keyword">from</span> <span class="token string">'./export-default'</span><span class="token punctuation">;</span>
<span class="token function">customName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'foo'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的<code v-pre>import</code>命令，可以用任意名称指向<code v-pre>export-default.js</code>输出的方法，这时就不需要知道原模块输出的函数名。需要注意的是，<strong>这时<code v-pre>import</code>命令后面，不使用大括号</strong>。</p>
<p><code v-pre>export default</code>命令用在非匿名函数前，也是可以的。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// export-default.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 或者写成</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> foo<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<strong><code v-pre>foo</code>函数的函数名<code v-pre>foo</code>，在模块外部是无效的。加载的时候，视同匿名函数加载</strong>。</p>
<p>下面比较一下默认输出和正常输出。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 第一组</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">crc32</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 输出</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">import</span> crc32 <span class="token keyword">from</span> <span class="token string">'crc32'</span><span class="token punctuation">;</span> <span class="token comment">// 输入</span>

<span class="token comment">// 第二组</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">crc32</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 输出</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span>crc32<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'crc32'</span><span class="token punctuation">;</span> <span class="token comment">// 输入</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的两组写法，第一组是使用<code v-pre>export default</code>时，对应的<code v-pre>import</code>语句不需要使用大括号；第二组是不使用<code v-pre>export default</code>时，对应的<code v-pre>import</code>语句需要使用大括号。</p>
<p><code v-pre>export default</code>命令用于指定模块的默认输出。显然，<strong>一个模块只能有一个默认输出</strong>，因此<code v-pre>export default</code>命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应<code v-pre>export default</code>命令。</p>
<p>**本质上，<code v-pre>export default</code>就是输出一个叫做<code v-pre>default</code>的变量或方法，**然后系统允许你为它取任意名字。所以，下面的写法是有效的。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// modules.js</span>
<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">*</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span>add <span class="token keyword">as</span> <span class="token keyword">default</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
<span class="token comment">// export default add;</span>

<span class="token comment">// app.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token keyword">default</span> <span class="token keyword">as</span> foo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'modules'</span><span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
<span class="token comment">// import foo from 'modules';</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正是因为<code v-pre>export default</code>命令其实只是输出一个叫做<code v-pre>default</code>的变量，所以它后面不能跟变量声明语句。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 正确</span>
<span class="token keyword">export</span> <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">// 正确</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> a<span class="token punctuation">;</span>

<span class="token comment">// 错误</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>export default a</code>的含义是将变量<code v-pre>a</code>的值赋给变量<code v-pre>default</code>。所以，最后一种写法会报错。</p>
<p>同样地，因为<code v-pre>export default</code>命令的本质是将后面的值，赋给<code v-pre>default</code>变量，所以可以直接将一个值写在<code v-pre>export default</code>之后。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 正确</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token number">42</span><span class="token punctuation">;</span>

<span class="token comment">// 报错</span>
<span class="token keyword">export</span> <span class="token number">42</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，后一句报错是因为没有指定对外的接口，而前一句指定对外接口为<code v-pre>default</code>。</p>
<p>有了<code v-pre>export default</code>命令，输入模块时就非常直观了，以输入 lodash 模块为例。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> _ <span class="token keyword">from</span> <span class="token string">'lodash'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果想在一条<code v-pre>import</code>语句中，同时输入默认方法和其他接口，可以写成下面这样。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> _<span class="token punctuation">,</span> <span class="token punctuation">{</span> each<span class="token punctuation">,</span> forEach <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'lodash'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对应上面代码的<code v-pre>export</code>语句如下。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ···</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">each</span><span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> iterator<span class="token punctuation">,</span> context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ···</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span> each <span class="token keyword">as</span> forEach <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的最后一行的意思是，暴露出<code v-pre>forEach</code>接口，默认指向<code v-pre>each</code>接口，即<code v-pre>forEach</code>和<code v-pre>each</code>指向同一个方法。</p>
<p><code v-pre>export default</code>也可以用来输出类。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// MyClass.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>

<span class="token comment">// main.js</span>
<span class="token keyword">import</span> MyClass <span class="token keyword">from</span> <span class="token string">'MyClass'</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> o <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="export-与-import-的复合写法" tabindex="-1"><a class="header-anchor" href="#export-与-import-的复合写法" aria-hidden="true">#</a> export 与 import 的复合写法</h2>
<p>如果在一个模块之中，先输入后输出同一个模块，<code v-pre>import</code>语句可以与<code v-pre>export</code>语句写在一起。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token punctuation">{</span> foo<span class="token punctuation">,</span> bar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'my_module'</span><span class="token punctuation">;</span>

<span class="token comment">// 可以简单理解为</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> foo<span class="token punctuation">,</span> bar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'my_module'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> foo<span class="token punctuation">,</span> bar <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>export</code>和<code v-pre>import</code>语句可以结合在一起，写成一行。但需要注意的是，写成一行以后，<code v-pre>foo</code>和<code v-pre>bar</code>实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用<code v-pre>foo</code>和<code v-pre>bar</code>。</p>
<p>模块的接口改名和整体输出，也可以采用这种写法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 接口改名</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> foo <span class="token keyword">as</span> myFoo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'my_module'</span><span class="token punctuation">;</span>

<span class="token comment">// 整体输出</span>
<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">'my_module'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认接口的写法如下。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token punctuation">{</span> <span class="token keyword">default</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'foo'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>具名接口改为默认接口的写法如下。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token punctuation">{</span> es6 <span class="token keyword">as</span> <span class="token keyword">default</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./someModule'</span><span class="token punctuation">;</span>

<span class="token comment">// 等同于</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> es6 <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./someModule'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> es6<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样地，默认接口也可以改名为具名接口。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token punctuation">{</span> <span class="token keyword">default</span> <span class="token keyword">as</span> es6 <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./someModule'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面三种<code v-pre>import</code>语句，没有对应的复合写法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> someIdentifier <span class="token keyword">from</span> <span class="token string">"someModule"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> someIdentifier <span class="token keyword">from</span> <span class="token string">"someModule"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> someIdentifier<span class="token punctuation">,</span> <span class="token punctuation">{</span> namedIdentifier <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"someModule"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了做到形式的对称，现在有<a href="https://github.com/leebyron/ecmascript-export-default-from" target="_blank" rel="noopener noreferrer">提案<ExternalLinkIcon/></a>，提出补上这三种复合写法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">as</span> someIdentifier <span class="token keyword">from</span> <span class="token string">"someModule"</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> someIdentifier <span class="token keyword">from</span> <span class="token string">"someModule"</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> someIdentifier<span class="token punctuation">,</span> <span class="token punctuation">{</span> namedIdentifier <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"someModule"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模块的继承" tabindex="-1"><a class="header-anchor" href="#模块的继承" aria-hidden="true">#</a> 模块的继承</h2>
<p>模块之间也可以继承。</p>
<p>假设有一个<code v-pre>circleplus</code>模块，继承了<code v-pre>circle</code>模块。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// circleplus.js</span>

<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">'circle'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">var</span> e <span class="token operator">=</span> <span class="token number">2.71828182846</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">exp</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中的<code v-pre>export *</code>，表示再输出<code v-pre>circle</code>模块的所有属性和方法。注意，<code v-pre>export *</code>命令会忽略<code v-pre>circle</code>模块的<code v-pre>default</code>方法。然后，上面代码又输出了自定义的<code v-pre>e</code>变量和默认方法。</p>
<p>这时，也可以将<code v-pre>circle</code>的属性或方法，改名后再输出。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// circleplus.js</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span> area <span class="token keyword">as</span> circleArea <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'circle'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码表示，只输出<code v-pre>circle</code>模块的<code v-pre>area</code>方法，且将其改名为<code v-pre>circleArea</code>。</p>
<p>加载上面模块的写法如下。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// main.js</span>

<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> math <span class="token keyword">from</span> <span class="token string">'circleplus'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> exp <span class="token keyword">from</span> <span class="token string">'circleplus'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">exp</span><span class="token punctuation">(</span>math<span class="token punctuation">.</span>e<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中的<code v-pre>import exp</code>表示，将<code v-pre>circleplus</code>模块的默认方法加载为<code v-pre>exp</code>方法。</p>
<h2 id="跨模块常量" tabindex="-1"><a class="header-anchor" href="#跨模块常量" aria-hidden="true">#</a> 跨模块常量</h2>
<p>本书介绍<code v-pre>const</code>命令的时候说过，<code v-pre>const</code>声明的常量只在当前代码块有效。如果想设置跨模块的常量（即跨多个文件），或者说一个值要被多个模块共享，可以采用下面的写法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// constants.js 模块</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">A</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">B</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">C</span> <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>

<span class="token comment">// test1.js 模块</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> constants <span class="token keyword">from</span> <span class="token string">'./constants'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>constants<span class="token punctuation">.</span><span class="token constant">A</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>constants<span class="token punctuation">.</span><span class="token constant">B</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>

<span class="token comment">// test2.js 模块</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span><span class="token constant">A</span><span class="token punctuation">,</span> <span class="token constant">B</span><span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./constants'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">A</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">B</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要使用的常量非常多，可以建一个专门的<code v-pre>constants</code>目录，将各种常量写在不同的文件里面，保存在该目录下。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// constants/db.js</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> db <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">'http://my.couchdbserver.local:5984'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">admin_username</span><span class="token operator">:</span> <span class="token string">'admin'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">admin_password</span><span class="token operator">:</span> <span class="token string">'admin password'</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// constants/user.js</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> users <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'root'</span><span class="token punctuation">,</span> <span class="token string">'admin'</span><span class="token punctuation">,</span> <span class="token string">'staff'</span><span class="token punctuation">,</span> <span class="token string">'ceo'</span><span class="token punctuation">,</span> <span class="token string">'chief'</span><span class="token punctuation">,</span> <span class="token string">'moderator'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，将这些文件输出的常量，合并在<code v-pre>index.js</code>里面。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// constants/index.js</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span>db<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./db'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span>users<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./users'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用的时候，直接加载<code v-pre>index.js</code>就可以了。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// script.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>db<span class="token punctuation">,</span> users<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./constants/index'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="import" tabindex="-1"><a class="header-anchor" href="#import" aria-hidden="true">#</a> import()</h2>
<h3 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h3>
<p>前面介绍过，<code v-pre>import</code>命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行（<code v-pre>import</code>命令叫做“连接” binding 其实更合适）。所以，下面的代码会报错。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 报错</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">import</span> MyModual <span class="token keyword">from</span> <span class="token string">'./myModual'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，引擎处理<code v-pre>import</code>语句是在编译时，这时不会去分析或执行<code v-pre>if</code>语句，所以<code v-pre>import</code>语句放在<code v-pre>if</code>代码块之中毫无意义，因此会报句法错误，而不是执行时错误。也就是说，<code v-pre>import</code>和<code v-pre>export</code>命令只能在模块的顶层，不能在代码块之中（比如，在<code v-pre>if</code>代码块之中，或在函数之中）。</p>
<p>这样的设计，固然有利于编译器提高效率，但也导致无法在运行时加载模块。在语法上，条件加载就不可能实现。如果<code v-pre>import</code>命令要取代 Node 的<code v-pre>require</code>方法，这就形成了一个障碍。因为<code v-pre>require</code>是运行时加载模块，<code v-pre>import</code>命令无法取代<code v-pre>require</code>的动态加载功能。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token string">'./'</span> <span class="token operator">+</span> fileName<span class="token punctuation">;</span>
<span class="token keyword">const</span> myModual <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的语句就是动态加载，<code v-pre>require</code>到底加载哪一个模块，只有运行时才知道。<code v-pre>import</code>命令做不到这一点。</p>
<p><strong><a href="https://github.com/tc39/proposal-dynamic-import" target="_blank" rel="noopener noreferrer">ES2020提案<ExternalLinkIcon/></a> 引入<code v-pre>import()</code>函数，支持动态加载模块。</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span><span class="token punctuation">(</span>specifier<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>import</code>函数的参数<code v-pre>specifier</code>，指定所要加载的模块的位置。<code v-pre>import</code>命令能够接受什么参数，<code v-pre>import()</code>函数就能接受什么参数，两者区别主要是后者为动态加载。</p>
<p><strong><code v-pre>import()</code>返回一个 Promise 对象</strong>。下面是一个例子。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> main <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'main'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">import</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">./section-modules/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>someVariable<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.js</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">module</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    module<span class="token punctuation">.</span><span class="token function">loadPageInto</span><span class="token punctuation">(</span>main<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    main<span class="token punctuation">.</span>textContent <span class="token operator">=</span> err<span class="token punctuation">.</span>message<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><code v-pre>import()</code>函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用</strong>。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。另外，<code v-pre>import()</code>函数与所加载的模块没有静态连接关系，这点也是与<code v-pre>import</code>语句不相同。<code v-pre>import()</code>类似于 Node 的<code v-pre>require</code>方法，区别主要是前者是异步加载，后者是同步加载。</p>
<h3 id="适用场合" tabindex="-1"><a class="header-anchor" href="#适用场合" aria-hidden="true">#</a> 适用场合</h3>
<p>下面是<code v-pre>import()</code>的一些适用场合。</p>
<p>（1）按需加载。</p>
<p><code v-pre>import()</code>可以在需要的时候，再加载某个模块。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>button<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token parameter">event</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./dialogBox.js'</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">dialogBox</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    dialogBox<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">error</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">/* Error handling */</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>import()</code>方法放在<code v-pre>click</code>事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。</p>
<p>（2）条件加载</p>
<p><code v-pre>import()</code>可以放在<code v-pre>if</code>代码块，根据不同的情况，加载不同的模块。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>condition<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'moduleA'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'moduleB'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，如果满足条件，就加载模块 A，否则加载模块 B。</p>
<p>（3）动态的模块路径</p>
<p><code v-pre>import()</code>允许模块路径动态生成。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，根据函数<code v-pre>f</code>的返回结果，加载不同的模块。</p>
<h3 id="注意点" tabindex="-1"><a class="header-anchor" href="#注意点" aria-hidden="true">#</a> 注意点</h3>
<p><code v-pre>import()</code>加载模块成功以后，这个模块会作为一个对象，当作<code v-pre>then</code>方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./myModule.js'</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>export1<span class="token punctuation">,</span> export2<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// ...·</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>export1</code>和<code v-pre>export2</code>都是<code v-pre>myModule.js</code>的输出接口，可以解构获得。</p>
<p>如果模块有<code v-pre>default</code>输出接口，可以用参数直接获得。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./myModule.js'</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">myModule</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myModule<span class="token punctuation">.</span>default<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码也可以使用具名输入的形式。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./myModule.js'</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span><span class="token keyword">default</span><span class="token operator">:</span> theDefault<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>theDefault<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想同时加载多个模块，可以采用下面的写法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./module1.js'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./module2.js'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./module3.js'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>module1<span class="token punctuation">,</span> module2<span class="token punctuation">,</span> module3<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
   ···
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>import()</code>也可以用在 async 函数之中。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> myModule <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./myModule.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span>export1<span class="token punctuation">,</span> export2<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./myModule.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>module1<span class="token punctuation">,</span> module2<span class="token punctuation">,</span> module3<span class="token punctuation">]</span> <span class="token operator">=</span>
    <span class="token keyword">await</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
      <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./module1.js'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./module2.js'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./module3.js'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


