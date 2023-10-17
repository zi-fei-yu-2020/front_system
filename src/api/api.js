import axios from "@/utils/axios.js"

//用户登录
export function login(username, password) { 
    return axios.post(
        "/user/login", {
        username,password
    })
}


//用户信息
export function user_info() { 
    return axios.get("/user/userinfo")
}

//修改密码
export function change_password(data) { 
    return axios.post(
        "/user/change_pwd",
        data
    )
}