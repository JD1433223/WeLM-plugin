import fs from 'fs'
import lodash from 'lodash'
import cfg from '../../../lib/config/config.js'
import YAML from 'yaml'
const Plugin_Path = `${process.cwd()}/plugins/WeLM-plugin`;
const README_path = `${Plugin_Path}/README.md`//帮助
const CHANGELOG_path = `${Plugin_Path}/CHANGELOG.md`//更新
const yunzai_ver = `v${cfg.package.version}`;//云崽的版本
const version = await YAML.parse(fs.readFileSync('./plugins/WeLM-plugin/config/version.yaml','utf8'));

let logs = {}
let changelogs = []
let currentVersion = version.version
let versionCount = 6

let packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

//这里申明了几个变量
const getLine = function (line) {
  line = line.replace(/(^\s*\*|\r)/g, '')
  line = line.replace(/\s*`([^`]+`)/g, '<span class="cmd">$1')
  line = line.replace(/`\s*/g, '</span>')
  line = line.replace(/\s*\*\*([^\*]+\*\*)/g, '<span class="strong">$1')
  line = line.replace(/\*\*\s*/g, '</span>')
  line = line.replace(/ⁿᵉʷ/g, '<span class="new"></span>')
  return line
}
//对一行数据进行处理
try {
  if (fs.existsSync(CHANGELOG_path)) {
    logs = fs.readFileSync(CHANGELOG_path, 'utf8') || ''
    logs = logs.replace(/\t/g, '   ').split('\n')
    let temp = {};
    let lastLine = {}
    lodash.forEach(logs, (line) => {
      if (versionCount <= -1) {
        return false
      }
      let versionRet = /^#\s*([0-9a-zA-Z\\.~\s]+?)\s*$/.exec(line.trim())
      if (versionRet && versionRet[1]) {
        let v = versionRet[1].trim()
        if (!currentVersion) {
          currentVersion = v
        } else {
          changelogs.push(temp)
          if (/0\s*$/.test(v) && versionCount > 0) {
            //versionCount = 0
            versionCount--
          } else {
            versionCount--
          }
        }
        temp = {
          version: v,
          logs: []
        }
      } else {
        if (!line.trim()) {
          return
        }
        if (/^\*/.test(line)) {
          lastLine = {
            title: getLine(line),
            logs: []
          }
          if (!temp.logs) {
            temp = {
              version: line,
              logs: []
            }
          }
          temp.logs.push(lastLine)
        } else if (/^\s{2,}\*/.test(line)) {
          lastLine.logs.push(getLine(line))
        }
      }
    })
  }
} catch (e) {
  logger.error(e);
  // do nth
}

try {
  if (fs.existsSync(README_path)) {
    let README = fs.readFileSync(README_path, 'utf8') || ''
    let reg = /版本：(.*)/.exec(README)
    if (reg) {
      currentVersion = reg[1]
    }
  }
} catch (err) { }

const yunzaiVersion = packageJson.version
const isV3 = yunzaiVersion[0] === '3'

//这个是version出口的东西
let Version = {
  get ver() {
    return currentVersion;
  },
  get yunzai() {
    return yunzai_ver;
  },
  get logs() {
    return changelogs;
  },
  runtime() {
    console.log(`未能找到e.runtime，请升级至最新版${isV3 ? 'V3' : 'V2'}-Yunzai以使用WeLM-plugin`)
    //这个是cv喵佬的，但是我没找到package.json，有点害怕报错
    //现在找到了，这个是云崽根目录的那个
  }
}
export default Version
//export default向外暴露的成员，可以使用任意变量来接收，看不懂