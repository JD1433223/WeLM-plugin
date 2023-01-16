import lodash from 'lodash'
import fs from 'fs'
import { Cfg, Version, Common, Data, App } from '../components/index.js'
import HelpTheme from './help/HelpTheme.js'

export class RGznbot extends plugin {
  constructor() {
    super({
      /** 功能名称 */
      name: '帮助',
      /** 功能描述 */
      dsc: '',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      /** 优先级，数字越小等级越高 */
      priority: 500,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^#welm(规则|帮助|版本)$',
          /** 执行方法 */
          fnc: 'message'
        }
      ]
    });
  }

async message(e) {
const _path = process.cwd()
const helpPath = `${_path}/plugins/WeLM-plugin/resources/help`


  if (!/#welm帮助/.test(e.msg) && !Cfg.get('help', false)) {
    return false
  }

  let custom = {}
  let help = {}
  if (fs.existsSync(`${helpPath}/help-cfg.js`)) {
    console.log('WeLM-plugin: 检测到存在help-cfg.js配置\n建议将help-cfg.js移为config/help.js或重新复制config/help_default.js进行配置~')
    help = await import(`file://${helpPath}/help-cfg.js?version=${new Date().getTime()}`)
  } else if (fs.existsSync(`${helpPath}/help-list.js`)) {
    console.log('WeLM-plugin: 检测到存在help-list.js配置，建议将help-list.js移为config/help.js或重新复制config/help_default.js进行配置~')
    help = await import(`file://${helpPath}/help-list.js?version=${new Date().getTime()}`)
  }

  let { diyCfg, sysCfg } = await Data.importCfg('help')

  // 兼容一下旧字段
  if (lodash.isArray(help.helpCfg)) {
    custom = {
      helpList: help.helpCfg,
      helpCfg: {}
    }
  } else {
    custom = help
  }

  let helpConfig = lodash.defaults(diyCfg.helpCfg || {}, custom.helpCfg, sysCfg.helpCfg)
  let helpList = diyCfg.helpList || custom.helpList || sysCfg.helpList

  let helpGroup = []

  lodash.forEach(helpList, (group) => {
    if (group.auth && group.auth === 'master' && !e.isMaster) {
      return true
    }

    lodash.forEach(group.list, (help) => {
      let icon = help.icon * 1
      if (!icon) {
        help.css = 'display:none'
      } else {
        let x = (icon - 1) % 10
        let y = (icon - x - 1) / 10
        help.css = `background-position:-${x * 50}px -${y * 50}px`
      }
    })

    helpGroup.push(group)
  })
  let themeData = await HelpTheme.getThemeData(diyCfg.helpCfg || {}, sysCfg.helpCfg || {})
  return await Common.render('help/index', {
    helpCfg: helpConfig,
    helpGroup,
    ...themeData,
    element: 'default'
  }, { e, scale: 1.2 })
}}
