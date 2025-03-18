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
                        v-model="adminAccount"
                        style="width: 240px"
                        placeholder="输入账号进行搜索"
                        :suffix-icon="Search"
                        @change="searchAdmin()"
                        />
                    </div>
                    <!-- 下拉选择外壳 -->
                    <div class="select-wrapped">
                        <el-select v-model="formData.department" placeholder="请选择部门">
                        <el-option v-for="item in departmentData" :key="item" :label="item" :value="item" />
                    </el-select>
                    </div>
                </div>
                <!-- 按钮外壳 -->
                <div class="button-wrapped" width="232">
                    <el-button type="primary" plain >筛选冻结用户</el-button>
                    <el-button type="primary" plain >显示全部用户</el-button>
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
                    <el-table-column prop="status" label="状态">
                        <!-- 添加插槽 -->
                        <template #default="{row}">
                            <div>
                                <!-- Tag标签 -->
                                <el-tag type="primary" v-if="row.status == 1">冻结</el-tag>
                                <el-tag v-else type="success">正常</el-tag>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="creat_time" label="创建时间" />
                    <el-table-column prop="update_time" label="更新时间" />
                    <el-table-column label="操作" width="180">
                        <!-- 添加插槽 -->
                        <template #default="{row}">
                            <div>
                                <el-button type="primary" round>冻结</el-button>
                                <el-button type="success" round>解冻</el-button>
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
                :page-size="20"
                :pager-count="11"
                layout="prev, pager, next"
                :total="1000"
            />
        </div>
   </div>
   <!-- <createAdmin ref="CreateAdmin" @success="getadminlist"></createAdmin>
   <editAdmin ref="EditAdmin" @success="getadminlist"></editAdmin>
   <deleteAdmin ref="DeleteAdmin" @success="getadminlist"></deleteAdmin> -->
</template>

<script setup lang="ts">
    import { ref }from 'vue'
    import { Search } from '@element-plus/icons-vue'
    // 导入获取部门的api
    import { getDepartment } from '@/api/setting'
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
    import { getAdminList, searchUser } from '@/api/userinfor'
    // 面包屑
    const breadcrumb = ref()
    // 面包屑参数
    const item = ref({
        first:'用户列表',
    })
    // 搜索框的modelValue
    const adminAccount = ref<number>()

    const departmentData = ref([])
    // 获取部门数据
    const getdepartment = async() => {
        departmentData.value = await getDepartment()
    }
    getdepartment()

    // 表格内容
    const tableData = ref([
        {
            id:1
        }
    ])

    // 搜索管理员
    const searchAdmin = async() => {
        const res = await searchUser(adminAccount.value)
        console.log(res)
    }

    const formData = ref({
        department:''
    })

    // 创建管理员
    // const CreateAdmin = ref()
    // 打开弹窗
    // const openCreate = (id:number) => {
    //     //第一个参数用来标记 第二个参数用来传入的值
    //     bus.emit('createId',id)
    //     CreateAdmin.value.open()
    // }

    // 获取管理员列表
    // const getadminlist = async() => {
    //     tableData.value = await getAdminList(item.value.first)
    // }
    // getadminlist()

    // 编辑管理员
    // const EditAdmin = ref()
    // 打开弹窗
    // const openEdit = (id:number) => {
    //     //第一个参数用来标记 第二个参数用来传入的值
    //     bus.emit('editId',id)
    //     EditAdmin.value.open()
    // }

    // 降职管理员
    // const DeleteAdmin = ref()
    // const openDelete = (id:number) => {
    //     //第一个参数用来标记 第二个参数用来传入的值
    //     bus.emit('deleteId',id)
    //     DeleteAdmin.value.open()
    // }
</script>

<style lang="scss" scoped>
    .table-wrapped {
        padding: 8px;
        height: calc(100vh - 105px);
        background-color: #f1f3f6;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .table-top {
            border:1px solid #e4e4e7;

            .table-header {
                padding: 0 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 48px;
                background-color: #fff;

                .el-input__wrapper {
                    height: 32px;
                }
            }
        }


        .table-footer {
            display: flex;
            justify-content: center
        }
    }

</style>