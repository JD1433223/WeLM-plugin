import fs from 'fs'

await init()

/** 初始化事件 */
async function init() {
  //检测有没有配置文件
  const configPath = process.cwd().replace(/\\/g, "/") + '/plugins/WeLM-plugin/'
  let path = configPath + 'config/'
  let pathDef = configPath + 'defSet/'
  const files = fs.readdirSync(pathDef).filter(file => file.endsWith('.yaml'))
  for (let file of files) {
    if (!fs.existsSync(`${path}${file}`)) {
      fs.copyFileSync(`${pathDef}${file}`, `${path}${file}`)
    }
  }
}
