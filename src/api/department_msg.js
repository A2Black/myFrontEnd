// 导入axios
import instance from "@/http/index.js";

// 获取部门消息id列表 参数 id department
export const getDepartmentMsg = (id,department) => {
    return instance({
        url: 'dmsg/getDepartmentMsg',
        method: 'POST',
        // 传入数据
        data: {
            id,
            department
        }
    })
}

/**
 * @returns {Promise<string[]>} 
 */ 
// 获取部门消息列表 参数 id department
export const getDepartmentMsgList = (department) => {
    return instance({
        url: 'dmsg/getDepartmentMsgList',
        method: 'POST',
        // 传入数据
        data: {
            department
        }
    })
}

// 返回用户的阅读列表及状态
export const getReadListAndStatus = id => {
    return instance({
        url: 'dmsg/getReadListAndStatus',
        method: 'POST',
        // 传入数据
        data: {
            id,
        }
    })
}

// 用户点击消息后,对read_list内的数据进行删减
export const clickDelete = (id,readId) => {
    return instance({
        url: 'dmsg/clickDelete',
        method: 'POST',
        // 传入数据
        data: {
            id,
            readId
        }
    }) 
}

// 把新发布文章的id插入到当前所属部门的用户的read_list中
export const changeUserReadList = (department,newId) => {
    return instance({
        url: 'dmsg/changeUserReadList',
        method: 'POST',
        // 传入数据
        data: {
            department,
            newId
        }
    }) 
}

// 把删除的文章的id从当前所属部门的用户的read_list中删除
export const changeUserReadListButDelete = (department,deleteId) => {
    return instance({
        url: 'dmsg/changeUserReadListButDelete',
        method: 'POST',
        // 传入数据
        data: {
            department,
            deleteId
        }
    })
}