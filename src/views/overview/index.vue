<template>
    <!-- 添加面包屑组件 -->
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <!-- 系统概览外壳 -->
     <div class="overview-wrapped">
        <!-- 顶部内容外壳 -->
        <div class="top-content-wrapped">
            <!-- 左边部分-用户信息 -->
            <div class="person-info">
                <!-- 用户头像外壳 -->
                <div class="person-avatar-wrapped">
                    <!-- 用户头像 -->
                    <el-avatar :size="100" :src="userStore.imageUrl" class="avatar-frame"/>
                    <span class="department">所属部门：总裁会议室</span>
                    <div class="company">所属公司：量子之海科技公司</div>
                </div>
                <!-- 分割线外壳 -->
                <div class="line-wrapped">
                    <div class="line"></div>
                </div>
                <!-- 用户详细信息外壳 -->
                <div class="detail-info-wrapped">
                    <p>姓名：{{ userData.name }}</p>
                    <p>性别：{{ userData.sex }}</p>
                    <p>身份：{{ userData.identity }}</p>
                    <p>分管领域：</p>
                    <p>权限：</p>
                </div>
            </div>
            <!-- 右边部分-用户管理饼状图部分 -->
            <div class="manage-user-pie"></div>
        </div>

        <!-- 中间内容外壳 -->
        <div class="mid-content-wrapped">
            <!-- 中间内容左边部分 -->
            <div class="product-category-bar mid-content-left"></div>
            <!-- 中间内容右边部分 -->
            <div class="mid-content-right">
                <div class="title">常用管理</div>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="button-area">
                            <!-- SvgIcon图标 -->
                            <SvgIcon icon-name="user" style="width: 24px;height: 24px;"></SvgIcon>
                            <!-- 按钮名 -->
                            <div class="button-name">用户管理</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="button-area">
                            <!-- SvgIcon图标 -->
                            <SvgIcon icon-name="product" style="width: 24px;height: 24px;"></SvgIcon>
                            <!-- 按钮名 -->
                            <div class="button-name">产品管理</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="button-area">
                            <!-- SvgIcon图标 -->
                            <SvgIcon icon-name="notice" style="width: 24px;height: 24px;"></SvgIcon>
                            <!-- 按钮名 -->
                            <div class="button-name">系统消息</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="button-area">
                            <!-- SvgIcon图标 -->
                            <SvgIcon icon-name="me" style="width: 24px;height: 24px;"></SvgIcon>
                            <!-- 按钮名 -->
                            <div class="button-name">个人信息</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="button-area">
                            <!-- SvgIcon图标 -->
                            <SvgIcon icon-name="message" style="width: 24px;height: 24px;"></SvgIcon>
                            <!-- 按钮名 -->
                            <div class="button-name">部门信息</div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="button-area">
                            <!-- SvgIcon图标 -->
                            <SvgIcon icon-name="setting" style="width: 24px;height: 24px;"></SvgIcon>
                            <!-- 按钮名 -->
                            <div class="button-name">系统设置</div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

        <!-- 底部内容外壳 -->
        <div class="footer-content-wrapped">
            <!-- 底部内容左边部分 -->
            <div class="message-level footer-content-left"></div>
            <!-- 底部内容右边部分 -->
            <div class="userlogin-all-day footer-content-right"></div>
        </div>
     </div>
</template>

<script lang="ts" setup>
    import {
        ref,reactive,onMounted
    }from 'vue'
    // 导入封装后的面包屑组件
    import breadCrumb from '@/components/bread_crumb.vue'
    // 引入echarts
    import * as echarts from 'echarts';
    // 导入useUserInforStore
    import { useUserInforStore } from '@/store/userinfo'
    // 导入SvgIcon
    import SvgIcon from '@/components/SvgIcon.vue'
    // 导入getUserInfo
    import { 
        getUserInfo
    } from '@/api/userinfor'
    // 调用echarts图
	onMounted(() => {
		manageUser()
		productCategoryBar()
		messageLevel()
		userloginAllDay()
	})
    // 创建实例
    const userStore = useUserInforStore()
    // 面包屑
    const breadcrumb = ref()
    // 面包屑参数
    const item = ref({
        first:'系统概览',
    })

    // 获取用户信息
    const getUserinfo = async()=>{
        const res = await getUserInfo(localStorage.getItem('id'))
        console.log(res)
    }
    // 调用该函数
    getUserinfo()

    // 定义表单类型
    interface userData {
        name:string,
        sex:string,
        identity:string,
        department:string,
    }
    const userData : userData = reactive({
        name:'',
        sex:'',
        identity:'',
        department:'',
    })

    // echarts图使用到的各类函数
    // 管理员与用户比值图
	const manageUser = () => {
	// 通过类名 初始化
		const mu = echarts.init(document.querySelector('.manage-user-pie'))
		document.querySelector('.manage-user-pie').setAttribute('_echarts_instance_', '')
		// 设置基本的参数
			mu.setOption({
                title: {
					text: "管理员与用户比值图",
                    top: "3%",
					left: 'center',
					textStyle: {
						fontSize: 16
					},
				},
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ],
                    emphasis: {
                        itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                    }
                ]
			})
		// 用于echarts响应式,当浏览器窗口放大或缩小时，echarts图表也跟随变化
		window.addEventListener('resize', function () {
			mu.resize()
		})
	}

    // 产品类别图
	const productCategoryBar = async () => {
		const pcb = echarts.init(document.querySelector('.product-category-bar'))
		document.querySelector('.product-category-bar').setAttribute('_echarts_instance_', '')
			pcb.setOption({
				title: {
					text: "产品类别库存总价图",
					top: "3%",
                    left: 'center',
					textStyle: {
						fontSize: 16
					},
				},
				tooltip: {
					trigger: 'axis',
				},
				xAxis: {
					type: 'category',
					// 食品类，服装类，鞋帽类，日用品类，家具类，家用电器类，纺织品类，五金类
					data: ['食品类', '服装类', '鞋帽类', '日用品类', '家具类', '家用电器类', '纺织品类','五金类']
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						data:[120, 200, 150, 80, 70, 110, 130,115],
						type: 'bar',
						barWidth: 40,
						colorBy: "data"
					},
				]
			})
		window.addEventListener('resize', function () {
			pcb.resize()
		})
	}

    // 公告等级分布图
	const messageLevel = () => {
		const ml = echarts.init(document.querySelector('.message-level'))
		document.querySelector('.message-level').setAttribute('_echarts_instance_', '')
			ml.setOption({
                title: {
					text: '公告等级分布图',
					// subtext: 'Fake Data',
					left: 'center',
                    top: "3%",
				},
				tooltip: {
					trigger: 'item'
				},
				legend: {
					orient: 'vertical',
					left: 'left',
					padding: [20, 20, 20, 20]
				},
				series: [
					{
						// name: 'Access From',
						type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
						data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ]
					}
				]
			})
		window.addEventListener('resize', function () {
			ml.resize()
		})
	}

    // 每日登录用户总量折线图
    const userloginAllDay = ()=>{
        // 底部日期的实现
		// let dd = new Date()
		// let week = []
		// for (let i = 1; i < 8; i++) {
		// 	dd.setDate(dd.getDate() - 1)
		// 	// 得到日期并且把斜杠替换成横杠
		// 	week.push(dd.toLocaleDateString().replace(/\//g, "-"))
		// }

		// let number = []
		// week.forEach(async (e) => {
		// 	// 如果在Moment中不加'YYYY-MM-DD'会提示警告
		// 	let day = moment(e, 'YYYY-MM-DD').format('YYYY-MM-DD')
		// 	// 调用每天登录人数的接口
		// 	const res = await everydaynumberofpeople(day)
		// 	number.push(res.number)
		// })

        // 初始化echarts实例
        const mu = echarts.init(document.querySelector('.userlogin-all-day'))
		document.querySelector('.userlogin-all-day').setAttribute('_echarts_instance_', '')
        mu.setOption({
            title:{
                text:"每日登录人数",
                top: "3%",
					left: 'center',
					textStyle: {
						fontSize: 16
					},
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
                }
            ]
        })
    }
</script>

<style lang="scss" scoped>

	// 总览内容
	.overview-wrapped {
		padding: 8px;
		height: calc(100vh - 105px);

		// 上部分内容 个人资料 + 饼状图
		.top-content-wrapped {
			height: 36%;
			display: flex;

			// 个人信息
			.person-info {
				height: 100%;
				margin-right: 8px;
				width: calc(50% - 8px);
				display: flex;
				background: #fff;
                border:1px solid #e4e4e7;
                border-radius: calc(.5rem + 4px);

				// 头像区域
				.person-avatar-wrapped {
					display: flex;
					width: 50%;
					height: 100%;
					justify-content: center;
					align-items: center;
					flex-direction: column;
                    // 头像
                    .avatar-frame {
                        border: 2px solid #e4e4e7;
                    }

					// 公司
					.company {
						margin: 10px 0px;
						font-size: 12px;
					}

					// 部门
					.department {
						margin-top: 8px;
						font-size: 12px;
					}

				}

				// 分割线
				.line-wrapped {
					height: 100%;
					display: flex;
					align-items: center;

					.line {
						height: 170px;
						border: 1px solid #D3D3D3;
					}
				}

				// 详细信息区域
				.detail-info-wrapped {
					height: 100%;
					width: calc(50% - 1px);
					margin-left: 50px;
					font-size: 12px;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: center;
				}
			}

			// 右边饼状图部分
			.manage-user-pie {
				width: calc(50%);
				height: 100%;
				background: #fff;
                border:1px solid #e4e4e7;
                border-radius: calc(.5rem + 4px);
			}
		}

		// 中间部分内容 消息阅读量图 产品类别图
		.mid-content-wrapped {
			margin-top: 8px;
			height: calc(32% - 8px);
			display: flex;

			// 中间左部分
			.mid-content-left {
				margin-right: 8px;
				width: calc(60% - 8px);
				background: #fff;
                border:1px solid #e4e4e7;
                border-radius: calc(.5rem + 4px);   
			}

			// 中间右部分
			.mid-content-right {
				width: calc(40%);
				background: #fff;
				padding: 8px;
                border:1px solid #e4e4e7;
                border-radius: calc(.5rem + 4px);

				// 标题
				.title {
					font-size: 14px;
					margin-bottom: 8px;
				}

				// 按钮区域
				.button-area {
					margin-bottom: 8px;
					height: 100px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					cursor: pointer;
					background: #fff;
                    border-radius: calc(.5rem + 4px);
                    
					// 按钮名字
					.button-name {
						margin-top: 10px;
					}
				}

				// 按钮变色
				.button-area:hover {
					background: #d9e9fb;
				}

			}
		}

		// 底部内容
		.footer-content-wrapped {
			margin-top: 8px;
			height: calc(32% - 8px);
			display: flex;

			// 底部左部分
			.footer-content-left {
				margin-right: 8px;
				height:100%;
				width: calc(35% - 8px);
				background: #fff;
                border:1px solid #e4e4e7;
                border-radius: calc(.5rem + 4px);
			}

			// 底部右部分
			.footer-content-right {
				height:100%;
				width: calc(65%);
				background: #fff;
                border:1px solid #e4e4e7;
                border-radius: calc(.5rem + 4px);
			}
		}
	}

</style>