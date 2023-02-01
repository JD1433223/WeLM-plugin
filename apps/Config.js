import plugin from '../../../lib/plugins/plugin.js'
import fs from 'node:fs'
import YAML from 'yaml'
import axios from 'axios'
//此插件由JD(1461072722)编写
//有报错先看这里！！！！！！可能需要cnpm/pnpm/npm install axios yaml fs后才能正常使用，看看简介有其他方式
//有问题问JD(1461072722)或者兰罗摩(脾气很差别问到高血压)(3584075812)JD在上学回复慢，但是一定会回复，也可以去火火的群(666345141)或者JD的群(815638467)里面找JD
//PS:感谢鸢(2166683295)大佬提供的写入yaml部分
//分割线_____________________________

const _path = process.cwd()


export class RGznbot extends plugin {
  constructor () {
    super({
      /** 功能名称 */
      name: 'WeLM配置更改',
      /** 功能描述 */
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
      if (!e.isMaster) {
          e.reply("JD:要是给你填了那我岂不是很没面子")
        return true
        }
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
        e.reply("JD:要是给你在这填了那我岂不是很没面子")
        return true
      }

      let token = e.msg.replace(/#填写token/g, "").trim()
      let res = fs.readFileSync(`${_path}/plugins/WeLM-plugin/config/config.yaml`,"utf8")
      let str = `${res}`
      var reg = new RegExp(`API_token: "(.*?)"`); 
      var api = str.replace(reg,`API_token: "${token}"`);
      fs.writeFileSync(`${_path}/plugins/WeLM-plugin/config/config.yaml`,api,"utf8")
      e.reply("开始测试token正确性")
      const settings = await YAML.parse(fs.readFileSync(`${_path}/plugins/WeLM-plugin/config/config.yaml`,'utf8'))
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
        logger.info(`Token已更改为:"${token}"`)
        e.reply("token填写成功")
        return true
        })
        .catch(function (error) {
          logger.error(`${token}不可用, 或无法访问welm`)
          e.reply('token不可用或无法访问welm，请检查token或网络')
          console.error(error)
        });
    }
} 


































