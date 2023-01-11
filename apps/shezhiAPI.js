import plugin from '../../../lib/plugins/plugin.js'
import fs from "fs"
import YAML from 'yaml'
const _path = process.cwd()
export class example extends plugin {
  constructor () {
    super({
      /** 功能名称 */
      name: '填写API',
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
}
      ]
    })
  }


    async atk(e) {
let token = e.msg.replace(/#填写token/g, "").trim();
let token2 = `"${token}"`
let res = fs.readFileSync(`${_path}/plugins/WeLM-plugin/config/config.yaml`,"utf8")

let str = `${res}`
var reg = new RegExp(`"(.*?)"`); 
var a = str.replace(reg,`"${token}"`);
fs.writeFileSync(`${_path}/plugins/WeLM-plugin/config/config.yaml`,a,"utf8");
       e.reply('WeLM Token已填写成功')
    }
} 


































