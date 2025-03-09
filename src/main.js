import { 
	createApp
} from 'vue'
import App from './App.vue'
// 导入路由
import router from './router'
// 导入pinia
import pinia from './store/index'
// 导入ElementPlus Icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 导入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入ElementPlus国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 导入svg图标
import 'virtual:svg-icons-register'


// 创建实例
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 挂载 ElementPlus
app.use(ElementPlus, {
  locale: zhCn,
})

app.use(router) // 确保路由挂载
app.mount('#app') // 最终挂载到 #app
// 注册pinia
app.use(pinia)