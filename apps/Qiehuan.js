import plugin from '../../../lib/plugins/plugin.js'
import console from 'console'
import fs from 'node:fs'
import YAML from 'yaml'

export class RGznbot extends plugin {
    constructor() {
        super({
            name: 'WeLM切换预设',
            event: 'message',
            priority: 5000,
            rule: [
                 {
                    reg: `^#切换预设.*`,
                    fnc: 'Qiehuan',
                }
            ]
        })
    }
    async Qiehuan(e) {
    var name = e.msg.replace(/#切换预设/, "")
    let defFile = `..\/data\/${name}dhdata.txt`
    let yushe = fs.readFileSync(defFile, { encoding: 'utf-8' })
    fs.writeFileSync('../data/dhdata.txt', yushe, 'utf8')
    e.reply("预设切换为" + $[name] + "预设，原预设已存入defdhdata.txt")
    }
}