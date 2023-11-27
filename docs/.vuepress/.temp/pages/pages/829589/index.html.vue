<template><div><p>手写春联：<a href="https://cl.xugaoyi.com/" target="_blank" rel="noopener noreferrer">https://cl.xugaoyi.com/<ExternalLinkIcon/></a></p>
<h3 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h3>
<p>虎年春节快到了，首先祝大家新年快乐，轻松暴富。
最近在网上经常看到生成春联的文章，不过这些小demo要么功能简陋,要么UI特别‘程序员’，满足不了我挑剔的眼光。干脆我自己做一个吧，顺便简单体验一下vite+vue3。（因为页面相对简单，vue组件风格还是使用选项式api，重点还是想把产品快速做出来。）</p>
<!-- more -->
<p align="center"><img src="https://img-blog.csdnimg.cn/img_convert/185c88180b87ac7277072280a0c144ce.png" width="500" style="cursor: zoom-in;"></p>
<h3 id="产品构思" tabindex="-1"><a class="header-anchor" href="#产品构思" aria-hidden="true">#</a> 产品构思</h3>
<p>包含<code v-pre>手写春节</code>和<code v-pre>生成春联</code>两大功能：</p>
<ul>
<li>
<p><strong>手写春联</strong></p>
<ul>
<li>模拟用笔写字的字迹</li>
<li>选择画笔颜色</li>
<li>调整画笔大小</li>
<li>清空画布</li>
<li>撤回笔画</li>
<li>切换上、下联、横批、福字</li>
<li>随机切换对联提示</li>
<li>预览图片和下载</li>
<li>贴春联海报和下载</li>
</ul>
</li>
<li>
<p><strong>生成模式</strong></p>
<ul>
<li>选择画笔颜色</li>
<li>挑选生成的对联</li>
<li>输入对联</li>
<li>随机切换对联</li>
<li>贴春联海报和下载</li>
</ul>
</li>
<li>
<p><strong>其他</strong></p>
<ul>
<li>快速切换模式按钮</li>
<li>可控制的背景音乐</li>
<li>微信分享网页</li>
</ul>
</li>
</ul>
<h3 id="设计" tabindex="-1"><a class="header-anchor" href="#设计" aria-hidden="true">#</a> 设计</h3>
<p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/392f2036c0ce4c97b8562e6f17606491~tplv-k3u1fbpfcp-watermark.image?" alt="222.jpg"></p>
<h3 id="开发" tabindex="-1"><a class="header-anchor" href="#开发" aria-hidden="true">#</a> 开发</h3>
<ul>
<li><strong>技术栈</strong>
<ul>
<li>vite (打包&amp;构建)</li>
<li>vue3 (页面开发)</li>
<li>vant（ui）</li>
<li>sass (css)</li>
<li><a href="https://github.com/linjc/smooth-signature" target="_blank" rel="noopener noreferrer">smooth-signature.js (带笔锋手写库)<ExternalLinkIcon/></a></li>
</ul>
</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
  <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"wrap"</span> <span class="token operator">:</span><span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"'mode-' + mode"</span> @touchstart<span class="token operator">=</span><span class="token string">"handleTouchstart"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 切换模式按钮 <span class="token operator">--</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"toggle-mode-btn"</span> @click<span class="token operator">=</span><span class="token string">"toggleMode"</span><span class="token operator">></span>
      <span class="token punctuation">{</span><span class="token punctuation">{</span> mode <span class="token operator">===</span> <span class="token number">1</span> <span class="token operator">?</span> <span class="token string">'手写'</span> <span class="token operator">:</span> <span class="token string">'生成'</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token operator">&lt;</span>i <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"iconfont icon-qiehuan"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>i<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 工具栏 <span class="token operator">--</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>div
      <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"actions"</span>
      <span class="token operator">:</span>style<span class="token operator">=</span><span class="token string">"{ borderTopRightRadius: colorListVisibility ? '0' : '5px' }"</span>
    <span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 手写模式显示 <span class="token operator">--</span><span class="token operator">></span>
      <span class="token operator">&lt;</span>template v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">"mode === 1"</span><span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 调色板 <span class="token operator">--</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"palette btn-block"</span><span class="token operator">></span>
          <span class="token operator">&lt;</span>div
            <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"cur-color"</span>
            @click<span class="token operator">=</span><span class="token string">"togglePalette"</span>
            <span class="token operator">:</span>style<span class="token operator">=</span><span class="token string">"{ background: colorList[curColorIndex] }"</span>
          <span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
          <span class="token operator">&lt;</span>ul <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"colorList"</span> v<span class="token operator">-</span>show<span class="token operator">=</span><span class="token string">"colorListVisibility"</span><span class="token operator">></span>
            <span class="token operator">&lt;</span>li
              v<span class="token operator">-</span><span class="token keyword">for</span><span class="token operator">=</span><span class="token string">"(item, index) in colorList"</span>
              <span class="token operator">:</span>key<span class="token operator">=</span><span class="token string">"item"</span>
              <span class="token operator">:</span>style<span class="token operator">=</span><span class="token string">"{ background: item }"</span>
              @click<span class="token operator">=</span><span class="token string">"selectColor(index)"</span>
            <span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
          <span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

        <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 滑块 <span class="token operator">--</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"slider-box btn-block"</span><span class="token operator">></span>
          <span class="token operator">&lt;</span>van<span class="token operator">-</span>slider
            v<span class="token operator">-</span>model<span class="token operator">=</span><span class="token string">"progress"</span>
            vertical
            @change<span class="token operator">=</span><span class="token string">"changeProgress"</span>
            bar<span class="token operator">-</span>height<span class="token operator">=</span><span class="token string">"28"</span>
            active<span class="token operator">-</span>color<span class="token operator">=</span><span class="token string">"transparent"</span>
            <span class="token operator">:</span>min<span class="token operator">=</span><span class="token string">"50"</span>
            <span class="token operator">:</span>max<span class="token operator">=</span><span class="token string">"150"</span>
          <span class="token operator">></span>
            <span class="token operator">&lt;</span>template #button<span class="token operator">></span>
              <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"custom-button"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>
          <span class="token operator">&lt;</span><span class="token operator">/</span>van<span class="token operator">-</span>slider<span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

        <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 清空 <span class="token operator">--</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"btn"</span> @click<span class="token operator">=</span><span class="token string">"handleClear"</span><span class="token operator">></span>
          <span class="token operator">&lt;</span>i <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"iconfont icon-lajitong"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>i<span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

        <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 撤销 <span class="token operator">--</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"btn"</span> @click<span class="token operator">=</span><span class="token string">"handleUndo"</span><span class="token operator">></span>
          <span class="token operator">&lt;</span>i <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"iconfont icon-fanhui"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>i<span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

        <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"line"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

        <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 切换画布的按钮 <span class="token operator">--</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>div
          <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"btn"</span>
          <span class="token operator">:</span><span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"{ 'cur-active': curCanvasIndex === index }"</span>
          v<span class="token operator">-</span><span class="token keyword">for</span><span class="token operator">=</span><span class="token string">"(item, index) in canvasList"</span>
          <span class="token operator">:</span>key<span class="token operator">=</span><span class="token string">"item.name"</span>
          @click<span class="token operator">=</span><span class="token string">"changeCanvas(index)"</span>
        <span class="token operator">></span>
          <span class="token punctuation">{</span><span class="token punctuation">{</span> item<span class="token punctuation">.</span>name <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

        <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"line"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

        <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"btn prominent"</span> @click<span class="token operator">=</span><span class="token string">"handlePreview"</span><span class="token operator">></span>预览<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
        <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"btn prominent"</span> @click<span class="token operator">=</span><span class="token string">"openPosters"</span><span class="token operator">></span>贴联<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

      <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 生成模式显示 <span class="token operator">--</span><span class="token operator">></span>
      <span class="token operator">&lt;</span>template v<span class="token operator">-</span><span class="token keyword">else</span><span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 选颜色 <span class="token operator">--</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>div
          <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"color-list-quick"</span>
          <span class="token operator">:</span><span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"{ active: curColorIndex === index }"</span>
          v<span class="token operator">-</span><span class="token keyword">for</span><span class="token operator">=</span><span class="token string">"(item, index) in colorList"</span>
          <span class="token operator">:</span>key<span class="token operator">=</span><span class="token string">"item"</span>
          <span class="token operator">:</span>style<span class="token operator">=</span><span class="token string">"{ background: item }"</span>
          @click<span class="token operator">=</span><span class="token string">"selectColor(index)"</span>
        <span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
        <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"line"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
        <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"btn"</span> @click<span class="token operator">=</span><span class="token string">"showPickBox = true"</span><span class="token operator">></span>挑选<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
        <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"btn"</span> @click<span class="token operator">=</span><span class="token string">"showInputBox = true"</span><span class="token operator">></span>输入<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

        <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 挑选对联弹窗 <span class="token operator">--</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>van<span class="token operator">-</span>action<span class="token operator">-</span>sheet v<span class="token operator">-</span>model<span class="token operator">:</span>show<span class="token operator">=</span><span class="token string">"showPickBox"</span> title<span class="token operator">=</span><span class="token string">"请挑选对联"</span><span class="token operator">></span>
          <span class="token operator">&lt;</span>ul <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"duilian-list"</span><span class="token operator">></span>
            <span class="token operator">&lt;</span>li
              v<span class="token operator">-</span><span class="token keyword">for</span><span class="token operator">=</span><span class="token string">"(item, index) in duilianList"</span>
              <span class="token operator">:</span>key<span class="token operator">=</span><span class="token string">"index"</span>
              @click<span class="token operator">=</span><span class="token string">"handlePickDuilian(item)"</span>
            <span class="token operator">></span>
              <span class="token operator">&lt;</span>span<span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span> item<span class="token punctuation">.</span>shang <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>span
              <span class="token operator">></span>， <span class="token operator">&lt;</span>span<span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span> item<span class="token punctuation">.</span>xia <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>span
              <span class="token operator">></span>。
              <span class="token operator">&lt;</span>span<span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span> item<span class="token punctuation">.</span>heng <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>
          <span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>van<span class="token operator">-</span>action<span class="token operator">-</span>sheet<span class="token operator">></span>

        <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 输入对联弹窗 <span class="token operator">--</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>van<span class="token operator">-</span>action<span class="token operator">-</span>sheet v<span class="token operator">-</span>model<span class="token operator">:</span>show<span class="token operator">=</span><span class="token string">"showInputBox"</span> title<span class="token operator">=</span><span class="token string">"请输入对联"</span><span class="token operator">></span>
          <span class="token operator">&lt;</span>van<span class="token operator">-</span>form @submit<span class="token operator">=</span><span class="token string">"handleSubmitInput"</span><span class="token operator">></span>
            <span class="token operator">&lt;</span>van<span class="token operator">-</span>cell<span class="token operator">-</span>group inset<span class="token operator">></span>
              <span class="token operator">&lt;</span>van<span class="token operator">-</span>field
                v<span class="token operator">-</span>model<span class="token operator">=</span><span class="token string">"shanglian"</span>
                name<span class="token operator">=</span><span class="token string">"shang"</span>
                label<span class="token operator">=</span><span class="token string">"上联"</span>
                placeholder<span class="token operator">=</span><span class="token string">"上联"</span>
                <span class="token operator">:</span>rules<span class="token operator">=</span>"<span class="token punctuation">[</span>
                  <span class="token punctuation">{</span>
                    <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">'请输入7位汉字上联'</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">pattern</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^[\u4e00-\u9fa5]{7}$</span><span class="token regex-delimiter">/</span></span>
                  <span class="token punctuation">}</span>
                <span class="token punctuation">]</span>"
                clearable
              <span class="token operator">/</span><span class="token operator">></span>
              <span class="token operator">&lt;</span>van<span class="token operator">-</span>field
                v<span class="token operator">-</span>model<span class="token operator">=</span><span class="token string">"xialian"</span>
                name<span class="token operator">=</span><span class="token string">"xia"</span>
                label<span class="token operator">=</span><span class="token string">"下联"</span>
                placeholder<span class="token operator">=</span><span class="token string">"下联"</span>
                <span class="token operator">:</span>rules<span class="token operator">=</span>"<span class="token punctuation">[</span>
                  <span class="token punctuation">{</span>
                    <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">'请输入7位汉字下联'</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">pattern</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^[\u4e00-\u9fa5]{7}$</span><span class="token regex-delimiter">/</span></span>
                  <span class="token punctuation">}</span>
                <span class="token punctuation">]</span>"
                clearable
              <span class="token operator">/</span><span class="token operator">></span>
              <span class="token operator">&lt;</span>van<span class="token operator">-</span>field
                v<span class="token operator">-</span>model<span class="token operator">=</span><span class="token string">"hengpi"</span>
                name<span class="token operator">=</span><span class="token string">"heng"</span>
                label<span class="token operator">=</span><span class="token string">"横批"</span>
                placeholder<span class="token operator">=</span><span class="token string">"横批"</span>
                <span class="token operator">:</span>rules<span class="token operator">=</span>"<span class="token punctuation">[</span>
                  <span class="token punctuation">{</span>
                    <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">'请输入4位汉字横批'</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">pattern</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^[\u4e00-\u9fa5]{4}$</span><span class="token regex-delimiter">/</span></span>
                  <span class="token punctuation">}</span>
                <span class="token punctuation">]</span>"
                clearable
              <span class="token operator">/</span><span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>van<span class="token operator">-</span>cell<span class="token operator">-</span>group<span class="token operator">></span>
            <span class="token operator">&lt;</span>div style<span class="token operator">=</span><span class="token string">"margin: 16px"</span><span class="token operator">></span>
              <span class="token operator">&lt;</span>van<span class="token operator">-</span>button
                round
                block
                type<span class="token operator">=</span><span class="token string">"primary"</span>
                native<span class="token operator">-</span>type<span class="token operator">=</span><span class="token string">"submit"</span>
                color<span class="token operator">=</span><span class="token string">"linear-gradient(to right, #ff6034, #c33825)"</span>
              <span class="token operator">></span>
                完成
              <span class="token operator">&lt;</span><span class="token operator">/</span>van<span class="token operator">-</span>button<span class="token operator">></span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
          <span class="token operator">&lt;</span><span class="token operator">/</span>van<span class="token operator">-</span>form<span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>van<span class="token operator">-</span>action<span class="token operator">-</span>sheet<span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 模式<span class="token number">1</span><span class="token operator">-</span>春联画布 <span class="token operator">--</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>div
      v<span class="token operator">-</span>show<span class="token operator">=</span><span class="token string">"mode === 1"</span>
      v<span class="token operator">-</span><span class="token keyword">for</span><span class="token operator">=</span><span class="token string">"(item, index) in canvasList"</span>
      <span class="token operator">:</span>key<span class="token operator">=</span><span class="token string">"item.name"</span>
    <span class="token operator">></span>
      <span class="token operator">&lt;</span>canvas
        <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"canvas"</span>
        <span class="token operator">:</span><span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"item.className"</span>
        v<span class="token operator">-</span>show<span class="token operator">=</span><span class="token string">"curCanvasIndex === index"</span>
        <span class="token operator">:</span>style<span class="token operator">=</span>"<span class="token punctuation">{</span>
          <span class="token literal-property property">marginTop</span><span class="token operator">:</span>
            item<span class="token punctuation">.</span>height <span class="token operator">&lt;</span> clientHeight
              <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token punctuation">(</span>clientHeight <span class="token operator">-</span> item<span class="token punctuation">.</span>height<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px</span><span class="token template-punctuation string">`</span></span>
              <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
          <span class="token literal-property property">marginLeft</span><span class="token operator">:</span>
            item<span class="token punctuation">.</span>width <span class="token operator">&lt;</span> clientWidth <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token punctuation">(</span>clientWidth <span class="token operator">-</span> item<span class="token punctuation">.</span>width<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px</span><span class="token template-punctuation string">`</span></span> <span class="token operator">:</span> <span class="token number">0</span>
        <span class="token punctuation">}</span>"
      <span class="token operator">/</span><span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 模式<span class="token number">2</span><span class="token operator">-</span>春联画布 <span class="token operator">--</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>div v<span class="token operator">-</span>show<span class="token operator">=</span><span class="token string">"mode === 2"</span> <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"canvas-mode-2"</span><span class="token operator">></span>
      <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"row"</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>canvas id<span class="token operator">=</span><span class="token string">"canvas-top"</span> <span class="token operator">:</span>width<span class="token operator">=</span><span class="token string">"200 * scale"</span> <span class="token operator">:</span>height<span class="token operator">=</span><span class="token string">"60 * scale"</span> <span class="token operator">/</span><span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
      <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"row"</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>canvas id<span class="token operator">=</span><span class="token string">"canvas-left"</span> <span class="token operator">:</span>width<span class="token operator">=</span><span class="token string">"60 * scale"</span> <span class="token operator">:</span>height<span class="token operator">=</span><span class="token string">"364 * scale"</span> <span class="token operator">/</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>canvas id<span class="token operator">=</span><span class="token string">"canvas-right"</span> <span class="token operator">:</span>width<span class="token operator">=</span><span class="token string">"60 * scale"</span> <span class="token operator">:</span>height<span class="token operator">=</span><span class="token string">"364 * scale"</span> <span class="token operator">/</span><span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 贴春联按钮 <span class="token operator">--</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>Button <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"btn-posters"</span> @click<span class="token operator">=</span><span class="token string">"openPosters"</span> <span class="token operator">/</span><span class="token operator">></span>

    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> footer<span class="token operator">-</span>当前对联提示 <span class="token operator">--</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>footer v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">"duilian.shang"</span><span class="token operator">></span>
      <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"refresh-btn"</span> @click<span class="token operator">=</span><span class="token string">"handleRefresh(true)"</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>i <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"iconfont icon-shuaxin"</span> <span class="token operator">:</span><span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"{ rotate: isRotate }"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>i<span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
      <span class="token operator">&lt;</span>dl <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"duilian"</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>dt<span class="token operator">></span>对联<span class="token operator">&lt;</span><span class="token operator">/</span>dt<span class="token operator">></span>
        <span class="token operator">&lt;</span>dd<span class="token operator">></span>
          <span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span> duilian<span class="token punctuation">.</span>shang <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
          <span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span> duilian<span class="token punctuation">.</span>xia <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>dd<span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>dl<span class="token operator">></span>
      <span class="token operator">&lt;</span>dl<span class="token operator">></span>
        <span class="token operator">&lt;</span>dt<span class="token operator">></span>横批<span class="token operator">&lt;</span><span class="token operator">/</span>dt<span class="token operator">></span>
        <span class="token operator">&lt;</span>dd<span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span> duilian<span class="token punctuation">.</span>heng <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>dd<span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>dl<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>footer<span class="token operator">></span>

    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 分享按钮 <span class="token operator">--</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"share-btn"</span> v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">"isShowShareBtn"</span> @click<span class="token operator">=</span><span class="token string">"isShowShareTip = true"</span><span class="token operator">></span>
      <span class="token operator">&lt;</span>i <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"iconfont icon-fenxiang"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>i<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 微信分享提示语 <span class="token operator">--</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>div
      <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"share-tip"</span>
      v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">"isShowShareTip"</span>
      @click<span class="token operator">=</span><span class="token string">"isShowShareTip = false"</span>
    <span class="token operator">></span>
      点击右上角把这个工具分享给朋友
      <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"hand"</span><span class="token operator">></span>👆<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 保存tip <span class="token operator">--</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>p v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">"isShowTip"</span> <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"download-tip"</span><span class="token operator">></span><span class="token operator">*</span>长按图片保存或转发<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>

    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 版权 <span class="token operator">--</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"copyright"</span><span class="token operator">></span>公众号「有趣研究社」 ©版权所有<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 载入图片元素，用于快速贴图使用<span class="token punctuation">,</span> 注意设置crossorigin<span class="token operator">=</span><span class="token string">"anonymous"</span>解决跨域 <span class="token operator">--</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>div v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">"isReadImages"</span><span class="token operator">></span>
      <span class="token operator">&lt;</span>img
        crossorigin<span class="token operator">=</span><span class="token string">"anonymous"</span>
        v<span class="token operator">-</span><span class="token keyword">for</span><span class="token operator">=</span><span class="token string">"(item, index) in bgList"</span>
        <span class="token operator">:</span>src<span class="token operator">=</span><span class="token string">"item"</span>
        <span class="token operator">:</span>key<span class="token operator">=</span><span class="token string">"item"</span>
        <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"hide-img"</span>
        <span class="token operator">:</span>id<span class="token operator">=</span><span class="token string">"`bg-img-` + index"</span>
      <span class="token operator">/</span><span class="token operator">></span>
      <span class="token operator">&lt;</span>img
        crossorigin<span class="token operator">=</span><span class="token string">"anonymous"</span>
        <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"hide-img"</span>
        id<span class="token operator">=</span><span class="token string">"qrcode"</span>
        src<span class="token operator">=</span><span class="token string">"https://jsd.cdn.zzko.cn/gh/xugaoyi/image_store2@master/img/qrcode.zul0pldsuao.png"</span>
      <span class="token operator">/</span><span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 背景音乐 <span class="token operator">--</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>audio
      src<span class="token operator">=</span><span class="token string">"https://jsd.cdn.zzko.cn/gh/xugaoyi/image_store2@master/cjxq.mp3"</span>
      id<span class="token operator">=</span><span class="token string">"bgm"</span>
      ref<span class="token operator">=</span><span class="token string">"bgm"</span>
      loop
    <span class="token operator">/</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>div
      <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"play-btn"</span>
      <span class="token operator">:</span><span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"{ paused: !isPlay }"</span>
      ref<span class="token operator">=</span><span class="token string">"playBtn"</span>
      @click<span class="token operator">=</span><span class="token string">"handlePlay"</span>
    <span class="token operator">></span>
      <span class="token operator">&lt;</span>i <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"iconfont icon-yinle"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>i<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

  <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"body-bg-img"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ImagePreview<span class="token punctuation">,</span> Notify <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vant'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> isWX<span class="token punctuation">,</span> isMobile <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@/utils'</span>
<span class="token keyword">import</span> Button <span class="token keyword">from</span> <span class="token string">'@/components/Button.vue'</span>
<span class="token keyword">import</span> dl <span class="token keyword">from</span> <span class="token string">'@/assets/img/yh/dl.jpeg'</span>
<span class="token keyword">import</span> hp <span class="token keyword">from</span> <span class="token string">'@/assets/img/yh/hp.jpeg'</span>
<span class="token keyword">import</span> fz <span class="token keyword">from</span> <span class="token string">'@/assets/img/yh/fz.png'</span>

<span class="token comment">// 对联数据</span>
<span class="token keyword">import</span> duilianList <span class="token keyword">from</span> <span class="token string">'@/mock/duilian'</span>

<span class="token keyword">const</span> <span class="token constant">PROPORTION</span> <span class="token operator">=</span> <span class="token number">0.37</span> <span class="token comment">// 图片缩小比例</span>
<span class="token keyword">const</span> <span class="token constant">INSTANTIATE_NAME</span> <span class="token operator">=</span> <span class="token string">'signature'</span> <span class="token comment">// 实例名称</span>
<span class="token keyword">const</span> <span class="token constant">MIN_WIDTH</span> <span class="token operator">=</span> <span class="token number">3</span> <span class="token comment">// 画笔最小宽</span>
<span class="token keyword">const</span> <span class="token constant">MAX_WIDTH</span> <span class="token operator">=</span> <span class="token number">12</span> <span class="token comment">// 画笔最大宽</span>

<span class="token comment">// 海报背景图大小</span>
<span class="token keyword">const</span> <span class="token constant">BG_WIDTH</span> <span class="token operator">=</span> <span class="token number">750</span>
<span class="token keyword">const</span> <span class="token constant">BG_HEIGHT</span> <span class="token operator">=</span> <span class="token number">1448</span>

<span class="token comment">// 贴图定位和大小</span>
<span class="token keyword">const</span> <span class="token constant">POSITION</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token number">57</span><span class="token punctuation">,</span> <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">510</span><span class="token punctuation">,</span> <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">546</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 上联</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token number">600</span><span class="token punctuation">,</span> <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">510</span><span class="token punctuation">,</span> <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">546</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 下联</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token number">225</span><span class="token punctuation">,</span> <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">345</span><span class="token punctuation">,</span> <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">300</span><span class="token punctuation">,</span> <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">90</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 横幅</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token number">460</span><span class="token punctuation">,</span> <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">450</span><span class="token punctuation">,</span> <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">130</span><span class="token punctuation">,</span> <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">130</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 福字</span>
<span class="token punctuation">]</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"Home"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    Button
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      duilianList<span class="token punctuation">,</span>
      <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token function">Number</span><span class="token punctuation">(</span>localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'mode'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">// 1 手写，2 生成</span>
      <span class="token literal-property property">curCanvasIndex</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// 显示哪个画布</span>
      <span class="token literal-property property">progress</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token comment">// 画笔大小的刻度</span>
      <span class="token literal-property property">clientWidth</span><span class="token operator">:</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientWidth<span class="token punctuation">,</span>
      <span class="token literal-property property">clientHeight</span><span class="token operator">:</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientHeight<span class="token punctuation">,</span>
      <span class="token literal-property property">canvasList</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'上联'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">className</span><span class="token operator">:</span> <span class="token string">'canvas-a'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">bgImage</span><span class="token operator">:</span> dl<span class="token punctuation">,</span>
          <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">600</span> <span class="token operator">*</span> <span class="token constant">PROPORTION</span><span class="token punctuation">,</span>
          <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">3640</span> <span class="token operator">*</span> <span class="token constant">PROPORTION</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'下联'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">className</span><span class="token operator">:</span> <span class="token string">'canvas-b'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">bgImage</span><span class="token operator">:</span> dl<span class="token punctuation">,</span>
          <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">600</span> <span class="token operator">*</span> <span class="token constant">PROPORTION</span><span class="token punctuation">,</span>
          <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">3640</span> <span class="token operator">*</span> <span class="token constant">PROPORTION</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'横批'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">className</span><span class="token operator">:</span> <span class="token string">'canvas-c'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">bgImage</span><span class="token operator">:</span> hp<span class="token punctuation">,</span>
          <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">2000</span> <span class="token operator">*</span> <span class="token constant">PROPORTION</span><span class="token punctuation">,</span>
          <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">600</span> <span class="token operator">*</span> <span class="token constant">PROPORTION</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'福字'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">className</span><span class="token operator">:</span> <span class="token string">'canvas-d'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">bgImage</span><span class="token operator">:</span> fz<span class="token punctuation">,</span>
          <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">366</span><span class="token punctuation">,</span>
          <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">366</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">colorList</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'#000000'</span><span class="token punctuation">,</span> <span class="token string">'#ffd800'</span><span class="token punctuation">,</span> <span class="token string">'#e8bd48'</span><span class="token punctuation">,</span> <span class="token string">'#ddc08c'</span><span class="token punctuation">,</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">curColorIndex</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token literal-property property">colorListVisibility</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 画布颜色选择列表可见性</span>
      <span class="token literal-property property">isShowTip</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 是否显示底部提示语</span>
      <span class="token literal-property property">duilian</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 当前对联文本对象</span>
      <span class="token literal-property property">isRotate</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 刷新icon旋转</span>
      <span class="token literal-property property">bgList</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">'https://jsd.cdn.zzko.cn/gh/xugaoyi/image_store@master/1.4j8qpdnq80i0.jpeg'</span><span class="token punctuation">,</span>
        <span class="token string">'https://jsd.cdn.zzko.cn/gh/xugaoyi/image_store@master/4.4460an8ag5o0.jpeg'</span><span class="token punctuation">,</span>
        <span class="token string">'https://jsd.cdn.zzko.cn/gh/xugaoyi/image_store@master/5.3axtl4xpvy00.jpeg'</span><span class="token punctuation">,</span>
        <span class="token string">'https://jsd.cdn.zzko.cn/gh/xugaoyi/image_store@master/6.2lnbphdqjaq0.jpeg'</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">isReadImages</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 延迟加载图片用</span>
      <span class="token literal-property property">isShowShareBtn</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 是否显示分享按钮</span>
      <span class="token literal-property property">isShowShareTip</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 是否显示分享提示语</span>
      <span class="token literal-property property">isPlay</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 是否在播放</span>

      <span class="token comment">// 模式2</span>
      <span class="token literal-property property">canvasTop</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// 横批</span>
      <span class="token literal-property property">canvasLeft</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// 上联</span>
      <span class="token literal-property property">canvasRight</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// 下联</span>
      <span class="token literal-property property">imgObj1</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// 横批图片对象</span>
      <span class="token literal-property property">imgObj2</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// 上下联图片对象</span>
      <span class="token literal-property property">scale</span><span class="token operator">:</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>devicePixelRatio <span class="token operator">||</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 用于增加画布清晰度</span>
      <span class="token literal-property property">showPickBox</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 挑选对联的弹框</span>
      <span class="token literal-property property">showInputBox</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 输入对联的弹框</span>
      <span class="token literal-property property">shanglian</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span> <span class="token comment">// 输入的上联</span>
      <span class="token literal-property property">xialian</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span> <span class="token comment">// 输入的下联</span>
      <span class="token literal-property property">hengpi</span><span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span> <span class="token comment">// 输入的横批</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 模式1-当前画布实例</span>
    <span class="token function">curCanvasInstantiate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">[</span><span class="token constant">INSTANTIATE_NAME</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>curCanvasIndex<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 微信浏览器显示分享按钮</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>isShowShareBtn <span class="token operator">=</span> <span class="token function">isWX</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isMobile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">Notify</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'warning'</span><span class="token punctuation">,</span> <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">'请用移动端打开获得最佳体验'</span><span class="token punctuation">,</span> <span class="token literal-property property">duration</span><span class="token operator">:</span> <span class="token number">6000</span><span class="token punctuation">,</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">initMode1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 初始化对联提示</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">initMode2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 按钮添加激活时发光效果class</span>
    <span class="token keyword">const</span> btnEl <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">'.btn,.btn-block'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    btnEl<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      item<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'touchstart'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        item<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">'btn-active'</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      item<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'touchend'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          item<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">'btn-active'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 延迟加载贴图背景</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>isReadImages <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 切换画笔颜色</span>
    <span class="token function">curColorIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>curCanvasInstantiate<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>colorList<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>curColorIndex<span class="token punctuation">]</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>mode <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">refreshDuilian</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 切换画布时应用当前画笔颜色和大小</span>
    <span class="token function">curCanvasIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>curCanvasInstantiate<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>colorList<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>curColorIndex<span class="token punctuation">]</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleChangeSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      window<span class="token punctuation">.</span><span class="token function">scrollTo</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">initMode1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> colorList<span class="token punctuation">,</span> curColorIndex <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>canvasList<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">width</span><span class="token operator">:</span> item<span class="token punctuation">.</span>width<span class="token punctuation">,</span>
          <span class="token literal-property property">height</span><span class="token operator">:</span> item<span class="token punctuation">.</span>height<span class="token punctuation">,</span>
          <span class="token literal-property property">minWidth</span><span class="token operator">:</span> <span class="token constant">MIN_WIDTH</span><span class="token punctuation">,</span> <span class="token comment">// 画笔最小宽度(px)</span>
          <span class="token literal-property property">maxWidth</span><span class="token operator">:</span> <span class="token constant">MAX_WIDTH</span><span class="token punctuation">,</span> <span class="token comment">// 画笔最大宽度</span>
          <span class="token literal-property property">minSpeed</span><span class="token operator">:</span> <span class="token number">1.8</span><span class="token punctuation">,</span> <span class="token comment">// 画笔达到最小宽度所需最小速度(px/ms)，取值范围1.0-10.0</span>
          <span class="token literal-property property">color</span><span class="token operator">:</span> colorList<span class="token punctuation">[</span>curColorIndex<span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token comment">// 新增的配置</span>
          <span class="token literal-property property">bgImage</span><span class="token operator">:</span> item<span class="token punctuation">.</span>bgImage<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token keyword">this</span><span class="token punctuation">[</span><span class="token constant">INSTANTIATE_NAME</span> <span class="token operator">+</span> index<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SmoothSignature</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.'</span> <span class="token operator">+</span> item<span class="token punctuation">.</span>className<span class="token punctuation">)</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token function">initMode2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>canvasTop <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'canvas-top'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">'2d'</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>canvasLeft <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'canvas-left'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">'2d'</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>canvasRight <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'canvas-right'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">'2d'</span><span class="token punctuation">)</span>

      <span class="token comment">// 设字体样式</span>
      <span class="token keyword">const</span> font <span class="token operator">=</span> <span class="token string">"36px xs, cursive"</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>canvasTop<span class="token punctuation">.</span>font <span class="token operator">=</span> font
      <span class="token keyword">this</span><span class="token punctuation">.</span>canvasLeft<span class="token punctuation">.</span>font <span class="token operator">=</span> font
      <span class="token keyword">this</span><span class="token punctuation">.</span>canvasRight<span class="token punctuation">.</span>font <span class="token operator">=</span> font

      <span class="token comment">// 增强清晰度</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> scale <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>canvasTop<span class="token punctuation">.</span><span class="token function">scale</span><span class="token punctuation">(</span>scale<span class="token punctuation">,</span> scale<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>canvasLeft<span class="token punctuation">.</span><span class="token function">scale</span><span class="token punctuation">(</span>scale<span class="token punctuation">,</span> scale<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>canvasRight<span class="token punctuation">.</span><span class="token function">scale</span><span class="token punctuation">(</span>scale<span class="token punctuation">,</span> scale<span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token comment">// 设背景图</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>imgObj1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>imgObj2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>imgObj1<span class="token punctuation">.</span>src <span class="token operator">=</span> hp
      <span class="token keyword">this</span><span class="token punctuation">.</span>imgObj2<span class="token punctuation">.</span>src <span class="token operator">=</span> dl
      <span class="token keyword">this</span><span class="token punctuation">.</span>imgObj1<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 贴背景</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>canvasTop<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>imgObj1<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">)</span>

        <span class="token comment">// 字体加载完成后</span>
        document<span class="token punctuation">.</span>fonts<span class="token punctuation">.</span>ready<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleTopFillText</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>imgObj2<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 贴背景</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>canvasLeft<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>imgObj2<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">364</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>canvasRight<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>imgObj2<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">364</span><span class="token punctuation">)</span>

        <span class="token comment">// 字体加载完成后</span>
        document<span class="token punctuation">.</span>fonts<span class="token punctuation">.</span>ready<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleLRFillText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>canvasLeft<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>duilian<span class="token punctuation">.</span>shang<span class="token punctuation">)</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleLRFillText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>canvasRight<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>duilian<span class="token punctuation">.</span>xia<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 模式2-刷新对联</span>
    <span class="token function">refreshDuilian</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>canvasTop<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>imgObj1<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>canvasLeft<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>imgObj2<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">364</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>canvasRight<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>imgObj2<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">364</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleTopFillText</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleLRFillText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>canvasLeft<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>duilian<span class="token punctuation">.</span>shang<span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleLRFillText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>canvasRight<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>duilian<span class="token punctuation">.</span>xia<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 模式2-贴横批</span>
    <span class="token function">handleTopFillText</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 贴文本</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>canvasTop<span class="token punctuation">.</span>fillStyle <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>colorList<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>curColorIndex<span class="token punctuation">]</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>duilian<span class="token punctuation">.</span>heng<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>duilian<span class="token punctuation">.</span>heng<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> left <span class="token operator">=</span> <span class="token number">42</span> <span class="token operator">*</span> <span class="token punctuation">(</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">22</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>canvasTop<span class="token punctuation">.</span><span class="token function">fillText</span><span class="token punctuation">(</span>item<span class="token punctuation">,</span> left<span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 模式2-贴上下联</span>
    <span class="token function">handleLRFillText</span><span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span> text</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      ctx<span class="token punctuation">.</span>fillStyle <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>colorList<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>curColorIndex<span class="token punctuation">]</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>text<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        text<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> top <span class="token operator">=</span> <span class="token number">50</span> <span class="token operator">*</span> <span class="token punctuation">(</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">8</span>
          ctx<span class="token punctuation">.</span><span class="token function">fillText</span><span class="token punctuation">(</span>item<span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> top<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 切换模式</span>
    <span class="token function">toggleMode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>mode <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>mode <span class="token operator">=</span> <span class="token number">2</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">refreshDuilian</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>mode <span class="token operator">=</span> <span class="token number">1</span>
      <span class="token punctuation">}</span>
      localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'mode'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 打开调色板</span>
    <span class="token function">togglePalette</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>colorListVisibility <span class="token operator">=</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>colorListVisibility
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 关闭调色板</span>
    <span class="token function">handleTouchstart</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 不是点击选择颜色时</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>path<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">?.</span>classList<span class="token operator">?.</span>value <span class="token operator">!==</span> <span class="token string">'colorList'</span> <span class="token operator">&amp;&amp;</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>classList<span class="token operator">?.</span>value <span class="token operator">!==</span> <span class="token string">'cur-color'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>colorListVisibility <span class="token operator">=</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 选择颜色</span>
    <span class="token function">selectColor</span><span class="token punctuation">(</span><span class="token parameter">index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>curColorIndex <span class="token operator">=</span> index
      <span class="token keyword">this</span><span class="token punctuation">.</span>colorListVisibility <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 切换画布</span>
    <span class="token function">changeCanvas</span><span class="token punctuation">(</span><span class="token parameter">index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>curCanvasIndex <span class="token operator">=</span> index
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 清空画布</span>
    <span class="token function">handleClear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>curCanvasInstantiate<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 撤销笔画</span>
    <span class="token function">handleUndo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>curCanvasInstantiate<span class="token punctuation">.</span><span class="token function">undo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 预览</span>
    <span class="token function">handlePreview</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">showTopTip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>isShowTip <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token keyword">const</span> _this <span class="token operator">=</span> <span class="token keyword">this</span>
      <span class="token function">ImagePreview</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">images</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getImageList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token literal-property property">closeable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">startPosition</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>curCanvasIndex<span class="token punctuation">,</span>
        <span class="token function">onClose</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          _this<span class="token punctuation">.</span>isShowTip <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 打开海报预览</span>
    <span class="token function">openPosters</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 创建画布</span>
      <span class="token keyword">const</span> canvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'canvas'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      canvas<span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token constant">BG_WIDTH</span>
      canvas<span class="token punctuation">.</span>height <span class="token operator">=</span> <span class="token constant">BG_HEIGHT</span>
      <span class="token keyword">const</span> ctx <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">'2d'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> resultImageList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

      <span class="token comment">// 是否隐藏福字</span>
      <span class="token keyword">const</span> isHideFu <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">[</span><span class="token constant">INSTANTIATE_NAME</span> <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>bgList<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 贴背景图</span>
        ctx<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'bg-img-'</span> <span class="token operator">+</span> index<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token constant">BG_WIDTH</span><span class="token punctuation">,</span> <span class="token constant">BG_HEIGHT</span><span class="token punctuation">)</span>

        <span class="token comment">// 贴对联</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>mode <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>canvasList<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token number">3</span> <span class="token operator">&amp;&amp;</span> isHideFu<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token keyword">const</span> dlCanvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.'</span> <span class="token operator">+</span> item<span class="token punctuation">.</span>className<span class="token punctuation">)</span>
            <span class="token keyword">const</span> <span class="token punctuation">{</span> left<span class="token punctuation">,</span> top<span class="token punctuation">,</span> width<span class="token punctuation">,</span> height <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token constant">POSITION</span><span class="token punctuation">[</span>index<span class="token punctuation">]</span>
            ctx<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span>dlCanvas<span class="token punctuation">,</span> left<span class="token punctuation">,</span> top<span class="token punctuation">,</span> width<span class="token punctuation">,</span> height<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token punctuation">[</span><span class="token string">'canvas-left'</span><span class="token punctuation">,</span> <span class="token string">'canvas-right'</span><span class="token punctuation">,</span> <span class="token string">'canvas-top'</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> dlCanvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
            <span class="token keyword">const</span> <span class="token punctuation">{</span> left<span class="token punctuation">,</span> top<span class="token punctuation">,</span> width<span class="token punctuation">,</span> height <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token constant">POSITION</span><span class="token punctuation">[</span>index<span class="token punctuation">]</span>
            ctx<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span>dlCanvas<span class="token punctuation">,</span> left<span class="token punctuation">,</span> top<span class="token punctuation">,</span> width<span class="token punctuation">,</span> height<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 贴二维码</span>
        ctx<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"qrcode"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">,</span> <span class="token number">1280</span><span class="token punctuation">,</span> <span class="token number">580</span><span class="token punctuation">,</span> <span class="token number">136</span><span class="token punctuation">)</span>

        <span class="token comment">// 贴文本</span>
        ctx<span class="token punctuation">.</span>font <span class="token operator">=</span> <span class="token string">"18px sans-serif"</span>
        ctx<span class="token punctuation">.</span>fillStyle <span class="token operator">=</span> <span class="token string">"#666666"</span>
        ctx<span class="token punctuation">.</span><span class="token function">fillText</span><span class="token punctuation">(</span><span class="token string">'©公众号「有趣研究社」'</span><span class="token punctuation">,</span> <span class="token number">550</span><span class="token punctuation">,</span> <span class="token number">1420</span><span class="token punctuation">)</span>

        <span class="token comment">// 导出图片</span>
        resultImageList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>canvas<span class="token punctuation">.</span><span class="token function">toDataURL</span><span class="token punctuation">(</span><span class="token string">'image/jpeg'</span><span class="token punctuation">,</span> <span class="token number">0.8</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      <span class="token comment">// 打开图片预览</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>isShowTip <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token keyword">const</span> _this <span class="token operator">=</span> <span class="token keyword">this</span>
      <span class="token function">ImagePreview</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">images</span><span class="token operator">:</span> resultImageList<span class="token punctuation">,</span>
        <span class="token literal-property property">closeable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token function">onClose</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          _this<span class="token punctuation">.</span>isShowTip <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">showTopTip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 弹出顶部提示语</span>
    <span class="token function">showTopTip</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>sessionStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'showTip'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sessionStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'showTip'</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">Notify</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">'长按图片可保存到本地'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">'#c33825'</span><span class="token punctuation">,</span>
          <span class="token literal-property property">background</span><span class="token operator">:</span> <span class="token string">'#eed3ae'</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 获取对联图片列表</span>
    <span class="token function">getImageList</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token string">'image/png'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> imageList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>canvasList<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// `福`字必须是png格式</span>
          type <span class="token operator">=</span> <span class="token string">'image/png'</span>
        <span class="token punctuation">}</span>
        imageList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">[</span><span class="token constant">INSTANTIATE_NAME</span> <span class="token operator">+</span> index<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">toDataURL</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> <span class="token number">0.8</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> imageList
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 进度改变时</span>
    <span class="token function">changeProgress</span><span class="token punctuation">(</span><span class="token parameter">progress</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>progress <span class="token operator">=</span> progress
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleChangeSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 调整画笔大小</span>
    <span class="token function">handleChangeSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> progress <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>curCanvasInstantiate<span class="token punctuation">.</span>minWidth <span class="token operator">=</span> <span class="token constant">MIN_WIDTH</span> <span class="token operator">*</span> progress <span class="token operator">/</span> <span class="token number">100</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>curCanvasInstantiate<span class="token punctuation">.</span>maxWidth <span class="token operator">=</span> <span class="token constant">MAX_WIDTH</span> <span class="token operator">*</span> progress <span class="token operator">/</span> <span class="token number">100</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 刷新对联</span>
    <span class="token function">handleRefresh</span><span class="token punctuation">(</span><span class="token parameter">rotate</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>duilian <span class="token operator">=</span> duilianList<span class="token punctuation">[</span>Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> duilianList<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">]</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>rotate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>mode <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">refreshDuilian</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 使icon旋转</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>isRotate <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>isRotate <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 播放背景音乐</span>
    <span class="token function">handlePlay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> bgm <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$refs
      <span class="token keyword">if</span> <span class="token punctuation">(</span>bgm<span class="token punctuation">.</span>paused<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        bgm<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>isPlay <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        bgm<span class="token punctuation">.</span><span class="token function">pause</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>isPlay <span class="token operator">=</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 完成输入对联</span>
    <span class="token function">handleSubmitInput</span><span class="token punctuation">(</span><span class="token parameter">values</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>duilian <span class="token operator">=</span> values
      <span class="token keyword">this</span><span class="token punctuation">.</span>showInputBox <span class="token operator">=</span> <span class="token boolean">false</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">refreshDuilian</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 完成挑选对联</span>
    <span class="token function">handlePickDuilian</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>duilian <span class="token operator">=</span> item
      <span class="token keyword">this</span><span class="token punctuation">.</span>showPickBox <span class="token operator">=</span> <span class="token boolean">false</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">refreshDuilian</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更多有趣的小网页欢迎关注公众号<code v-pre>有趣研究社</code>:</p>
<blockquote>
<p><a href="https://cl.xugaoyi.com/" target="_blank" rel="noopener noreferrer">手写春联<ExternalLinkIcon/></a></br>
<a href="https://game.xugaoyi.com/" target="_blank" rel="noopener noreferrer">FC在线模拟器<ExternalLinkIcon/></a></br>
<a href="https://avatar.xugaoyi.com/" target="_blank" rel="noopener noreferrer">爱国头像生成器<ExternalLinkIcon/></a></br>
<a href="https://zfb.xugaoyi.com/" target="_blank" rel="noopener noreferrer">到账语音生成器<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


