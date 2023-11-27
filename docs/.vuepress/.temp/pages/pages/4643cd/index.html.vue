<template><div><h1 id="js设计模式总结笔记" tabindex="-1"><a class="header-anchor" href="#js设计模式总结笔记" aria-hidden="true">#</a> JS设计模式总结笔记</h1>
<h2 id="开篇-前端工程师的成长论" tabindex="-1"><a class="header-anchor" href="#开篇-前端工程师的成长论" aria-hidden="true">#</a> 开篇：前端工程师的成长论</h2>
<p>能够决定一个前端工程师的本质的，不是那些瞬息万变的技术点，而是那些<strong>不变的东西</strong>。</p>
<p>所谓“不变的东西”，就是<strong>驾驭技术的能力</strong>。</p>
<p>具体来说，它分为以下三个层次：</p>
<ul>
<li>能用健壮的代码去解决具体的问题；</li>
<li>能用抽象的思维去应对复杂的系统；</li>
<li>能用工程化的思想去规划更大规模的业务。</li>
</ul>
<blockquote>
<p>基础理论知识是一个人的基线，理论越强基线越高。再为自己定一个目标和向上攀附的阶梯，那么达到目标就是时间问题，而很多野路子工程师搞了半辈子也未达到优秀工程师的基线，<strong>很多他们绞尽脑汁得出的高深学问，不过是正规工程师看起来很自然的东西</strong>。—— 吴军</p>
</blockquote>
<h2 id="设计模式之-道" tabindex="-1"><a class="header-anchor" href="#设计模式之-道" aria-hidden="true">#</a> 设计模式之“道”</h2>
<ul>
<li>设计模式是“拿来主义”。如使用数学公式，不会从头推导一个公式。</li>
</ul>
<h3 id="核心思想" tabindex="-1"><a class="header-anchor" href="#核心思想" aria-hidden="true">#</a> 核心思想</h3>
<ul>
<li>设计模式的核心思想——<strong>封装变化</strong></li>
<li>保证可维护性、可扩展性。</li>
<li>将变与不变分离，确保变化的部分灵活，不变的部分稳定。——这就是所谓的“健壮”的代码。</li>
</ul>
<h2 id="设计模式之-术" tabindex="-1"><a class="header-anchor" href="#设计模式之-术" aria-hidden="true">#</a> 设计模式之“术”</h2>
<p>即最经典的<strong>23种设计模式</strong>。按<code v-pre>创建型</code>、<code v-pre>结构型</code>、<code v-pre>行为型</code>划分。</p>
<h3 id="创建型" tabindex="-1"><a class="header-anchor" href="#创建型" aria-hidden="true">#</a> 创建型</h3>
<ol>
<li>单例模式</li>
<li>原型模式</li>
<li>构造器模式</li>
<li>工厂模式</li>
<li>抽象工厂模式</li>
</ol>
<h3 id="结构型" tabindex="-1"><a class="header-anchor" href="#结构型" aria-hidden="true">#</a> 结构型</h3>
<ol>
<li>桥接模式</li>
<li>外观模式</li>
<li>组合模式</li>
<li>装饰器模式</li>
<li>适配器模式</li>
<li>代理模式</li>
<li>享元模式</li>
</ol>
<h3 id="行为型" tabindex="-1"><a class="header-anchor" href="#行为型" aria-hidden="true">#</a> 行为型</h3>
<ol>
<li>迭代器模式</li>
<li>解释器模式</li>
<li>观察者模式</li>
<li>访问者模式</li>
<li>状态模式</li>
<li>备忘录模式</li>
<li>策略模式</li>
<li>模板方法模式</li>
<li>职责链模式</li>
<li>命令模式</li>
</ol>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结：</h2>
<ul>
<li>
<p>创建型模型封装了创建对象过程中的变化。</p>
</li>
<li>
<p>结构型模式封装了对象之间组合方式的变化。目的在于灵活的表达对象间的配合与依赖关系。</p>
</li>
<li>
<p>行为型模式将对象千变万化的行为进行抽离，确保安全、方便的更改。</p>
</li>
</ul>
<h2 id="创建型-工厂模式-简单工厂——区分-变与不变" tabindex="-1"><a class="header-anchor" href="#创建型-工厂模式-简单工厂——区分-变与不变" aria-hidden="true">#</a> 创建型：工厂模式-简单工厂——区分“变与不变”</h2>
<p>先了解构造器模式，在JS中的构造函数即构造器。使用构造函数，即使用构造器模式。</p>
<h3 id="构造器模式" tabindex="-1"><a class="header-anchor" href="#构造器模式" aria-hidden="true">#</a> 构造器模式</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">User</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> career</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
  <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age
  <span class="token keyword">this</span><span class="token punctuation">.</span>career <span class="token operator">=</span> career
<span class="token punctuation">}</span>
<span class="token keyword">const</span> user <span class="token operator">=</span> New <span class="token function">User</span><span class="token punctuation">(</span><span class="token string">'张三'</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token string">'前端工程师'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>变与不变：user的属性(name, age, car)不变，即共性。变的是属性值，即个性。</p>
<h3 id="简单工厂模式" tabindex="-1"><a class="header-anchor" href="#简单工厂模式" aria-hidden="true">#</a> 简单工厂模式</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">User</span><span class="token punctuation">(</span><span class="token parameter">name <span class="token punctuation">,</span> age<span class="token punctuation">,</span> career<span class="token punctuation">,</span> work</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age
    <span class="token keyword">this</span><span class="token punctuation">.</span>career <span class="token operator">=</span> career
    <span class="token keyword">this</span><span class="token punctuation">.</span>work <span class="token operator">=</span> work
<span class="token punctuation">}</span>

<span class="token comment">// 工厂函数 （将变的部分抽离出一个函数）</span>
<span class="token keyword">function</span> <span class="token function">Factory</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> career</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> work
    <span class="token keyword">switch</span><span class="token punctuation">(</span>career<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token string">'coder'</span><span class="token operator">:</span>
            work <span class="token operator">=</span>  <span class="token punctuation">[</span><span class="token string">'写代码'</span><span class="token punctuation">,</span><span class="token string">'写系分'</span><span class="token punctuation">,</span> <span class="token string">'修Bug'</span><span class="token punctuation">]</span>
            <span class="token keyword">break</span>
        <span class="token keyword">case</span> <span class="token string">'product manager'</span><span class="token operator">:</span>
            work <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'订会议室'</span><span class="token punctuation">,</span> <span class="token string">'写PRD'</span><span class="token punctuation">,</span> <span class="token string">'催更'</span><span class="token punctuation">]</span>
            <span class="token keyword">break</span>
        <span class="token keyword">case</span> <span class="token string">'boss'</span><span class="token operator">:</span>
            work <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'喝茶'</span><span class="token punctuation">,</span> <span class="token string">'看报'</span><span class="token punctuation">,</span> <span class="token string">'见客户'</span><span class="token punctuation">]</span>

        <span class="token comment">// 其它工种的职责分配</span>
        <span class="token comment">//case 'xxx':</span>
            <span class="token comment">//...</span>

    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> career<span class="token punctuation">,</span> work<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>工厂模式就是将创建对象的过程单独封装。</p>
</div></template>


