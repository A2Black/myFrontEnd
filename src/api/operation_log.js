// 导入axios
import instance from "@/http/index.js";

// 操作记录
export const operationLog = data => {
    const {
        operation_person,
        operation_content,
        operation_level
    } = data
	return instance({
		url: '/olog/operationLog',
		method: 'POST',
		data: {
			operation_person,
            operation_content,
            operation_level
		}
	})
}

// 返回操作日志列表
export const operationLogList = () => {
	return instance({
		url: '/olog/operationLogList',
		method: 'POST',	
	})
}

// 搜索最近十条操作记录
export const searchOperationLogList = operation_person => {
	return instance({
		url: '/olog/searchOperationLogList',
		method: 'POST',	
		data: {
			operation_person
		}
	})
}

// 返回操作日志列表的长度
export const operationLogListLength = () => {
	return instance({
		url: '/olog/operationLogListLength',
		method: 'POST',
    })	
}

// 监听换页返回数据  操作日志列表
export const returnOperationListData = pager => {
	return instance({
		url: '/olog/returnOperationListData',
		method: 'POST',
		data: {
			pager
		}
	})
}

// 清空操作日志
export const clearOperationLogList = () => {
	return instance({
		url: '/olog/clearOperationLogList',
		method: 'POST',
	})	
}