import plugin from '../../../lib/plugins/plugin.js'
import console from 'console'
import axios from 'axios'
import fs from 'node:fs'
import YAML from 'yaml'
//此插件由[书辞千楪(1700179844)]编写，JD瞎jb乱搞了一下上传的
//模型的prompt文件请放到/Yunzai-Bot/resources/dhdata.txt
//如果没有dhdata.txt文件，请自行在/Yunzai-Bot/resources/内创建"dhdata.txt文件"。
//提问需要再resources里多放个那个wddata.txt
//续写只需加个空的xxdata.txt就行了
//有报错先看这里！！！！！！可能需要npm add axios -w后才能正常使用，看看简介有其他方式
//有问题问JD(1461072722)在上学回复慢，但是一定会回复，也可以去火火的群(666345141)里面找JD
//分割线_____________________________


export class RGznbot extends plugin {
    constructor() {
        super({
            name: '对话',
            event: 'message',
            priority: 60000,
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
        	//下面这个random是随机回复群友的消息，这里的概率是1%，如果不想要的话可以把98改成100
        	//那个47行的welm是个人用来当做一个100%触发的命令前缀专门用来测试的，可以改成你喜欢的。记得把49行那两个/中间的WeLM改成你自己的前缀
		if (e.xml || e.img) {
			return false;
		}
        const _path = process.cwd()
		const settings = await YAML.parse(fs.readFileSync(`${_path}/plugins/WeLM-plugin/config/config.yaml`,'utf8'));
        //如需配置插件请到本插件文件夹内config的config.yaml进行编辑
        let bot_name =  settings.bot_name 
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
        let random_ = parseInt(Math.random() * 99);
        if (random_ >=98 || random_ <=0 || e.msg && e.msg?.indexOf(commandstart) >= 0 || !e.isGroup){
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
		    console.log(response.data.choices[0]);
		    e.reply(replystart+response.data.choices[0].text, e.isGroup);
		})          //如果不需要区分welm与其他ai插件的回复的话可以删掉 | "(由welm回答)"+ | 这一部分
		.catch(function (error) {
		    console.log(error);
		});
    }}
}