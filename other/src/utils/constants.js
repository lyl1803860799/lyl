const style = {
  fontFamily: 'sans-serif',
  fontSize: 14
}
export const list = {
  chart: [
    {
      header: '柱状图',
      value: [
        {
          id: 'bar-simple',
          componentName: 'chart',
          title: { name: '基础柱状图', style: { ...style } }
        },
        {
          id: 'bar-line',
          componentName: 'chart',
          title: { name: '柱状折线图', style: { ...style } }
        },
        {
          id: 'double-bar',
          componentName: 'chart',
          title: { name: '双轴柱状图', style: { ...style } }
        },
        {
          id: 'bar-line-double',
          componentName: 'chart',
          title: { name: '双轴柱状折线图', style: { ...style } }
        },
        {
          id: 'dynamic-bar',
          componentName: 'dynamicChart',
          title: { name: '动态柱状图', style: { ...style } }
        }
      ]
    },
    {
      header: '折线图',
      value: [
        {
          id: 'line-simple',
          componentName: 'chart',
          title: { name: '基础折线图', style: { ...style } }
        },
        {
          id: 'area-simple',
          componentName: 'chart',
          title: { name: '基础面积图', style: { ...style } }
        },
        {
          id: 'area-stack',
          componentName: 'chart',
          title: { name: '堆叠面积图', style: { ...style } }
        },
        {
          id: 'line-double',
          componentName: 'chart',
          title: { name: '双轴折线图', style: { ...style } }
        },
        {
          id: 'area-double',
          componentName: 'chart',
          title: { name: '双轴面积图', style: { ...style } }
        }
      ]
    },
    {
      header: '饼图',
      value: [
        {
          id: 'pie-simple',
          componentName: 'chart',
          title: { name: '基础饼图', style: { ...style } }
        },
        {
          id: 'pie-doughnut',
          componentName: 'chart',
          title: { name: '环形图', style: { ...style } }
        }
      ]
    },
    {
      header: '地图',
      value: [
        {
          id: 'map-simple',
          componentName: 'bi-map',
          title: { name: '地图', style: { ...style } }
        }
      ]
    }
  ],
  word: [
    {
      header: '全部',
      value: [
        {
          id: 'scroll-board-style',
          componentName: 'scroll-board',
          title: { name: '指标表格', style: { ...style } }
        },
        {
          id: 'text-block-style',
          componentName: 'text-block',
          title: { name: '文字', style: { ...style } }
        },
        {
          id: 'time-range-style',
          componentName: 'time-range',
          title: { name: '时间', style: { ...style } }
        },
        {
          id: 'index-board-style',
          componentName: 'index-board',
          title: { name: '指标看板', style: { ...style } }
        },
        {
          id: 'futures-table-style',
          componentName: 'futures-table',
          title: { name: '期货表格', style: { ...style } }
        },
        {
          id: 'futures-board-style',
          componentName: 'futures-board',
          title: { name: '期货看板', style: { ...style } }
        },
        {
          id: 'scroll-board-style',
          componentName: 'scroll-board',
          title: { name: '实时行情', style: { ...style } }
        },
      ]
    }
  ],
  more: [
    {
      header: '全部',
      value: [
        {
          id: 'basic-swipe',
          componentName: 'swipe',
          title: { name: '轮播组件', style: { ...style } }
        },
        {
          id: 'h-carousel-style',
          componentName: 'bi-carousel',
          title: { name: '横向滚动轮播', style: { ...style } }
        },
        {
          id: 'web-frame-style',
          componentName: 'webFrame',
          title: { name: 'iframe', style: { ...style } }
        },
        {
          id: 'video-style',
          componentName: 'bi-video',
          title: { name: '视频', style: { ...style } }
        }
      ]
    }
  ],
  report: [
    {
      header: '全部',
      slot: 'img',
      value: []
    }
  ],
  video: [
    {
      header: '全部',
      slot: 'video',
      value: []
    }
  ],
  save: [
    {
      header: '全部',
      slot: 'save',
      value: []
    }
  ],
  weather: [
    {
      header: '全部',
      value: [{
        id: 'weather-range-style',
        componentName: 'weather',
        title: { name: '天气', style: { ...style } }
      }]
    }
  ],
  news: [
    {
      header: '全部',
      value: [{
        id: 'news-range-style',
        componentName: 'news-range',
        title: { name: '资讯', style: { ...style } }
      },{
        id: 'hot-news-style',
        componentName: 'hot-news',
        title: { name: '热榜', style: { ...style } }
      },{
        id: 'flash-news-style',
        componentName: 'flash-news',
        title: { name: '快讯', style: { ...style } }
      },{
        id: 'news-list-style',
        componentName: 'news-list',
        title: { name: '资讯列表', style: { ...style } }
      }]
    }
  ],
  price: [
    {
      header: '全部',
      value: [{
        id: 'price-range-style',
        componentName: 'price-range',
        title: { name: '行情', style: { ...style } }
      }]
    }
  ],
}

export const tabList = [
  {
    id: 'chart',
    name: '图表',
    img: require('@/assets/icon/icon-chart.png'),
    activeImg: require('@/assets/icon/icon-chart-a.png')
  },
  {
    id: 'word',
    name: '文字',
    img: require('@/assets/icon/icon-word.png'),
    activeImg: require('@/assets/icon/icon-word-a.png')
  },
  {
    id: 'more',
    name: '特殊',
    img: require('@/assets/icon/icon-more.png'),
    activeImg: require('@/assets/icon/icon-more-a.png')
  },
  {
    id: 'report',
    name: '图片',
    img: require('@/assets/icon/icon-report.png'),
    activeImg: require('@/assets/icon/icon-report-a.png')
  }
]

export const saveTab = {
  id: 'save',
  name: '收藏',
  img: require('@/assets/icon/icon-save.png'),
  activeImg: require('@/assets/icon/icon-save-a.png')
}

export const sliderOptions = [
  {
    label: '25%',
    value: '25%'
  },
  {
    label: '50%',
    value: '50%'
  },
  {
    label: '100%',
    value: '100%'
  },
  {
    label: '150%',
    value: '150%'
  },
  {
    label: '200%',
    value: '200%'
  },
  {
    label: '250%',
    value: '250%'
  },
  {
    label: '300%',
    value: '300%'
  }
]

export const COMPONENT_NAME_MAP = {
  'bar-simple': '基础柱状图',
  'bar-line': '柱状折线图',
  'double-bar': '双轴柱状图',
  'dynamic-bar': '动态柱状图',
  'line-simple': '基础折线图',
  'area-simple': '基础面积图',
  'area-stack': '堆叠面积图',
  'line-double': '双轴折线图',
  'area-double': '双轴面积图',
  'pie-simple': '基础饼图',
  'pie-doughnut': '环形图',
  'scroll-board-style': '指标设置',
  'text-block-style': '文字',
  'time-range-style':'时间',
  'index-board-style':'指标看板',
  'weather-range-style':'天气',
  'news-range-style':'资讯',
  'price-range-style':'行情',
  'hot-news-style':'热榜',
  'basic-swipe': '轮播组件',
  'h-carousel-style': '横向滚动轮播',
  'web-frame-style': 'iframe',
  'image-style': '图片',
  'map-simple': '地图',
  'video-style': '视频'
}
