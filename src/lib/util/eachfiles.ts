import fs from 'fs'
/**
 * 读取所有文件并执行回调
 * @param {*} dirName 文件夹或文件路径
 * @param {*} pathName 本次递归的相对路径
 * @param {*} fn 如果是文件则执行的回调函数, 第一个参数为文件路径
 */
type Fn = (dirName: string, pathName: string) => void

const eachfilesFn = (dirName:string, pathName:string, fn:Fn):void => {
  fn(dirName, pathName)
  // 如果是文件夹, 向下递归
  if (fs.statSync(dirName).isDirectory()) {
    const files = fs.readdirSync(dirName)
    for (const name of files) {
      if (!/node_modules/.test(dirName)) {
        eachfilesFn(`${dirName}/${name}`, `${pathName}/${name}`, fn)
      }
    }
  }
}
export default eachfilesFn
