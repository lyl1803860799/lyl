/* 图相关配置 */
import styleOptions from './config-panel/style'
import dataOption from './config-panel/data'
import actionOption from './config-panel/interaction'

export const contentOptions = styleOptions
export const dataOptions = dataOption
export const interactiveOptions = actionOption

// 右键菜单
export const contextMenuData = [
  { label: '上移一层', value: 'add' },
  { label: '下移一层', value: 'minus' },
  { label: '置于顶层', value: 'top' },
  { label: '置于底层', value: 'bottom' },
  // { label: '收藏', value: 'save' }
]

export const TYPE_SETS = {
  'bar-simple': 'bar',
  'bar-line': null,
  'line-simple': 'line',
  'area-simple': 'line',
  'area-stack': 'stack',
  'pie-simple': 'pie',
  'pie-doughnut': 'pie',
  'double-bar': 'double-bar',
  'line-double': 'line-double',
  'area-double': 'area-double'
}
