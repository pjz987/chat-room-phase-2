const styleMessage = (message) => {
  let outStyle = ''
  let outText = message
  let startIndex = 0
  let endIndex = 0
  while (true) {
    startIndex = outText.indexOf('[[')
    if (startIndex === -1) break
    endIndex = outText.indexOf(']]')
    const style = outText.slice(startIndex, endIndex + 2)
    outText = outText.split(style).join('')
    const styleArr = style.slice(2, style.length - 2).split('=')
    outStyle += `${styleArr[0]}: ${styleArr[1]}; `
  }
  return {
    outText,
    outStyle
  }
}

export default styleMessage
