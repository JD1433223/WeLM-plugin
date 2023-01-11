import plugin from '../../../lib/plugins/plugin.js'
import fs from 'fs'
import YAML from 'yaml'
const _path = process.cwd()
export class example extends plugin {
  constructor () {
    super({
      /** 功能名称 */
      name: 'WeLM 更改设置',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      /** 优先级，数字越小等级越高 */
      priority: 500,
      rule: [
        {
          /** 命令正则匹配 */
          reg: "^#填写token(.*)$",
          /** 执行方法 */
          fnc: 'atk'
},{
          reg: "^#更改name(.*)$",
          /** 执行方法 */
          fnc: 'op'
}
      ]
    })
  }
async op(e) {
let name = e.msg.replace(/#更改name/g, "").trim();
let res = fs.readFileSync(`${_path}/plugins/WeLM-plugin/config/config.yaml`,"utf8")

let str = `${res}`
var reg = new RegExp(`bot_name: "(.*?)"`); 
var a = str.replace(reg,`bot_name: "${name}"`);
fs.writeFileSync(`${_path}/plugins/WeLM-plugin/config/config.yaml`,a,"utf8");
       logger.info('机器人名字已更改为:',`'${name}'`)
       e.reply(`名字已成功修改为${name}`)
    }

    async atk(e) {
let token = e.msg.replace(/#填写token/g, "").trim();
let token2 = `"${token}"`
let res = fs.readFileSync(`${_path}/plugins/WeLM-plugin/config/config.yaml`,"utf8")

let str = `${res}`
var reg = new RegExp(`"(.*?)"`); 
var a = str.replace(reg,`"${token}"`);
fs.writeFileSync(`${_path}/plugins/WeLM-plugin/config/config.yaml`,a,"utf8");
       logger.info('Token已更改为:',`'${token}'`)
       e.reply('token已填写成功')
    }
} 


































