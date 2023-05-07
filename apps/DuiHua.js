/*
   Copyright (c) 2023 书辞千楪
   WeLM-plugin is licensed under Mulan PSL v2.
   You can use this software according to the terms and conditions of the Mulan PSL v2. 
   You may obtain a copy of Mulan PSL v2 at:
            http://license.coscl.org.cn/MulanPSL2 
   THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.  
   See the Mulan PSL v2 for more details.  
*/

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


const command = await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/config.yaml`,'utf8'));



export class duihua extends plugin {
    constructor() {
        super({
            name: 'WeLM对话',
            event: 'message',
            priority: 10000,
            rule: [
                 {
                    reg: '#清除对话',
                    fnc: 'QingChu',
                },
                {
                    reg: `(^${command.lxdhcmdstart}.*)`,
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
		const set = await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/switch.yaml`,'utf8'));
		if (e.isGroup) {
			if (set.GroupSwitch === "off") {
				return false
			}
		}
		if (e.isPrivate) {
			if (set.PrivateSwitch === "off") {
				return false
			}
		}
		const settings = await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/config.yaml`,'utf8'));
        e.msg = e.msg.replace(settings.lxdhcmdstart, "")
		let xr_mb = "\n我:" + e.msg + "\n" + settings.BotName + ":"         //如果不想要对话记录写入模型prompt请删除这一行。		
		fs.appendFileSync('./plugins/WeLM-plugin/data/jldata.txt', xr_mb, 'utf8')  //如果不想要对话记录写入模型prompt请删除这一行。
		let sc_cs = fs.readFileSync('./plugins/WeLM-plugin/data/jldata.txt', { encoding: 'utf-8' })
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
		        "top_p": settings.top_p ,
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
			fs.appendFileSync('./plugins/WeLM-plugin/data/jldata.txt', response.data.choices[0].text, 'utf8')
			e.reply(settings.lxdhreplystart + response.data.choices[0].text, e.isGroup)
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
			let JiLu = fs.readFileSync('./plugins/WeLM-plugin/data/dhdata.txt', { encoding: 'utf-8' })
		    let xr_mb = JiLu	
	    	fs.writeFileSync('./plugins/WeLM-plugin/data/jldata.txt', xr_mb, 'utf8')
			e.reply(`以下为报错内容(经删减): ` + error)
	    	e.reply("已重置对话，请重新开始")
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
		const set = await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/switch.yaml`,'utf8'));
		if (e.isGroup) {
			if (set.GroupSwitch === "off") {
				return false
			}
		}
		if (e.isPrivate) {
			if (set.PrivateSwitch === "off") {
				return false
			}
		}
		const settings = await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/config.yaml`,'utf8'));
		//如需配置插件请到本插件文件夹内config的config.yaml进行编辑
		let random_ = parseInt(Math.random() * 99);
		if (random_ >= 100 || random_ < settings.probability || e.msg && e.msg?.indexOf(settings.dhcmdstart) >= 0 || e.isPrivate || e.atme) {
			e.msg = e.msg.replace(settings.dhcmdstart, "")
			let sc_cs = `${fs.readFileSync('./plugins/WeLM-plugin/data/dhdata.txt', { encoding: 'utf-8' })}\n我:${e.msg}\n${settings.BotName}:`
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
					e.reply(settings.dhreplystart + response.data.choices[0].text, e.isGroup)
					return false
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
					return false
				});
		} else {
			return false
		}
	}
}