<template>
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <!-- 表格外壳 -->
    <div class="table-wrapped">
        <!-- 表格头部 -->
        <div class="table-top">
            <!-- 表格顶层盒子 -->
            <div class="table-header">
                <!-- 搜索框外壳 -->
                <div class="search-wrapped">
                    <!-- 根据出库编号来搜索 -->
                    <el-input
                    v-model="productOutId"
                    style="width: 240px"
                    placeholder="输入申请出库编号来搜索"
                    clearable
                    :suffix-icon="Search"
                    @change="searchProductOutId()"
                    @clear="getFirstPageData()"
                    />
                </div>
            </div>
            <!-- 表格内容 -->
            <div class="table-content">
                <!-- 表格部分 -->
                <el-table :data="outTableData" style="width: 100%" border>
                    <!-- 添加索引 -->
                    <el-table-column type="index" width="50" />
                    <el-table-column prop="product_out_id" label="出库编号" width="200" />
                    <el-table-column prop="product_name" label="出库物品" width="200" />
                    <el-table-column prop="product_out_number" label="出库数量" width="180" />
                    <el-table-column prop="product_out_price" label="申请出库总价" width="180" />
                    <el-table-column prop="product_out_apply_person" label="出库申请人" width="100" />
                    <el-table-column prop="product_apply_time" label="申请出库时间" width="180" >
                        <template #default="{row}">
                            <div>{{ row.product_apply_time?.slice(0,10) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="product_out_audit_person" label="审核人" width="150" />
                    <el-table-column prop="product_audit_time" label="审核时间" width="180" >
                        <template #default="{row}">
                            <div>{{ row.product_audit_time?.slice(0,10) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="audit_memo" label="审核备注" />
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
                :total="outProductTotal"
                :page-count="paginationData.pageCount"
                :current-page="paginationData.currentPage"
                @current-change="currentChange"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, reactive }from 'vue'
    import { Search } from '@element-plus/icons-vue'
    // 导入封装后的面包屑组件
    import breadCrumb from '@/components/bread_crumb.vue'
    // 导入封装后的接口
    import { searchProductForOutId, returnOutProductListData, getOutProductLength } from '@/api/product'
    // 面包屑
    const breadcrumb = ref()
    // 面包屑参数
    const item = ref({
        first:'产品管理',
        second:'出库列表'
    })
    // 出库编号
    const productOutId = ref()
    // 出库列表表格数组对象
    const outTableData = ref([])
    // 通过出库编号来搜索产品
    const searchProductOutId = async() => {
        outTableData.value = await searchProductForOutId(productOutId.value)
    }

    // 创建分页数据
    const paginationData = reactive({
        // 总页数
        pageCount:1,
        // 当前所处页数
        currentPage:1,
    })

    // 出库产品总数
    const outProductTotal = ref<number>(0)
    // 获取出库列表产品的总数
    const getoutProductListLength = async() => {
        const res = await getOutProductLength()
        outProductTotal.value = res.length
        // 向上取整
        paginationData.pageCount = Math.ceil(res.length/10)  //除以每页条目数
    }
    getoutProductListLength()

    // 默认获取第一页数据
    const getFirstPageData = async() => {
        outTableData.value = await returnOutProductListData(1)
    }
    getFirstPageData()

    // 分页的监听换页事件 current-page 改变时触发
    const currentChange = async(value: number) => {
        paginationData.currentPage = value
        outTableData.value = await returnOutProductListData(paginationData.currentPage)
    }
    
</script>

<style lang="scss" scoped>
    .table-wrapped {
		padding: 8px;
		height: calc(100vh - 105px);
		background: #f1f3f6;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.table-top {
			height: 100vh;
            padding: 8px;
            margin-bottom: 8px;
            background: #fff;
			display: flex;
			flex-direction: column;
            border:1px solid #e4e4e7;
            border-radius: calc(.5rem + 4px);

			.table-header {
				padding: 0 24px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 48px;
				background: #fff;
			}

			.table-content {
				min-height: 10px;
				padding: 10px 20px 20px;
				margin-bottom: 8px;
				background: #fff;
			}
		}

		.table-footer {
			padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: center;
		}
	}
    :deep(.el-table .cell) {
		font-weight: 400;
	}
</style>