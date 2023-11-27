<template><div><h1 id="装饰器" tabindex="-1"><a class="header-anchor" href="#装饰器" aria-hidden="true">#</a> 装饰器</h1>
<p>[说明] Decorator 提案经过了大幅修改，目前还没有定案，不知道语法会不会再变。下面的内容完全依据以前的提案，已经有点过时了。等待定案以后，需要完全重写。</p>
<p>装饰器（Decorator）是一种与类（class）相关的语法，用来注释或修改类和类方法。许多面向对象的语言都有这项功能，目前有一个<a href="https://github.com/tc39/proposal-decorators" target="_blank" rel="noopener noreferrer">提案<ExternalLinkIcon/></a>将其引入了 ECMAScript。</p>
<!-- more -->
<p>装饰器是一种函数，写成<code v-pre>@ + 函数名</code>。它可以放在类和类方法的定义前面。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>@frozen <span class="token keyword">class</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span>
  @<span class="token function">configurable</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
  @<span class="token function">enumerable</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  @<span class="token function">throttle</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span>
  <span class="token function">expensiveMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码一共使用了四个装饰器，一个用在类本身，另外三个用在类方法。它们不仅增加了代码的可读性，清晰地表达了意图，而且提供一种方便的手段，增加或修改类的功能。</p>
<h2 id="类的装饰" tabindex="-1"><a class="header-anchor" href="#类的装饰" aria-hidden="true">#</a> 类的装饰</h2>
<p>装饰器可以用来装饰整个类。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>@testable
<span class="token keyword">class</span> <span class="token class-name">MyTestableClass</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">testable</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  target<span class="token punctuation">.</span>isTestable <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

MyTestableClass<span class="token punctuation">.</span>isTestable <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>@testable</code>就是一个装饰器。它修改了<code v-pre>MyTestableClass</code>这个类的行为，为它加上了静态属性<code v-pre>isTestable</code>。<code v-pre>testable</code>函数的参数<code v-pre>target</code>是<code v-pre>MyTestableClass</code>类本身。</p>
<p>基本上，装饰器的行为就是下面这样。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>@decorator
<span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// 等同于</span>

<span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token constant">A</span> <span class="token operator">=</span> <span class="token function">decorator</span><span class="token punctuation">(</span><span class="token constant">A</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token constant">A</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说，装饰器是一个对类进行处理的函数。装饰器函数的第一个参数，就是所要装饰的目标类。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">testable</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>testable</code>函数的参数<code v-pre>target</code>，就是会被装饰的类。</p>
<p>如果觉得一个参数不够用，可以在装饰器外面再封装一层函数。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">testable</span><span class="token punctuation">(</span><span class="token parameter">isTestable</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    target<span class="token punctuation">.</span>isTestable <span class="token operator">=</span> isTestable<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

@<span class="token function">testable</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">MyTestableClass</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
MyTestableClass<span class="token punctuation">.</span>isTestable <span class="token comment">// true</span>

@<span class="token function">testable</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
MyClass<span class="token punctuation">.</span>isTestable <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，装饰器<code v-pre>testable</code>可以接受参数，这就等于可以修改装饰器的行为。</p>
<p>注意，装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，装饰器能在编译阶段运行代码。也就是说，装饰器本质就是编译时执行的函数。</p>
<p>前面的例子是为类添加一个静态属性，如果想添加实例属性，可以通过目标类的<code v-pre>prototype</code>对象操作。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">testable</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  target<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>isTestable <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

@testable
<span class="token keyword">class</span> <span class="token class-name">MyTestableClass</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyTestableClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span>isTestable <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，装饰器函数<code v-pre>testable</code>是在目标类的<code v-pre>prototype</code>对象上添加属性，因此就可以在实例上调用。</p>
<p>下面是另外一个例子。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// mixins.js</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">mixins</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>list</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>target<span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token operator">...</span>list<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// main.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> mixins <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./mixins'</span>

<span class="token keyword">const</span> Foo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

@<span class="token function">mixins</span><span class="token punctuation">(</span>Foo<span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 'foo'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码通过装饰器<code v-pre>mixins</code>，把<code v-pre>Foo</code>对象的方法添加到了<code v-pre>MyClass</code>的实例上面。可以用<code v-pre>Object.assign()</code>模拟这个功能。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Foo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">MyClass</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> Foo<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 'foo'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际开发中，React 与 Redux 库结合使用时，常常需要写成下面这样。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MyReactComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">connect</span><span class="token punctuation">(</span>mapStateToProps<span class="token punctuation">,</span> mapDispatchToProps<span class="token punctuation">)</span><span class="token punctuation">(</span>MyReactComponent<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了装饰器，就可以改写上面的代码。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>@<span class="token function">connect</span><span class="token punctuation">(</span>mapStateToProps<span class="token punctuation">,</span> mapDispatchToProps<span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">MyReactComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>相对来说，后一种写法看上去更容易理解。</p>
<h2 id="方法的装饰" tabindex="-1"><a class="header-anchor" href="#方法的装饰" aria-hidden="true">#</a> 方法的装饰</h2>
<p>装饰器不仅可以装饰类，还可以装饰类的属性。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  @readonly
  <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>first<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>last<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，装饰器<code v-pre>readonly</code>用来装饰“类”的<code v-pre>name</code>方法。</p>
<p>装饰器函数<code v-pre>readonly</code>一共可以接受三个参数。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">readonly</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> name<span class="token punctuation">,</span> descriptor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// descriptor对象原来的值如下</span>
  <span class="token comment">// {</span>
  <span class="token comment">//   value: specifiedFunction,</span>
  <span class="token comment">//   enumerable: false,</span>
  <span class="token comment">//   configurable: true,</span>
  <span class="token comment">//   writable: true</span>
  <span class="token comment">// };</span>
  descriptor<span class="token punctuation">.</span>writable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> descriptor<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">readonly</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">,</span> descriptor<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 类似于</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">,</span> descriptor<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>装饰器第一个参数是类的原型对象，上例是<code v-pre>Person.prototype</code>，装饰器的本意是要“装饰”类的实例，但是这个时候实例还没生成，所以只能去装饰原型（这不同于类的装饰，那种情况时<code v-pre>target</code>参数指的是类本身）；第二个参数是所要装饰的属性名，第三个参数是该属性的描述对象。</p>
<p>另外，上面代码说明，装饰器（readonly）会修改属性的描述对象（descriptor），然后被修改的描述对象再用来定义属性。</p>
<p>下面是另一个例子，修改属性描述对象的<code v-pre>enumerable</code>属性，使得该属性不可遍历。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  @nonenumerable
  <span class="token keyword">get</span> <span class="token function">kidCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>children<span class="token punctuation">.</span>length<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">nonenumerable</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> name<span class="token punctuation">,</span> descriptor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  descriptor<span class="token punctuation">.</span>enumerable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> descriptor<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面的<code v-pre>@log</code>装饰器，可以起到输出日志的作用。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Math</span> <span class="token punctuation">{</span>
  @log
  <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">log</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> name<span class="token punctuation">,</span> descriptor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> oldValue <span class="token operator">=</span> descriptor<span class="token punctuation">.</span>value<span class="token punctuation">;</span>

  descriptor<span class="token punctuation">.</span><span class="token function-variable function">value</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Calling </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> with</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">oldValue</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> descriptor<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> math <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Math</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// passed parameters should get logged now</span>
math<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>@log</code>装饰器的作用就是在执行原始的操作之前，执行一次<code v-pre>console.log</code>，从而达到输出日志的目的。</p>
<p>装饰器有注释的作用。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>@testable
<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  @readonly
  @nonenumerable
  <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>first<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>last<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面代码中，我们一眼就能看出，<code v-pre>Person</code>类是可测试的，而<code v-pre>name</code>方法是只读和不可枚举的。</p>
<p>下面是使用 Decorator 写法的<a href="https://github.com/ionic-team/stencil" target="_blank" rel="noopener noreferrer">组件<ExternalLinkIcon/></a>，看上去一目了然。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">'my-component'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">styleUrl</span><span class="token operator">:</span> <span class="token string">'my-component.scss'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token punctuation">{</span>
  @<span class="token function">Prop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> first<span class="token operator">:</span> string<span class="token punctuation">;</span>
  @<span class="token function">Prop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> last<span class="token operator">:</span> string<span class="token punctuation">;</span>
  @<span class="token function">State</span><span class="token punctuation">(</span><span class="token punctuation">)</span> isVisible<span class="token operator">:</span> boolean <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>p<span class="token operator">></span>Hello<span class="token punctuation">,</span> my name is <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>first<span class="token punctuation">}</span> <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>last<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果同一个方法有多个装饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">dec</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'evaluated'</span><span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> property<span class="token punctuation">,</span> descriptor</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'executed'</span><span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Example</span> <span class="token punctuation">{</span>
    @<span class="token function">dec</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    @<span class="token function">dec</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// evaluated 1</span>
<span class="token comment">// evaluated 2</span>
<span class="token comment">// executed 2</span>
<span class="token comment">// executed 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，外层装饰器<code v-pre>@dec(1)</code>先进入，但是内层装饰器<code v-pre>@dec(2)</code>先执行。</p>
<p>除了注释，装饰器还能用来类型检查。所以，对于类来说，这项功能相当有用。从长期来看，它将是 JavaScript 代码静态分析的重要工具。</p>
<h2 id="为什么装饰器不能用于函数" tabindex="-1"><a class="header-anchor" href="#为什么装饰器不能用于函数" aria-hidden="true">#</a> 为什么装饰器不能用于函数？</h2>
<p>装饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> counter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  counter<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

@add
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码，意图是执行后<code v-pre>counter</code>等于 1，但是实际上结果是<code v-pre>counter</code>等于 0。因为函数提升，使得实际执行的代码是下面这样。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>@add
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> counter<span class="token punctuation">;</span>
<span class="token keyword">var</span> add<span class="token punctuation">;</span>

counter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  counter<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是另一个例子。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> readOnly <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"some-decorator"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

@readOnly
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码也有问题，因为实际执行是下面这样。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> readOnly<span class="token punctuation">;</span>

@readOnly
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

readOnly <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"some-decorator"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总之，由于存在函数提升，使得装饰器不能用于函数。类是不会提升的，所以就没有这方面的问题。</p>
<p>另一方面，如果一定要装饰函数，可以采用高阶函数的形式直接执行。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Hello, '</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">loggingDecorator</span><span class="token punctuation">(</span><span class="token parameter">wrapped</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Starting'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">wrapped</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Finished'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> wrapped <span class="token operator">=</span> <span class="token function">loggingDecorator</span><span class="token punctuation">(</span>doSomething<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="core-decorators-js" tabindex="-1"><a class="header-anchor" href="#core-decorators-js" aria-hidden="true">#</a> core-decorators.js</h2>
<p><a href="https://github.com/jayphelps/core-decorators.js" target="_blank" rel="noopener noreferrer">core-decorators.js<ExternalLinkIcon/></a>是一个第三方模块，提供了几个常见的装饰器，通过它可以更好地理解装饰器。</p>
<p><strong>（1）@autobind</strong></p>
<p><code v-pre>autobind</code>装饰器使得方法中的<code v-pre>this</code>对象，绑定原始对象。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> autobind <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'core-decorators'</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  @autobind
  <span class="token function">getPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> getPerson <span class="token operator">=</span> person<span class="token punctuation">.</span>getPerson<span class="token punctuation">;</span>

<span class="token function">getPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> person<span class="token punctuation">;</span>
<span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（2）@readonly</strong></p>
<p><code v-pre>readonly</code>装饰器使得属性或方法不可写。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> readonly <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'core-decorators'</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Meal</span> <span class="token punctuation">{</span>
  @readonly
  entree <span class="token operator">=</span> <span class="token string">'steak'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> dinner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Meal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dinner<span class="token punctuation">.</span>entree <span class="token operator">=</span> <span class="token string">'salmon'</span><span class="token punctuation">;</span>
<span class="token comment">// Cannot assign to read only property 'entree' of [object Object]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（3）@override</strong></p>
<p><code v-pre>override</code>装饰器检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> override <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'core-decorators'</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Parent</span> <span class="token punctuation">{</span>
  <span class="token function">speak</span><span class="token punctuation">(</span><span class="token parameter">first<span class="token punctuation">,</span> second</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Child</span> <span class="token keyword">extends</span> <span class="token class-name">Parent</span> <span class="token punctuation">{</span>
  @override
  <span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token comment">// SyntaxError: Child#speak() does not properly override Parent#speak(first, second)</span>
<span class="token punctuation">}</span>

<span class="token comment">// or</span>

<span class="token keyword">class</span> <span class="token class-name">Child</span> <span class="token keyword">extends</span> <span class="token class-name">Parent</span> <span class="token punctuation">{</span>
  @override
  <span class="token function">speaks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token comment">// SyntaxError: No descriptor matching Child#speaks() was found on the prototype chain.</span>
  <span class="token comment">//</span>
  <span class="token comment">//   Did you mean "speak"?</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（4）@deprecate (别名@deprecated)</strong></p>
<p><code v-pre>deprecate</code>或<code v-pre>deprecated</code>装饰器在控制台显示一条警告，表示该方法将废除。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> deprecate <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'core-decorators'</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  @deprecate
  <span class="token function">facepalm</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  @<span class="token function">deprecate</span><span class="token punctuation">(</span><span class="token string">'We stopped facepalming'</span><span class="token punctuation">)</span>
  <span class="token function">facepalmHard</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  @<span class="token function">deprecate</span><span class="token punctuation">(</span><span class="token string">'We stopped facepalming'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">'http://knowyourmeme.com/memes/facepalm'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token function">facepalmHarder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

person<span class="token punctuation">.</span><span class="token function">facepalm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// DEPRECATION Person#facepalm: This function will be removed in future versions.</span>

person<span class="token punctuation">.</span><span class="token function">facepalmHard</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// DEPRECATION Person#facepalmHard: We stopped facepalming</span>

person<span class="token punctuation">.</span><span class="token function">facepalmHarder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// DEPRECATION Person#facepalmHarder: We stopped facepalming</span>
<span class="token comment">//</span>
<span class="token comment">//     See http://knowyourmeme.com/memes/facepalm for more details.</span>
<span class="token comment">//</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（5）@suppressWarnings</strong></p>
<p><code v-pre>suppressWarnings</code>装饰器抑制<code v-pre>deprecated</code>装饰器导致的<code v-pre>console.warn()</code>调用。但是，异步代码发出的调用除外。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> suppressWarnings <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'core-decorators'</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  @deprecated
  <span class="token function">facepalm</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  @suppressWarnings
  <span class="token function">facepalmWithoutWarning</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">facepalm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

person<span class="token punctuation">.</span><span class="token function">facepalmWithoutWarning</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// no warning is logged</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用装饰器实现自动发布事件" tabindex="-1"><a class="header-anchor" href="#使用装饰器实现自动发布事件" aria-hidden="true">#</a> 使用装饰器实现自动发布事件</h2>
<p>我们可以使用装饰器，使得对象的方法被调用时，自动发出一个事件。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> postal <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"postal/lib/postal.lodash"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">publish</span><span class="token punctuation">(</span><span class="token parameter">topic<span class="token punctuation">,</span> channel</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> channelName <span class="token operator">=</span> channel <span class="token operator">||</span> <span class="token string">'/'</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> msgChannel <span class="token operator">=</span> postal<span class="token punctuation">.</span><span class="token function">channel</span><span class="token punctuation">(</span>channelName<span class="token punctuation">)</span><span class="token punctuation">;</span>
  msgChannel<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>topic<span class="token punctuation">,</span> <span class="token parameter">v</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'频道: '</span><span class="token punctuation">,</span> channelName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'事件: '</span><span class="token punctuation">,</span> topic<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'数据: '</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> name<span class="token punctuation">,</span> descriptor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> fn <span class="token operator">=</span> descriptor<span class="token punctuation">.</span>value<span class="token punctuation">;</span>

    descriptor<span class="token punctuation">.</span><span class="token function-variable function">value</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> value <span class="token operator">=</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
      msgChannel<span class="token punctuation">.</span><span class="token function">publish</span><span class="token punctuation">(</span>topic<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码定义了一个名为<code v-pre>publish</code>的装饰器，它通过改写<code v-pre>descriptor.value</code>，使得原方法被调用时，会自动发出一个事件。它使用的事件“发布/订阅”库是<a href="https://github.com/postaljs/postal.js" target="_blank" rel="noopener noreferrer">Postal.js<ExternalLinkIcon/></a>。</p>
<p>它的用法如下。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// index.js</span>
<span class="token keyword">import</span> publish <span class="token keyword">from</span> <span class="token string">'./publish'</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">FooComponent</span> <span class="token punctuation">{</span>
  @<span class="token function">publish</span><span class="token punctuation">(</span><span class="token string">'foo.some.message'</span><span class="token punctuation">,</span> <span class="token string">'component'</span><span class="token punctuation">)</span>
  <span class="token function">someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">my</span><span class="token operator">:</span> <span class="token string">'data'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  @<span class="token function">publish</span><span class="token punctuation">(</span><span class="token string">'foo.some.other'</span><span class="token punctuation">)</span>
  <span class="token function">anotherMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> foo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FooComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

foo<span class="token punctuation">.</span><span class="token function">someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
foo<span class="token punctuation">.</span><span class="token function">anotherMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以后，只要调用<code v-pre>someMethod</code>或者<code v-pre>anotherMethod</code>，就会自动发出一个事件。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ bash-node index.js
频道:  component
事件:  foo.some.message
数据:  <span class="token punctuation">{</span> my: <span class="token string">'data'</span> <span class="token punctuation">}</span>

频道:  /
事件:  foo.some.other
数据:  undefined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mixin" tabindex="-1"><a class="header-anchor" href="#mixin" aria-hidden="true">#</a> Mixin</h2>
<p>在装饰器的基础上，可以实现<code v-pre>Mixin</code>模式。所谓<code v-pre>Mixin</code>模式，就是对象继承的一种替代方案，中文译为“混入”（mix in），意为在一个对象之中混入另外一个对象的方法。</p>
<p>请看下面的例子。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Foo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">MyClass</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> Foo<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 'foo'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码之中，对象<code v-pre>Foo</code>有一个<code v-pre>foo</code>方法，通过<code v-pre>Object.assign</code>方法，可以将<code v-pre>foo</code>方法“混入”<code v-pre>MyClass</code>类，导致<code v-pre>MyClass</code>的实例<code v-pre>obj</code>对象都具有<code v-pre>foo</code>方法。这就是“混入”模式的一个简单实现。</p>
<p>下面，我们部署一个通用脚本<code v-pre>mixins.js</code>，将 Mixin 写成一个装饰器。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">mixins</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>list</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>target<span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token operator">...</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，就可以使用上面这个装饰器，为类“混入”各种方法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mixins <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./mixins'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> Foo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

@<span class="token function">mixins</span><span class="token punctuation">(</span>Foo<span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// "foo"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过<code v-pre>mixins</code>这个装饰器，实现了在<code v-pre>MyClass</code>类上面“混入”<code v-pre>Foo</code>对象的<code v-pre>foo</code>方法。</p>
<p>不过，上面的方法会改写<code v-pre>MyClass</code>类的<code v-pre>prototype</code>对象，如果不喜欢这一点，也可以通过类的继承实现 Mixin。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token keyword">extends</span> <span class="token class-name">MyBaseClass</span> <span class="token punctuation">{</span>
  <span class="token comment">/* ... */</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>MyClass</code>继承了<code v-pre>MyBaseClass</code>。如果我们想在<code v-pre>MyClass</code>里面“混入”一个<code v-pre>foo</code>方法，一个办法是在<code v-pre>MyClass</code>和<code v-pre>MyBaseClass</code>之间插入一个混入类，这个类具有<code v-pre>foo</code>方法，并且继承了<code v-pre>MyBaseClass</code>的所有方法，然后<code v-pre>MyClass</code>再继承这个类。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token function-variable function">MyMixin</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">superclass</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">class</span> <span class="token class-name">extends</span> superclass <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo from MyMixin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>MyMixin</code>是一个混入类生成器，接受<code v-pre>superclass</code>作为参数，然后返回一个继承<code v-pre>superclass</code>的子类，该子类包含一个<code v-pre>foo</code>方法。</p>
<p>接着，目标类再去继承这个混入类，就达到了“混入”<code v-pre>foo</code>方法的目的。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token keyword">extends</span> <span class="token class-name">MyMixin</span><span class="token punctuation">(</span>MyBaseClass<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">/* ... */</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
c<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "foo from MyMixin"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果需要“混入”多个方法，就生成多个混入类。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token keyword">extends</span> <span class="token class-name">Mixin1</span><span class="token punctuation">(</span><span class="token function">Mixin2</span><span class="token punctuation">(</span>MyBaseClass<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">/* ... */</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种写法的一个好处，是可以调用<code v-pre>super</code>，因此可以避免在“混入”过程中覆盖父类的同名方法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token function-variable function">Mixin1</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">superclass</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">class</span> <span class="token class-name">extends</span> superclass <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo from Mixin1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">super</span><span class="token punctuation">.</span>foo<span class="token punctuation">)</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> <span class="token function-variable function">Mixin2</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">superclass</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">class</span> <span class="token class-name">extends</span> superclass <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo from Mixin2'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">super</span><span class="token punctuation">.</span>foo<span class="token punctuation">)</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">S</span> <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo from S'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">C</span> <span class="token keyword">extends</span> <span class="token class-name">Mixin1</span><span class="token punctuation">(</span><span class="token function">Mixin2</span><span class="token punctuation">(</span><span class="token constant">S</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo from C'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，每一次<code v-pre>混入</code>发生时，都调用了父类的<code v-pre>super.foo</code>方法，导致父类的同名方法没有被覆盖，行为被保留了下来。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// foo from C</span>
<span class="token comment">// foo from Mixin1</span>
<span class="token comment">// foo from Mixin2</span>
<span class="token comment">// foo from S</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="trait" tabindex="-1"><a class="header-anchor" href="#trait" aria-hidden="true">#</a> Trait</h2>
<p>Trait 也是一种装饰器，效果与 Mixin 类似，但是提供更多功能，比如防止同名方法的冲突、排除混入某些方法、为混入的方法起别名等等。</p>
<p>下面采用<a href="https://github.com/CocktailJS/traits-decorator" target="_blank" rel="noopener noreferrer">traits-decorator<ExternalLinkIcon/></a>这个第三方模块作为例子。这个模块提供的<code v-pre>traits</code>装饰器，不仅可以接受对象，还可以接受 ES6 类作为参数。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> traits <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'traits-decorator'</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">TFoo</span> <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> TBar <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'bar'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

@<span class="token function">traits</span><span class="token punctuation">(</span>TFoo<span class="token punctuation">,</span> TBar<span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// foo</span>
obj<span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// bar</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，通过<code v-pre>traits</code>装饰器，在<code v-pre>MyClass</code>类上面“混入”了<code v-pre>TFoo</code>类的<code v-pre>foo</code>方法和<code v-pre>TBar</code>对象的<code v-pre>bar</code>方法。</p>
<p>Trait 不允许“混入”同名方法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> traits <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'traits-decorator'</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">TFoo</span> <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> TBar <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'bar'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

@<span class="token function">traits</span><span class="token punctuation">(</span>TFoo<span class="token punctuation">,</span> TBar<span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token comment">// 报错</span>
<span class="token comment">// throw new Error('Method named: ' + methodName + ' is defined twice.');</span>
<span class="token comment">//        ^</span>
<span class="token comment">// Error: Method named: foo is defined twice.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>TFoo</code>和<code v-pre>TBar</code>都有<code v-pre>foo</code>方法，结果<code v-pre>traits</code>装饰器报错。</p>
<p>一种解决方法是排除<code v-pre>TBar</code>的<code v-pre>foo</code>方法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> traits<span class="token punctuation">,</span> excludes <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'traits-decorator'</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">TFoo</span> <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> TBar <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'bar'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

@<span class="token function">traits</span><span class="token punctuation">(</span>TFoo<span class="token punctuation">,</span> <span class="token literal-property property">TBar</span><span class="token operator">:</span><span class="token operator">:</span><span class="token function">excludes</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// foo</span>
obj<span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// bar</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码使用绑定运算符（::）在<code v-pre>TBar</code>上排除<code v-pre>foo</code>方法，混入时就不会报错了。</p>
<p>另一种方法是为<code v-pre>TBar</code>的<code v-pre>foo</code>方法起一个别名。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> traits<span class="token punctuation">,</span> alias <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'traits-decorator'</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">TFoo</span> <span class="token punctuation">{</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> TBar <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'bar'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

@<span class="token function">traits</span><span class="token punctuation">(</span>TFoo<span class="token punctuation">,</span> <span class="token literal-property property">TBar</span><span class="token operator">:</span><span class="token operator">:</span><span class="token function">alias</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token string">'aliasFoo'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// foo</span>
obj<span class="token punctuation">.</span><span class="token function">aliasFoo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// foo</span>
obj<span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// bar</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码为<code v-pre>TBar</code>的<code v-pre>foo</code>方法起了别名<code v-pre>aliasFoo</code>，于是<code v-pre>MyClass</code>也可以混入<code v-pre>TBar</code>的<code v-pre>foo</code>方法了。</p>
<p><code v-pre>alias</code>和<code v-pre>excludes</code>方法，可以结合起来使用。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>@<span class="token function">traits</span><span class="token punctuation">(</span>TExample<span class="token operator">:</span><span class="token operator">:</span><span class="token function">excludes</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">,</span><span class="token string">'bar'</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token operator">:</span><span class="token function">alias</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">baz</span><span class="token operator">:</span><span class="token string">'exampleBaz'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码排除了<code v-pre>TExample</code>的<code v-pre>foo</code>方法和<code v-pre>bar</code>方法，为<code v-pre>baz</code>方法起了别名<code v-pre>exampleBaz</code>。</p>
<p><code v-pre>as</code>方法则为上面的代码提供了另一种写法。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>@<span class="token function">traits</span><span class="token punctuation">(</span>TExample<span class="token operator">:</span><span class="token operator">:</span><span class="token keyword">as</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">excludes</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token string">'bar'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">baz</span><span class="token operator">:</span> <span class="token string">'exampleBaz'</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


