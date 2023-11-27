<template><div><h1 id="vuex" tabindex="-1"><a class="header-anchor" href="#vuex" aria-hidden="true">#</a> Vuex</h1>
<p>Vuex 是一个专为 Vue.js 应用程序开发的<strong>状态管理模式</strong>。</p>
<h2 id="vuex使用过程演示" tabindex="-1"><a class="header-anchor" href="#vuex使用过程演示" aria-hidden="true">#</a> Vuex使用过程演示</h2>
<p>以<code v-pre>vue-cli3</code>新创建出来的项目为例，演示Vuex的使用过程。</p>
<p>创建项目:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>vue create vuex-test
<span class="token builtin class-name">cd</span> vuex-test
<span class="token function">npm</span> run serve
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装<code v-pre>vuex</code>:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> i vuex <span class="token parameter variable">-S</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进入项目的<code v-pre>src/</code>下新建一个文件<code v-pre>store/index.js</code>，并写入：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// store/index.js</span>
<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> Vuex <span class="token keyword">from</span> <span class="token string">'vuex'</span>

Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Vuex<span class="token punctuation">)</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vuex<span class="token punctuation">.</span>Store</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token comment">// 容器 （构造函数Store开头大写）</span>
    <span class="token literal-property property">state</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 状态</span>
        <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">mutations</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 变化（使用mutations提交改变是为了方便追踪变化记录）</span>
        <span class="token function">increment</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            state<span class="token punctuation">.</span>count<span class="token operator">++</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> store <span class="token comment">// 导出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进入<code v-pre>main.js</code> 注入<code v-pre>store</code>，<strong>使所有<code v-pre>vue</code>组件能够使用<code v-pre>vuex</code></strong> :</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// main.js</span>
<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">'./App.vue'</span>
<span class="token keyword">import</span> router <span class="token keyword">from</span> <span class="token string">'./router'</span>
<span class="token keyword">import</span> store <span class="token keyword">from</span> <span class="token string">'./store'</span>

Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>productionTip <span class="token operator">=</span> <span class="token boolean">false</span>

<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  router<span class="token punctuation">,</span>
  store<span class="token punctuation">,</span>
  <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token parameter">h</span> <span class="token operator">=></span> <span class="token function">h</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以从组件的方法提交一个变更：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">'increment'</span><span class="token punctuation">)</span> <span class="token comment">// .commit('&lt;mutations里的事件名>')</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span>state<span class="token punctuation">.</span>count<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在组件模板中使用状态：</p>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code>{{ count }}

computed: {
	count() {
		return this.$store.state.count
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>state状态的改变会触发computed的重新计算</p>
</blockquote>
<h2 id="核心概念" tabindex="-1"><a class="header-anchor" href="#核心概念" aria-hidden="true">#</a> 核心概念</h2>
<h3 id="state" tabindex="-1"><a class="header-anchor" href="#state" aria-hidden="true">#</a> State</h3>
<p>Vuex 使用<strong>单一状态树</strong>，每个应用将仅仅包含一个 store 实例</p>
<h4 id="mapstate-辅助函数" tabindex="-1"><a class="header-anchor" href="#mapstate-辅助函数" aria-hidden="true">#</a> <code v-pre>mapState</code> 辅助函数</h4>
<p><strong>当一个组件需要获取多个状态的时候</strong>，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 <code v-pre>mapState</code> 辅助函数帮助我们生成计算属性，让你少按几次键：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 在单独构建的版本中辅助函数为 Vuex.mapState</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> mapState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vuex'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token function">mapState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// 箭头函数可使代码更简练</span>
    <span class="token function-variable function">count</span><span class="token operator">:</span> <span class="token parameter">state</span> <span class="token operator">=></span> state<span class="token punctuation">.</span>count<span class="token punctuation">,</span>

    <span class="token comment">// 传字符串参数 'count' 等同于 `state => state.count`</span>
    <span class="token literal-property property">countAlias</span><span class="token operator">:</span> <span class="token string">'count'</span><span class="token punctuation">,</span>

    <span class="token comment">// 为了能够使用 `this` 获取局部状态，必须使用常规函数</span>
    <span class="token function">countPlusLocalState</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>localCount
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面mapState()参数内<strong>三个方式都是获取count的值</strong>。</p>
<p>当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 <code v-pre>mapState</code> 传一个字符串数组。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token function">mapState</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token comment">// 映射 this.count 为 store.state.count</span>
  <span class="token string">'count'</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="对象展开运算符" tabindex="-1"><a class="header-anchor" href="#对象展开运算符" aria-hidden="true">#</a> 对象展开运算符</h4>
<p><code v-pre>mapState</code> 函数返回的是一个对象。可使用对象展开运算符将此对象混入到外部对象中</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function">localComputed</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 其他的计算属性</span>
  <span class="token comment">// 使用对象展开运算符将此对象混入到外部对象中</span>
  <span class="token operator">...</span><span class="token function">mapState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// ... 这里面和上面的获取方式是一样的</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="组件仍然保有局部状态" tabindex="-1"><a class="header-anchor" href="#组件仍然保有局部状态" aria-hidden="true">#</a> 组件仍然保有局部状态</h4>
<p>使用 Vuex 并不意味着你需要将<strong>所有的</strong>状态放入 Vuex。虽然将所有的状态放到 Vuex 会使状态变化更显式和易调试，但也会使代码变得冗长和不直观。如果有些状态严格属于单个组件，最好还是作为组件的局部状态。你应该根据你的应用开发需要进行权衡和确定。</p>
<h3 id="getter" tabindex="-1"><a class="header-anchor" href="#getter" aria-hidden="true">#</a> Getter</h3>
<p>有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function">doneTodosCount</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span>state<span class="token punctuation">.</span>todos<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">todo</span> <span class="token operator">=></span> todo<span class="token punctuation">.</span>done<span class="token punctuation">)</span><span class="token punctuation">.</span>length
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。</p>
<p>Vuex 允许我们在 store 中定义“getter”（<strong>可以认为是 store 的计算属性</strong>）。就像计算属性一样，getter 的返回值会根据它的依赖<strong>被缓存</strong>起来，且只有当它的依赖值发生了改变才会被重新计算。</p>
<p>Getter 接受 state 作为其第一个参数：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vuex<span class="token punctuation">.</span>Store</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">state</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">todos</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'...'</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'...'</span><span class="token punctuation">,</span> <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">getters</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">doneTodos</span><span class="token operator">:</span> <span class="token parameter">state</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> state<span class="token punctuation">.</span>todos<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">todo</span> <span class="token operator">=></span> todo<span class="token punctuation">.</span>done<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="通过属性访问" tabindex="-1"><a class="header-anchor" href="#通过属性访问" aria-hidden="true">#</a> 通过属性访问</h4>
<p>Getter 会暴露为 <code v-pre>store.getters</code> 对象，你可以以属性的形式访问这些值：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>store<span class="token punctuation">.</span>getters<span class="token punctuation">.</span>doneTodos <span class="token comment">// -> [{ id: 1, text: '...', done: true }]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Getter 也可以接受其他 getter 作为第二个参数：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">getters</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token function-variable function">doneTodosCount</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> getters</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> getters<span class="token punctuation">.</span>doneTodos<span class="token punctuation">.</span>length
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
store<span class="token punctuation">.</span>getters<span class="token punctuation">.</span>doneTodosCount <span class="token comment">// -> 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以很容易地在任何组件中使用它：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function">doneTodosCount</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span>getters<span class="token punctuation">.</span>doneTodosCount
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。</p>
<h4 id="通过方法访问" tabindex="-1"><a class="header-anchor" href="#通过方法访问" aria-hidden="true">#</a> 通过方法访问</h4>
<p>你也可以通过让 getter 返回一个函数，来<strong>实现给 getter 传参</strong>。在你对 store 里的数组进行查询时非常有用。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">getters</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token function-variable function">getTodoById</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> state<span class="token punctuation">.</span>todos<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token parameter">todo</span> <span class="token operator">=></span> todo<span class="token punctuation">.</span>id <span class="token operator">===</span> id<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
store<span class="token punctuation">.</span>getters<span class="token punctuation">.</span><span class="token function">getTodoById</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// -> { id: 2, text: '...', done: false }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，getter 在通过方法访问时，每次都会去进行调用，而<strong>不会缓存结果</strong>。</p>
<h4 id="mapgetters-辅助函数" tabindex="-1"><a class="header-anchor" href="#mapgetters-辅助函数" aria-hidden="true">#</a> <code v-pre>mapGetters</code> 辅助函数</h4>
<p><code v-pre>mapGetters</code> 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mapGetters <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vuex'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token comment">// 使用对象展开运算符将 getter 混入 computed 对象中</span>
    <span class="token operator">...</span><span class="token function">mapGetters</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
      <span class="token string">'doneTodosCount'</span><span class="token punctuation">,</span>
      <span class="token string">'anotherGetter'</span><span class="token punctuation">,</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你想将一个 getter 属性另取一个名字，使用对象形式：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">...</span><span class="token function">mapGetters</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`</span>
  <span class="token literal-property property">doneCount</span><span class="token operator">:</span> <span class="token string">'doneTodosCount'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mutation" tabindex="-1"><a class="header-anchor" href="#mutation" aria-hidden="true">#</a> Mutation</h3>
<p>更改 Vuex 的 store 中的状态的<strong>唯一方法</strong>是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 <strong>事件类型 (type)</strong> 和 一个 <strong>回调函数 (handler)</strong>。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vuex<span class="token punctuation">.</span>Store</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">state</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">1</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">mutations</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">increment</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 变更状态</span>
      state<span class="token punctuation">.</span>count<span class="token operator">++</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 <code v-pre>increment</code> 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 <strong>store.commit</strong> 方法：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">'increment'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="提交载荷-payload" tabindex="-1"><a class="header-anchor" href="#提交载荷-payload" aria-hidden="true">#</a> 提交载荷（Payload）</h4>
<p>你可以向 <code v-pre>store.commit</code> 传入额外的参数，即 mutation 的 <strong>载荷（payload）</strong>：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// ...</span>
<span class="token literal-property property">mutations</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function">increment</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">.</span>count <span class="token operator">+=</span> n
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">'increment'</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// ...</span>
<span class="token literal-property property">mutations</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function">increment</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> payload</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">.</span>count <span class="token operator">+=</span> payload<span class="token punctuation">.</span>amount
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">'increment'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">amount</span><span class="token operator">:</span> <span class="token number">10</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="对象风格的提交方式" tabindex="-1"><a class="header-anchor" href="#对象风格的提交方式" aria-hidden="true">#</a> 对象风格的提交方式</h4>
<p>提交 mutation 的另一种方式是直接使用包含 <code v-pre>type</code> 属性的对象：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'increment'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">amount</span><span class="token operator">:</span> <span class="token number">10</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">mutations</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function">increment</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> payload</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">.</span>count <span class="token operator">+=</span> payload<span class="token punctuation">.</span>amount
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="mutation-需遵守-vue-的响应规则" tabindex="-1"><a class="header-anchor" href="#mutation-需遵守-vue-的响应规则" aria-hidden="true">#</a> Mutation 需遵守 Vue 的响应规则</h4>
<p>既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：</p>
<ol>
<li>最好提前在你的 store 中初始化好所有所需属性。</li>
<li>当需要在对象上添加新属性时，你应该</li>
</ol>
<ul>
<li>
<p>使用 <code v-pre>Vue.set(obj, 'newProp', 123)</code>, 或者</p>
</li>
<li>
<p>以新对象替换老对象。例如，利用<a href="https://github.com/tc39/proposal-object-rest-spread" target="_blank" rel="noopener noreferrer">对象展开运算符<ExternalLinkIcon/></a>我们可以这样写：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>state<span class="token punctuation">.</span>obj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">...</span>state<span class="token punctuation">.</span>obj<span class="token punctuation">,</span> <span class="token literal-property property">newProp</span><span class="token operator">:</span> <span class="token number">123</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h4 id="使用常量替代-mutation-事件类型" tabindex="-1"><a class="header-anchor" href="#使用常量替代-mutation-事件类型" aria-hidden="true">#</a> 使用常量替代 Mutation 事件类型</h4>
<p>使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// mutation-types.js</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">SOME_MUTATION</span> <span class="token operator">=</span> <span class="token string">'SOME_MUTATION'</span>
<span class="token comment">// store.js</span>
<span class="token keyword">import</span> Vuex <span class="token keyword">from</span> <span class="token string">'vuex'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">SOME_MUTATION</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./mutation-types'</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vuex<span class="token punctuation">.</span>Store</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">state</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">mutations</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名</span>
    <span class="token punctuation">[</span><span class="token constant">SOME_MUTATION</span><span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// mutate state</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用不用常量取决于你——在需要多人协作的大型项目中，这会很有帮助。但如果你不喜欢，你完全可以不这样做。</p>
<h4 id="mutation-必须是同步函数" tabindex="-1"><a class="header-anchor" href="#mutation-必须是同步函数" aria-hidden="true">#</a> Mutation 必须是同步函数</h4>
<p>一条重要的原则就是要记住 <strong>mutation 必须是同步函数</strong>。为什么？请参考下面的例子：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">mutations</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function">someMutation</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    api<span class="token punctuation">.</span><span class="token function">callAsyncMethod</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      state<span class="token punctuation">.</span>count<span class="token operator">++</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在想象，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。</p>
<h4 id="在组件中提交-mutation-mapmutations辅助函数" tabindex="-1"><a class="header-anchor" href="#在组件中提交-mutation-mapmutations辅助函数" aria-hidden="true">#</a> 在组件中提交 Mutation  (<code v-pre>mapMutations</code>辅助函数)</h4>
<p>你可以在组件中使用 <code v-pre>this.$store.commit('xxx')</code> 提交 mutation，或者使用 <code v-pre>mapMutations</code> 辅助函数将组件中的 methods 映射为 <code v-pre>store.commit</code> 调用（需要在根节点注入 <code v-pre>store</code>）。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mapMutations <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vuex'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span><span class="token function">mapMutations</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
      <span class="token string">'increment'</span><span class="token punctuation">,</span> <span class="token comment">// 将 `this.increment()` 映射为 `this.$store.commit('increment')`</span>

      <span class="token comment">// `mapMutations` 也支持载荷：</span>
      <span class="token string">'incrementBy'</span> <span class="token comment">// 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token operator">...</span><span class="token function">mapMutations</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">add</span><span class="token operator">:</span> <span class="token string">'increment'</span> <span class="token comment">// 将 `this.add()` 映射为 `this.$store.commit('increment')`</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="下一步-action" tabindex="-1"><a class="header-anchor" href="#下一步-action" aria-hidden="true">#</a> 下一步：Action</h4>
<p>在 mutation 中混合异步调用会导致你的程序很难调试。例如，当你调用了两个包含异步回调的 mutation 来改变状态，你怎么知道什么时候回调和哪个先回调呢？这就是为什么我们要区分这两个概念。在 Vuex 中，<strong>mutation 都是同步事务</strong>：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">'increment'</span><span class="token punctuation">)</span>
<span class="token comment">// 任何由 "increment" 导致的状态变更都应该在此刻完成。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>为了处理异步操作，让我们来看一看 <a href="https://vuex.vuejs.org/zh/guide/actions.html" target="_blank" rel="noopener noreferrer">Action<ExternalLinkIcon/></a>。</p>
<h3 id="action" tabindex="-1"><a class="header-anchor" href="#action" aria-hidden="true">#</a> Action</h3>
<p>Action 类似于 mutation，不同在于：</p>
<ul>
<li>Action 提交的是 mutation，而不是直接变更状态。</li>
<li>Action 可以包含任意异步操作。</li>
</ul>
<p>让我们来注册一个简单的 action：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vuex<span class="token punctuation">.</span>Store</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">state</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">mutations</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">increment</span> <span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      state<span class="token punctuation">.</span>count<span class="token operator">++</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">increment</span> <span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      context<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">'increment'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象</strong>，因此你可以调用 <code v-pre>context.commit</code> 提交一个 mutation，或者通过 <code v-pre>context.state</code> 和 <code v-pre>context.getters</code> 来获取 state 和 getters。当我们在之后介绍到 <a href="https://vuex.vuejs.org/zh/guide/modules.html" target="_blank" rel="noopener noreferrer">Modules<ExternalLinkIcon/></a> 时，你就知道 context 对象为什么不是 store 实例本身了。</p>
<p>实践中，我们会经常用到 ES2015 的 <a href="https://github.com/lukehoban/es6features#destructuring" target="_blank" rel="noopener noreferrer">参数解构<ExternalLinkIcon/></a> 来简化代码（特别是我们需要调用 <code v-pre>commit</code> 很多次的时候）：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function">increment</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> commit <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">'increment'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="分发-action" tabindex="-1"><a class="header-anchor" href="#分发-action" aria-hidden="true">#</a> 分发 Action</h4>
<p><strong>Action 通过 <code v-pre>store.dispatch</code> 方法触发</strong>：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token string">'increment'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，还记得 <strong>mutation 必须同步执行</strong>这个限制么？Action 就不受约束！我们可以在 action 内部执行<strong>异步</strong>操作：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function">incrementAsync</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> commit <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">'increment'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Actions 支持同样的载荷方式和对象方式进行分发：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 以载荷形式分发</span>
store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token string">'incrementAsync'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">amount</span><span class="token operator">:</span> <span class="token number">10</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 以对象形式分发</span>
store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'incrementAsync'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">amount</span><span class="token operator">:</span> <span class="token number">10</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>来看一个更加实际的购物车示例，涉及到<strong>调用异步 API</strong> 和<strong>分发多重 mutation</strong>：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function">checkout</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> commit<span class="token punctuation">,</span> state <span class="token punctuation">}</span><span class="token punctuation">,</span> products</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 把当前购物车的物品备份起来</span>
    <span class="token keyword">const</span> savedCartItems <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>state<span class="token punctuation">.</span>cart<span class="token punctuation">.</span>added<span class="token punctuation">]</span>
    <span class="token comment">// 发出结账请求，然后乐观地清空购物车</span>
    <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">CHECKOUT_REQUEST</span><span class="token punctuation">)</span>
    <span class="token comment">// 购物 API 接受一个成功回调和一个失败回调</span>
    shop<span class="token punctuation">.</span><span class="token function">buyProducts</span><span class="token punctuation">(</span>
      products<span class="token punctuation">,</span>
      <span class="token comment">// 成功操作</span>
      <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">CHECKOUT_SUCCESS</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token comment">// 失败操作</span>
      <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">commit</span><span class="token punctuation">(</span>types<span class="token punctuation">.</span><span class="token constant">CHECKOUT_FAILURE</span><span class="token punctuation">,</span> savedCartItems<span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意我们正在进行一系列的异步操作，并且通过提交 mutation 来记录 action 产生的副作用（即状态变更）。</p>
<h4 id="在组件中分发-action-mapactions-辅助函数" tabindex="-1"><a class="header-anchor" href="#在组件中分发-action-mapactions-辅助函数" aria-hidden="true">#</a> 在组件中分发 Action  （<code v-pre>mapActions</code> 辅助函数）</h4>
<p>你在组件中使用 <code v-pre>this.$store.dispatch('xxx')</code> 分发 action，或者使用 <code v-pre>mapActions</code> 辅助函数将组件的 methods 映射为 <code v-pre>store.dispatch</code> 调用（需要先在根节点注入 <code v-pre>store</code>）：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mapActions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vuex'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span><span class="token function">mapActions</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
      <span class="token string">'increment'</span><span class="token punctuation">,</span> <span class="token comment">// 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`</span>

      <span class="token comment">// `mapActions` 也支持载荷：</span>
      <span class="token string">'incrementBy'</span> <span class="token comment">// 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token operator">...</span><span class="token function">mapActions</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">add</span><span class="token operator">:</span> <span class="token string">'increment'</span> <span class="token comment">// 将 `this.add()` 映射为 `this.$store.dispatch('increment')`</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="组合-action" tabindex="-1"><a class="header-anchor" href="#组合-action" aria-hidden="true">#</a> 组合 Action</h4>
<p>Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？</p>
<p>首先，你需要明白 <code v-pre>store.dispatch</code> 可以处理被触发的 action 的处理函数返回的 Promise，并且 <code v-pre>store.dispatch</code> 仍旧返回 Promise：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function">actionA</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> commit <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">'someMutation'</span><span class="token punctuation">)</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在你可以：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token string">'actionA'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在另外一个 action 中也可以：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token function">actionB</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> dispatch<span class="token punctuation">,</span> commit <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token string">'actionA'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">'someOtherMutation'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，如果我们利用 <a href="https://tc39.github.io/ecmascript-asyncawait/" target="_blank" rel="noopener noreferrer">async / await<ExternalLinkIcon/></a>，我们可以如下组合 action：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 假设 getData() 和 getOtherData() 返回的是 Promise</span>

<span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token keyword">async</span> <span class="token function">actionA</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> commit <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">'gotData'</span><span class="token punctuation">,</span> <span class="token keyword">await</span> <span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">async</span> <span class="token function">actionB</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> dispatch<span class="token punctuation">,</span> commit <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token string">'actionA'</span><span class="token punctuation">)</span> <span class="token comment">// 等待 actionA 完成</span>
    <span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">'gotOtherData'</span><span class="token punctuation">,</span> <span class="token keyword">await</span> <span class="token function">getOtherData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>一个 <code v-pre>store.dispatch</code> 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。</p>
</blockquote>
<h2 id="更多" tabindex="-1"><a class="header-anchor" href="#更多" aria-hidden="true">#</a> 更多</h2>
<p>更多内容查看官方文档：<a href="https://vuex.vuejs.org/zh/guide/modules.html" target="_blank" rel="noopener noreferrer">https://vuex.vuejs.org/zh/guide/modules.html<ExternalLinkIcon/></a></p>
</div></template>


