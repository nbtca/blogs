<template><div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>说明：本章内容是博主的Vue学习笔记，以<a href="https://cn.vuejs.org/v2/guide/" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>为准。</p>
</div>
<h1 id="mvvm模式" tabindex="-1"><a class="header-anchor" href="#mvvm模式" aria-hidden="true">#</a> MVVM模式</h1>
<p>MVVM模式，<code v-pre>M</code>即 model，数据模型；<code v-pre>V</code>即 view，视图；<code v-pre>VM</code>即 view-model，视图模型。</p>
<!-- more -->
<p><img src="https://jsd.cdn.zzko.cn/gh/xugaoyi/image_store/blog/20200204123438.png" alt=""></p>
<p><strong>理解</strong></p>
<p>首先，数据Model通过Data Bindings把数据绑定在View视图上，</p>
<p>当View视图有交互（有改变）的时候，Dom listeners会自动监听，然后更新数据Model。</p>
<p><strong>Q：什么是MVVM模式？</strong></p>
<p>A：MVVM模式，第一个M代表数据模型，V代表视图，VM代表视图模型；
它的实际操作原理是：后台数据通过视图模型来渲染视图，就是页面。当用户在页面上进行操作的时候，
视图模型会自动监听到用户的操作，从而改变后台数据。</p>
</div></template>


