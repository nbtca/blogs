<template><div><h1 id="引用-ts-axios-库" tabindex="-1"><a class="header-anchor" href="#引用-ts-axios-库" aria-hidden="true">#</a> 引用 ts-axios 库</h1>
<h2 id="在-ts-项目中引用" tabindex="-1"><a class="header-anchor" href="#在-ts-项目中引用" aria-hidden="true">#</a> 在 TS 项目中引用</h2>
<p>我们借助于 <a href="https://cli.vuejs.org/" target="_blank" rel="noopener noreferrer">vue-cli<ExternalLinkIcon/></a> 脚手架创建一个 TypeScript 的 Vue 项目，然后我们把 Vue 官网上一段使用 axios 发请求的 <a href="https://cn.vuejs.org/v2/guide/computed.html#%E4%BE%A6%E5%90%AC%E5%99%A8" target="_blank" rel="noopener noreferrer">demo<ExternalLinkIcon/></a> 代码抄过来。</p>
<p>我们需要先执行 <code v-pre>npm install ts-axios-new</code> 安装 <code v-pre>ts-axios</code> 库。</p>
<p><code v-pre>HelloWorld.vue</code></p>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hello<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
      Ask a yes/no question:
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>question<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>{{ answer }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">'vue'</span>
  <span class="token keyword">import</span> _ <span class="token keyword">from</span> <span class="token string">'lodash'</span>
  <span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">'ts-axios-new'</span>

  <span class="token keyword">export</span> <span class="token keyword">default</span> Vue<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'HelloWorld'</span><span class="token punctuation">,</span>
    <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">question</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
        <span class="token literal-property property">answer</span><span class="token operator">:</span> <span class="token string">'I cannot give you an answer until you ask a question!'</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>debouncedGetAnswer <span class="token operator">=</span> _<span class="token punctuation">.</span><span class="token function">debounce</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>getAnswer<span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">debouncedGetAnswer</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// do nothing</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">getAnswer</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>question<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'?'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>answer <span class="token operator">=</span> <span class="token string">'Questions usually contain a question mark. -)'</span>
          <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>answer <span class="token operator">=</span> <span class="token string">'Thinking...'</span>
        <span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        instance<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          config<span class="token punctuation">.</span>params <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">_t</span><span class="token operator">:</span> <span class="token operator">+</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">return</span> config
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        instance<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'https://yesno.wtf/api'</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>answer <span class="token operator">=</span> _<span class="token punctuation">.</span><span class="token function">capitalize</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>data<span class="token punctuation">.</span>answer<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>answer <span class="token operator">=</span> <span class="token string">'Error! Could not reach the API. '</span> <span class="token operator">+</span> error
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">question</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">newQuestion</span><span class="token operator">:</span> string<span class="token punctuation">,</span> <span class="token literal-property property">oldQuestion</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>answer <span class="token operator">=</span> <span class="token string">'Waiting for you to stop typing...'</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">debouncedGetAnswer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- Add "scoped" attribute to limit CSS to this component only --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">h3</span> <span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 40px 0 0<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">ul</span> <span class="token punctuation">{</span>
    <span class="token property">list-style-type</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">li</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 0 10px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">a</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #42b983<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码主要是提供了一个 <code v-pre>input</code> 输入框，绑定了 <code v-pre>question</code> 变量，当我们输入的时候，会触发 <code v-pre>question</code> 的变化，执行 <code v-pre>watch question</code> 中的逻辑，执行 <code v-pre>this.debouncedGetAnswer</code> 方法，实际上就是 <code v-pre>debounce</code> 执行了 <code v-pre>getAnswer</code> 方法，发送请求。</p>
<p>我们通过 <code v-pre>import axios from 'ts-axios-new' </code> 去加载 <code v-pre>ts-axios</code> 库，实际上就是引入了 <code v-pre>node_modules/ts-axios-new/dist/axios.es5.js</code>，因为 <code v-pre>ts-axios-new</code> 的 <code v-pre>package.json</code> 文件中配置的 <code v-pre>module</code> 字段是 <code v-pre>dist/axios.es5.js</code>，在 <code v-pre>webpack</code> 中优先 <code v-pre>import</code> 优先会找 <code v-pre>module</code> 字段，其次是 <code v-pre>main</code> 字段。</p>
<blockquote>
<p>小技巧：当我们引入某个库运行时出现问题时候，我们就可以调试 node_modules 中对应引入的代码。</p>
</blockquote>
<p>注意我们这里先使用了 <code v-pre>axios.create()</code> 方法创建了一个 <code v-pre>instance</code>，然后添加了一个请求拦截器，会在每次发送请求前，添加了一个 <code v-pre>_t</code> 参数，值为时间戳。然后执行 <code v-pre>instance.get</code> 发送一个请求。</p>
<p>我们可以看到整个 demo 是可以正常运行的，并且没有任何类型相关的问题，说明我们的库打包后的代码和类型声明文件都是没有问题的。</p>
<h2 id="在-js-项目中引用" tabindex="-1"><a class="header-anchor" href="#在-js-项目中引用" aria-hidden="true">#</a> 在 JS 项目中引用</h2>
<p>我们编写的 TS 库仍然可以被纯 JS 的项目引用，这次我们来修改<a href="https://coding.imooc.com/class/74.html" target="_blank" rel="noopener noreferrer">《Vue.js2.5+cube-ui重构饿了么App》<ExternalLinkIcon/></a>课程的代码，把之前对 <code v-pre>axios</code> 的引用改成对 <code v-pre>ts-axios-new</code> 的引用。课程源码是开源的，所以没购买课程的小伙伴也可以去 <a href="https://github.com/ustbhuangyi/vue-sell" target="_blank" rel="noopener noreferrer">GitHub<ExternalLinkIcon/></a> 下载。</p>
<p>我们需要先执行 <code v-pre>npm install ts-axios-new</code> 安装 <code v-pre>ts-axios</code> 库，然后修改代码。</p>
<p><code v-pre>api/helpers.js</code>：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">'ts-axios-new'</span>

<span class="token keyword">const</span> urlMap <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">development</span><span class="token operator">:</span> <span class="token string">'/'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">production</span><span class="token operator">:</span> <span class="token string">'http://ustbhuangyi.com/sell/'</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> baseUrl <span class="token operator">=</span> urlMap<span class="token punctuation">[</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span><span class="token punctuation">]</span>
<span class="token keyword">const</span> <span class="token constant">ERR_OK</span> <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">params <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>baseUrl <span class="token operator">+</span> url<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      params
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span>errno<span class="token punctuation">,</span> data<span class="token punctuation">}</span> <span class="token operator">=</span> res<span class="token punctuation">.</span>data
      <span class="token keyword">if</span> <span class="token punctuation">(</span>errno <span class="token operator">===</span> <span class="token constant">ERR_OK</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> data
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只需要把 <code v-pre>import axios from 'axios'</code> 修改为 <code v-pre>import axios from 'ts-axios-new'</code> 即可。</p>
<p>接着运行项目，我们发现项目可以成功运行，因为我们实现了<code v-pre>axios</code> 在浏览器端的所有功能，所以可以放心的做替换。</p>
<p>至此，我们就完成了 <code v-pre>ts-axios</code> 库的开发、测试、编译、发布和引用。课程到这里也就告一段落了，下一章我们会对整个课程做总结与展望。</p>
</div></template>


