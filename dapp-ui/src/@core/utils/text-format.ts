export function shortenText(text: string, length: number) {
  if (text == null)
    return text

  if (typeof text !== 'string')
    return text

  if (text.length < length)
    return text
  
  const displaySize = (length - 3) / 2

  return `${text.substring(0, displaySize)}...${text.substring(text.length - displaySize)}`
}

export function errorString(error: any) {
  const message = typeof error === 'string'
    ? error
    : error.message || error.error

  return message
}