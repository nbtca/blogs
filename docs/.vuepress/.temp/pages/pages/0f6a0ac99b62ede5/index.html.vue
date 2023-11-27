<template><div><h1 id="防抖与节流函数" tabindex="-1"><a class="header-anchor" href="#防抖与节流函数" aria-hidden="true">#</a> 防抖与节流函数</h1>
<p>防抖和节流的作用都是在高频事件中防止函数被多次调用，是一种性能优化的方案。</p>
<p>区别在于，防抖函数只会在高频事件结束后n毫秒调用一次函数，节流函数会在高频事件触发过程当中每隔n毫秒调用一次函数。</p>
<!-- more -->
<h2 id="防抖函数" tabindex="-1"><a class="header-anchor" href="#防抖函数" aria-hidden="true">#</a> 防抖函数</h2>
<p>触发高频事件后一段时间（wait）只会执行一次函数，如果指定时间（wait）内高频事件再次被触发，则重新计算时间。</p>
<h3 id="封装" tabindex="-1"><a class="header-anchor" href="#封装" aria-hidden="true">#</a> 封装</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 防抖函数</span>
<span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> timeout <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> context <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> args <span class="token operator">=</span> arguments<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>timeout<span class="token punctuation">)</span> <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token punctuation">;</span>
        timeout <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> args<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="节流函数" tabindex="-1"><a class="header-anchor" href="#节流函数" aria-hidden="true">#</a> 节流函数</h2>
<p>规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效</p>
<h3 id="封装-1" tabindex="-1"><a class="header-anchor" href="#封装-1" aria-hidden="true">#</a> 封装</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 节流函数</span>
<span class="token keyword">function</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> timeout <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> context <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> args <span class="token operator">=</span> arguments<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>timeout<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            timeout <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                timeout <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> args<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h2>
<p>常见的应用场景都是使用高频事件来调用函数的过程当中，比如应用于window对象的resize、scroll事件，拖拽时的mousemove事件，文字输入、自动完成的keyup事件。</p>
<h3 id="防抖应用场景" tabindex="-1"><a class="header-anchor" href="#防抖应用场景" aria-hidden="true">#</a> 防抖应用场景</h3>
<ul>
<li>scroll事件滚动触发事件</li>
<li>搜索框输入查询，如果用户一直在输入中，没有必要不停地调用去请求服务端接口，等用户停止输入的时候，再调用，设置一个合适的时间间隔，有效减轻服务端压力。</li>
<li>表单验证</li>
<li>按钮提交事件。</li>
<li>浏览器窗口缩放，resize事件(如窗口停止改变大小之后重新计算布局)等。</li>
</ul>
<h3 id="节流的应用场景" tabindex="-1"><a class="header-anchor" href="#节流的应用场景" aria-hidden="true">#</a> 节流的应用场景</h3>
<ul>
<li>DOM 元素的拖拽功能实现（mousemove）</li>
<li>搜索联想（keyup）</li>
<li>计算鼠标移动的距离（mousemove）</li>
<li>Canvas 模拟画板功能（mousemove）</li>
<li>射击游戏的 mousedown/keydown 事件（单位时间只能发射一颗子弹）</li>
<li>监听滚动事件判断是否到页面底部自动加载更多</li>
</ul>
<h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2>
<p class="codepen" data-height="600" data-theme-id="light" data-default-tab="result" data-user="xugaoyi" data-slug-hash="QWbgLMP" style="height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="防抖与节流函数">
  <span>See the Pen <a href="https://codepen.io/xugaoyi/pen/QWbgLMP">
  防抖与节流函数</a> by xugaoyi (<a href="https://codepen.io/xugaoyi">@xugaoyi</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</div></template>


