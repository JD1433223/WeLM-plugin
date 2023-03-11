import { Version } from './components/index.js'
import chalk from 'chalk'
import fs from 'node:fs'
import YAML from 'yaml'
import { sendToMaster } from './components/Common.js'
import { checkPackage } from './components/CheckPackage.js'

await initConfig()

async function initConfig() {
  //检测有没有配置文件
  const configPath = process.cwd().replace(/\\/g, "/") + '/plugins/WeLM-plugin/'
  let path = configPath + 'config/'
  let pathDef = configPath + 'defSet/'
  const files = fs.readdirSync(pathDef).filter(file => file.endsWith('.yaml') + file.endsWith('.js'))
  for (let file of files) {
    if (!fs.existsSync(`${path}${file}`)) {
      fs.copyFileSync(`${pathDef}${file}`, `${path}${file}`)
      logger.error(`检测到路径为${path + file}的配置文件不存在, 已重新生成`)
    }
  }
}

//读取初始化文件,如果报错(相当于检测文件是否存在)就创建并且写入"no"
try {
  fs.readFileSync(`./plugins/WeLM-plugin/config/system/Guide`,'utf8')
} catch {
  fs.appendFile(`./plugins/WeLM-plugin/config/system/Guide`, 'no', () => {})
}

//延迟执行不然初始化文件内容会变"yesno"
setTimeout(firstGuide, 300) 

//如果初始化文件不是yes就发送消息到主人那
async function firstGuide() {
  if (fs.readFileSync(`./plugins/WeLM-plugin/config/system/Guide`,'utf8') !== "yes") {
    sendToMaster('欢迎您使用WeLM自定义对话插件! \n本插件帮助文档: https://gitee.com/shuciqianye/yunzai-custom-dialogue-welm \n数据无价, 请充分了解本插件功能后再使用! \n感谢您的支持!!!')
    fs.writeFile('./plugins/WeLM-plugin/config/system/Guide', 'yes', (error) => {
      if (error) {
        logger.error('初始化状态失败')
        logger.error(error)
        return false
      }
    })
  }
}

//读取配置
const settings = await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/config.yaml`,'utf8'))
//输出提示
logger.info('----✩•‿• ʜᴀᴠᴇ ᴀ ɢᴏᴏᴅ ᴛɪᴍᴇ☄︎♡----')
logger.info(`WeLM对话插件初始化(・ω< )★`)
logger.info(`当前版本: ${chalk.rgb(150, 50, 100)(Version.version)}`)
logger.info(`作者: ${chalk.rgb(0, 255, 0)('JD')} ${chalk.rgb(153, 255, 255)('兰罗摩')} ${chalk.rgb(0, 0, 255)('书辞千楪Sama')}`)
logger.info(`当前API-Token: "${chalk.rgb(103, 93, 189)(settings.APIToken)}"`)
logger.info('-------------------------------')

//检测依赖全了没
let passed = await checkPackage()
if (!passed) {
    throw 'Missing necessary dependencies'
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