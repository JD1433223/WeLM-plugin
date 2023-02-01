import { Version } from './components/index.js'
import chalk from 'chalk'
import fs from 'node:fs'

//输出提示
logger.info('----✩•‿• ʜᴀᴠᴇ ᴀ ɢᴏᴏᴅ ᴛɪᴍᴇ☄︎♡----')
logger.info(`WeLM对话插件初始化(・ω< )★`)
logger.info(`当前版本: ${chalk.rgb(150, 50, 100)(Version.version)}`)
logger.info(`作者: ${chalk.rgb(0, 255, 0)('JD')} ${logger.red('兰罗摩')} ${logger.blue('书辞千楪Sama')}`)
logger.info('-------------------------------')

try {
  await import('axios')
  if (!await redis.get('WeLM-plugin:node_modules')) await redis.set('WeLM-plugin:node_modules', '1')
} catch (error) {
  if (error.stack?.includes('Cannot find package')) {
    logger.error(`WeLM-plugin 缺少依赖将无法使用 ${logger.red('所有需要调用API的功能')}`)
    logger.error(`如需使用请运行：${logger.red('pnpm add axios -w')}`)
    logger.error('--------WeLM依赖缺失--------')
  } else {
    logger.error(`WeLM载入依赖错误：${logger.red('axios')}`)
    logger.error(decodeURI(error.stack))
  }
  await redis.del('WeLM:node_modules')
}

//加载插件
const files = fs.readdirSync('./plugins/WeLM-plugin/apps').filter(file => file.endsWith('.js'))
let ret = []
files.forEach((file) => {
  ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
  let name = files[i].replace('.js', '')

  if (ret[i].status != 'fulfilled') {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
export { apps }
