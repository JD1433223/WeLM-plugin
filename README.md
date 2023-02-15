<p align="center">
  <img src="./resources/README/img/logo.jpg" alt="WeLM-plugin"></a>
</p>

<div align="center">

# WeLM-plugin

_🎉 基于 Yunzai-Bot 的 AI 对话插件 🎉_

</div>

<p align="center">
  </a>
    <img src="./resources/README/img/head.jpg"> <!--施工中(没图)-->
  </a>
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/Nodejs-16.x+-6BA552.svg" alt="Nodejs">
  <img src="https://img.shields.io/badge/Yunzai_Bot-v3-red.svg" alt="NoneBot">
  <br>
  </a>
    <a href="https://jq.qq.com/?_wv=1027&k=5jt6obxk">
    <img src="https://img.shields.io/badge/QQ%E7%BE%A4-%E7%BA%B3%E8%A5%BF%E5%A6%B2%20%F0%9F%A4%A4%F0%9F%A4%A4%F0%9F%A4%A4%20-green?style=flat-square" alt="QQ Chat Group">
  </a>
</p>

<!--
以上Html代码cv自渔火的Ap-Plugin(https://gitee.com/yhArcadia/ap-plugin)
@Author: 渔火Arcadia  https://github.com/yhArcadia
@Date: 2022-12-22 00:38:21
@LastEditors: 渔火Arcadia
@LastEditTime: 2023-02-08 17:27:42
@FilePath: \Yunzai-Bot\plugins\ap-plugin\README.md
@Description: 版本：2.11.5

Copyright (c) 2022 by 渔火Arcadia 1761869682@qq.com, All Rights Reserved.
-->

# 简介
WeLM-plugin是一款在 QQ 内快速调用[WeLM](https://welm.weixin.qq.com/docs/tutorial/)提供的 API 接口进行多参数便捷 AI 对话的 [Yunzai-Bot](https://github.com/Le-niao/Yunzai-Bot) 插件, 此插件功能不断扩展中如有意见或新功能思想可在issues提出, 更多功能敬请期待......

# 安装教程

## 插件包版(推荐)
### 第一步
在Yunzai-Bot根目录打开终端并选择一个执行   **_PS:如果不使用给出的命令安装插件包版可能会无法载入插件, 并且不要2个都执行!!!!!!!!!!!!!!!!!!!!!!!_**
```
# GitHub(进不去时可使用Gitee源)
git clone -b master --depth=1 https://github.com/JD1433223/WeLM-plugin.git ./plugins/WeLM-plugin
# Gitee 
git clone -b master --depth=1 https://gitee.com/shuciqianye/yunzai-custom-dialogue-welm.git ./plugins/WeLM-plugin
```
### 第二步
对机器人私聊"#填写token xxx"（这个xxx是你的API-Token） _如果没有去这个文档申请[WeLM申请文档](https://docs.qq.com/form/page/DUW1YVVJNbHpzV2No#/fill-detail)_ 
![](resources/README/img/token.jpg)
### 第三步
_PS:txt在WeLM-plugin/data内_
#### 个性问答
需要在dhdata.txt内写入预设，预设内第1行输入给模型的提示信息，然后回车空一行，接下来写一段模拟的对话。强烈建议去看看去看那个[dhdata演示](./resources/README/markdown/dhdata.md)学习一下，如果再不理解可以到渔火的群蒙德幼儿园找一个叫"群傻逼时不时来问问题喵~"的人问一下。或者!!!如果你机器人也是纳西妲的话可以把演示里的复制粘贴到data/dhdata.txt直接开用(强烈建议自己研究下，我用的这个对话起来bug很多)
### 第四步(可选)
使用#更改name xxx把name改成和预设里面机器人要扮演的角色一样的名字
![](resources/README/img/name.jpg)

## JS版(不推荐)
 _**PS:版本比较旧**_
### 第一步
在任意目录打开终端并输入

```
# GitHub(进不去时可使用Gitee源)
git clone -b js-version --depth=1 https://github.com/JD1433223/WeLM-plugin ./plugins/WeLM-plugin
# Gitee 
git clone -b js-version --depth=1 https://gitee.com/shuciqianye/yunzai-custom-dialogue-welm/ ./plugin/WeLM-plugin
```
### 第二步
在拉取下来的内容里找到WeLM.js并将他移动到Yunzai-Bot根目录下的plugins/example
### 第三步
将所有拉取下来的txt文件移动到Yunzai-Bot根目录下的resources文件夹内
### 第四步
_PS:这一步的所有txt都是上一步移动的文件_
#### 个性问答
需要在dhdata.txt内写入预设，预设内第1行输入给模型的提示信息，然后回车空一行，接下来写一段模拟的对话。强烈建议去看看去看那个dhdata.txt演示学习一下，如果再不理解可以到渔火的群蒙德幼儿园找一个叫"群傻逼时不时来问问题喵~"的人问一下。或者!!!如果你机器人也是纳西妲的话可以把"(JD自用演示)"直接删了放到resources里直接开用(强烈建议自己研究下，我用的这个对话起来bug很多)
#### 提问
需要填写wddata.txt后才能正常使用
#### 续写
需要填写xxdata.txt后才能正常使用

# 可能遇到的问题

## 缺少依赖
![](resources/README/img/error1.png)

第一次使用可能会出现图上的错误, 三选一执行:

pnpm可能会掉依赖，希望你不要中奖
``` 
pnpm add axios -w
```
npm可能连不上
```
npm install axios 
```
cnpm需要提前安装(指令已经在下面了可以直接复制一键执行)
```
pnpm install -g cnpm -registry=https://registry.npm.taobao.org
cnpm install axios
```

## 插件名称错误
![](resources/README/img/error2.png)

如果你遇到了图上的错误就证明你没有按教程来装,重新按**教程**来装即可

## 文本生成错误
![](resources/README/img/error3.png)

如果你在使用功能时出现类似图上的错误有可能是以下错误:

超时：504
<br>
服务不可用：503
<br>
用户prompt命中敏感词：400
<br>
生成结果命中敏感词：200
<br>
用户输入参数不合法：400
<br>
配额超限制：429
<br>
请求频率超限制：429
<br>
Token不可用：403

# 使用说明
个性回答默认在群内是2%触发，或者在对话前面加个welm的100%触发指令然后就可以与开始激情对话了。
![](resources/README/img/duihua.jpg)

提问加个前缀"提问"就好了
![](resources/README/img/tiwen.png)

#### 如果装了@戏天的那个ai自定义的js的
需要去那个ai插件里面的104行加上

```
    //放行welm测试指令
    if(e.msg.includes("welm")){
	return false
    }
```
这个100%触发指令可以到config.yaml修改(有注释,除非你用了锅巴配置并且保存了一次,勾巴setting.js不保存注释气死我了)
![](resources/README/img/fangxing.jpg)

# 效果
巨久之前测试的，那时候无需100%触发指令，现在要，放这个单纯为了表扬一下WeLM和装个逼 :smirk: 
![](resources/README/img/welm.png)

# 贡献者名单
| 贡献者 | 联系方式 | 主要贡献 |
| --- | --- | --- |
| 🎭书辞千楪Sama🌴 | QQ: `1700179844` | 提供了插件的主要功能 |
| JD | QQ:`1461072722` | 提供了插件的部分功能 |
| 兰罗摩 | QQ: `3584075812` | 将插件更改为插件包结构并支持锅巴 |
| 鸢 | QQ: `2166683295` | 提供了写入.yaml后缀名文件的技术 |
| 曉K | QQ: `1509293009` | 添加了`#welm版本`指令 |
| [喵喵插件](https://gitee.com/yoimiya-kokomi/miao-plugin) | 仓库: `https://gitee.com/yoimiya-kokomi/miao-plugin` | 提供了图片帮助功能 |
| [椰奶插件](https://gitee.com/yeyang52/yenai-plugin) | 仓库: `https://gitee.com/yeyang52/yenai-plugin` | 提供了更新功能 |
| [拓展插件](https://gitee.com/SmallK111407/expand-plugin) | 仓库: `https://gitee.com/SmallK111407/expand-plugin` | 提供了锅巴配置的技术 |
| [Ap插件](https://gitee.com/yhArcadia/ap-plugin) | 仓库: `https://gitee.com/yhArcadia/ap-plugin` | 提供了index的缺少依赖提示与README.md的Html代码 |
| **使用着本插件的你** | 你就是你自己 | **在背后默默支持着本仓库** |

# 声明
此项目仅用于学习交流，请勿用于非法用途, 如有侵权立即删除

# 更新日志
☞[点我前往查看](./CHANGELOG.md)

# 其他

### 宣个群(如果有未知的bug可以来这里反馈,也可以把他当成交♂流群来用)
```
815638467
```

### 前往其他代码托管平台内本仓库
* [☞GitHub](https://github.com/JD1433223/WeLM-plugin) 
* [☞Gitee](https://gitee.com/shuciqianye/yunzai-custom-dialogue-welm/)

### 前往其他仓库
#### Yunzai-Bot插件库:
* [☞GitHub](https://github.com/yhArcadia/Yunzai-Bot-plugins-index)
* [☞Gitee](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index)

#### Yunzai-Bot
* [☞GitHub](https://github.com/Le-niao/Yunzai-Bot)(被关了(悲))
* [☞Gitee](https://gitee.com/Le-niao/Yunzai-Bot) 

### 爱发电
如果你喜欢这个项目, 请不妨点个 Star🌟, 这是对开发者最大的动力, 当然, 你可以对我们进行爱发电赞助~

* [兰罗摩](https://afdian.net/a/Arama)

* [书辞千楪](https://afdian.net/a/0906-12)