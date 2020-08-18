import inquirer from 'inquirer'

export default async ():Promise<void> => {
  try {
    const { projectType } = await inquirer.prompt({
      type: 'list',
      message: '选择项目类型:',
      name: 'projectType',
      choices: [{ name: 'koa + typescript', value: 'koa.webpack' }]
    })

    // 执行逻辑
    const handle = await import(`./${projectType}`)
    await handle.default()

    console.log('安装完成')
  } catch (error) {
    console.log(error)
  }
}
