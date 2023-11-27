<template><div><h1 id="_01-hook概述" tabindex="-1"><a class="header-anchor" href="#_01-hook概述" aria-hidden="true">#</a> 01. Hook概述</h1>
<p>Hook可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。</p>
<h2 id="什么是-hook" tabindex="-1"><a class="header-anchor" href="#什么是-hook" aria-hidden="true">#</a> 什么是 Hook?</h2>
<p>Hook 是一个特殊的函数，可以让你在函数组件里“钩入” React <strong>state</strong> 及 <strong>生命周期</strong>  等特性的函数。</p>
<blockquote>
<ol>
<li>
<p>Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。</p>
</li>
<li>
<p>React 内置了一些像 <code v-pre>useState</code> 这样的 Hook。你也可以创建你自己的 Hook 来复用不同组件之间的状态逻辑。我们会先介绍这些内置的 Hook。</p>
</li>
</ol>
</blockquote>
<h2 id="usestate-状态钩子" tabindex="-1"><a class="header-anchor" href="#usestate-状态钩子" aria-hidden="true">#</a> useState（状态钩子）</h2>
<p><strong>模式：</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">[</span><span class="token operator">&lt;</span>取值<span class="token operator">></span><span class="token punctuation">,</span> <span class="token operator">&lt;</span>设值<span class="token operator">></span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>初始值<span class="token operator">></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面的三个值均可自定义名称，分别是：</p>
<ul>
<li>state取值变量名</li>
<li>state设值方法名</li>
<li>初始值
<ul>
<li>初始值可以是数字、字符串、对象、数组等</li>
</ul>
</li>
</ul>
<p><strong>例子：</strong></p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">Example</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 声明一个新的叫做 “count” 的 state 变量</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">You clicked </span><span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token plain-text"> times</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">setCount</span><span class="token punctuation">(</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">
        Click me
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="声明多个-state-变量" tabindex="-1"><a class="header-anchor" href="#声明多个-state-变量" aria-hidden="true">#</a> 声明多个 state 变量</h3>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">function</span> <span class="token function">ExampleWithManyStates</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 声明多个 state 变量！</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>age<span class="token punctuation">,</span> setAge<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>fruit<span class="token punctuation">,</span> setFruit<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">'banana'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>todos<span class="token punctuation">,</span> setTodos<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'Learn Hooks'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="effect-hook-副作用钩子" tabindex="-1"><a class="header-anchor" href="#effect-hook-副作用钩子" aria-hidden="true">#</a> Effect Hook (副作用钩子)</h2>
<p>你之前可能已经在 React 组件中执行过<strong>数据获取、订阅 或 者手动修改 DOM</strong>。我们统一把这些操作称为“<strong>副作用</strong>”，或者简称为“作用”。</p>
<h3 id="useeffect-生命周期钩子" tabindex="-1"><a class="header-anchor" href="#useeffect-生命周期钩子" aria-hidden="true">#</a> useEffect（生命周期钩子）</h3>
<p><code v-pre>useEffect</code> 就是一个 Effect Hook，<strong>给函数组件增加了操作副作用的能力</strong>。它跟 class 组件中的 <code v-pre>componentDidMount</code>、<code v-pre>componentDidUpdate</code> 和 <code v-pre>componentWillUnmount</code> 具有相同的用途，只不过被合并成了一个 API。（我们会在<a href="https://zh-hans.reactjs.org/docs/hooks-effect.html" target="_blank" rel="noopener noreferrer">使用 Effect Hook<ExternalLinkIcon/></a> 里展示对比 <code v-pre>useEffect</code> 和这些方法的例子。）</p>
<p>例如，下面这个组件在 React 更新 DOM 后会设置一个页面标题：</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useState<span class="token punctuation">,</span> useEffect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">Example</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 相当于 componentDidMount 和 componentDidUpdate:</span>
  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 第一次渲染DOM以及更新DOM后执行此函数</span>
    <span class="token comment">// 使用浏览器的 API 更新页面标题</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当你调用 <code v-pre>useEffect</code> 时，就是在告诉 React <strong>在完成对 DOM 的更改后运行你的“副作用”函数</strong>。由于副作用函数是在组件内声明的，所以它们可以访问到组件的 props 和 state。默认情况下，React 会在每次渲染后调用副作用函数 —— <strong>包括</strong>第一次渲染的时候。</p>
<h3 id="清除-副作用" tabindex="-1"><a class="header-anchor" href="#清除-副作用" aria-hidden="true">#</a> “清除”副作用</h3>
<p>副作用函数还可以通过返回一个函数来指定如何“清除”副作用。例如，在下面的组件中使用副作用函数来订阅好友的在线状态，并通过取消订阅来进行清除操作：</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useState<span class="token punctuation">,</span> useEffect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">FriendStatus</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>isOnline<span class="token punctuation">,</span> setIsOnline<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">function</span> <span class="token function">handleStatusChange</span><span class="token punctuation">(</span><span class="token parameter">status</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setIsOnline</span><span class="token punctuation">(</span>status<span class="token punctuation">.</span>isOnline<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token comment">// 组件挂载完成和更新完成后执行</span>
    <span class="token comment">// 创建订阅</span>
    ChatAPI<span class="token punctuation">.</span><span class="token function">subscribeToFriendStatus</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>friend<span class="token punctuation">.</span>id<span class="token punctuation">,</span> handleStatusChange<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token comment">// 组件销毁时执行</span>
      <span class="token comment">// 取消订阅</span>
      ChatAPI<span class="token punctuation">.</span><span class="token function">unsubscribeFromFriendStatus</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>friend<span class="token punctuation">.</span>id<span class="token punctuation">,</span> handleStatusChange<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isOnline <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'Loading...'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> isOnline <span class="token operator">?</span> <span class="token string">'Online'</span> <span class="token operator">:</span> <span class="token string">'Offline'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，React 会在组件销毁时取消对 <code v-pre>ChatAPI</code> 的订阅，然后在后续渲染时重新执行副作用函数。（如果传给 <code v-pre>ChatAPI</code> 的 <code v-pre>props.friend.id</code> 没有变化，你也可以<a href="https://zh-hans.reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects" target="_blank" rel="noopener noreferrer">告诉 React 跳过重新订阅<ExternalLinkIcon/></a>。）</p>
<p>跟 <code v-pre>useState</code> 一样，你可以在组件中多次使用 <code v-pre>useEffect</code> ：</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">function</span> <span class="token function">FriendStatusWithCounter</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    document<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">You clicked </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>count<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> times</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token punctuation">[</span>isOnline<span class="token punctuation">,</span> setIsOnline<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    ChatAPI<span class="token punctuation">.</span><span class="token function">subscribeToFriendStatus</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>friend<span class="token punctuation">.</span>id<span class="token punctuation">,</span> handleStatusChange<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      ChatAPI<span class="token punctuation">.</span><span class="token function">unsubscribeFromFriendStatus</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>friend<span class="token punctuation">.</span>id<span class="token punctuation">,</span> handleStatusChange<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">function</span> <span class="token function">handleStatusChange</span><span class="token punctuation">(</span><span class="token parameter">status</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setIsOnline</span><span class="token punctuation">(</span>status<span class="token punctuation">.</span>isOnline<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过使用 Hook，你可以把组件内相关的副作用组织在一起（例如创建订阅及取消订阅），而不要把它们拆分到不同的生命周期函数里。</p>
<blockquote>
<p>详细说明</p>
<p>你可以在这一章节了解更多关于 <code v-pre>useEffect</code> 的内容：<a href="https://zh-hans.reactjs.org/docs/hooks-effect.html" target="_blank" rel="noopener noreferrer">使用 Effect Hook<ExternalLinkIcon/></a></p>
</blockquote>
<h2 id="hook-使用规则" tabindex="-1"><a class="header-anchor" href="#hook-使用规则" aria-hidden="true">#</a> Hook 使用规则</h2>
<p>Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：</p>
<ul>
<li>只能在<strong>函数最外层</strong>调用 Hook。不要在循环、条件判断或者子函数中调用。</li>
<li>只能在 <strong>React 的函数组件</strong>中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）</li>
</ul>
<p>同时，我们提供了 <a href="https://www.npmjs.com/package/eslint-plugin-react-hooks" target="_blank" rel="noopener noreferrer">linter 插件<ExternalLinkIcon/></a>来自动执行这些规则。这些规则乍看起来会有一些限制和令人困惑，但是要让 Hook 正常工作，它们至关重要。</p>
<blockquote>
<p>详细说明</p>
<p>你可以在这章节了解更多关于这些规则的内容：<a href="https://zh-hans.reactjs.org/docs/hooks-rules.html" target="_blank" rel="noopener noreferrer">Hook 使用规则<ExternalLinkIcon/></a>。</p>
</blockquote>
<h2 id="自定义-hook-hook的使用逻辑封装" tabindex="-1"><a class="header-anchor" href="#自定义-hook-hook的使用逻辑封装" aria-hidden="true">#</a> 自定义 Hook （Hook的使用逻辑封装）</h2>
<p>有时候我们会想要在组件之间重用一些状态逻辑。目前为止，有两种主流方案来解决这个问题：<a href="https://zh-hans.reactjs.org/docs/higher-order-components.html" target="_blank" rel="noopener noreferrer">高阶组件<ExternalLinkIcon/></a>和 <a href="https://zh-hans.reactjs.org/docs/render-props.html" target="_blank" rel="noopener noreferrer">render props<ExternalLinkIcon/></a>。自定义 Hook 可以让你在不增加组件的情况下达到同样的目的。</p>
<p>前面，我们介绍了一个叫 <code v-pre>FriendStatus</code> 的组件，它通过调用 <code v-pre>useState</code> 和 <code v-pre>useEffect</code> 的 Hook 来订阅一个好友的在线状态。假设我们想在另一个组件里重用这个订阅逻辑。</p>
<p>首先，我们把这个逻辑抽取到一个叫做 <code v-pre>useFriendStatus</code> 的自定义 Hook 里：</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useState<span class="token punctuation">,</span> useEffect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>

<span class="token comment">// 逻辑抽取，方便复用</span>
<span class="token keyword">function</span> <span class="token function">useFriendStatus</span><span class="token punctuation">(</span><span class="token parameter">friendID</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 每次调用时的state都是独立的</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>isOnline<span class="token punctuation">,</span> setIsOnline<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">function</span> <span class="token function">handleStatusChange</span><span class="token punctuation">(</span><span class="token parameter">status</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setIsOnline</span><span class="token punctuation">(</span>status<span class="token punctuation">.</span>isOnline<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    ChatAPI<span class="token punctuation">.</span><span class="token function">subscribeToFriendStatus</span><span class="token punctuation">(</span>friendID<span class="token punctuation">,</span> handleStatusChange<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      ChatAPI<span class="token punctuation">.</span><span class="token function">unsubscribeFromFriendStatus</span><span class="token punctuation">(</span>friendID<span class="token punctuation">,</span> handleStatusChange<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> isOnline<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它将 <code v-pre>friendID</code> 作为参数，并返回该好友是否在线：</p>
<p>现在我们可以在两个组件中使用它：</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">function</span> <span class="token function">FriendStatus</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> isOnline <span class="token operator">=</span> <span class="token function">useFriendStatus</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>friend<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isOnline <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'Loading...'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> isOnline <span class="token operator">?</span> <span class="token string">'Online'</span> <span class="token operator">:</span> <span class="token string">'Offline'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">FriendListItem</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> isOnline <span class="token operator">=</span> <span class="token function">useFriendStatus</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>friend<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token literal-property property">color</span><span class="token operator">:</span> isOnline <span class="token operator">?</span> <span class="token string">'green'</span> <span class="token operator">:</span> <span class="token string">'black'</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>friend<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>每个组件间的 state 是完全独立的。Hook 是一种复用<em>状态逻辑</em>的方式，它不复用 state 本身</strong>。事实上 Hook 的每次<em>调用</em>都有一个完全独立的 state —— 因此你可以在单个组件中多次调用同一个自定义 Hook。</p>
<p>自定义 Hook 更像是一种约定而不是功能。<strong>如果函数的名字以 “<code v-pre>use</code>” 开头并调用其他 Hook，我们就说这是一个自定义 Hook</strong>。 <code v-pre>useSomething</code> 的命名约定可以让我们的 linter 插件在使用 Hook 的代码中找到 bug。</p>
<p>你可以创建涵盖各种场景的自定义 Hook，如表单处理、动画、订阅声明、计时器，甚至可能还有更多我们没想到的场景。我们很期待看到 React 社区会出现什么样的自定义 Hook。</p>
<blockquote>
<p>详细说明</p>
<p>我们会在这一章节介绍更多关于自定义 Hook 的内容： <a href="https://zh-hans.reactjs.org/docs/hooks-custom.html" target="_blank" rel="noopener noreferrer">创建你自己的 Hook<ExternalLinkIcon/></a>。</p>
</blockquote>
<h2 id="其他-hook" tabindex="-1"><a class="header-anchor" href="#其他-hook" aria-hidden="true">#</a> 其他 Hook</h2>
<p>除此之外，还有一些使用频率较低的但是很有用的 Hook。比如，<a href="https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext" target="_blank" rel="noopener noreferrer"><code v-pre>useContext</code><ExternalLinkIcon/></a> 让你不使用组件嵌套就可以订阅 React 的 Context。</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">function</span> <span class="token function">Example</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> locale <span class="token operator">=</span> <span class="token function">useContext</span><span class="token punctuation">(</span>LocaleContext<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> theme <span class="token operator">=</span> <span class="token function">useContext</span><span class="token punctuation">(</span>ThemeContext<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外 <a href="https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer" target="_blank" rel="noopener noreferrer"><code v-pre>useReducer</code><ExternalLinkIcon/></a> 可以让你通过 reducer 来管理组件本地的复杂 state。</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">function</span> <span class="token function">Todos</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>todos<span class="token punctuation">,</span> dispatch<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useReducer</span><span class="token punctuation">(</span>todosReducer<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>详细说明</p>
<p>你可以在这一章节了解更多关于所有内置 Hook 的内容：<a href="https://zh-hans.reactjs.org/docs/hooks-reference.html" target="_blank" rel="noopener noreferrer">Hook API 索引<ExternalLinkIcon/></a>。</p>
</blockquote>
</div></template>


