<template><div><h2 id="同时修改本地分支名和对应的远程分支名" tabindex="-1"><a class="header-anchor" href="#同时修改本地分支名和对应的远程分支名" aria-hidden="true">#</a> 同时修改本地分支名和对应的远程分支名</h2>
<p>修改前要确保本地分支的代码是最新的，并且修改后不会影响到同事的代码。</p>
<ol>
<li>修改本地分支名</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> branch <span class="token parameter variable">-m</span> oldBranchName newBranchName
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>删除远程分支</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> push origin :oldBranchName
<span class="token comment"># 或者 git push origin --delete oldBranchName</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>改名后的本地分支推送到远程</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> push --set-upstream origin newBranchName
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


