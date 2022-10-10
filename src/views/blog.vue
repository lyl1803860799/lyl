<template>
    <div id="others-warpper">
        <link-list :dataList="dataList" :other="true" />


        <link-list :dataList="dataList2" :other="true" />

        <link-list :dataList="dataList3" :other="true" />


        github token: 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
    </div>
  </template>
  
  <script>
  import LinkList from '@/components/linkList';
  export default {
    components: { LinkList },
    data() {
        return {
            dataList: [
                {
                    key: 0,
                    text: 'js每日tip',
                    url: 'https://www.jstips.co/zh_CN/',
                },
                {
                    key: 1,
                    text: '闪击工作台',
                    url: 'https://nav.sankki.com/#/index',
                },
                {
                    key: 2,
                    text: '源码讲解视频',
                    url: 'https://link.juejin.cn/?target=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2FBV1LE411e7HE',
                },
                {
                    key: 3,
                    text: '算法讲解',
                    url: 'https://link.juejin.cn/?target=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2FBV1wA411b7qZ',
                },
                {
                    key: 4,
                    text: '每日一题',
                    url: 'https://juejin.cn/user/3456520288996157/posts',
                },
                {
                    key: 5,
                    text: '优秀的前端开源项目',
                    url: 'https://github.com/FrontEndGitHub/FrontEndGitHub',
                },
                {
                    key: 6,
                    text: 'thinkPHP',
                    url: 'https://www.kancloud.cn/manual/thinkphp6_0#/dashboard',
                }
                
            ],
            dataList2: [
                {
                    key: 0,
                    text: 'mongodb中文网',
                    url: 'https://mongodb.net.cn/',
                },
                {
                    key: 1,
                    text: '视频',
                    url: 'https://www.bilibili.com/video/BV1FP4115739?is_story_h5=false&p=1&share_from=ugc&share_medium=android&share_plat=android&share_session_id=43ca547c-acff-4a67-9391-997ecd3e12a1&share_source=WEIXIN&share_tag=s_i&timestamp=1663290798&unique_k=5RK8QNm',
                },
                {
                    key: 2,
                    text: '资源导航',
                    url: 'https://www.code-nav.cn/resources',
                },
                {
                    key: 3,
                    text: 'Python学习',
                    url: 'https://github.com/jackfrued/Python-100-Days',
                },
                {
                    key: 4,
                    text: 'java',
                    url: 'https://codegym.cc/zh/',
                },
                {
                    key: 5,
                    text: '前端导航',
                    url: 'https://fire100.top/',
                },
                {
                    key: 6,
                    text: '前端文章',
                    url: 'https://juejin.cn/post/6844904116339261447',
                }
                
            ],
            dataList3: [
                {
                    key: 0,
                    text: 'TypeScript 中文手册',
                    url: 'https://typescript.bootcss.com/',
                },
                {
                    key: 1,
                    text: '数据结构与算法',
                    url: 'https://www.conardli.top/',
                },
                {
                    key: 2,
                    text: '资源导航',
                    url: 'https://www.code-nav.cn/resources',
                },
                {
                    key: 3,
                    text: 'Python学习',
                    url: 'https://github.com/jackfrued/Python-100-Days',
                },
                {
                    key: 4,
                    text: 'java',
                    url: 'https://codegym.cc/zh/',
                },
                {
                    key: 5,
                    text: '前端导航',
                    url: 'https://fire100.top/',
                },
                {
                    key: 6,
                    text: '前端文章',
                    url: 'https://juejin.cn/post/6844904116339261447',
                }
                
            ],
        }
    },
    methods: {
        xx() {
            let urls = `https://juejin.cn/post/6844904022260842504#comment

https://blog.csdn.net/weixin_43521592/article/details/108910779

https://juejin.cn/post/6986910859847024648#heading-8

https://juejin.cn/post/6844904031807094798#heading-0
https://blog.csdn.net/weixin_67281781/article/details/123799052

https://juejin.cn/post/7093670296888016933#comment

https://blog.csdn.net/pan_junbiao/article/details/85004464
https://blog.csdn.net/m0_50217781/article/details/112485241

https://juejin.cn/post/6844903428590665735#comment






https://github.com/honghuangdc/soybean-admin
https://github.com/iczer/vue-antd-admin
https://github.com/zuiidea/antd-admin
https://github.com/epicmaxco/vuestic-admin
https://github.com/d2-projects/d2-admin
https://github.com/chuzhixin/vue-admin-better
https://github.com/iview/iview-admin
https://www.free-api.com/
https://github.com/Tencent/cherry-markdown/blob/main/README.CN.md
https://github.com/Z4nzu/hackingtool
https://github.com/byoungd/English-level-up-tips-for-Chinese
https://www.pdai.tech/
https://github.com/Snailclimb/JavaGuide
http://www.godbasin.com/
https://cssbuttons.io/buttons
https://www.kancloud.cn/alex_wsc/dataalg
https://codegen.bqrdh.com/
https://github.com/liyupi/free-programming-resources/tree/main/%E9%A1%B9%E7%9B%AE%E5%AE%9E%E6%88%98#Java%E4%BB%A3%E7%A0%81%E5%90%88%E9%9B%86
https://blog.csdn.net/weixin_43638968/article/details/107518108
https://www.mianshiya.com/user/login?redirect=https%3A%2F%2Fwww.mianshiya.com%2F
https://github.com/PanJiaChen/vue-element-admin
https://github.com/phodal/designiot
https://neteasecloudmusicapi.vercel.app
https://github.com/wenmingvs/WeiBo
https://github.com/chaychan/TouTiao
https://github.com/running-libo/Tiktok
https://github.com/boyan01/flutter-netease-music
https://github.com/xujiyou/zhihu-flutter
http://www.paopaohouse.cn/site
https://moyu.games
https://www.hvzhan.com
https://creatorsdaily.com/
https://nav.yyqing.net/
https://tools.miku.ac/
https://www.iamwawa.cn/
http://www.wetools.com/
https://github.com/HalseySpicy/Geeker-Admin
https://github.com/GeekQiaQia/vue3.0-template-admin
https://github.com/cmdparkour/vue-admin-box`
        
            

            let urls2 =`https://www.toolmao.com/
https://www.sensetime.com/cn
https://juejin.cn/post/6844903516822044680#comment
https://github.com/muwoo/blogs/issues/49
https://www.fly63.com/tool/textdiff/

https://www.kancloud.cn/appexplore/coolist-windows
https://risingstars.js.org/2021/zh#section-framework
https://juejin.cn/post/7060292943608807460#comment
https://juejin.cn/post/7069468539412807693#comment
https://github.com/semlinker/awesome-typescript
https://github.com/HalseySpicy/Geeker-Admin
https://github.com/pipipi-pikachu/PPTist
https://zhuanlan.zhihu.com/p/364010197
https://zhuanlan.zhihu.com/p/556394024
https://zhuanlan.zhihu.com/p/548775285
https://segmentfault.com/a/1190000040582994#comment-area
https://juejin.cn/post/6844904186266517518#comment
https://github.com/ascoders/weekly
https://www.ziyinba.top/
https://juejin.cn/post/6844903613790175240?utm_medium=fe&utm_source=weixinqun#comment
https://juejin.cn/post/6844903536900177928#comment
https://www.kancloud.cn/digest/understandingnginx#/catalog
https://www.kancloud.cn/kancloud/learn-python-hard-way#/catalog
https://juejin.cn/post/7058868160706904078#comment
https://blog.csdn.net/qq_15987295/article/details/79489036
https://juejin.cn/post/7046169975706353701#comment
https://juejin.cn/post/6844903520441729037#comment
https://juejin.cn/post/6969733494754770952#comment
https://juejin.cn/post/7057443820115329055#comment
https://juejin.cn/post/7058201396113309703#comment
https://github.com/weizhanzhan/vue3-ts-template-h5
https://juejin.cn/post/7054317318343491615#comment
https://juejin.cn/post/7006108454028836895#comment
https://www.kancloud.cn/kancloud/pack#/catalog
https://www.kancloud.cn/thinkphp/linux-command-line#/catalog
https://www.kancloud.cn/manual/thinkphp6_0#/dashboard
https://www.kancloud.cn/cyyspring/vuejs
https://www.kancloud.cn/spirit-ling/http-study#/dashboard
https://www.kancloud.cn/wizardforcel/vbird-linux-basic-4e#/catalog
https://www.kancloud.cn/pwstrick/fe-questions#/dashboard
https://www.kancloud.cn/xiak/php-node#/catalog
https://www.kancloud.cn/digest/html5#/catalog
https://juejin.cn/post/6844903568130965517#comment
https://github.com/bailicangdu/vue2-elm
https://github.com/EtherDream/jsproxy/
http://hizzgdev.github.io/jsmind/developer.html
https://blog.csdn.net/weixin_46806288/article/details/124952885
https://www.kancloud.cn/idcpj/python/418553
https://juejin.cn/post/6844903582676811790#comment
https://juejin.cn/post/6844903520466894862#comment
https://zhuanlan.zhihu.com/p/37864523
https://segmentfault.com/a/1190000010106158?utm_source=tuicool&utm_medium=referral
https://github.com/bailicangdu/node-elm

https://www.zhihu.com/question/55617707

https://www.tuicool.com/mags
http://site.damobing.com/webpack/
https://juejin.cn/post/6844903622501728263#comment
https://juejin.cn/post/6844903624531935246
https://www.kancloud.cn/zmwtp/vue2/148822
https://www.yuque.com/vueconf/mkwv0c`





let urls3 =`https://hexo.io/zh-cn/
https://www.vuepress.cn/
https://www.byhy.net/tut/py/basic/01/#%E7%AC%AC%E4%B8%80%E4%B8%AApython%E7%A8%8B%E5%BA%8F
http://caibaojian.com/vue-design/art/
https://github.com/MisterBooo/LeetCodeAnimation
https://github.com/trekhleb/javascript-algorithms
https://segmentfault.com/a/1190000040481518

https://github.com/macrozheng/mall-learning
https://wangdoc.com/javascript/
https://es6.ruanyifeng.com/
https://blog.poetries.top/node-learning-notes/notes/base/01-%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA.html#node-js-%E6%A8%A1%E5%9D%97
https://csscoco.com/inspiration/#/./init
https://lhammer.cn/You-need-to-know-css/#/zh-cn/
https://github.com/QiShaoXuan/css_tricks
https://tobiasahlin.com/spinkit/
https://color.oulu.me/
https://www.tailwindcss.cn/

https://interview2.poetries.top/wx-article/

https://naotu.baidu.com/home
http://blog.poetries.top/archives/

http://latentflip.com/loupe

https://hejialianghe.gitee.io/
https://github.com/AobingJava/JavaFamily

https://blog.poetries.top/handbook/
https://nav.poetries.top/
https://github.com/The-Run-Philosophy-Organization/run
https://github.com/sunym1993/flash-linux0.11-talk
https://github.com/zijie0/HumanSystemOptimization

https://halo.run/
https://leetcode-solution-leetcode-pp.gitbook.io/leetcode-solution/
https://github.com/biaochenxuying/blog/issues/43
https://github.com/biaochenxuying/blog/issues/47
https://github.com/OpenEthan/SMSBoom
https://github.com/easychen/lean-side-bussiness
https://github.com/GrowingGit/GitHub-Chinese-Top-Charts/blob/master/content/charts/new_repo/knowledge/All-Language.md
https://github.com/Wechat-ggGitHub/Awesome-GitHub-Repo
https://github.com/Codennnn/vue-color-avatar
https://github.com/Le-niao/Yunzai-Bot
https://github.com/pofey/movie_robot
https://github.com/liyupi/yuindex
https://github.com/LinuxSuRen/remote-jobs-in-china
https://github.com/GrowingGit/GitHub-Chinese-Top-Charts/blob/master/content/charts/overall/software/All-Language.md
https://algorithm-visualizer.org/divide-and-conquer/bucket-sort
https://github.com/MisterBooo/LeetCodeAnimation

https://woai3c.gitee.io/introduction-to-front-end-engineering/#%E7%AE%80%E4%BB%8B

https://gamemaker.weixin.qq.com/#/

https://github.com/lihongxun945/gobang
https://github.com/kon9chunkit/GitHub-Chinese-Top-Charts
https://github.com/the1812/Bilibili-Evolved
https://gitee.com/lvyeyou/DaShuJuZhiDaPingZhanShi
https://github.com/wzpan/wukong-robot
https://cook.aiurs.co/
https://github.com/fangzesheng/free-api
https://www.mvcat.com/
https://www.airpano.org.cn/
https://www.maliquankai.com/
https://creatorsdaily.com/
https://www.sxsoft.com/
https://hellogithub.com/
https://vvbin.cn/doc-next/
https://www.thosefree.com/
https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/master/README-zh_CN.md
https://1loc.dev/
https://www.nodejs.red/
https://www.githubs.cn/
https://vuejsexamples.com/
https://tsejx.github.io/vue-guidebook/
http://ife.baidu.com/
https://github.com/javaLuo/vue-puzzle-vcode
https://github.com/lin-xin/vue-manage-system
https://vvbin.cn/next/#/dashboard/analysis
https://www.gugeapps.net/
https://www.zygx8.com/
https://github.com/GrowingGit/GitHub-Chinese-Top-Charts
https://www.spiderflow.org/
https://docs.qq.com/doc/DWmdRdGJIWXRCbWFt
https://www.animejs.cn/
https://github.com/vipstone/faceai
https://gitee.com/lvyeyou/DaShuJuZhiDaPingZhanShi
https://www.soumao.cc/
https://github.com/shmilylty/awesome-hacking
https://crxdown.com/
https://github.com/azl397985856/fe-interview
https://github.com/qiurunze123/miaosha
https://juejin.cn/post/7068557751240114189
https://github.com/qier222/YesPlayMusic
https://github.com/ustbhuangyi/better-scroll
https://gradihunt.com/
https://www.libhunt.com/l/javascript
http://listen1.github.io/listen1/
https://manaai.cn/
https://github.com/fangzesheng/free-api
http://www.qilin668.com/
https://www.swiper.com.cn/
https://github.com/0voice/from_coder_to_expert
https://www.bazhuayu.com/
https://qiankun.umijs.org/zh
https://cn.sli.dev/
https://cloud.baidu.com/product/imageprocess/enhancement
https://www.lanrenexcel.com/
https://gitee.com/iGaoWei/big-data-view
https://www.dute.org/
https://tilipa.zlsam.com/
https://github.com/MathewSachin/Captura
https://www.diyijc.com/
https://files.community/
https://github.com/oldboyxx/jira_clone
https://github.com/wzpan/wukong-robot
https://github.com/GitSquared/edex-ui
https://github.com/th
https://github.com/Zettlr/Zettlr
https://github.com/ageitgey/face_recognition
https://github.com/modood/Administrative-divisions-of-China
https://github.com/lenve/vhr
https://github.com/marktext/marktext
https://github.com/genaller/genal-chat
https://github.com/HaujetZhao/QuickCut
https://github.com/tsayen/dom-to-image
https://gitee.com/gvp/all
https://github.com/babysor/MockingBird
https://github.com/Hunlongyu/ZY-Playere1812/Bilibili-Evolved
https://github.com/MrLevo520/Mini-Python-Project
http://lbsyun.baidu.com/index.php
https://www.ainav.cn/
http://wumei.live/
https://www.52pojie.cn/index.php
http://datav.jiaminghi.com/
https://github.com/freefq/free
http://api.btstu.cn/
http://www.design-code.cn/
https://hellowindows.cn/
https://hu-snail.github.io/vue3-resource/
https://navnav.co/
https://github.com/GorvGoyl/Clone-Wars
https://mp.weixin.qq.com/s/RyqO8ry29zAL40ToVitxTQ
http://www.notcot.org/
https://www.chengxuchu.com/#/
https://github.com/easychen/howto-make-more-money
https://www.meiye.art/inspiration
https://www.thosefree.com/
https://github.com/Liiked/VS-Code-Extension-Doc-ZH
https://github.com/dunwu/nginx-tutorial
https://lefex.gitee.io/books/
https://github.com/qiushi123/xiaochengxu_demos
https://github.com/huaize2020/awesome-nodejs
https://www.scaugreen.cn/posts/44755/
https://www.bilibili.com/video/BV16L411n7Pi/
https://github.com/pingan8787/Leo-JavaScript
https://github.com/kesixin/QuestionWechatApp
https://blog.csxiaoyao.com/archives/category/frontend
https://github.com/csxiaoyaojianxian/JavaScriptStudy
https://github.com/course-dasheng/fe-algorithm
https://github.com/webVueBlog/Leetcode
https://github.com/nocobase/nocobase/blob/main/README.zh-CN.md
https://github.com/videojs/video.js
https://github.com/troyeguo/koodo-readerhttps://github.com/x-extends/vxe-table`





let urls4 =`


https://github.com/ai/nanoid
用于生成随机 ID 的 JS 库
● 小巧：无依赖，仅 130 字节
● 快速：比 UUID 快 60%
● 安全：加密的强随机 API，可在集群中使用
● 紧凑：它使用比 UUID 更大的字母表
● 易用：已移植到 20 多种编程语言



https://github.com/woai3c/visual-drag-demo

https://github.com/jamiebuilds/tinykeys  极小的键盘事件监听库



一款 HTML 演示框架。让你摆脱传统死板的 PPT 制作方法，可以方便地使用 HTML、Markdown 语言制作 PPT
https://github.com/hakimel/reveal.js




高颜值的第三方网易云播放器。它不仅拥有简洁美观的外观，还有丰富的功能
● 支持 Windows/macOS/Linux
● 私人 FM/每日推荐歌曲
● 网易云账号登录
● 歌词显示
● 自定义快捷键和全局快捷键
● 等等
https://github.com/qier222/YesPlayMusic



基于 Electron 开发的开源插件化工具箱。起初项目作者是 uTools 的用户但 uTools 没有开源，他又想接入公司内部的工具，然后 Rubick（拉比克）就诞生了。它实现了 uTools 的大部分功能，可以适配 uTools 丰富的开源插件，享受用完即走的便利
https://github.com/rubickCenter/rubick


支持实时协作的富文本 WYSIWYG 编辑器
https://github.com/ether/etherpad-lite


https://www.hellogithub.com/


https://github.com/FrontEndGitHub/FrontEndGitHub

https://github.com/topics/frontend

https://github.com/trending`
        }
        
    }
  }
  </script>
  
<style lang="less" scoped>
#others-warpper {
    height: 100%;
    // background: url('../assets/img/yuanshen6.svg');
    // yuanshen2
    background-size: cover;
}
</style>