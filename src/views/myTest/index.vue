<template>
    <div id="photo-shop">
    <pre>
  <div class="notice-items" :ref="options.domId+'_noticeBox'" style="width:(100% -50px);min-height: 20px;">
    <div
      class="notice-items-inner"
      :ref="options.domId+'_noticeInner'"

    >
      <span class="price-scroll" :style="`color:${options.contentOption.basicStyle.color}`" v-for="item in storageItems" :key="item.title">
        <span class="price-title"  >{{item.title}}</span>
        <span class="price-data">
          <span class="price-old">
            <label>{{item.oldval}}</label>
          </span>
          <span style="width: 50px;">
            <label v-if="item.name == 'zp'">持平</label>
            <label v-if="item.name == 'top'" style="color:#EA3B3B;">+{{item.value}}</label>
            <label v-if="item.name == 'fall'" style="color:#2AA857;">-{{item.value}}</label>
            <label v-if="item.name == 'Fair'">-</label>
          </span>
        </span>
      </span>
    </div>
  </div>
  
  // 埋点
  SendLogInfo("103000300014", "删除频道分组", null)
  
  import { SendLogInfo } from "@/jsTool/util";
  
  
  
  
        </pre>
    </div>
  </template>
  
  <script>
    function showFPS(id) {
        let requestAnimationFrame =
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };

        let st = Date.now();
        let tt;
        let fps = 0;
        let frame = 0;

        let calcFPS = function () {
            (function loop() {
                tt = Date.now()
                if (tt > st + 1000) {
                    fps = Math.round((frame * 1000) / (tt - st));
                    st = Date.now();
                    frame = 0;
                    // document.getElementById(id).innerHTML = fps;
                    // console.log('刷新率',fps)
                    // 这个计算方法的问题是当在计算的时候离开本页面，再回来，计算结果会有误
                }
                frame++;
                requestAnimationFrame(loop);
            })();
        }
        calcFPS();

        // 为什么外面获取不到fps
        console.log('刷新率',fps)
    }

  export default {
  
  }
  </script>
  
  <style>
  
  </style>