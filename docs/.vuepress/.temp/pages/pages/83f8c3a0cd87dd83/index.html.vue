<template><div><h1 id="class-的继承" tabindex="-1"><a class="header-anchor" href="#class-的继承" aria-hidden="true">#</a> Class 的继承</h1>
<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2>
<p>Class 可以通过<code v-pre>extends</code>关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ColorPoint</span> <span class="token keyword">extends</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><!-- more -->
<p>上面代码定义了一个<code v-pre>ColorPoint</code>类，该类通过<code v-pre>extends</code>关键字，继承了<code v-pre>Point</code>类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个<code v-pre>Point</code>类。下面，我们在<code v-pre>ColorPoint</code>内部加上代码。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">ColorPoint</span> <span class="token keyword">extends</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> color</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 调用父类的constructor(x, y)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">+</span> <span class="token string">' '</span> <span class="token operator">+</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 调用父类的toString()</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>constructor</code>方法和<code v-pre>toString</code>方法之中，都出现了<code v-pre>super</code>关键字，它在这里表示父类的构造函数，用来新建父类的<code v-pre>this</code>对象。</p>
<p>**子类必须在<code v-pre>constructor</code>方法中调用<code v-pre>super</code>方法，否则新建实例时会报错。**这是因为子类自己的<code v-pre>this</code>对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。<strong>如果不调用<code v-pre>super</code>方法，子类就得不到<code v-pre>this</code>对象。</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ColorPoint</span> <span class="token keyword">extends</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> cp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ColorPoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>ColorPoint</code>继承了父类<code v-pre>Point</code>，但是它的构造函数没有调用<code v-pre>super</code>方法，导致新建实例时报错。</p>
<p>ES5 的继承，实质是先创造子类的实例对象<code v-pre>this</code>，然后再将父类的方法添加到<code v-pre>this</code>上面（<code v-pre>Parent.apply(this)</code>）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到<code v-pre>this</code>上面（所以必须先调用<code v-pre>super</code>方法），然后再用子类的构造函数修改<code v-pre>this</code>。</p>
<p>如果子类没有定义<code v-pre>constructor</code>方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有<code v-pre>constructor</code>方法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">ColorPoint</span> <span class="token keyword">extends</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">// 等同于</span>
<span class="token keyword">class</span> <span class="token class-name">ColorPoint</span> <span class="token keyword">extends</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个需要注意的地方是，**在子类的构造函数中，只有调用<code v-pre>super</code>之后，才可以使用<code v-pre>this</code>关键字，否则会报错。**这是因为子类实例的构建，基于父类实例，只有<code v-pre>super</code>方法才能调用父类实例。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">=</span> y<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ColorPoint</span> <span class="token keyword">extends</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> color</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color<span class="token punctuation">;</span> <span class="token comment">// ReferenceError</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color<span class="token punctuation">;</span> <span class="token comment">// 正确</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，子类的<code v-pre>constructor</code>方法没有调用<code v-pre>super</code>之前，就使用<code v-pre>this</code>关键字，结果报错，而放在<code v-pre>super</code>方法之后就是正确的。</p>
<p>下面是生成子类实例的代码。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> cp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ColorPoint</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token string">'green'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

cp <span class="token keyword">instanceof</span> <span class="token class-name">ColorPoint</span> <span class="token comment">// true</span>
cp <span class="token keyword">instanceof</span> <span class="token class-name">Point</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，实例对象<code v-pre>cp</code>同时是<code v-pre>ColorPoint</code>和<code v-pre>Point</code>两个类的实例，这与 ES5 的行为完全一致。</p>
<p>最后，父类的静态方法，也会被子类继承。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hello world'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token constant">B</span><span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">// hello world</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>hello()</code>是<code v-pre>A</code>类的静态方法，<code v-pre>B</code>继承<code v-pre>A</code>，也继承了<code v-pre>A</code>的静态方法。</p>
<h2 id="object-getprototypeof" tabindex="-1"><a class="header-anchor" href="#object-getprototypeof" aria-hidden="true">#</a> Object.getPrototypeOf()</h2>
<p><code v-pre>Object.getPrototypeOf</code>方法可以用来从子类上获取父类。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>ColorPoint<span class="token punctuation">)</span> <span class="token operator">===</span> Point
<span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，可以使用这个方法判断，一个类是否继承了另一个类。</p>
<h2 id="super-关键字" tabindex="-1"><a class="header-anchor" href="#super-关键字" aria-hidden="true">#</a> super 关键字</h2>
<p><strong><code v-pre>super</code>这个关键字，既可以当作函数使用，也可以当作对象使用</strong>。在这两种情况下，它的用法完全不同。</p>
<p>第一种情况，<code v-pre>super</code>作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次<code v-pre>super</code>函数。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，子类<code v-pre>B</code>的构造函数之中的<code v-pre>super()</code>，代表调用父类的构造函数。这是必须的，否则 JavaScript 引擎会报错。</p>
<p>注意，<strong><code v-pre>super</code>虽然代表了父类<code v-pre>A</code>的构造函数，但是返回的是子类<code v-pre>B</code>的实例</strong>，即<code v-pre>super</code>内部的<code v-pre>this</code>指的是<code v-pre>B</code>的实例，因此<code v-pre>super()</code>在这里相当于<code v-pre>A.prototype.constructor.call(this)</code>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span><span class="token punctuation">.</span>target<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">new</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// A</span>
<span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// B</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>new.target</code>指向当前正在执行的函数。可以看到，在<code v-pre>super()</code>执行时，它指向的是子类<code v-pre>B</code>的构造函数，而不是父类<code v-pre>A</code>的构造函数。也就是说，<code v-pre>super()</code>内部的<code v-pre>this</code>指向的是<code v-pre>B</code>。</p>
<p><strong>作为函数时，<code v-pre>super()</code>只能用在子类的构造函数之中，用在其他地方就会报错。</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">m</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 报错</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>super()</code>用在<code v-pre>B</code>类的<code v-pre>m</code>方法之中，就会造成语法错误。</p>
<p>第二种情况，<strong><code v-pre>super</code>作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">p</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">p</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，子类<code v-pre>B</code>当中的<code v-pre>super.p()</code>，就是将<code v-pre>super</code>当作一个对象使用。这时，<code v-pre>super</code>在普通方法之中，指向<code v-pre>A.prototype</code>，所以<code v-pre>super.p()</code>就相当于<code v-pre>A.prototype.p()</code>。</p>
<p>这里需要注意，由于<code v-pre>super</code>指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过<code v-pre>super</code>调用的。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>p <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// 这是定于在实例上的属性</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token keyword">get</span> <span class="token function">m</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span>p<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
b<span class="token punctuation">.</span>m <span class="token comment">// undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>p</code>是父类<code v-pre>A</code>实例的属性，<code v-pre>super.p</code>就引用不到它。</p>
<p>如果属性定义在父类的原型对象上，<code v-pre>super</code>就可以取到。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token class-name">A</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">super</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span> <span class="token comment">// 2</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，属性<code v-pre>x</code>是定义在<code v-pre>A.prototype</code>上面的，所以<code v-pre>super.x</code>可以取到它的值。</p>
<p>ES6 规定，<strong>在子类普通方法中通过<code v-pre>super</code>调用父类的方法时，方法内部的<code v-pre>this</code>指向当前的子类实例</strong>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">m</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
b<span class="token punctuation">.</span><span class="token function">m</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>super.print()</code>虽然调用的是<code v-pre>A.prototype.print()</code>，但是<code v-pre>A.prototype.print()</code>内部的<code v-pre>this</code>指向子类<code v-pre>B</code>的实例，导致输出的是<code v-pre>2</code>，而不是<code v-pre>1</code>。也就是说，实际上执行的是<code v-pre>super.print.call(this)</code>。</p>
<p>由于<code v-pre>this</code>指向子类实例，所以如果通过<code v-pre>super</code>对某个属性赋值，这时<code v-pre>super</code>就是<code v-pre>this</code>，赋值的属性会变成子类实例的属性。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">super</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>super.x</code>赋值为<code v-pre>3</code>，这时等同于对<code v-pre>this.x</code>赋值为<code v-pre>3</code>。而当读取<code v-pre>super.x</code>的时候，读的是<code v-pre>A.prototype.x</code>，所以返回<code v-pre>undefined</code>。</p>
<p><strong>如果<code v-pre>super</code>作为对象，用在静态方法之中，这时<code v-pre>super</code>将指向父类，而不是父类的原型对象。</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Parent</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token parameter">msg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'static'</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token parameter">msg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'instance'</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Child</span> <span class="token keyword">extends</span> <span class="token class-name">Parent</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token parameter">msg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">myMethod</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token parameter">msg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">myMethod</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Child<span class="token punctuation">.</span><span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// static 1</span>

<span class="token keyword">var</span> child <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Child</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
child<span class="token punctuation">.</span><span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// instance 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>super</code>在静态方法之中指向父类，在普通方法之中指向父类的原型对象。</p>
<p>另外，<strong>在子类的静态方法中通过<code v-pre>super</code>调用父类的方法时，方法内部的<code v-pre>this</code>指向当前的子类，而不是子类的实例。</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> <span class="token function">m</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token constant">B</span><span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token constant">B</span><span class="token punctuation">.</span><span class="token function">m</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，静态方法<code v-pre>B.m</code>里面，<code v-pre>super.print</code>指向父类的静态方法。这个方法里面的<code v-pre>this</code>指向的是<code v-pre>B</code>，而不是<code v-pre>B</code>的实例。</p>
<p>注意，使用<code v-pre>super</code>的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">super</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 报错</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>console.log(super)</code>当中的<code v-pre>super</code>，无法看出是作为函数使用，还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错。这时，如果能清晰地表明<code v-pre>super</code>的数据类型，就不会报错。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">instanceof</span> <span class="token class-name">B</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>super.valueOf()</code>表明<code v-pre>super</code>是一个对象，因此就不会报错。同时，由于<code v-pre>super</code>使得<code v-pre>this</code>指向<code v-pre>B</code>的实例，所以<code v-pre>super.valueOf()</code>返回的是一个<code v-pre>B</code>的实例。</p>
<p>最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用<code v-pre>super</code>关键字。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"MyObject: "</span> <span class="token operator">+</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

obj<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// MyObject: [object Object]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="类的-prototype-属性和-proto-属性" tabindex="-1"><a class="header-anchor" href="#类的-prototype-属性和-proto-属性" aria-hidden="true">#</a> 类的 prototype 属性和__proto__属性</h2>
<p>大多数浏览器的 ES5 实现之中，每一个对象都有<code v-pre>__proto__</code>属性，指向对应的构造函数的<code v-pre>prototype</code>属性。Class 作为构造函数的语法糖，同时有<code v-pre>prototype</code>属性和<code v-pre>__proto__</code>属性，因此同时存在两条继承链。</p>
<p>（1）子类的<code v-pre>__proto__</code>属性，表示构造函数的继承，总是指向父类。</p>
<p>（2）子类<code v-pre>prototype</code>属性的<code v-pre>__proto__</code>属性，表示方法的继承，总是指向父类的<code v-pre>prototype</code>属性。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token constant">B</span><span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token constant">A</span> <span class="token comment">// true</span>
<span class="token class-name">B</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">A</span><span class="token punctuation">.</span>prototype <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，子类<code v-pre>B</code>的<code v-pre>__proto__</code>属性指向父类<code v-pre>A</code>，子类<code v-pre>B</code>的<code v-pre>prototype</code>属性的<code v-pre>__proto__</code>属性指向父类<code v-pre>A</code>的<code v-pre>prototype</code>属性。</p>
<p>这样的结果是因为，类的继承是按照下面的模式实现的。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">// B 的实例继承 A 的实例</span>
Object<span class="token punctuation">.</span><span class="token function">setPrototypeOf</span><span class="token punctuation">(</span><span class="token class-name">B</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token class-name">A</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// B 继承 A 的静态属性</span>
Object<span class="token punctuation">.</span><span class="token function">setPrototypeOf</span><span class="token punctuation">(</span><span class="token constant">B</span><span class="token punctuation">,</span> <span class="token constant">A</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>《对象的扩展》一章给出过<code v-pre>Object.setPrototypeOf</code>方法的实现。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Object<span class="token punctuation">.</span><span class="token function-variable function">setPrototypeOf</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> proto</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  obj<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> proto<span class="token punctuation">;</span>
  <span class="token keyword">return</span> obj<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，就得到了上面的结果。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Object<span class="token punctuation">.</span><span class="token function">setPrototypeOf</span><span class="token punctuation">(</span><span class="token class-name">B</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token class-name">A</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
<span class="token class-name">B</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> <span class="token class-name">A</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>

Object<span class="token punctuation">.</span><span class="token function">setPrototypeOf</span><span class="token punctuation">(</span><span class="token constant">B</span><span class="token punctuation">,</span> <span class="token constant">A</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
<span class="token constant">B</span><span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> <span class="token constant">A</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这两条继承链，可以这样理解：作为一个对象，子类（<code v-pre>B</code>）的原型（<code v-pre>__proto__</code>属性）是父类（<code v-pre>A</code>）；作为一个构造函数，子类（<code v-pre>B</code>）的原型对象（<code v-pre>prototype</code>属性）是父类的原型对象（<code v-pre>prototype</code>属性）的实例。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token class-name">B</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">A</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
<span class="token class-name">B</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> <span class="token class-name">A</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>extends</code>关键字后面可以跟多种类型的值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的<code v-pre>A</code>，只要是一个有<code v-pre>prototype</code>属性的函数，就能被<code v-pre>B</code>继承。由于函数都有<code v-pre>prototype</code>属性（除了<code v-pre>Function.prototype</code>函数），因此<code v-pre>A</code>可以是任意函数。</p>
<p>下面，讨论两种情况。第一种，子类继承<code v-pre>Object</code>类。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token keyword">extends</span> <span class="token class-name">Object</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token constant">A</span><span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> Object <span class="token comment">// true</span>
<span class="token class-name">A</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种情况下，<code v-pre>A</code>其实就是构造函数<code v-pre>Object</code>的复制，<code v-pre>A</code>的实例就是<code v-pre>Object</code>的实例。</p>
<p>第二种情况，不存在任何继承。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token constant">A</span><span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Function</span><span class="token punctuation">.</span>prototype <span class="token comment">// true</span>
<span class="token class-name">A</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种情况下，<code v-pre>A</code>作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承<code v-pre>Function.prototype</code>。但是，<code v-pre>A</code>调用后返回一个空对象（即<code v-pre>Object</code>实例），所以<code v-pre>A.prototype.__proto__</code>指向构造函数（<code v-pre>Object</code>）的<code v-pre>prototype</code>属性。</p>
<h3 id="实例的-proto-属性" tabindex="-1"><a class="header-anchor" href="#实例的-proto-属性" aria-hidden="true">#</a> 实例的 __proto__ 属性</h3>
<p>子类实例的<code v-pre>__proto__</code>属性的<code v-pre>__proto__</code>属性，指向父类实例的<code v-pre>__proto__</code>属性。也就是说，子类的原型的原型，是父类的原型。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> p2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ColorPoint</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">'red'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

p2<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> p1<span class="token punctuation">.</span>__proto__ <span class="token comment">// false</span>
p2<span class="token punctuation">.</span>__proto__<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> p1<span class="token punctuation">.</span>__proto__ <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>ColorPoint</code>继承了<code v-pre>Point</code>，导致前者原型的原型是后者的原型。</p>
<p>因此，通过子类实例的<code v-pre>__proto__.__proto__</code>属性，可以修改父类实例的行为。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>p2<span class="token punctuation">.</span>__proto__<span class="token punctuation">.</span>__proto__<span class="token punctuation">.</span><span class="token function-variable function">printName</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Ha'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

p1<span class="token punctuation">.</span><span class="token function">printName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// "Ha"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码在<code v-pre>ColorPoint</code>的实例<code v-pre>p2</code>上向<code v-pre>Point</code>类添加方法，结果影响到了<code v-pre>Point</code>的实例<code v-pre>p1</code>。</p>
<h2 id="原生构造函数的继承" tabindex="-1"><a class="header-anchor" href="#原生构造函数的继承" aria-hidden="true">#</a> 原生构造函数的继承</h2>
<p>原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数大致有下面这些。</p>
<ul>
<li>Boolean()</li>
<li>Number()</li>
<li>String()</li>
<li>Array()</li>
<li>Date()</li>
<li>Function()</li>
<li>RegExp()</li>
<li>Error()</li>
<li>Object()</li>
</ul>
<p>以前，这些原生构造函数是无法继承的，比如，不能自己定义一个<code v-pre>Array</code>的子类。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">MyArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">Array</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">MyArray</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">constructor</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> MyArray<span class="token punctuation">,</span>
    <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码定义了一个继承 Array 的<code v-pre>MyArray</code>类。但是，这个类的行为与<code v-pre>Array</code>完全不一致。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> colors <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
colors<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"red"</span><span class="token punctuation">;</span>
colors<span class="token punctuation">.</span>length  <span class="token comment">// 0</span>

colors<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
colors<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>  <span class="token comment">// "red"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过<code v-pre>Array.apply()</code>或者分配给原型对象都不行。原生构造函数会忽略<code v-pre>apply</code>方法传入的<code v-pre>this</code>，也就是说，原生构造函数的<code v-pre>this</code>无法绑定，导致拿不到内部属性。</p>
<p>ES5 是先新建子类的实例对象<code v-pre>this</code>，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。比如，<code v-pre>Array</code>构造函数有一个内部属性<code v-pre>[[DefineOwnProperty]]</code>，用来定义新属性时，更新<code v-pre>length</code>属性，这个内部属性无法在子类获取，导致子类的<code v-pre>length</code>属性行为不正常。</p>
<p>下面的例子中，我们想让一个普通对象继承<code v-pre>Error</code>对象。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> e <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyNames</span><span class="token punctuation">(</span><span class="token function">Error</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// [ 'stack' ]</span>

Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyNames</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
<span class="token comment">// []</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，我们想通过<code v-pre>Error.call(e)</code>这种写法，让普通对象<code v-pre>e</code>具有<code v-pre>Error</code>对象的实例属性。但是，<code v-pre>Error.call()</code>完全忽略传入的第一个参数，而是返回一个新对象，<code v-pre>e</code>本身没有任何变化。这证明了<code v-pre>Error.call(e)</code>这种写法，无法继承原生构造函数。</p>
<p>ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象<code v-pre>this</code>，然后再用子类的构造函数修饰<code v-pre>this</code>，使得父类的所有行为都可以继承。下面是一个继承<code v-pre>Array</code>的例子。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MyArray</span> <span class="token keyword">extends</span> <span class="token class-name">Array</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">12</span><span class="token punctuation">;</span>
arr<span class="token punctuation">.</span>length <span class="token comment">// 1</span>

arr<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token comment">// undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码定义了一个<code v-pre>MyArray</code>类，继承了<code v-pre>Array</code>构造函数，因此就可以从<code v-pre>MyArray</code>生成数组的实例。这意味着，ES6 可以自定义原生数据结构（比如<code v-pre>Array</code>、<code v-pre>String</code>等）的子类，这是 ES5 无法做到的。</p>
<p>上面这个例子也说明，<code v-pre>extends</code>关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构。下面就是定义了一个带版本功能的数组。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">VersionedArray</span> <span class="token keyword">extends</span> <span class="token class-name">Array</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>history <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>history<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">revert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>length<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>history<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>history<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VersionedArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

x<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
x<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
x <span class="token comment">// [1, 2]</span>
x<span class="token punctuation">.</span>history <span class="token comment">// [[]]</span>

x<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
x<span class="token punctuation">.</span>history <span class="token comment">// [[], [1, 2]]</span>

x<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
x <span class="token comment">// [1, 2, 3]</span>
x<span class="token punctuation">.</span>history <span class="token comment">// [[], [1, 2]]</span>

x<span class="token punctuation">.</span><span class="token function">revert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
x <span class="token comment">// [1, 2]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>VersionedArray</code>会通过<code v-pre>commit</code>方法，将自己的当前状态生成一个版本快照，存入<code v-pre>history</code>属性。<code v-pre>revert</code>方法用来将数组重置为最新一次保存的版本。除此之外，<code v-pre>VersionedArray</code>依然是一个普通数组，所有原生的数组方法都可以在它上面调用。</p>
<p>下面是一个自定义<code v-pre>Error</code>子类的例子，可以用来定制报错时的行为。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">ExtendableError</span> <span class="token keyword">extends</span> <span class="token class-name">Error</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">message</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>message <span class="token operator">=</span> message<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>stack <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>stack<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>constructor<span class="token punctuation">.</span>name<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MyError</span> <span class="token keyword">extends</span> <span class="token class-name">ExtendableError</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">m</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> myerror <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyError</span><span class="token punctuation">(</span><span class="token string">'ll'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
myerror<span class="token punctuation">.</span>message <span class="token comment">// "ll"</span>
myerror <span class="token keyword">instanceof</span> <span class="token class-name">Error</span> <span class="token comment">// true</span>
myerror<span class="token punctuation">.</span>name <span class="token comment">// "MyError"</span>
myerror<span class="token punctuation">.</span>stack
<span class="token comment">// Error</span>
<span class="token comment">//     at MyError.ExtendableError</span>
<span class="token comment">//     ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，继承<code v-pre>Object</code>的子类，有一个<a href="http://stackoverflow.com/questions/36203614/super-does-not-pass-arguments-when-instantiating-a-class-extended-from-object" target="_blank" rel="noopener noreferrer">行为差异<ExternalLinkIcon/></a>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">NewObj</span> <span class="token keyword">extends</span> <span class="token class-name">Object</span><span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token operator">...</span>arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> o <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NewObj</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">attr</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
o<span class="token punctuation">.</span>attr <span class="token operator">===</span> <span class="token boolean">true</span>  <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>NewObj</code>继承了<code v-pre>Object</code>，但是无法通过<code v-pre>super</code>方法向父类<code v-pre>Object</code>传参。这是因为 ES6 改变了<code v-pre>Object</code>构造函数的行为，一旦发现<code v-pre>Object</code>方法不是通过<code v-pre>new Object()</code>这种形式调用，ES6 规定<code v-pre>Object</code>构造函数会忽略参数。</p>
<h2 id="mixin-模式的实现" tabindex="-1"><a class="header-anchor" href="#mixin-模式的实现" aria-hidden="true">#</a> Mixin 模式的实现</h2>
<p>Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。它的最简单实现如下。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token string">'a'</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token string">'b'</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> c <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token operator">...</span>a<span class="token punctuation">,</span> <span class="token operator">...</span>b<span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// {a: 'a', b: 'b'}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>c</code>对象是<code v-pre>a</code>对象和<code v-pre>b</code>对象的合成，具有两者的接口。</p>
<p>下面是一个更完备的实现，将多个类的接口“混入”（mix in）另一个类。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mix</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>mixins</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">class</span> <span class="token class-name">Mix</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> mixin <span class="token keyword">of</span> mixins<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">copyProperties</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">mixin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 拷贝实例属性</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> mixin <span class="token keyword">of</span> mixins<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">copyProperties</span><span class="token punctuation">(</span>Mix<span class="token punctuation">,</span> mixin<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 拷贝静态属性</span>
    <span class="token function">copyProperties</span><span class="token punctuation">(</span><span class="token class-name">Mix</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> mixin<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 拷贝原型属性</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> Mix<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">copyProperties</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">of</span> Reflect<span class="token punctuation">.</span><span class="token function">ownKeys</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span> key <span class="token operator">!==</span> <span class="token string">'constructor'</span>
      <span class="token operator">&amp;&amp;</span> key <span class="token operator">!==</span> <span class="token string">'prototype'</span>
      <span class="token operator">&amp;&amp;</span> key <span class="token operator">!==</span> <span class="token string">'name'</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> desc <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
      Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> desc<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的<code v-pre>mix</code>函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">DistributedEdit</span> <span class="token keyword">extends</span> <span class="token class-name">mix</span><span class="token punctuation">(</span>Loggable<span class="token punctuation">,</span> Serializable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


