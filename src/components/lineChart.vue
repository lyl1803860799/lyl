<template>
  <div id="line-chart-container">
    <div id="map" style="width: 1000px;height:600px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import chinaJson from '@/constants/china.json';
export default {
    data() {
        return {
            chart: null,
            //折线图配置
            option:{
                title:{
                    text:'折线图模板',
                },
                grid:{
                    height:"66%",
                    left:80,
                    right:80,
                    bottom:60,
                },
                xAxis: [{
                    type: 'category',
                    data: [],
                    splitLine: {
                        show: false
                    },
                    axisPointer: {
                        type: 'shadow'
                    }
                }],
                yAxis: [{
                    type: 'value',
                    name: '',
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value}'
                    }
                }],
                // e-charts 工具栏
                // toolbox: {
                //     top:3,
                //     right:3,
                //     feature: {
                //         // 保存图片
                //         saveAsImage: { show: true },
                //         myFull: null,
                //         restore: { show: true },
                //     }
                // },
                // 提示框组件
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
                // 图例组件
                legend: {
                    data: [],
                    // 可滚动翻页的图例。当图例数量较多时可以使用。
                    type:'scroll',
                    bottom: 10,
                    icon: "roundRect",
                    itemWidth: 24,
                    itemHeight: 2
                },
                series: []
            },
        }
    },
    mounted() {
        echarts.registerMap('china', {
            geoJSON: chinaJson
        })


        let myChart = this.$echarts.init(document.getElementById('map'));

        let option = {}

        option = {
            title: {
                left: 10,
                right: 10,
                text: '中国地图',
                textStyle: {
                    color: '#fff',
                },
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                y: 'bottom',
                x: 'right',
                textStyle: {
                    color: '#fff',
                },
            },
            geo: {
                map: 'china',
                zoom: 1.2,
                scaleLimit: {
                    min: 0.5,
                    max: 3,
                },
                roam: true,
                itemStyle: {
                    // areaColor: '#323c48',
                    borderColor: '#111',
                },
                emphasis: {
                    label: {
                        show: false,
                    },
                    itemStyle: {
                        // areaColor: '#60758e',
                    }
                }
            }
        };
        myChart.setOption(option)
    },
    methods: {

    }
}
</script>

<style>

</style>