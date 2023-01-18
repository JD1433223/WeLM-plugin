import plugin from '../../../lib/plugins/plugin.js'
import console from 'console'
import axios from 'axios'
import fs from 'node:fs'
import YAML from 'yaml'
//此JS由书辞千楪(1700179844)编写，JD瞎jb乱搞了一下上传的
//有报错先看这里！！！！！！可能需要cnpm/pnpm/npm install axios yaml fs后才能正常使用，看看简介有其他方式
//有问题问JD(1461072722)或者兰罗摩(脾气很差别问到高血压)(3584075812)JD在上学回复慢，但是一定会回复，也可以去火火的群(666345141)或者JD的群(815638467)里面找JD
//分割线_____________________________

export class RGznbot extends plugin {
    constructor() {
        super({
            name: '提问',
            event: 'message',
            priority: 5000,
            rule: [
                 {
                    reg: '^提问.*',
                    fnc: 'Wenti',
                    log: false
                }
            ]
        })
    }
    
    async Wenti(e) {
        const settings = await YAML.parse(fs.readFileSync('./plugins/WeLM-plugin/config/config.yaml','utf8'));
        //如需配置插件请到本插件文件夹内config的config.yaml进行编辑
        let API_token = settings.API_token 
        let model = settings.model          
        let max_tokens = settings.max_tokens
        let temperature = settings.temperature   
        let top_p = settings.top_p         
        let top_k = settings.top_k            
        let n = settings.n                      
        let twstop = settings.twstop
        let commandstart = settings.wdcmdstart
        let replystart = settings.wdreplystart
        e.msg = e.msg.replace(commandstart, "")
		let sc_cs2 = "根据你所学知识回答" + "\n问题:" + e.msg + "\n" + "回答" + ":"
        axios({
	        method: 'post',
	        url: 'https://welm.weixin.qq.com/v1/completions',
	        headers: {
		        "Content-Type": "application/json",
		        "Authorization": API_token
	        },
	        data: {
		        "prompt": sc_cs2,
		        "model": model,
		        "max_tokens": max_tokens,
		        "temperature": temperature,
		        "top_p": top_p,
		        "top_k": top_k,
		        "n": n,
		        "stop": twstop,
	        }
        })
		.then(function (response) {
            logger.info('WeLM返回消息:' + response.data.choices[0].text)
		    e.reply(replystart+response.data.choices[0].text, e.isGroup);
		})          //如果不需要区分welm与其他ai插件的回复的话可以删掉 | "(welm提问)"+ | 这一部分
		.catch(function (error) {
		    console.log(error);
        }
    )}
}