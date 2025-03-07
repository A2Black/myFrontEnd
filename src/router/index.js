import {
	//创建路由的api
	createRouter,
	//创建路由的历史记录
	createWebHashHistory
}from 'vue-router'

const routes = [{
		path:'/',
		redirect:'/login'      //路由重定向，默认打开页面
	},
	{
		name:'login',
		path:'/login',
		component: () => import('@/views/login/index.vue')
	},
	{
		name:'menu',
		path:'/menu',
		component: () => import('@/views/menu/index.vue'),
		children:[{
			name:'home',
			path:'/home',
			component: () => import('@/views/home/index.vue'),
		},
		{
			name:'set',
			path:'/set',
			component: () => import('@/views/set/index.vue'),
		}
		]
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

//暴露这个路由
export default router