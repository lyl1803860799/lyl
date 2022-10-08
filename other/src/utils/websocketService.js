/**
 * @filename websocketService
 * 用于处理websocket
 */

export class WebSocketService {
  constructor(url, callback, index = null) {
    this.componentIndex = index
    this.url = url
    this.callback = callback
    this.wsInstance = null

    // 心跳相关
    this.timeout = 60000
    this.timeoutObj = null
    this.serverTimeoutObj = null

    // 重连 三次重连失败后就不再尝试连接
    this.lockReconnect = false
    this.reconnectNum = 0

    this.createWebSocket()
  }

  start() {
    this.timeoutObj = setTimeout(() => {
      this.wsInstance.send('HeartBeat')
      this.serverTimeoutObj = setTimeout(() => {
        // onclose会执行reconnect，执行 ws.close() 就行了.如果直接执行 reconnect 会触发 onclose 导致重连两次
        this.wsInstance.close()
      }, this.timeout)
    }, this.timeout)
  }

  reconnect() {
    if (this.lockReconnect) return
    this.lockReconnect = true
    this.reconnectNum++
    setTimeout(() => {
      this.createWebSocket()
      console.log('正在重连，当前时间' + new Date())
      // 当重连次数多于3次后，不再尝试重连
      this.lockReconnect = this.reconnectNum > 3
    }, 5000) // 这里设置重连间隔(ms)
  }

  createWebSocket() {
    try {
      this.wsInstance = new WebSocket(this.url)
      this.init()
      this.reconnectNum = 0
    } catch {
      this.reconnect()
    }
  }

  init() {
    this.wsInstance.onopen = () => {
      this.start()
    }
    this.wsInstance.onmessage = (event) => {
      this.callback && this.callback(event.data, this.componentIndex)
    }
    this.wsInstance.onclose = () => {
      this.reconnect()
    }
    this.wsInstance.onerror = () => {
      this.reconnect()
    }
  }
}
