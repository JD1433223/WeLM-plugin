import fs from 'fs'

await init()

/** 初始化事件 */
async function init() {
  //检查有没有config/config.yaml
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
