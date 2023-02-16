import plugin from '../../../lib/plugins/plugin.js'
import console from 'console'
import axios from 'axios'
import fs from 'node:fs'
import YAML from 'yaml'
//此JS由JD(1461072722)编写
//有报错先看这里！！！！！！可能需要cnpm/pnpm/npm install axios yaml fs后才能正常使用，看看简介有其他方式
//有问题问JD(1461072722)或者兰罗摩(脾气很差别问到高血压)(3584075812)JD在上学回复慢，但是一定会回复，也可以去火火的群(666345141)或者JD的群(815638467)里面找JD
//分割线_____________________________

const command = await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/config.yaml`,'utf8'));

export class RGznbot extends plugin {
    constructor() {
        super({
            name: 'WeLM阅读理解',
            event: 'message',
            priority: 6000,
            rule: [
                {
                    reg: `(^${command.ydljcmdstart}.*)`,
	                fnc: 'YueDuLiJie',
                },
				{
					reg: '^填文章.*',
					fnc: 'Tian'
				},
            ]
        })
    }

    async Tian(e) {
		if (e.xml || e.img) {
			return false;
		}
		e.msg = e.msg.replace(/填文章/g, "")
		fs.writeFileSync('./plugins/WeLM-plugin/data/ydljdata.txt', e.msg, 'utf8')
		e.reply("已填入文章，可以使用")
	}

    async YueDuLiJie(e) {
		if (e.xml || e.img) {
			return false;
		}
		const set = await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/set.yaml`,'utf8'));
		if (set.GroupSwitch === false) {
			return false
		}
		if (set.PrivateSwitch === false) {
			return false
		}
		const settings = await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/config.yaml`,'utf8'));
        //如需配置插件请到本插件文件夹内config的config.yaml进行编辑
        let APIToken = settings.APIToken 
        let model = settings.model          
        let max_tokens = settings.max_tokens
        let temperature = settings.temperature   
        let top_p = settings.top_p         
        let top_k = settings.top_k            
        let n = settings.n                
		let stop = settings.stop
		let commandstart = settings.ydljcmdstart
		let replystart = settings.ydljreplystart
		if (e.msg && e.msg?.indexOf(commandstart) >= 0 || !e.isGroup) {
        e.msg = e.msg.replace(commandstart, "")
		let sc_cs = fs.readFileSync('./plugins/WeLM-plugin/data/ydljdata.txt', { encoding: 'utf-8' })
		let sc_cs2 = "阅读文章:\n" +  sc_cs + "\n:" + "问题:" + e.msg + "\n" + "答案" + ":"
        axios({
	        method: 'post',
	        url: 'https://welm.weixin.qq.com/v1/completions',
	        headers: {
		        "Content-Type": "application/json",
		        "Authorization": APIToken
	        },
	        data: {
		        "prompt": sc_cs2,
		        "model": model,
		        "max_tokens": max_tokens,
		        "temperature": temperature,
		        "top_p": top_p,
		        "top_k": top_k,
		        "n": n,
		        "stop": stop,
	        }
        })
		.then(function (response) {
			logger.info('----------------WeLM调试----------------')
			logger.info('ID:' + response.data.id)
			logger.info('使用的类型:' + response.data.object)
			logger.info('使用的模型:' + response.data.model)
			logger.info('生成的文本:' + response.data.choices[0].text)
			logger.info('----------------------------------------')
			e.reply(replystart + response.data.choices[0].text, e.isGroup)
		})        
		.catch(function (error) {
			logger.error('----------------WeLM出现错误----------------')
			logger.error('报错内容(经缩减): ' + error)
			logger.error('-------------------分隔符-------------------')
			logger.warn('以下为常规报错内容(如果报错内容不含有以下任何一种请提出issues至Github或Gitee, 或进群讨论): ')
			logger.warn('超时：504')
			logger.warn('服务不可用：503')
			logger.warn('用户prompt命中敏感词：400')
			logger.warn('生成结果命中敏感词：200')
			logger.warn('用户输入参数不合法：400')
			logger.warn('配额超限制：429')
			logger.warn('请求频率超限制：429')
			logger.warn('Token不可用：403')
			logger.error('-------------------------------------------')
		});
    }}
}