import path from "path"

//支持锅巴
export function supportGuoba() {
    return {
    // 插件信息，将会显示在前端页面
    // 如果你的插件没有在插件库里，那么需要填上补充信息
    // 如果存在的话，那么填不填就无所谓了，填了就以你的信息为准
    pluginInfo: {
        name: 'WeLM-plugin',
        title: 'WeLM-plugin',
        author: '@书辞千楪',
        authorlink: 'https://gitee.com/shuciqianye',
        link: 'https://gitee.com/shuciqianye/yunzai-custom-dialogue-welm',
        isV3: true,
        isV2: false,
        description: '提供个性ai问答和提问(chatgpt下下下位替代)功能'
    }
    }
}