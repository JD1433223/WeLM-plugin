import plugin from '../../../lib/plugins/plugin.js'
import fs from 'fs'
import YAML from 'yaml'
import common from'../../../lib/common/common.js'
import axios from 'axios'
//感谢@鸢大佬提供的写入yaml部分
const _path = process.cwd()
export class example extends plugin {
  constructor () {
    super({
      /** 功能名称 */
      name: 'ai',
      /** 功能描述 */
      dsc: '简单开发示例',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      /** 优先级，数字越小等级越高 */
      priority: 500,
      rule: [
        {
          /** 命令正则匹配 */
          reg: "^#开始填写token(.*)$",
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
       e.reply(`名字已成功修改为${name}`)
    }

    async atk(e) {
      if (e.isGroup || !e.isMaster) {
        e.reply("要是给你在这填了那我岂不是很没面子")
        return true
      }

      let token = e.msg.replace(/#开始填写token/g, "").trim();
      let token2 = `"${token}"`
      let res = fs.readFileSync(`${_path}/plugins/WeLM-plugin/config/config.yaml`,"utf8")
      let str = `${res}`
      var reg = new RegExp(`"(.*?)"`); 
      var a = str.replace(reg,`"${token}"`);
      fs.writeFileSync(`${_path}/plugins/WeLM-plugin/config/config.yaml`,a,"utf8");
      e.reply("开始测试token正确性")
      await common.sleep(1000)
      const settings = await YAML.parse(fs.readFileSync(`${_path}/plugins/WeLM-plugin/config/config.yaml`,'utf8'));
      let API_token = settings.API_token
      axios({
	        method: 'post',
	        url: 'https://welm.weixin.qq.com/v1/completions',
	        headers: {
		        "Content-Type": "application/json",
		        "Authorization": API_token
	        },
	        data: {
		        "prompt": "测试",
		        "model": "xl",
		        "max_tokens": "64",
		        "temperature": "0.85",
		        "top_p": "0.95",
		        "top_k": "50",
		        "n": "2",
		        "stop": "\n",
	        }
        })
        .then(function (response) {
        logger.info('Token已更改为:',`"${token}"`);
        e.reply("token填写成功")
        return true
        })
        .catch(function (error) {
          console.log(error);
          e.reply('token不可用或者无法访问welm，请检查token或网络')
        });
    }
} 


































