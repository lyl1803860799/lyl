<template>
    <div id="common-button">
      <button class="button">点击特效</button>


      <div class="wrap-two">
        <button class="button-two">渐变色按钮
          <div class="button-two2"></div>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    methods: {
      handleClick(link) {
        // console.log(link)
        if(link.href) {
          // let ele = document.getElementById("camera-container");
          // let ele = this.$refs.cameraWrapper.getElementById("camera-container");
          // let ele = this.$refs.cameraWrapper.refs.one
          // let ele = this.$refs.cameraWrapper.$el.children;
          // console.log(ele.childNodes)
          // let ele = this.$refs.cameraWrapper.$el.getElementById("camera-container");
          // let ele = this.$refs.cameraWrapper.$el.getElementByTagName("h2");
          // this.$refs.cameraWrapper.$el.getElementByTagName is not a function   为什么not a function
          // let ele = document.getElementsByClassName("camera-wrapper")[0].getElementById("one");
          // getElementById是不允许二级获取的
          let ele = document.getElementsByClassName("camera-wrapper")[0].getElementsByTagName("h2")[0];
          console.log(ele)
          ele && ele.scrollIntoView({block: 'start', behavior: 'smooth'});
        }
      },
    }
  }
  </script>
  
  <style lang="less" scoped>
  #common-button {
    .button {
      display: inline-block;
      padding: 1em 2em;
      background-color: #ff0081;
      /* background-color: transparent; */
      color: #fff;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      position: relative;
      box-shadow: 0 2px 25px rgba(233, 30, 99, 0.5);
      outline: 0;
      transition: transform ease-in 0.1s, background-color ease-in 0.1s,  box-shadow ease-in 0.25s;
    }

    .button::before{
      position: absolute;
      content: '';
      left: -2em;
      right: -2em;
      top: -2em;
      bottom: -2em;
      pointer-events: none;
      transition: ease-in-out .5s;
      background-repeat: no-repeat;
      background-image: radial-gradient(circle, #ff0081 20%, transparent 20%), 
      radial-gradient(circle, #ff0081 20%, transparent 20%), 
      radial-gradient(circle, #ff0081 20%, transparent 20%), 
      radial-gradient(circle, #ff0081 20%, transparent 20%), 
      radial-gradient(circle, #ff0081 20%, transparent 20%), 
      radial-gradient(circle, #ff0081 20%, transparent 20%), 
      radial-gradient(circle, #ff0081 20%, transparent 20%), 
      radial-gradient(circle, #ff0081 20%, transparent 20%), 
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      /*  */
      radial-gradient(circle, #ff0081 20%, transparent 20%), 
      radial-gradient(circle, #ff0081 20%, transparent 20%), 
      radial-gradient(circle, #ff0081 20%, transparent 20%),
      radial-gradient(circle, #ff0081 20%, transparent 20%), 
      radial-gradient(circle, #ff0081 20%, transparent 20%), 
      radial-gradient(circle, #ff0081 20%, transparent 20%), 
      radial-gradient(circle, #ff0081 20%, transparent 20%);
      background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%,
      15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
      background-position: 18% 40%, 20% 31%, 30% 30%, 40% 30%, 50% 30%, 57% 30%, 65% 30%, 80% 32%, 15% 60%,
      83% 60%, 18% 70%, 25% 70%, 41% 70%, 50% 70%, 64% 70%, 80% 71%;
      animation: bubbles ease-in-out .75s forwards;
    }

    .button:active {
      transform: scale(0.95);
      background-color: #f3037c;
      box-shadow: 0 2px 25px rgba(233, 30, 99, 0.5);
    }
    .button:active::before {
      animation: none;
      background-size: 0;
    }
    @keyframes bubbles {
      0% {
        background-position: 18% 40%, 20% 31%, 30% 30%, 40% 30%, 50% 30%, 57% 30%, 65% 30%, 80% 32%, 15% 60%,
      83% 60%, 18% 70%, 25% 70%, 41% 70%, 50% 70%, 64% 70%, 80% 71%;
      }
      50% {
        background-position: 10% 44%, 0% 20%, 15% 5%, 30% 0%, 42% 0%, 62% -2%, 75% 0%, 95% -2%, 0% 80%,
      95% 55%, 7% 100%, 24% 100%, 41% 100%, 55% 95%, 68% 96%, 95% 100%;
      }
      100% {
        background-position: 5% 44%, -5% 20%, 7% 5%, 23% 0%, 37% 0, 58% -2%, 80% 0%, 100% -2%, -5% 80%,
      100% 55%, 2% 100%, 23% 100%, 42% 100%, 60% 95%, 70% 96%, 100% 100%;
        background-size: 0% 0%;
      }
    }







    .wrap-two {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .button-two {
        width: 140px;
        height: 45px;
        color: #fff;
        font-family: 'Roboto', sans-serif;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 2.5px;
        font-weight: 500;
        background-color: #fff;
        border: none;
        border-radius: 45px;
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease 0s;
        cursor: pointer;
        outline: none;
        background: linear-gradient(-45deg, #ffa63d, #ff3d77, #338aff, #3cf0c5);
        background-size: 600%;
        -webkit-animation: anime 6s linear infinite;
        animation: anime 6s linear infinite;
        text-align: center;
        }

      .button-two:hover {
        background-color: linear-gradient(-45deg, #ffa63d, #ff3d77, #338aff, #3cf0c5);
        box-shadow: linear-gradient(-45deg, #ffa63d, #ff3d77, #338aff, #3cf0c5);
        color: #fff;
        transform: translateY(-7px);
      }

      .button-two2 {
          position: absolute;
          margin-top: -70px;
          z-index: -1;
          filter: blur(30px);
          opacity: 0.8;
        }

      @keyframes anime {
      0% {
      background-position: 0% 50%;
      }
      50% {
      background-position: 100% 50%;
      }
      100% {
      background-position: 0% 50%;
      }
      }

      @-webkit-keyframes anime {
      0% {
      background-position: 0% 50%;
      }

      50% {
      background-position: 100% 50%;
      }

      100% {
      background-position: 0% 50%;
      }
      }
    }
  }
  </style>