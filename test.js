const styleMessage = (message) => {
  let outStyle = ''
  let outText = message.text
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
  // console.log({ startIndex, endIndex })
  // console.log(message.text[startIndex - 1], message.text[endIndex + 1])
  // console.log(style)
}

// console.log(func({ text: "Hi how's it going [[color=green]] [[text-decoration=strikethrough]]?" }))

module.exports = styleMessage
