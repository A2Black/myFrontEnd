import { 
    defineStore 
} from 'pinia'
// 导入api
import { getReadListAndStatus, getDepartmentMsgList } from '@/api/department_msg'

export const useMessageStore = defineStore('messageinfo', {
	state: () => {
		return {
			read_list: [],
      msg_list: [],
		}
	},
	actions: {
		// 获取用户信息
		async returnReadList(id) {
			this.read_list = []
			this.msg_list = []
			const res = await getReadListAndStatus(id)
			this.read_list = JSON.parse(res[0].read_list)
			this.msg_list = await getDepartmentMsgList(localStorage.getItem('department'))
		}
	},
	persist: {
        key: "messageinfo",
        storage: localStorage,
    }
})