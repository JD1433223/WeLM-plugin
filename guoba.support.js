import Setting from './components/Setting.js'
import lodash from 'lodash'

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
        link: 'https://github.com/JD1433223/WeLM-plugin',
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
            label: 'API',
            bottomHelpMessage: '请输入你申请的API-Token',
            component: 'Input',
            required: true,
            componentProps: {
              placeholder: 'WeLM申请到的API-Token',
            },
          },
          {
            field: 'config.BotName',
            label: '预设内人设(名字)',
            bottomHelpMessage: '请输入你的预设内人设(名字)',
            component: 'Input',
            required: true,
            componentProps: {
              placeholder: '预设内机器人扮演的人设(名字)',
            },
          },
          {
            field: 'config.probability',
            label: '对话概率',
            bottomHelpMessage: '普通对话在群里触发的概率(百分比)',
            component: 'InputNumber',
            required: true,
            componentProps: {
              placeholder: '请输入概率',
              min: '0',
              max: '100'
            }
          },
          {
            field: 'config.dhreplystart',
            label: '对话指令备注',
            bottomHelpMessage: '可留空',
            component: 'Input',
            componentProps: {
              placeholder: '普通对话指令回复开头备注, 不用与其他ai区分时可留空'
            }
          },
          {
            field: 'config.lxdhreplystart',
            label: '连续对话回复备注',
            bottomHelpMessage: '可留空',
            component: 'Input',
            componentProps: {
              placeholder: '连续对话指令回复开头备注, 不用与其他ai区分时可留空'
            }
          },
          {
            field: 'config.twreplystart',
            label: '问答回复备注',
            bottomHelpMessage: '可留空',
            component: 'Input',
            componentProps: {
              placeholder: '问答指令回复开头备注, 不用与其他ai区分时可留空'
            }
          },
          {
            field: 'config.xxreplystart',
            label: '续写回复备注',
            bottomHelpMessage: '可留空',
            component: 'Input',
            componentProps: {
              placeholder: '续写指令回复开头备注, 不用与其他ai区分时可留空'
            }
          },
          {
            field: 'config.ydljreplystart',
            label: '阅读理解回复备注',
            bottomHelpMessage: '可留空',
            component: 'Input',
            componentProps: {
              placeholder: '阅读理解指令回复开头备注, 不用与其他ai区分时可留空'
            }
          },
          {
            field: 'config.model',
            label: '模型',
            bottomHelpMessage: '当前支持的模型有medium、 large 和 xl',
            component: 'RadioGroup',
            componentProps: {
              options: [
                {label: 'medium', value: 'medium'},
                {label: 'large', value: 'large'},
                {label: 'xl', value: 'xl'},
              ],
              buttonStyle: 'solid',
              placeholder: '请选择你需要使用的模型'
            }
          },
          {
            field: 'config.max_tokens',
            label: '最大Tokens',
            bottomHelpMessage: '模型可使用的最大Tokens, 不建议超过300有可能会复读',
            component: 'InputNumber',
            required: true,
            componentProps: {
              placeholder: '不建议超过300有可能会复读',
              min: '4',
              max: '512'
            }
          },
          {
            field: 'config.temperature',
            label: '可能性',
            bottomHelpMessage: '更高的temperature意味着模型具备更多的可能性',
            component: 'InputNumber',
            required: true,
            componentProps: {
              placeholder: '建议改变这个值或top_p，但不要同时改变',
              min: "0.00",
              max: "1.00"
            }
          },
          {
            field: 'config.top_p',
            label: '可能性(累计概率)',
            bottomHelpMessage: '来源于nucleus sampling，采用的是累计概率的方式',
            component: 'InputNumber',
            required: true,
            componentProps: {
              placeholder: '建议改变这个值或temperature，但不要同时改变',
              min: "0.00",
              max: "1.00"
            }
          },
          {
            field: 'config.top_k',
            label: '模型能选择的词汇',
            bottomHelpMessage: '建议不要过小导致模型能选择的词汇少',
            component: 'InputNumber',
            required: true,
            componentProps: {
              placeholder: '从概率分布中依据概率最大选择k个单词',
              min: '0',
              max: '100'
            }
          },
          {
            field: 'config.stop',
            label: '停止符号',
            bottomHelpMessage: '当模型当前生成的字符为stop中的任何一个字符时，会停止生成',
            component: 'Input',
            required: true,
            componentProps: {
              placeholder: '建议不要输入AI在生成文本时大部分的词汇或文字'
            }
          },
          {
            field: 'config.twstop',
            label: '问答指令停止符号',
            bottomHelpMessage: '问答指令特殊停止符号(因为合并会不能用所以分了个出来), 当模型当前生成的字符为stop中的任何一个字符时，会停止生成',
            component: 'Input',
            required: true,
            componentProps: {
              placeholder: '建议不要输入AI在生成文本时大部分的词汇或文字'
            }
          }
        ],

        getConfigData () {
            return Setting.merge()
          },
          // 设置配置的方法（前端点确定后调用的方法）
          setConfigData (data, { Result }) {
            let config = {}
            for (let [keyPath, value] of Object.entries(data)) {
              lodash.set(config, keyPath, value)
            }
            config = lodash.merge({}, Setting.merge, config)
            Setting.analysis(config)
            return Result.ok({}, '保存成功辣~')
            }
        }
    }
}