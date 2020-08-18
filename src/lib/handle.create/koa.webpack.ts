
import inquirer from 'inquirer'
import clone from '../util/clone'
import eachfiles from '../util/eachfiles'
import path from 'path'
import fs from 'fs'

export default async ():Promise<void> => {
  const { projectName } = await inquirer.prompt({
    type: 'input',
    name: 'projectName',
    message: '输入项目名:',
    validate: value => Boolean(value)
  })

  await clone('profore/mini_api', projectName)

  const projectPath = path.join(process.cwd(), projectName)
  const packageJson = require(path.join(projectPath, 'package.json'))

  // 替换文件内容中的名称
  eachfiles(projectPath, '', (dirName, pathName):void => {
    if (
      pathName === '/package.json' ||
      pathName === '/README.md'
    ) {
      const fileStr = fs.readFileSync(dirName).toString()
      fs.writeFileSync(dirName, fileStr.replace(new RegExp(packageJson.name, 'g'), projectName))
    }
  })
}
