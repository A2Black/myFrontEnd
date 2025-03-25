<template>
    <!-- 面包屑 -->
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <!-- 表格外壳 -->
    <div class="table-wrapped">
        <!-- 表格头部 -->
        <div class="table-top">
            <div class="table-header">
                <!-- 弹性布局用 -->
                <div></div>
                <div class="upload-wrapped">
                    <el-upload
                        v-model:file-list="fileList"
                        class="upload-demo"
                        action="http://127.0.0.1:3007/file/uploadFile"
                        :on-success="handleSuccess"
                        :show-file-list="false"
                        multiple
                    >
                        <el-button type="primary" >点击上传<el-icon class="el-icon--right"><Upload /></el-icon></el-button>
                    </el-upload>
                </div>
            </div>
            <div class="table-content">
                <el-table border :data="tableData" style="width: 100%">
                    <!-- 索引 -->
                    <el-table-column type="index" width="50" />
                    <el-table-column prop="file_name" label="文件名" />
                    <el-table-column prop="file_size" label="文件大小" >
                        <template #default="{row}">
                            <div>{{ row.file_size?.toFixed(2) }} KB</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="upload_person" label="上传者" />
                    <el-table-column prop="download_number" label="下载次数" />
                    <el-table-column prop="upload_time" label="上传时间" >
                        <template #default="{row}">
                            <div>{{ row.upload_time?.slice(0,10) }}</div>
                        </template>
                    </el-table-column>
                    <!-- 操作 -->
                    <el-table-column label="操作" width="300"  fixed="right">
                        <!-- 添加插槽 -->
                        <template #default="{row}">
                            <div>
                                <el-button type="success" @click="" >
                                    <template #default>
                                        <a :href="row.file_url" @click="changeClickNumber(row.download_number,row.id)">下载</a>
                                    </template>
                                </el-button>
                                <el-button type="danger" @click="openDeleteFiles(row)" >删除</el-button>
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
                :total="paginationData.filesTotal"
                :page-count="paginationData.filesPageCount"
                :current-page="paginationData.filesCurrentPage"
                @current-change="fileCurrentChange"
            />
        </div>
    </div>
    <tipDel ref="tipDelFile" @success="getFileFirstPageList"></tipDel>
</template>

<script setup lang="ts">
    import { ref, reactive } from 'vue'
    import type { UploadProps, UploadUserFile } from 'element-plus'
    // 全局总线bus
    import { bus } from "@/utils/mitt.js"
    // 导入消息提示
    import { ElMessage } from 'element-plus'
    // 导入接口
    import { bindFileAndUser,fileListLength, returnFilesListData, updateDownload } from '@/api/file'
    // 导入一般组件
    import tipDel from './components/tips.vue'
    // 导入封装后的面包屑组件
    import breadCrumb from '@/components/bread_crumb.vue'
    // 面包屑
    const breadcrumb = ref()
    // 面包屑参数
    const item = ref({
        first:'合同管理',
    })
    const fileList = ref<UploadUserFile[]>([])

    // 文件上传成功的回调 文件状态成功时的钩子
    const handleSuccess = (response:any) => {
        console.log(response)
        if(response.status==0){
            (async()=>{
                await bindFileAndUser(localStorage.getItem('name'),response.url)
            })()
            ElMessage({
                message: '上传文件成功!',
                type: 'success',
            })
            getFileFirstPageList()
        }
        else{
            ElMessage.error('上传文件失败!')
        }
    }
    // 文件数量超出限制的回调 超出文件数量限制时的钩子
    // const handleExceed : UploadProps['onExceed'] = () => {
    //     ElMessage.warning('一次最多上传三个文件！')
    // }

    // 表格数组对象
    const tableData = ref([])

    // 分页组件
    // 创建分页数据
    const paginationData = reactive({
        // 文件总数
        filesTotal:1,
        // 文件列表总页数
        filesPageCount:1,
        // 文件列表当前所处页数
        filesCurrentPage:1,
    })

    // 获取文件的总数
    const getFileListLength = async() => {
        const res = await fileListLength()
        paginationData.filesTotal = res.length
        // 向上取整 计算总页数
        paginationData.filesPageCount = Math.ceil(res.length/10)  //除以每页条目数
    }
    getFileListLength()

    // 默认获取文件列表第一页的数据
	const getFileFirstPageList = async () => {
		tableData.value = await returnFilesListData(1)
        getFileListLength()
    }
    getFileFirstPageList()

    // 文件列表列表分页的监听换页事件 current-page 改变时触发
    const fileCurrentChange = async(value: number) => {
        paginationData.filesCurrentPage = value
        tableData.value = await returnFilesListData(paginationData.filesCurrentPage)
    }

    // 删除文件
    const tipDelFile = ref()
    // 打开删除文件弹窗
    const openDeleteFiles = (row:any) => {
        bus.emit('deleteFileId',row)
        tipDelFile.value.open()
    }

    // 更新下载量
    const changeClickNumber = async(download_number:number,id:number) => {
        updateDownload(download_number,id)
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