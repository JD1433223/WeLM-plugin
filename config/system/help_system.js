export const helpCfg = {
  // 帮助标题
  "title": "WeLM帮助",

  // 帮助副标题 
  "subTitle": "Yunzai-Bot & WeLM-Plugin",

  // 帮助表格列数，可选：2-5，默认3
  // 注意：设置列数过多可能导致阅读困难，请参考实际效果进行设置
  "colWidth": 265,

  // 帮助表格列数，可选：2-5，默认3
  // 注意：设置列数过多可能导致阅读困难，请参考实际效果进行设置
  "colCount": 3,

  // 皮肤选择，可多选，或设置为all
  // 皮肤包放置于 resources/help/theme
  // 皮肤名为对应文件夹名
  // theme: 'all', // 设置为全部皮肤
  // theme: ['default','theme2'], // 设置为指定皮肤 
  "theme": "all",

  // 排除皮肤：在存在其他皮肤时会忽略该项内设置的皮肤
  // 默认忽略default：即存在其他皮肤时会忽略自带的default皮肤
  // 如希望default皮肤也加入随机池可删除default项
  "themeExclude": [
    "default"
  ],
  // 是否启用背景毛玻璃效果，若渲染遇到问题可设置为false关闭
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
      },
      {
        "icon": 63,
        "title": "#welm版本",
        "desc": "显示版本信息"
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