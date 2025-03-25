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
                    <!-- 根据账号来搜索 -->
                    <el-input
                    v-model="account"
                    style="width: 240px"
                    placeholder="请输入登录账号来搜索"
                    clearable
                    :suffix-icon="Search"
                    @change="searchLoginLogs()"
                    @clear="getLLogFirstPageList()"
                    />
                </div>
                <!-- 按钮 -->
                <div>
                    <el-button type="primary" @click="clearLLogList">清空登录日志</el-button>
                </div>
            </div>
            <div class="table-content">
                <el-table border :data="tableData" style="width: 100%">
                    <!-- 索引 -->
                    <el-table-column type="index" width="50" />
                    <el-table-column prop="account" label="账号" />
                    <el-table-column prop="name" label="名字" />
                    <el-table-column prop="email" label="邮箱" />
                    <el-table-column prop="login_time" label="登录时间" >
                        <template #default="{row}">
                            <div>{{ row.login_time?.slice(0,16) }}</div>
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
                :total="paginationData.loginLogsTotal"
                :page-count="paginationData.loginLogsPageCount"
                :current-page="paginationData.loginLogsCurrentPage"
                @current-change="lLogCurrentChange"
            />
        </div>
    </div>
    <tipClear ref="tipClearLlog" @success="getLLogFirstPageList"></tipClear>
</template>

<script setup lang="ts">
    import { ref, reactive } from 'vue'
    import { Search } from '@element-plus/icons-vue'
    // 导入接口
    import { loginLogListLength, returnLoginListData, searchLoginLogList } from '@/api/login_log'
    // 导入一般组件
    import tipClear from './components/tips.vue'
    // 导入封装后的面包屑组件
    import breadCrumb from '@/components/bread_crumb.vue'
    // 面包屑
    const breadcrumb = ref()
    // 面包屑参数
    const item = ref({
        first:'登录日志',
    })

    // 登录日志表格数组对象
    const tableData = ref([])

    // 根据账号来搜索
    const account = ref()
    const searchLoginLogs = async() => {
        tableData.value = await searchLoginLogList(account.value)
    }

    // 打开清空登录日志
    const tipClearLlog = ref()
    const clearLLogList = async() => {
        tipClearLlog.value.open()
    }


    // 分页组件
    // 创建分页数据
    const paginationData = reactive({
        // 操作日志总数
        loginLogsTotal:1,
        // 操作日志总页数
        loginLogsPageCount:1,
        // 操作日志当前所处页数
        loginLogsCurrentPage:1,
    })

    // 获取登录日志的总数
    const getLLogListLength = async() => {
        const res = await loginLogListLength()
        paginationData.loginLogsTotal = res.length
        // 向上取整 计算总页数
        paginationData.loginLogsPageCount = Math.ceil(res.length/10)  //除以每页条目数
    }
    getLLogListLength()

    // 默认获取登录日志列表第一页的数据
	const getLLogFirstPageList = async () => {
		tableData.value = await returnLoginListData(1)
        getLLogListLength()
    }
    getLLogFirstPageList()

    // 登录日志列表分页的监听换页事件 current-page 改变时触发
    const lLogCurrentChange = async(value: number) => {
        paginationData.loginLogsCurrentPage = value
        tableData.value = await returnLoginListData(paginationData.loginLogsCurrentPage)
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
</style>