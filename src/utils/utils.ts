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

/**
 * 水平数组转换成树结构数据
 */
export function repTree (data:any, parentId:number) {
  const tree:any = []
  let temp:any
  data.forEach((item:any) => {
    if (item.parent_id === parentId) {
      temp = repTree(data, item.id)
      if (temp.length > 0) item.children = temp
      tree.push(item)
    }
  })
  return tree
}