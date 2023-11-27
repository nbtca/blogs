<template><div><h1 id="es6面向对象" tabindex="-1"><a class="header-anchor" href="#es6面向对象" aria-hidden="true">#</a> ES6面向对象</h1>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">//面向对象封装</span>
<span class="token keyword">class</span> <span class="token class-name">Student</span><span class="token punctuation">{</span> <span class="token comment">//定义类 (尊从首字母大写的约定)</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span><span class="token punctuation">{</span>  <span class="token comment">// 构造函数 （构造函数内定于属性）</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> props<span class="token punctuation">.</span>name <span class="token operator">||</span> <span class="token string">'匿名'</span><span class="token punctuation">;</span> <span class="token comment">// 默认'匿名'</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>grade <span class="token operator">=</span> props<span class="token punctuation">.</span>grade <span class="token operator">||</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">// 在构造函数的原型上定义方法</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">你好,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">同学，你在</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>grade<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">年级</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>



<span class="token comment">//使用</span>
<span class="token keyword">function</span> <span class="token function">createStudent</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 对于new构造函数的封装，其优点：一是不需要new来调用，二是参数灵活</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span>props <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// 通过new创建构造函数，并传入参数/属性</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> niming <span class="token operator">=</span> <span class="token function">createStudent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
niming<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> xiaoming <span class="token operator">=</span> <span class="token function">createStudent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'小明'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">grade</span><span class="token operator">:</span><span class="token number">2</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xiaoming<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>



<span class="token comment">//继承</span>
<span class="token keyword">class</span> <span class="token class-name">PrimaryStudent</span> <span class="token keyword">extends</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span> <span class="token comment">//class 子类 extends 父类</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 用super调用父类的构造方法实现属性继承</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> props<span class="token punctuation">.</span>age <span class="token operator">||</span> <span class="token number">8</span><span class="token punctuation">;</span> <span class="token comment">//新增子类属性</span>
    <span class="token punctuation">}</span>

    <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">//对子类添加方法</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">同学，你今年</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">岁</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">//使用继承后的</span>
<span class="token keyword">function</span> <span class="token function">createPrimaryStudent</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 对于new构造函数的封装，其优点：一是不需要再new来调用，二是参数灵活</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">PrimaryStudent</span><span class="token punctuation">(</span>props <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// 通过new创建构造函数，并传入参数/属性</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> xiaohong <span class="token operator">=</span> <span class="token function">createPrimaryStudent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'小红'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">grade</span><span class="token operator">:</span><span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">10</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xiaohong<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xiaohong<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


