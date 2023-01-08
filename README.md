# 云崽自定义对话WeLM
#### 介绍
此为Yunzai-Bot云崽QQ机器人的插件，需要依赖云崽机器人来实现功能，可以模仿你机器人的人设对话(或许有其他问答功能) _可以去这里研究一下_ [WeLM](https://welm.weixin.qq.com/docs/api/)

# 安装教程

## 插件包版
### 第一步
在Yunzai-Bot根目录打开终端并输入

```
git clone https://gitee.com/shuciqianye/yunzai-custom-dialogue-welm ./plugins/welm-plugin
```
回车
### 第二步
第一步需要在插件目录内config.yaml(config里的)改上你申请的token _去这个文档申请_ [WeLM申请文档](https://docs.qq.com/form/page/DUW1YVVJNbHpzV2No#/fill-detail)
### 第三步
_PS:这一步内所有txt均在welm-plugin/data内_
#### 个性问答
需要在dhdata.txt内写入预设，预设内第1行输入给模型的提示信息，然后回车空一行，接下来写一段模拟的对话。强烈建议去看看去看那个dhdata.txt演示学习一下，如果再不理解可以到渔火的群蒙德幼儿园找一个叫"群傻逼时不时来问问题喵~"的人问一下。或者!!!如果你机器人也是纳西妲的话可以把"(JD自用演示)"直接删了放到插件目data直接开用(强烈建议自己研究下，我用的这个对话起来bug很多)
#### 提问
需要把data(插件目录)里的wddata.txt填写才能正常使用
#### 续写
需要把在data(插件目录)里的xxdata.txt填写才能正常使用

## JS版(推荐(至少在重构未完成之前))
### 第一步
git拉取或者下载zip文件
### 第二步
把JS版文件夹内的JS文件扔到plugins/example
### 第三步
### 将JS版内的dhdata.txt;wddata(如果你不用问答功能请不要移动);xxdata(与wddata一致)移动到Yunzai-Bot根目录内的resources
#### 个性问答
需要在dhdata.txt内写入预设，预设内第1行输入给模型的提示信息，然后回车空一行，接下来写一段模拟的对话。强烈建议去看看去看那个dhdata.txt演示学习一下，如果再不理解可以到渔火的群蒙德幼儿园找一个叫"群傻逼时不时来问问题喵~"的人问一下。或者!!!如果你机器人也是纳西妲的话可以把"(JD自用演示)"直接删了放到插件目data直接开用(强烈建议自己研究下，我用的这个对话起来bug很多)
#### 提问
需要填写wddata.txt才能正常使用
#### 续写
需要填写xxdata.txt才能正常使用

## 可能遇到的问题
第一次使用可能会缺少依赖，三选一执行

```
pnpm add axios -w
```
这个可能会掉依赖，希望你不要中奖

```
npm install axios
```
这个可能连不上

```
cnpm install axios
```
这个需要安装cnpm，命令是

```
npm install -g cnpm -registry=https://registry.npm.taobao.org
```

## 开始
个性回答默认在群内是2%触发，或者在对话前面加个welm的100%触发指令(可自行更改看43行的注释自行更改成你想要的比如机器人名字)然后就可以与开始激情对话了。
![输入图片说明](resources/gexinghuida.jpg)

提问加个前缀"提问"就好了![输入图片说明](resources/tiwen.png)

#### 如果装了@戏天的那个ai自定义的js的
需要去那个ai插件里面的104行加上

```

    //放行welm测试指令
    if(e.msg.includes("welm")){
	return false
    }
```
这个100%触发指令可以到WeLM.js的第47行修改(42行有注释)
![输入图片说明](resources/100%25chufa.jpg)

# 效果
巨久之前测试的，那时候无需100%触发指令，现在要，放这个单纯为了表扬一下WeLM和装个逼 :smirk: 
![输入图片说明](resources/biaoyangwelm.png)