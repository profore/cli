#!/usr/bin/env node

// 命令行参数解析
import { program } from 'commander'
// 大字报
import figlet from 'figlet'
// create 业务逻辑
import libCreate from '../lib/handle.create'
// add 业务逻辑
import libAdd from '../lib/handle.add'

// package.json
const packagejson = require('../../package.json')

// 无参数情况打印大字报
if (!process.argv[2]) {
  console.log(
    figlet.textSync(packagejson.name, {
      horizontalLayout: 'full'
    })
  )
}

// 返回版本号
program.version(`${packagejson.name} ${packagejson.version}`)

// create 创建项目
program
  .command('create')
  .description('创建一个新的项目')
  .action(libCreate)

// add 项目中的子代码块
program
  .command('add')
  .description('在项目中创建子代码块')
  .action(libAdd)

// 解析参数
program.parse(process.argv)
