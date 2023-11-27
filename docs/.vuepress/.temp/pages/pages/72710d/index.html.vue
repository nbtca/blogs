<template><div><h1 id="_03-使用effect-hook-副作用钩子" tabindex="-1"><a class="header-anchor" href="#_03-使用effect-hook-副作用钩子" aria-hidden="true">#</a> 03. 使用Effect Hook（副作用钩子）</h1>
<p>如果你熟悉 React class 的生命周期函数，你可以把 <code v-pre>useEffect</code> Hook 看做 <code v-pre>componentDidMount</code>(挂载完成)，<code v-pre>componentDidUpdate</code>(更新完成) 和 <code v-pre>componentWillUnmount</code>（即将销毁前） 这三个函数的组合。</p>
<blockquote>
<p>Did : 做了...     Will: 将要...</p>
</blockquote>
<p><strong>数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用</strong>。不管你知不知道这些操作，或是“副作用”这个名字，应该都在组件中使用过它们。</p>
<p>在 React 组件中有两种常见副作用操作：**需要清除的 **和 <strong>不需要清除的</strong>。我们来更仔细地看一下他们之间的区别。</p>
<h2 id="无需清除的-effect" tabindex="-1"><a class="header-anchor" href="#无需清除的-effect" aria-hidden="true">#</a> 无需清除的 effect</h2>
<p>有时候，我们只想**在 React 更新 DOM 之后运行一些额外的代码。**比如发送网络请求，手动变更 DOM，记录日志，这些都是常见的无需清除的操作。因为我们在执行完这些操作之后，就可以忽略他们了。让我们对比一下使用 class 和 Hook 都是怎么实现这些副作用的。</p>
<h3 id="使用-class-的示例" tabindex="-1"><a class="header-anchor" href="#使用-class-的示例" aria-hidden="true">#</a> 使用 class 的示例</h3>
<p>在 React 的 class 组件中，<code v-pre>render</code> 函数是不应该有任何副作用的。一般来说，在这里执行操作太早了，我们基本上都希望在 React 更新 DOM 之后才执行我们的操作。</p>
<p>这就是为什么在 React class 中，我们把副作用操作放到 <code v-pre>componentDidMount</code> 和 <code v-pre>componentDidUpdate</code> 函数中。回到示例中，这是一个 React 计数器的 class 组件。它在 React 对 DOM 进行操作之后，立即更新了 document 的 title 属性</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">class</span> <span class="token class-name">Example</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
	
  <span class="token comment">// DOM挂载了</span>
  <span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    document<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">You clicked </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> times</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// DOM更新了</span>
  <span class="token function">componentDidUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    document<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">You clicked </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> times</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">You clicked </span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count<span class="token punctuation">}</span><span class="token plain-text"> times</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">
          Click me
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<strong>在这个 class 中，我们需要在两个生命周期函数中编写重复的代码。</strong></p>
<p>这是因为很多情况下，我们希望在组件加载和更新时执行同样的操作。<strong>从概念上说，我们希望它在每次渲染之后执行</strong> —— 但 React 的 class 组件没有提供这样的方法。即使我们提取出一个方法，我们还是要在两个地方调用它。</p>
<p>现在让我们来看看如何使用 <code v-pre>useEffect</code> 执行相同的操作。</p>
<h3 id="使用-hook-的示例" tabindex="-1"><a class="header-anchor" href="#使用-hook-的示例" aria-hidden="true">#</a> 使用 Hook 的示例</h3>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useState<span class="token punctuation">,</span> useEffect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">Example</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  
  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token comment">// 每次渲染组件DOM后执行此回调函数（即，挂载完成和更新完成生命周期）</span>
    document<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">You clicked </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>count<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> times</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">You clicked </span><span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token plain-text"> times</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">setCount</span><span class="token punctuation">(</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">
        Click me
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><code v-pre>useEffect</code> 做了什么？</strong> 通过使用这个 Hook，你可以告诉 React 组件需要在渲染后执行某些操作。React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它。在这个 effect 中，我们设置了 document 的 title 属性，不过我们也可以执行数据获取或调用其他命令式的 API。</p>
<p><strong>为什么在组件内部调用 <code v-pre>useEffect</code>？</strong> 将 <code v-pre>useEffect</code> 放在组件内部让我们可以在 effect 中直接访问 <code v-pre>count</code> state 变量（或其他 props）。我们不需要特殊的 API 来读取它 —— 它已经保存在函数作用域中。Hook 使用了 JavaScript 的闭包机制，而不用在 JavaScript 已经提供了解决方案的情况下，还引入特定的 React API。</p>
<p><strong><code v-pre>useEffect</code> 会在每次渲染后都执行吗？</strong> 是的，默认情况下，它在第一次渲染之后<em>和</em>每次更新之后都会执行。（我们稍后会谈到<a href="https://zh-hans.reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects" target="_blank" rel="noopener noreferrer">如何控制它<ExternalLinkIcon/></a>。）你可能会更容易接受 effect 发生在“渲染之后”这种概念，不用再去考虑“挂载”还是“更新”。React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。</p>
<h3 id="不同之处" tabindex="-1"><a class="header-anchor" href="#不同之处" aria-hidden="true">#</a> 不同之处</h3>
<p>与 <code v-pre>componentDidMount</code> 或 <code v-pre>componentDidUpdate</code> 不同，使用 <code v-pre>useEffect</code> 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。大多数情况下，effect 不需要同步地执行。在个别情况下（例如测量布局），有单独的 <a href="https://zh-hans.reactjs.org/docs/hooks-reference.html#uselayouteffect" target="_blank" rel="noopener noreferrer"><code v-pre>useLayoutEffect</code><ExternalLinkIcon/></a> Hook 供你使用，其 API 与 <code v-pre>useEffect</code> 相同。</p>
<h2 id="需要清除的-effect" tabindex="-1"><a class="header-anchor" href="#需要清除的-effect" aria-hidden="true">#</a> 需要清除的 effect</h2>
<p>之前，我们研究了如何使用不需要清除的副作用，还有一些副作用是需要清除的。例如<strong>订阅外部数据源</strong>。这种情况下，清除工作是非常重要的，可以防止引起内存泄露！现在让我们来比较一下如何用 Class 和 Hook 来实现。</p>
<h3 id="使用-class-的示例-1" tabindex="-1"><a class="header-anchor" href="#使用-class-的示例-1" aria-hidden="true">#</a> 使用 Class 的示例</h3>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">class</span> <span class="token class-name">FriendStatus</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">isOnline</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>handleStatusChange <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleStatusChange</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
	
  <span class="token comment">// 挂载后</span>
  <span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ChatAPI<span class="token punctuation">.</span><span class="token function">subscribeToFriendStatus</span><span class="token punctuation">(</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>friend<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>handleStatusChange
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token comment">// 即将卸载</span>
  <span class="token function">componentWillUnmount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ChatAPI<span class="token punctuation">.</span><span class="token function">unsubscribeFromFriendStatus</span><span class="token punctuation">(</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>friend<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>handleStatusChange
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">handleStatusChange</span><span class="token punctuation">(</span><span class="token parameter">status</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">isOnline</span><span class="token operator">:</span> status<span class="token punctuation">.</span>isOnline
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>isOnline <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token string">'Loading...'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>isOnline <span class="token operator">?</span> <span class="token string">'Online'</span> <span class="token operator">:</span> <span class="token string">'Offline'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用-hook-的示例-1" tabindex="-1"><a class="header-anchor" href="#使用-hook-的示例-1" aria-hidden="true">#</a> 使用 Hook 的示例</h3>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useState<span class="token punctuation">,</span> useEffect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">FriendStatus</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>isOnline<span class="token punctuation">,</span> setIsOnline<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token comment">// 每次渲染组件DOM后执行此回调函数（即，挂载完成和更新完成生命周期）</span>
    <span class="token keyword">function</span> <span class="token function">handleStatusChange</span><span class="token punctuation">(</span><span class="token parameter">status</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">setIsOnline</span><span class="token punctuation">(</span>status<span class="token punctuation">.</span>isOnline<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    ChatAPI<span class="token punctuation">.</span><span class="token function">subscribeToFriendStatus</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>friend<span class="token punctuation">.</span>id<span class="token punctuation">,</span> handleStatusChange<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 每次重新渲染前都会执行（class的 componentWillUnmount 只在卸载组件执行）</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 函数名非必需，可使用箭头函数</span>
      ChatAPI<span class="token punctuation">.</span><span class="token function">unsubscribeFromFriendStatus</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>friend<span class="token punctuation">.</span>id<span class="token punctuation">,</span> handleStatusChange<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>isOnline <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'Loading...'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> isOnline <span class="token operator">?</span> <span class="token string">'Online'</span> <span class="token operator">:</span> <span class="token string">'Offline'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-effect-的提示" tabindex="-1"><a class="header-anchor" href="#使用-effect-的提示" aria-hidden="true">#</a> 使用 Effect 的提示</h2>
<h3 id="使用hook的目的" tabindex="-1"><a class="header-anchor" href="#使用hook的目的" aria-hidden="true">#</a> 使用Hook的目的</h3>
<p>使用 Hook 其中一个<a href="https://zh-hans.reactjs.org/docs/hooks-intro.html#complex-components-become-hard-to-understand" target="_blank" rel="noopener noreferrer">目的<ExternalLinkIcon/></a>就是要解决 class 中生命周期函数经常包含不相关的逻辑，但又把相关逻辑分离到了几个不同方法中的问题。</p>
<h3 id="提示-使用多个-effect-实现关注点分离" tabindex="-1"><a class="header-anchor" href="#提示-使用多个-effect-实现关注点分离" aria-hidden="true">#</a> 提示: 使用多个 Effect 实现关注点分离</h3>
<p>可以使用多个 effect。这会将不相关逻辑分离到不同的 effect 中：</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">function</span> <span class="token function">FriendStatusWithCounter</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    document<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">You clicked </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>count<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> times</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token punctuation">[</span>isOnline<span class="token punctuation">,</span> setIsOnline<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">function</span> <span class="token function">handleStatusChange</span><span class="token punctuation">(</span><span class="token parameter">status</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">setIsOnline</span><span class="token punctuation">(</span>status<span class="token punctuation">.</span>isOnline<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    ChatAPI<span class="token punctuation">.</span><span class="token function">subscribeToFriendStatus</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>friend<span class="token punctuation">.</span>id<span class="token punctuation">,</span> handleStatusChange<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      ChatAPI<span class="token punctuation">.</span><span class="token function">unsubscribeFromFriendStatus</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>friend<span class="token punctuation">.</span>id<span class="token punctuation">,</span> handleStatusChange<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解释-为什么每次更新的时候都要运行-effect" tabindex="-1"><a class="header-anchor" href="#解释-为什么每次更新的时候都要运行-effect" aria-hidden="true">#</a> 解释: 为什么每次更新的时候都要运行 Effect</h3>
<p>如果你已经习惯了使用 class，那么你或许会疑惑<strong>为什么 effect 的清除阶段在每次重新渲染时都会执行，而不是只在卸载组件的时候执行一次</strong>。让我们看一个实际的例子，看看为什么这个设计可以帮助我们创建 bug 更少的组件。</p>
<p>...</p>
<p><strong>忘记正确地处理 <code v-pre>componentDidUpdate</code> 是 React 应用中常见的 bug 来源</strong>。</p>
<p>...</p>
<h3 id="提示-通过跳过-effect-进行性能优化" tabindex="-1"><a class="header-anchor" href="#提示-通过跳过-effect-进行性能优化" aria-hidden="true">#</a> 提示: 通过跳过 Effect 进行性能优化</h3>
<p>在某些情况下，每次渲染后都执行清理或者执行 effect 可能会导致性能问题。</p>
<p>如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React <strong>跳过</strong>对 effect 的调用，只要传递数组作为 <code v-pre>useEffect</code> 的第二个可选参数即可：</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  document<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">You clicked </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>count<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> times</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>count<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 仅在 count 更改时更新</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于有清除操作的 effect 同样适用：</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">handleStatusChange</span><span class="token punctuation">(</span><span class="token parameter">status</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setIsOnline</span><span class="token punctuation">(</span>status<span class="token punctuation">.</span>isOnline<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  ChatAPI<span class="token punctuation">.</span><span class="token function">subscribeToFriendStatus</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>friend<span class="token punctuation">.</span>id<span class="token punctuation">,</span> handleStatusChange<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    ChatAPI<span class="token punctuation">.</span><span class="token function">unsubscribeFromFriendStatus</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>friend<span class="token punctuation">.</span>id<span class="token punctuation">,</span> handleStatusChange<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>props<span class="token punctuation">.</span>friend<span class="token punctuation">.</span>id<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 仅在 props.friend.id 发生变化时，重新订阅</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>未来版本，可能会在构建时自动添加第二个参数。</p>
<p><strong>注意：</strong></p>
<ol>
<li>
<p>如果你要使用此优化方式，请确保数组中包含了<strong>所有外部作用域中会随时间变化并且在 effect 中使用的变量</strong>，否则你的代码会引用到先前渲染中的旧变量。</p>
</li>
<li>
<p>如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（<code v-pre>[]</code>）作为第二个参数。</p>
</li>
<li>
<p>如果你传入了一个空数组（<code v-pre>[]</code>），effect 内部的 props 和 state 就会一直拥有其初始值。尽管传入 <code v-pre>[]</code> 作为第二个参数更接近大家更熟悉的 <code v-pre>componentDidMount</code> 和 <code v-pre>componentWillUnmount</code> 思维模式，但我们有<a href="https://zh-hans.reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies" target="_blank" rel="noopener noreferrer">更好的<ExternalLinkIcon/></a><a href="https://zh-hans.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often" target="_blank" rel="noopener noreferrer">方式<ExternalLinkIcon/></a>来避免过于频繁的重复调用 effect。除此之外，请记得 React 会等待浏览器完成画面渲染之后才会延迟调用 <code v-pre>useEffect</code>，因此会使得额外操作很方便。</p>
</li>
<li>
<p>我们推荐启用 <a href="https://www.npmjs.com/package/eslint-plugin-react-hooks#installation" target="_blank" rel="noopener noreferrer"><code v-pre>eslint-plugin-react-hooks</code><ExternalLinkIcon/></a> 中的 <a href="https://github.com/facebook/react/issues/14920" target="_blank" rel="noopener noreferrer"><code v-pre>exhaustive-deps</code><ExternalLinkIcon/></a> 规则。此规则会在添加错误依赖时发出警告并给出修复建议。</p>
</li>
</ol>
</div></template>


