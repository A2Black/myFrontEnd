import { 
	defineConfig,
} from 'vite'
import vue from '@vitejs/plugin-vue'
//配置src的两种快捷方式
//import path from 'path'
import { 
	resolve ,
} from 'path'

import {
	createSvgIconsPlugin
} from 'vite-plugin-svg-icons'

const pathResolve = dir => resolve(__dirname, dir)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    createSvgIconsPlugin({
			iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
			symbolId: 'icon-[dir]-[name]',
		}),
  ],
  server:{      //server服务器
	  port:8080,    //默认端口号
	  open:true,    //自动打开默认浏览器
	  cors:true,    //允许跨域
  },
  // 配置路径别名
  resolve: {
		alias: {
			'@': pathResolve('./src') // 设置 `@` 指向 `src` 目录
		}
	}
})