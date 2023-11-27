<template><div><h1 id="npm-package-json属性详解" tabindex="-1"><a class="header-anchor" href="#npm-package-json属性详解" aria-hidden="true">#</a> npm package.json属性详解</h1>
<blockquote>
<p>本文转自<a href="https://www.cnblogs.com/tzyy/p/5193811.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/tzyy/p/5193811.html<ExternalLinkIcon/></a>，作者：TZYY</p>
</blockquote>
<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p><code v-pre>package.json</code>必须是一个严格的json文件，而不仅仅是js里边的一个对象。其中很多属性可以通过<code v-pre>npm-config</code>来生成</p>
<!-- more -->
<h2 id="name" tabindex="-1"><a class="header-anchor" href="#name" aria-hidden="true">#</a> name</h2>
<p><code v-pre>package.json</code>中最重要的属性是<code v-pre>name</code>和<code v-pre>version</code>两个属性，这两个属性是必须要有的，否则模块就无法被安装，这两个属性一起形成了一个npm模块的唯一标识符。模块中内容变更的同时，模块版本也应该一起变化。
<code v-pre>name</code>属性就是你的模块名称，下面是一些命名规则:</p>
<ul>
<li>
<p><code v-pre>name</code>必须小于等于214个字节，包括前缀名称在内（如 xxx/xxxmodule）。</p>
</li>
<li>
<p><code v-pre>name</code>不能以&quot;_&quot;或&quot;.&quot;开头</p>
</li>
<li>
<p>不能含有大写字母</p>
</li>
<li>
<p><code v-pre>name</code>会成为url的一部分，不能含有url非法字符</p>
<p>下面是官网文档的一些建议：</p>
</li>
<li>
<p>不要使用和node核心模块一样的名称</p>
</li>
<li>
<p><code v-pre>name</code>中不要含有&quot;js&quot;和&quot;node&quot;。 It's assumed that it's js, since you're writing a package.json file, and you can specify the engine using the &quot;engines&quot; field. (See below.)</p>
</li>
<li>
<p><code v-pre>name</code>属性会成为模块url、命令行中的一个参数或者一个文件夹名称，任何非url安全的字符在name中都不能使用，也不能以&quot;_&quot;或&quot;.&quot;开头</p>
</li>
<li>
<p><code v-pre>name</code>属性也许会被写在<code v-pre>require()</code>的参数中，所以最好取个简短而语义化的值。</p>
</li>
<li>
<p>创建一个模块前可以先到后边的网址查查<code v-pre>name</code>是否已经被占用. <a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer">https://www.npmjs.com/<ExternalLinkIcon/></a></p>
<ul>
<li>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 发布一个包的时候，需要检验某个包名是否存在</span>
<span class="token function">npm</span> search <span class="token operator">&lt;</span>ModuleName<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<p><code v-pre>name</code>属性可以有一些前缀如 e.g. @myorg/mypackage.在npm-scope(7)的文档中可以看到详细说明</p>
<h2 id="version" tabindex="-1"><a class="header-anchor" href="#version" aria-hidden="true">#</a> version</h2>
<p><code v-pre>version</code>必须可以被npm依赖的一个<code v-pre>node-semver</code>模块解析。具体规则见下面的<code v-pre>dependencies</code>模块</p>
<h2 id="description" tabindex="-1"><a class="header-anchor" href="#description" aria-hidden="true">#</a> description</h2>
<p>一个描述，方便别人了解你的模块作用，搜索的时候也有用。</p>
<h2 id="keywords" tabindex="-1"><a class="header-anchor" href="#keywords" aria-hidden="true">#</a> keywords</h2>
<p>一个字符串数组，方便别人搜索到本模块</p>
<h2 id="homepage" tabindex="-1"><a class="header-anchor" href="#homepage" aria-hidden="true">#</a> homepage</h2>
<p>项目主页url
<strong>注意:</strong> 这个项目主页url和url属性不同，如果你填写了url属性，npm注册工具会认为你把项目发布到其他地方了，获取模块的时候不会从npm官方仓库获取，而是会重定向到url属性配置的地址。
（原文档中用了 spit(吐)这个单词，作者表示他不是在开玩笑:）</p>
<h2 id="bugs" tabindex="-1"><a class="header-anchor" href="#bugs" aria-hidden="true">#</a> bugs</h2>
<p>填写一个bug提交地址或者一个邮箱，被你的模块坑到的人可以通过这里吐槽，例如：</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"url"</span> <span class="token operator">:</span> <span class="token string">"https://github.com/owner/project/issues"</span><span class="token punctuation">,</span>
    <span class="token property">"email"</span> <span class="token operator">:</span> <span class="token string">"project@hostname.com"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>url和email可以任意填或不填，如果只填一个，可以直接写成一个字符串而不是对象。如果填写了url，npm bugs命令会使用这个url。</p>
<h2 id="license" tabindex="-1"><a class="header-anchor" href="#license" aria-hidden="true">#</a> license</h2>
<p>你应该为你的模块制定一个协议，让用户知道他们有何权限来使用你的模块，以及使用该模块有哪些限制。最简单的，例如你用BSD-3-Clause 或 MIT之类的协议，如下：</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span> <span class="token property">"license"</span> <span class="token operator">:</span> <span class="token string">"MIT"</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>你可以在<a href="https://spdx.org/licenses/" target="_blank" rel="noopener noreferrer">https://spdx.org/licenses/ <ExternalLinkIcon/></a>这个地址查阅协议列表 。</p>
<h2 id="和用户相关的属性-author-contributors" tabindex="-1"><a class="header-anchor" href="#和用户相关的属性-author-contributors" aria-hidden="true">#</a> 和用户相关的属性: author, contributors</h2>
<p><code v-pre>author</code>是一个码农， <code v-pre>contributors</code>是一个码农数组。 <code v-pre>person</code>是一个有一些描述属性的对象，如下 like this:</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"name"</span> <span class="token operator">:</span> <span class="token string">"Barney Rubble"</span><span class="token punctuation">,</span>
    <span class="token property">"email"</span> <span class="token operator">:</span> <span class="token string">"b@rubble.com"</span><span class="token punctuation">,</span>
    <span class="token property">"url"</span> <span class="token operator">:</span> <span class="token string">"http://barnyrubble.tumblr.com/"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以按如下格式缩写，npm会帮着转换:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>"Barney Rubble b@rubble.com (http://barnyrubble.tumblr.com/)"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>email</code>和<code v-pre>url</code>属性实际上都是可以省略的。描述用户信息的还有一个<code v-pre>maintainers</code>（维护者）属性。</p>
<h2 id="files" tabindex="-1"><a class="header-anchor" href="#files" aria-hidden="true">#</a> files</h2>
<p><code v-pre>files</code>属性的值是一个数组，内容是模块下文件名或者文件夹名，如果是文件夹名，则文件夹下所有的文件也会被包含进来（除非文件被另一些配置排除了）
你也可以在模块根目录下创建一个<code v-pre>.npmignore</code>文件（windows下无法直接创建以&quot;.&quot;开头的文件，使用linux命令行工具创建如git bash），写在这个文件里边的文件即便被写在files属性里边也会被排除在外，这个文件的写法&quot;.gitignore&quot;类似。</p>
<h2 id="main" tabindex="-1"><a class="header-anchor" href="#main" aria-hidden="true">#</a> main</h2>
<p><code v-pre>main</code>属性指定了程序的主入口文件。意思是，如果你的模块被命名为foo，用户安装了这个模块并通过require(&quot;foo&quot;)来使用这个模块，那么require返回的内容就是main属性指定的文件中 module.exports指向的对象。
它应该指向模块根目录下的一个文件。对大对数模块而言，这个属性更多的是让模块有一个主入口文件，然而很多模块并不写这个属性。</p>
<h2 id="bin" tabindex="-1"><a class="header-anchor" href="#bin" aria-hidden="true">#</a> bin</h2>
<p>很多模块有一个或多个需要配置到PATH路径下的可执行模块，npm让这个工作变得十分简单（实际上npm本身也是通过bin属性安装为一个可执行命令的）
如果要用npm的这个功能，在package.json里边配置一个bin属性。bin属性是一个已命令名称为key，本地文件名称为value的map如下：</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"bin"</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">"myapp"</span> <span class="token operator">:</span> <span class="token string">"./cli.js"</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>模块安装的时候，若是全局安装，则npm会为bin中配置的文件在bin目录下创建一个软连接（对于windows系统，默认会在C:\Users\username\AppData\Roaming\npm目录下），若是局部安装，则会在项目内的./node_modules/.bin/目录下创建一个软链接。
因此，按上面的例子，当你安装myapp的时候，npm就会为cli.js在/usr/local/bin/myapp路径创建一个软链接。
如果你的模块只有一个可执行文件，并且它的命令名称和模块名称一样，你可以只写一个字符串来代替上面那种配置，例如：</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span> 
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"my-program"</span><span class="token punctuation">,</span>
    <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.2.5"</span><span class="token punctuation">,</span> 
    <span class="token property">"bin"</span><span class="token operator">:</span> <span class="token string">"./path/to/program"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作用和如下写法相同:</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span> 
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"my-program"</span><span class="token punctuation">,</span> 
    <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.2.5"</span><span class="token punctuation">,</span> 
    <span class="token property">"bin"</span> <span class="token operator">:</span> <span class="token punctuation">{</span> 
        <span class="token property">"my-program"</span> <span class="token operator">:</span> <span class="token string">"./path/to/program"</span> 
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="man" tabindex="-1"><a class="header-anchor" href="#man" aria-hidden="true">#</a> man</h2>
<p>制定一个或通过数组制定一些文件来让linux下的man命令查找文档地址。
如果只有一个文件被指定的话，安装后直接使用man+模块名称，而不管man指定的文件的实际名称。例如:</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"name"</span> <span class="token operator">:</span> <span class="token string">"foo"</span><span class="token punctuation">,</span>
    <span class="token property">"version"</span> <span class="token operator">:</span> <span class="token string">"1.2.3"</span><span class="token punctuation">,</span> 
    <span class="token property">"description"</span> <span class="token operator">:</span> <span class="token string">"A packaged foo fooer for fooing foos"</span><span class="token punctuation">,</span> 
    <span class="token property">"main"</span> <span class="token operator">:</span> <span class="token string">"foo.js"</span><span class="token punctuation">,</span> 
    <span class="token property">"man"</span> <span class="token operator">:</span> <span class="token string">"./man/doc.1"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过man foo命令会得到 ./man/doc.1 文件的内容。
如果man文件名称不是以模块名称开头的，安装的时候会给加上模块名称前缀。因此，下面这段配置：</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span> 
    <span class="token property">"name"</span> <span class="token operator">:</span> <span class="token string">"foo"</span><span class="token punctuation">,</span> 
    <span class="token property">"version"</span> <span class="token operator">:</span> <span class="token string">"1.2.3"</span><span class="token punctuation">,</span> 
    <span class="token property">"description"</span> <span class="token operator">:</span> <span class="token string">"A packaged foo fooer for fooing foos"</span><span class="token punctuation">,</span> 
    <span class="token property">"main"</span> <span class="token operator">:</span> <span class="token string">"foo.js"</span><span class="token punctuation">,</span> 
    <span class="token property">"man"</span> <span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token string">"./man/foo.1"</span><span class="token punctuation">,</span> <span class="token string">"./man/bar.1"</span> <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会创建一些文件来作为man foo和man foo-bar命令的结果。
man文件必须以数字结尾，或者如果被压缩了，以.gz结尾。数字表示文件将被安装到man的哪个部分。</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span> 
    <span class="token property">"name"</span> <span class="token operator">:</span> <span class="token string">"foo"</span><span class="token punctuation">,</span> 
    <span class="token property">"version"</span> <span class="token operator">:</span> <span class="token string">"1.2.3"</span><span class="token punctuation">,</span>
    <span class="token property">"description"</span> <span class="token operator">:</span> <span class="token string">"A packaged foo fooer for fooing foos"</span><span class="token punctuation">,</span> 
    <span class="token property">"main"</span> <span class="token operator">:</span> <span class="token string">"foo.js"</span><span class="token punctuation">,</span> 
    <span class="token property">"man"</span> <span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token string">"./man/foo.1"</span><span class="token punctuation">,</span> <span class="token string">"./man/foo.2"</span> <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会创建 man foo 和 man 2 foo 两条命令。</p>
<h2 id="directories" tabindex="-1"><a class="header-anchor" href="#directories" aria-hidden="true">#</a> directories</h2>
<p>CommonJs通过directories来制定一些方法来描述模块的结构，看看npm的package.json文件https://registry.npmjs.org/npm/latest ，可以发现里边有这个字段的内容。
<img src="http://zoucz.com/blogimgs/2016-02-16/1455624810992.png" alt="img">
目前这个配置没有任何作用，将来可能会整出一些花样来。</p>
<h3 id="directories-lib" tabindex="-1"><a class="header-anchor" href="#directories-lib" aria-hidden="true">#</a> directories.lib</h3>
<p>告诉用户模块中lib目录在哪，这个配置目前没有任何作用，但是对使用模块的人来说是一个很有用的信息。</p>
<h3 id="directories-bin" tabindex="-1"><a class="header-anchor" href="#directories-bin" aria-hidden="true">#</a> directories.bin</h3>
<p>如果你在这里指定了bin目录，这个配置下面的文件会被加入到bin路径下，如果你已经在package.json中配置了bin目录，那么这里的配置将不起任何作用。</p>
<h3 id="directories-man" tabindex="-1"><a class="header-anchor" href="#directories-man" aria-hidden="true">#</a> directories.man</h3>
<p>指定一个目录，目录里边都是man文件，这是一种配置man文件的语法糖。</p>
<h3 id="directories-doc" tabindex="-1"><a class="header-anchor" href="#directories-doc" aria-hidden="true">#</a> directories.doc</h3>
<p>在这个目录里边放一些markdown文件，可能最终有一天它们会被友好的展现出来（应该是在npm的网站上）</p>
<h3 id="directories-example" tabindex="-1"><a class="header-anchor" href="#directories-example" aria-hidden="true">#</a> directories.example</h3>
<p>放一些示例脚本，或许某一天会有用 - -！</p>
<h2 id="repository" tabindex="-1"><a class="header-anchor" href="#repository" aria-hidden="true">#</a> repository</h2>
<p>指定一个代码存放地址，对想要为你的项目贡献代码的人有帮助。像这样：</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token property">"repository"</span> <span class="token operator">:</span>
  <span class="token punctuation">{</span>
      <span class="token property">"type"</span> <span class="token operator">:</span> <span class="token string">"git"</span><span class="token punctuation">,</span>
      <span class="token property">"url"</span> <span class="token operator">:</span> <span class="token string">"https://github.com/npm/npm.git"</span>
  <span class="token punctuation">}</span>

<span class="token property">"repository"</span> <span class="token operator">:</span>
  <span class="token punctuation">{</span> 
      <span class="token property">"type"</span> <span class="token operator">:</span> <span class="token string">"svn"</span><span class="token punctuation">,</span> 
      <span class="token property">"url"</span> <span class="token operator">:</span> <span class="token string">"https://v8.googlecode.com/svn/trunk/"</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若你的模块放在GitHub, GitHub gist, Bitbucket, or GitLab的仓库里，npm install的时候可以使用缩写标记来完成：</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token property">"repository"</span><span class="token operator">:</span> <span class="token string">"npm/npm"</span>

<span class="token property">"repository"</span><span class="token operator">:</span> <span class="token string">"gist:11081aaa281"</span>

<span class="token property">"repository"</span><span class="token operator">:</span> <span class="token string">"bitbucket:example/repo"</span>

<span class="token property">"repository"</span><span class="token operator">:</span> <span class="token string">"gitlab:another/repo"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="scripts" tabindex="-1"><a class="header-anchor" href="#scripts" aria-hidden="true">#</a> scripts</h2>
<p>scripts属性是一个对象，里边指定了项目的生命周期个各个环节需要执行的命令。key是生命周期中的事件，value是要执行的命令。
具体的内容有 install start stop 等，详见<a href="https://docs.npmjs.com/misc/scripts" target="_blank" rel="noopener noreferrer"> https://docs.npmjs.com/misc/scripts<ExternalLinkIcon/></a></p>
<h2 id="config" tabindex="-1"><a class="header-anchor" href="#config" aria-hidden="true">#</a> config</h2>
<p>用来设置一些项目不怎么变化的项目配置，例如port等。
用户用的时候可以使用如下用法：</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code>http.createServer(...).listen(process.env.npm_package_config_port)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以通过npm config set foo:port 80来修改config。详见<a href="https://docs.npmjs.com/misc/config" target="_blank" rel="noopener noreferrer">https://docs.npmjs.com/misc/config<ExternalLinkIcon/></a></p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span> 
    <span class="token property">"name"</span> <span class="token operator">:</span> <span class="token string">"foo"</span><span class="token punctuation">,</span> 
    <span class="token property">"config"</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">"port"</span> <span class="token operator">:</span> <span class="token string">"8080"</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dependencies" tabindex="-1"><a class="header-anchor" href="#dependencies" aria-hidden="true">#</a> dependencies</h2>
<p>dependencies属性是一个对象，配置模块依赖的模块列表，key是模块名称，value是版本范围，版本范围是一个字符，可以被一个或多个空格分割。
dependencies也可以被指定为一个git地址或者一个压缩包地址。
不要把测试工具或transpilers写到dependencies中。 下面是一些写法，详见<a href="https://docs.npmjs.com/misc/semver" target="_blank" rel="noopener noreferrer">https://docs.npmjs.com/misc/semver<ExternalLinkIcon/></a></p>
<ul>
<li>version 精确匹配版本</li>
<li>&gt;version 必须大于某个版本</li>
<li>&gt;=version 大于等于</li>
<li>
<version 小于
</li>
<li>&lt;=versionversion 小于</li>
<li>~version &quot;约等于&quot;，具体规则详见semver文档</li>
<li>^version &quot;兼容版本&quot;具体规则详见semver文档</li>
<li>1.2.x 仅一点二点几的版本</li>
<li>http://... 见下面url作为denpendencies的说明</li>
<li>
<ul>
<li>任何版本</li>
</ul>
</li>
<li>&quot;&quot; 空字符，和*相同</li>
<li>version1 - version2 相当于 &gt;=version1 &lt;=version2.</li>
<li>range1 || range2 范围1和范围2满足任意一个都行</li>
<li>git... 见下面git url作为denpendencies的说明</li>
<li>user/repo See 见下面GitHub仓库的说明</li>
<li>tag 发布的一个特殊的标签，见npm-tag的文档 <a href="https://docs.npmjs.com/getting-started/using-tags" target="_blank" rel="noopener noreferrer">https://docs.npmjs.com/getting-started/using-tags<ExternalLinkIcon/></a></li>
<li>path/path/path 见下面本地模块的说明
下面的写法都是可以的:</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span> <span class="token property">"dependencies"</span> <span class="token operator">:</span>
  <span class="token punctuation">{</span> <span class="token property">"foo"</span> <span class="token operator">:</span> <span class="token string">"1.0.0 - 2.9999.9999"</span>
  <span class="token punctuation">,</span> <span class="token property">"bar"</span> <span class="token operator">:</span> <span class="token string">">=1.0.2 &lt;2.1.2"</span>
  <span class="token punctuation">,</span> <span class="token property">"baz"</span> <span class="token operator">:</span> <span class="token string">">1.0.2 &lt;=2.3.4"</span>
  <span class="token punctuation">,</span> <span class="token property">"boo"</span> <span class="token operator">:</span> <span class="token string">"2.0.1"</span>
  <span class="token punctuation">,</span> <span class="token property">"qux"</span> <span class="token operator">:</span> <span class="token string">"&lt;1.0.0 || >=2.3.1 &lt;2.4.5 || >=2.5.2 &lt;3.0.0"</span>
  <span class="token punctuation">,</span> <span class="token property">"asd"</span> <span class="token operator">:</span> <span class="token string">"http://asdf.com/asdf.tar.gz"</span>
  <span class="token punctuation">,</span> <span class="token property">"til"</span> <span class="token operator">:</span> <span class="token string">"~1.2"</span>
  <span class="token punctuation">,</span> <span class="token property">"elf"</span> <span class="token operator">:</span> <span class="token string">"~1.2.3"</span>
  <span class="token punctuation">,</span> <span class="token property">"two"</span> <span class="token operator">:</span> <span class="token string">"2.x"</span>
  <span class="token punctuation">,</span> <span class="token property">"thr"</span> <span class="token operator">:</span> <span class="token string">"3.3.x"</span>
  <span class="token punctuation">,</span> <span class="token property">"lat"</span> <span class="token operator">:</span> <span class="token string">"latest"</span>
  <span class="token punctuation">,</span> <span class="token property">"dyl"</span> <span class="token operator">:</span> <span class="token string">"file:../dyl"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="urls-as-dependencies" tabindex="-1"><a class="header-anchor" href="#urls-as-dependencies" aria-hidden="true">#</a> URLs as Dependencies</h2>
<p>在版本范围的地方可以写一个url指向一个压缩包，模块安装的时候会把这个压缩包下载下来安装到模块本地。</p>
<h2 id="git-urls-as-dependencies" tabindex="-1"><a class="header-anchor" href="#git-urls-as-dependencies" aria-hidden="true">#</a> Git URLs as Dependencies</h2>
<p>Git url可以像下面一样:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>git://github.com/user/project.git#commit-ish
git+ssh://user@hostname:project.git#commit-ish
git+ssh://user@hostname/project.git#commit-ish
git+http://user@hostname/project/blah.git#commit-ish
git+https://user@hostname/project/blah.git#commit-ish
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>commit-ish 可以是任意标签，哈希值，或者可以检出的分支，默认是master分支。</p>
<h2 id="github-urls" tabindex="-1"><a class="header-anchor" href="#github-urls" aria-hidden="true">#</a> GitHub URLs</h2>
<p>支持github的 username/modulename 的写法，#后边可以加后缀写明分支hash或标签：</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"foo"</span><span class="token punctuation">,</span>
  <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"0.0.0"</span><span class="token punctuation">,</span>
  <span class="token property">"dependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"express"</span><span class="token operator">:</span> <span class="token string">"visionmedia/express"</span><span class="token punctuation">,</span>
    <span class="token property">"mocha"</span><span class="token operator">:</span> <span class="token string">"visionmedia/mocha#4727d357ea"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="local-paths" tabindex="-1"><a class="header-anchor" href="#local-paths" aria-hidden="true">#</a> Local Paths</h2>
<p>npm2.0.0版本以上可以提供一个本地路径来安装一个本地的模块，通过npm install xxx --save 来安装，格式如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>../foo/bar
~/foo/bar
./foo/bar
/foo/bar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>package.json 生成的相对路径如下:</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"baz"</span><span class="token punctuation">,</span>
  <span class="token property">"dependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"bar"</span><span class="token operator">:</span> <span class="token string">"file:../foo/bar"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种属性在离线开发或者测试需要用npm install的情况，又不想自己搞一个npm server的时候有用，但是发布模块到公共仓库时不应该使用这种属性。</p>
<h2 id="devdependencies" tabindex="-1"><a class="header-anchor" href="#devdependencies" aria-hidden="true">#</a> devDependencies</h2>
<p>如果有人想要下载并使用你的模块，也许他们并不希望或需要下载一些你在开发过程中使用的额外的测试或者文档框架。
在这种情况下，最好的方法是把这些依赖添加到devDependencies属性的对象中。
这些模块会在npm link或者npm install的时候被安装，也可以像其他npm配置一样被管理，详见npm的config文档。
对于一些跨平台的构建任务，例如把CoffeeScript编译成JavaScript，就可以通过在package.json的script属性里边配置prepublish脚本来完成这个任务，然后需要依赖的coffee-script模块就写在devDependencies属性种。
例如:</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span> <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"ethopia-waza"</span><span class="token punctuation">,</span>
  <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"a delightfully fruity coffee varietal"</span><span class="token punctuation">,</span>
  <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.2.3"</span><span class="token punctuation">,</span>
  <span class="token property">"devDependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"coffee-script"</span><span class="token operator">:</span> <span class="token string">"~1.6.3"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"prepublish"</span><span class="token operator">:</span> <span class="token string">"coffee -o lib/ -c src/waza.coffee"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"main"</span><span class="token operator">:</span> <span class="token string">"lib/waza.js"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>prepublish脚本会在发布之前运行，因此用户在使用之前就不用再自己去完成编译的过程了。在开发模式下，运行npm install也会执行这个脚本（见npm script文档），因此可以很方便的调试。</p>
<h2 id="peerdependencies" tabindex="-1"><a class="header-anchor" href="#peerdependencies" aria-hidden="true">#</a> peerDependencies</h2>
<p>有时候做一些插件开发，比如grunt等工具的插件，它们往往是在grunt的某个版本的基础上开发的，而在他们的代码中并不会出现require(&quot;grunt&quot;)这样的依赖，dependencies配置里边也不会写上grunt的依赖，为了说明此模块只能作为插件跑在宿主的某个版本范围下，可以配置peerDependencies：</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"tea-latte"</span><span class="token punctuation">,</span>
  <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.3.5"</span><span class="token punctuation">,</span>
  <span class="token property">"peerDependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"tea"</span><span class="token operator">:</span> <span class="token string">"2.x"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这个配置确保再npm install的时候tea-latte会和2.x版本的tea一起安装，而且它们两个的依赖关系是同级的：
├── tea-latte@1.3.5
└── tea@2.2.0
这个配置的目的是让npm知道，如果要使用此插件模块，请确保安装了兼容版本的宿主模块。</p>
<h2 id="bundleddependencies" tabindex="-1"><a class="header-anchor" href="#bundleddependencies" aria-hidden="true">#</a> bundledDependencies</h2>
<p>上面的单词少个d，写成bundleDependencies也可以。
指定发布的时候会被一起打包的模块。</p>
<h2 id="optionaldependencies" tabindex="-1"><a class="header-anchor" href="#optionaldependencies" aria-hidden="true">#</a> optionalDependencies</h2>
<p>如果一个依赖模块可以被使用， 同时你也希望在该模块找不到或无法获取时npm继续运行，你可以把这个模块依赖放到optionalDependencies配置中。这个配置的写法和dependencies的写法一样，不同的是这里边写的模块安装失败不会导致npm install失败。
当然，这种模块就需要你自己在代码中处理模块确实的情况了，例如：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span>
  <span class="token keyword">var</span> fooVersion <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'foo/package.json'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>version
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>er<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  foo <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token function">notGoodFooVersion</span><span class="token punctuation">(</span>fooVersion<span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  foo <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>

<span class="token comment">// .. then later in your program ..</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>foo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  foo<span class="token punctuation">.</span><span class="token function">doFooThings</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>optionalDependencies 中的配置会覆盖dependencies中的配置，最好只在一个地方写。</p>
<h2 id="engines" tabindex="-1"><a class="header-anchor" href="#engines" aria-hidden="true">#</a> engines</h2>
<p>你可以指定项目运行的node版本范围，如下：
{ &quot;engines&quot; : { &quot;node&quot; : &quot;&gt;=0.10.3 &lt;0.12&quot; } }
和dependencies一样，如果你不指定版本范围或者指定为*，任何版本的node都可以。
也可以指定一些npm版本可以正确的安装你的模块，例如：
{ &quot;engines&quot; : { &quot;npm&quot; : &quot;~1.0.20&quot; } }
要注意的是，除非你设置了engine-strict属性，engines属性是仅供参考的。</p>
<h2 id="enginestrict" tabindex="-1"><a class="header-anchor" href="#enginestrict" aria-hidden="true">#</a> engineStrict</h2>
<p>注意：这个属性已经弃用，将在npm 3.0.0 版本干掉。</p>
<h2 id="os" tabindex="-1"><a class="header-anchor" href="#os" aria-hidden="true">#</a> os</h2>
<p>可以指定你的模块只能在哪个操作系统上跑：
&quot;os&quot; : [ &quot;darwin&quot;, &quot;linux&quot; ]
也可以指定黑名单而不是白名单：
&quot;os&quot; : [ &quot;!win32&quot; ]
服务的操作系统是由process.platform来判断的，这个属性允许黑白名单同时存在，虽然没啥必要这样搞...</p>
<h2 id="cpu" tabindex="-1"><a class="header-anchor" href="#cpu" aria-hidden="true">#</a> cpu</h2>
<p>限制模块只能在某某cpu架构下运行
&quot;cpu&quot; : [ &quot;x64&quot;, &quot;ia32&quot; ]
同样可以设置黑名单:
&quot;cpu&quot; : [ &quot;!arm&quot;, &quot;!mips&quot; ]
cpu架构通过 process.arch 判断</p>
<h2 id="preferglobal" tabindex="-1"><a class="header-anchor" href="#preferglobal" aria-hidden="true">#</a> preferGlobal</h2>
<p>如果您的软件包主要用于安装到全局的命令行应用程序，那么该值设置为true ，如果它被安装在本地，则提供一个警告。实际上该配置并没有阻止用户把模块安装到本地，只是防止该模块被错误的使用引起一些问题。</p>
<h2 id="private" tabindex="-1"><a class="header-anchor" href="#private" aria-hidden="true">#</a> private</h2>
<p>如果这个属性被设置为true，npm将拒绝发布它，这是为了防止一个私有模块被无意间发布出去。如果你只想让模块被发布到一个特定的npm仓库，如一个内部的仓库，可与在下面的publishConfig中配置仓库参数。</p>
<h2 id="publishconfig" tabindex="-1"><a class="header-anchor" href="#publishconfig" aria-hidden="true">#</a> publishConfig</h2>
<p>这个配置是会在模块发布时用到的一些值的集合。如果你不想模块被默认被标记为最新的，或者默认发布到公共仓库，可以在这里配置tag或仓库地址。</p>
<h2 id="default-values" tabindex="-1"><a class="header-anchor" href="#default-values" aria-hidden="true">#</a> DEFAULT VALUES</h2>
<p>npm设置了一些默认参数，如：
&quot;scripts&quot;: {&quot;start&quot;: &quot;node server.js&quot;}
如果模块根目录下有一个server.js文件，那么npm start会默认运行这个文件。
&quot;scripts&quot;:{&quot;preinstall&quot;: &quot;node-gyp rebuild&quot;}
如果模块根目录下有binding.gyp, npm将默认用node-gyp来编译preinstall的脚本
&quot;contributors&quot;: [...]
若模块根目录下有AUTHORS 文件，则npm会按Name (url)格式解析每一行的数据添加到contributors中，可以用#添加行注释</p>
<h2 id="参考文档列表-https-docs-npmjs-com" tabindex="-1"><a class="header-anchor" href="#参考文档列表-https-docs-npmjs-com" aria-hidden="true">#</a> 参考文档列表(https://docs.npmjs.com/)</h2>
<p>semver(7)
npm-init(1)
npm-version(1)
npm-config(1)
npm-config(7)
npm-help(1)
npm-faq(7)
npm-install(1)
npm-publish(1)
npm-rm(1)</p>
</div></template>


