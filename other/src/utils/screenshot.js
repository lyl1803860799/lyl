import html2canvas from 'html2canvas'

export async function generateImage(selector, scale = 100) {
  let w = (selector.offsetWidth * scale) / 100;
  let h = (selector.offsetHeight * scale) / 100;
  const canvas = await html2canvas(selector, {
    scale: 0.2,
    width: w, //按照当前缩放比截取
    height: h,
    scrollX: 0,
    scrollY: 0,
    useCORS: true,
    allowTaint: false,
    taintTest: true,
    backgroundColor: '#001830'
  })
  const dataUrl = canvas.toDataURL('image/png', 1)
  return dataUrl
}