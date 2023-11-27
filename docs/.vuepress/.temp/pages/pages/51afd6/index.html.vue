<template><div><h1 id="typescript-学习笔记" tabindex="-1"><a class="header-anchor" href="#typescript-学习笔记" aria-hidden="true">#</a> TypeScript 学习笔记</h1>
<p>TypeScript 的类型校验是给程序员看的，在编译后不会存在TS代码。</p>
<h2 id="类型注解" tabindex="-1"><a class="header-anchor" href="#类型注解" aria-hidden="true">#</a> 类型注解</h2>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span>person<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token keyword">void</span><span class="token punctuation">{</span> <span class="token comment">// 参数类型是字符串，没有返回值</span>
    <span class="token comment">///...</span>
<span class="token punctuation">}</span>
<span class="token function">fn</span><span class="token punctuation">(</span><span class="token string">'str'</span><span class="token punctuation">)</span> <span class="token comment">// 如传递参数非字符串，vscode编辑器中或在编译时将给出错误提示</span>

<span class="token keyword">const</span> test<span class="token operator">:</span><span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="有哪些基础类型注解" tabindex="-1"><a class="header-anchor" href="#有哪些基础类型注解" aria-hidden="true">#</a> 有哪些基础类型注解？</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// 基础类型</span>
<span class="token operator">:</span><span class="token builtin">string</span>
<span class="token operator">:</span><span class="token builtin">number</span>
<span class="token operator">:</span><span class="token builtin">boolean</span>

<span class="token operator">:</span><span class="token keyword">null</span>  <span class="token comment">// 只能是null值</span>
<span class="token operator">:</span><span class="token keyword">undefined</span> <span class="token comment">// 只能是undefined值</span>

<span class="token operator">:</span><span class="token builtin">symbol</span>

<span class="token comment">// 引用类型</span>
<span class="token operator">:</span>object <span class="token comment">// 不常用，多使用接口来给对象进行类型注解</span>

<span class="token comment">// 其他</span>
<span class="token operator">:</span><span class="token builtin">any</span>  <span class="token comment">// 任意类型</span>
<span class="token operator">:</span><span class="token keyword">void</span>  <span class="token comment">// 空，用于函数的无返回值的注解</span>
<span class="token operator">:</span><span class="token builtin">never</span> <span class="token comment">// 用于标注函数代码永远执行不完（如抛出错误的函数，死循环函数）</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="什么是类型注解和类型推断、类型断言" tabindex="-1"><a class="header-anchor" href="#什么是类型注解和类型推断、类型断言" aria-hidden="true">#</a> 什么是类型注解和类型推断、类型断言？</h3>
<p><strong>类型注解</strong> 是显式的标注类型</p>
<p><strong>类型推断</strong> 是编辑器根据值来自动推断出类型 (编辑器中鼠标移到变量会显示类型的提示)。</p>
<p><strong>类型断言</strong> 是告诉编译器，“相信我，它就是这个类型”。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// 类型注解就是显式的写出类型</span>
<span class="token keyword">const</span> myNumber<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">123</span>

<span class="token comment">// 类型推断是根据值来推断类型 (鼠标移到变量会显示类型(或直接显示值)的提示)</span>
<span class="token keyword">const</span> myString <span class="token operator">=</span> <span class="token string">'test'</span>

<span class="token comment">// 类型断言（开发者明确知道是什么类型）</span>
<span class="token keyword">const</span> someValue<span class="token operator">:</span><span class="token builtin">any</span> <span class="token operator">=</span> <span class="token string">'abc'</span>
<span class="token keyword">const</span> strLength<span class="token operator">:</span><span class="token builtin">number</span> <span class="token operator">=</span> <span class="token punctuation">(</span>someValue <span class="token keyword">as</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length <span class="token comment">// 断言someValue是字符串类型</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="类型断言" tabindex="-1"><a class="header-anchor" href="#类型断言" aria-hidden="true">#</a> 类型断言</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#img'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span>el <span class="token keyword">as</span> HTMLImageElement<span class="token punctuation">)</span><span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">'xx'</span>  <span class="token comment">// 断言el就是图片元素类型</span>


<span class="token comment">// 对象内的类型断言</span>
<span class="token keyword">type</span> <span class="token class-name">TestObj</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  test<span class="token operator">:</span> <span class="token operator">&lt;</span>TestObj<span class="token operator">></span><span class="token punctuation">{</span>
    a<span class="token operator">:</span> <span class="token string">'aaa'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 或者</span>
<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  test<span class="token operator">:</span> <span class="token punctuation">{</span>
    a<span class="token operator">:</span> <span class="token string">'aaa'</span>
  <span class="token punctuation">}</span> <span class="token keyword">as</span> TestObj <span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="对象的类型" tabindex="-1"><a class="header-anchor" href="#对象的类型" aria-hidden="true">#</a> 对象的类型</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// 对象字面量的类型检查</span>
<span class="token keyword">const</span> xiaojiejie<span class="token operator">:</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">'小红'</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span> <span class="token number">18</span>
<span class="token punctuation">}</span>

<span class="token comment">// 标注:object</span>
<span class="token keyword">const</span> obj<span class="token operator">:</span>object <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// 使用接口</span>
<span class="token keyword">interface</span> <span class="token class-name">Person</span><span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> xjj<span class="token operator">:</span> Person <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'xh'</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">18</span>
<span class="token punctuation">}</span>

<span class="token comment">// class类的类型检查</span>
<span class="token keyword">class</span> <span class="token class-name">Parson</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token keyword">const</span> xiaobai<span class="token operator">:</span> Parson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Parson</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 函数和返回值的类型检查</span>
<span class="token keyword">const</span> <span class="token function-variable function">fn</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span> <span class="token function-variable function">string</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token string">'123'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="函数的类型注解" tabindex="-1"><a class="header-anchor" href="#函数的类型注解" aria-hidden="true">#</a> 函数的类型注解</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// 函数返回值的类型注解 fn(): number {}</span>
<span class="token keyword">function</span> <span class="token function">getTotal2</span><span class="token punctuation">(</span>one<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> two<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> one <span class="token operator">+</span> two
<span class="token punctuation">}</span>
<span class="token function">getTotal2</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span>


<span class="token comment">// 无返回值: void</span>
<span class="token keyword">function</span> <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Hello"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 永远执行不玩的函数</span>
<span class="token keyword">function</span> <span class="token function">setTimer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token builtin">never</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 参数是对象时的注解 （也可以用接口）</span>
<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">{</span> one<span class="token punctuation">,</span> two <span class="token punctuation">}</span><span class="token operator">:</span> <span class="token punctuation">{</span>one<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> two<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span>  one <span class="token operator">+</span> two
<span class="token punctuation">}</span>

<span class="token keyword">const</span> total <span class="token operator">=</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">{</span>one<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> two<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 类型别名方式定义函数类型</span>
<span class="token keyword">type</span> <span class="token class-name">Callback</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">string</span>
<span class="token keyword">let</span> fn<span class="token operator">:</span> <span class="token function-variable function">Callback</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token string">''</span>

<span class="token comment">// 接口方式定义函数类型</span>
<span class="token keyword">interface</span> <span class="token class-name">ICallBack</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> fn1<span class="token operator">:</span> <span class="token function-variable function">ICallBack</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token string">''</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="函数中的this类型" tabindex="-1"><a class="header-anchor" href="#函数中的this类型" aria-hidden="true">#</a> 函数中的this类型</h4>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">TestObj</span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span>
  <span class="token function-variable function">fn</span><span class="token operator">:</span> <span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span>
<span class="token punctuation">}</span>

<span class="token comment">// 普通函数的this</span>
<span class="token keyword">let</span> obj<span class="token operator">:</span> TestObj <span class="token operator">=</span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">:</span> TestObj<span class="token punctuation">,</span> x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">// 注意这里的this非参数，只是给this类型注解。x还是第一个参数</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>a
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">// 箭头函数的this (this是固定指向当前声明函数所在的作用域)</span>
<span class="token keyword">let</span> obj2<span class="token operator">:</span> TestObj <span class="token operator">=</span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">:</span> TestObj<span class="token punctuation">,</span> x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>a
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="函数重载-函数参数间的组合约定" tabindex="-1"><a class="header-anchor" href="#函数重载-函数参数间的组合约定" aria-hidden="true">#</a> 函数重载 （函数参数间的组合约定）</h4>
<p>原生js中并没有真正的函数重载，重名函数会被覆盖，但ts中可以有。</p>
<blockquote>
<p><a href="https://www.cnblogs.com/yugege/p/5539020.html" target="_blank" rel="noopener noreferrer">浅谈JavaScript函数重载<ExternalLinkIcon/></a></p>
</blockquote>
<p>ts支持函数重载，一般用于针对传入不同的参数或参数数量以及返回值之间的类型约定。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// 第一套约定（attr是'display'时，value必须是 'block' | 'nonde'）</span>
<span class="token keyword">function</span> <span class="token function">showOrHide</span><span class="token punctuation">(</span>ele<span class="token operator">:</span> HTMLElement<span class="token punctuation">,</span> attr<span class="token operator">:</span> <span class="token string">'display'</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token string">'block'</span> <span class="token operator">|</span> <span class="token string">'nonde'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 第二套约定（attr是'opacity'时，value必须是number）</span>
<span class="token keyword">function</span> <span class="token function">showOrHide</span><span class="token punctuation">(</span>ele<span class="token operator">:</span> HTMLElement<span class="token punctuation">,</span> attr<span class="token operator">:</span> <span class="token string">'opacity'</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 函数的实现</span>
<span class="token keyword">function</span> <span class="token function">showOrHide</span><span class="token punctuation">(</span>ele<span class="token operator">:</span> HTMLElement<span class="token punctuation">,</span> attr<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token comment">// interface也可以声明函数重载</span>
<span class="token keyword">interface</span> <span class="token class-name">Fn</span><span class="token punctuation">{</span>
  <span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token function">string</span>
  <span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> fn<span class="token operator">:</span> <span class="token function-variable function">Fn</span><span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更多 <a href="https://zhuanlan.zhihu.com/p/496792140" target="_blank" rel="noopener noreferrer">ts函数重载知识<ExternalLinkIcon/></a></p>
<h3 id="数组的类型注解" tabindex="-1"><a class="header-anchor" href="#数组的类型注解" aria-hidden="true">#</a> 数组的类型注解</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> numberArr<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>
<span class="token keyword">const</span> stringArr<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">]</span>
<span class="token keyword">const</span> undefinedArr<span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">]</span>
<span class="token keyword">const</span> arr<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">]</span> <span class="token comment">// 用到联合类型</span>

<span class="token comment">// 类型别名 type alias</span>
<span class="token keyword">type</span> <span class="token class-name">lady</span> <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span>

<span class="token keyword">const</span> xiaojj<span class="token operator">:</span> lady<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'xiaojj'</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">90</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'j'</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">30</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>

<span class="token comment">// 或用类的方式</span>
<span class="token keyword">class</span> <span class="token class-name">Ady2</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> xiaojj2<span class="token operator">:</span> Ady2<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'xiaojj'</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">90</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'j'</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">30</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="元组" tabindex="-1"><a class="header-anchor" href="#元组" aria-hidden="true">#</a> 元组</h2>
<p>元组，可以理解为：<strong>已知元素数量和类型的数组</strong></p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// 联合类型</span>
<span class="token keyword">const</span> xjj<span class="token operator">:</span><span class="token punctuation">(</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span><span class="token number">22</span><span class="token punctuation">,</span><span class="token string">'b'</span><span class="token punctuation">]</span> <span class="token comment">// 规定整个数组当中可以有string或number</span>

<span class="token comment">// 元组注解 注意这里的注解只有一个中括号</span>
<span class="token keyword">const</span> xjj1<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">]</span> <span class="token comment">// 规定了数组每个元素对应位置的类型</span>

<span class="token comment">// Note: 在开发中元祖的使用在相对少</span>


<span class="token comment">// CSV的方式定义数据格式； （二维数组时需要多加一个中括号）</span>
<span class="token keyword">const</span> xjj2<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">]</span>
<span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="接口" tabindex="-1"><a class="header-anchor" href="#接口" aria-hidden="true">#</a> 接口</h2>
<p>接口，可以理解为对象属性的类型描述。和<code v-pre>类型别名</code>类似，不同的是 接口必须是一个对象，而别名可以直接是一个类型，如<code v-pre> type Girl = string</code></p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Girl</span> <span class="token punctuation">{</span> <span class="token comment">// 接口 （理解：对象属性的类型描述）</span>
  <span class="token keyword">readonly</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// 只读属性 （定义之后不能再修改）</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  waistline<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> <span class="token comment">// 加个问号表示是可选值</span>
  <span class="token punctuation">[</span>propname<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span> <span class="token comment">// 表示可以有不限制属性名的属性，但属性名需要是字符串，值可以是任意类型</span>
  <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// 函数类型，返回值是string (如无返回值时是 void)。  say()也可以加入参数类型检查，如say(p:number)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 和类型别名类似，不同的是 接口必须是一个对象，而别名可以直接是一个类型，如 type Girl = string</span>

<span class="token comment">// 接口的继承</span>
<span class="token keyword">interface</span> <span class="token class-name">Teacher</span> <span class="token keyword">extends</span> <span class="token class-name">Girl</span> <span class="token punctuation">{</span>
  <span class="token function">teach</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">const</span> girl <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">'大脚'</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
  sex<span class="token operator">:</span> <span class="token string">'女'</span><span class="token punctuation">,</span>
  <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'欢迎光临'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">teach</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'教'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">const</span> <span class="token function-variable function">screenResume</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> bust<span class="token punctuation">,</span> sex <span class="token punctuation">}</span><span class="token operator">:</span> Girl<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> bust<span class="token punctuation">,</span> sex<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> <span class="token function-variable function">getResume</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> bust<span class="token punctuation">,</span> teach<span class="token punctuation">}</span><span class="token operator">:</span> Teacher<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token function">teach</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> bust<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">screenResume</span><span class="token punctuation">(</span>girl<span class="token punctuation">)</span>
<span class="token function">getResume</span><span class="token punctuation">(</span>girl<span class="token punctuation">)</span>


<span class="token comment">// 接口在class类中的使用</span>
<span class="token keyword">class</span> <span class="token class-name">xiaojjj</span> <span class="token keyword">implements</span> <span class="token class-name">Girl</span> <span class="token punctuation">{</span>
  name <span class="token operator">=</span> <span class="token string">"xiaojj"</span>
  age <span class="token operator">=</span> <span class="token number">18</span>
  bust <span class="token operator">=</span> <span class="token number">98</span>
  sex <span class="token operator">=</span> <span class="token string">'女'</span>
  <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'欢迎光临'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>可索引的类型</strong></p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Arr</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span>index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token operator">:</span><span class="token builtin">string</span>   <span class="token comment">// 表示通过索引访问数据时返回的类型是string</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> myArr<span class="token operator">:</span>Arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'1'</span><span class="token punctuation">,</span><span class="token string">'2'</span><span class="token punctuation">,</span><span class="token string">'3'</span><span class="token punctuation">]</span>
<span class="token keyword">const</span> myStr<span class="token operator">:</span><span class="token builtin">string</span> <span class="token operator">=</span> myArr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="es6-class类中应用ts" tabindex="-1"><a class="header-anchor" href="#es6-class类中应用ts" aria-hidden="true">#</a> ES6 class类中应用TS</h2>
<h3 id="class类的修饰器" tabindex="-1"><a class="header-anchor" href="#class类的修饰器" aria-hidden="true">#</a> class类的修饰器</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// 类的修饰器：</span>
<span class="token comment">// public (公共) 允许内外部使用</span>
<span class="token comment">// protected (受保护的) 允许在内部和继承内使用</span>
<span class="token comment">// private (私有) 允许在内部使用，但不能在继承中使用</span>

<span class="token comment">// 类的内部和外部，{}内属于内部，外面是外部</span>
<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
   <span class="token comment">// public 内外都可以使用，可省略，不写时默认public。 protected只允许内部使用</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token comment">// 这里的string注释是TS使用的</span>
  <span class="token keyword">private</span> age<span class="token operator">:</span> <span class="token number">18</span>
  <span class="token keyword">public</span> <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">+</span> <span class="token string">'say hello'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Teacher2</span> <span class="token keyword">extends</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token function">sayBye</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">' say bye'</span><span class="token punctuation">)</span> <span class="token comment">// protected 可以在继承中使用到</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
person<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'test'</span> <span class="token comment">// 在类的外部定义</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>name<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="class类的构造函数中使用类型校验" tabindex="-1"><a class="header-anchor" href="#class类的构造函数中使用类型校验" aria-hidden="true">#</a> class类的构造函数中使用类型校验</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Person2</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">public</span> name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Teacher3</span> <span class="token keyword">extends</span> <span class="token class-name">Person2</span><span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">public</span> age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token string">'test-name'</span><span class="token punctuation">)</span> <span class="token comment">// 这里传的值是给Person2的构造函数。即使父类没有构造函数，子类的构造函数内也要写super()</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> teacher3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Teacher3</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>teacher3<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>teacher3<span class="token punctuation">.</span>age<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="class类的getter、setter和static" tabindex="-1"><a class="header-anchor" href="#class类的getter、setter和static" aria-hidden="true">#</a> class类的getter、setter和static</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Xjj</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> _age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
  <span class="token keyword">get</span> <span class="token function">age</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_age <span class="token operator">-</span> <span class="token number">10</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>  <span class="token comment">// 访问器属性，以属性的形式访问age，并可以对属性进行包装</span>
  <span class="token keyword">set</span> <span class="token function">age</span><span class="token punctuation">(</span>age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_age <span class="token operator">=</span> age<span class="token operator">+</span><span class="token number">3</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> dj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Xjj</span><span class="token punctuation">(</span><span class="token number">28</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dj<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">25</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>dj<span class="token punctuation">.</span>age<span class="token punctuation">)</span>


<span class="token comment">// 静态属性 static。  静态属性指不需要通过实例化，直接通过Girl.prop的方式就可以访问到属性</span>
<span class="token keyword">class</span> <span class="token class-name">Girl</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token function">sayLove</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'I love you'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// const girl = new Girl()</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Girl<span class="token punctuation">.</span><span class="token function">sayLove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="class类的只读属性" tabindex="-1"><a class="header-anchor" href="#class类的只读属性" aria-hidden="true">#</a> class类的只读属性</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// 只读属性</span>
<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">readonly</span> _name<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token comment">// 只读属性</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'testName'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// person._name = '222'; // 不能修改只读属性</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>_name<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="抽象类" tabindex="-1"><a class="header-anchor" href="#抽象类" aria-hidden="true">#</a> 抽象类</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token operator">/</span> 抽象类
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Girls</span> <span class="token punctuation">{</span>
  <span class="token keyword">abstract</span> <span class="token function">skill</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 注意这里只是定义抽象方法，而不具有方法的实现</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Waiter</span> <span class="token keyword">extends</span> <span class="token class-name">Girls</span><span class="token punctuation">{</span> <span class="token comment">// 继承了抽象类之后要 实现抽象类内的成员</span>
  <span class="token function">skill</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'大爷1'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">BaseTeacher</span> <span class="token keyword">extends</span> <span class="token class-name">Girls</span><span class="token punctuation">{</span>
  <span class="token function">skill</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'大爷2'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">SeniorTeacher</span> <span class="token keyword">extends</span> <span class="token class-name">Girls</span><span class="token punctuation">{</span>
  <span class="token function">skill</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'大爷3'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// abstract关键字标注为抽象类（没有具体实现，不能用new实例化。子类继承该抽象类必须实现相应方法，用于规范子类）</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Component<span class="token operator">&lt;</span><span class="token constant">T1</span><span class="token punctuation">,</span> <span class="token constant">T2</span><span class="token operator">></span></span> <span class="token punctuation">{</span>
  props<span class="token operator">:</span> <span class="token constant">T1</span><span class="token punctuation">;</span>
  state<span class="token operator">:</span> <span class="token constant">T2</span><span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>props<span class="token operator">:</span> <span class="token constant">T1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>props <span class="token operator">=</span> props
  <span class="token punctuation">}</span>

  <span class="token comment">// 用abstract标注为抽象类的方法，不能有具体实现</span>
  <span class="token keyword">abstract</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>



<span class="token comment">// 规范类的props和state</span>
<span class="token keyword">interface</span> <span class="token class-name">Props</span> <span class="token punctuation">{</span>
  val<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">State</span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token comment">// 规范类内部的方法</span>
<span class="token keyword">interface</span> <span class="token class-name">Log</span> <span class="token punctuation">{</span>
  <span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">Save</span> <span class="token punctuation">{</span>
  <span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span>
<span class="token punctuation">}</span>

<span class="token comment">// &lt;Props, State>通过泛型传入类型. implements 关键字使当前类必须要履行 Log,Storage 接口内定于的契约</span>
<span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> <span class="token class-name">Component<span class="token operator">&lt;</span>Props<span class="token punctuation">,</span> State<span class="token operator">></span></span> <span class="token keyword">implements</span> <span class="token class-name">Log</span><span class="token punctuation">,</span> Save <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>props<span class="token operator">:</span> Props<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>
      x<span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// this.props.val</span>
    <span class="token comment">// this.state.x</span>
    <span class="token keyword">return</span> <span class="token string">'&lt;MyComponent>'</span>
  <span class="token punctuation">}</span>

  <span class="token function">getInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">''</span>
  <span class="token punctuation">}</span>
  <span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> myComponent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span> val<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
myComponent<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token doc-comment comment">/**
 * 类中的接口使用implements关键字
 * 1. 如果一个类implements了一个接口，那么就必须实现该接口中定义的契约
 * 2. 多个接口使用逗号分隔
 * 3. implements与extends可以同时存在
 */</span>


<span class="token doc-comment comment">/**
 * TS中类和接口知识点
 * 1. 抽象类在编译后会产生实体代码，接口不会
 * 2. TS只支持继承，即一个子类之能有一个父类
 * 3. 接口不能有实现，抽象类可以有属性的实现，没有方法实现
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="联合类型和类型保护" tabindex="-1"><a class="header-anchor" href="#联合类型和类型保护" aria-hidden="true">#</a> 联合类型和类型保护</h2>
<p><strong>联合类型</strong> 指某个参数可以是多种类型。</p>
<p><strong>类型保护</strong> 指参数属于某个类型才有相应的操作。</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Waiter</span> <span class="token punctuation">{</span>
  anjiao<span class="token operator">:</span> <span class="token builtin">boolean</span>
  <span class="token function-variable function">say</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Teacher</span> <span class="token punctuation">{</span>
  anjiao<span class="token operator">:</span> <span class="token builtin">boolean</span>
  <span class="token function-variable function">skill</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">judgeWho</span><span class="token punctuation">(</span>animal<span class="token operator">:</span> <span class="token punctuation">(</span>Waiter <span class="token operator">|</span> Teacher<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 联合类型</span>
  <span class="token comment">// 第一种断言方法</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>animal<span class="token punctuation">.</span>anjiao<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// (animal as Teacher) 的意思是：断言 animal 是 Teacher类型</span>
    <span class="token punctuation">(</span>animal <span class="token keyword">as</span> Teacher<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">skill</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token punctuation">(</span>animal <span class="token keyword">as</span> Waiter<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 第二种断言方法</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">'skill'</span> <span class="token keyword">in</span> animal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    animal<span class="token punctuation">.</span><span class="token function">skill</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    animal<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 第三种类型保护方法是使用typeof来判断 (代码省略)</span>
<span class="token punctuation">}</span>


<span class="token keyword">class</span> <span class="token class-name">NumberObj</span> <span class="token punctuation">{</span>
  count<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">addObj</span><span class="token punctuation">(</span>first<span class="token operator">:</span> object <span class="token operator">|</span> NumberObj<span class="token punctuation">,</span> second<span class="token operator">:</span> object <span class="token operator">|</span> NumberObj<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 联合类型</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>first <span class="token keyword">instanceof</span> <span class="token class-name">NumberObj</span> <span class="token operator">&amp;&amp;</span> second <span class="token keyword">instanceof</span> <span class="token class-name">NumberObj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 类型保护</span>
    <span class="token keyword">return</span> first<span class="token punctuation">.</span>count <span class="token operator">+</span> second<span class="token punctuation">.</span>count<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="枚举" tabindex="-1"><a class="header-anchor" href="#枚举" aria-hidden="true">#</a> 枚举</h2>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// Enum枚举类型   (个人理解枚举：约定一组可选的常量。 使用常量名表示某个值的含义，增强可读性。)</span>

<span class="token comment">// js写法</span>
<span class="token comment">// const Status = {</span>
<span class="token comment">//   MASSAGE: 0,</span>
<span class="token comment">//   SPA: 1,</span>
<span class="token comment">//   DABAOJIAN: 2</span>
<span class="token comment">// }</span>

<span class="token comment">// ts写法</span>
<span class="token keyword">enum</span> Status <span class="token punctuation">{</span>
  <span class="token constant">MASSAGE</span><span class="token punctuation">,</span>  <span class="token comment">// 如果想从1开始，给MASSAGE = 1, 即可</span>
  <span class="token constant">SPA</span><span class="token punctuation">,</span>
  <span class="token constant">DABAOJIAN</span>
<span class="token punctuation">}</span> <span class="token comment">// 默认赋值 0 、1、2</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Status<span class="token punctuation">.</span><span class="token constant">MASSAGE</span><span class="token punctuation">,</span> Status<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 0, MASSAGE  可以通过下标反查</span>

<span class="token keyword">function</span> <span class="token function">getStatus</span><span class="token punctuation">(</span>status<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>status <span class="token operator">===</span> Status<span class="token punctuation">.</span><span class="token constant">MASSAGE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'massage'</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>status <span class="token operator">===</span> Status<span class="token punctuation">.</span><span class="token constant">SPA</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'spa'</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>status <span class="token operator">===</span> Status<span class="token punctuation">.</span><span class="token constant">DABAOJIAN</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'dabaojian'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">getStatus</span><span class="token punctuation">(</span>Status<span class="token punctuation">.</span><span class="token constant">SPA</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="泛型" tabindex="-1"><a class="header-anchor" href="#泛型" aria-hidden="true">#</a> 泛型</h2>
<p>泛型，最简单的理解：泛指的类型。（类似函数中的形参与实参）</p>
<h3 id="函数中的泛型使用" tabindex="-1"><a class="header-anchor" href="#函数中的泛型使用" aria-hidden="true">#</a> 函数中的泛型使用</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>
<span class="token comment">// function join(first: string | number, second: string | number) {</span>
<span class="token comment">//   return `${first}${second}`</span>
<span class="token comment">// }</span>
<span class="token comment">// join('jspang', 1); // 如果我想第一个参数是字符串，第二个也必须是字符串，这么就用到泛型</span>


<span class="token comment">// 泛型使用，如同定义形参，在调用时指定类型</span>
<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">join</span><span class="token generic class-name"><span class="token operator">&lt;</span>JSPang<span class="token operator">></span></span></span><span class="token punctuation">(</span>first<span class="token operator">:</span> JSPang<span class="token punctuation">,</span> second<span class="token operator">:</span> JSPang<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>first<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>second<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
<span class="token punctuation">}</span>

<span class="token generic-function"><span class="token function">join</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token string">'jspang'</span><span class="token punctuation">,</span> <span class="token string">'123'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token generic-function"><span class="token function">join</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 泛型中数组的使用</span>
<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">myFun</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">ANY</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>params<span class="token operator">:</span><span class="token constant">ANY</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// ANY[] or Array&lt;ANY></span>
  <span class="token keyword">return</span> params
<span class="token punctuation">}</span>
<span class="token generic-function"><span class="token function">myFun</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>


<span class="token comment">// 两个类型参数的使用（工作中，常用T表示泛型）</span>
<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">join2</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span><span class="token constant">P</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>first<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span> second<span class="token operator">:</span> <span class="token constant">P</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>first<span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>second<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
<span class="token punctuation">}</span>

<span class="token generic-function"><span class="token function">join2</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span><span class="token builtin">number</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token string">'jspang'</span><span class="token punctuation">,</span> <span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token generic-function"><span class="token function">join2</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token string">'22'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">join2</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token string">'22'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 泛型也支持类型推断 （鼠标移到函数名有提示）</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="class类中使用泛型" tabindex="-1"><a class="header-anchor" href="#class类中使用泛型" aria-hidden="true">#</a> class类中使用泛型</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// class SelectGirl {</span>
<span class="token comment">//   constructor(private girls: string[] | number[]) { } // private 私有的参数，外部无法修改</span>
<span class="token comment">//   getGirl(index: number): string | number {</span>
<span class="token comment">//     return this.girls[index]</span>
<span class="token comment">//   }</span>
<span class="token comment">// }</span>

<span class="token comment">// 使用泛型</span>
<span class="token keyword">class</span> <span class="token class-name">SelectGirl<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token punctuation">{</span>   <span class="token comment">// 泛型的约束: &lt;T extends number | string></span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> girls<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span> <span class="token comment">// private 私有的参数，外部无法修改</span>
  <span class="token function">getGirl</span><span class="token punctuation">(</span>index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>girls<span class="token punctuation">[</span>index<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// const selectGirl = new SelectGirl&lt;string>(['大脚', 'xiaohong', 'xiaobai'])</span>
<span class="token keyword">const</span> selectGirl <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SelectGirl<span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">101</span><span class="token punctuation">,</span> <span class="token number">102</span><span class="token punctuation">,</span> <span class="token number">103</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>selectGirl<span class="token punctuation">.</span><span class="token function">getGirl</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token comment">// 泛型中的继承</span>
<span class="token keyword">interface</span> <span class="token class-name">Girl</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">SelectGirl2<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> Girl<span class="token operator">></span></span> <span class="token punctuation">{</span> <span class="token comment">// 泛型T中必须有一个name属性，继承自Girl接口</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> girls<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span> <span class="token comment">// private 私有的参数，外部无法修改</span>
  <span class="token function">getGirl</span><span class="token punctuation">(</span>index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>girls<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">.</span>name
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> selectGirl2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SelectGirl2</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>name<span class="token operator">:</span> <span class="token string">'大脚1'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>name<span class="token operator">:</span> <span class="token string">'大脚2'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>name<span class="token operator">:</span> <span class="token string">'大脚3'</span><span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>selectGirl2<span class="token punctuation">.</span><span class="token function">getGirl</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="类型保护" tabindex="-1"><a class="header-anchor" href="#类型保护" aria-hidden="true">#</a> 类型保护</h2>
<p>我们通常在 JavaScript 中通过判断来处理⼀些逻辑，在 TypeScript 中这种条件语句块还有另外⼀</p>
<p>个特性：根据判断逻辑的结果，缩⼩类型范围（有点类似断⾔），这种特性称为 类型保护 ，触发条</p>
<p>件：</p>
<ul>
<li>
<p>逻辑条件语句块：if、else、elseif</p>
</li>
<li>
<p>特定的⼀些关键字：typeof、instanceof、in</p>
</li>
</ul>
<h4 id="typeof" tabindex="-1"><a class="header-anchor" href="#typeof" aria-hidden="true">#</a> typeof</h4>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token operator">|</span><span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token comment">// error，不能保证 a 就是字符串</span>
 a<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> a <span class="token operator">===</span> <span class="token string">'string'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token comment">// ok</span>
 a<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
 <span class="token comment">// ok</span>
 a<span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="instanceof" tabindex="-1"><a class="header-anchor" href="#instanceof" aria-hidden="true">#</a> instanceof</h4>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span>a<span class="token operator">:</span> Date<span class="token operator">|</span><span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token keyword">instanceof</span> <span class="token class-name"><span class="token builtin">Array</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 a<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
 a<span class="token punctuation">.</span><span class="token function">getFullYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="in" tabindex="-1"><a class="header-anchor" href="#in" aria-hidden="true">#</a> in</h4>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">IA</span></span> <span class="token punctuation">{</span>
 x<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
 y<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">IB</span></span> <span class="token punctuation">{</span>
 a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
 b<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span>arg<span class="token operator">:</span> <span class="token constant">IA</span> <span class="token operator">|</span> <span class="token constant">IB</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">'x'</span> <span class="token keyword">in</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token comment">// ok</span>
 arg<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
 <span class="token comment">// error</span>
 arg<span class="token punctuation">.</span>a<span class="token punctuation">;</span>
 <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
 <span class="token comment">// ok</span>
 arg<span class="token punctuation">.</span>a<span class="token punctuation">;</span>
 <span class="token comment">// error</span>
字⾯量类型保护
如果类型为字⾯量类型，那么还可以通过该字⾯量类型的字⾯值进⾏推断
⾃定义类型保护
有的时候，以上的⼀些⽅式并不能满⾜⼀些特殊情况，则可以⾃定义类型保护规则
 arg<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="字面量类型保护" tabindex="-1"><a class="header-anchor" href="#字面量类型保护" aria-hidden="true">#</a> 字面量类型保护</h4>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">IA</span></span> <span class="token punctuation">{</span>
 type<span class="token operator">:</span> <span class="token string">'IA'</span><span class="token punctuation">;</span>
 x<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
 y<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">IB</span></span> <span class="token punctuation">{</span>
 type<span class="token operator">:</span> <span class="token string">'IB'</span><span class="token punctuation">;</span>
 a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
 b<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span>arg<span class="token operator">:</span> <span class="token constant">IA</span> <span class="token operator">|</span> <span class="token constant">IB</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span> <span class="token punctuation">(</span>arg<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">'IA'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token comment">// ok</span>
     arg<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
     <span class="token comment">// error</span>
     arg<span class="token punctuation">.</span>a<span class="token punctuation">;</span>
   <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
     <span class="token comment">// ok</span>
     arg<span class="token punctuation">.</span>a<span class="token punctuation">;</span>
     <span class="token comment">// error</span>
     arg<span class="token punctuation">.</span>x<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="自定义类型保护" tabindex="-1"><a class="header-anchor" href="#自定义类型保护" aria-hidden="true">#</a> 自定义类型保护</h4>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">canEach</span><span class="token punctuation">(</span>data<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> data <span class="token keyword">is</span> Element<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">|</span>NodeList <span class="token punctuation">{</span>
 <span class="token keyword">return</span> data<span class="token punctuation">.</span>forEach <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">fn2</span><span class="token punctuation">(</span>elements<span class="token operator">:</span> Element<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">|</span>NodeList<span class="token operator">|</span>Element<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token function">canEach</span><span class="token punctuation">(</span>elements<span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
     elements<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>el<span class="token operator">:</span> Element<span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
        el<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">'box'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
   elements<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">'box'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>data is Element[]|NodeList</code> 是⼀种类型谓词，格式为： <code v-pre>xx is XX</code> ，返回这种类型的函数就可以</p>
<p>被 TypeScript 识别为类型保护</p>
<h2 id="类型操作" tabindex="-1"><a class="header-anchor" href="#类型操作" aria-hidden="true">#</a> 类型操作</h2>
<h4 id="typeof-1" tabindex="-1"><a class="header-anchor" href="#typeof-1" aria-hidden="true">#</a> typeof</h4>
<p>获取数据的类型</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> str <span class="token operator">=</span> <span class="token string">'kkk'</span>

<span class="token keyword">let</span> t <span class="token operator">=</span> <span class="token keyword">typeof</span> str <span class="token comment">// 使用typeof获取str的类型，返回string给变量t （原生js的typeof使用）</span>

<span class="token keyword">type</span> <span class="token class-name">myType</span> <span class="token operator">=</span> <span class="token keyword">typeof</span> str <span class="token comment">// 使用typeof获取str的类型，返回string给类型myType （TS的typeof使用）</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="keyof" tabindex="-1"><a class="header-anchor" href="#keyof" aria-hidden="true">#</a> keyof</h4>
<p>获取类型的所有<code v-pre>key</code>的集合</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// 使用示例1</span>
<span class="token keyword">interface</span> <span class="token class-name">Person</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">PersonKeys</span> <span class="token operator">=</span> <span class="token keyword">keyof</span> Person
<span class="token comment">// 等同： type PersonKeys = 'name' | 'age'; // 注意是key的集合，不是值的集合</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token comment">// 使用示例2</span>
<span class="token keyword">let</span> p1 <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">'xx'</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span> <span class="token number">28</span>
<span class="token punctuation">}</span>

<span class="token comment">// keyof typeof p1 的作用，首先typeof将p1对象的类型取出，keyof再将类型的key集合取出，结果：'name' | 'age'</span>
<span class="token keyword">function</span> <span class="token function">getPersonVal</span><span class="token punctuation">(</span>k<span class="token operator">:</span> <span class="token keyword">keyof</span> <span class="token keyword">typeof</span> p1<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> p1<span class="token punctuation">[</span>k<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="in-1" tabindex="-1"><a class="header-anchor" href="#in-1" aria-hidden="true">#</a> in</h4>
<p>内部使用<code v-pre>for...in</code>对类型进行遍历</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Person</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">PersonKeys</span> <span class="token operator">=</span> <span class="token keyword">keyof</span> Person<span class="token punctuation">;</span> <span class="token comment">// 'name' | 'age'</span>
<span class="token keyword">type</span> <span class="token class-name">NewPerson</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>k <span class="token keyword">in</span> PersonKeys<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token comment">// 也可写成 [k in 'name' | 'age']: string </span>
  <span class="token comment">// 或 [k in keyof Person]: string</span>
<span class="token punctuation">}</span> <span class="token comment">// {name: string; age: string;}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置文件tsconfig-json" tabindex="-1"><a class="header-anchor" href="#配置文件tsconfig-json" aria-hidden="true">#</a> 配置文件tsconfig.json</h2>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token comment">// 此文件由命令 tsc -init 生成</span>
<span class="token comment">// 直接运行 tsc 命令就会运用此配置文件</span>
<span class="token comment">// 选项详解：https://www.tslang.cn/docs/handbook/compiler-options.html</span>
<span class="token punctuation">{</span>
  <span class="token comment">// "include": ["demo15-1.ts"],              // 要编译的指定文件，不配置此项时运行tsc默认编译全部</span>
  <span class="token comment">// "files": ["demo15-1.ts"],                // 和include类似</span>
  <span class="token comment">// "exclude": ["demo15-3.ts"],              // 要排除编译的指定文件</span>
  <span class="token property">"compilerOptions"</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 编译选项</span>
    <span class="token comment">/* 基本选项 */</span>
    <span class="token comment">// "incremental": true,                   /* 启用增量编译 */</span>
    <span class="token property">"target"</span><span class="token operator">:</span> <span class="token string">"es5"</span><span class="token punctuation">,</span>                          <span class="token comment">/* 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */</span>
    <span class="token property">"module"</span><span class="token operator">:</span> <span class="token string">"commonjs"</span><span class="token punctuation">,</span>                     <span class="token comment">/* 指定模块代码生成: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */</span>
    <span class="token comment">// "lib": [],                             /* 指定要包含在编译中的库文件. */</span>
    <span class="token comment">// "allowJs": true,                       /* 允许编译javascript文件*/</span>
    <span class="token comment">// "checkJs": true,                       /* 报告.js文件中的错误。 */</span>
    <span class="token comment">// "jsx": "preserve",                     /* 指定 JSX代码生成: 'preserve', 'react-native', or 'react'. */</span>
    <span class="token comment">// "declaration": true,                   /* 生成相应的 .d.ts文件 */</span>
    <span class="token comment">// "declarationMap": true,                /* 为每个相应的 .d.ts文件生成一个sourcemap (编译后代码对源码的映射)*/</span>
    <span class="token property">"sourceMap"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>                        <span class="token comment">/* 生成源文件与输出文件的映射关系文件(.map)。*/</span>
    <span class="token comment">// "outFile": "./",                       /* 将输出文件合并为一个文件. */</span>
    <span class="token property">"outDir"</span><span class="token operator">:</span> <span class="token string">"./build"</span><span class="token punctuation">,</span>                      <span class="token comment">/* 输出的js文件目录。 */</span>
    <span class="token property">"rootDir"</span><span class="token operator">:</span> <span class="token string">"./src"</span><span class="token punctuation">,</span>                       <span class="token comment">/* ts源文件目录。 */</span>
    <span class="token comment">// "composite": true,                     /* 启用 项目编译 */</span>
    <span class="token comment">// "tsBuildInfoFile": "./",               /* 指定用于存储增量编译信息的文件 */</span>
    <span class="token comment">// "removeComments": true,                /* 不输出注释到编译结果.（删除所有注释，除了以 /!*开头的版权信息。） */</span>
    <span class="token comment">// "noEmit": true,                        /* 不发出输出.Do not emit outputs. */</span>
    <span class="token comment">// "importHelpers": true,                 /* 从“tslib”导入发出助手. Import emit helpers from 'tslib'. */</span>
    <span class="token comment">// "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */</span>
    <span class="token comment">// "isolatedModules": true,               /* 将每个文件作为单独的模块（与“ts.transpileModule”类似） */</span>

    <span class="token comment">/* 严格的类型检查选项 */</span>
    <span class="token property">"strict"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>                           <span class="token comment">/* 启用所有严格类型检查选项。 打开此选项后，下面这些选项就不需要单独设置*/</span>
    <span class="token comment">// "noImplicitAny": true,                 /* 对隐含的“any”类型的表达式和声明引发错误. (为false时允许any不用特意声明)*/</span>
    <span class="token comment">// "strictNullChecks": true,              /* 启用严格的null检查. (为false时允许赋值为null)*/</span>
    <span class="token comment">// "strictFunctionTypes": true,           /* 启用严格检查函数类型. */</span>
    <span class="token comment">// "strictBindCallApply": true,           /* 启用函数上严格的“bind”、“call”和“apply”方法. */</span>
    <span class="token comment">// "strictPropertyInitialization": true,  /* 启用 严格检查类中的属性初始化. */</span>
    <span class="token comment">// "noImplicitThis": true,                /* 在隐含的“any”类型的“this”表达式上引发错误。 */</span>
    <span class="token comment">// "alwaysStrict": true,                  /* 以严格模式解析并为每个源文件发出“use strict”。 */</span>

    <span class="token comment">/* 附加检查。Additional Checks  */</span>
    <span class="token comment">// "noUnusedLocals": true,                /* 若有未使用的局部变量则抛错 */</span>
    <span class="token comment">// "noUnusedParameters": true,            /* 若有未使用的参数则抛错。 */</span>
    <span class="token comment">// "noImplicitReturns": true,             /* 不是函数的所有返回路径都有返回值时报错。*/</span>
    <span class="token comment">// "noFallthroughCasesInSwitch": true,    /* 报告switch语句的fallthrough错误。（即，不允许switch的case语句贯穿） */</span>

    <span class="token comment">/* 模块解析选项 */</span>
    <span class="token comment">// "moduleResolution": "node",            /* 决定如何处理模块：'node' (Node.js) or 'classic' (TypeScript pre-1.6). */</span>
    <span class="token comment">// "baseUrl": "./",                       /* 用于解析非绝对模块名称的基础目录。 */</span>
    <span class="token comment">// "paths": {},                           /* 模块名到基于 baseUrl的路径映射的列表。 */</span>
    <span class="token comment">// "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */</span>
    <span class="token comment">// "typeRoots": [],                       /* List of folders to include type definitions from. */</span>
    <span class="token comment">// "types": [],                           /* 要包含的类型声明文件名列表 */</span>
    <span class="token comment">// "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */</span>
    <span class="token property">"esModuleInterop"</span><span class="token operator">:</span> <span class="token boolean">true</span>                   <span class="token comment">/* 启用s emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */</span>
    <span class="token comment">// "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */</span>
    <span class="token comment">// "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */</span>

    <span class="token comment">/* Source Map Options */</span>
    <span class="token comment">// "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */</span>
    <span class="token comment">// "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */</span>
    <span class="token comment">// "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */</span>
    <span class="token comment">// "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */</span>

    <span class="token comment">/* Experimental Options */</span>
    <span class="token comment">// "experimentalDecorators": true,        /* 启用s experimental support for ES7 decorators. */</span>
    <span class="token comment">// "emitDecoratorMetadata": true,         /* 启用s experimental support for emitting type metadata for decorators. */</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


