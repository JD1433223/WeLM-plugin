export const helpCfg = {
  "themeSet": false,
  "title": "WeLM帮助",
  "subTitle": "Yunzai-Bot & WeLM-Plugin",
  "colWidth": 265,
  "theme": "all",
  "themeExclude": [
    "default"
  ],
  "colCount": 3,
  "bgBlur": true
}
export const helpList = [
  {
    "group": "主要功能",
    "list": [
      {
        "icon": 71,
        "title": "看汤面、看汤底、请问xxx、写汤面、写汤底",
        "desc": "出题人只能回答是否与此无关, 然后你来推断出整个故事(海龟汤的汤面汤底要自己填写)"
      },
      {
        "icon": 94,
        "title": "welm、lxdh",
        "desc": "调用你的API-Token进行生成文字并回复你, 连续对话与普通对话一致但是拥有上下文功能"
      },
      {
        "icon": 79,
        "title": "提问",
        "desc": "向AI进行提问"
      },
      {
        "icon": 75,
        "title": "续写",
        "desc": "根据你发出的内容进行续写"
      },
      {
        "icon": 90,
        "title": "阅读理解、填文章",
        "desc": "给出内容让AI进行阅读理解并回答"
      },
      {
        "icon": 3,
        "title": "#welm帮助",
        "desc": "显示此内容"
      }
    ]
  },
  {
    "group": "管理命令，仅管理员可用",
    "auth": "master",
    "list": [
      {
        "icon": 85,
        "title": "#填写token #更改name",
        "desc": "使用功能前必须填写token"
      },
      {
        "icon": 92,
        "title": "welm更新 #welm强制更新",
        "desc": "更新插件"
      }
    ]
  }
]