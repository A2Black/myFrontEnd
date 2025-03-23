import { 
    defineStore 
} from 'pinia'

export const useMessageStore = defineStore('messageinfo', {
    state: () => {
        return {
            
        }
    },
    actions: {
      increment() {
        this.count++
      },
    },
  })