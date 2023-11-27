<template><div><blockquote>
<p>说明：本章内容为博主在原教程基础上添加自己的学习笔记，来源<a href="https://wangdoc.com/javascript/" target="_blank" rel="noopener noreferrer">https://wangdoc.com/javascript/<ExternalLinkIcon/></a>，教程版权归原作者所有。</p>
</blockquote>
<h1 id="基础篇" tabindex="-1"><a class="header-anchor" href="#基础篇" aria-hidden="true">#</a> 基础篇</h1>
<h2 id="一、js的一些名词概念" tabindex="-1"><a class="header-anchor" href="#一、js的一些名词概念" aria-hidden="true">#</a> 一、JS的一些名词概念</h2>
<h4 id="什么是作用域" tabindex="-1"><a class="header-anchor" href="#什么是作用域" aria-hidden="true">#</a> 什么是作用域？</h4>
<p>变量存在的范围。</p>
<p>可分为全局作用域和函数作用域，ES6新增块级作用域。</p>
<h4 id="什么是闭包" tabindex="-1"><a class="header-anchor" href="#什么是闭包" aria-hidden="true">#</a> 什么是闭包？</h4>
<p>闭包就是能够读取其他函数内部变量的函数。</p>
<ul>
<li>闭包的形式：函数内部定义函数</li>
<li>本质上闭包就是将函数内部和外部连接起来的一座桥梁</li>
</ul>
<p>闭包的作用：</p>
<ul>
<li>可以读取函数内部变量</li>
<li>让这些变量始终保持在内存中，即闭包可以使得它诞生的环境一直存在。</li>
<li>封装对象的私有属性和私有方法</li>
</ul>
<h4 id="什么是构造函数" tabindex="-1"><a class="header-anchor" href="#什么是构造函数" aria-hidden="true">#</a> 什么是构造函数？</h4>
<p>用于构造(生成)实例的一个函数，使实例拥有构造函数内定于的属性和方法。</p>
<h4 id="什么是实例对象" tabindex="-1"><a class="header-anchor" href="#什么是实例对象" aria-hidden="true">#</a> 什么是实例对象？</h4>
<p>实例对象就是通过new 构造函数生成的，拥有构造函数内定于的属性和方法的一个对象。</p>
<h4 id="什么是this" tabindex="-1"><a class="header-anchor" href="#什么是this" aria-hidden="true">#</a> 什么是this？</h4>
<p>就是属性或方法当前所在的对象，指向当前运行环境（对象）</p>
<h4 id="什么是原型" tabindex="-1"><a class="header-anchor" href="#什么是原型" aria-hidden="true">#</a> 什么是原型？</h4>
<p>每个函数都有一个prototype属性，指向一个对象，该对象称为原型对象。</p>
<h4 id="什么是原型链" tabindex="-1"><a class="header-anchor" href="#什么是原型链" aria-hidden="true">#</a> 什么是原型链？</h4>
<p>所有对象都有自己的原型对象，由于原型对象也是对象，因此它也有自己的原型，这就会形成一个原型链。</p>
<p>最顶层的原型是Object.prototype。</p>
<blockquote>
<p>读取对象属性时，JS会先在对象自身上找，找到就直接返回，如果找不到，会到原型上找，如果还是找不到，就会去原型的原型上找，最终会到最顶层的Object.prototype上找，还是找不到就会返回undefined。</p>
</blockquote>
<h4 id="什么是constructor" tabindex="-1"><a class="header-anchor" href="#什么是constructor" aria-hidden="true">#</a> 什么是constructor？</h4>
<p>prototype原型对象都有一个constructor属性，默认指向prototype对象所在的构造函数。</p>
<h4 id="什么是包装对象" tabindex="-1"><a class="header-anchor" href="#什么是包装对象" aria-hidden="true">#</a> 什么是包装对象？</h4>
<p>包装对象指的是将原始类型（数字、字符串、布尔值）进行实例化。</p>
<h2 id="二、数据类型的转换" tabindex="-1"><a class="header-anchor" href="#二、数据类型的转换" aria-hidden="true">#</a> 二、数据类型的转换</h2>
<h3 id="_1、强制-手动-转换" tabindex="-1"><a class="header-anchor" href="#_1、强制-手动-转换" aria-hidden="true">#</a> 1、强制（手动）转换</h3>
<p>强制转换主要指使用<code v-pre>Number()</code>、<code v-pre>String()</code>和<code v-pre>Boolean()</code>三个函数，手动将各种类型的值，分别转换成<strong>数字、字符串、布尔值</strong>。</p>
<h4 id="number" tabindex="-1"><a class="header-anchor" href="#number" aria-hidden="true">#</a> Number()</h4>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 数值：转换后还是原来的值</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token number">324</span><span class="token punctuation">)</span> <span class="token comment">// 324</span>

<span class="token comment">// 字符串：如果可以被解析为数值，则转换为相应的数值</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">'324'</span><span class="token punctuation">)</span> <span class="token comment">// 324</span>

<span class="token comment">// 字符串：如果不可以被解析为数值，返回 NaN</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">'324abc'</span><span class="token punctuation">)</span> <span class="token comment">// NaN</span>

<span class="token comment">// 空字符串转为0</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span> <span class="token comment">// 0</span>

<span class="token comment">// 布尔值：true 转成 1，false 转成 0</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token comment">// 1</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token comment">// 0</span>

<span class="token comment">// undefined：转成 NaN</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token comment">// NaN</span>

<span class="token comment">// null：转成0</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// 0</span>

<span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// NaN</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// NaN</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 5</span>
<span class="token function">Number</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 0</span>

<span class="token comment">//使用parseInt()转数组</span>
<span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="string" tabindex="-1"><a class="header-anchor" href="#string" aria-hidden="true">#</a> String()</h4>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 原始类型的转换</span>
<span class="token function">String</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span> <span class="token comment">// "123"</span>
<span class="token function">String</span><span class="token punctuation">(</span><span class="token string">'abc'</span><span class="token punctuation">)</span> <span class="token comment">// "abc"</span>
<span class="token function">String</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token comment">// "true"</span>
<span class="token function">String</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token comment">// "undefined"</span>
<span class="token function">String</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// "null"</span>

<span class="token comment">// 对象的转换</span>
<span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// "[object Object]"</span>
<span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// "1,2,3"</span>
<span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// ""  空字符串</span>
<span class="token function">String</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// "function(){}"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="boolean" tabindex="-1"><a class="header-anchor" href="#boolean" aria-hidden="true">#</a> Boolean()</h4>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 除了这五个为false，其他都为true</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token number">NaN</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span> <span class="token comment">// false</span>

<span class="token comment">//true</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Boolean</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true</span>

<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token string">' '</span><span class="token punctuation">)</span> <span class="token comment">// true // 注意字符串内有个空格</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、自动转换" tabindex="-1"><a class="header-anchor" href="#_2、自动转换" aria-hidden="true">#</a> 2、自动转换</h3>
<p>下面介绍自动转换，它是<strong>以强制转换为基础的</strong>。</p>
<p>遇到以下三种情况时，JavaScript 会自动转换数据类型，即转换是自动完成的，用户不可见。</p>
<p>第一种情况，<strong>不同类型的数据互相运算</strong>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token number">123</span> <span class="token operator">+</span> <span class="token string">'abc'</span> <span class="token comment">// "123abc"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第二种情况，<strong>对非布尔值类型的数据求布尔值</strong>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">'abc'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hello'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>  <span class="token comment">// "hello"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第三种情况，<strong>对非数值类型的值使用一元运算符（即<code v-pre>+</code>和<code v-pre>-</code>）</strong>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">+</span> <span class="token punctuation">{</span><span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token string">'bar'</span><span class="token punctuation">}</span> <span class="token comment">// NaN</span>
<span class="token operator">-</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span> <span class="token comment">// NaN</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>自动转换的规则是这样的：预期什么类型的值，就调用该类型的转换函数。比如，某个位置预期为字符串，就调用<code v-pre>String</code>函数进行转换。如果该位置即可以是字符串，也可能是数值，那么默认转为数值。</p>
<p>由于自动转换具有不确定性，而且不易除错，建议在预期为布尔值、数值、字符串的地方，全部使用<code v-pre>Boolean</code>、<code v-pre>Number</code>和<code v-pre>String</code>函数进行显式转换。</p>
<h4 id="自动转换为布尔值-boolean" tabindex="-1"><a class="header-anchor" href="#自动转换为布尔值-boolean" aria-hidden="true">#</a> 自动转换为布尔值（Boolean）</h4>
<p>JavaScript 遇到预期为布尔值的地方（比如<code v-pre>if</code>语句的条件部分），就会将非布尔值的参数自动转换为布尔值。系统内部会自动调用<code v-pre>Boolean</code>函数。</p>
<p>因此除了以下五个值，其他都是自动转为<code v-pre>true</code>。</p>
<ul>
<li><code v-pre>undefined</code></li>
<li><code v-pre>null</code></li>
<li><code v-pre>+0</code>或<code v-pre>-0</code></li>
<li><code v-pre>NaN</code></li>
<li><code v-pre>''</code>（空字符串）</li>
</ul>
<p>下面这个例子中，条件部分的每个值都相当于<code v-pre>false</code>，使用否定运算符后，就变成了<code v-pre>true</code>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token operator">!</span><span class="token keyword">undefined</span>
  <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token keyword">null</span>
  <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token number">0</span>
  <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token number">NaN</span>
  <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token string">''</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'true'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面两种写法，有时也用于将一个表达式转为布尔值。它们内部调用的也是<code v-pre>Boolean</code>函数。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 三元运算符</span>
expression <span class="token operator">?</span> <span class="token boolean">true</span> <span class="token operator">:</span> <span class="token boolean">false</span>

<span class="token comment">// 取反运算符</span>
<span class="token operator">!</span><span class="token operator">!</span> expression
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="自动转换为字符串-string" tabindex="-1"><a class="header-anchor" href="#自动转换为字符串-string" aria-hidden="true">#</a> 自动转换为字符串（String）</h4>
<p>JavaScript 遇到预期为字符串的地方，就会将非字符串的值自动转为字符串。<strong>具体规则是，先将复合类型的值转为原始类型的值，再将原始类型的值转为字符串</strong>。</p>
<p>字符串的自动转换，<strong>主要发生在字符串的加法运算时</strong>。当一个值为字符串，另一个值为非字符串，则后者转为字符串。</p>
<h5 id="所有类型的值与字符串相加都会变成字符串" tabindex="-1"><a class="header-anchor" href="#所有类型的值与字符串相加都会变成字符串" aria-hidden="true">#</a> 所有类型的值与字符串相加都会变成字符串</h5>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token string">'5'</span> <span class="token operator">+</span> <span class="token number">1</span> <span class="token comment">// '51'</span>
 <span class="token number">1</span>  <span class="token operator">+</span> <span class="token string">'5'</span> <span class="token comment">// '15'</span>
<span class="token string">'5'</span> <span class="token operator">+</span> <span class="token boolean">true</span> <span class="token comment">// "5true"</span>
<span class="token string">'5'</span> <span class="token operator">+</span> <span class="token boolean">false</span> <span class="token comment">// "5false"</span>
<span class="token string">'5'</span> <span class="token operator">+</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// "5[object Object]"</span>
 <span class="token number">5</span> <span class="token operator">+</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// "5[object Object]"</span>
<span class="token string">'5'</span> <span class="token operator">+</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// "5"</span>
 <span class="token number">5</span> <span class="token operator">+</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// "5"</span>
<span class="token string">'5'</span> <span class="token operator">+</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// "5function (){}"</span>
<span class="token string">'5'</span> <span class="token operator">+</span> <span class="token keyword">undefined</span> <span class="token comment">// "5undefined"</span>
<span class="token string">'5'</span> <span class="token operator">+</span> <span class="token keyword">null</span> <span class="token comment">// "5null"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h5>
<p>这种自动转换不注意的话很容易出错。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token string">'100'</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

obj<span class="token punctuation">.</span>width <span class="token operator">+</span> <span class="token number">20</span> <span class="token comment">// "10020"</span>
<span class="token function">parerInt</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>width<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">20</span> <span class="token comment">// 120</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，开发者可能期望返回<code v-pre>120</code>，但是由于自动转换，实际上返回了一个字符<code v-pre>10020</code>。正确做法是先把字符串转成数字。</p>
<h4 id="自动转换为数值-number" tabindex="-1"><a class="header-anchor" href="#自动转换为数值-number" aria-hidden="true">#</a> 自动转换为数值（Number）</h4>
<p>JavaScript 遇到预期为数值的地方，就会将参数值自动转换为数值。系统内部会自动调用<code v-pre>Number</code>函数。</p>
<h5 id="除加号与字符串运行会转成字符串外-其他运行基本都会自动转成数值" tabindex="-1"><a class="header-anchor" href="#除加号与字符串运行会转成字符串外-其他运行基本都会自动转成数值" aria-hidden="true">#</a> 除加号与字符串运行会转成字符串外，其他运行基本都会自动转成数值</h5>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token string">'5'</span> <span class="token operator">-</span> <span class="token string">'2'</span> <span class="token comment">// 3</span>
<span class="token string">'5'</span> <span class="token operator">*</span> <span class="token string">'2'</span> <span class="token comment">// 10</span>
<span class="token boolean">true</span> <span class="token operator">-</span> <span class="token number">1</span>  <span class="token comment">// 0</span>
<span class="token boolean">false</span> <span class="token operator">-</span> <span class="token number">1</span> <span class="token comment">// -1</span>
<span class="token string">'1'</span> <span class="token operator">-</span> <span class="token number">1</span>   <span class="token comment">// 0</span>
<span class="token string">'5'</span> <span class="token operator">*</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>    <span class="token comment">// 0</span>
<span class="token boolean">false</span> <span class="token operator">/</span> <span class="token string">'5'</span> <span class="token comment">// 0</span>
<span class="token string">'abc'</span> <span class="token operator">-</span> <span class="token number">1</span>   <span class="token comment">// NaN</span>
<span class="token keyword">null</span> <span class="token operator">+</span> <span class="token number">1</span> <span class="token comment">// 1</span>
<span class="token keyword">undefined</span> <span class="token operator">+</span> <span class="token number">1</span> <span class="token comment">// NaN</span>

<span class="token boolean">true</span><span class="token operator">+</span><span class="token boolean">true</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，运算符两侧的运算子，都被转成了数值。</p>
<blockquote>
<p>注意：<code v-pre>null</code>转为数值时为<code v-pre>0</code>，而<code v-pre>undefined</code>转为数值时为<code v-pre>NaN</code>。</p>
</blockquote>
<p><strong>数值与布尔值、null也会转为数值</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token number">5</span><span class="token operator">+</span><span class="token boolean">true</span> <span class="token comment">// 6</span>
<span class="token number">5</span><span class="token operator">+</span><span class="token boolean">false</span> <span class="token comment">// 5</span>
<span class="token number">5</span><span class="token operator">+</span><span class="token keyword">null</span> <span class="token comment">//5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一元运算符也会把运算子转成数值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">+</span><span class="token string">'abc'</span> <span class="token comment">// NaN</span>
<span class="token operator">-</span><span class="token string">'abc'</span> <span class="token comment">// NaN</span>
<span class="token operator">+</span><span class="token boolean">true</span> <span class="token comment">// 1</span>
<span class="token operator">-</span><span class="token boolean">false</span> <span class="token comment">// 0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、错误处理机制" tabindex="-1"><a class="header-anchor" href="#三、错误处理机制" aria-hidden="true">#</a> 三、错误处理机制</h2>
<h3 id="_1、error实例对象" tabindex="-1"><a class="header-anchor" href="#_1、error实例对象" aria-hidden="true">#</a> 1、Error实例对象</h3>
<p>JavaScript 解析或运行时，一旦发生错误，引擎就会抛出一个错误对象。JavaScript 原生提供<code v-pre>Error</code>构造函数，所有抛出的错误都是这个构造函数的实例。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> err <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'出错了'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
err<span class="token punctuation">.</span>message <span class="token comment">// "出错了"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，我们调用<code v-pre>Error</code>构造函数，生成一个实例对象<code v-pre>err</code>。<code v-pre>Error</code>构造函数接受一个参数，表示错误提示，可以从实例的<code v-pre>message</code>属性读到这个参数。<strong>抛出<code v-pre>Error</code>实例对象以后，整个程序就中断在发生错误的地方，不再往下执行</strong>。</p>
<p>JavaScript 语言标准只提到，<code v-pre>Error</code>实例对象必须有<code v-pre>message</code>属性，表示出错时的提示信息，没有提到其他属性。大多数 JavaScript 引擎，对<code v-pre>Error</code>实例还提供<code v-pre>name</code>和<code v-pre>stack</code>属性，分别表示错误的名称和错误的堆栈，但它们是非标准的，不是每种实现都有。</p>
<ul>
<li><strong>message</strong>：错误提示信息</li>
<li><strong>name</strong>：错误名称（非标准属性）</li>
<li><strong>stack</strong>：错误的堆栈（非标准属性）</li>
</ul>
<p>使用<code v-pre>name</code>和<code v-pre>message</code>这两个属性，可以对发生什么错误有一个大概的了解。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> err <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'出错了'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">': '</span> <span class="token operator">+</span> err<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Error: 出错了</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>stack</code>属性用来查看错误发生时的堆栈。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">throwit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">catchit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token function">throwit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// print stack trace</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">catchit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// Error</span>
<span class="token comment">//    at throwit (~/examples/throwcatch.js:9:11) // 堆栈的最内层throwit函数</span>
<span class="token comment">//    at catchit (~/examples/throwcatch.js:3:9) // 向外一层catchit函数</span>
<span class="token comment">//    at repl:1:5 // 函数的运行环境</span>


<span class="token comment">// 堆栈信息说明</span>
<span class="token comment">// Error 错误</span>
<span class="token comment">//    at throwit 在throwit方法 (~/examples/throwcatch.js:9:11) 文件名：第几行：第几个字符</span>
<span class="token comment">//    at catchit 在catchit方法 (~/examples/throwcatch.js:3:9) 文件名：第几行：第几个字符</span>
<span class="token comment">//    at repl:1:5 // 函数的运行环境</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，错误堆栈的最内层是<code v-pre>throwit</code>函数，然后是<code v-pre>catchit</code>函数，最后是函数的运行环境。</p>
<h3 id="_2、原生错误类型" tabindex="-1"><a class="header-anchor" href="#_2、原生错误类型" aria-hidden="true">#</a> 2、原生错误类型</h3>
<p><code v-pre>Error</code>实例对象是最一般的错误类型，在它的基础上，JavaScript 还定义了其他6种错误对象。也就是说，存在<code v-pre>Error</code>的6个派生对象。</p>
<h4 id="syntaxerror-对象-语法错误" tabindex="-1"><a class="header-anchor" href="#syntaxerror-对象-语法错误" aria-hidden="true">#</a> SyntaxError 对象（语法错误）</h4>
<p><code v-pre>SyntaxError</code>对象是解析代码时发生的<strong>语法错误</strong>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 变量名错误</span>
<span class="token keyword">var</span> 1a<span class="token punctuation">;</span>
<span class="token comment">// Uncaught SyntaxError: Invalid or unexpected token</span>
<span class="token comment">// 语法错误：无效或意外的标记符号</span>

<span class="token comment">// 缺少括号</span>
console<span class="token punctuation">.</span>log <span class="token string">'hello'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Uncaught SyntaxError: Unexpected string</span>
<span class="token comment">// 语法错误：意外的字符串</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的错误，都是在语法解析阶段就可以发现，所以会抛出<code v-pre>SyntaxError</code>。第一个错误提示是“token 非法”，第二个错误提示是“字符串不符合要求”。</p>
<h4 id="referenceerror-对象-引用错误" tabindex="-1"><a class="header-anchor" href="#referenceerror-对象-引用错误" aria-hidden="true">#</a> ReferenceError 对象（引用错误）</h4>
<p><code v-pre>ReferenceError</code>对象是<strong>引用一个不存在的变量时发生的错误</strong>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 使用一个不存在的变量</span>
unknownVariable
<span class="token comment">// Uncaught ReferenceError: unknownVariable is not defined</span>
<span class="token comment">// 引用错误： unknownVariable 没有定义</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一种触发场景是，将一个值分配给无法分配的对象，比如对函数的运行结果或者<code v-pre>this</code>赋值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 等号左侧不是变量</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">1</span>
<span class="token comment">// Uncaught ReferenceError: Invalid left-hand side in assignment</span>
<span class="token comment">// 引用错误： 赋值中左边是无效的</span>

<span class="token comment">// this 对象不能手动赋值</span>
<span class="token keyword">this</span> <span class="token operator">=</span> <span class="token number">1</span>
<span class="token comment">// ReferenceError: Invalid left-hand side in assignment</span>
<span class="token comment">// 引用错误：  赋值中左边是无效的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码对函数<code v-pre>console.log</code>的运行结果和<code v-pre>this</code>赋值，结果都引发了<code v-pre>ReferenceError</code>错误。</p>
<h4 id="rangeerror-对象-范围错误" tabindex="-1"><a class="header-anchor" href="#rangeerror-对象-范围错误" aria-hidden="true">#</a> RangeError 对象（范围错误）</h4>
<p><code v-pre>RangeError</code>对象是一个值<strong>超出有效范围时发生的错误</strong>。主要有几种情况，一是数组长度为负数，二是<code v-pre>Number</code>对象的方法参数超出范围，以及函数堆栈超过最大值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 数组长度不得为负数</span>
<span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token comment">// Uncaught RangeError: Invalid array length</span>
<span class="token comment">// 范围错误：无效的数组长度</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="typeerror-对象-类型错误" tabindex="-1"><a class="header-anchor" href="#typeerror-对象-类型错误" aria-hidden="true">#</a> TypeError 对象（类型错误）</h4>
<p><code v-pre>TypeError</code>对象是<strong>变量或参数不是预期类型时发生的错误</strong>。比如，对字符串、布尔值、数值等原始类型的值使用<code v-pre>new</code>命令，就会抛出这种错误，因为<code v-pre>new</code>命令的参数应该是一个构造函数。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">123</span>
<span class="token comment">// Uncaught TypeError: number is not a function</span>
<span class="token comment">// 类型错误： 数字不是一个函数</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">unknownMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// Uncaught TypeError: obj.unknownMethod is not a function</span>
<span class="token comment">// 类型错误：obj.unknownMethod 不是一个函数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的第二种情况，调用对象不存在的方法，也会抛出<code v-pre>TypeError</code>错误，因为<code v-pre>obj.unknownMethod</code>的值是<code v-pre>undefined</code>，而不是一个函数。</p>
<h4 id="urierror-对象-uri错误" tabindex="-1"><a class="header-anchor" href="#urierror-对象-uri错误" aria-hidden="true">#</a> URIError 对象 （URI错误）</h4>
<p><code v-pre>URIError</code>对象是 <strong>URI 相关函数的参数不正确时抛出的错误</strong>，主要涉及<code v-pre>encodeURI()</code>、<code v-pre>decodeURI()</code>、<code v-pre>encodeURIComponent()</code>、<code v-pre>decodeURIComponent()</code>、<code v-pre>escape()</code>和<code v-pre>unescape()</code>这六个函数。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">decodeURI</span><span class="token punctuation">(</span><span class="token string">'%2'</span><span class="token punctuation">)</span>
<span class="token comment">// URIError: URI malformed</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="evalerror-对象-eval错误" tabindex="-1"><a class="header-anchor" href="#evalerror-对象-eval错误" aria-hidden="true">#</a> EvalError 对象 （eval错误）</h4>
<p><code v-pre>eval</code>函数没有被正确执行时，会抛出<code v-pre>EvalError</code>错误。该<strong>错误类型已经不再使用了，只是为了保证与以前代码兼容，才继续保留。</strong></p>
<h4 id="总结-开发者手动使用" tabindex="-1"><a class="header-anchor" href="#总结-开发者手动使用" aria-hidden="true">#</a> 总结（开发者手动使用）</h4>
<p>以上这6种派生错误，连同原始的<code v-pre>Error</code>对象，都是构造函数。<strong>开发者可以使用它们，手动生成错误对象的实例</strong>。这些构造函数都接受一个参数，代表错误提示信息（message）。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> err1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'出错了！'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> err2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RangeError</span><span class="token punctuation">(</span><span class="token string">'出错了，变量超出有效范围！'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> err3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">'出错了，变量类型无效！'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

err1<span class="token punctuation">.</span>message <span class="token comment">// "出错了！"</span>
err2<span class="token punctuation">.</span>message <span class="token comment">// "出错了，变量超出有效范围！"</span>
err3<span class="token punctuation">.</span>message <span class="token comment">// "出错了，变量类型无效！"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、自定义错误" tabindex="-1"><a class="header-anchor" href="#_3、自定义错误" aria-hidden="true">#</a> 3、自定义错误</h3>
<p>除了 JavaScript 原生提供的七种错误对象，还可以定义自己的错误对象。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">UserError</span><span class="token punctuation">(</span><span class="token parameter">message</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>message <span class="token operator">=</span> message <span class="token operator">||</span> <span class="token string">'默认信息'</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'UserError'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">UserError</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 原型继承 Error对象</span>
<span class="token class-name">UserError</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">=</span> UserError<span class="token punctuation">;</span>

<span class="token comment">// 使用</span>
<span class="token keyword">new</span> <span class="token class-name">UserError</span><span class="token punctuation">(</span><span class="token string">'这是自定义的错误！'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码自定义一个错误对象<code v-pre>UserError</code>，让它继承<code v-pre>Error</code>对象。然后，就可以生成这种自定义类型的错误了。</p>
<h3 id="_4、throw-语句-中断程序并抛出错误" tabindex="-1"><a class="header-anchor" href="#_4、throw-语句-中断程序并抛出错误" aria-hidden="true">#</a> 4、throw 语句 （中断程序并抛出错误）</h3>
<p><code v-pre>throw</code>语句的作用是<strong>手动中断程序执行，抛出一个错误</strong>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'x 必须为正数'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// Uncaught Error: x 必须为正数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，如果变量<code v-pre>x</code>小于等于<code v-pre>0</code>，就手动抛出一个错误，告诉用户<code v-pre>x</code>的值不正确，整个程序就会在这里中断执行。可以看到，<code v-pre>throw</code>抛出的错误就是它的参数，这里是一个<code v-pre>Error</code>实例。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">UserError</span><span class="token punctuation">(</span><span class="token parameter">message</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>message <span class="token operator">=</span> message <span class="token operator">||</span> <span class="token string">'默认信息'</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'UserError'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UserError</span><span class="token punctuation">(</span><span class="token string">'出错了！'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Uncaught UserError {message: "出错了！", name: "UserError"}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>throw</code>抛出的是一个<code v-pre>UserError</code>实例。</p>
<p>实际上，<code v-pre>throw</code>可以抛出任何类型的值。也就是说，它的参数可以是任何值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 抛出一个字符串</span>
<span class="token keyword">throw</span> <span class="token string">'Error！'</span><span class="token punctuation">;</span>
<span class="token comment">// Uncaught Error！</span>

<span class="token comment">// 抛出一个数值</span>
<span class="token keyword">throw</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token comment">// Uncaught 42</span>

<span class="token comment">// 抛出一个布尔值</span>
<span class="token keyword">throw</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token comment">// Uncaught true</span>

<span class="token comment">// 抛出一个对象</span>
<span class="token keyword">throw</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">toString</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'Error!'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// Uncaught {toString: ƒ}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 JavaScript 引擎来说，<strong>遇到<code v-pre>throw</code>语句，程序就中止了</strong>。引擎会接收到<code v-pre>throw</code>抛出的信息，可能是一个错误实例，也可能是其他类型的值。</p>
<h3 id="_5、try-catch-结构-捕获错误-对错误进行处理-不中断" tabindex="-1"><a class="header-anchor" href="#_5、try-catch-结构-捕获错误-对错误进行处理-不中断" aria-hidden="true">#</a> 5、try...catch 结构（捕获错误，对错误进行处理，不中断）</h3>
<p>一旦发生错误，程序就中止执行了。JavaScript 提供了<code v-pre>try...catch</code>结构，<strong>允许对错误进行处理</strong>，选择是否往下执行。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'出错了!'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">": "</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// Error: 出错了!</span>
<span class="token comment">//   at &lt;anonymous>:3:9</span>
<span class="token comment">//   ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>try</code>代码块抛出错误（上例用的是<code v-pre>throw</code>语句），JavaScript 引擎就立即把代码的执行，转到<code v-pre>catch</code>代码块，或者说错误被<code v-pre>catch</code>代码块捕获了。<code v-pre>catch</code>接受一个参数，表示<code v-pre>try</code>代码块抛出的值。</p>
<p>如果你不确定某些代码是否会报错，就可以把它们放在<code v-pre>try...catch</code>代码块之中，便于进一步对错误进行处理。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 处理错误</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，如果函数<code v-pre>f</code>执行报错，就会进行<code v-pre>catch</code>代码块，接着对错误进行处理。</p>
<p><code v-pre>catch</code>代码块捕获错误之后，<strong>程序不会中断</strong>，会按照正常流程继续执行下去。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token string">"出错了"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">111</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">222</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 111</span>
<span class="token comment">// 222</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>try</code>代码块抛出的错误，被<code v-pre>catch</code>代码块捕获后，程序会继续向下执行。</p>
<p><code v-pre>catch</code>代码块之中，还可以再抛出错误，甚至使用嵌套的<code v-pre>try...catch</code>结构。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> n <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> n<span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">&lt;=</span> <span class="token number">50</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> e<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// Uncaught 100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>catch</code>代码之中又抛出了一个错误。</p>
<p>为了<strong>捕捉不同类型的错误</strong>，<code v-pre>catch</code>代码块之中可以加入判断语句。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
  foo<span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token keyword">instanceof</span> <span class="token class-name">EvalError</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">": "</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token keyword">instanceof</span> <span class="token class-name">RangeError</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">": "</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>catch</code>捕获错误之后，会判断错误类型（<code v-pre>EvalError</code>还是<code v-pre>RangeError</code>），进行不同的处理。</p>
<h3 id="_6、finally-代码块-在try-catch最后-必执行的" tabindex="-1"><a class="header-anchor" href="#_6、finally-代码块-在try-catch最后-必执行的" aria-hidden="true">#</a> 6、finally 代码块（在try..catch最后，必执行的）</h3>
<p><code v-pre>try...catch</code>结构允许在最后添加一个<code v-pre>finally</code>代码块，表示<strong>不管是否出现错误，都必需在最后运行的语句</strong>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">cleansUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'出错了……'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'此行不会执行'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span> <span class="token comment">// 不管有没有出错都会执行finally</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'完成清理工作'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'此行不会执行'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">cleansUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 完成清理工作</span>
<span class="token comment">// Uncaught Error: 出错了……</span>
<span class="token comment">//    at cleansUp (&lt;anonymous>:3:11)</span>
<span class="token comment">//    at &lt;anonymous>:10:1</span>

<span class="token comment">// 由于没有catch语句，所以会打印出错误信息，并中断除finally以外的代码。</span>
<span class="token comment">// 如果有catch语句则会执行catch内的代码块，而不会打印错误信息。且不会中断代码。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，由于没有<code v-pre>catch</code>语句块，一旦发生错误，代码就会中断执行。中断执行之前，会先执行<code v-pre>finally</code>代码块，然后再向用户提示报错信息。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">idle</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token string">'result'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'FINALLY'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">idle</span><span class="token punctuation">(</span><span class="token string">'hello'</span><span class="token punctuation">)</span>
<span class="token comment">// hello</span>
<span class="token comment">// FINALLY</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>try</code>代码块没有发生错误，而且里面还包括<code v-pre>return</code>语句，但是<code v-pre>finally</code>代码块依然会执行。而且，这个函数的返回值还是<code v-pre>result</code>。</p>
<p>下面的例子说明，<code v-pre>return</code>语句的执行是排在<code v-pre>finally</code>代码之前，只是等<code v-pre>finally</code>代码执行完毕后才返回。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">countUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> count<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    count<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">countUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 0</span>
count
<span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码说明，<code v-pre>return</code>语句里面的<code v-pre>count</code>的值，是在<code v-pre>finally</code>代码块运行之前就获取了。</p>
<p>下面是<code v-pre>finally</code>代码块用法的<strong>典型场景</strong>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">openFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 打开文件</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token function">writeFile</span><span class="token punctuation">(</span>Data<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 写入文件</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">handleError</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 如果写入出错这处理错误</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
  <span class="token function">closeFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 不管是否出错都会执行关闭文件</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码首先打开一个文件，然后在<code v-pre>try</code>代码块中写入文件，如果没有发生错误，则运行<code v-pre>finally</code>代码块关闭文件；一旦发生错误，则先使用<code v-pre>catch</code>代码块处理错误，再使用<code v-pre>finally</code>代码块关闭文件。</p>
<p>下面的例子充分反映了<code v-pre>try...catch...finally</code>这三者之间的<strong>执行顺序</strong>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">throw</span> <span class="token string">'bug'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// 这句原本会延迟到 finally 代码块结束再执行</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 不会运行</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// 这句会覆盖掉前面那句 return</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 不会运行</span>
  <span class="token punctuation">}</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 不会运行</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 0</span>
<span class="token comment">// 1</span>
<span class="token comment">// 3</span>

result
<span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>catch</code>代码块结束执行之前，会先执行<code v-pre>finally</code>代码块。</p>
<p><code v-pre>catch</code>代码块之中，触发转入<code v-pre>finally</code>代码块的标志，不仅有<code v-pre>return</code>语句，还有<code v-pre>throw</code>语句。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token string">'出错了！'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'捕捉到内部错误'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">throw</span> e<span class="token punctuation">;</span> <span class="token comment">// 这句原本会等到finally结束再执行</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// 直接返回</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 接收到返回值false，并没有接收到错误</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 此处不会执行</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'caught outer "bogus"'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//  捕捉到内部错误</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，进入<code v-pre>catch</code>代码块之后，一遇到<code v-pre>throw</code>语句，就会去执行<code v-pre>finally</code>代码块，其中有<code v-pre>return false</code>语句，因此就直接返回了，不再会回去执行<code v-pre>catch</code>代码块剩下的部分了。</p>
<p><code v-pre>try</code>代码块内部，还可以再使用<code v-pre>try</code>代码块。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    consle<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Hello world!'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 报错，console拼错</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Finally'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Will I run?'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// Finally</span>
<span class="token comment">// consle is not defined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>try</code>里面还有一个<code v-pre>try</code>。内层的<code v-pre>try</code>报错（<code v-pre>console</code>拼错了），这时会执行内层的<code v-pre>finally</code>代码块，然后抛出错误，被外层的<code v-pre>catch</code>捕获。</p>
<h2 id="四、console对象" tabindex="-1"><a class="header-anchor" href="#四、console对象" aria-hidden="true">#</a> 四、console对象</h2>
<h3 id="console-time-console-timeend-用于计算程序的用时" tabindex="-1"><a class="header-anchor" href="#console-time-console-timeend-用于计算程序的用时" aria-hidden="true">#</a> console.time()，console.timeEnd() （用于计算程序的用时）</h3>
<p>这两个方法用于计时，可以算出一个操作所花费的准确时间。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>console.time('Array initialize');

var array= new Array(1000000);
for (var i = array.length - 1; i >= 0; i--) {
  array[i] = new Object();
};

console.timeEnd('Array initialize');
// Array initialize: 1914.481ms
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>time</code>方法表示计时开始，<code v-pre>timeEnd</code>方法表示计时结束。它们的参数是计时器的名称。调用<code v-pre>timeEnd</code>方法之后，控制台会显示“计时器名称: 所耗费的时间”。</p>
<h2 id="文档" tabindex="-1"><a class="header-anchor" href="#文档" aria-hidden="true">#</a> 文档</h2>
<p>学习文档：<a href="https://wangdoc.com/javascript/" target="_blank" rel="noopener noreferrer">https://wangdoc.com/javascript/<ExternalLinkIcon/></a></p>
</div></template>


