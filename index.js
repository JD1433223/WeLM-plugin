import fs from 'node:fs'
import { Version } from './components/index.js'


//读取配置
const _path = process.cwd()

logger.info('---ヾ(￣▽￣)Bye~Bye~--------')
logger.info(`WeLM对话插件${Version.version}载入成功awa`)
logger.info(`作者: ${logger.green('JD')} ${logger.red('兰罗摩')} ${logger.blue('书辞千楪Sama')}`)
logger.info('-----------------------awa--')

try {
  await import('axios')
  if (!await redis.get('WeLM-plugin:node_modules')) await redis.set('WeLM-plugin:node_modules', '1')
} catch (error) {
  if (error.stack?.includes('Cannot find package')) {
    logger.error('--------WeLM依赖缺失--------')
    logger.error(`WeLM-plugin 缺少依赖将无法使用 ${logger.red('所有需要调用API的功能')}`)
    logger.error(`如需使用请运行：${logger.red('pnpm install axios -w')}`)
    logger.error('---------------------------')
    logger.debug(decodeURI(error.stack))
  } else {
    logger.error(`WeLM载入依赖错误：${logger.red('axios')}`)
    logger.error(decodeURI(error.stack))
  }
  await redis.del('WeLM:node_modules')
}

//加载插件
const files = fs.readdirSync(`${_path}/plugins/WeLM-plugin/apps`).filter(file => file.endsWith('.js')) 

let ret = []

files.forEach((file) => {
  ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
  let name = files[i].replace('.js', '')

  if (ret[i].status !== 'fulfilled') {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
export { apps }
