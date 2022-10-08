<template>
  <div id="css-wrapper">
      <pre>1.flex布局
          弹性布局"，用来为盒状模型提供最大的灵活性。设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。

任何一个容器都可以指定为Flex布局。

有六个属性设置在box父容器上，来控制子元素的显示方式；分别是：
flex-direction    设置主轴对齐方式  默认 row  x轴从左到右,一般就用到column和row；
flex-wrap   子元素换行的方式  默认nowrap，如果子元素超过父元素的宽度或者高度，会自动在主轴方向压缩 ，wrap：换行，第二行在第一行下面，从左到右；
flex-flow   flex-direction和flex-wrap的简写 默认row nowrap；
justify-content  子元素的对齐方式  默认flex-start  左对齐；flex-end：右对齐；center： 居中；space-between：两端对齐，项目之间的间隔都相等。space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
align-items   交叉轴如何对齐，如果flex-direction：row和row-reverse  那么交叉轴就是y轴，如果是column和column-reverse那么交叉轴是x轴；flex-start：交叉轴的起点对齐；center：交叉轴的中点对齐。
align-content 一般少用


有六个属性设置在子元素项目上：     
order  order  子元素排列的位置默认是按照html先后顺序来排列的，html结构谁在前面默认就排列在前面；order的作用就是改变子元素排列顺序；order：默认（0） 值越小越靠前，
flex-grow 放大比例  默认是0   当有放大空间的时候，值越大，放大的比例越大；1的时候会占满能剩余空间（0-1）
flex-shrink flex-shrink:缩小比例  默认是1  值越大，缩小的时候比例越小（》=1）
flex-basis 根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。 flex-basis：200px  ，如果项目有多余的空间，设置为200px。那么会放大到200的宽度；
flex  flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。 flex:1 相当于 flex:1 1 auto
align-self align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。auto | flex-start | flex-end | center | baseline | stretch;

  2.让元素不见的方法
  1）v-if、v-show  (v-show设置不见的还会占位置吗)
  2）display：none
  3）高度设置0 -》 有的时候在会影响页面布局的情况下，可以试试设置高度0
  4）透明度0


  3.cursor语法：
cursor : auto | crosshair | default | hand | move | help | wait | text | w-resize |s-resize | n-resize |e-resize | ne-resize |sw-resize | se-resize | nw-resize |pointer | url (url)

常用cursor光标说明

1）、div{ cursor:default }默认正常鼠标指针
2）、div{ cursor:hand }和div{ cursor:text } 文本选择效果
3）、div{ cursor:move } 移动选择效果
4）、div{ cursor:pointer } 手指形状 链接选择效果
5）、div{ cursor:url(url图片地址) }设置对象为图片

    4.css 宽度(CSS width)
    width:20%   设置宽度为20%(相对与父级百分比宽度)


    5.由p标签不能嵌套div引发---块级元素和内联元素的嵌套问题
    内联不能嵌套块级，块级可以嵌套内联元素
    有几个特殊的块级元素只能包含内联元素，不能再包含块级元素，这几个特殊的标签是：h1、h2、h3、h4、h5、h6、p、dt。所以说p里面不能嵌套div
    li里面可以嵌套div
      </pre>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

</style>