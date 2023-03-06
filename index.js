import { Version } from './components/index.js'
import chalk from 'chalk'
import fs from 'node:fs'
import YAML from 'yaml'
import { sendToMaster } from './components/Common.js'
import { checkPackage } from './components/CheckPackage.js'
import inquirer from 'inquirer'
import { execSync } from 'node:child_process'
import common from '../../lib/common/common.js'

await initConfig()

async function initConfig() {
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

//屎山代码()
async function firstGuide() {
  let Guide = (await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/config.yaml`,'utf8'))).Guide
  if (Guide === "no" || Guide !== 'yes' || Guide === '') {
    logger.info('以下为WeLM插件用户条约链接请您前往查看: https://gitee.com/shuciqianye/yunzai-custom-dialogue-welm/blob/master/resources/README/document/用户协议.txt')
    const login = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: '请问是否同意本条约?',
        choices: ['同意', '不同意并立即删除插件']
      }
    ])
    if (login.type === '同意') {
      let str = fs.readFileSync('./plugins/WeLM-plugin/config/config.yaml', "utf8")
      var reg = new RegExp(`Guide: "(.*?)"`)
      var config = str.replace(reg, `Guide: "yes"`)
      fs.writeFileSync('./plugins/WeLM-plugin/config/config.yaml', config, "utf8")
      sendToMaster('欢迎您使用WeLM自定义对话插件! \n本插件帮助文档: https://gitee.com/shuciqianye/yunzai-custom-dialogue-welm \n数据无价, 请充分了解本插件功能后再使用! \n感谢您的支持!!!')
      const settings = await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/config.yaml`,'utf8'))
      await common.sleep(200)
      //输出提示
      logger.info('----✩•‿• ʜᴀᴠᴇ ᴀ ɢᴏᴏᴅ ᴛɪᴍᴇ☄︎♡----')
      logger.info(`WeLM对话插件初始化(・ω< )★`)
      logger.info(`当前版本: ${chalk.rgb(150, 50, 100)(Version.version)}`)
      logger.info(`作者: ${chalk.rgb(0, 255, 0)('JD')} ${logger.red('兰罗摩')} ${logger.blue('书辞千楪Sama')}`)
      logger.info(`当前API-Token: "${chalk.rgb(103, 93, 189)(settings.APIToken)}"`)
      logger.info('-------------------------------')
    }
    if (login.type === '不同意并立即删除插件') {
      const del = await inquirer.prompt([
        {
          type: 'list',
          name: 'type',
          message: '确认卸载?',
          choices: ['确认卸载', '算了算了我还是同意吧']
        }
      ])
      if (del.type === '确认卸载') {
        const system = await inquirer.prompt([
          {
            type: 'list',
            name: 'type',
            message: '系统是?',
            choices: ['Windows', 'Linux']
          }
        ])
        if (system.type === 'Windows') {
          const terminal = await inquirer.prompt([
            {
              type: 'list',
              name: 'type',
              message: '使用的终端?',
              choices: ['PowerShell', 'Cmd']
            }
          ])
          if (terminal.type === 'PowerShell') {
            await execSync(`Remove-Item ${process.cwd()}\\plugins\\WeLM-plugin -Recurse -Force`)
            logger.warn('如删除不完全请自行删除')
            return false
          }
          if (terminal.type === 'Cmd') {
            await execSync(`rd /S /Q ${process.cwd()}\\plugins\\WeLM-plugin`)
            logger.warn('如删除不完全请自行删除')
            return false
          }
        }
        if (system.type === 'Linux') {
          await execSync(`rm -rf ${process.cwd()}\\plugins\\WeLM-plugin`)
          logger.warn('如删除不完全请自行删除')
          return false
        }
      }
      if (del.type === '算了算了我还是同意吧') {
        let str = fs.readFileSync('./plugins/WeLM-plugin/config/config.yaml', "utf8")
        var reg = new RegExp(`Guide: "(.*?)"`)
        var config = str.replace(reg, `Guide: "yes"`)
        fs.writeFileSync('./plugins/WeLM-plugin/config/config.yaml', config, "utf8")
        sendToMaster('欢迎您使用WeLM自定义对话插件! \n本插件帮助文档: https://gitee.com/shuciqianye/yunzai-custom-dialogue-welm \n数据无价, 请充分了解本插件功能后再使用! \n感谢您的支持!!!')
        const settings = await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/config.yaml`,'utf8'))
        await common.sleep(200)
        //输出提示
        logger.info('----✩•‿• ʜᴀᴠᴇ ᴀ ɢᴏᴏᴅ ᴛɪᴍᴇ☄︎♡----')
        logger.info(`WeLM对话插件初始化(・ω< )★`)
        logger.info(`当前版本: ${chalk.rgb(150, 50, 100)(Version.version)}`)
        logger.info(`作者: ${chalk.rgb(0, 255, 0)('JD')} ${logger.red('兰罗摩')} ${logger.blue('书辞千楪Sama')}`)
        logger.info(`当前API-Token: "${chalk.rgb(103, 93, 189)(settings.APIToken)}"`)
        logger.info('-------------------------------')
      } 
    }
  } else {
  const settings = await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/config.yaml`,'utf8'))
  await common.sleep(200)
  //输出提示
  logger.info('----✩•‿• ʜᴀᴠᴇ ᴀ ɢᴏᴏᴅ ᴛɪᴍᴇ☄︎♡----')
  logger.info(`WeLM对话插件初始化(・ω< )★`)
  logger.info(`当前版本: ${chalk.rgb(150, 50, 100)(Version.version)}`)
  logger.info(`作者: ${chalk.rgb(0, 255, 0)('JD')} ${logger.red('兰罗摩')} ${logger.blue('书辞千楪Sama')}`)
  logger.info(`当前API-Token: "${chalk.rgb(103, 93, 189)(settings.APIToken)}"`)
  logger.info('-------------------------------')
  }
}

/**
// 原来的代码
await firstGuide()

async function firstGuide() {
  let Guide = (await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/config.yaml`,'utf8'))).Guide
  if (Guide === "no" || Guide !== 'yes' || Guide === '' ) {
    sendToMaster('欢迎您使用WeLM自定义对话插件! \n本插件帮助文档: https://gitee.com/shuciqianye/yunzai-custom-dialogue-welm \n数据无价, 请充分了解本插件功能与用户条约后再使用! \n感谢您的支持!!!')
    let str = fs.readFileSync('./plugins/WeLM-plugin/config/config.yaml', "utf8")
    var reg = new RegExp(`Guide: "(.*?)"`);
    var config = str.replace(reg, `Guide: "yes"`);
    fs.writeFileSync('./plugins/WeLM-plugin/config/config.yaml', config, "utf8");
  }
} 
*/

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