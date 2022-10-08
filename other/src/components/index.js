/**
 * @file 全局批量注册组件
 * @author liushengxi@mysteel.com
 */

import Chart from '@/components/edit/chart'
import DynamicChart from '@/components/edit/dynamicChart'
import Swipe from '@/components/edit/biSwiper'
import BiMap from '@/components/edit/biMap'
import ScrollBoard from '@/components/edit/scrollBoard'
import FuturesTable from '@/components/edit/futuresTable'
import BiCarousel from '@/components/edit/carousel/index'
import WebFrame from '@/components/edit/webFrame'
import TextBlock from '@/components/edit/textBlock'
import TimeRange from '@/components/edit/timeRange'
import IndexBoard from '@/components/edit/indexBoard'
import FuturesBoard from '@/components/edit/futuresBoard'
import Weather from '@/components/edit/weather'
import priceRange from '@/components/edit/priceRange'
import newsRange from '@/components/edit/newsRange'
import hotNews from '@/components/edit/hotNews'
import flashNews from '@/components/edit/flashNews'
import NewsList from '@/components/edit/newsList'
import BiImage from '@/components/edit/biImage'
import BiVideo from '@/components/edit/biVideo'
import BarSimple from '@/components/option/barSimple'
import LineSimple from '@/components/option/lineSimple'
import AreaSimple from '@/components/option/areaSimple'
import AreaStack from '@/components/option/areaStack'
import BarLine from '@/components/option/barLine'
import PieSimple from '@/components/option/pieSimple'
import PieDoughnut from '@/components/option/pieDoughnut'
import ScrollBoardStyle from '@/components/option/scrollBoardStyle'
import FuturesTableStyle from '@/components/option/futuresTableStyle'
import basicSwipe from '@/components/option/swiper'
import HCarouselStyle from '@/components/option/hCarouselStyle'
import WebFrameStyle from '@/components/option/webFrameStyle'
import dynamicBar from '@/components/option/dynamicBar'
import TextBlockStyle from '@/components/option/textBlockStyle'
import TimeRangeStyle from '@/components/option/timeRangeStyle'
import IndexBoardStyle from '@/components/option/indexBoardStyle'
import FuturesBoardStyle from '@/components/option/futuresBoardStyle'
import PriceRangeStyle from '@/components/option/priceRangeStyle'
import NewsRangeStyle from '@/components/option/newsRangeStyle'
import HotNewsStyle from '@/components/option/hotNewsStyle'
import FlashNewsStyle from '@/components/option/flashNewsStyle'
import NewsListStyle from '@/components/option/newsListStyle'
import WeatherRangeStyle from '@/components/option/weatherRangeStyle'
import ImageStyle from '@/components/option/imageStyle'
import VideoStyle from '@/components/option/videoStyle'
import ColorStep from '@/components/colorStep'
import DoubleBar from '@/components/option/doubleBar'
import LineDouble from '@/components/option/lineDouble'
import AreaDouble from '@/components/option/areaDouble'
import BarLineDouble from '@/components/option/barLineDouble'
import MapSimple from '@/components/option/mapSimple'
import MapSimpleAction from '@/components/interactive/map-simple-action'

const components = {
  Chart,
  DynamicChart,
  Swipe,
  BiMap,
  ScrollBoard,
  FuturesTable,
  BarSimple,
  basicSwipe,
  ColorStep,
  LineSimple,
  AreaSimple,
  AreaStack,
  BarLine,
  PieSimple,
  PieDoughnut,
  ScrollBoardStyle,
  FuturesTableStyle,
  BiCarousel,
  HCarouselStyle,
  WebFrame,
  WebFrameStyle,
  TextBlock,
  TextBlockStyle,
  TimeRange,
  TimeRangeStyle,
  IndexBoard,
  IndexBoardStyle,
  FuturesBoard,
  FuturesBoardStyle,
  WeatherRangeStyle,
  PriceRangeStyle,
  NewsRangeStyle,
  HotNewsStyle,
  FlashNewsStyle,
  NewsListStyle,
  Weather,
  priceRange,
  newsRange,
  hotNews,
  flashNews,
  NewsList,
  BiImage,
  ImageStyle,
  BiVideo,
  VideoStyle,
  DoubleBar,
  LineDouble,
  AreaDouble,
  BarLineDouble,
  dynamicBar,
  MapSimple,
  MapSimpleAction
}
const install = (Vue) => {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
}

export default install
