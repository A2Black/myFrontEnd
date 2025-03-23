// 导入axios
import instance from "@/http/index.js";

// 发布消息
export const publishMessage = data => {
    const {
		message_title,
		...message_level
	} = data
	return instance({
		url: '/msg/publishMessage',
		method: 'POST',
		data: {
			message_title,
		    ...message_level
		}
	})
}

// 获取公司公告列表
export const companyMessageList = () => {
    // 调用instance
    return instance({
        url:'msg/companyMessageList',
        method:'POST',
    })
}

/**
 * @returns {Promise<string[]>} 
 */ 
// 获取系统消息列表
export const systemMessageList = () => {
    // 调用instance
    return instance({
        url:'msg/systemMessageList',
        method:'POST',
    })
}

// 编辑公告
export const editMessage = data => {
    const {
        id,
		...message_title
	} = data
	return instance({
		url: '/msg/editMessage',
		method: 'POST',
		data: {
			id,
		    ...message_title
		}
	})
}

// 根据发布部门进行获取消息
export const searchMessageBydepartment = message_publish_department => {
	return instance({
		url: '/msg/searchMessageBydepartment',
		method: 'POST',
		data: {
			message_publish_department
		}
	})
}

// 根据发布等级进行获取消息
export const searchMessageByLevel = message_level => {
	return instance({
		url: '/msg/searchMessageByLevel',
		method: 'POST',
		data: {
			message_level
		}
	})
}

/**
 * @returns {Promise<string[]>} 
 */ 
// 获取公告/系统消息
export const getMessage = id => {
	return instance({
		url: '/msg/getMessage',
		method: 'POST',
		data: {
			id
		}
	})
}

// 更新点击率
export const updateClick = data => {
    const {
		message_click_number,
		id
	} = data
	return instance({
		url: '/msg/updateClick',
		method: 'POST',
		data: {
			message_click_number,
		    id
		}
	})
}

// 初次删除
export const firstDelete = id => {
	return instance({
		url: '/msg/firstDelete',
		method: 'POST',
		data: {
			id
		}
	})
}

// 获取回收站的列表
export const recycleList = () => {
	return instance({
		url: '/msg/recycleList',
		method: 'POST',
	})
}

// 获取回收站消息总数
export const getRecycleMessageLength = () => {
	return instance({
		url: '/msg/getRecycleMessageLength',
		method: 'POST',
	})
}

// 回收站监听换页
export const returnRecycleListData = pager => {
	return instance({
		url: '/msg/returnRecycleListData',
		method: 'POST',
		data: {
			pager
		}
	})
}

// 还原操作
export const recover = id => {
	return instance({
		url: '/msg/recover',
		method: 'POST',
		data: {
			id
		}
	})
}

// 删除操作
export const deleteMessage = id => {
	return instance({
		url: '/msg/deleteMessage',
		method: 'POST',
		data: {
			id
		}
	})
}

// 获取公司公告总数
export const getCompanyMessageLength = () => {
	return instance({
		url: '/msg/getCompanyMessageLength',
		method: 'POST',
	})
}

// 获取系统消息总数
export const getSystemMessageLength = () => {
	return instance({
		url: '/msg/getSystemMessageLength',
		method: 'POST',
	})
}

/**
 * @returns {Promise<string[]>} 
 */ 
// 监听换页返回数据  公司公告列表
export const returnCompanyListData = pager => {
	return instance({
		url: '/msg/returnCompanyListData',
		method: 'POST',
		data: {
			pager
		}
	})
}

// 监听换页返回数据  系统消息列表
export const returnSystemListData = pager => {
	return instance({
		url: '/msg/returnSystemListData',
		method: 'POST',
		data: {
			pager
		}
	})
}