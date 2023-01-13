import plugin from '../../../lib/plugins/plugin.js'
import fs from "fs";
import { segment } from "oicq";
import command from '../components/command.js'
const dirpath = "plugins/WeLM-plugin/data";//文件夹路径

var def_gailv = await command.getConfig("ai_cfg", "def_gailv");
var def_gailv_ = await command.getConfig("ai_cfg", "def_gailv_");
var def_ai_now = await command.getConfig("ai_cfg", "def_ai_now");
var def_onlyReplyAt = await command.getConfig("ai_cfg", "def_onlyReplyAt");
var def_aiopen = await command.getConfig("ai_cfg", "def_aiopen");
var def_num = await command.getConfig("Auto", "def_num");
var def_fdopen = await command.getConfig("Auto", "def_fdopen");
var def_ddopen2 = await command.getConfig("Auto", "def_ddopen2");
//包括ai,run,复读，点赞
var Template = {//创建该用户
    "gailv": def_gailv,
    "aiopen": def_aiopen,
    "onlyReplyAt": def_onlyReplyAt,
    "ai_now": def_ai_now,
    "ai_at": false,
    "fdopen": def_fdopen,
    "ddopen2": def_ddopen2,
    "num": def_num,
    "run": false,
    "thumbUp": false
};



async function getdata(id, json, save) {
    let filename = `data.json`;//文件名
    if (!save) {
        if (!fs.existsSync(dirpath)) {//如果文件夹不存在
            fs.mkdirSync(dirpath);//创建文件夹
        }

        if (!fs.existsSync(dirpath + "/" + filename)) {//如果文件不存在
            fs.writeFileSync(dirpath + "/" + filename, JSON.stringify({//创建文件
            }));
        }
        var json = JSON.parse(fs.readFileSync(dirpath + "/" + filename, "utf8"));//读取文件

        if (!json.hasOwnProperty(id)) {//如果json中不存在该用户
            json[id] = Template
        }
        // let list = Object.keys(json)//获取对象
        // for (var i of list) {
        //     if (!json[id].i) { json[id].i = Template.i }
        // }
        return json;
    }
    else {
        fs.writeFileSync(dirpath + "/" + filename, JSON.stringify(json, null, "\t"));//写入文件
        return json;
    }
}
async function getuser(id, json, filename, Template, save) {
    if (filename.indexOf(".json") == -1) {//如果文件名不包含.json
        filename = filename + ".json";//添加.json
    }
    if (!save) {
        if (!fs.existsSync(dirpath)) {//如果文件夹不存在
            fs.mkdirSync(dirpath);//创建文件夹
        }
        if (!fs.existsSync(dirpath + "/" + filename)) {//如果文件不存在
            fs.writeFileSync(dirpath + "/" + filename, JSON.stringify({//创建文件
            }));
        }
        var json = JSON.parse(fs.readFileSync(dirpath + "/" + filename, "utf8"));//读取文件
        if (!json.hasOwnProperty(id)) {//如果json中不存在该用户
            json[id] = Template
        }
    }
    else {
        fs.writeFileSync(dirpath + "/" + filename, JSON.stringify(json, null, "\t"));//写入文件
        return json;
    }
    return json;
}
async function getuser2(id, json, dirname, Template, save) {
    let filename = `${id}.json`
    if (!save) {
        if (!fs.existsSync(dirpath + "/" + dirname)) {//如果文件夹不存在
            fs.mkdirSync(dirpath + "/" + dirname);//创建文件夹
        }
        if (!fs.existsSync(dirpath + "/" + dirname + "/" + filename)) {//如果文件不存在
            fs.writeFileSync(dirpath + "/" + dirname + "/" + filename, JSON.stringify({//创建文件
            }));
        }
        var json = JSON.parse(fs.readFileSync(dirpath + "/" + dirname + "/" + filename, "utf8"));//读取文件
        if (!json.hasOwnProperty(id)) {//如果json中不存在该用户
            json = Template
        }
    }
    else {
        fs.writeFileSync(dirpath + "/" + dirname + "/" + filename, JSON.stringify(json, null, "\t"));//写入文件
        return json;
    }
    return json;
}
export default { getuser, getuser2, getdata }