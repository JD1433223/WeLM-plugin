/*a
   Copyright (c) 2023 书辞千楪
   WeLM-plugin is licensed under Mulan PSL v2.
   You can use this software according to the terms and conditions of the Mulan PSL v2. 
   You may obtain a copy of Mulan PSL v2 at:
            http://license.coscl.org.cn/MulanPSL2 
   THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.  
   See the Mulan PSL v2 for more details.  
*/

import plugin from '../../../lib/plugins/plugin.js'
import console from 'console'
import fs from 'node:fs'
import common from'../../../lib/common/common.js'

const _path = process.cwd()

export class prompts extends plugin {
    constructor() {
        super({
            name: 'WeLM切换预设',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: `^#切换预设.*`,
                    fnc: 'QieHuan',
                    permission: "master"
                },
                {
                    reg: '^#welm预设列表',
                    fnc: 'Read'
                }
            ]
        })
    }

    //cv的虚空
    async getforwardMsg(message, e) {
        //制作转发消息
        let forwardMsg = []
        for (let i of message) {
            forwardMsg.push(
                {
                    message: i,
                    nickname: Bot.nickname,
                    user_id: Bot.uin
                }
            )
        }
        //发送
        if (e.isGroup) {
            forwardMsg = await e.group.makeForwardMsg(forwardMsg)
        } else {
            forwardMsg = await e.friend.makeForwardMsg(forwardMsg)
        }
        //发送消息
        e.reply(forwardMsg)
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
        let str = fs.readFileSync(`${_path}/plugins/WeLM-plugin/config/config.yaml`, "utf8")
        var reg = new RegExp(`BotName: "(.*?)"`);
        var Botname = str.replace(reg, `BotName: "${name}"`);
        fs.writeFileSync(`${_path}/plugins/WeLM-plugin/config/config.yaml`, Botname, "utf8");
        e.reply("已将预设和name切换为" + name)
    }

    async Read(e) {
        let msg = []
        msg.push("以下为当前可切换预设：")
        fs.readdir('./plugins/WeLM-plugin/data/prompts', function (err, files) {
            if (err) {
                e.reply("读取时出现错误，请查看日志");
                logger.error(err);
                return false
            }
            files.forEach(function (file) {
                msg.push(String(file).replace(/dhdata.txt/g, ""));
            });
        })
        await common.sleep(300)
        this.getforwardMsg(msg,e)
    }
}