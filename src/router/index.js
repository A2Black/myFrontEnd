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
		// menu下子路由
		children:[{
			name:'home',
			path:'/home',
			component: () => import('@/views/home/index.vue'),
			},
			{
				name:'set',
				path:'/set',
				component: () => import('@/views/set/index.vue'),
			},
			{
				name:'overview',
				path:'/overview',
				component: () => import('@/views/overview/index.vue'),
			},
			{
				name:'product_manage',
				path:'/product_manage',
				component: () => import('@/views/user_manage/product_manage/index.vue'),
			},
			{
				name:'users_manage',
				path:'/users_manage',
				component: () => import('@/views/user_manage/users_manage/index.vue'),
			},
			{
				name:'message_manage',
				path:'/message_manage',
				component: () => import('@/views/user_manage/message_manage/index.vue'),
			},
			{
				name:'users_list',
				path:'/users_list',
				component: () => import('@/views/user_manage/users_list/index.vue'),
			},
			{
				name:'product_list',
				path:'/product_list',
				component: () => import('@/views/product/product_list/index.vue'),
			},
			{
				name:'outproduct_list',
				path:'/outproduct_list',
				component: () => import('@/views/product/outproduct_list/index.vue'),
			},
			{
				name:'message_list',
				path:'/message_list',
				component: () => import('@/views/message/message_list/index.vue'),
			},
			{
				name:'recyle',
				path:'/recyle',
				component: () => import('@/views/message/recyle/index.vue'),
			},
			{
				name:'file',
				path:'/file',
				component: () => import('@/views/file/index.vue'),
			},
		]
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

//暴露这个路由
export default router