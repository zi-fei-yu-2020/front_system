import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/index.vue";
import Login from "@/views/login.vue";
import NotFound from "@/views/404.vue";
import Admin from "@/layout/admin.vue"
import Demo from "@/views/manage/demo.vue"

const routes = [{
    path: "/",
    component: Admin,
    children: [{
        path: "/",
        component: Index,
        name:"后台首页"
    },
    {
        path: "/manage/demo",
        component: Demo,
        name:"测试界面"
    }]
}, {
    path: "/login",
    component: Login,
    name:"登录"
}, {
    path: "/:pathMatch(.*)*",
    component: NotFound,
    name: 'NotFound'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})



export default router