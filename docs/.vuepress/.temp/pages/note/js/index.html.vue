<template><div><h1 id="《javascript高级程序设计》笔记" tabindex="-1"><a class="header-anchor" href="#《javascript高级程序设计》笔记" aria-hidden="true">#</a> 《JavaScript高级程序设计》笔记</h1>
<h2 id="第1章-javascript简介" tabindex="-1"><a class="header-anchor" href="#第1章-javascript简介" aria-hidden="true">#</a> 第1章  JavaScript简介</h2>
<ul>
<li>
<p>JavaScript诞生于<strong>1995</strong>年</p>
</li>
<li>
<p>一个完整的JavaScript由这三部分组成：</p>
<ul>
<li><strong>ECMAScript</strong> (核心)</li>
<li><strong>DOM</strong> (文档对象模型)</li>
<li><strong>BOM</strong> (浏览器对象模型)</li>
</ul>
</li>
<li>
<p>ECMAScript的 <strong>宿主环境</strong> 包含 ：</p>
<ul>
<li>浏览器</li>
<li>Node</li>
<li>flash</li>
</ul>
</li>
<li>
<p>ECMAScript大致规定了下列组成部分：</p>
<ul>
<li>语法</li>
<li>类型</li>
<li>语句</li>
<li>关键字</li>
<li>保留字</li>
<li>操作符</li>
<li>对象</li>
</ul>
</li>
</ul>
<h2 id="第2章-在html中使用javascript" tabindex="-1"><a class="header-anchor" href="#第2章-在html中使用javascript" aria-hidden="true">#</a> 第2章 在HTML中使用JavaScript</h2>
<ul>
<li><code v-pre>&lt;script&gt;</code> 标签有下列常见属性：
<ul>
<li>async 表示立即下载脚本，不妨碍页面的其他操作（异步下载）
<ul>
<li>无法保证每个js的顺序</li>
<li>用于互不依赖的js</li>
<li>主要目的是不让页面等js</li>
</ul>
</li>
<li>defer 延迟到文档完全解析和显示之后在执行
<ul>
<li>在<code v-pre>&lt;/html&gt;</code>标签之后执行</li>
</ul>
</li>
<li>src 外部文件链接</li>
<li>type 表示编写代码使用的脚本语言的内容类型
<ul>
<li><code v-pre>text/javascript</code></li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="第3章-基本概念" tabindex="-1"><a class="header-anchor" href="#第3章-基本概念" aria-hidden="true">#</a> 第3章 基本概念</h2>
<ul>
<li>
<p>语法，借鉴了C语言</p>
<ul>
<li><strong>区分大小写</strong></li>
<li><strong>标识符</strong>，指的是<strong>变量、函数、属性</strong>的名字
<ul>
<li>第一个字符必须是 字母、下划线、或美元符号</li>
<li>其他字符可以是字母、下划线、美元符号或数字</li>
</ul>
</li>
</ul>
</li>
<li>
<p>严格模式</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token string">"use strict"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>数据类型</p>
<ul>
<li>基本数据类型
<ul>
<li>Undefined、Null、Boolean、Number、String</li>
<li><code v-pre>typeof</code>操作符，一般用于基本类型的检测，返回相应类型的字符串
<ul>
<li>“undefined”,&quot;boolean&quot;,&quot;string&quot;,&quot;number&quot;,&quot;object&quot;,&quot;function&quot;</li>
</ul>
</li>
</ul>
</li>
<li>复杂数据类型
<ul>
<li>Object</li>
</ul>
</li>
</ul>
</li>
<li>
<p><code v-pre>Null</code>类型</p>
<ul>
<li>表示<strong>空对象指针</strong></li>
<li>只要意在保存对象的变量还没有真正保证对象，则保存<code v-pre>null</code></li>
<li><code v-pre>undefined</code>派生自<code v-pre>null</code>，因此用<code v-pre>==</code>比较返回<code v-pre>true</code></li>
</ul>
</li>
<li>
<p>浮点数，指的是数值中包含一个小数点，并且小数点后面至少有一位数字</p>
</li>
<li>
<p>NaN</p>
<ul>
<li>任何涉及NaN的操作都返回<code v-pre>NaN</code></li>
<li><code v-pre>NaN</code>与任何值都不相等，包括<code v-pre>NaN</code>本身</li>
</ul>
</li>
<li>
<p>数值转换</p>
<ul>
<li>有3个函数可以把非数值转换为数值
<ul>
<li>Number() 可以用于任何数据类型</li>
<li>parseInt() 专门用于字符串转数值，用于解析整数</li>
<li>parseFloat() 专门用于字符串转数值，用于解析浮点数</li>
</ul>
</li>
</ul>
</li>
<li>
<p>字符串</p>
<ul>
<li>数值、布尔值、对象、字符串值本身 都有toString()方法，用于转为字符串</li>
<li>undefined和null没有toString()方法，但可以使用String()方法</li>
</ul>
</li>
<li>
<p>Object类型</p>
<ul>
<li>
<p>对象其实就是一组数据与功能的集合</p>
</li>
<li>
<p>使用Object()构造函数创建对象</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 同 obj = {}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>每个对象实例都有下列属性和方法</p>
<ul>
<li><code v-pre>constructor</code> 指向用于创建当前对象的构造函数 。（对于上面例子而言，就是<code v-pre>Object()</code>）</li>
<li><code v-pre>hasOwnProperty(propertyName)</code> 用于检查给定属性是否在当前对象实例中</li>
<li><code v-pre>isPrototypeOf(Object)</code> 用于检查传入的对象是否是当前对象的原型</li>
<li><code v-pre>propertyIsEnumerable(propertyName)</code> 用于检查给定的属性是否能够使用<code v-pre>for-in</code>来枚举</li>
<li><code v-pre>toLocaleString()</code> 返回对象的字符串表示，该字符串与执行环境的地区对应</li>
<li><code v-pre>toString()</code> 返回对象的字符串表示</li>
<li><code v-pre>valueOf()</code> 返回对象的字符串、数值、布尔值表示。通常与<code v-pre>toString()</code>返回值相同</li>
</ul>
<p><strong>所有对象都有以上属性和方法</strong></p>
</li>
</ul>
</li>
<li>
<p><strong>操作符</strong></p>
<ul>
<li>一元操作符
<ul>
<li>++</li>
<li>--</li>
<li>前置与后置的区别是与其他数运算时，前置会先执行递增（减）再与其他数运算，后置会先与其他数运算再对自身执行递增(减)</li>
</ul>
</li>
<li>布尔操作符
<ul>
<li>与 (&amp;&amp;)
<ul>
<li>短路操作，即如果第一个操作数能决定结果，就不会对第二个操作数求值</li>
</ul>
</li>
<li>或 (||)
<ul>
<li>短路操作，即如果第一个操作数能决定结果，就不会对第二个操作数求值</li>
</ul>
</li>
<li>非 (!)
<ul>
<li>先使用Boolean()转成布尔值再取反</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>语句</strong>（也称流控制语句）</p>
<ul>
<li>
<p>if-else</p>
</li>
<li>
<p>do-while</p>
<ul>
<li>
<p>后测试循环语句，在对表达式求值之前，循环体内的代码至少会被执行一次</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">do</span> <span class="token punctuation">{</span>
    i <span class="token operator">+=</span> <span class="token number">2</span>
<span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">)</span>  <span class="token comment">// 只要i小于10就会一直循环</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>while</p>
<ul>
<li>
<p>前测试语句</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    i <span class="token operator">+=</span> <span class="token number">2</span>
<span class="token punctuation">}</span> <span class="token comment">// 只要i小于10就会一直循环</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>for</p>
<ul>
<li>
<p>使用while循环做不到的，使用for循环同样做不到。就是说，for循环只是把与循环有关的代码集合在一个位置</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span><span class="token punctuation">(</span>初始化<span class="token punctuation">;</span>条件<span class="token punctuation">;</span>循环后执行<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>break 立即退出循环</p>
</li>
<li>
<p>continue 退出当前单次循环</p>
</li>
</ul>
</li>
<li></li>
<li>
<p>for- in 用来枚举对象的属性</p>
</li>
</ul>
</li>
<li>
<p>函数</p>
<ul>
<li>任何函数都可以在任何时候返回任何值</li>
<li>未指定返回值的函数会返回一个undefined</li>
<li>通过arguments访问参数，它是一个类数组</li>
</ul>
</li>
</ul>
<h2 id="第4章-变量、作用域和内存问题" tabindex="-1"><a class="header-anchor" href="#第4章-变量、作用域和内存问题" aria-hidden="true">#</a> 第4章 变量、作用域和内存问题</h2>
<ul>
<li>
<p>变量包含两种类型的值：</p>
<ul>
<li>基本类型值，指的是简单的数据段</li>
<li>引用类型值，指的是那些可能由多个值构成的<strong>对象</strong></li>
</ul>
</li>
<li>
<p>复制变量值</p>
<ul>
<li>复制基本类型的变量值只是复制了该值的副本</li>
<li>复制引用类型的变量值时，同样也会将存储在变量对象的值复制一份放到新变量的空间中，不同的是，这个值的副本实际上是一个指针，而这个指针指向存储在堆中的一个对象。两个变量指向同一个对象。</li>
</ul>
</li>
<li>
<p>传递参数</p>
<ul>
<li>所有函数的参数都是按值传递的</li>
</ul>
</li>
<li>
<p>检测类型</p>
<ul>
<li><code v-pre>typeof</code> 检测基础类型</li>
<li><code v-pre>instanceof</code>检测引用类型
<ul>
<li>变量 instanceof 构造函数（例：obj instanceof Object）</li>
<li>所有引用类型的值都是Object的实例</li>
</ul>
</li>
</ul>
</li>
<li>
<p>执行环境</p>
<ul>
<li>在浏览器中，全局执行环境是<code v-pre>window</code>对象</li>
<li>每个函数都有自己的<strong>执行环境</strong></li>
</ul>
</li>
<li>
<p>作用域链</p>
<ul>
<li>当代码在一个环境中执行时，会创建变量对象的一个<strong>作用域链</strong></li>
<li>作用域链的前端，始终是当前执行的代码所在环境的变量对象。</li>
<li>作用域链中的下一个变量对象来自包含（外部）环境，而再下一个变量对象则来自下一个包含对象。这样一直延续到全局执行环境。</li>
<li>全局执行环境的变量对象始终都是作用域链中的最后一个对象。</li>
</ul>
</li>
<li>
<p>垃圾收集</p>
<ul>
<li>JavaScript具有自动垃圾收集机制
<ul>
<li>对于不再使用的变量打上标记，被打上标记的变量将在执行回收时被清除，释放内存空间。</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="第5章-引用类型" tabindex="-1"><a class="header-anchor" href="#第5章-引用类型" aria-hidden="true">#</a> 第5章 引用类型</h2>
<ul>
<li>
<p>引用类型的值是引用类型的一个实例</p>
</li>
<li>
<p>引用类型就是一种数据结构，描述了一类对象所具有的属性和方法</p>
</li>
<li>
<p>创建Object实例的方式有两种：</p>
<ul>
<li>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 与 new Object() 相同，但实际不会调用Object构造函数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>访问对象的属性有两种：</p>
<ul>
<li>点表示法 和 方括号表示法</li>
</ul>
</li>
</ul>
<h3 id="array类型" tabindex="-1"><a class="header-anchor" href="#array类型" aria-hidden="true">#</a> Array类型</h3>
<ul>
<li>
<p>length属性不是只读的</p>
</li>
<li>
<p>检测数组</p>
<ul>
<li>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>value <span class="token keyword">instanceof</span> <span class="token class-name">Array</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>转换方法</p>
<ul>
<li>toLocaleString() 与toString()相同</li>
<li>toString() 返回数组中每个值的字符串形式用逗号分隔拼接而成的字符串</li>
<li>valueOf() 返回数组本身</li>
</ul>
</li>
</ul>
<h4 id="join-转换方法-不改原数组" tabindex="-1"><a class="header-anchor" href="#join-转换方法-不改原数组" aria-hidden="true">#</a> join() 转换方法 (不改原数组)</h4>
<p>接收一个参数，用作分隔符的字符串，然后返回包含所有数组项的字符串。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'red'</span><span class="token punctuation">,</span><span class="token string">'blue'</span><span class="token punctuation">,</span><span class="token string">'green'</span><span class="token punctuation">]</span>
<span class="token keyword">var</span> arrStr <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">'|'</span><span class="token punctuation">)</span> <span class="token comment">// "red|blue|green"</span>

arr<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// "red,blue,green"</span>
arr<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span> <span class="token comment">// "redbluegreen"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="栈方法-后进先出-push-、pop-改变原数组" tabindex="-1"><a class="header-anchor" href="#栈方法-后进先出-push-、pop-改变原数组" aria-hidden="true">#</a> 栈方法，后进先出 push() 、pop()      (改变原数组)</h4>
<ul>
<li>push() 向数组末尾添加成员，返回总长</li>
<li>pop() 移除数组末尾一个成员，返回该成员</li>
</ul>
<h4 id="队列方法-先进先出-push-、shift-、unshift-改变原数组" tabindex="-1"><a class="header-anchor" href="#队列方法-先进先出-push-、shift-、unshift-改变原数组" aria-hidden="true">#</a> 队列方法，先进先出  push()、shift()   、unshift() (改变原数组)</h4>
<ul>
<li>
<p>shift() 移除数组首个成员，返回该成员</p>
</li>
<li>
<p>unshift() 在数组前面添加成员，返回总长</p>
</li>
</ul>
<p>push()和shift() 形成队列方法</p>
<p>unshift和pop() 形成反方向队列方法</p>
<h4 id="重排序方法-reverse-反转-sort-排序-改变原数组" tabindex="-1"><a class="header-anchor" href="#重排序方法-reverse-反转-sort-排序-改变原数组" aria-hidden="true">#</a> 重排序方法 reverse() 反转  sort() 排序   （改变原数组）</h4>
<ul>
<li>reverse() 反转数组项的顺序</li>
<li>sort() 接收一个函数作为参数，函数接收两个参数。
<ul>
<li>自定义排序：函数内，如果第一个参数应该位于第二个之前，则手动返回一个负数，如果两个参数相等，手动返回0，如果第一个参数应该位于第二个参数之后，则手动返回一个正数。</li>
</ul>
</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 升序</span>
arr<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span>b</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>a <span class="token operator">&lt;</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">></span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        retunr <span class="token number">0</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简写：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>arr<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span>b</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a<span class="token operator">-</span>b <span class="token comment">// 升序， b-a 降序</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="操作方法-concat-拼接-slice-切片-splice-移接" tabindex="-1"><a class="header-anchor" href="#操作方法-concat-拼接-slice-切片-splice-移接" aria-hidden="true">#</a> 操作方法 concat() 拼接，slice() 切片，splice() 移接</h4>
<ul>
<li>
<p>concat() 拼接数组 （<strong>不改原数组</strong>）</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> arr1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span><span class="token string">'b'</span><span class="token punctuation">]</span>
<span class="token keyword">var</span> arr2 <span class="token operator">=</span> arr1<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">'c'</span><span class="token punctuation">,</span><span class="token string">'d'</span><span class="token punctuation">)</span> <span class="token comment">// ['a','b','c','d']</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>slice() 切片（<strong>不改原数组</strong>）</p>
<ul>
<li>slice(起始位置 [, 结束位置])  返回起始位置到结束位置的成员，不包含结束位置。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> arr1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">]</span>
<span class="token keyword">var</span> arr2 <span class="token operator">=</span> arr1<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token comment">// [2,3]</span>
<span class="token keyword">var</span> arr3 <span class="token operator">=</span> arr1<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// [3,4,5]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>splice() 移接 （<strong>改变原数组</strong>）</p>
<ul>
<li>splice(起始位置, 要删除的个数，要插入的项)
<ul>
<li>要插入的项 可以有0个或多个</li>
</ul>
</li>
<li>splice() 始终返回一个数组，该数组成员中包含原始数组中被删除的项，如果没有则返回空数组。</li>
<li>数组最强大的方法，可用于删除、插入、替换操作</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
arr<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// [2]</span>
arr <span class="token comment">// [1,3,4]</span>


arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
arr<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token string">'a'</span><span class="token punctuation">)</span> <span class="token comment">// []</span>
arr <span class="token comment">// [1,2,'a',3,4]</span>

arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
arr<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">'a'</span><span class="token punctuation">)</span> <span class="token comment">// [4]</span>
arr <span class="token comment">// [1,2,3,'a']</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="位置方法-indexof-、lastindexof" tabindex="-1"><a class="header-anchor" href="#位置方法-indexof-、lastindexof" aria-hidden="true">#</a> 位置方法 indexOf()、lastIndexOf()</h4>
<ul>
<li>查找项的位置，没有则返回-1</li>
<li>indexOf() 从前面开始找，lastIndexOf() 从后面开始找</li>
</ul>
<h4 id="迭代方法-every-、some-、filter-、map-、foreach-都不会改变原数组" tabindex="-1"><a class="header-anchor" href="#迭代方法-every-、some-、filter-、map-、foreach-都不会改变原数组" aria-hidden="true">#</a> 迭代方法 every()、some() 、filter()、map() 、forEach()  （都不会改变原数组）</h4>
<ul>
<li>
<p>5个迭代方法，每个方法都接收两个参数：</p>
<ul>
<li>在每项上运行的函数</li>
<li>运行函数的作用域对象</li>
</ul>
</li>
<li>
<p>函数接收三个参数：</p>
<ul>
<li>数组项的值</li>
<li>该项的索引</li>
<li>数组本身</li>
</ul>
</li>
<li>
<p>every()  如果函数对每项都返回true，则返回true</p>
<ul>
<li>
<p>例：判断数组每一项是否都大于2</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> numbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token keyword">var</span> result <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">every</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span>index<span class="token punctuation">,</span>array</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> item <span class="token operator">></span> <span class="token number">2</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
result <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>some() 如果函数对任一项返回true，则返回true</p>
<ul>
<li>
<p>例：判断数组是否包含大于2的值</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> numbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token keyword">var</span> result <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">some</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span>index<span class="token punctuation">,</span>array</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> item <span class="token operator">></span> <span class="token number">2</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
result <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>filter() 返回函数会返回true的项组成的数组</p>
<ul>
<li>
<p>例：过滤掉数组中小于等于2的数</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> numbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">]</span>
<span class="token keyword">var</span> result <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span>index<span class="token punctuation">,</span>array</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> item <span class="token operator">></span><span class="token number">2</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
result <span class="token comment">// [3,4,5]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>map() 返回每次函数调用的结果组成的数组</p>
<ul>
<li>
<p>例：给数组每一项乘以2</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> numbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">]</span>
<span class="token keyword">var</span> result <span class="token operator">=</span> numbers<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span>index<span class="token punctuation">,</span>array</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> item <span class="token operator">*</span> <span class="token number">2</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
result <span class="token comment">// [2,4,6,8,10]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>forEach() 循环数组每一项，没有返回值</p>
<ul>
<li>
<p>例：循环每一项</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> numbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">]</span>
numbers<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span>index<span class="token punctuation">,</span>array</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 做一些操作</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h4 id="归并方法-reduce-reduceright" tabindex="-1"><a class="header-anchor" href="#归并方法-reduce-reduceright" aria-hidden="true">#</a> 归并方法 reduce()  reduceRight()</h4>
<ul>
<li>
<p>reduce() 归并为</p>
</li>
<li>
<p>reduceRight() 从右边归并</p>
</li>
<li>
<p>这两个方法都会迭代数组所有项，然后构建一个最终结果并返回</p>
</li>
<li>
<p>方法接收两个参数： 每一项上调用的函数，归并基础的初始值</p>
</li>
<li>
<p>函数接收4个参数：前一个的值、当前值、当前值的索引、数组对象</p>
</li>
<li>
<p>例：求数组每一项之和</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> numbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">]</span>
<span class="token keyword">var</span> result <span class="token operator">=</span> number<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prev<span class="token punctuation">,</span>cur<span class="token punctuation">,</span>index<span class="token punctuation">,</span>arr</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> prev <span class="token operator">+</span> cur
<span class="token punctuation">}</span><span class="token punctuation">)</span>
result <span class="token comment">// 15</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>reduce()方法，第一次执行函数时，prev是数组的第一项，cur是数组的第二项</p>
</li>
</ul>
<h2 id="第6章-面向对象的程序设计" tabindex="-1"><a class="header-anchor" href="#第6章-面向对象的程序设计" aria-hidden="true">#</a> 第6章 面向对象的程序设计</h2>
<h3 id="_6-1-理解对象" tabindex="-1"><a class="header-anchor" href="#_6-1-理解对象" aria-hidden="true">#</a> 6.1 理解对象</h3>
<ul>
<li>对象的定义：无序属性的集合，其属性可以包含基本值、对象或者函数。
<ul>
<li>一组键值对，其中值可以是数据或函数</li>
</ul>
</li>
</ul>
<h4 id="_6-1-1-对象的属性" tabindex="-1"><a class="header-anchor" href="#_6-1-1-对象的属性" aria-hidden="true">#</a> 6.1.1 对象的属性</h4>
<p>​	包含两种：<strong>数据属性</strong> 和 <strong>访问器属性</strong></p>
<h5 id="_1-数据属性" tabindex="-1"><a class="header-anchor" href="#_1-数据属性" aria-hidden="true">#</a> 1.数据属性</h5>
<ul>
<li>configurable 可配置性（限制 delete删除属性和<code v-pre>Object.defineProperty()</code>方法是否起效。），默认true</li>
<li>enumerable 可列举性，默认true</li>
<li>writable 可写性，默认true</li>
<li>value 值，默认undefined</li>
</ul>
<p>使用<code v-pre>Object.defineProperty()</code>方法修改这些默认属性。接收三个值：<strong>属性所在的对象、属性名、描述符对象</strong>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>person<span class="token punctuation">,</span><span class="token string">'name'</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'xu'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// xu</span>
person<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'gao'</span> <span class="token comment">// 修改无效</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// xu</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用此方法定义属性如未指定<code v-pre>configurable</code>、<code v-pre>enumerable</code>、<code v-pre>writable</code> 将默认<code v-pre>false</code>。</p>
<h5 id="_2-访问器属性" tabindex="-1"><a class="header-anchor" href="#_2-访问器属性" aria-hidden="true">#</a> 2.访问器属性</h5>
<p>包含两个函数：getter函数和setter函数（这两个函数都是非必需）。读取时调用getter，访问时调用setter。</p>
<p>使用<code v-pre>Object.defineProperty()</code>方法定义访问器属性。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> book <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">_year</span><span class="token operator">:</span> <span class="token number">2020</span><span class="token punctuation">,</span>
    <span class="token literal-property property">edition</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>book<span class="token punctuation">,</span> <span class="token string">'year'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_year
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">newValue</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>newValue <span class="token operator">></span> <span class="token number">2020</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>_year <span class="token operator">=</span> newValue
            <span class="token keyword">this</span><span class="token punctuation">.</span>edition <span class="token operator">+=</span> newValue <span class="token operator">-</span> <span class="token number">2020</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

book<span class="token punctuation">.</span>year <span class="token operator">=</span> <span class="token number">2021</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>book<span class="token punctuation">.</span>edition<span class="token punctuation">)</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当getter函数和setter函数只指定其中一个时，另外一个将不能用。</p>
<h4 id="_6-1-2-定义多个属性" tabindex="-1"><a class="header-anchor" href="#_6-1-2-定义多个属性" aria-hidden="true">#</a> 6.1.2 定义多个属性</h4>
<p><code v-pre>Object.defineProperties()</code>方法定义多个属性。接收两个参数: 要添加或修改属性的对象 、第二个参数是一个对象，其属性与第一个参数中的属性一一对应。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> book <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperties</span><span class="token punctuation">(</span>book<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">_year</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 数据属性</span>
        <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">2004</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">edition</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 数据属性</span>
        <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">year</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 访问器属性</span>
        <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_year
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">newValue</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>newValue <span class="token operator">></span> <span class="token number">2004</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>_year <span class="token operator">=</span> newValue
                <span class="token keyword">this</span><span class="token punctuation">.</span>edition <span class="token operator">+=</span> newValue <span class="token operator">-</span> <span class="token number">2004</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 定义了三个属性，每个属性有不同的描述符</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-1-3-读取属性的特性-描述符对象" tabindex="-1"><a class="header-anchor" href="#_6-1-3-读取属性的特性-描述符对象" aria-hidden="true">#</a> 6.1.3 读取属性的特性（描述符对象）</h4>
<p><code v-pre>Object.getOwnPropertyDescriptor()</code>方法获取描述符，接收两个参数： 属性所在的对象、属性名</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> book <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperties</span><span class="token punctuation">(</span>book<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">_year</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 数据属性</span>
        <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">2004</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">edition</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 数据属性</span>
        <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">year</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 访问器属性</span>
        <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_year
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">newValue</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>newValue <span class="token operator">></span> <span class="token number">2004</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>_year <span class="token operator">=</span> newValue
                <span class="token keyword">this</span><span class="token punctuation">.</span>edition <span class="token operator">+=</span> newValue <span class="token operator">-</span> <span class="token number">2004</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">var</span> descriptor <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>book<span class="token punctuation">,</span> <span class="token string">"_year"</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>descriptor<span class="token punctuation">)</span> <span class="token comment">// {value: 2020, writable: true, enumerable: false, configurable: false}</span>
<span class="token keyword">var</span> descriptor <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>book<span class="token punctuation">,</span> <span class="token string">"year"</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>descriptor<span class="token punctuation">)</span> <span class="token comment">// {enumerable: false, configurable: false, get: ƒ, set: ƒ}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-创建对象" tabindex="-1"><a class="header-anchor" href="#_6-2-创建对象" aria-hidden="true">#</a> 6.2 创建对象</h3>
<p>使用Object构造函数或对象字面量方式创建对象。缺点：使用同一个接口创建很多对象时，会产生大量重复代码。解决方案：使用工厂模式的一种变体。</p>
<h4 id="_6-2-1-工厂模式" tabindex="-1"><a class="header-anchor" href="#_6-2-1-工厂模式" aria-hidden="true">#</a> 6.2.1 工厂模式</h4>
<h2 id="第7章-函数表达式" tabindex="-1"><a class="header-anchor" href="#第7章-函数表达式" aria-hidden="true">#</a> 第7章 函数表达式</h2>
<h2 id="第8章-bom" tabindex="-1"><a class="header-anchor" href="#第8章-bom" aria-hidden="true">#</a> 第8章 BOM</h2>
<h2 id="第9章-客户端检测" tabindex="-1"><a class="header-anchor" href="#第9章-客户端检测" aria-hidden="true">#</a> 第9章 客户端检测</h2>
<h2 id="第10章-dom" tabindex="-1"><a class="header-anchor" href="#第10章-dom" aria-hidden="true">#</a> 第10章 DOM</h2>
<h2 id="第11章-dom扩展" tabindex="-1"><a class="header-anchor" href="#第11章-dom扩展" aria-hidden="true">#</a> 第11章 DOM扩展</h2>
<h2 id="第12章-dom2和dom3" tabindex="-1"><a class="header-anchor" href="#第12章-dom2和dom3" aria-hidden="true">#</a> 第12章 DOM2和DOM3</h2>
<h2 id="第13章-事件" tabindex="-1"><a class="header-anchor" href="#第13章-事件" aria-hidden="true">#</a> 第13章 事件</h2>
<h2 id="第14章-表单脚本" tabindex="-1"><a class="header-anchor" href="#第14章-表单脚本" aria-hidden="true">#</a> 第14章 表单脚本</h2>
<h2 id="第15章-使用canvas绘图" tabindex="-1"><a class="header-anchor" href="#第15章-使用canvas绘图" aria-hidden="true">#</a> 第15章 使用Canvas绘图</h2>
<h2 id="第16章-html5脚本编程" tabindex="-1"><a class="header-anchor" href="#第16章-html5脚本编程" aria-hidden="true">#</a> 第16章 HTML5脚本编程</h2>
<h2 id="第17章-错误处理与调试" tabindex="-1"><a class="header-anchor" href="#第17章-错误处理与调试" aria-hidden="true">#</a> 第17章 错误处理与调试</h2>
<h2 id="第18章-javascript与xml" tabindex="-1"><a class="header-anchor" href="#第18章-javascript与xml" aria-hidden="true">#</a> 第18章 JavaScript与XML</h2>
<h2 id="第19章-e4x" tabindex="-1"><a class="header-anchor" href="#第19章-e4x" aria-hidden="true">#</a> 第19章 E4X</h2>
<h2 id="第20章-json" tabindex="-1"><a class="header-anchor" href="#第20章-json" aria-hidden="true">#</a> 第20章 JSON</h2>
<h2 id="第21章-ajax与comet" tabindex="-1"><a class="header-anchor" href="#第21章-ajax与comet" aria-hidden="true">#</a> 第21章 Ajax与Comet</h2>
<h2 id="第22章-高级技巧" tabindex="-1"><a class="header-anchor" href="#第22章-高级技巧" aria-hidden="true">#</a> 第22章 高级技巧</h2>
<h2 id="第23章-离线应用与客户端存储" tabindex="-1"><a class="header-anchor" href="#第23章-离线应用与客户端存储" aria-hidden="true">#</a> 第23章 离线应用与客户端存储</h2>
<h2 id="第24章-最佳实践" tabindex="-1"><a class="header-anchor" href="#第24章-最佳实践" aria-hidden="true">#</a> 第24章 最佳实践</h2>
<h2 id="第25章-新兴的api" tabindex="-1"><a class="header-anchor" href="#第25章-新兴的api" aria-hidden="true">#</a> 第25章 新兴的API</h2>
</div></template>


