<!-- 
Copyright (c) 2023 书辞千楪
WeLM-plugin is licensed under Mulan PSL v2.
You can use this software according to the terms and conditions of the Mulan PSL v2. 
You may obtain a copy of Mulan PSL v2 at:
        http://license.coscl.org.cn/MulanPSL2 
THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.  
See the Mulan PSL v2 for more details.  
 -->

<div align="center">

<img src="/resources/README/img/README顶部.bmp" alt="WeLM-plugin" width="350">

<!-- 此图来源于Pixiv.net的105473760(PID)作品 -->

# WeLM Plugin

_🎉 基于 Yunzai-Bot 的 AI 对话插件 🎉_

<img src="/resources/README/img/logo.png" alt="logo" width="4000">
<!-- 此logo图中部分内容来源于WeLM官网,如侵权请联系兰罗摩(3584075812@qq.com),会立即删除 -->

---

[![Node.js](https://img.shields.io/badge/NodeJS-16.x+-6BA552.svg)](https://nodejs.org/en/download/)
[![Yunzai-Bot](https://img.shields.io/badge/Yunzai_Bot-v3-red.svg)](../../../../Le-niao/Yunzai-Bot)
<br>
[![QQ群1](https://img.shields.io/badge/QQ群-纳西妲%20🤤🤤🤤%20-green?style=flat-squar)](https://jq.qq.com/?_wv=1027&k=5jt6obxk)
[![QQ群2](https://img.shields.io/badge/QQ群-雷神%20🤤🤤🤤%20-purple?style=flat-squar)](https://jq.qq.com/?_wv=1027&k=oK3MF0lm)

<a href="#安装插件">安装教程</a>
·
<a href="#可能遇到的问题">大概率会遇到的问题</a>
·
<a href="#使用说明">使用说明</a>

</div>

## 简介
WeLM-plugin是一款在 QQ 内快速调用[WeLM](https://welm.weixin.qq.com/docs/tutorial/)提供的 API 接口进行多参数便捷 AI 对话的 [Yunzai-Bot](../../../../Le-niao/Yunzai-Bot) 插件, 此插件功能不断扩展中如有意见或新功能思想可在issues提出, 更多功能敬请期待......

## 安装插件

### 1. 克隆本仓库至plugins目录
在Yunzai-Bot根目录打开终端并选择一个执行   **_PS:如果不使用给出的命令安装插件包版可能会无法载入插件, 并且不要2个都执行!!!!!!!!!!!!!!!!!!!!!!!_**

- 使用Gitee（国内服务器推荐使用此方法）
```
git clone -b master --depth=1 https://gitee.com/shuciqianye/yunzai-custom-dialogue-welm.git ./plugins/WeLM-plugin
```

- 使用GitHub
```
git clone -b master --depth=1 https://github.com/JD1433223/WeLM-plugin.git ./plugins/WeLM-plugin
```

### 2. 安装必要依赖(axios)
_PS: 请在**Yunzai-Bot根目录**执行_
#### 使用npm
```
npm install axios --registry=https://registry.npmmirror.com
```

#### 使用pnpm
```
pnpm add axios -w
```

#### 使用cnpm
_PS: 需提前安装_
* cnpm安装指令
```
pnpm install -g cnpm -registry=https://registry.npm.taobao.org
```
* 安装依赖指令
```
cnpm install axios
```

### 3. 填写Token(否则大部分功能无法使用)
对机器人私聊"#填写token xxx"（这个xxx是你的API-Token） _如果没有去这个文档申请[WeLM申请文档](https://docs.qq.com/form/page/DUW1YVVJNbHpzV2No#/fill-detail)_ 
![](/resources/README/img/填Token.jpg)

### 4. 填写预设
_PS: dhdata.txt在WeLM-plugin/data内_
需要在dhdata.txt内写入预设，预设内第1行输入给模型的提示信息，然后回车空一行，接下来写一段模拟的对话。强烈建议去看看去看那个[dhdata演示](resources/README/document/dhdata演示.md)学习一下，如果再不理解可以到渔火的群蒙德幼儿园找一个叫"群傻逼时不时来问问题喵~"的人问一下。或者!!!如果你机器人也是纳西妲的话可以把演示里的复制粘贴到data/dhdata.txt直接开用(强烈建议自己研究下，我用的这个对话起来bug很多)

### 5. 填写机器人预设内名称
使用#更改name xxx把name改成和预设里面机器人要扮演的角色一样的名字
![](/resources/README/img/更改名字.jpg)

# 可能遇到的问题
## 缺少依赖
![](/resources/README/img/缺依赖.png)

如果你使用的是pnpm可能会出现图上的错误请到上面的教程重新使用npm或cnpm安装
* [点我快速前往](#2-安装必要依赖axios)

## 插件名称错误
![](/resources/README/img/没按教程.png)

如果你遇到了图上的错误就证明你没有按教程来装,重新按**教程**来装即可

## 文本生成错误
![](/resources/README/img/生成错误.png)

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

* 详细请前往[Github的Wiki](https://github.com/JD1433223/WeLM-plugin/wiki/大多数会遇到的问题)查看

## 插件冲突
如果出现明明没有报错但是依然没有返回消息的话就说明你遇到插件冲突了
### 自检
1. 看看发送后有没有什么其他插件的指令被触发了
2. 如果有那就把它禁用了(更简单粗暴的话就把他删了)
3. 如果没有那建议来我们的交流群问问JD和书佬 在这里我放个[快速链接](#宣个群如果有未知的bug可以来这里反馈也可以把他当成交流群来用)

# 使用说明
**_PS: 表格内格式均为默认格式如更改请自行替换_**
| 指令 | 介绍 | 格式 |
| --- | --- | --- |
| 对话 | 让AI和你对话 | `welm xxxx` |  
| 连续对话 | 与对话功能一致但拥有上下文功能 | `lxdh xxxx` |
| 提问 | 向AI进行提问 | `提问 xxxxxxx` |
| 续写 | 让AI使用你发送的文本续写 | `续写 xxxxxxxxxxx` |
| 阅读理解 | 让AI阅读理解你发送的内容 | `阅读理解 xxxxxxxxx` | 

**_PS: 配置指令执行需要主人权限_**
| 配置指令 | 介绍 | 格式 |
| --- | --- | --- | 
| 填写Token | 更改你的API参数,如为空无法使用任何需使用API的功能 | `#填写token xxxxxxxxxxxxx`
| 更改Name | 更改你的BotName参数 | `#更改name xxx`
| 配置群聊/私聊开关 | 更改开关的状态 | `#welm设置(私聊|群聊)(开启|关闭)` |

**_PS: 以下为海龟汤指令(因为指令太多需要特殊开一个表格)_**
| 指令 | 介绍 | 格式 |
| --- | --- | --- |
| 看汤面 | 查看海龟汤的汤面(提示) | `#看汤面` |
| 看汤底 | 查看海龟汤的汤底(答案, 此指令执行后游戏会结束) | `#看汤底` |
| 请问 | 问AI某项是否正确,正确将回答是(相关),反之回答不是(不相关),如果AI无法回答将会发送`不知道，请重新提问` | `#请问 xxxxxx` |

**_PS: 以下指令为海龟汤的配置指令_**
| 配置指令 | 介绍 | 格式 |
| --- | --- | --- |
| 写汤面 | 写入海龟汤的汤面(提示) | `#写汤面 xxxxxx`
| 写汤底 | 写入海龟汤的汤底(答案) | `#写汤底 xxxxxx`

* 详细可看: [☞点我前往查看](/resources/README/document/详细使用说明.md)

# 配置项介绍
[☞点我前往查看](/resources/README/document/配置项介绍.md)

# 贡献者名单
<!-- 抄的土块 -->
| 贡献者 | 联系方式 | 主要贡献 |
| --- | --- | --- |
| 🎭书辞千楪Sama🌴 | QQ: `1700179844` | 提供了插件的主要功能 |
| JD | QQ:`1461072722` | 提供了插件的部分功能 |
| 兰罗摩 | QQ: `3584075812` | 将插件更改为插件包结构并支持锅巴 |
| 鸢 | QQ: `2166683295` | 提供了写入.yaml后缀名文件的技术 |
| 曉K | QQ: `1509293009` | 添加了`#welm版本`指令 |
| [WeLM](https://welm.weixin.qq.com/docs/tutorial/) | 官网链接:`https://welm.weixin.qq.com/docs/tutorial/` | 提供了AI模型与logo图的一部分 |
| [喵喵插件](https://gitee.com/yoimiya-kokomi/miao-plugin) | 仓库: `https://gitee.com/yoimiya-kokomi/miao-plugin` | 提供了图片帮助功能 |
| [椰奶插件](https://gitee.com/yeyang52/yenai-plugin) | 仓库: `https://gitee.com/yeyang52/yenai-plugin` | 提供了更新功能 |
| [拓展插件](https://gitee.com/SmallK111407/expand-plugin) | 仓库: `https://gitee.com/SmallK111407/expand-plugin` | 提供了锅巴配置的技术 |
| [小叶插件](https://gitee.com/xiaoye12123/xiaoye-plugin) | 仓库: `https://gitee.com/xiaoye12123/xiaoye-plugin` | 提供了初始化的JS代码 |
| [Ap插件](https://gitee.com/yhArcadia/ap-plugin) | 仓库: `https://gitee.com/yhArcadia/ap-plugin` | 提供了index的缺少依赖提示与README.md的Html代码 |
| [ぶらんぶた](https://www.pixiv.net/users/14225654) | Pixiv主页: `https://www.pixiv.net/users/14225654` | 提供了README顶部的纳西妲图 |
| **使用着本插件的你** | 你就是你自己 | **在背后默默支持着本仓库** |

# 免责声明
<!-- 抄的锅巴 -->
1. 本插件禁止任何形式的商用和违法用途，仅供小范围使用和学习，如违反相关规定，后果自负，与本插件及作者无关
2. 图片与其他素材均来自于网络，仅供交流学习使用，如有侵权请联系兰罗摩(3584075812@qq.com)，会立即删除
3. 禁止在未授权的情况下使用，本插件内所有内容禁止以任何形式用以冒充、反串、水军、侵犯他人权益、无底线粉丝行为、诈骗等不正当用途，如违反相关规定插件作者有权追究


# 其他

### 宣个群(如果有未知的bug可以来这里反馈,也可以把他当成交♂流群来用)
群1(500人群): 
```
815638467
```
群2(500人群): 
```
712074725
```
### 前往其他代码托管平台内本仓库
<!-- 抄的渔火 -->
* [☞GitHub](https://github.com/JD1433223/WeLM-plugin)/[☞Gitee](https://gitee.com/shuciqianye/yunzai-custom-dialogue-welm/)

### 前往其他仓库
#### Yunzai-Bot插件库:
* [☞GitHub](https://github.com/yhArcadia/Yunzai-Bot-plugins-index)/[☞Gitee](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index)

#### Yunzai-Bot
* [☞GitHub](https://github.com/Le-niao/Yunzai-Bot)/[☞Gitee](https://gitee.com/Le-niao/Yunzai-Bot) 

### 支持我们
<!-- 渔火听我说谢谢你,因为有你温暖了司机,谢谢你因为有你世界更美丽 -->
如果你喜欢这个项目, 请不妨点个 Star🌟, 这是对开发者最大的动力, 当然, 你可以对我们进行赞助~

* [兰罗摩](https://afdian.net/a/Arama)

* [书辞千楪](https://afdian.net/a/0906-12)  [微信](https://img1.imgtp.com/2023/02/16/MdDza14P.png)&[支付宝](https://img1.imgtp.com/2023/02/16/luH0pKxj.jpg)