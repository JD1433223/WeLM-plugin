import plugin from '../../../lib/plugins/plugin.js'
import console from 'console'
import fs from 'node:fs'
import common from'../../../lib/common/common.js'

const _path = process.cwd()

export class RGznbot extends plugin {
    constructor() {
        super({
            name: 'WeLM切换预设',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: `^#切换预设.*`,
                    fnc: 'QieHuan',
                },
                {
                    reg: '^#welm预设列表',
                    fnc: 'Read'
                }
            ]
        })
    }
    async QieHuan(e) {
        //备份原本预设

        //换预设
        var name = e.msg.replace(/#切换预设/, "")
        let defFile = `./plugins/WeLM-plugin\/data\/prompts\/${name}dhdata.txt`
        // 异步读取
        fs.readFile(defFile, function (err) {
            if (err) {
                e.reply(name + "预设不存在，请前往WeLM交流群上传预设，或者到插件包根目录/data/prompts目录下创建该预设，详细报错如下" + "\n" + err)
                return console.error(err);
            }

            e.reply("已读取到" + name + "预设，正在写入dhdata，请自行确认该预设能正常使用")
        });
        let yushe = fs.readFileSync(defFile, { encoding: 'utf-8' })
        fs.writeFileSync('./plugins/WeLM-plugin/data/dhdata.txt', yushe, 'utf8')
        //更名
        await common.sleep(1000)
        let res = fs.readFileSync(`${_path}/plugins/WeLM-plugin/config/config.yaml`, "utf8")
        let str = `${res}`
        var reg = new RegExp(`BotName: "(.*?)"`);
        var Botname = str.replace(reg, `BotName: "${name}"`);
        fs.writeFileSync(`${_path}/plugins/WeLM-plugin/config/config.yaml`, Botname, "utf8");
        e.reply("已将预设和name切换为" + name)
    }

    async Read(e) {
        fs.readdir('./plugins/WeLM-plugin/data/prompts', function (err, files) {
            if (err) {
                return console.error(err);
            }
            files.forEach(function (file) {
                e.reply(file);
            });
        }
    )}
}