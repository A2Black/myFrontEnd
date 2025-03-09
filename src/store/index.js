// 创建pinia的API
import { createPinia } from 'pinia'

// 导入这个插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建pinia的实例
const pinia = createPinia()

// 安装pinia-persistedstate-plugin,可以使存储在pinia中的数据更长久
// 注册该插件
pinia.use(piniaPluginPersistedstate)

// 默认暴露pinia
export default pinia