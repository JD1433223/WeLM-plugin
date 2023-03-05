import { Version } from './components/index.js'
import chalk from 'chalk'
import fs from 'node:fs'
import YAML from 'yaml'
import { checkPackage } from './components/CheckPackage.js'
import { sendToMaster } from './components/Common.js'

await init()

/** 初始化事件 */
async function init() {
  //检测有没有配置文件
  const configPath = process.cwd().replace(/\\/g, "/") + '/plugins/WeLM-plugin/'
  let path = configPath + 'config/'
  let pathDef = configPath + 'defSet/'
  const files = fs.readdirSync(pathDef).filter(file => file.endsWith('.yaml'))
  for (let file of files) {
    if (!fs.existsSync(`${path}${file}`)) {
      fs.copyFileSync(`${pathDef}${file}`, `${path}${file}`)
    }
  }
}

await firstGuide()

async function firstGuide() {
  let Guide = (await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/config.yaml`,'utf8'))).Guide
  if (Guide !== "yes") {
    sendToMaster('欢迎您使用WeLM自定义对话插件! \n本插件帮助文档: https://gitee.com/shuciqianye/yunzai-custom-dialogue-welm \n数据无价, 请充分了解本插件功能与用户条约后再使用! \n感谢您的支持!!!')
    let res = fs.readFileSync('./plugins/WeLM-plugin/config/config.yaml', "utf8")
    let str = `${res}`
    var reg = new RegExp(`Guide: "(.*?)"`);
    var config = str.replace(reg, `Guide: "yes"`);
    fs.writeFileSync('./plugins/WeLM-plugin/config/config.yaml', config, "utf8");
  }
}

const settings = await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/config.yaml`,'utf8'))

//输出提示
logger.info('----✩•‿• ʜᴀᴠᴇ ᴀ ɢᴏᴏᴅ ᴛɪᴍᴇ☄︎♡----')
logger.info(`WeLM对话插件初始化(・ω< )★`)
logger.info(`当前版本: ${chalk.rgb(150, 50, 100)(Version.version)}`)
logger.info(`作者: ${chalk.rgb(0, 255, 0)('JD')} ${logger.red('兰罗摩')} ${logger.blue('书辞千楪Sama')}`)
logger.info(`当前API-Token: "${chalk.rgb(103, 93, 189)(settings.APIToken)}"`)
logger.info('-------------------------------')

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
