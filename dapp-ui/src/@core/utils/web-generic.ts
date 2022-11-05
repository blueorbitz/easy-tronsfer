export function debounce(func: any, timeout = 1000) {
  let timer: NodeJS.Timeout
  return (...args: any) => {
    clearTimeout(timer)
    // @ts-ignore
    timer = setTimeout(() => { func.apply(this, args) }, timeout)
  }
}
