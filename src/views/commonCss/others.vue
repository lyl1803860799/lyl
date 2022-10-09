<template>
    <div id="others-warpper">
        <div>
            css画一条线
            <div class="icons">
                    <div class="circle">
                        <image class="icon" ></image>
                        <image class="icon" ></image>
                    </div>
                    <div class="horizon"></div>
            </div>

            css画三角形
            <div class="triangle"></div>

            svg画扇形
            <svg width="178" :height="178">
                <path d="M 177.13 101.39 A 89 89 0 0 0 65.97 3.03 L 89 89 Z" fill="#00adb5"></path>
            </svg>



            卡卷
            <div class="hollow-compose">
                <div class="hollow-compose-many-circles"></div>
            </div>


            生成小于12px的文字 font-size=7
            <svg width="195.6162109375" height="8.52">
                <text
                    dominant-baseline="baseline"
                    font-size="7"
                    y="6.52"
                    style="line-height: 1; vertical-align: middle;"
                >
                    千山鸟飞绝 - from hill to hill no bird in flight
                </text>
            </svg>
            <!-- 使用 svg 作为解决小于 12px 字号文字的方案：使用 transform: scale() 设置后占位区域并没有改变，难以调节对齐方式。使用 canvas 无法选中文字（也可以解决，但不如 svg 简洁） -->


            模拟滤镜
            <img src="../../assets/img/camera/camera_31.png" class="img-fliter" alt="">

            模拟ps混合模式
            <img src="../../assets/img/camera/camera_31.png" class="img-fliter2" alt="">


            list-style
            <ul class="list-style">
                <li>热污染</li>
                <li>威尔而</li>
                <li>特特</li>
                <li>温热</li>
                <li>问题问题</li>
            </ul>
            



            加载动画
            <div class="loader-container">
                <div class="loader-child"></div>
                <div class="loader-child"></div>
                <div class="loader-child"></div>
            </div>


            <div class="load-container2">
                <div class="boxLoading"></div>
            </div>


            <div class="load-container3">
                <div class="container">
                    <div class="boxLoading boxLoading1"></div>
                    <div class="boxLoading boxLoading2"></div>
                    <div class="boxLoading boxLoading3"></div>
                    <div class="boxLoading boxLoading4"></div>
                    <div class="boxLoading boxLoading5"></div>
                </div>
            </div>


            <div style="width:300px;height:300px;background-color: red;" class="point-style">
                鼠标样式
            </div>
            

            单行文字超出显示省略号
            <div class="shengluehao">
                瓦尔非法违法未分割个人各个人个人个人个人个人更感人
            </div>


            css实现换行
            <div class="content">
                <span class="br">海客談瀛洲，煙濤微茫信難求。</span>
                <span class="br">越人語天姥，雲霞明滅或可覩。</span>
                <span class="br">天姥連天向天橫，勢拔五嶽掩赤城。</span>
                <span class="br">天台四萬八千丈，對此欲倒東南傾。</span>
            </div>


            tab底部追随动画
            <ul class="tabs">
                <li>tab1</li>
                <li>威尔而</li>
                <li>特特</li>
                <li>温热</li>
                <li>问题问题</li>
            </ul>
            
        </div>
    </div>
  </template>
  
  <script>
  
  export default {
    methods: {
    }
  }
  </script>
  
<style lang="less" scoped>
#others-warpper {
    .icons{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .icon{
            padding-right: 20rpx;
            width: 90rpx;
            height: 90rpx;
        }
        .circle{
            width: 100%;
            display: flex;
            justify-content: flex-end;
        }
        .horizon{
            width: 50%;
            height: 1px;
            background-color: #be3131;
            position: absolute;
        }
    }



    .triangle {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 50px 100px 50px;
        // 等边 0 50px 86.6px 50px;
        border-color: transparent transparent #00adb5 transparent;
    }


    .hollow-compose {
        .hollow-compose-many-circles {
            width: 300px;
            height: 100px;
            position: relative;
            background: radial-gradient(circle at right top, transparent 11px, #00adb5 0) top left / 60px 51% no-repeat,
                radial-gradient(circle at right bottom, transparent 11px, #00adb5 0) bottom left /60px 51% no-repeat,
                radial-gradient(circle at left top, transparent 11px, #eeeeee 0) top right /240px 51% no-repeat,
                radial-gradient(circle at left bottom, transparent 11px, #eeeeee 0) bottom right /240px 51% no-repeat;
            filter: drop-shadow(2px 2px 2px rgba(0,0,0,.2));
            }

        .hollow-compose-many-circles::before {
            content: '';
            height: 78px;
            border: 1px dashed #fff;
            position: absolute;
            left: 60px;
            top: 0;
            bottom: 0;
            margin: auto;
        }

        .hollow-compose-many-circles::after {
            content: '';
            position: absolute;
            height: 100%;
            width:5px;
            top: 0;
            right: -5px;
            background-image: linear-gradient(to bottom, #eeeeee 5px, transparent 5px, transparent),
            radial-gradient(10px circle at 5px 10px, transparent 5px, #eeeeee 5px);
            background-size: 5px 15px;
        }
    }



    .img-fliter {
        // 透明度
        // opacity: 0.5;
        // 高斯模糊
        // filter: blur(8px);
        // -webkit-filter: blur(8px);
        // 调整图像的对比度。值是0%的话，图像会全黑。值是100%，图像不变。值可以超过100%，意味着会运用更低的对比。若没有设置值，默认是1。
        // filter: contrast(500%)
        // 将图像转换为灰度图像。值定义转换的比例。值为100%则完全转为灰度图像，值为0%图像无变化。
        // filter: grayscale(100%)
        // 给图像应用色相旋转。“angle”一值设定图像会被调整的色环角度值。值为0deg，则图像无变化。若值未设置，默认值是0deg。该值虽然没有最大值，超过360deg的值相当于又绕一圈。
        // filter: hue-rotate(300deg);
        // 转换图像饱和度。值定义转换的比例。值为0%则是完全不饱和，值为100%则图像无变化。其他值，则是效果的线性乘子。超过100%的值是允许的，则有更高的饱和度
        // filter: saturate(200%)
        // 调节图像的曝光度。使其看起来更亮或更暗。如果值是0%，图像会全黑。值是100%，则图像无变化。其他的值对应线性乘数效果。值超过100%也是可以的，图像会比原来更亮。
        // filter: brightness(30%)
        // 反转输入图像。值定义转换的比例。100%的价值是完全反转。值为0%则图像无变化。
        filter: invert(300%)

    }



    
    .img-fliter2{
        // mix-blend-mode: multiply; screen;soft-light;multiply;
        mix-blend-mode: difference;
        // https://www.cnblogs.com/coco1s/p/6829372.html
    }






    .list-style {
        list-style-type: circle; //decimal;
        list-style-position: inside; // outside
        // list-style-image: url(../../assets/img/camera/camera_31.png);
    }





    .loader-container {
        width: 100px;
        height: 100px;
        perspective: 780px;
        position: relative;


        .loader-child {
            position: absolute;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border-radius: 50%;

            &:nth-of-type(1) {
                left: 0%;
                top: 0%;
                animation: rotate-one 1.15s linear infinite;
                border-bottom: 3px solid #5c5edc;
            }
            &:nth-of-type(2) {
                right: 0%;
                top: 0%;
                animation: rotate-two 1.15s linear infinite;
                border-right: 3px solid #9e85c3;
            }
            &:nth-of-type(3) {
                right: 0%;
                bottom: 0%;
                animation: rotate-three 1.15s linear infinite;
                border-top: 3px solid #e9908a;
            }
            }

            @keyframes rotate-one {
            0% {
                transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
            }
            100% {
                transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
            }
            }

            @keyframes rotate-two {
            0% {
                transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
            }
            100% {
                transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
            }
            }

            @keyframes rotate-three {
            0% {
                transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
            }
            100% {
                transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
            }
        }
    }

       
    

    .load-container2 {
        position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  .boxLoading {
    width: 50px;
    height: 50px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    &:before {
      content: "";
      width: 50px;
      height: 5px;
      background: #000;
      opacity: 0.1;
      position: absolute;
      top: 59px;
      left: 0;
      border-radius: 50%;
      animation: shadow 0.5s linear infinite;
    }
    &:after {
      content: "";
      width: 50px;
      height: 50px;
      background: #00adb5;
      animation: animate 0.5s linear infinite;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 3px;
    }
  }

@keyframes animate {
  17% {
    border-bottom-right-radius: 3px;
  }
  25% {
    transform: translateY(9px) rotate(22.5deg);
  }
  50% {
    transform: translateY(18px) scale(1, 0.9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }
  75% {
    transform: translateY(9px) rotate(67.5deg);
  }
  100% {
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes shadow {
  0%,
  100% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1);
  }
}
    }



    .load-container3 {
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        .container{
            width: 50px;
            height: 60px;
            text-align: center;
            font-size: 10px;
            .boxLoading {
                background-color: #00adb5;
                height: 100%;
                width: 6px;
                display: inline-block;

                -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
                animation: stretchdelay 1.2s infinite ease-in-out;
            }
            .boxLoading2 {
                -webkit-animation-delay: -1.1s;
                animation-delay: -1.1s;
            }
            .boxLoading3 {
                -webkit-animation-delay: -1.0s;
                animation-delay: -1.0s;
            }
            .boxLoading4 {
                -webkit-animation-delay: -0.9s;
                animation-delay: -0.9s;
            }
            .boxLoading5 {
                -webkit-animation-delay: -0.8s;
                animation-delay: -0.8s;
            }

            @-webkit-keyframes stretchdelay {
            0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
            20% { -webkit-transform: scaleY(1.0) }
            }
            @keyframes stretchdelay {
            0%, 40%, 100% {
                transform: scaleY(0.4);
                -webkit-transform: scaleY(0.4);
            }  20% {
                transform: scaleY(1.0);
                -webkit-transform: scaleY(1.0);
            }
            }
        }
    }





    .point-style {
        // cursor: pointer;
        // cursor: text;
        cursor: none; //progress; wait;crosshair;no-drop;not-allowed;cell;grabbing;grab;all-scroll;move;col-resize;row-resize;n-resize;
        // se-resize;s-resize;e-resize;ne-resize
        // zoom-in;zoom-out
    }



    // 注意宽度是必须的
    .shengluehao {
        border: 1px solid red;
        width: 300px;
        // height: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;


        // 多行文本
        // display: -webkit-box;
        // word-break: break-all;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 4; //需要显示的行数
        // overflow: hidden;
        // text-overflow: ellipsis;


        // less/scss混合
        // @mixin textEllipsis($lineNum) {
        //     @if $lineNum == 1 {
        //         overflow: hidden;
        //         text-overflow: ellipsis;
        //         white-space: nowrap;
        //     } @else {
        //         display: -webkit-box;
        //         word-break: break-all;
        //         -webkit-box-orient: vertical;
        //         -webkit-line-clamp: $lineNum; //需要显示的行数
        //         overflow: hidden;
        //         text-overflow: ellipsis;
        //     }
        // }
    }




    .content {
        .br::after {
            content: "\A";
            white-space: pre;
        }
    }






    .tabs {
        li {
        color: #909399;
        background-color: #fff;
        &::after {
            content: "";
            width: 0;
            height: 2px;
            background-color: #00adb5;
            position: absolute;
            left: 100%;
            bottom: 0;
            transition: all .4s;
        }

        &:hover {
            color: #00adb5;
            &::after {
            width: 100%;
            left: 0;
            transition-delay: 0.1s;
            }
            & ~ li::after {
            left: 0;
            }
        }
        }
    }






    
}
</style>