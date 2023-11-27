<template><div><h1 id="v-if-vs-v-show" tabindex="-1"><a class="header-anchor" href="#v-if-vs-v-show" aria-hidden="true">#</a> v-if vs v-show</h1>
<p><a href="https://cn.vuejs.org/v2/guide/conditional.html#v-if-vs-v-show" target="_blank" rel="noopener noreferrer">API<ExternalLinkIcon/></a></p>
<p><code v-pre>v-if</code> 根据渲染条件决定是否把元素渲染到DOM页面，而<code v-pre>v-show</code>不管渲染条件是什么，都会把元素渲染到DOM页面，只是简单的切换CSS的显示隐藏。</p>
<!-- more -->
<p>如果需要非常频繁地切换，则使用 <code v-pre>v-show</code> 较好；如果在运行时条件很少改变，则使用 <code v-pre>v-if</code> 较好。</p>
</div></template>


