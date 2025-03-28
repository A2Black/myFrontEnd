<template>
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <!-- 表格外壳 -->
    <div class="table-wrapped">
        <!-- 表格顶部 -->
        <div class="table-top">
            <!-- 表格内容 -->
             <div class="table-contentt">
                <!-- 表格 -->
                <el-table :data="tableData" style="width: 100%;" border>
                    <!-- 索引 -->
                    <el-table-column type="index" width="50" />
                    <el-table-column prop="message_title" label="消息主题" />
                    <el-table-column prop="message_category" label="所属类别" />
                    <el-table-column prop="message_publish_department" label="发布部门" />
                    <el-table-column prop="message_receipt_object" label="接收对象" />
                    <el-table-column prop="message_delete_time" label="删除日期" >
                        <template #default="{row}">
                            <div>{{ row.message_delete_time?.slice(0,10) }}</div>
                        </template>
                    </el-table-column>
                    <!-- 操作 -->
                    <el-table-column label="操作" width="300"  fixed="right">
                        <!-- 添加插槽 -->
                        <template #default="{row}">
                            <div>
                                <el-button type="success" @click="reMessage(row)" >还原</el-button>
                                <el-button type="danger" @click="realDelete(row.id)" >删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
             </div>
        </div>
        <!-- 表格底部 -->
        <div class="table-footer">
            <!-- 分页组件 -->
            <el-pagination
                :page-size="1"
                :pager-count="7"
                layout="prev, pager, next"
                :total="paginationData.recycleMessageTotal"
                :page-count="paginationData.recycleMessagePageCount"
                :current-page="paginationData.recycleMessageCurrentPage"
                @current-change="recycleMessageCurrentChange"
            />
        </div>
    </div>

    <reAndDel ref="rad" @success="getCycleFirstPageList"></reAndDel>
</template>

<script setup lang="ts">
    import { ref, onBeforeUnmount, reactive }from 'vue'
    // 导入封装后的面包屑组件
    import breadCrumb from '@/components/bread_crumb.vue'
    // 导入一般组件
    import reAndDel from '../components/delete.vue'
    // 导入接口
    import { getRecycleMessageLength, returnRecycleListData } from '@/api/message'
    // 全局总线bus
    import { bus } from "@/utils/mitt.js"

    // 面包屑
    const breadcrumb = ref()
    // 面包屑参数
    const item = ref({
        first:'消息管理',
        second:'回收站'
    })

    // 定义表格数组对象
    const tableData = ref([])

    // 还原和删除组件
    const rad = ref()
    // 打开还原操作弹窗
    const reMessage = (row:any) => {
       bus.emit('reMessageId',row)
       rad.value.open()
    }

    // 打开删除操作弹窗
    const realDelete = (id:number) => {
        bus.emit('realDeleteId',id)
        rad.value.open()
    }

    // 分页组件
    // 创建分页数据
    const paginationData = reactive({
        // 回收站公告总数
        recycleMessageTotal:1,
        // 回收站公告列表总页数
        recycleMessagePageCount:1,
        // 回收站公告列表当前所处页数
        recycleMessageCurrentPage:1,
    })

    // 获取回收站公告的总数
    const getRecycleMessageListLength = async() => {
        const res = await getRecycleMessageLength()
        paginationData.recycleMessageTotal = res.length
        // 向上取整 计算总页数
        paginationData.recycleMessagePageCount = Math.ceil(res.length/10)  //除以每页条目数
    }
    getRecycleMessageListLength()

    // 默认获取回收站公告列表第一页的数据
	const getCycleFirstPageList = async () => {
		tableData.value = await returnRecycleListData(1)
        getRecycleMessageListLength()
    }
    getCycleFirstPageList()

    // 回收站公告列表列表分页的监听换页事件 current-page 改变时触发
    const recycleMessageCurrentChange = async(value: number) => {
        paginationData.recycleMessageCurrentPage = value
        tableData.value = await returnRecycleListData(paginationData.recycleMessageCurrentPage)
    }

    // 取消监听
    onBeforeUnmount(() => {
        bus.all.clear()
    })
    
</script>

<style scoped lang="scss">
    .table-wrapped {
		padding: 8px;
		height: calc(100vh - 105px);
		background: #f5f5f5;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.table-top {
			display: flex;
			flex-direction: column;

			.table-content {
				padding: 10px 20px 20px;
				margin-bottom: 8px;
				background: #fff;
			}
		}

		// .table-footer {
		// 	display: flex;
		// 	justify-content: flex-end;
		// 	background: #fff;
		// }
	}

    :deep(.el-table .cell) {
        font-weight: 400;
    }
</style>