/**
 * @file tool.js
 * @description 用于处理常用操作
 * @author liushengxi@mysteel.com
 */

import * as _ from 'lodash'
import ResizeObserver from 'resize-observer-polyfill'

const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

const _typeof2 = _interopRequireDefault(require('@babel/runtime/helpers/typeof'))

/**
 * @param {Object} srcObj 原对象
 * @param {Object} incomObj 需要合入的对象
 * @returns 返回合并后的对象
 */
export const paddingObject = (srcObj, incomeObj) => {
  return _.merge(srcObj, incomeObj)
}

/**
 * @description Clone an object or array
 * @param {Object|Array} object Cloned object
 * @param {Boolean} recursion   Whether to use recursive cloning
 * @return {Object|Array} Clone object
 */

export function deepClone(object) {
  const recursion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false
  if (!object) return object
  const parse = JSON.parse,
    stringify = JSON.stringify
  if (!recursion) return parse(stringify(object))
  let clonedObj = object instanceof Array ? [] : {}

  if (object && (0, _typeof2['default'])(object) === 'object') {
    for (let key in object) {
      if (object[key]) {
        if (object[key] && (0, _typeof2['default'])(object[key]) === 'object') {
          clonedObj[key] = deepClone(object[key], true)
        } else {
          clonedObj[key] = object[key]
        }
      }
    }
  }

  return clonedObj
}

export function deepMerge(target, merged) {
  for (let key in merged) {
    if (target[key] && (0, _typeof2['default'])(target[key]) === 'object') {
      deepMerge(target[key], merged[key])
      continue
    }

    if ((0, _typeof2['default'])(merged[key]) === 'object') {
      target[key] = (0, deepClone)(merged[key], true)
      continue
    }

    target[key] = merged[key]
  }

  return target
}

export function debounce(delay, callback) {
  let lastTime

  return function() {
    clearTimeout(lastTime)

    const [that, args] = [this, arguments]

    lastTime = setTimeout(() => {
      callback.apply(that, args)
    }, delay)
  }
}

export function observerDomResize(dom, callback) {
  const MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

  const observer = new MutationObserver(callback)

  observer.observe(dom, { attributes: true, attributeFilter: ['style'], attributeOldValue: true })

  return observer
}

/* istanbul ignore next */
const resizeHandler = function(entries) {
  for (let entry of entries) {
    const listeners = entry.target.__resizeListeners__ || []
    if (listeners.length) {
      listeners.forEach((fn) => {
        fn()
      })
    }
  }
}

/* istanbul ignore next */
export const addResizeListener = function(element, fn) {
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = []
    element.__ro__ = new ResizeObserver(resizeHandler)
    element.__ro__.observe(element)
  }
  element.__resizeListeners__.push(fn)
}

/* istanbul ignore next */
export const removeResizeListener = function(element, fn) {
  if (!element || !element.__resizeListeners__) return
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)
  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect()
  }
}

// 处理复制操作
export const copyAction = function(value) {
  const input = document.createElement('input')
  document.body.appendChild(input)
  input.value = value
  // 防止页面布局发生变化
  input.style.position = 'absolute'
  input.style.left = '-10000px'
  input.select()
  document.execCommand('copy')
  this.$message.success('复制成功')
  setTimeout(() => {
    document.body.removeChild(input)
  }, 300)
}
