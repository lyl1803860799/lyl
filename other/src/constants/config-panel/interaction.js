const mapSimpleAction = function() {
  return {
    click: false,
    openType: 'newPage',
    clickPos: 'specific',
    pageUrl: undefined,
    mapInfo: {
      key: undefined,
      value: ''
    }
  }
}

export default {
  'map-simple': mapSimpleAction
}
