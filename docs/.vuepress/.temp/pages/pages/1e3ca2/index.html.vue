<template><div><h1 id="_04-state-生命周期" tabindex="-1"><a class="header-anchor" href="#_04-state-生命周期" aria-hidden="true">#</a> 04. State &amp; 生命周期</h1>
<p>State 与 props 类似，但是 <strong>state 是私有的，并且完全受控于当前组件.</strong></p>
<blockquote>
<p>State类似于vue中的data选项</p>
</blockquote>
<h2 id="将函数组件转换成-class-组件" tabindex="-1"><a class="header-anchor" href="#将函数组件转换成-class-组件" aria-hidden="true">#</a> 将函数组件转换成 class 组件</h2>
<blockquote>
<p>在没有useState钩子函数之前，是通过class组件管理State ？</p>
</blockquote>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">class</span> <span class="token class-name">Clock</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
    	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
      	</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span><span class="token plain-text">Hello, world</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span><span class="token plain-text">It is </span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>date<span class="token punctuation">.</span><span class="token function">toLocalTimeString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每次组件更新时 <code v-pre>render</code> 方法都会被调用，但只要在相同的 DOM 节点中渲染 <code v-pre>&lt;Clock /&gt;</code> ，就<strong>仅有一个 <code v-pre>Clock</code> 组件的 class 实例被创建使用</strong>。这就使得我们可以使用如 state 或生命周期方法等很多其他特性。</p>
<blockquote>
<p>单例模式？</p>
</blockquote>
<h2 id="向-class-组件中添加局部的-state" tabindex="-1"><a class="header-anchor" href="#向-class-组件中添加局部的-state" aria-hidden="true">#</a> 向 class 组件中添加局部的 state</h2>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">class</span> <span class="token class-name">Clock</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token comment">// 第二步：添加构造函数，并给 this.state 赋初始值</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token comment">// 通过super将props传递到父类构造函数中</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">date</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 第一步：render 方法内，将 this.props 替换成 this.state</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
    	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
      	</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span><span class="token plain-text">Hello, world</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span><span class="token plain-text">It is </span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>date<span class="token punctuation">.</span><span class="token function">toLocalTimeString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Clock</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span>
  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'root'</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="将生命周期方法添加到-class-中" tabindex="-1"><a class="header-anchor" href="#将生命周期方法添加到-class-中" aria-hidden="true">#</a> 将生命周期方法添加到 Class 中</h2>
<p>在具有许多组件的应用程序中，当组件被销毁时释放所占用的资源是非常重要的。</p>
<p>当 <code v-pre>Clock</code> 组件第一次被渲染到 DOM 中的时候，就为其<a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval" target="_blank" rel="noopener noreferrer">设置一个计时器<ExternalLinkIcon/></a>。这在 React 中被称为“<strong>挂载（mount）</strong>”。</p>
<p>同时，当 DOM 中 <code v-pre>Clock</code> 组件被删除的时候，应该<a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval" target="_blank" rel="noopener noreferrer">清除计时器<ExternalLinkIcon/></a>。这在 React 中被称为“<strong>卸载（unmount）</strong>”。</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">class</span> <span class="token class-name">Clock</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">date</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 挂载 - 挂载完成后执行</span>
  <span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 组件挂载后开启定时器</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>timerID <span class="token operator">=</span> <span class="token function">serInterval</span><span class="token punctuation">(</span> <span class="token comment">// 可以向this添加任意属性字段</span>
    	<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">tick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1000</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 卸载</span>
  <span class="token function">componentWillUnmount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 组件卸载后清除定时器，释放内存</span>
    <span class="token function">clearInterval</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>timerID<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">tick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">date</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span><span class="token plain-text">Hello, world!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span><span class="token plain-text">It is </span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>date<span class="token punctuation">.</span><span class="token function">toLocaleTimeString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">.</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Clock</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span>
  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'root'</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="正确地使用-state" tabindex="-1"><a class="header-anchor" href="#正确地使用-state" aria-hidden="true">#</a> 正确地使用 State</h2>
<p>关于 <code v-pre>setState()</code> 你应该了解三件事：</p>
<h3 id="不要直接修改-state" tabindex="-1"><a class="header-anchor" href="#不要直接修改-state" aria-hidden="true">#</a> 不要直接修改 State</h3>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code>
<span class="token comment">// Wrong 不要直接修改state</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>comment <span class="token operator">=</span> <span class="token string">'Hello'</span>

<span class="token comment">// Correct 应使用 setState() 方法</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">comment</span><span class="token operator">:</span> <span class="token string">'Hello'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>构造函数是唯一可以给 <code v-pre>this.state</code> 直接赋值的地方</strong></p>
<blockquote>
<p>setState是React内部方法，使state更新具有响应式？</p>
</blockquote>
<h3 id="state-的更新可能是异步的" tabindex="-1"><a class="header-anchor" href="#state-的更新可能是异步的" aria-hidden="true">#</a> State 的更新可能是异步的</h3>
<p>出于性能考虑，React 可能会把多个 <code v-pre>setState()</code> 调用合并成一个调用。</p>
<p>因为 <code v-pre>this.props</code> 和 <code v-pre>this.state</code> 可能会异步更新，所以你<strong>不要依赖他们的值来更新下一个状态</strong>。</p>
<p>要<strong>解决这个问题，可以让 <code v-pre>setState()</code> 接收一个函数而不是一个对象</strong>。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token comment">// Correct</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> props</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">counter</span><span class="token operator">:</span> state<span class="token punctuation">.</span>counter <span class="token operator">+</span> props<span class="token punctuation">.</span>increment
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="state-的更新会被合并" tabindex="-1"><a class="header-anchor" href="#state-的更新会被合并" aria-hidden="true">#</a> State 的更新会被合并</h3>
<p>当你调用 <code v-pre>setState()</code> 的时候，React 会把你提供的对象合并到当前的 state</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code>  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">posts</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">comments</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

<span class="token comment">// 分别调用setState单独更新state下的属性</span>
 <span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">fetchPosts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">response</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">posts</span><span class="token operator">:</span> response<span class="token punctuation">.</span>posts
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">fetchComments</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">response</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">comments</span><span class="token operator">:</span> response<span class="token punctuation">.</span>comments
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的合并是浅合并，所以 <code v-pre>this.setState({comments})</code> 完整保留了 <code v-pre>this.state.posts</code>， 但是完全替换了 <code v-pre>this.state.comments</code>。</p>
<h2 id="数据是向下流动的-单向数据流" tabindex="-1"><a class="header-anchor" href="#数据是向下流动的-单向数据流" aria-hidden="true">#</a> 数据是向下流动的（单向数据流）</h2>
<p>不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。</p>
<p>这就是为什么称 <strong>state 为局部的</strong>或是封装的的原因。除了拥有并设置了它的组件，<strong>其他组件都无法访问</strong>。</p>
<p>组件可以选择把它的 state 作为 props 向下传递到它的子组件中：</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">FormattedDate</span></span> <span class="token attr-name">date</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>date<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>FormattedDate</code> 组件会在其 props 中接收参数 <code v-pre>date</code>，但是<strong>组件本身无法知道它是来自于 <code v-pre>Clock</code> 的 state，或是 <code v-pre>Clock</code> 的 props，还是手动输入的</strong>。</p>
<p>这通常会被叫做“自上而下”或是**“单向”的数据流**。任何的 <strong>state 总是所属于特定的组件</strong>，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。</p>
<p>如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话，那么每一个组件的 state 就像是在任意一点上给瀑布增加额外的水源，但是它只能向下流动。</p>
<h4 id="每个组件都是真正独立的。" tabindex="-1"><a class="header-anchor" href="#每个组件都是真正独立的。" aria-hidden="true">#</a> 每个组件都是真正独立的。</h4>
</div></template>


