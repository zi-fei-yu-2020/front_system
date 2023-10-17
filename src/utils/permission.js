import router from "../router";
import { toast,showFullLoading,hideFullLoading } from "./tips";
import { getToken } from "./auth";
import store from "../store";

//全局前置守卫
router.beforeEach(async(to,from,next)=>{

    const token = getToken()

    // 没有登录，强制跳转回登录页
    if(!token && to.path != "/login"){
        toast("请先登录","error")
        return next({ path:"/login" })
    }

    // 防止重复登录
    if(token && to.path == "/login"){
        toast("请勿重复登录","error")
        return next({ path:from.path ? from.path : "/" })
    }

    //如果用户登录了，自动获取用户信息，并存储在vuex当中
    if(token){
        await store.dispatch("user_info")
    }


    // 设置页面标题
    let title = "SRE运维平台"
    document.title = title

    next()
})


// 全局后置守卫
router.afterEach((to, from) => hideFullLoading())