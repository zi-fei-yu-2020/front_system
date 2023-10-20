import { createStore } from "vuex";
import { user_info } from "@/api/api.js"
import { toast } from '@/utils/tips.js'
import { removeToken } from '@/utils/auth'
import { useRouter } from 'vue-router'



const store = createStore({
    state() {
        return {
            //用户信息
            user: {},
            menus:[],
        }
    },
    mutations: {
        //记录用户信息
        SET_USERINFO(state, user) {
            state.user = user
        },

        SET_MENUS(state, menus) { 
            state.menus = menus
        }
    },
    actions:{
        // 获取当前登录用户信息
        user_info({ commit }) {
            const router = useRouter()
            return new Promise((resolve,reject)=>{
                user_info().then(res => {
                    if (res.data.code === 401 || res.data.code === 500) {
                        // Token 过期，显示提示并重定向到登录页面
                        removeToken('admin-token')
                        router.push('/login')
                        toast('Token过期,请重新登录!!!', 'error');
                    } else{
                        // 处理其他情况
                        commit("SET_USERINFO", res.data.result.data)
                        commit("SET_MENUS", res.data.result.data.menus)
                        resolve(res)
                    }

                }).catch(err=>reject(err))
            })
        }
    }

})
export default store