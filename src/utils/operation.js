// 追踪用户操作记录的埋点操作
import { operationLog } from '@/api/operation_log'

export const tracking = async(moudle,operation_person,operation_object,operation_level,operation_status) => {
    if(operation_status == 0){
        if(moudle == '管理员'){
            // 操作内容
            let operation_content = `对管理员'${operation_object}'进行了降职操作`
            await operationLog(operation_person,operation_content,operation_level)
        }
        if(moudle == '用户'){
            // 操作内容
            let operation_content = `对用户'${operation_object}'进行了删除操作`
            await operationLog(operation_person,operation_content,operation_level)
        }
        if(moudle == '用户登录状态'){
            // 操作内容
            let operation_content = `对用户'${operation_object}'进行了冻结操作`
            await operationLog(operation_person,operation_content,operation_level)
        }
        if(moudle == '产品入库'){
            // 操作内容
            let operation_content = `对'${operation_object}'进行了出库操作`
            await operationLog(operation_person,operation_content,operation_level)
        }
    }
    if(operation_status == 1){
        if(moudle == '用户登录状态'){
            // 操作内容
            let operation_content = `对用户'${operation_object}'进行了解冻操作`
            await operationLog(operation_person,operation_content,operation_level)
        }
        if(moudle == '产品入库'){
            // 操作内容
            let operation_content = `对'${operation_object}'进行了入库操作`
            await operationLog(operation_person,operation_content,operation_level)
        }
    }
}