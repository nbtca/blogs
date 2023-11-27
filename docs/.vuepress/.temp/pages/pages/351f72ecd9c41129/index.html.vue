<template><div><h1 id="计算属性-vs-方法-vs-侦听属性" tabindex="-1"><a class="header-anchor" href="#计算属性-vs-方法-vs-侦听属性" aria-hidden="true">#</a> 计算属性 vs 方法 vs 侦听属性</h1>
<p><a href="https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E7%BC%93%E5%AD%98-vs-%E6%96%B9%E6%B3%95" target="_blank" rel="noopener noreferrer">API<ExternalLinkIcon/></a></p>
<p>如果一个功能同时可以使用计算属性(computed)、方法(methods)、侦听属性(watch)来实现的时候推荐使用计算属性。</p>
<!-- more -->
<table>
<thead>
<tr>
<th>计算属性</th>
<th>方法</th>
<th>侦听属性</th>
</tr>
</thead>
<tbody>
<tr>
<td>计算属性是基于它们的响应式依赖进行缓存的</td>
<td>每当触发重新渲染时，调用方法将<strong>总会</strong>再次执行函数</td>
<td>有缓存，但相比计算属性，实现起来要复杂很多。</td>
</tr>
</tbody>
</table>
</div></template>


