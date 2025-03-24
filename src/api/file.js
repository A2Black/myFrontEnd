// 绑定上传者
export const bindFileAndUser = data => {
    const {
        name,
        url
    } = data
    return instance({
        url: 'file/bindFileAndUser',
        method: 'POST',
        // 传入数据
        data: {
            name,
            url
        }
    })
}

// 更新下载量
export const updateDownload = data => {
    const {
        download_number,
		id
    } = data
    return instance({
        url: 'file/updateDownload',
        method: 'POST',
        // 传入数据
        data: {
            download_number,
		    id
        }
    })
}

// 下载文件
export const downloadFile = id => {
    return instance({
        url: 'file/downloadFile',
        method: 'POST',
        // 传入数据
        data: {
		    id
        }
    })
}

// 获取文件列表
export const fileList = id => {
    return instance({
        url: 'file/fileList',
        method: 'POST',
        // 传入数据
        data: {
		    id
        }
    })
}

// 获取文件列表总数
export const fileListLength = id => {
    return instance({
        url: 'file/fileListLength',
        method: 'POST',
        // 传入数据
        data: {
		    id
        }
    })
}

// 监听换页返回数据 文件列表
export const returnFilesListData = pager => {
    return instance({
        url: 'file/returnFilesListData',
        method: 'POST',
        // 传入数据
        data: {
		    pager
        }
    })
}

// 搜索文件 模糊搜索 
export const searchFile = file_name => {
    return instance({
        url: 'file/searchFile',
        method: 'POST',
        // 传入数据
        data: {
		    file_name
        }
    })
}

// 删除文件
export const deleteFile = data => {
    const {
        id,
        file_name
    } = data
    return instance({
        url: 'file/deleteFile',
        method: 'POST',
        // 传入数据
        data: {
		    id,
            file_name
        }
    })
}