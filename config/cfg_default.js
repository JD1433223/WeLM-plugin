/** ************ 【玩家&老婆卡片展示】 ************* */
// 使用喵喵版角色卡片作为默认角色卡片功能
export const avatarCard = true

// 面板查询
export const avatarProfile = true

// 群内的面板伤害及圣遗物排名与查看功能，默认关闭。请根据群友心理素质自行决定是否开启
export const groupRank = false

// 参与排名的限制条件：1:无限制 2:有CK 3:有16个角色或有CK 4:有御三家(安柏&凯亚&丽莎)或有CK 5:有16个角色+御三家或有CK。 若改变设置请根据情况决定是否需要【#重置排名】
export const groupRankLimit = 1

// 使用【#上传深渊】功能取代【#深渊功能】,默认关闭
export const uploadAbyssData = false

// 老婆查询
export const avatarWife = true

// 戳一戳卡片
export const avatarPoke = true

/** ************ 【角色资料与信息查询】 ************* */
// #刻晴图鉴 的图鉴信息
export const charWiki = true

// #刻晴天赋/#刻晴命座 的天赋信息
export const charWikiTalent = true

// 角色图片
export const charPic = true

// 启用后会启用角色图及增量包中的小清新图像，勇士啊，你准备好了吗
export const charPicSe = false

/** ************ 【系统设置】 ************* */
// 可选值50~200，建议100。设置高精度会提高图片的精细度，但因图片较大可能会影响渲染与发送速度
export const renderScale = 100

// 开启后将使用喵喵版帮助作为Yunzai的默认帮助，默认关闭
export const help = false

// 根据语言习惯设置数字分组，如千位组设为3，万位组设为4
export const commaGroup = 3

// 使用基于武器&圣遗物计算的面板属性取代服务读取的面板数据，可规避双水buff等导致的一些面板数据错误。开启后部分角色属性可能会轻微变化，请根据需求开启关闭
export const attrCalc = false
