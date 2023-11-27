<template><div><h1 id="_04-hook规则" tabindex="-1"><a class="header-anchor" href="#_04-hook规则" aria-hidden="true">#</a> 04. Hook规则</h1>
<p>Hook 本质就是 JavaScript 函数，但是在使用它时需要遵循<strong>两条规则</strong>。我们提供了一个 <a href="https://www.npmjs.com/package/eslint-plugin-react-hooks" target="_blank" rel="noopener noreferrer">linter 插件<ExternalLinkIcon/></a>来强制执行这些规则：</p>
<h2 id="只在最顶层使用-hook" tabindex="-1"><a class="header-anchor" href="#只在最顶层使用-hook" aria-hidden="true">#</a> 只在最顶层使用 Hook</h2>
<p>不要在循环，条件或嵌套函数中调用 Hook， 确保<strong>总是在你的 React 函数的最顶层以及任何 return 之前调用他们</strong>。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<ol>
<li>
<p>React 怎么知道哪个 state 对应哪个 <code v-pre>useState</code>？答案是 React 靠的是 Hook 调用的顺序</p>
</li>
<li>
<p>如果我们想要有条件地执行一个 effect，可以将判断放到 Hook 的<em>内部</em>：</p>
</li>
</ol>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code>  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">persistForm</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 👍 将条件判断放置在 effect 中</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>name <span class="token operator">!==</span> <span class="token string">''</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'formData'</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<h2 id="只在-react-函数中调用-hook" tabindex="-1"><a class="header-anchor" href="#只在-react-函数中调用-hook" aria-hidden="true">#</a> 只在 React 函数中调用 Hook</h2>
<p>**不要在普通的 JavaScript 函数中调用 Hook。**你可以：</p>
<ul>
<li>✅ 在 React 的函数组件中调用 Hook</li>
<li>✅ 在自定义 Hook 中调用其他 Hook</li>
</ul>
<h2 id="eslint-插件" tabindex="-1"><a class="header-anchor" href="#eslint-插件" aria-hidden="true">#</a> ESLint 插件</h2>
<p>我们发布了一个名为 <a href="https://www.npmjs.com/package/eslint-plugin-react-hooks" target="_blank" rel="noopener noreferrer"><code v-pre>eslint-plugin-react-hooks</code><ExternalLinkIcon/></a> 的 ESLint 插件来强制执行这两条规则。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> eslint-plugin-react-hooks --save-dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 你的 ESLint 配置</span>
<span class="token punctuation">{</span>
  <span class="token string-property property">"plugins"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// ...</span>
    <span class="token string">"react-hooks"</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">"rules"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token string-property property">"react-hooks/rules-of-hooks"</span><span class="token operator">:</span> <span class="token string">"error"</span><span class="token punctuation">,</span> <span class="token comment">// 检查 Hook 的规则</span>
    <span class="token string-property property">"react-hooks/exhaustive-deps"</span><span class="token operator">:</span> <span class="token string">"warn"</span> <span class="token comment">// 检查 effect 的依赖</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


