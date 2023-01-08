import plugin from '../../lib/plugins/plugin.js'
import console from 'console'
import axios from 'axios'
import fs from 'node:fs'
//此插件由[书辞千楪(1700179844)]编写，JD瞎jb乱搞了一下上传的
//模型的prompt文件请放到/Yunzai-Bot/resources/dhdata.txt
//如果没有dhdata.txt文件，请自行在/Yunzai-Bot/resources/内创建"dhdata.txt文件"。
//提问需要再resources里多放个那个wddata.txt
//续写只需加个空的xxdata.txt就行了
//有报错先看这里！！！！！！可能需要npm add axios -w后才能正常使用，看看简介有其他方式
//有问题问JD(1461072722)在上学回复慢，但是一定会回复，也可以去火火的群(666345141)里面找JD


let bot_name = "纳西妲" //你机器人角色昵称or自设之类的?
let API_token = "填这个双引号里面" //你的API-token，没有自己上WeLM官网https://docs.qq.com/form/page/DUW1YVVJNbHpzV2No#/fill-detail申请
let dhcmdstart = "welm" //对话指令开头
let wdcmdstart = "提问" //问答指令开头
let xxcmdstart = "续写" //续写指令开头
let dhreplystart = "(由WeLM回答)" //对话指令回复开头备注, 不用与其他ai区分时可留空
let wdreplystart = "(由WeLM提问)" //问答指令回复开头备注, 不用与其他ai区分时可留空
let xxreplystart = "(由WeLM续写)" //续写指令回复开头备注, 不用与其他ai区分时可留空
//模型参数调试专区
let model = "xl"           //要使用的模型名称，当前支持的模型名称有medium、 large 和 xl
let max_tokens = "128" 
let max_tokens_xx = "256"    //最多生成的token个数，默认值 16
let temperature = "0.85"   //默认值 0.85，表示使用的
let top_p = "0.65"         //默认值 0.95，来源于nucleus sampling，采用的是累计概率的方式。
let top_k = "0"            //默认值50，从概率分布中依据概率最大选择k个单词，建议不要过小导致模型能选择的词汇少。
let n = "2"                //默认值 1 返回的序列的个数
let stop = "\n"            //默认值 null，停止符号。当模型当前生成的字符为stop中的任何一个字符时，会停止生成。
let twstop = "。"
//分割线_____________________________


export class RGznbot extends plugin {
    constructor() {
        super({
            name: 'WeLM对话',
            event: 'message',
            priority: 60010,
            rule: [
                 {
                    reg: '^提问.*',
                    fnc: 'Wenti',
                    log: false
                },
                {
                    reg: '^续写.*',
                    fnc: 'Xuxie',
                },
                {
                    reg: '(.*)',
	                fnc: 'Msg',
	                log: false
                }
            ]
        })
    }
    
    async Msg(e) {
        	//判断一下不是合并消息，不然会报错
        	//下面这个random是随机回复群友的消息，这里的概率是1%，如果不想要的话可以把98改成100
        	//那个47行的welm是个人用来当做一个100%触发的命令前缀专门用来测试的，可以改成你喜欢的。记得把49行那两个/中间的welm改成你自己的前缀
		if (e.xml || e.img) {
			return false;
		}
        let random_ = parseInt(Math.random() * 99);
        if (random_ >=98 || random_ <=0 || e.msg && e.msg?.indexOf("welm") >= 0 || !e.isGroup){
        e.msg = e.msg.replace(dhcmdstart, "")
		let sc_cs = fs.readFileSync('./resources/dhdata.txt', { encoding: 'utf-8' })
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
		    console.log(response.data.choices[0]);
		    e.reply(dhreplystart+response.data.choices[0].text, e.isGroup);
		})          //如果不需要区分welm与其他ai插件的回复的话可以删掉 | "(由welm回答)"+ | 这一部分
		.catch(function (error) {
		    console.log(error);
		});
    }}
 
    async Wenti(e) {
        e.msg = e.msg.replace(wdcmdstart, "")
        let sc_cs = fs.readFileSync('./resources/wddata.txt', { encoding: 'utf-8' })
		let sc_cs2 = sc_cs + "\n问题:" + e.msg + "\n" + "回答" + ":"
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
		.then(function (respone) {
		    console.log(respone.data.choices[0]);
		    e.reply(wdreplystart+respone.data.choices[0].text, e.isGroup);
		})          //如果不需要区分welm与其他ai插件的回复的话可以删掉 | "(welm提问)"+ | 这一部分
		.catch(function (error) {
		    console.log(error);
        }
    )}

	async Xuxie(e) {
        e.msg = e.msg.replace(xxcmdstart, "")
        let sc_cs = fs.readFileSync('./resources/xxdata.txt', { encoding: 'utf-8' })
		let sc_cs2 = sc_cs + e.msg
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
		        "max_tokens": max_tokens_xx,
		        "temperature": temperature,
		        "top_p": top_p,
		        "top_k": top_k,
		        "n": n,
		        "stop": stop,
	        }
        })
		.then(function (respone) {
		    console.log(respone.data.choices[0]);
		    e.reply(xxreplystart+respone.data.choices[0].text, e.isGroup);
		})          //如果不需要区分welm与其他ai插件的回复的话可以删掉 | "(welm提问)"+ | 这一部分
		.catch(function (error) {
		    console.log(error);
        }
    )}
}