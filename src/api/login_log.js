// 导入axios
import instance from "@/http/index.js";

// 登录记录
export const loginLog = data => {
    const {
        account,
        name,
        email
    } = data
    return instance({
        url: 'llog/loginLog',
        method: 'POST',
        // 传入数据
        data: {
            account,
            name,
            email
        }
    })
}

// 返回登录日志列表
export const loginLogList = () => {
    return instance({
        url: 'llog/loginLogList',
        method: 'POST',
    })
}

// 搜索最近十条登录记录
export const searchLoginLogList = account => {
    return instance({
        url: 'llog/searchLoginLogList',
        method: 'POST',
        // 传入数据
        data: {
            account
        }
    })
}

// 返回登录日志列表的长度
export const loginLogListLength = () => {
    return instance({
        url: 'llog/loginLogListLength',
        method: 'POST',
    }) 
}

// 监听换页返回数据  登录日志列表
export const returnLoginListData = pager => {
    return instance({
        url: 'llog/returnLoginListData',
        method: 'POST',
        // 传入数据
        data: {
            pager
        }
    })
}

// 清空登录日志
export const clearLoginLogList = () => {
    return instance({
        url: 'llog/clearLoginLogList',
        method: 'POST',
    }) 
}