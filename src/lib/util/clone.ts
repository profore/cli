import ora from 'ora'
import { promisify } from 'util'
import downloadGitRepo from 'download-git-repo'

const download = promisify(downloadGitRepo)

export default async (repo:string, dir:string):Promise<void> => {
  const loading = ora()
  loading.start()
  try {
  /**
   * download-git-repo 有两个方案, 这里选用第一种
   *
   * 1. 基于git clone然后删除 .git文件夹
   *   优点: 可以安装私有仓库
   *   缺点: 依赖 git
   *
   * 2. 基于分析repo字符串, 拼接下载链x接, 使用download模块下载zip文件(自动解压缩)
   *   优点: 在没有git的机子上也能正常运行
   *   缺点: 不能安装私有仓库, 不支持gitee(这个很好解决, 拖出源码加上对gitee的支持, gitee底层是gitlab)
   */
    await download(repo, dir, { clone: true })
  } catch (error) {
    console.log(error)
  }
  loading.succeed()
}
