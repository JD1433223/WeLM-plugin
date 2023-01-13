import plugin from '../../../lib/plugins/plugin.js'
import console from 'console'
import axios from 'axios'
import fs from 'node:fs'
import YAML from 'yaml'


export class RGznbot extends plugin {
    constructor() {
        super({
            name: 'WeLM阅读理解',
            event: 'message',
            priority: 6000,
            rule: [
                {
                    reg: '(^阅读理解.*)',
	                fnc: 'ydlj',
                },
				{
					reg: '^填文章.*',
					fnc: 'twz'
				},
            ]
        })
    }

    async twz(e) {
		if (e.xml || e.img) {
			return false;
		}
		e.msg = e.msg.replace(/填文章/g, "")
		fs.writeFileSync('./plugins/WeLM-plugin/data/ydlj.txt', e.msg, 'utf8')
		e.reply("已填入文章，可以使用")
	}

    async ydlj(e) {
		if (e.xml || e.img) {
			return false;
		}
		const _path = process.cwd()
		const settings = await YAML.parse(fs.readFileSync(`${_path}/plugins/WeLM-plugin/config/config.yaml`,'utf8'));
        //如需配置插件请到本插件文件夹内config的config.yaml进行编辑
        let API_token = settings.API_token 
        let model = settings.model          
        let max_tokens = settings.max_tokens
        let temperature = settings.temperature   
        let top_p = settings.top_p         
        let top_k = settings.top_k            
        let n = settings.n                
        let stop = settings.stop
        if (e.msg && e.msg?.indexOf("阅读理解") >= 0 || !e.isGroup){
        e.msg = e.msg.replace(/阅读理解/g, "")
		let sc_cs = fs.readFileSync('./plugins/WeLM-plugin/data/ydlj.txt', { encoding: 'utf-8' })
		let sc_cs2 = "阅读文章:\n" +  sc_cs + "\n:" + "问题:" + e.msg + "\n" + "答案" + ":"
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
		    e.reply("(由welm阅读理解)"+response.data.choices[0].text, e.isGroup);
		})          //如果不需要区分welm与其他ai插件的回复的话可以删掉 | "(由welm回答)"+ | 这一部分
		.catch(function (error) {
		    console.log(error);
		});
    }}
}