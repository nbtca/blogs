<template><div><h1 id="jest-安装和配置" tabindex="-1"><a class="header-anchor" href="#jest-安装和配置" aria-hidden="true">#</a> Jest 安装和配置</h1>
<h2 id="jest-安装" tabindex="-1"><a class="header-anchor" href="#jest-安装" aria-hidden="true">#</a> Jest 安装</h2>
<p>由于我们的项目是使用 <code v-pre>typescript-library-starter</code> 初始化的，已经内置了 Jest 的安装，但是安装的版本却不是最新的，我们可以对 <code v-pre>package.json</code> 中的相关依赖版本做修改，重新安装。</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"@types/jest"</span><span class="token operator">:</span> <span class="token string">"^24.0.13"</span><span class="token punctuation">,</span>
  <span class="token property">"jest"</span><span class="token operator">:</span> <span class="token string">"^24.8.0"</span><span class="token punctuation">,</span>
  <span class="token property">"jest-config"</span><span class="token operator">:</span> <span class="token string">"^24.8.0"</span><span class="token punctuation">,</span>
  <span class="token property">"ts-jest"</span><span class="token operator">:</span> <span class="token string">"^24.0.2"</span><span class="token punctuation">,</span>
  <span class="token property">"typescript"</span><span class="token operator">:</span> <span class="token string">"^3.4.5"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注意，这里都是目前最新的版本，未来如果有版本升级的话，可以自行更新到最新版本。</p>
</blockquote>
<p>更改版本后，在命令行再次执行 <code v-pre>npm install</code> 即可安装到相应版本。</p>
<h2 id="jest-配置" tabindex="-1"><a class="header-anchor" href="#jest-配置" aria-hidden="true">#</a> Jest 配置</h2>
<p>在 <code v-pre>package.json</code> 文件中有 <code v-pre>jest</code> 字段，对应 Jest 配置：</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token property">"jest"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">"transform"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">".(ts|tsx)"</span><span class="token operator">:</span> <span class="token string">"ts-jest"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"testEnvironment"</span><span class="token operator">:</span> <span class="token string">"jsdom"</span><span class="token punctuation">,</span>
  <span class="token property">"testRegex"</span><span class="token operator">:</span> <span class="token string">"/test/.*\\.(test|spec)\\.(ts)$"</span><span class="token punctuation">,</span>
  <span class="token property">"moduleFileExtensions"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">"ts"</span><span class="token punctuation">,</span>
    <span class="token string">"tsx"</span><span class="token punctuation">,</span>
    <span class="token string">"js"</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"coverageThreshold"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"global"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"branches"</span><span class="token operator">:</span> <span class="token number">90</span><span class="token punctuation">,</span>
      <span class="token property">"functions"</span><span class="token operator">:</span> <span class="token number">95</span><span class="token punctuation">,</span>
      <span class="token property">"lines"</span><span class="token operator">:</span> <span class="token number">95</span><span class="token punctuation">,</span>
      <span class="token property">"statements"</span><span class="token operator">:</span> <span class="token number">95</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"collectCoverageFrom"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">"src/*.{js,ts}"</span><span class="token punctuation">,</span>
    <span class="token string">"src/**/*.{js,ts}"</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"setupFilesAfterEnv"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">"&lt;rootDir>/test/boot.ts"</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们就分别来看这几个配置的含义。</p>
<ul>
<li><a href="https://jestjs.io/docs/en/configuration#transform-object-string-string" target="_blank" rel="noopener noreferrer">transform<ExternalLinkIcon/></a></li>
</ul>
<p>简单地说就是一种转换器配置，比如我们这里的</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token property">"transform"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">".(ts|tsx)"</span><span class="token operator">:</span> <span class="token string">"ts-jest"</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>表示的就是使用 <code v-pre>ts-jest</code> 工具把 <code v-pre>.ts</code> 和 <code v-pre>.tsx</code> 文件内容转换成 JavaScript，因为我们也是使用 TypeScript 编写测试代码，而 Node.js 是不能直接支持 TypeScript 的，所以需要配置转换器。</p>
<ul>
<li><a href="https://jestjs.io/docs/en/configuration#testenvironment-string" target="_blank" rel="noopener noreferrer">testEnvironment<ExternalLinkIcon/></a></li>
</ul>
<p>测试环境。</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token property">"testEnvironment"</span><span class="token operator">:</span> <span class="token string">"jsdom"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>表示它是一个类浏览器的测试环境，我们可以使用浏览器环境中的一些 API。</p>
<ul>
<li><a href="https://jestjs.io/docs/en/configuration#testregex-string-array-string" target="_blank" rel="noopener noreferrer">testRegex<ExternalLinkIcon/></a></li>
</ul>
<p>要测试文件的正则表达式。</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token property">"testRegex"</span><span class="token operator">:</span> <span class="token string">"/test/.*\\.(test|spec)\\.(ts)$"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>表示 <code v-pre>test</code> 目录下所有以 <code v-pre>.test.ts</code> 和 <code v-pre>.spec.ts</code> 的文件都需要跑测试。</p>
<ul>
<li><a href="https://jestjs.io/docs/en/configuration#modulefileextensions-array-string" target="_blank" rel="noopener noreferrer">moduleFileExtensions<ExternalLinkIcon/></a></li>
</ul>
<p>模块文件扩展名，当你去引入一个模块并没有指定扩展名的时候，它会依次尝试去添加这些扩展名去找你引入的模块文件。</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token property">"moduleFileExtensions"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
  <span class="token string">"ts"</span><span class="token punctuation">,</span>
  <span class="token string">"tsx"</span><span class="token punctuation">,</span>
  <span class="token string">"js"</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>表示优先找 <code v-pre>.ts</code> 的模块、然后是 <code v-pre>.tsx</code>，最后是 <code v-pre>.js</code>。</p>
<ul>
<li><a href="https://jestjs.io/docs/en/configuration#coveragethreshold-object" target="_blank" rel="noopener noreferrer">coverageThreshold<ExternalLinkIcon/></a></li>
</ul>
<p>测试覆盖率的阈值设定，当我们的测试覆盖率达不到阈值的时候，测试会失败。</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token property">"coverageThreshold"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">"global"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"branches"</span><span class="token operator">:</span> <span class="token number">90</span><span class="token punctuation">,</span>
    <span class="token property">"functions"</span><span class="token operator">:</span> <span class="token number">95</span><span class="token punctuation">,</span>
    <span class="token property">"lines"</span><span class="token operator">:</span> <span class="token number">95</span><span class="token punctuation">,</span>
    <span class="token property">"statements"</span><span class="token operator">:</span> <span class="token number">95</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>表示全局的代码分支覆盖率要达到 <code v-pre>90%</code>，方法覆盖率要达到 <code v-pre>95%</code>，代码行数覆盖率达到 <code v-pre>95%</code>，声明覆盖率达到 <code v-pre>95%</code>。</p>
<ul>
<li><a href="https://jestjs.io/docs/en/configuration#collectcoveragefrom-array" target="_blank" rel="noopener noreferrer">collectCoverageFrom<ExternalLinkIcon/></a></li>
</ul>
<p>收集指定文件的测试覆盖率(即使你没为这些文件编写测试)，它的值为 <a href="https://github.com/jonschlinkert/micromatch" target="_blank" rel="noopener noreferrer">glob patterns<ExternalLinkIcon/></a> 类型。</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token property">"collectCoverageFrom"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
  <span class="token string">"src/*.{js,ts}"</span><span class="token punctuation">,</span>
  <span class="token string">"src/**/*.{js,ts}"</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>表示收集 <code v-pre>src</code> 目录以及它的所有子目录中的 <code v-pre>js</code> 和 <code v-pre>ts</code> 文件的测试覆盖率。</p>
<ul>
<li><a href="https://jestjs.io/docs/en/configuration#setupfilesafterenv-array" target="_blank" rel="noopener noreferrer">setupFilesAfterEnv<ExternalLinkIcon/></a></li>
</ul>
<p>测试框架安装后立即执行的代码文件列表。</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token property">"setupFilesAfterEnv"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
  <span class="token string">"&lt;rootDir>/test/boot.ts"</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>表示每次跑具体测试代码之前会先运行 <code v-pre>&lt;rootDir&gt;/test/boot.ts</code> 中的代码，<code v-pre>&lt;rootDir&gt;</code> 表示当前项目的根目录。这个配置在之后的章节我们会具体介绍。</p>
<p>其他关于 Jest 的配置，感兴趣的同学可以去<a href="https://jestjs.io/docs/en/configuration" target="_blank" rel="noopener noreferrer">官网<ExternalLinkIcon/></a>做扩展学习。</p>
<p>至此，我们学习了 Jest 的安装和配置，下节课我们就开始编写 <code v-pre>ts-axios</code> 库的单元测试。</p>
</div></template>


