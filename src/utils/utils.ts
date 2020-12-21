/**
 * 获取动态高度
 */
export function getHeight (bodyHeight:number, height:number):number {
  return bodyHeight - height - 140
}

/**
 * 时间转换
 */
export function transTime (date:any):string {
  const time = (new Date(date))
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDay()
  const hour = time.getHours()
  const m = time.getMinutes()
  const s = time.getSeconds()
  return `${year}-${month > 9 ? month : '0' + month }-${day} ${hour}:${m}:${s}`
}