import plugin from '../../../lib/plugins/plugin.js'
import console from 'console'
import axios from 'axios'
import fs from 'node:fs'
import YAML from 'yaml'

//此插件由[书辞千楪(1700179844)]编写
//模型的prompt文件请放到/Yunzai-Bot/WeLM-plugin/data/dhdata.txt
//如果没有dhdata.txt文件，请自行在/Yunzai-Bot/WeLM-plugin/data/内创建"dhdata.txt文件"。
//有报错先看这里！！！！！！可能需要pnpm add axios -w后才能正常使用
//分割线_____________________________


export class RGznbot extends plugin {
    constructor() {
        super({
            name: '对话(连续)',
            event: 'message',
            priority: 5000,
            rule: [
                 {
                    reg: '#清除对话',
                    fnc: 'Cz',
                },
                {
                    reg: '(^lxdh.*)',
	                fnc: 'Msg',
                    log: false
                }
            ]
        })
    }
    
    async Msg(e) {
        	//判断一下不是合并消息，不然会报错
        	//下面这个random是随机回复群友的消息，这里的概率是1%，如果不想要的话可以把98改成100
		if (e.xml || e.img) {
			return false;
		}
		const _path = process.cwd()
        const settings = await YAML.parse(fs.readFileSync(`${_path}/plugins/WeLM-plugin/config/config.yaml`,'utf8'));
        let bot_name =  settings.bot_name 
        let API_token = settings.API_token 
        let model = settings.model          
        let max_tokens = settings.max_tokens
        let temperature = settings.temperature   
        let top_p = settings.top_p         
        let top_k = settings.top_k            
        let n = settings.n                
        let stop = settings.stop            
        let commandstart = settings.lxdhcmdstart
        let replystart = settings.lxdhreplystart
        e.msg = e.msg.replace(commandstart, "")
		let xr_mb = "\n我:" + e.msg + "\n" + bot_name + ":"         //如果不想要对话记录写入模型prompt请删除这一行。		
		fs.appendFileSync('./plugins/WeLM-plugin/data/gldata.txt', xr_mb, 'utf8')  //如果不想要对话记录写入模型prompt请删除这一行。
		let sc_cs = fs.readFileSync('./plugins/WeLM-plugin/data/gldata.txt', { encoding: 'utf-8' })
        axios({
	        method: 'post',
	        url: 'https://welm.weixin.qq.com/v1/completions',
	        headers: {
		        "Content-Type": "application/json",
		        "Authorization": API_token
	        },
	        data: {
		        "prompt": sc_cs,
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
		    console.log(response.data.choices[0]);
			fs.appendFileSync('./plugins/WeLM-plugin/data/gldata.txt', response.data.choices[0].text, 'utf8')
		    e.reply(replystart+response.data.choices[0].text, e.isGroup);
		})          //如果不需要区分welm与其他ai插件的回复的话可以删掉 | "(由welm回答)"+ | 这一部分
		.catch(function (error) {
		    console.log(error);
			let ys = fs.readFileSync('./plugins/WeLM-plugin/data/dhdata.txt', { encoding: 'utf-8' })
		    let xr_mb = ys	
	    	fs.writeFileSync('./plugins/WeLM-plugin/data/gldata.txt', xr_mb, 'utf8')
	    	e.reply("违反政策的内容或者对话字数已达到上限(2048)，已重置对话，请重新开始")
		});
    }

	async Cz(e) {
		let ys = fs.readFileSync('./plugins/WeLM-plugin/data/dhdata.txt', { encoding: 'utf-8' })
		let xr_mb = ys	
		fs.writeFileSync('./plugins/WeLM-plugin/data/gldata.txt', xr_mb, 'utf8')
		e.reply("已清除对话啦")
	}
}