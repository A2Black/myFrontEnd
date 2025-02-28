import {
	//创建路由的api
	createRouter,
	//创建路由的历史记录
	createWebHashHistory
}from 'vue-router'

const routes = [{
		path:'/',
		redirect:'/login'
	},
	{
		name:'login',
		path:'/login',
		component: () => import('@/views/login/index.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

//暴露这个路由
export default router