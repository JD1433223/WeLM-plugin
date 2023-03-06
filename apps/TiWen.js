import plugin from '../../../lib/plugins/plugin.js'
import console from 'console'
import axios from 'axios'
import fs from 'node:fs'
import YAML from 'yaml'
//此JS由书辞千楪(1700179844)编写，JD瞎jb乱搞了一下上传的
//有报错先看这里！！！！！！可能需要cnpm/pnpm/npm install axios yaml fs后才能正常使用，看看简介有其他方式
//有问题问JD(1461072722)或者兰罗摩(脾气很差别问到高血压)(3584075812)JD在上学回复慢，但是一定会回复，也可以去火火的群(666345141)或者JD的群(815638467)里面找JD
//分割线_____________________________
const command = await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/config.yaml`,'utf8'));

export class RGznbot extends plugin {
    constructor() {
        super({
            name: 'WeLM提问',
            event: 'message',
            priority: 5000,
            rule: [
                 {
                    reg: `^${command.twcmdstart}.*`,
                    fnc: 'TiWen',
                    log: false
                }
            ]
        })
    }
    
    async TiWen(e) {
        if (e.xml || e.img) {
			return false;
		}
		const set = await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/switch.yaml`,'utf8'));
		if (e.isGroup) {
			if (set.GroupSwitch === "off") {
				return false
			}
		}
		if (!e.isGroup) {
			if (set.PrivateSwitch === "off") {
				return false
			}
		}
        const settings = await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/config.yaml`,'utf8'));
        //如需配置插件请到本插件文件夹内config的config.yaml进行编辑
        e.msg = e.msg.replace(settings.twcmdstart, "")
		let sc_cs = "根据你所学知识回答" + "\n问题:" + e.msg + "\n" + "回答" + ":"
        axios({
	        method: 'post',
	        url: 'https://welm.weixin.qq.com/v1/completions',
	        headers: {
		        "Content-Type": "application/json",
		        "Authorization": settings.APIToken
	        },
	        data: {
		        "prompt": sc_cs,
		        "model": settings.model,
		        "max_tokens": settings.max_tokens,
		        "temperature": settings.temperature,
		        "top_p": settings.top_p,
		        "top_k": settings.top_k,
		        "n": settings.n,
		        "stop": settings.stop,
	        }
        })
        .then(function (response) {
            logger.info('----------------WeLM调试----------------')
            logger.info('ID:' + response.data.id)
            logger.info('使用的类型:' + response.data.object)
            logger.info('使用的模型:' + response.data.model)
            logger.info('生成的文本:' + response.data.choices[0].text)
            logger.info('----------------------------------------')
            e.reply(settings.twreplystart + response.data.choices[0].text, e.isGroup)
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
    }
}