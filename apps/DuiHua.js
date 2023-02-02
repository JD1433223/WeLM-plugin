import plugin from '../../../lib/plugins/plugin.js'
import console from 'console'
import axios from 'axios'
import fs from 'node:fs'
import YAML from 'yaml'
//此插件由书辞千楪(1700179844)编写，JD瞎jb乱搞了一下上传的
//模型的prompt文件请放到/Yunzai-Bot/plugins/WeLM-plugin/data/
//如果没有dhdata.txt文件，请自行在/Yunzai-Bot/plugins/WeLM-plugin/data/内创建"dhdata.txt文件"。
//有报错先看这里！！！！！！可能需要cnpm/pnpm/npm install axios yaml fs后才能正常使用，看看简介有其他方式
//有问题问JD(1461072722)或者兰罗摩(脾气很差别问到高血压)(3584075812)JD在上学回复慢，但是一定会回复，也可以去火火的群(666345141)或者JD的群(815638467)里面找JD
//分割线_____________________________


const settings = await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/config.yaml`,'utf8'));



export class RGznbot extends plugin {
    constructor() {
        super({
            name: 'WeLM对话',
            event: 'message',
            priority: 60010,
            rule: [
                 {
                    reg: '#清除对话',
                    fnc: 'QingChu',
                },
                {
                    reg: `(^${settings.lxdhcmdstart}.*)`,
	                fnc: 'LianXuDuiHua',
                    log: false
				},
				{
					reg: `(.*)`,
					fnc: 'DuiHua',
					log: false
				}
            ]
        })
    }

	async LianXuDuiHua(e) {
        	//判断一下不是合并消息，不然会报错
        	//下面这个random是随机回复群友的消息，这里的概率是1%，如果不想要的话可以把98改成100
		if (e.xml || e.img) {
			return false;
		}
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
		fs.appendFileSync('./plugins/WeLM-plugin/data/jldata.txt', xr_mb, 'utf8')  //如果不想要对话记录写入模型prompt请删除这一行。
		let sc_cs = fs.readFileSync('./plugins/WeLM-plugin/data/jldata.txt', { encoding: 'utf-8' })
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
			logger.info('WeLM返回消息:' + response.data.choices[0].text);
			fs.appendFileSync('./plugins/WeLM-plugin/data/jldata.txt', response.data.choices[0].text, 'utf8')
		    e.reply(replystart+response.data.choices[0].text, e.isGroup);
		})          //如果不需要区分welm与其他ai插件的回复的话可以删掉 | "(由welm回答)"+ | 这一部分
		.catch(function (error) {
		    console.log(error);
			let JiLu = fs.readFileSync('./plugins/WeLM-plugin/data/dhdata.txt', { encoding: 'utf-8' })
		    let xr_mb = JiLu	
	    	fs.writeFileSync('./plugins/WeLM-plugin/data/jldata.txt', xr_mb, 'utf8')
	    	e.reply("违反政策的内容或者对话字数已达到上限(2048)，已重置对话，请重新开始")
		});
    }

	async QingChu(e) {
		if (e.xml || e.img) {
			return false;
		}
		let JiLu = fs.readFileSync('./plugins/WeLM-plugin/data/dhdata.txt', { encoding: 'utf-8' })
		let xr_mb = JiLu	
		fs.writeFileSync('./plugins/WeLM-plugin/data/jldata.txt', xr_mb, 'utf8')
		e.reply("已清除对话啦")
	}

	async DuiHua(e) {
		//判断一下不是合并消息，不然会报错
		//下面这个random是随机回复群友的消息，这里的概率是1%，如果不想要的话可以把98改成100
		//那个47行的welm是个人用来当做一个100%触发的命令前缀专门用来测试的，可以改成你喜欢的。记得把49行那两个/中间的WeLM改成你自己的前缀
		if (e.xml || e.img) {
			return false;
		}
		//如需配置插件请到本插件文件夹内config的config.yaml进行编辑
		let bot_name = settings.bot_name
		let API_token = settings.API_token
		let model = settings.model
		let max_tokens = settings.max_tokens
		let temperature = settings.temperature
		let top_p = settings.top_p
		let top_k = settings.top_k
		let n = settings.n
		let stop = settings.stop
		let commandstart = settings.dhcmdstart
		let replystart = settings.dhreplystart
		let probability = settings.probability
		let random_ = parseInt(Math.random() * 99);
		if (random_ >= 100 || random_ < probability || e.msg && e.msg?.indexOf(commandstart) >= 0 || !e.isGroup) {
			e.msg = e.msg.replace(commandstart, "")
			let sc_cs = fs.readFileSync('./plugins/WeLM-plugin/data/dhdata.txt', { encoding: 'utf-8' })
			let sc_cs2 = sc_cs + "\n我:" + e.msg + "\n" + bot_name + ":"
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
					"stop": stop,
				}
			})
				.then(function (response) {
					logger.info('WeLM返回消息:' + response.data.choices[0].text);
					e.reply(replystart + response.data.choices[0].text, e.isGroup);
				})          //如果不需要区分welm与其他ai插件的回复的话可以删掉 | "(由welm回答)"+ | 这一部分
				.catch(function (error) {
					console.log(error);
				});
		}
	}
}