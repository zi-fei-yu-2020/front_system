import { createStore } from "vuex";
import { login,user_info } from "@/api/api.js"
import { setToken } from "../utils/auth";

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
        user_info({ commit }){
            return new Promise((resolve,reject)=>{
                user_info().then(res=>{
                    commit("SET_USERINFO", res.data.result.data)
                    commit("SET_MENUS",res.data.result.data.menus)
                    resolve(res)
                }).catch(err=>reject(err))
            })
        }
    }

})
export default store