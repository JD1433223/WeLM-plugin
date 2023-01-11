import fs from 'node:fs'
import axios from 'axios'
import YAML from 'yaml'
logger.info('-----------------------')
logger.info('WeLM AI对话插件初始化中~')
logger.info('-----------------------')
const settings = await YAML.parse(fs.readFileSync(`./plugins/WeLM-plugin/config/config.yaml`,'utf8'));
      let API_token = settings.API_token
      axios({
	        method: 'post',
	        url: 'https://welm.weixin.qq.com/v1/completions',
	        headers: {
		        "Content-Type": "application/json",
		        "Authorization": API_token
	        },
	        data: {
		        "prompt": "测试",
		        "model": "xl",
		        "max_tokens": "64",
		        "temperature": "0.85",
		        "top_p": "0.95",
		        "top_k": "50",
		        "n": "2",
		        "stop": "\n",
	        }
        })
        .then(function (response) {
        logger.info('初始化成功~')
        logger.info('API-Token:',settings.API_token)
        logger.info('')
        return true
        })
        .catch(function (error) {
        logger.error('初始化失败(悲)')
        logger.error('API-Token检测失败(API-Token未填写或网络错误)')
        logger.info('-----------------------')  
        }
      )

const files = fs.readdirSync('./plugins/WeLM-plugin/apps').filter(file => file.endsWith('.js'))

let ret = []

files.forEach((file) => {
  ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
  let name = files[i].replace('.js', '')

  if (ret[i].status !== 'fulfilled') {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
export { apps }
