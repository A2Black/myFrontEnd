<template>
    <!-- 面包屑 -->
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <!-- 表格外壳 -->
    <div class="table-wrapped">
        <!-- 表格头部 -->
        <div class="table-top">
            <div class="table-header">
                <!-- 搜索框外壳 -->
                <div class="search-wrapped">
                    <!-- 根据操作者名称来搜索 -->
                    <el-input
                    v-model="name"
                    style="width: 240px"
                    placeholder="请输入操作者名称来搜索"
                    clearable
                    :suffix-icon="Search"
                    @change="searchOperationLogs()"
                    @clear="getOLogFirstPageList()"
                    />
                </div>
                <!-- 按钮 -->
                <div>
                    <el-button type="primary" @click="clearLogList">清空操作日志</el-button>
                </div>
            </div>
            <div class="table-content">
                <el-table border :data="tableData" style="width: 100%">
                    <!-- 索引 -->
                    <el-table-column type="index" width="50" />
                    <el-table-column prop="operation_person" label="操作者">
                        <template #default="{row}">
                            <div :class="level(row.operation_level)">
                                <span class="person">{{ row.operation_person }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operation_content" label="操作内容" />
                    <el-table-column prop="operation_level" label="操作等级" >
                        <template #default="{row}">
                            <el-tag :type="level(row.operation_level)">{{ row.operation_level }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operation_time" label="操作时间" >
                        <template #default="{row}">
                            <div>{{ row.operation_time?.slice(0,16) }}</div>
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
                :total="paginationData.operationLogsTotal"
                :page-count="paginationData.operationLogsPageCount"
                :current-page="paginationData.operationLogsCurrentPage"
                @current-change="oLogCurrentChange"
            />
        </div>
    </div>
    <tipClear ref="tipClearOlog" @success="getOLogFirstPageList"></tipClear>
</template>

<script setup lang="ts">
    import { ref, reactive } from 'vue'
    import { Search } from '@element-plus/icons-vue'
    // 导入接口
    import { operationLogListLength, returnOperationListData, searchOperationLogList, clearOperationLogList } from '@/api/operation_log'
    // 导入一般组件
    import tipClear from './components/tips.vue'
    // 导入封装后的面包屑组件
    import breadCrumb from '@/components/bread_crumb.vue'
    // 面包屑
    const breadcrumb = ref()
    // 面包屑参数
    const item = ref({
        first:'操作日志',
    })

    // 操作日志表格数组对象
    const tableData = ref([])

    // 操作等级
    const level = (level:string) => {
        if (level == '高级') return 'danger'
        if (level == '中级') return 'warning'
        if (level == '一般') return 'success'
    }

    // 根据操作者来搜索
    const name = ref()
    const searchOperationLogs = async() => {
        tableData.value = await searchOperationLogList(name.value)
    }

    // 清空操作日志
    const tipClearOlog = ref()
    const clearLogList = async() => {
        tipClearOlog.value.open()
    }


    // 分页组件
    // 创建分页数据
    const paginationData = reactive({
        // 操作日志总数
        operationLogsTotal:1,
        // 操作日志总页数
        operationLogsPageCount:1,
        // 操作日志当前所处页数
        operationLogsCurrentPage:1,
    })

    // 获取操作日志的总数
    const getOLogListLength = async() => {
        const res = await operationLogListLength()
        paginationData.operationLogsTotal = res.length
        // 向上取整 计算总页数
        paginationData.operationLogsPageCount = Math.ceil(res.length/10)  //除以每页条目数
    }
    getOLogListLength()

    // 默认获取操作日志列表第一页的数据
	const getOLogFirstPageList = async () => {
		tableData.value = await returnOperationListData(1)
        getOLogListLength()
    }
    getOLogFirstPageList()

    // 操作日志列表分页的监听换页事件 current-page 改变时触发
    const oLogCurrentChange = async(value: number) => {
        paginationData.operationLogsCurrentPage = value
        tableData.value = await returnOperationListData(paginationData.operationLogsCurrentPage)
    }


</script>

<style scoped lang="scss">
    :deep(.el-table .cell) {
		font-weight: 400;
	}
	
	a {
		color:#fff;
		display: block;
		text-decoration: none;
	}

    .person {
        margin-left: 8px;
    }

    .danger {
        border-left: 2px solid #f56c6c;
    }

    .warning {
        border-left: 2px solid #e6a23c;
    }

   .success {
        border-left: 2px solid #25a02f;
    }

</style>