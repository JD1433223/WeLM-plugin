/*
* 请注意，系统不会读取help_default.js ！！！！
* 【请勿直接修改此文件，且可能导致后续冲突】
*
* 如需自定义可将文件【复制】一份，并重命名为 help.js
*
* */

// 帮助配置
export const helpCfg = {
  // 帮助标题
  title: 'WeLM帮助',

  // 帮助副标题
  subTitle: 'Yunzai-Bot & WeLM-Plugin',

  // 帮助表格列数，可选：2-5，默认3
  // 注意：设置列数过多可能导致阅读困难，请参考实际效果进行设置
  colCount: 3,

  // 单列宽度，默认265
  // 注意：过窄可能导致文字有较多换行，请根据实际帮助项设定
  colWidth: 265,

  // 皮肤选择，可多选，或设置为all
  // 皮肤包放置于 resources/help/theme
  // 皮肤名为对应文件夹名
  // theme: 'all', // 设置为全部皮肤
  // theme: ['default','theme2'], // 设置为指定皮肤
  theme: 'all',

  // 排除皮肤：在存在其他皮肤时会忽略该项内设置的皮肤
  // 默认忽略default：即存在其他皮肤时会忽略自带的default皮肤
  // 如希望default皮肤也加入随机池可删除default项
  themeExclude: ['default'],

  // 是否启用背景毛玻璃效果，若渲染遇到问题可设置为false关闭
  bgBlur: true
}

// 帮助菜单内容
export const helpList = [{
  group: '主要功能',
  list: [{
    icon: 94,
    title: 'welm',
    desc: '调用你的API-Token进行生成文字并回复你'
  }, {
    icon: 90,
    title: 'lxdh',
    desc: '与welm一样但是拥有上下文'
  }, {
    icon: 79,
    title: '提问',
    desc: '向AI进行提问'
  }, {
    icon: 74,
    title: '续写',
    desc: '根据你发出的内容进行续写'
  }, {
    icon: 22,
    title: '阅读理解、填文章',
    desc: '字面意思'
  }, {
    icon: 5,
    title: '海龟汤',
    desc: '出题人只能回答是否与此无关, 然后你来推断出整个故事(海龟汤的汤面汤底要自己填写)'
  }, {
    icon: 85,
    title: '#填写token',
    desc: '字面意思(如果不填写大部分功能将无法使用), 指令格式: #填写token xxx'
  }]}]
