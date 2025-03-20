<template>
    <!-- 产品管理员页面 -->
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <!-- 表格外壳 -->
   <div class="table-wrapped">
        <!-- 顶部 -->
        <div class="table-top">
            <!-- 表格顶部 -->
            <div class="table-header">
                <div class="left_wrapped"> 
                    <!-- 搜索框外壳 -->
                    <div class="search-wrapped">
                        <el-input
                        v-model="userAccount"
                        style="width: 240px"
                        placeholder="输入账号进行搜索"
                        :suffix-icon="Search"
                        @change="searchuser()"
                        />
                    </div>
                    <!-- 下拉选择外壳 -->
                    <div class="select-wrapped">
                        <el-select v-model="department" placeholder="请选择部门" clearable  @change="searchForDepartment" @clear="clearOperation" >
                            <el-option v-for="item in departmentData" :key="item" :label="item" :value="item" />
                        </el-select>
                    </div>
                </div>
                <!-- 按钮外壳 -->
                <div class="button-wrapped" width="232">
                    <el-button type="primary" plain @click="banUserList" >筛选冻结用户</el-button>
                    <el-button type="primary" plain @click="getFirstPageData" >显示全部用户</el-button>
                </div>
            </div>

            <!-- 表格内容 -->
            <div class="table-content">
                <el-table :data="tableData" style="width: 100%" border @row-dblclick="openUserCard">
                    <el-table-column type="index" />
                    <el-table-column prop="account" label="账号" />
                    <el-table-column prop="name" label="姓名" />
                    <el-table-column prop="sex" label="性别" />
                    <el-table-column prop="department" label="部门" />
                    <el-table-column prop="email" label="邮箱" />
                    <el-table-column prop="status" label="状态">
                        <!-- 添加插槽 -->
                        <template #default="{row}">
                            <div>
                                <!-- Tag标签 -->
                                <el-tag type="primary" v-if="row.status == 1" >冻结</el-tag>
                                <el-tag v-else type="success">正常</el-tag>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="creat_time" label="创建时间">
                        <template #default="{row}">
                            <div>{{ row.creat_time?.slice(0,10) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="update_time" label="更新时间">
                        <template #default="{row}">
                            <div>{{ row.update_time?.slice(0,10) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <!-- 添加插槽 -->
                        <template #default="{row}">
                            <div>
                                <el-button type="primary" round @click="banuser(row.id)" :disabled='row.status==1'>冻结</el-button>
                                <el-button type="success" round @click="hotuser(row.id)" :disabled='row.status==0'>解冻</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </div>
        <!-- 底部 -->
        <div class="table-footer">
            <!-- 分页组件 -->
            <el-pagination
                :page-size="1"
                :pager-count="7"
                layout="prev, pager, next"
                :total="userTotal"
                :page-count="paginationData.pageCount"
                :current-page="paginationData.currentPage"
                @current-change="currentChange"
            />
        </div>
   </div>
   <userInfo ref="userCard"></userInfo>
</template>

<script setup lang="ts">
    import { 
        ref,
        reactive,
        onBeforeUnmount
     }from 'vue'
    import { Search } from '@element-plus/icons-vue'
    // 导入获取部门的api
    import { getDepartment } from '@/api/setting'
    // 导入封装后的面包屑组件
    import breadCrumb from '@/components/bread_crumb.vue'
    // 导入消息提示
    import { ElMessage } from 'element-plus'
    // 导入getAdminList的api
    import { searchUser, searchUserByDepartment, getAdminListLength, returnListData, banUser, hotUser, getBanList } from '@/api/userinfor'
    // 导入一般组件
    import userInfo from '../components/user_info.vue'
    // 全局总线bus
    import { bus } from "@/utils/mitt.js"
    // 面包屑
    const breadcrumb = ref()
    // 面包屑参数
    const item = ref({
        first:'用户管理',
        second:'用户列表'
    })
    
    // 搜索框的modelValue
    const userAccount = ref<number>()
    // 部门数据
    const departmentData = ref([])
    // 表格内容
    const tableData = ref([])

    // 通过账号搜索用户
    const searchuser = async() => {
        // 参数是账号
        tableData.value = await searchUser(userAccount.value)
    }

    // 获取部门数据
    const getdepartment = async() => {
        departmentData.value = await getDepartment()
    }
    getdepartment()

    // 创建响应式数据部门
    const department = ref()
    // 通过部门进行搜索
    const searchForDepartment = async() => {
        // tableData.value = await searchUserByDepartment(department.value)
        // 防御性检查：确保 department.value 有效   避免change事件和clear事件同时发生
        if (department.value) {
            tableData.value = await searchUserByDepartment(department.value)
        }
    }

    // 清空选择框
    const clearOperation = () => {
        getFirstPageData()
    }

    // 创建分页数据
    const paginationData = reactive({
        // 总页数
        pageCount:1,
        // 当前所处页数
        currentPage:1,
    })

    // 定义用户总数变量
    const  userTotal = ref<number>(0)
    // 获取用户的总数
    const getadminlistLength = async() => {
        const res = await getAdminListLength("用户")
        userTotal.value = res.length
        // 向上取整
        paginationData.pageCount = Math.ceil(res.length / 10)  //除以每页条目数
        console.log(res)
    }
    getadminlistLength()

    // 默认获取第一页数据
    const getFirstPageData = async() => {
        tableData.value = await returnListData(1,'用户')
    }
    getFirstPageData()

    // 分页的监听换页事件 current-page 改变时触发
    const currentChange = async(value: number) => {
        paginationData.currentPage = value
        tableData.value = await returnListData(paginationData.currentPage,'用户')
    }

    // 筛选冻结用户
    const banUserList = async() => {
        tableData.value = await getBanList()
    }
    
    // 冻结用户
    const banuser = async(id:number) => {
        const res = await banUser(id)
        if(res.status === 0){
            ElMessage({
                message: '冻结用户成功！',
                type: 'success',
            })
            tableData.value = await returnListData(paginationData.currentPage,'用户')
        }else{
            ElMessage.error('冻结用户失败!')
        }
    }
    // 解冻用户
    const hotuser = async(id:number) => {
        const res = await hotUser(id)
        if(res.status === 0){
            ElMessage({
                message: '解冻用户成功！',
                type: 'success',
            })
            tableData.value = await returnListData(paginationData.currentPage,'用户')
        }else{
            ElMessage.error('解冻用户失败!')
        }
    }

    // 用户信息弹窗
    const userCard = ref()
    // 打开弹窗
    const openUserCard = (row:any) => {
        //第一个参数用来标记 第二个参数用来传入的值
        bus.emit('userId',row)
        userCard.value.open()
    }
    // 刷新页面
    bus.on('offDialog',async(id:number)=>{
        // 当前页数
        const current = paginationData.currentPage
        if(id) {
            tableData.value = await returnListData(paginationData.currentPage,'用户')
            // 如果是第二页第一条数据
            if(tableData.value.length == 0){
                // 页面-1
                paginationData.currentPage = current-1
                tableData.value = await returnListData(paginationData.currentPage,'用户')
                getadminlistLength()
            }
        }
    })

    onBeforeUnmount(()=>{
        bus.all.clear()
    })
</script>

<style lang="scss" scoped>

</style>