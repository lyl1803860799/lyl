/**
 * canvas 绘制标尺
 *
 * params:{*}
 *      axisWidth:Number,unit:px
 *      lineColor:String,
 *      gridWidth:Number,
 *      gridHeight:Number,
 *
 * dom:Dom元素,canvas的元素
 */

class CanvasRuler {
  constructor(params, dom) {
    this.AXIS_WIDTH = params.axisWidth || 1
    this.LINE_COLOR = params.lineColor || '#000000'
    this.GRID_WIDTH = params.gridWidth || 100
    this.GRID_HEIGHT = params.gridHeight || 20
    this.START = params.start || 20
    this.START_INDEX = params.startIndex || 1
    this.SCALE = params.scale || 1
    this.TOTAL_WIDTH = params.gridTotalWidth || 1
    this.TOTAL_HEIGHT = params.gridTotalHeight || 1
    this.canvas = dom
    this.DRAW_TYPE = {
      HORIZONTAL: 1,
      VERTICAL: 2,
      ALL: 3,
      NONE: 4
    }
  }

  setAxisWidth(axisWidth) {
    this.AXIS_WIDTH = Number(axisWidth) ? Number(axisWidth) : 1
  }

  setStart(start) {
    this.START = Number(start) ? Number(start) : 0
  }

  // 起始值
  setStartIndex(startIndex) {
    this.START_INDEX = Number(startIndex) ? Number(startIndex) : 0
  }

  // 缩放比例
  setScale(scale) {
    this.SCALE = Number(scale) ? Number(scale) : 1
  }

  // 刻度尺显示宽度
  setTotalWidth(totalWidth) {
    this.TOTAL_WIDTH = Number(totalWidth) ? Number(totalWidth) : 1
  }

  // 刻度尺显示宽度
  setTotalHeight(totalHeight) {
    this.TOTAL_HEIGHT = Number(totalHeight) ? Number(totalHeight) : 1
  }

  setLineColor(lineColor) {
    this.LINE_COLOR = lineColor
  }

  setGridWidth(gridWidth) {
    this.GRID_WIDTH = Number(gridWidth) ? Number(gridWidth) : 1
  }

  setGridHeight(gridHeight) {
    this.GRID_HEIGHT = Number(gridHeight) ? Number(gridHeight) : 1
  }

  clearCanvas() {
    const ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  init(drawType) {
    this.clearCanvas()
    const ctx = this.canvas.getContext('2d')
    ctx.lineWidth = this.AXIS_WIDTH
    ctx.strokeStyle = this.LINE_COLOR

    ctx.fillStyle = this.LINE_COLOR
    ctx.font = '9px Arial'
    let DRAW_TYPE = this.DRAW_TYPE
    switch (drawType) {
      case DRAW_TYPE.HORIZONTAL:
        this.drawHorizontalAxis(ctx)
        break
      case DRAW_TYPE.VERTICAL:
        this.drawVerticalAxis(ctx)
        break
      case DRAW_TYPE.ALL:
        this.drawHorizontalAxis(ctx)
        this.drawVerticalAxis(ctx)
        break
      default:
        break
    }
    this.resize(drawType)
  }

  //绘制水平轴
  drawHorizontalAxis(ctx) {
    let gridWidth = this.GRID_WIDTH
    let gridHeight = this.GRID_HEIGHT
    ctx.beginPath()
    ctx.moveTo(this.START + gridHeight + 0.5, gridHeight)
    ctx.lineTo(this.START + gridWidth * this.SCALE + 0.5, gridHeight)

    for (
      let i = this.START + 0.5;
      i < this.START + gridWidth * this.SCALE;
      i = i + (gridWidth * this.SCALE) / 10
    ) {
      ctx.moveTo(i, gridHeight)
      if (i < this.START + (gridWidth * this.SCALE) / 10) continue
      if (i === this.START + (gridWidth * this.SCALE) / 10 + 0.5) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, gridHeight)
        ctx.lineTo(i + gridWidth * this.SCALE, gridHeight)
        ctx.fillText(Math.round((this.START_INDEX + 0) / 100) * 100, i + 2.5, gridHeight - 10)
      } else {
        if (i == this.X_STEP * this.SCALE * gridWidth * 0.5 + this.START + 0.5) {
          ctx.lineTo(i, gridHeight / 2)
        } else {
          ctx.lineTo(i, (gridHeight * 3) / 4)
        }
      }
    }
    ctx.stroke()
    let a = 0
    let w = this.TOTAL_WIDTH<1680?this.TOTAL_WIDTH+400:this.TOTAL_WIDTH
    for (
      let i = this.START + gridWidth * this.SCALE + 0.5;
      i < w;
      i = i + gridWidth * this.SCALE
    ) {
      let txtVal = Math.round((gridWidth * ++a + this.START_INDEX) / 100) * 100;
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, gridHeight)
      ctx.lineTo(i + gridWidth * this.SCALE, gridHeight)
      ctx.fillText(
        txtVal,
        i + 2.5,
        gridHeight - 10
      )
      for (
        let j = i + (gridWidth * this.SCALE) / 10;
        j < i + gridWidth * this.SCALE;
        j = j + (gridWidth * this.SCALE) / 10
      ) {
        ctx.moveTo(j, gridHeight)
        if (j == i + ((gridWidth * this.SCALE) / 10) * 5 + 0.5) {
          ctx.lineTo(j, gridHeight / 2)
        } else {
          ctx.lineTo(j, (gridHeight * 2) / 3)
        }
      }
      ctx.stroke()
    }
  }

  //绘制垂直轴
  drawVerticalAxis(ctx) {
    let gridWidth = this.GRID_WIDTH
    let gridHeight = this.GRID_HEIGHT
    ctx.beginPath()
    ctx.moveTo(gridHeight, this.START + gridHeight + 0.5)
    ctx.lineTo(gridHeight, this.START + gridWidth * this.SCALE + 0.5)
    for (
      let i = this.START + 0.5;
      i < this.START + gridWidth * this.SCALE;
      i = i + (gridWidth * this.SCALE) / 10
    ) {
      ctx.moveTo(gridHeight, i)
      if (i < this.START + (gridWidth * this.SCALE) / 10) continue
      if (i === this.START + (gridWidth * this.SCALE) / 10 + 0.5) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(gridHeight, i)
        ctx.lineTo(gridHeight, i + gridWidth * this.SCALE)
        // Y轴需要纵向数字
        ctx.save()
        ctx.translate(0, i + 2.5)
        ctx.rotate((Math.PI / 180) * 90)
        ctx.textBaseline = 'bottom'
        ctx.fillText(Math.round((this.START_INDEX + 0) / 100) * 100, 0, 0)
        ctx.restore()
      } else {
        if (i == ((gridWidth * this.SCALE) / 10) * 5 + this.START + 0.5) {
          ctx.lineTo(gridHeight / 4, i)
        } else {
          ctx.lineTo((gridHeight * 2) / 3, i)
        }
      }
    }
    ctx.stroke()

    let a = 0
    for (
      let i = this.START + gridWidth * this.SCALE + 0.5;
      i < this.TOTAL_HEIGHT;
      i = i + gridWidth * this.SCALE
    ) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(gridHeight, i)
      ctx.lineTo(gridHeight, i + gridWidth * this.SCALE)

      // Y轴需要纵向数字
      ctx.save()
      ctx.translate(0, i + 2.5)
      ctx.rotate((Math.PI / 180) * 90)
      ctx.textBaseline = 'bottom'
      ctx.fillText(Math.round((gridWidth * ++a + this.START_INDEX) / 100) * 100, 0, 0)
      ctx.restore()

      for (
        let j = i + (gridWidth * this.SCALE) / 10;
        j < i + gridWidth * this.SCALE;
        j = j + (gridWidth * this.SCALE) / 10
      ) {
        ctx.moveTo(gridHeight, j)
        if (j == i + ((gridWidth * this.SCALE) / 10) * 5) {
          ctx.lineTo(gridHeight / 2, j)
        } else {
          ctx.lineTo((gridHeight * 2) / 3, j)
        }
      }
      ctx.stroke()
    }

    // if (this.SCALE !== 1) {
    //   this.resampleSingle(this.canvas, this.canvas.width, this.canvas.height / this.SCALE, true)
    // }
  }

  // 缩放刻度尺
  resampleSingle(canvas, width, height, resize_canvas) {
    var width_source = canvas.width
    var height_source = canvas.height
    width = Math.round(width)
    height = Math.round(height)

    var ctx = canvas.getContext('2d')
    var img = ctx.getImageData(0, 0, width_source, height_source)

    if (resize_canvas === true) {
      canvas.width = width
      canvas.height = height
    } else {
      ctx.clearRect(0, 0, width_source, height_source)
    }

    //draw
    ctx.putImageData(img, 0, 0)
  }

  //自适应窗口
  resize(drawType) {
    window.onresize = () => {
      this.init(drawType)
    }
  }
}

export default CanvasRuler
