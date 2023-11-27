<template><div><h1 id="类型推断" tabindex="-1"><a class="header-anchor" href="#类型推断" aria-hidden="true">#</a> 类型推断</h1>
<p>这节介绍 TypeScript 里的类型推断。即，类型是在哪里如何被推断的。</p>
<h2 id="基础" tabindex="-1"><a class="header-anchor" href="#基础" aria-hidden="true">#</a> 基础</h2>
<p>TypeScript 里，在有些没有明确指出类型的地方，类型推断会帮助提供类型。如下面的例子：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>变量 <code v-pre>x</code> 的类型被推断为数字。 这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时。</p>
<p>大多数情况下，类型推断是直截了当地。后面的小节，我们会浏览类型推断时的细微差别。</p>
<h2 id="最佳通用类型" tabindex="-1"><a class="header-anchor" href="#最佳通用类型" aria-hidden="true">#</a> 最佳通用类型</h2>
<p>有些时候我们需要从几个表达式中推断类型，会使用这些表达式的类型来推断出一个最合适的通用类型。例如，</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了推断 <code v-pre>x</code> 的类型，我们必须考虑所有元素的类型。 这里有两种选择：<code v-pre>number</code> 和 <code v-pre>null</code>。 计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型。</p>
<p>由于最终的通用类型取自候选类型，有些时候候选类型共享一个公共结构，但是却没有一个类型能做为所有候选类型的超级类型。例如：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
  numLegs<span class="token operator">:</span> <span class="token builtin">number</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Bee</span> <span class="token keyword">extends</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Lion</span> <span class="token keyword">extends</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> zoo <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">Bee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Lion</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们想让 <code v-pre>zoo</code> 被推断为 <code v-pre>Animal[]</code> 类型，但是这个数组里没有对象是 <code v-pre>Animal</code> 类型的，因此不能推断出这个结果。 为了更正，我们可以明确的声明我们期望的类型：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> zoo<span class="token operator">:</span> Animal<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">Bee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Lion</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果没有找到最佳通用类型的话，类型推断的结果为联合数组类型，<code v-pre>(Bee | Lion)[]</code></p>
<h2 id="上下文类型" tabindex="-1"><a class="header-anchor" href="#上下文类型" aria-hidden="true">#</a> 上下文类型</h2>
<p>有些时候，TypeScript 类型推断会按另外一种方式，我们称作“上下文类型”；上下文类型的出现和表达式的类型以及所处的位置相关。比如：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>window<span class="token punctuation">.</span><span class="token function-variable function">onmousedown</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>mouseEvent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>mouseEvent<span class="token punctuation">.</span>clickTime<span class="token punctuation">)</span>  <span class="token comment">// Error</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个例子会得到一个类型错误，TypeScript 类型检查器使用 <code v-pre>window.onmousedown</code> 函数的类型来推断右边函数表达式的类型。 因此，就能推断出 <code v-pre>mouseEvent</code> 参数的类型了，所以 <code v-pre>mouseEvent</code> 访问了一个不存在的属性，就报错了。</p>
<p>如果上下文类型表达式包含了明确的类型信息，上下文的类型被忽略。重写上面的例子：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code>window<span class="token punctuation">.</span><span class="token function-variable function">onmousedown</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>mouseEvent<span class="token operator">:</span><span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>mouseEvent<span class="token punctuation">.</span>clickTime<span class="token punctuation">)</span>  <span class="token comment">// OK</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个函数表达式有明确的参数类型注解，上下文类型被忽略。这样的话就不报错了，因为这里不会使用到上下文类型。</p>
<p>上下文类型会在很多情况下使用到。通常包含函数的参数，赋值表达式的右边，类型断言，对象成员，数组字面量和返回值语句。上下文类型也会做为最佳通用类型的候选类型。比如：</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">createZoo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Animal<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">Bee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Lion</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> zoo <span class="token operator">=</span> <span class="token function">createZoo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个例子里，最佳通用类型有 <code v-pre>3</code> 个候选者：<code v-pre>Animal</code>，<code v-pre>Bee</code> 和 <code v-pre>Lion</code>。 其中，<code v-pre>Animal</code> 会被做为最佳通用类型。</p>
</div></template>


