/**
 * @file 全局批量注册组件
 * @author liushengxi@mysteel.com
 */

import Chart from '@/components/edit/chart'
import BiMap from '@/components/edit/biMap'
import Swipe from '@/components/edit/biSwiper'
import ScrollBoard from '@/components/edit/scrollBoard'
import FuturesTable from '@/components/edit/futuresTable'
import HotNews from '@/components/edit/hotNews'
import FlashNews from '@/components/edit/flashNews'
import NewsList from '@/components/edit/newsList'
import BiCarousel from '@/components/edit/carousel/index'
import WebFrame from '@/components/edit/webFrame'
import TextBlock from '@/components/edit/textBlock'
import timeRange from '@/components/edit/timeRange'
import indexBoard from '@/components/edit/indexBoard'
import FuturesBoard from '@/components/edit/futuresBoard'
import priceRange from '@/components/edit/priceRange'
import NewsRange from '@/components/edit/newsRange'
import Weather from '@/components/edit/weather'
import BiImage from '@/components/edit/biImage'
import BiVideo from '@/components/edit/biVideo'
import DynamicChart from '@/components/edit/dynamicChart'

const components = {
  Chart,
  Swipe,
  ScrollBoard,
  FuturesTable,
  HotNews,
  FlashNews,
  NewsList,
  BiCarousel,
  WebFrame,
  TextBlock,
  timeRange,
  indexBoard,
  FuturesBoard,
  priceRange,
  NewsRange,
  Weather,
  BiImage,
  DynamicChart,
  BiMap,
  BiVideo
}
const install = (Vue) => {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
}

export default install
