<template>
    <!-- 消息管理员页面 -->
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <!-- 表格外壳 -->
   <div class="table-wrapped">
        <!-- 顶部 -->
        <div class="table-top">
            <!-- 表格顶部 -->
            <div class="table-header">
                <!-- 搜索框外壳 -->
                <div class="search-wrapped">
                    <el-input
                    v-model="adminAccount"
                    style="width: 240px"
                    placeholder="输入账号进行搜索"
                    :suffix-icon="Search"
                    @change="searchAdmin()"
                    />
                </div>
                <!-- 按钮外壳 -->
                <div class="button-wrapped">
                    <el-button type="primary" @click="openCreate(3)" round>添加消息管理员</el-button>
                </div>
            </div>

            <!-- 表格内容 -->
            <div class="table-content">
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column type="index" />
                    <el-table-column prop="account" label="账号" />
                    <el-table-column prop="name" label="姓名" />
                    <el-table-column prop="sex" label="性别" />
                    <el-table-column prop="department" label="部门" />
                    <el-table-column prop="email" label="邮箱" />
                    <el-table-column prop="update_time" label="更新时间" />
                    <el-table-column label="操作" width="180">
                        <!-- 添加插槽 -->
                        <template #default="{row}">
                            <div>
                                <el-button type="success" @click="openEdit(row.id)" round>编辑</el-button>
                                <el-button type="danger" @click="openDelete(row.id)" round>删除</el-button>
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
                :total="adminTotal"
                :page-count="paginationData.pageCount"
                :current-page="paginationData.currentPage"
                @current-change="currentChange"
            />
        </div>
   </div>
   <createAdmin ref="CreateAdmin" @success="getadminlist"></createAdmin>
   <editAdmin ref="EditAdmin" @success="getadminlist"></editAdmin>
   <deleteAdmin ref="DeleteAdmin" @success="getadminlist"></deleteAdmin>
</template>

<script setup lang="ts">
    import { reactive, ref }from 'vue'
    import { Search } from '@element-plus/icons-vue'
    // 导入一般组件
    import createAdmin from '../components/create_admin.vue'
    // 导入一般组件
    import editAdmin from '../components/edit_admin.vue'
    // 导入一般组件
    import deleteAdmin from '../components/delete_admin.vue'
    // 导入封装后的面包屑组件
    import breadCrumb from '@/components/bread_crumb.vue'
    // 全局总线bus
    import { bus } from "@/utils/mitt.js"
    // 导入getAdminList的api
    import { searchUser, getAdminListLength, returnListData } from '@/api/userinfor'
    // 面包屑
    const breadcrumb = ref()
    // 面包屑参数
    const item = ref({
        first:'消息管理员',
    })
    // 搜索框的modelValue
    const adminAccount = ref<number>()
    // 表格内容
    const tableData = ref([])
    // 搜索管理员
    const searchAdmin = async() => {
        tableData.value = await searchUser(adminAccount.value)
        // console.log(tableData.value)
    }

    // 创建分页数据
    const paginationData = reactive({
        // 总页数
        pageCount:1,
        // 当前所处页数
        currentPage:1,
    })

    // 定义管理员总数变量
    const adminTotal = ref<number>(0)
    // 获取管理员的总数
    const getadminlistLength = async() => {
        const res = await getAdminListLength("消息管理员")
        adminTotal.value = res.length
        // 向上取整
        paginationData.pageCount = Math.ceil(res.length/1)  //除以每页条目数
    }
    getadminlistLength()

    // 默认获取第一页数据
    const getFirstPageData = async() => {
        tableData.value = await returnListData(0,'消息管理员')
    }
    getFirstPageData()

    // 分页的监听换页事件 current-page 改变时触发
    const currentChange = async(value: number) => {
        paginationData.currentPage = value
        tableData.value = await returnListData(paginationData.currentPage-1,'消息管理员')
    }

    // 获取管理员列表
    const getadminlist = () => {
        getadminlistLength()
    }
    getadminlist()

    // 创建管理员
    const CreateAdmin = ref()
    // 打开弹窗
    const openCreate = (id:number) => {
        //第一个参数用来标记 第二个参数用来传入的值
        bus.emit('createId',id)
        CreateAdmin.value.open()
    }

    // 编辑管理员
    const EditAdmin = ref()
    // 打开弹窗
    const openEdit = (id:number) => {
        //第一个参数用来标记 第二个参数用来传入的值
        bus.emit('editId',id)
        EditAdmin.value.open()
    }

    // 降职管理员
    const DeleteAdmin = ref()
    const openDelete = (id:number) => {
        //第一个参数用来标记 第二个参数用来传入的值
        bus.emit('deleteId',id)
        DeleteAdmin.value.open()
    }

</script>