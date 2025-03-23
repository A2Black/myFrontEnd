<template>
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <!-- 模块化的公用外壳 -->
    <div class="module-common-wrapped">
        <div class="module-common-content">
            <!-- Tabs标签页 -->
            <el-tabs v-model="activeName" class="demo-tabs" stretch="true" @tab-click="handleClick" >
              <el-tab-pane label="公司公告" name="first">
                <div class="pane-content">
                    <div class="pane-top">
                        <div class="module-common-header">
                            <!-- 搜索框外壳 -->
                            <div class="search-wrapped">
                                <el-select v-model="department" placeholder="请选择部门以筛选公告" style="width: 240px">
                                    <el-option v-for="item in departmentData" :key="item" :label="item" :value="item" />
                                </el-select>
                                <el-radio-group v-model="radiogroup">
                                    <el-radio value="Sponsor">一般</el-radio>
                                    <el-radio value="Venue">重要</el-radio>
                                    <el-radio value="Venue">紧急</el-radio>
                                </el-radio-group>
                            </div>
                            <!-- 按钮外壳 -->
                            <div class="button-wrapped">
                                <el-button type="primary" plain round>全部公告</el-button>
                                <el-button type="primary" @click="createMessage(1)" round>发布公告</el-button>
                            </div>
                        </div>
                        <!-- 模块化共用表格 -->
                        <div class="module-common-table">
                            <!-- 表格部分 -->
                            <el-table :data="companyTableData" style="width: 100%" border >
                                <!-- 添加索引 -->
                                <el-table-column type="index" width="50" />
                                <el-table-column prop="message_title" label="公告主题" width="240" />
                                <el-table-column prop="message_category" label="类别" />
                                <el-table-column prop="message_publish_department" label="发布部门" width="140"/>
                                <el-table-column prop="message_publish_name" label="发布人"/>
                                <el-table-column prop="message_receipt_object" label="接收部门" width="140"/>
                                <el-table-column prop="message_level" label="公告等级" width="100" />
                                <el-table-column prop="message_publish_time" label="发布时间" width="200" >
                                    <template #default="{row}">
                                        <div>{{ row.message_publish_time?.slice(0,10) }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="message_update_time" label="最新编辑时间" width="200" >
                                    <template #default="{row}">
                                        <div>{{ row.message_update_time?.slice(0,10) }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="message_click_number" label="阅读人数"/>
                                <el-table-column label="操作" width="300"  fixed="right">
                                    <!-- 添加插槽 -->
                                    <template #default="{row}">
                                        <div>
                                            <el-button type="success" @click="editMessage(row)">编辑</el-button>
                                            <el-button type="danger" @click="fisrtDeleteMessage(row.id)">删除</el-button>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
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
              </el-tab-pane>
              <el-tab-pane label="系统消息" name="second">
                <div class="pane-content">
                    <div class="pane-top">
                        <div class="module-common-header">
                            <!-- 搜索框外壳 -->
                            <div class="search-wrapped">
                            </div>
                            <!-- 按钮外壳  保存下来弹性布局用 -->
                            <div class="button-wrapped">
                                <el-button type="primary" @click="createMessage(2)" round>发布系统消息</el-button>
                            </div>
                        </div>
                        <!-- 模块化共用表格 -->
                        <div class="module-common-table">
                            <!-- 表格部分 -->
                            <el-table :data="systemTableData" style="width: 100%" border >
                                <!-- 添加索引 -->
                                <el-table-column type="index" width="50" />
                                <el-table-column prop="message_title" label="消息主题" />
                                <el-table-column prop="message_publish_name" label="发布者" />
                                <el-table-column prop="message_click_number" label="阅读人数" />
                                <el-table-column prop="message_publish_time" label="发布时间" width="200" >
                                    <template #default="{row}">
                                        <div>{{ row.message_publish_time?.slice(0,10) }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="300" fixed="right">
                                    <!-- 添加插槽 -->
                                    <template #default="{row}">
                                        <div>
                                            <el-button type="success" @click="editSystemMessage(row)">编辑</el-button>
                                            <el-button type="danger" @click="fisrtDeleteMessage(row.id)">删除</el-button>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="table-footer">
                        <el-pagination
                            :page-size="20"
                            :pager-count="11"
                            layout="prev, pager, next"
                            :total="1000"
                        />
                    </div>
                </div>
              </el-tab-pane>
            </el-tabs>
        </div>
    </div>
    <createEdit ref = "createM" @success="getTwoList"></createEdit>
    <deleteM ref="deletem" @success="getTwoList"></deleteM>
</template>

<script setup lang="ts">
    import { ref, reactive, onBeforeUnmount }from 'vue'
    import type { TabsPaneContext } from 'element-plus'
    // 导入一般组件
    import createEdit from '../components/create.vue' 
    import deleteM from '../components/delete.vue'
    // 导入接口
    import { returnCompanyListData, systemMessageList } from '@/api/message.js'
    // 导入获取部门的api
    import { getDepartment } from '@/api/setting'
    // 全局总线bus
    import { bus } from "@/utils/mitt.js"
    // 导入封装后的面包屑组件
    import breadCrumb from '@/components/bread_crumb.vue'

    // 面包屑
    const breadcrumb = ref()
    // 面包屑参数
    const item = ref({
        first:'消息管理',
        second:'消息列表'
    })
    // 默认打开的标签页
    const activeName = ref('first')
    
    // tab 被选中时触发
    const handleClick = (tab: TabsPaneContext) => {
        
    }

    // 创建表格数组对象
    const companyTableData = ref([])
    const systemTableData = ref([])

    // 定义部门 根据部门进行筛选
    const departmentData = ref([])
    // 返回的部门数据
    const department = ref()
    // 获取部门数据
    const getdepartment = async() => {
        departmentData.value = await getDepartment()
    }
    getdepartment()
    // 根据消息等级进行筛选
    const radiogroup = ref()

    // 发布公告/发布系统消息
    const createM = ref()
    const createMessage = (id:number) => {
        bus.emit('createMId',id)
        createM.value.open()
    }

    // 编辑公告
    const editMessage = (row:any) => {
        bus.emit('editMId',row)
        createM.value.open()
    }

    // 编辑系统消息
    const editSystemMessage = (row:any) => {
        bus.emit('editSystemMId',row)
        createM.value.open()
    }

    // 初次删除公告/系统消息
    const deletem = ref()
    const fisrtDeleteMessage = (id:number) => {
    	bus.emit('firstdeleteMsgId',id)
        console.log(id)
    	deletem.value.open()
    }

    // 默认获取公司公告列表第一页的数据
	const getCompanyFirstPageList = async () => {
		companyTableData.value = await returnCompanyListData(1)
    }
    getCompanyFirstPageList()

    // 获取系统消息列表
    const getsystemMessageList = async () => {
		systemTableData.value = await systemMessageList()
    }
    getsystemMessageList()

    // 刷新两个列表的第一页数据
    const getTwoList = () => {
        getCompanyFirstPageList()
        getsystemMessageList()
    }


</script>

<style lang="scss" scoped>
    :deep(.el-table .cell) {
        font-weight: 400;
    }

    :deep(.el-radio-group) {
        margin-left: 20px;
    }
</style>