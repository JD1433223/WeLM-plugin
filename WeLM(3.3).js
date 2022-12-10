    import plugin from '../../lib/plugins/plugin.js'
import { Console } from "console";
import axios from 'axios'
import fs from 'node:fs'
//此插件由[书辞千楪(1700179844)]编写
//模型的prompt文件请放到/Yunzai-Bot/resources/dhdata.txt
//如果没有dhdata.txt文件，请自行在/Yunzai-Bot/resources/内创建"dhdata.txt文件"。
//有报错先看这里！！！！！！可能需要pnpm add axios -w后才能正常使用
//有问题到渔火群里面问问渔火吧他包更新的（狗头

let bot_name = "机器人名字如(纳西妲)" //你机器人角色昵称or自设之类的?
let API_token = "token填这两个双引号之间" //你的API-token，没有自己上WeLM官网https://docs.qq.com/form/page/DUW1YVVJNbHpzV2No#/fill-detail申请。
//模型参数调试专区
let model = "xl"           //要使用的模型名称，当前支持的模型名称有medium、 large 和 xl
let max_tokens = "128"     //最多生成的token个数，默认值 16
let temperature = "0.85"   //默认值 0.85，表示使用的
let top_p = "0.65"         //默认值 0.95，来源于nucleus sampling，采用的是累计概率的方式。
let top_k = "0"            //默认值50，从概率分布中依据概率最大选择k个单词，建议不要过小导致模型能选择的词汇少。
let n = "2"                //默认值 1 返回的序列的个数
let stop = "\n"            //默认值 null，停止符号。当模型当前生成的字符为stop中的任何一个字符时，会停止生成。
//分割线_____________________________


export class RGznbot extends plugin {
    constructor() {
        super({
            name: 'WeLM对话',
            event: 'message',
            priority: 60010,
            rule: [
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
        	//下面这个random是随机回复群友的消息，这里的概率是1%，如果不想要的话可以把98改成100。
        	//那个47行的welm是个人用来当做一个100%触发的命令前缀专门用来测试的，可以改成你喜欢的。
		if (e.xml || e.img) {
			return false;
		}
        let random_ = parseInt(Math.random() * 99);
        if (random_ >=98 || random_ <=0 || e.msg && e.msg?.indexOf("welm") >= 0){
        e.msg = e.msg.replace(/welm/g, "")
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
		    e.reply("(由welm回答)"+response.data.choices[0].text, e.isGroup);
		})          //如果不需要区分welm与其他ai插件的回复的话可以删掉 | "(由welm回答)"+ | 这一部分
		.catch(function (error) {
		    console.log(error);
		});
    }}
}