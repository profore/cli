import inquirer from 'inquirer'

export default async ():Promise<void> => {
  try {
    const { projectType } = await inquirer.prompt({
      type: 'list',
      message: '选择子模块:',
      name: 'projectType',
      choices: [
        { name: 'koa module', value: 'koa.module' }
      ]
    })

    // 执行逻辑
    const handle = await import(`./${projectType}`)
    await handle.default()

    console.log('添加成功')
  } catch (error) {
    console.log(error)
  }
}
