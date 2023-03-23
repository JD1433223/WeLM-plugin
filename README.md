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

<a href="https://github.com/JD1433223/WeLM-plugin/">
    <img src="resources/README/img/README顶部.png" width="350" alt="Logo">
</a>

<!-- 此图来源于Pixiv.net的105473760(PID)作品 -->

# WeLM Plugin

_🎉 基于 Yunzai-Bot 的 AI 对话插件 🎉_

<img src="/resources/README/img/logo.png" alt="logo" width="4000">
<!-- 此logo图中部分内容来源于WeLM官网,如侵权请联系兰罗摩(3584075812@qq.com),会立即删除 -->

---

<a href="#前置安装提醒">安装教程</a>
|
<a href="#可能遇到的问题">大概率会遇到的问题</a>
|
<a href="#使用说明">使用说明</a>

<a href="https://nodejs.org/en/download">
    <img src="https://badgen.net/badge/Node.js/16.x+?color=6BA552" alt="Node.js">
</a>
<a href="../../../../Le-niao/Yunzai-Bot">
    <img src="https://badgen.net/badge/Yunzai-Bot/V3?color=orange" alt="Yunzai-Bot">
</a>
<br>
<a href="https://jq.qq.com/?_wv=1027&k=OdSxLZj9">
    <img src="https://img.shields.io/badge/QQ群-纳西妲%20🤤🤤🤤%20-green?style=flat-squar" alt="新1群">
</a>
<a href="https://jq.qq.com/?_wv=1027&k=oK3MF0lm">
    <img src="https://img.shields.io/badge/QQ群-雷神%20🤤🤤🤤%20-purple?style=flat-squar" alt="2群">
</a>
<br>
<a href="../../watchers">
    <img src="https://img.shields.io/github/watchers/JD1433223/WeLM-plugin?label=观察者&color=7B2DD3" alt="watchers">
</a>
<a href="../../forks">
    <img src="https://img.shields.io/github/forks/JD1433223/WeLM-plugin?label=复制仓库" alt="forks">
</a>
<a href="../../stargazers">
    <img src="https://img.shields.io/github/stars/JD1433223/WeLM-plugin?label=收藏&color=yellow" alt="stars">
</a>
<a href="../../releases">
    <img src="https://img.shields.io/github/downloads/JD1433223/WeLM-plugin/total?label=下载&color=green" alt="downloads">
</a>
<a href="./LICENSE">
    <img src="https://img.shields.io/github/license/JD1433223/WeLM-plugin?color=3fb911&label=许可证" alt="License">
</a>

</div>

# New
新群1.1新老人员，老婆们速回
```
494148520
```

### 前置安装提醒

本插件有较多需要更改配置文件的功能，建议拥有以下技能：

<!-- 谢谢你🌸🌸 -->
* **<font color='#ef4517'>知道看完本文与其他文档再前往交流群提问</font>**
* 学会正常使用搜索引擎([baidu.com](https://www.baidu.com/) [bing.com](https://www.bing.com)(如果你有New Bing资格最好使用此搜索引擎) [google.com](https://google.com))
* 知道如何利用工具修改文件(推荐[Visual Studio Code](https://code.visualstudio.com/))
* 拥有义务教育阶段要求的知识水平
* 对于Yunzai有一定的了解，有基础的代码辨识能力

如果没有以上技能，请立刻停止插件安装并关闭浏览器。

如果你有以上技能，浏览以下内容后，不应再出现疑问。否则， 请咨询当地医院是否患有潜在脑疾。

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

# 配置项介绍
| 配置项 | 备注 | 是否必填 | 类别 |
| --- | --- | --- | --- |
| APIToken | 你的API,可使用指令`#填写token`更改 | 是 | 字符串 |
| BotName | 你的机器人在预设内的名字,可使用指令`#更改name`更改 | 是 | 字符串 |
| probability | 对话指令在群内触发的概率 | 是 | 数字 |
| xxreplystart | 对应指令的回复开头,replystart前面的`xx`可更改为: `dh`、`tw`、`lxdh`与`ydlj` | 否 | 字符串 |
| xxcmdstart | 与replystart一致但作用为指令开头, 如`welm` | 是 | 字符串 |
| model | 使用的模型, 当前支持的模型有`medium`、`large`与`xl` | 是 | 字符串 |
| max_tokens | 模型最多生成的Token个数 | 是 | 数字 |
| temperature | 模型的创造性,如需要更明确的答案可以尝试argmax采样(将其设置为0),切勿与top_p一起改变 | 是 | 数字 |
| top_p | 与temperature作用一致但采用的是累计概率的方式,切勿与temperature一起改变 | 是 | 数字 |
| top_k | 模型根据概率分布的概率中最大选择的k个词汇, 建议不要过小否则模型能选择的词汇少 | 是 | 数字 |
| n | 返回的序列个数,大于0,小于等于12 | 是 | 数字 |
| stop | 当模型当前生成的字符为stop的任何一个字符时停止生成 | 否 | 字符串 |
| twstop | 与stop功能一致但是专用与`提问`指令 | 否 | 字符串 |
| keep | 供bug填充的变量,更改后过一段时间会恢复原样 | 否 | 字符串 |

# 贡献者名单
<!-- 抄的土块 -->
## 开发者 && WeLM && Pixiv的一位用户
| 贡献者 | 联系方式 | 主要贡献 |
| --- | --- | --- |
| 🎭书辞千楪Sama🌴 | QQ: `1700179844` | 提供了插件的主要功能 |
| JD | QQ:`1461072722` | 提供了插件的部分功能 |
| 兰罗摩 | QQ: `3584075812` | 将插件更改为插件包结构并支持锅巴 |
| 鸢 | QQ: `2166683295` | 提供了写入.yaml后缀名文件的技术 |
| 曉K | QQ: `1509293009` | 添加了`#welm版本`指令 |
| [ぶらんぶた](https://www.pixiv.net/users/14225654) | Pixiv主页: `https://www.pixiv.net/users/14225654` | 提供了README顶部的纳西妲图 |
| [WeLM](https://welm.weixin.qq.com/docs/tutorial/) | 官网链接:`https://welm.weixin.qq.com/docs/tutorial/` | 提供了AI模型与logo图的一部分 |

## 插件
| 插件名称 | 作者 | 支持V2 | 支持V3 | Gitee | GitHub | 插件索引备注 | 主要贡献 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 喵喵插件 | [@喵喵](../../../../yoimiya-kokomi) | √ | √ | [☞Gitee](https://gitee.com/yoimiya-kokomi/miao-plugin) | [☞GitHub](https://gitee.com/yoimiya-kokomi/miao-plugin) | Miao-Plugin是一个Yunzai-Bot的升级插件，提供包括角色面板查询等升级功能 | 提供了图片帮助功能 |
| 椰奶插件 | [@椰羊](../../../../yeyang52) | × | √ | [☞Gitee](https://gitee.com/yeyang52/yenai-plugin) | [☞GitHub](https://github.com/yeyang52/yenai-plugin) | 提供Bot事件通知、搜图搜番、群管、Pixiv等功能 | 提供了更新功能 |
| 拓展插件 | [@SunRyK曉K](../../../../SmallK111407) | × | √ | [☞Gitee](https://gitee.com/SmallK111407/expand-plugin) | [☞GitHub](https://github.com/SmallK111407/expand-plugin) | 提供#刻晴攻略5、#艾尔海森攻略6、#明日素材 等在云崽基础上拓展的功能 | 提供了锅巴配置的技术 |
| 小叶插件 | [@小叶](https://gitee.com/xiaoye12123) | × | √ |[☞Gitee](https://gitee.com/xiaoye12123/xiaoye-plugin) | 无Github仓库 | 模拟刷圣遗物和强化,可自定义概率 | 提供了初始化的JS代码 |
| Ap插件 | [@渔火](../../../../yhArcadia) | × | √ | [☞Gitee](https://gitee.com/yhArcadia/ap-plugin) | [☞GitHub](https://github.com/ap-plugin/ap-plugin) | 提供AI绘图及其衍生功能：#以文生图、#以图生图、图片清晰术、生成“二次元的我”形象等 | 提供了index的缺少依赖提示与README.md的Html代码 |

# 免责声明
<!-- 抄的锅巴 -->
1. 本插件禁止任何形式的商用和违法用途，仅供小范围使用和学习，如违反相关规定，后果自负，与本插件及作者无关
2. 图片与其他素材均来自于网络，仅供交流学习使用，如有侵权请联系兰罗摩(3584075812@qq.com)，会立即删除
3. 禁止在未授权的情况下使用，本插件内所有内容禁止以任何形式用以冒充、反串、水军、侵犯他人权益、无底线粉丝行为、诈骗等不正当用途，如违反相关规定插件作者有权追究

# 其他

## 咱们的群
#### 群规
![](/resources/README/img/群规.png)
#### 群号
_PS: (如果有未知的bug可以来这里反馈,也可以把他当成交♂流群来用)_
新1群(最大500人):
```
494148520
```
2群(500人群): 
```
712074725
```

### 前往其他仓库
<!-- 抄的渔火 -->
| 名称 | 作者 | GitHub | Gitee | 备注  |
|------| ---- | ------ | ----- | ----- |
| Yunzai-Bot 插件库 | [@渔火Arcadia](../../../../yhArcadia) | [☞GitHub](https://github.com/yhArcadia/Yunzai-Bot-plugins-index) | [☞Gitee](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index) | 插件库 |
| Yunzai-Bot | [@Le-niao](../../../../Le-niao) | [☞GitHub](https://github.com/Le-niao/Yunzai-Bot) | [☞Gitee](https://gitee.com/Le-niao/Yunzai-Bot) | 原版 Yunzai |
| Yunzai-Bot-lite | [@听语惊花](../../../../Nwflower) | [☞GitHub](https://github.com/Nwflower/yunzai-bot-lite) | [☞Gitee](https://gitee.com/Nwflower/yunzai-bot-lite) | 轻量版，无原神功能 |
| Miao-Yunzai | [@喵喵](../../../../yoimiya-kokomi) | [☞GitHub](https://github.com/yoimiya-kokomi/Miao-Yunzai) | [☞Gitee](https://gitee.com/yoimiya-kokomi/Miao-Yunzai) | 喵版 Yunzai |
| TRSS-Yunzai | [@时雨🌌星空](../../../../TimeRainStarSky) | [☞GitHub](https://github.com/TimeRainStarSky/Yunzai) | [☞Gitee](https://gitee.com/TimeRainStarSky/Yunzai) | go-cqhttp 版 Yunzai |
### 前往其他代码托管平台内本仓库
| 托管平台名称 | 网址 | 仓库主人 | 快速前往仓库链接 |
| --- | --- | --- | --- |
| GitHub | `github.com` | [@JD](https://github.com/JD1433223) | [☞点我前往](https://github.com/JD1433223/WeLM-plugin/)
| GitHub | `github.com` | [@书辞千蝶](https://github.com/Suciqianye) | [☞点我前往](https://github.com/Suciqianye/WeLM-plugin) |
| Gitee | `gitee.com` | [@书辞千蝶](https://gitee.com/shuciqianye) | [☞点我前往](https://gitee.com/shuciqianye/yunzai-custom-dialogue-welm)

### 支持我们
<!-- 渔火听我说谢谢你,因为有你温暖了司机,谢谢你因为有你世界更美丽 -->
如果你喜欢这个项目, 请不妨点个 Star🌟, 这是对开发者最大的动力, 当然, 你可以对我们进行赞助~

| 开发者 | 赞助平台 | 爱发电主页链接 | 爱发电 | 微信 | 支付宝 |
| --- | --- | --- | --- | --- | --- |
| 兰罗摩 | 爱发电 | `https://afdian.net/a/Arama` | [点我快速前往](https://afdian.net/a/Arama) | | |
| 书辞千楪 | 爱发电 & 微信 & 支付宝 | `https://afdian.net/a/0906-12` | [点我快速前往](https://afdian.net/a/0906-12) | ![](https://img1.imgtp.com/2023/02/16/MdDza14P.png) | ![](https://img1.imgtp.com/2023/02/16/luH0pKxj.jpg)
