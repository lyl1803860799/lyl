<template>
  <div id="chart-container">
    <pre>
        基本使用：
        1.npm install echarts --save
        2.
        //  引入Echarts
        import * as echarts from 'echarts'
        Vue.prototype.$echarts = echarts
        3.
        {{text}}
        
    </pre>

    <!-- 柱状图 -->
    <div id="main" style="height: 290px; width: 550px;"></div>


    <line-chart></line-chart>
  </div>
</template>

<script>
import lineChart from '@/components/lineChart.vue';
export default {
    components: { lineChart },
    data() {
        return {
            text: '<div id="main" style="height: 290px; width: 550px;"></div>',
        };
    },
    created() {
    },
    mounted() {
        // // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('main'));

        var years = ['2020-11', '2020-12', '2021-01','2021-02', '2021-03', '2021-04', '2021-05','2021-06', '2021-07', '2021-08', '2021-09','2021-10', '2021-11'];
        var jdData =['深圳', '中山',  '东莞',  '珠海', '佛山']


        myChart.setOption({
            title: [
                {
                    text: '湾区',
                    left: '0%',
                    textStyle: {
                        fontSize: 16
                    }
                },
            ],
            legend: [
                {
                    data: jdData,
                    type:'scroll',
                    bottom: 10,
                    icon: "roundRect",
                    itemWidth: 24,
                    itemHeight: 2
                },
            ],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#606F99'
                },
                label:{
                    color: '#fff'
                },
                }
            },
            // grid: [{
            //     left: '5%',
            //     right: '55%', // 网格部分
            //     top: '10%',
            //     bottom: '5%',
            //     containLabel: true
            // },
            // ],
            grid:{
                height:"66%",
                left:80,
                right:80,
                bottom:60,
            },
            xAxis: [{
                type: 'category',
                data: years,
                splitLine: {
                    show: false
                },
                axisPointer: {
                    type: 'shadow'
                }
            },
            ],
            yAxis: [{
                type: 'value',
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value}'
                }
            }],
            series: [
                // {
                //     name:'深圳',
                //     connectNulls: true,
                //     type: 'line',
                //     smooth: true,
                //     // 不显示关键点
                //     showSymbol: false,
                //     // animationDuration: 3000,
                //     data: [120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210]
                // },
                {
                    type: 'line',
                    name:'中山',
                    smooth: true,
                    animationDuration: 3000,
                    data: [220, 282, 201, 234, 290, 430, 410,220, 282, 201, 234, 290, 430, 410]
                },
                {
                    type: 'line',
                    name:'东莞',
                    smooth: true,
                    animationDuration: 3000,
                    data: [450, 432, 401, 454, 590, 530, 510,450, 432, 401, 454, 590, 530, 510],

                },
                {
                    type: 'line',
                    name:'珠海',
                    smooth: true,
                    animationDuration: 3000,
                    data: [550,632, 601, 554, 690, 630,610,550,632, 601, 554, 690, 630,610],

                },
                {
                    type: 'line',
                    name:'佛山',
                    smooth: true,
                    animationDuration: 3000,
                    data: [750, 732, 701, 754, 790, 730, 710,750, 732, 701, 754, 790, 730, 710],

                },
            ]
        })
    }
}
</script>

<style>

</style>