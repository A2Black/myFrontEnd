<template>
    <!-- 产品管理员页面 -->
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
                    v-model="input2"
                    style="width: 240px"
                    placeholder="输入账号进行搜索"
                    :suffix-icon="Search"
                    />
                </div>
                <!-- 按钮外壳 -->
                <div class="button-wrapped">
                    <el-button type="primary" @click="openCreate(1)" round>添加产品管理员</el-button>
                </div>
            </div>

            <!-- 表格内容 -->
            <div class="table-content">
                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column type="index" />
                    <el-table-column prop="account" label="账号" />
                    <el-table-column prop="name" label="姓名" />
                    <el-table-column prop="department" label="部门" />
                    <el-table-column prop="email" label="邮箱" />
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
                :page-size="20"
                :pager-count="11"
                layout="prev, pager, next"
                :total="1000"
            />
        </div>
   </div>
   <createAdmin ref="CreateAdmin" @success="getadminlist"></createAdmin>
   <editAdmin ref="EditAdmin" @success="getadminlist"></editAdmin>
   <deleteAdmin ref="DeleteAdmin" @success="getadminlist"></deleteAdmin>
</template>

<script setup lang="ts">
    import { ref }from 'vue'
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
    import { getAdminList } from '@/api/userinfor'
    // 面包屑
    const breadcrumb = ref()
    // 面包屑参数
    const item = ref({
        first:'产品管理员',
    })
    const input2 = ref('')
    // 表格内容
    const tableData = ref([
        
    ])
    // 创建管理员
    const CreateAdmin = ref()
    // 打开弹窗
    const openCreate = (id:number) => {
        //第一个参数用来标记 第二个参数用来传入的值
        bus.emit('createId',id)
        CreateAdmin.value.open()
    }

    // 获取管理员列表
    const getadminlist = async() => {
        tableData.value = await getAdminList(item.value.first)
    }
    getadminlist()

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