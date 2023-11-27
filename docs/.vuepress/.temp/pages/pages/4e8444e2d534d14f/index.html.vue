<template><div><h1 id="yaml语言教程" tabindex="-1"><a class="header-anchor" href="#yaml语言教程" aria-hidden="true">#</a> yaml语言教程</h1>
<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2>
<p>YAML 是 &quot;YAML Ain't a Markup Language&quot;（YAML 不是一种标记语言）的递归缩写。在开发的这种语言时，YAML 的意思其实是：&quot;Yet Another Markup Language&quot;（仍是一种标记语言）。</p>
<!-- more -->
<p>YAML 的语法和其他高级语言类似，并且可以简单表达清单、散列表，标量等数据形态。它使用空白符号缩进和大量依赖外观的特色，特别<strong>适合用来表达或编辑数据结构、各种配置文件、倾印调试内容、文件大纲</strong>（例如：许多电子邮件标题格式和YAML非常接近）。</p>
<p>YAML 的配置文件后缀为 <strong>.yml</strong>，如：<strong>runoob.yml</strong> 。</p>
<blockquote>
<p>yaml常用来用作配置文件，和json类似</p>
</blockquote>
<h2 id="基本语法" tabindex="-1"><a class="header-anchor" href="#基本语法" aria-hidden="true">#</a> 基本语法</h2>
<ul>
<li>
<p>大小写敏感</p>
</li>
<li>
<p>使用缩进表示层级关系</p>
</li>
<li>
<p>缩进不允许使用tab，只允许空格</p>
</li>
<li>
<p>缩进的空格数不重要，只要相同层级的元素左对齐即可</p>
</li>
<li>
<p>'#'表示注释</p>
</li>
</ul>
<h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h2>
<p>YAML 支持以下几种数据类型：</p>
<ul>
<li><strong>对象</strong>：键值对的集合，又称为映射（mapping）/ 哈希（hashes） / 字典（dictionary）</li>
<li><strong>数组</strong>：一组按次序排列的值，又称为序列（sequence） / 列表（list）</li>
<li><strong>纯量</strong>（scalars）：单个的、不可再分的值</li>
</ul>
<h2 id="yaml-对象" tabindex="-1"><a class="header-anchor" href="#yaml-对象" aria-hidden="true">#</a> YAML 对象</h2>
<p>对象的几种表示形式：</p>
<p>1、对象键值对使用冒号结构表示 <strong>key: value</strong>，冒号后面要加一个空格。</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">key</span><span class="token punctuation">:</span> value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2、也可以使用 <strong>key:{key1: value1, key2: value2, ...}</strong>。</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>key<span class="token punctuation">:</span><span class="token punctuation">{</span>child<span class="token punctuation">-</span>key1<span class="token punctuation">:</span>value1<span class="token punctuation">,</span>child<span class="token punctuation">-</span>key2<span class="token punctuation">:</span>value2<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3、还可以使用缩进表示层级关系；</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">key</span><span class="token punctuation">:</span> 
    <span class="token key atrule">child-key1</span><span class="token punctuation">:</span> value1
    <span class="token key atrule">child-key2</span><span class="token punctuation">:</span> value2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同2，只是表示形式不同。</p>
<p>4、较为复杂的对象格式，可以使用问号加一个空格代表一个复杂的 key，配合一个冒号加一个空格代表一个 value：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">?</span>  
    <span class="token punctuation">-</span> complexkey1
    <span class="token punctuation">-</span> <span class="token key atrule">complexkey2</span>
<span class="token punctuation">:</span>
    <span class="token punctuation">-</span> complexvalue1
    <span class="token punctuation">-</span> complexvalue2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>意思即对象的属性是一个数组 [complexkey1,complexkey2]，对应的值也是一个数组 [complexvalue1,complexvalue2]</p>
<h2 id="yaml-数组" tabindex="-1"><a class="header-anchor" href="#yaml-数组" aria-hidden="true">#</a> YAML 数组</h2>
<p>以 <strong>-</strong> 开头的行表示构成一个数组：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> A
<span class="token punctuation">-</span> B
<span class="token punctuation">-</span> C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>YAML 支持多维数组，可以使用行内表示：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">key</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>value1<span class="token punctuation">,</span> value2<span class="token punctuation">,</span> <span class="token punctuation">...</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>数据结构的子成员是一个数组，则可以在该项下面缩进一个空格。</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span>
 <span class="token punctuation">-</span> A
 <span class="token punctuation">-</span> B
 <span class="token punctuation">-</span> C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个相对复杂的例子：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">companies</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span>
        <span class="token key atrule">id</span><span class="token punctuation">:</span> <span class="token number">1</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> company1
        <span class="token key atrule">price</span><span class="token punctuation">:</span> 200W
    <span class="token punctuation">-</span>
        <span class="token key atrule">id</span><span class="token punctuation">:</span> <span class="token number">2</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> company2
        <span class="token key atrule">price</span><span class="token punctuation">:</span> 500W
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>意思是 companies 属性是一个数组，每一个数组元素又是由 id、name、price 三个属性构成。</p>
<p>数组也可以使用流式(flow)的方式表示：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">companies</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token key atrule">id</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span><span class="token key atrule">name</span><span class="token punctuation">:</span> company1<span class="token punctuation">,</span><span class="token key atrule">price</span><span class="token punctuation">:</span> 200W<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token key atrule">id</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span><span class="token key atrule">name</span><span class="token punctuation">:</span> company2<span class="token punctuation">,</span><span class="token key atrule">price</span><span class="token punctuation">:</span> 500W<span class="token punctuation">}</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="复合结构-对象和数组组合" tabindex="-1"><a class="header-anchor" href="#复合结构-对象和数组组合" aria-hidden="true">#</a> 复合结构（对象和数组组合）</h2>
<p>数组和对象可以构成复合结构，例：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">languages</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> Ruby
  <span class="token punctuation">-</span> Perl
  <span class="token punctuation">-</span> Python 
<span class="token key atrule">websites</span><span class="token punctuation">:</span>
  <span class="token key atrule">YAML</span><span class="token punctuation">:</span> yaml.org 
  <span class="token key atrule">Ruby</span><span class="token punctuation">:</span> ruby<span class="token punctuation">-</span>lang.org 
  <span class="token key atrule">Python</span><span class="token punctuation">:</span> python.org 
  <span class="token key atrule">Perl</span><span class="token punctuation">:</span> use.perl.org
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>转换为 js 为：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">{</span> 
  <span class="token key atrule">languages</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">'Ruby'</span><span class="token punctuation">,</span> <span class="token string">'Perl'</span><span class="token punctuation">,</span> <span class="token string">'Python'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token key atrule">websites</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
    <span class="token key atrule">YAML</span><span class="token punctuation">:</span> <span class="token string">'yaml.org'</span><span class="token punctuation">,</span>
    <span class="token key atrule">Ruby</span><span class="token punctuation">:</span> <span class="token string">'ruby-lang.org'</span><span class="token punctuation">,</span>
    <span class="token key atrule">Python</span><span class="token punctuation">:</span> <span class="token string">'python.org'</span><span class="token punctuation">,</span>
    <span class="token key atrule">Perl</span><span class="token punctuation">:</span> <span class="token string">'use.perl.org'</span> 
  <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="纯量" tabindex="-1"><a class="header-anchor" href="#纯量" aria-hidden="true">#</a> 纯量</h2>
<p>纯量是最基本的，不可再分的值，包括：</p>
<ul>
<li>字符串</li>
<li>布尔值</li>
<li>整数</li>
<li>浮点数</li>
<li>Null</li>
<li>时间</li>
<li>日期</li>
</ul>
<p>使用一个例子来快速了解纯量的基本使用：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">boolean</span><span class="token punctuation">:</span> <span class="token comment"># 布尔值</span>
    <span class="token punctuation">-</span> <span class="token boolean important">TRUE</span>  <span class="token comment">#true,True都可以</span>
    <span class="token punctuation">-</span> <span class="token boolean important">FALSE</span>  <span class="token comment">#false，False都可以</span>
<span class="token key atrule">float</span><span class="token punctuation">:</span> <span class="token comment"># 浮点数</span>
    <span class="token punctuation">-</span> <span class="token number">3.14</span>
    <span class="token punctuation">-</span> <span class="token number">6.8523015e+5</span>  <span class="token comment">#可以使用科学计数法</span>
<span class="token key atrule">int</span><span class="token punctuation">:</span> <span class="token comment"># 整数</span>
    <span class="token punctuation">-</span> <span class="token number">123</span>
    <span class="token punctuation">-</span> 0b1010_0111_0100_1010_1110    <span class="token comment">#二进制表示</span>
<span class="token key atrule">null</span><span class="token punctuation">:</span> <span class="token comment"># Null</span>
    <span class="token key atrule">nodeName</span><span class="token punctuation">:</span> <span class="token string">'node'</span>
    <span class="token key atrule">parent</span><span class="token punctuation">:</span> <span class="token null important">~</span>  <span class="token comment">#使用~表示null</span>
<span class="token key atrule">string</span><span class="token punctuation">:</span> <span class="token comment"># 字符串</span>
    <span class="token punctuation">-</span> 哈哈 <span class="token comment"># 字符串默认不使用引号表示</span>
    <span class="token punctuation">-</span> <span class="token string">'Hello world'</span>  <span class="token comment">#可以使用双引号或者单引号包裹特殊字符</span>
    <span class="token punctuation">-</span> newline
      newline2    <span class="token comment">#字符串可以拆成多行，每一行会被转化成一个空格</span>
<span class="token key atrule">date</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token datetime number">2018-02-17</span>    <span class="token comment">#日期必须使用ISO 8601格式，即yyyy-MM-dd</span>
<span class="token key atrule">datetime</span><span class="token punctuation">:</span> 
    <span class="token punctuation">-</span>  <span class="token datetime number">2018-02-17T15:02:31+08:00</span>    <span class="token comment">#时间使用ISO 8601格式，时间和日期之间使用T连接，最后使用+代表时区</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多行字符串可以使用<code v-pre>|</code>保留换行符，也可以使用<code v-pre>&gt;</code>折叠换行。</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">this</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
  Foo
  Bar</span>
<span class="token key atrule">that</span><span class="token punctuation">:</span> <span class="token punctuation">></span><span class="token scalar string">
  Foo
  Bar</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>转为js代码如下。</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span> this<span class="token operator">:</span> 'Foo\nBar\n'<span class="token punctuation">,</span> that<span class="token operator">:</span> 'Foo Bar\n' <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>+</code>表示保留文字块末尾的换行，<code v-pre>-</code>表示删除字符串末尾的换行。</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">s1</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
  Foo</span>
 
<span class="token key atrule">s2</span><span class="token punctuation">:</span> <span class="token punctuation">|</span>+
  Foo
 
 
<span class="token key atrule">s3</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
  Foo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>转为json代码如下</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span> s1<span class="token operator">:</span> 'Foo\n'<span class="token punctuation">,</span> s2<span class="token operator">:</span> 'Foo\n\n\n'<span class="token punctuation">,</span> s3<span class="token operator">:</span> 'Foo' <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>字符串之中可以插入 HTML 标记。</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">message</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
  &lt;p style="color: red">
    段落
  &lt;/p></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="转换数据格式" tabindex="-1"><a class="header-anchor" href="#转换数据格式" aria-hidden="true">#</a> 转换数据格式</h2>
<p>允许使用两个感叹号，强制转换数据类型。</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">e</span><span class="token punctuation">:</span> <span class="token tag">!!str</span> <span class="token number">123</span>
<span class="token key atrule">f</span><span class="token punctuation">:</span> <span class="token tag">!!str</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>转换js结果同：</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span> e<span class="token operator">:</span> '<span class="token number">123</span>'<span class="token punctuation">,</span> f<span class="token operator">:</span> '<span class="token boolean">true</span>' <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="锚点引用" tabindex="-1"><a class="header-anchor" href="#锚点引用" aria-hidden="true">#</a> 锚点引用</h2>
<p><strong>&amp;</strong> 锚点和&lt; span class=&quot;marked&quot;&gt;* 别名，可以用来引用:</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">defaults</span><span class="token punctuation">:</span> <span class="token important">&amp;defaults</span> <span class="token comment"># 添加锚点</span>
  <span class="token key atrule">adapter</span><span class="token punctuation">:</span>  postgres
  <span class="token key atrule">host</span><span class="token punctuation">:</span>     localhost

<span class="token key atrule">development</span><span class="token punctuation">:</span>
  <span class="token key atrule">database</span><span class="token punctuation">:</span> myapp_development
  <span class="token key atrule">&lt;&lt;</span><span class="token punctuation">:</span> <span class="token important">*defaults</span> <span class="token comment"># &lt;&lt;表示合并，*引用锚点</span>

<span class="token key atrule">test</span><span class="token punctuation">:</span>
  <span class="token key atrule">database</span><span class="token punctuation">:</span> myapp_test
  <span class="token key atrule">&lt;&lt;</span><span class="token punctuation">:</span> <span class="token important">*defaults</span> <span class="token comment"># &lt;&lt;表示合并，*引用锚点</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相当于:</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">defaults</span><span class="token punctuation">:</span>
  <span class="token key atrule">adapter</span><span class="token punctuation">:</span>  postgres
  <span class="token key atrule">host</span><span class="token punctuation">:</span>     localhost

<span class="token key atrule">development</span><span class="token punctuation">:</span>
  <span class="token key atrule">database</span><span class="token punctuation">:</span> myapp_development
  <span class="token key atrule">adapter</span><span class="token punctuation">:</span>  postgres
  <span class="token key atrule">host</span><span class="token punctuation">:</span>     localhost

<span class="token key atrule">test</span><span class="token punctuation">:</span>
  <span class="token key atrule">database</span><span class="token punctuation">:</span> myapp_test
  <span class="token key atrule">adapter</span><span class="token punctuation">:</span>  postgres
  <span class="token key atrule">host</span><span class="token punctuation">:</span>     localhost
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>&amp;</strong> 用来建立锚点（defaults），<strong>&lt;&lt;</strong> 表示合并到当前数据，***** 用来引用锚点。</p>
<p>下面是另一个例子:</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token important">&amp;showell</span> Steve 
<span class="token punctuation">-</span> Clark 
<span class="token punctuation">-</span> Brian 
<span class="token punctuation">-</span> Oren 
<span class="token punctuation">-</span> <span class="token important">*showell</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>转为js代码如下:</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">[</span> <span class="token string">'Steve'</span><span class="token punctuation">,</span> <span class="token string">'Clark'</span><span class="token punctuation">,</span> <span class="token string">'Brian'</span><span class="token punctuation">,</span> <span class="token string">'Oren'</span><span class="token punctuation">,</span> <span class="token string">'Steve'</span> <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>参考：</p>
<ul>
<li>yaml官网：<a href="https://yaml.org/" target="_blank" rel="noopener noreferrer">https://yaml.org/<ExternalLinkIcon/></a></li>
<li>yaml与js的转换demo：<a href="http://nodeca.github.io/js-yaml/" target="_blank" rel="noopener noreferrer">http://nodeca.github.io/js-yaml/<ExternalLinkIcon/></a></li>
<li>菜鸟教程：<a href="https://www.ruanyifeng.com/blog/2016/07/yaml.html" target="_blank" rel="noopener noreferrer">https://www.ruanyifeng.com/blog/2016/07/yaml.html<ExternalLinkIcon/></a></li>
</ul>
</blockquote>
</div></template>


