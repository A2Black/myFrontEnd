<template>
    <!-- 网站首页 -->
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <!-- 首页外壳 -->
    <div class="home-wrapped">
        <!-- 轮播图外壳 -->
        <div class="swipper-wrapped">
            <el-carousel :interval="4000" indicator-position="outside" type="card" height="280px">
                <el-carousel-item v-for="(item,index) in imageUrl" :key="index">
                    <img :src="item" class="swiper" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 栅格布局外壳 -->
        <div class="layout-wrapped">
            <el-row :gutter="20">
                <el-col :span="6" v-for="(item,index) in companyIntroduce" :key='index' @click="openIntroduce(index+1)">
                    <div class="company-message-area">
                        <span>{{item.set_name}}</span>
                        <div v-html="item.set_text" class="company-introduce"></div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 表格外壳 -->
        <div class="two-tables-wrapped">
            <!-- 公司公告 -->
            <div class="company-notice">
                <span>公司公告</span>
                <el-table :data="tableData" style="width: 100%" :show-header="false">    <!-- 隐藏表头 -->
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="name" label="Name" width="180" />
                    <el-table-column prop="address" label="Address" />
                </el-table>
            </div>
            <!-- 系统消息 -->
            <div class="system-message">
                <span>系统消息</span>
                <el-table :data="tableData" style="width: 100%" :show-header="false">
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="name" label="Name" width="180" />
                    <el-table-column prop="address" label="Address" />
                </el-table>
            </div>

        </div>
    </div>
    <introduce ref="intro"></introduce>
</template>

<script lang="ts" setup>
    import { ref }from 'vue'
    // 导入封装后的面包屑组件
    import breadCrumb from '@/components/bread_crumb.vue'
    // 导入apigetAllSwiper
    import { getAllSwiper,getAllCompanyIntroduce } from '@/api/setting'
    import { bus } from "@/utils/mitt.js"
    import introduce from './components/introduce.vue'
    // 面包屑
    const breadcrumb = ref()
    // 面包屑参数
    const item = ref({
        first:'首页',
    })
    const tableData = []

    // 轮播图
	const imageUrl = ref([]) 
	
	// 获取所有轮播图
	const getAllswiper = async()=>{
		imageUrl.value = await getAllSwiper()
	}
	// 调用getAllswiper
	getAllswiper()

    // 获取公司介绍
    const companyIntroduce = ref()
    const getAllCompanyintroduce = async()=>{
        const res = await getAllCompanyIntroduce()
        // 解构赋值
        const [name,...intro] = res
        companyIntroduce.value = intro
    }

    // 调用上述函数
    getAllCompanyintroduce()

    // 打开公司介绍弹窗
    const intro  = ref()
    const openIntroduce = (id:number)=>{
        bus.emit('introduce',id)
        intro.value.open()
    }

</script>

<style lang="scss" scoped>
    // 混合语法
    @mixin table-class {
        height: 232px;
        width: 48%;
        display: flex;
        flex-direction: column;
        margin-top: 8px;
        
        span {
            font-size: 14px;
            margin-bottom: 5px;
            border-bottom: 1px solid #ea0709;
        }
    }

    // 首页外壳
    .home-wrapped{
        padding: 8px;
        height: calc(100vh - 105px);
        background: #f5f5f5;
        display: flex;
        flex-direction: column;

        // 轮播图外壳
        .swipper-wrapped{
            padding: 0 20px;
            background: #fff;
            margin-bottom: 8px;
            border:1px solid #e4e4e7;
            border-radius: calc(.5rem + 4px);

            // 轮播图
            .swiper{
                height: 100%;
                width: 100%;
            }
        }
        // 栅格布局外壳
        .layout-wrapped{
            padding: 8px;
            margin-bottom: 8px;
            background: #f5f5f5;

            // 公司信息样式
            .company-message-area{
                background: #fff;
                height: 200px;
                padding: 8px;
                border:1px solid #e4e4e7;
                border-radius: calc(.5rem + 4px);
                cursor: pointer;

                // span标签样式
                span{
                    border-bottom: 1px solid #409eff ;
                    font-size: 14px;
                }

                .company-introduce{
                    text-indent: 24px;
					font-size: 14px;
					overflow: hidden;
					text-overflow: ellipsis;
                    // 限制行数 文本截断   私有属性
					-webkit-line-clamp: 4;
                    // 添加标准属性
                    line-clamp: 4;
					display: -webkit-box;
					-webkit-box-orient: vertical;
                }
            }
        }
        // 表格外壳
        .two-tables-wrapped{
            height: 232px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            background: #fff;
            border:1px solid #e4e4e7;
            border-radius: calc(.5rem + 4px);
            

            // 公司公告
            .company-notice{
                @include table-class()
            }

            // 系统消息
            .system-message{
                @include table-class()
            }
        }

    }

    // 轮播图默认样式
    .el-carousel__item h3 {
        color: #475669;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
        text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
        border:1px solid #e4e4e7;
        border-radius: calc(.5rem + 4px);
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
        border:1px solid #e4e4e7;
        border-radius: calc(.5rem + 4px);
    }
</style>