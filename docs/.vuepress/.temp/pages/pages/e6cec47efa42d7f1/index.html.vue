<template><div><h1 id="vue父子组件的生命周期顺序" tabindex="-1"><a class="header-anchor" href="#vue父子组件的生命周期顺序" aria-hidden="true">#</a> vue父子组件的生命周期顺序</h1>
<h3 id="加载渲染过程" tabindex="-1"><a class="header-anchor" href="#加载渲染过程" aria-hidden="true">#</a> 加载渲染过程</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>父beforeCreate -> 父created-> 父beforeMount-> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>父组件会先执行到beforeMount，接着会执行子组件钩子到挂载结束，再挂载父组件。</p>
<h3 id="子组件更新过程" tabindex="-1"><a class="header-anchor" href="#子组件更新过程" aria-hidden="true">#</a> 子组件更新过程</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="父组件更新过程" tabindex="-1"><a class="header-anchor" href="#父组件更新过程" aria-hidden="true">#</a> 父组件更新过程</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>父beforeUpdate -> 父updated
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="销毁过程" tabindex="-1"><a class="header-anchor" href="#销毁过程" aria-hidden="true">#</a> 销毁过程</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


