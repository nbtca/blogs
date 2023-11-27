<template><div><!--
普通卡片列表容器，可用于友情链接、项目推荐、古诗词展示等。
cardList 后面可跟随一个数字表示每行最多显示多少个，选值范围1~4，默认3。在小屏时会根据屏幕宽度减少每行显示数量。
-->
<p>::: cardList</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 麋鹿鲁哟
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 大道至简，知易行难
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//jsd.cdn.zzko.cn/gh/xugaoyi/image_store/blog/20200122153807.jpg <span class="token comment"># 可选</span>
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//www.cnblogs.com/miluluyo/ <span class="token comment"># 可选</span>
  <span class="token key atrule">bgColor</span><span class="token punctuation">:</span> <span class="token string">'#CBEAFA'</span> <span class="token comment"># 可选，默认var(--bodyBg)。颜色值有#号时请添加单引号</span>
  <span class="token key atrule">textColor</span><span class="token punctuation">:</span> <span class="token string">'#6854A1'</span> <span class="token comment"># 可选，默认var(--textColor)</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> XAOXUU
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> <span class="token string">'#IOS #Volantis主题作者'</span>
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//jsd.cdn.zzko.cn/gh/xaoxuu/assets@master/avatar/avatar.png
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//xaoxuu.com
  <span class="token key atrule">bgColor</span><span class="token punctuation">:</span> <span class="token string">'#B9D59C'</span>
  <span class="token key atrule">textColor</span><span class="token punctuation">:</span> <span class="token string">'#3B551F'</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 平凡的你我
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 理想成为大牛的&lt;br/<span class="token punctuation">></span>小陈同学
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//qiniu.reinness.com/avatar.png
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//reinness.com
  <span class="token key atrule">bgColor</span><span class="token punctuation">:</span> <span class="token string">'#FFE5B4'</span>
  <span class="token key atrule">textColor</span><span class="token punctuation">:</span> <span class="token string">'#A05F2C'</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> znote
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 荷尽已无擎雨盖，&lt;br/<span class="token punctuation">></span>菊残犹有傲霜枝。
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//zpj80231.gitee.io/znote/vuepress/head<span class="token punctuation">-</span>fish.jpg
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//zpj80231.gitee.io/znote/
  <span class="token key atrule">bgColor</span><span class="token punctuation">:</span> <span class="token string">'#FCE5BF'</span>
  <span class="token key atrule">textColor</span><span class="token punctuation">:</span> <span class="token string">'#7B2532'</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 全栈软件开发直通车
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 全栈软件开发技术博客，&lt;br/<span class="token punctuation">></span>从小白到大神<span class="token tag">!</span>
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//cdn.jsdelivr.net/gh/wangshibiaoFlytiger/blog_picBed1/images/shuaige.jpg
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//sofineday.com
  <span class="token key atrule">bgColor</span><span class="token punctuation">:</span> <span class="token string">'#FBEBEC'</span>
  <span class="token key atrule">textColor</span><span class="token punctuation">:</span> <span class="token string">'#603420'</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 易良同学的博客
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 正在努力！
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//yiliang.site/assets/images/avatar.jpg
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//yiliang.site
  <span class="token key atrule">bgColor</span><span class="token punctuation">:</span> <span class="token string">'#FFEFE2'</span>
  <span class="token key atrule">textColor</span><span class="token punctuation">:</span> <span class="token string">'#A05F2C'</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 永远的救赎者
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 知者减半，省者全无。
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//i.loli.net/2020/08/10/PkQMGL6pATW1vBg.jpg
  <span class="token key atrule">link</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//www.yuanchengcheng.vip/
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 辰旭博客
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 凤鸣初阳，百鸟朝凰
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//s1.ax1x.com/2020/08/09/aoLTDx.png
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//kareny.cn
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> JokerM's Palace
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> Take your heart
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//jokerm.com/wp<span class="token punctuation">-</span>content/uploads/2020/09/jmflogo.png
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//jokerm.com/
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Saul.J.Wu
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 立身之本，不在高低。
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//sauljwu.github.io/img/logo.jpg
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//sauljwu.github.io/
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Lake's blog
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 不积跬步，无以至千里；不积小流，无以成江海。
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//jsd.cdn.zzko.cn/gh/taixingyiji/image_store@main/blog/logo/img.png
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//taixingyiji.com/
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Cubik的小站
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> RECOMMENDED BY DR.CREATIVE
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//jsd.cdn.zzko.cn/gh/Cubik65536/cubik<span class="token punctuation">-</span>favicons@main/CubikLogo.png
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//www.cubik65536.top/
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> x·π
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 为开发者量身制作的技术博客和知识库管理平台。
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//jsd.cdn.zzko.cn/gh/Ezuy<span class="token punctuation">-</span>Lee/RainzeDrawingBed/media/logo.png
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//ezuy<span class="token punctuation">-</span>lee.github.io/xpai/
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 眼里有光
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 道阻且长，行则将至
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//icooloop.gitee.io/img/logo.jpg
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//icooloop.gitee.io/
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Heo
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 爱折腾的设计师
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//blog.zhheo.com/
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//blog.zhheo.com/img/avatar.png
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Chuyuxuan
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 临渊羡鱼，不如退而结网
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//blog.chuyuxuan.top/
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//blog.chuyuxuan.top/img/avatar1.jpg
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 全栈杂货站
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 千里万里杂货站里，天青色等烟雨，而我在等你。
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//cdn.tea<span class="token punctuation">-</span>culture.top/tech/images/avatar/3.jpg
  <span class="token key atrule">link</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//tech.tea<span class="token punctuation">-</span>culture.top/
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 小鱼博客
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 总是半途而废的废柴
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//jsd.cdn.zzko.cn/gh/xiaoyu<span class="token punctuation">-</span>666/image_store/blog/minion.png
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//xiaoyu<span class="token punctuation">-</span>666.github.io/
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 大胡子
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 记录你我，分享精彩。
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//photo.jakehu.cn/favicon.png
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//www.jakehu.cn
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 嘟先生学WebGL
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 流水不争先，争的是滔滔不绝。
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//joy1412.cn/img/dudu.jpeg
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//joy1412.cn
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">'@小右_'</span>
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 学而不厌 不耻下问
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//lordblog.cn/upload/2021/05/logo%20(4)<span class="token punctuation">-</span>742f1f7e15db44a1b3140035104ea239.png
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//lordblog.cn/
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 途中的树
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 走出自己的傲慢，承认自己的局限。
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//zkpeace.com/blog/img/avatar.jpg
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//zkpeace.com/
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Haobo's Blog
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//discover304.top/
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//discover304.top/img/head.jpg
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 半只脚跨入炼丹师的大门的新人
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 小胖墩er
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 迟到总比不到的好，所以好好加油吧。
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//jsd.cdn.zzko.cn/gh/Chubby<span class="token punctuation">-</span>Duner/image<span class="token punctuation">-</span>hosting@master/blog/logo.jpeg
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//chubbyduner.top
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Joseph Z.
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> Joseph Z.的小站
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//josephz.top/image/avatar.webp
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//josephz.top/
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 二丫讲梵 <span class="token comment"># 昵称</span>
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 💻学习📝记录🔗分享 <span class="token comment"># 介绍</span>
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//wiki.eryajf.net/img/logo.png <span class="token comment"># 头像</span>
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//wiki.eryajf.net/  <span class="token comment"># 链接</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> YoungKbt World	<span class="token comment"># 昵称</span>
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 故事由我书写，旅程由你见证，传奇由她聆听	<span class="token comment"># 介绍</span>
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//jsd.cdn.zzko.cn/gh/Kele<span class="token punctuation">-</span>Bingtang/static/user/avatar2.png	<span class="token comment"># 头像</span>
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//notes.youngkbt.cn/	<span class="token comment"># 链接</span>
<span class="token comment"># - name: XuHuaian,s Blog # 昵称</span>
<span class="token comment">#   desc: 记录自己的工作学习心得，争取当一条有梦想的咸鱼 # 介绍</span>
<span class="token comment">#   avatar: https://dbsecurity.com.cn/images/logo.jpg # 头像</span>
<span class="token comment">#   link: https://dbsecurity.com.cn/# 链接</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> xustudyxu
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 一起学习编程<span class="token tag">!</span>
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//jsd.cdn.zzko.cn/gh/xustudyxu/image<span class="token punctuation">-</span>hosting@master/20220423/01.3d9wrma6qlq0.webp
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//frxcat.fun/
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Yiyang Sun
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> Frontend enthusiast.
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//shaun<span class="token punctuation">-</span>logo.oss<span class="token punctuation">-</span>cn<span class="token punctuation">-</span>beijing.aliyuncs.com/avatar.jpg
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//blog.syy11.cn
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ColorPanda
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 中国語を日本語と英語で勉強。日中家庭の言語教育の悩みを解消したい。
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//colorpanda.aifan.jp/img/logo.png
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//colorpanda.aifan.jp/
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 不器小窝
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 「但知行好事<span class="token punctuation">,</span>莫要问前程」
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//avatars.githubusercontent.com/u/866409<span class="token punctuation">?</span>v=4
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//xingcxb.com/
<span class="token comment"># - name: 七鳄の学习格</span>
<span class="token comment">#   desc: 如果世界多了精彩，每一位都是创造者，大家都是你的观众</span>
<span class="token comment">#   avatar: https://blog.gmcj0816.top/img/SeriousWission_TouXiangPic.jpg</span>
<span class="token comment">#   link: https://blog.gmcj0816.top/</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 从01开始
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 那就从零开始
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//image.peterjxl.com/blog/re0.jpg
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//www.peterjxl.com/
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Gahing's blog <span class="token comment"># 昵称</span>
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 生活之珍爱，余缀于技术之间。 <span class="token comment"># 介绍</span>
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//www.gahing.top/img/avatar.jpeg <span class="token comment"># 头像</span>
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//www.gahing.top/  <span class="token comment"># 链接</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Howietron <span class="token comment"># 昵称</span>
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> Java全站技术博客，积跬步以至千里，致敬每个爱学习的你。 <span class="token comment"># 介绍</span>
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//wiki.howie.top/img/logo.png <span class="token comment"># 头像</span>
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//wiki.howie.top/ <span class="token comment"># 链接</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 菜园前端 <span class="token comment"># 昵称</span>
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> 前端学习笔记分享、小白都能看懂的笔记 <span class="token comment"># 介绍</span>
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//note.noxussj.top/logo.png <span class="token comment"># 头像</span>
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//note.noxussj.top/<span class="token punctuation">?</span>s=y3 <span class="token comment"># 链接</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
<h3 id="友链申请" tabindex="-1"><a class="header-anchor" href="#友链申请" aria-hidden="true">#</a> 友链申请</h3>
<p>与我<RouterLink to="/about/#%E8%81%94%E7%B3%BB"> 联系 </RouterLink>或者 在本页面评论区留言您的友链信息，格式：(点击代码块右上角一键复制)</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Evan's blog <span class="token comment"># 昵称</span>
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> Web前端技术博客，积跬步以至千里 <span class="token comment"># 介绍</span>
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//jsd.cdn.zzko.cn/gh/xugaoyi/image_store/blog/20200103123203.jpg <span class="token comment"># 头像</span>
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//xugaoyi.com/  <span class="token comment"># 链接</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>申请前记得先添加本站哦~</p>
</div></template>


