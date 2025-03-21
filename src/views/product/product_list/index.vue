<template>
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <!-- 模块化的公用外壳 -->
    <div class="module-common-wrapped">
        <div class="module-common-content">
            <!-- Tabs标签页 -->
            <el-tabs v-model="activeName" class="demo-tabs" stretch="true">
              <el-tab-pane label="产品列表" name="first">
                <div class="pane-content">
                    <div class="pane-top">
                        <div class="module-common-header">
                            <!-- 搜索框外壳 -->
                            <div class="search-wrapped">
                                <!-- 根据入库编号来搜索 -->
                                <el-input
                                v-model="productId"
                                style="width: 240px"
                                placeholder="输入入库编号来搜索"
                                :suffix-icon="Search"
                                />
                            </div>
                            <!-- 按钮外壳 -->
                            <div class="button-wrapped">
                                <el-button type="primary" @click="openInwareHouse" round>产品入库</el-button>
                            </div>
                        </div>
                        <!-- 模块化共用表格 -->
                        <div class="module-common-table">
                            <!-- 表格部分 -->
                            <el-table :data="tableData" style="width: 100%" border >
                                <!-- 添加索引 -->
                                <el-table-column type="index" width="50" />
                                <el-table-column prop="product_id" label="入库编号" width="200" />
                                <el-table-column prop="product_name" label="产品名称" width="160" />
                                <el-table-column prop="product_category" label="产品类别" width="100" />
                                <el-table-column prop="product_unit" label="单位"/>
                                <el-table-column prop="product_in_warehouse_number" label="库存数量" width="100" />
                                <el-table-column prop="product_single_price" label="产品单价" width="150" />
                                <el-table-column prop="product_all_price" label="库存总价" width="100" />
                                <el-table-column prop="product_status" label="库存状态" width="100">
                                    <!-- 添加插槽 -->
                                    <template #default="{row}">
                                        <el-tag type="primary">库存正常</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="product_create_person" label="入库负责人" width="100" />
                                <el-table-column prop="product_create_time" label="入库时间" width="200" >
                                    <template #default="{row}">
                                        <div>{{ row.update_time?.slice(0,10) }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="product_update_time" label="最后修改时间" width="200" >
                                    <template #default="{row}">
                                        <div>{{ row.update_time?.slice(0,10) }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="in_memo" label="入库备注" width="200" />
                                <el-table-column label="操作" width="300">
                                    <!-- 添加插槽 -->
                                    <template #default="{row}">
                                        <div>
                                            <el-button type="primary" >申请出库</el-button>
                                            <el-button type="success" >修改</el-button>
                                            <el-button type="danger" >删除</el-button>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="table-footer">
                        <!-- 分页 -->
                        <el-pagination
                            :page-size="20"
                            :pager-count="3"
                            layout="prev, pager, next"
                            :total="100"
                            background
                        />
                    </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="审核列表" name="second">
                <div class="pane-content">
                    <div class="pane-top">
                        <div class="module-common-header">
                            <!-- 搜索框外壳 -->
                            <div class="search-wrapped">
                                <!-- 根据申请出库编号来搜索 -->
                                <el-input
                                v-model="applyProductOutId"
                                style="width: 240px"
                                placeholder="输入申请出库编号来搜索"
                                :suffix-icon="Search"
                                />
                            </div>
                            <!-- 按钮外壳  保存下来弹性布局用 -->
                            <div class="button-wrapped"></div>
                        </div>
                        <!-- 模块化共用表格 -->
                        <div class="module-common-table">
                            <!-- 表格部分 -->
                            <el-table :data="applytableData" style="width: 100%" border >
                                <!-- 添加索引 -->
                                <el-table-column type="index" width="50" />
                                <el-table-column prop="product_out_id" label="申请出库编号" width="200" />
                                <el-table-column prop="product_name" label="产品名称" width="200" />
                                <el-table-column prop="product_out_number" label="申请出库数量" width="180" />
                                <el-table-column prop="product_out_price" label="申请出库总价" width="180" />
                                <el-table-column prop="product_out_apply_person" label="申请人" width="100" />
                                <el-table-column prop="product_apply_time" label="申请出库时间" width="180" >
                                    <template #default="{row}">
                                        <div>{{ row.update_time?.slice(0,10) }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="product_out_audit_person" label="审核人" width="150" />
                                <el-table-column prop="product_audit_time" label="审核时间" width="180" >
                                    <template #default="{row}">
                                        <div>{{ row.update_time?.slice(0,10) }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="product_out_status" label="审核状态" width="100" />
                                <el-table-column prop="apply_memo" label="申请出库备注" width="200" />
                                <el-table-column prop="audit_memo" label="审核备注" width="200" />
                                <el-table-column label="操作" width="300">
                                    <!-- 添加插槽 -->
                                    <template #default="{row}">
                                        <div>
                                            <el-button type="primary" round>撤回申请</el-button>
                                            <el-button type="success" round>再次申请</el-button>
                                            <el-button type="danger" round>审核</el-button>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="table-footer">
                        <!-- 分页 -->
                        <el-pagination
                            :page-size="20"
                            :pager-count="3"
                            layout="prev, pager, next"
                            :total="100"
                            background
                        />
                    </div>
                </div>
              </el-tab-pane>
            </el-tabs>
        </div>
    </div>

    <inwareHouse ref="inware" @success="getProductlist()"></inwareHouse>
</template>

<script setup lang="ts">
    import { ref }from 'vue'
    import { Search } from '@element-plus/icons-vue'
    // 导入一般组件
    import inwareHouse from '../components/product_in_warehouse.vue'
    // 导入封装后的面包屑组件
    import breadCrumb from '@/components/bread_crumb.vue'
    import { getProductList } from '@/api/product'

    // 面包屑
    const breadcrumb = ref()
    // 面包屑参数
    const item = ref({
        first:'产品管理',
        second:'产品列表'
    })
    // 默认打开的标签页
    const activeName = ref('first')
    // 产品申请入库编号
    const productId = ref()
    // 产品申请出库编号
    const applyProductOutId = ref()
    // 产品申请入库表格对象数组
    const tableData = ref([])
    // 产品申请出库表格对象数组
    const applytableData = ref([])
    const getProductlist = async() => {
        tableData.value = await getProductList()
    }
    getProductlist()

    // 打开产品入库
    const inware = ref()
    // 点击函数打开弹窗
    const openInwareHouse = () => {
        inware.value.open()
    }
</script>

<style lang="scss" scoped>
    // 公共模块外壳
    .module-common-wrapped {
        padding: 8px;
        background-color: #f1f3f6;
        height: calc(100vh - 105px);

        // 公共模块内容
        .module-common-content {
            padding: 0 10px;
            height: 100%;
            background-color: #fff;
            border:1px solid #e4e4e7;
            border-radius: calc(.5rem + 4px);

            // Tabs分页内容
            .pane-content {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: calc(100vh -  170px);
                background-color: #fff;

                .pane-top {
                    // 模块化表格头部样式（搜索框和添加按钮）
                    .module-common-header {
                        padding: 0 20px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    // 模块化表格样式
                    .module-common-table {
                        min-height: 10px;
                        padding: 10px 10px 20px;
                        margin-bottom: 8px;
                        background-color: #fff;
                    }
                }

                .table-footer {
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }

    :deep(.el-table .cell) {
        font-weight: 400;
    }
</style>