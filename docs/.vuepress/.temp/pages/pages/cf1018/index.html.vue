<template><div><h1 id="_05-自定义-hook" tabindex="-1"><a class="header-anchor" href="#_05-自定义-hook" aria-hidden="true">#</a> 05. 自定义 Hook</h1>
<p><strong>通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。</strong></p>
<p>目前为止，在 React 中有两种流行的方式来共享组件之间的状态逻辑: <a href="https://zh-hans.reactjs.org/docs/render-props.html" target="_blank" rel="noopener noreferrer">render props<ExternalLinkIcon/></a> 和<a href="https://zh-hans.reactjs.org/docs/higher-order-components.html" target="_blank" rel="noopener noreferrer">高阶组件<ExternalLinkIcon/></a>，现在让我们来看看 Hook 是如何在让你不增加组件的情况下解决相同问题的。</p>
<h2 id="提取自定义-hook" tabindex="-1"><a class="header-anchor" href="#提取自定义-hook" aria-hidden="true">#</a> 提取自定义 Hook</h2>
<p><strong>自定义 Hook 是一个函数，其名称以 “<code v-pre>use</code>” 开头，函数内部可以调用其他的 Hook。</strong> 例如，下面的 <code v-pre>useFriendStatus</code> 是我们第一个自定义的 Hook:</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useState<span class="token punctuation">,</span> useEffect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">useFriendStatus</span><span class="token punctuation">(</span><span class="token parameter">friendID</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>isOnline<span class="token punctuation">,</span> setIsOnline<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">function</span> <span class="token function">handleStatusChange</span><span class="token punctuation">(</span><span class="token parameter">status</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">setIsOnline</span><span class="token punctuation">(</span>status<span class="token punctuation">.</span>isOnline<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    ChatAPI<span class="token punctuation">.</span><span class="token function">subscribeToFriendStatus</span><span class="token punctuation">(</span>friendID<span class="token punctuation">,</span> handleStatusChange<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      ChatAPI<span class="token punctuation">.</span><span class="token function">unsubscribeFromFriendStatus</span><span class="token punctuation">(</span>friendID<span class="token punctuation">,</span> handleStatusChange<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> isOnline<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与 React 组件不同的是，自定义 Hook 不需要具有特殊的标识。我们可以自由的决定它的参数是什么，以及它应该返回什么（如果需要的话）。换句话说，它<strong>就像一个正常的函数</strong>。但是它的名字应该始终以 <code v-pre>use</code> 开头，这样可以一眼看出其符合 <a href="https://zh-hans.reactjs.org/docs/hooks-rules.html" target="_blank" rel="noopener noreferrer">Hook 的规则<ExternalLinkIcon/></a>。</p>
<h2 id="使用自定义-hook" tabindex="-1"><a class="header-anchor" href="#使用自定义-hook" aria-hidden="true">#</a> 使用自定义 Hook</h2>
<p>现在我们已经把这个逻辑提取到 <code v-pre>useFriendStatus</code> 的自定义 Hook 中，然后就可以<em>使用它了：</em></p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">function</span> <span class="token function">FriendStatus</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> isOnline <span class="token operator">=</span> <span class="token function">useFriendStatus</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>friend<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isOnline <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'Loading...'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> isOnline <span class="token operator">?</span> <span class="token string">'Online'</span> <span class="token operator">:</span> <span class="token string">'Offline'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code>
<span class="token keyword">function</span> <span class="token function">FriendListItem</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> isOnline <span class="token operator">=</span> <span class="token function">useFriendStatus</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>friend<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token literal-property property">color</span><span class="token operator">:</span> isOnline <span class="token operator">?</span> <span class="token string">'green'</span> <span class="token operator">:</span> <span class="token string">'black'</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>friend<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**这段代码等价于原来的示例代码吗？**等价，它的工作方式完全一样。如果你仔细观察，你会发现我们没有对其行为做任何的改变，我们只是将两个函数之间一些共同的代码提取到单独的函数中。<strong>自定义 Hook 是一种自然遵循 Hook 设计的约定，而并不是 React 的特性。</strong></p>
<p>**自定义 Hook 必须以 “<code v-pre>use</code>” 开头吗？**必须如此。这个约定非常重要。不遵循的话，由于无法判断某个函数是否包含对其内部 Hook 的调用，React 将无法自动检查你的 Hook 是否违反了 <a href="https://zh-hans.reactjs.org/docs/hooks-rules.html" target="_blank" rel="noopener noreferrer">Hook 的规则<ExternalLinkIcon/></a>。</p>
<p>**在两个组件中使用相同的 Hook 会共享 state 吗？**不会。自定义 Hook 是一种重用<em>状态逻辑</em>的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。</p>
<p>**自定义 Hook 如何获取独立的 state？**每次<em>调用</em> Hook，它都会获取独立的 state。由于我们直接调用了 <code v-pre>useFriendStatus</code>，从 React 的角度来看，我们的组件只是调用了 <code v-pre>useState</code> 和 <code v-pre>useEffect</code>。 正如我们在<a href="https://zh-hans.reactjs.org/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns" target="_blank" rel="noopener noreferrer">之前章节<ExternalLinkIcon/></a>中<a href="https://zh-hans.reactjs.org/docs/hooks-state.html#tip-using-multiple-state-variables" target="_blank" rel="noopener noreferrer">了解到的<ExternalLinkIcon/></a>一样，我们可以在一个组件中多次调用 <code v-pre>useState</code> 和 <code v-pre>useEffect</code>，它们是完全独立的。</p>
<h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h3>
<h3 id="小总结" tabindex="-1"><a class="header-anchor" href="#小总结" aria-hidden="true">#</a> 小总结</h3>
<ol>
<li>自定义hook就像一个普通函数，内部包含可复用的组件逻辑。</li>
<li>函数名以<code v-pre>use</code>开头。</li>
<li><code v-pre>state</code>是独立的。</li>
</ol>
</div></template>


