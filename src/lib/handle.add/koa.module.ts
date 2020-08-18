
import inquirer from 'inquirer'
import eachfiles from '../util/eachfiles'
import path from 'path'
import fs from 'fs'

export default async ():Promise<void> => {
  const { moduleName } = await inquirer.prompt({
    type: 'input',
    name: 'moduleName',
    message: '输入模块名称:',
    validate: value => Boolean(value)
  })
  // 复制文件
  eachfiles(
    path.join(__dirname, '../../../template/add.koa.module'), '',
    (dirName, pathName) => {
      if (fs.statSync(dirName).isDirectory()) {
        // 创建文件夹
        fs.mkdirSync(`src/module.${moduleName}${pathName}`)
        console.log(`mkdir src/module.${moduleName}${pathName}`)
      } else {
        // 创建文件并替换部分文件内容
        const fileStr = fs.readFileSync(dirName).toString()
        fs.writeFileSync(`src/module.${moduleName}${pathName}.ts`, fileStr.replace(new RegExp('#moduleName#', 'g'), moduleName))
        console.log(`add src/module.${moduleName}${pathName}.ts`)
      }
    }
  )
  // 读取 src/router.ts 文件向文件中添加内容
  let routerStr = fs.readFileSync('src/router.ts').toString()
  const importIndex = routerStr.indexOf('// # auto add here # import')
  if (importIndex !== -1) {
    routerStr = routerStr.slice(0, importIndex) + `import ${moduleName}Router from './module.${moduleName}/router'\n` + routerStr.slice(importIndex)
    const useIndex = routerStr.indexOf('// # auto add here # use')
    if (useIndex !== -1) {
      routerStr = routerStr.slice(0, useIndex) + `router.use('/api/${moduleName}', ${moduleName}Router.routes())\n` + routerStr.slice(useIndex)
    }
    fs.writeFileSync('src/router.ts', routerStr)
  }
}
