import { 
    defineStore 
} from 'pinia'
import { 
    getUserInfo
} from '@/api/userinfor'

export const useUserInforStore = defineStore('userinfor', {
	state: () => {
		return {
			imageUrl: '',
			name: '',
			sex: '',
			department: '',
			identity: '',
			account: '',
			email:'',
		}
	},
	actions: {
        // 获取用户信息
		async userInfo(id) {
			const res = await getUserInfo(id)
			this.imageUrl = res.image_url
			this.name = res.name
			this.sex = res.sex
			this.department = res.department
			this.identity = res.identity
			this.account = res.account
			this.email = res.email
		}
	},
	persist: {
        key: "userInfo",
        storage: localStorage,
    }
})