import setting from './models/setting.js'
import lodash from 'lodash'
//支持锅巴
export function supportGuoba() {
    return {
    // 插件信息，将会显示在前端页面
    // 如果你的插件没有在插件库里，那么需要填上补充信息
    // 如果存在的话，那么填不填就无所谓了，填了就以你的信息为准
    pluginInfo: {
        name: 'yunzai-custom-dialogue-welm',
        title: 'WeLM-plugin',
        author: '@书辞千楪',
        authorlink: 'https://gitee.com/shuciqianye',
        link: 'https://gitee.com/shuciqianye/yunzai-custom-dialogue-welm',
        isV3: true,
        isV2: false,
        description: '提供个性ai问答和提问(chatgpt下下下位替代)功能',
        icon: 'eos-icons:ai-operator'
        },
        // 配置项信息
    configInfo: {
        // 配置项 schemas
        schemas: [
            {
              field: 'config.API_token',
              label: 'WeLM API',
              bottomHelpMessage: 'welm申请的api',
              component: "Input",
              required: true,
              componentProps: {
                placeholder: "请输入你的api",
              },
            },
            {
              field: 'config.bot_name',
              label: '机器人名字',
              bottomHelpMessage: '填写你预设的名字',
              component: "Input",
              required: true,
              componentProps: {
                placeholder: "请输入预设内机器人扮演的名字",
              },
            },
            {
              field: 'config.probability',
              label: '对话概率',
              bottomHelpMessage: '普通在群里触发的概率(百分比)',
              component: 'InputNumber',
              componentProps: {
                placeholder: "请输入概率",
                min: "0",
                max: "100"
              }
            },
            {
              field: 'config.model',
              label: '模型',
              bottomHelpMessage: '当前支持的模型有medium、 large 和 xl',
              component: 'Input',
              componentProps: {
                placeholder: '请输入你所使用的模型',
              }
            },
            {
              field: 'config.temperature',
              label: '可能性',
              bottomHelpMessage: '更高的temperature意味着模型具备更多的可能性',
              component: 'InputNumber',
              componentProps: {
                placeholder: '建议改变这个值或top_p，但不要同时改变。',
              }
            },
            {
              field: 'config.top_p',
              label: '可能性(累计概率)',
              bottomHelpMessage: '来源于nucleus sampling，采用的是累计概率的方式',
              component: 'InputNumber',
              componentProps: {
                placeholder: '建议改变这个值或temperature，但不要同时改变'
              }
            }
          ],

        getConfigData () {
            return setting.merge()
          },
          // 设置配置的方法（前端点确定后调用的方法）
          setConfigData (data, { Result }) {
            let config = {}
            for (let [keyPath, value] of Object.entries(data)) {
              lodash.set(config, keyPath, value)
            }
            config = lodash.merge({}, setting.merge, config)
            setting.analysis(config)
            return Result.ok({}, '保存成功辣~')
            }
        }
    }
}