import axios from "@/utils/axios.js"

//用户登录
export function login(username, password) {
    return axios.post(
        "/user/login", {
        username, password
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


//用户列表
export function get_userlist(page) {
    return axios.get(`/user/userlist?page=` + page)
}


//增加用户
export function add_user(data) {
    return axios.post(
        "/user/register",
        data
    )
}

//修改用户
export function update_user(id, data) {
    return axios.post(
        "/user/update_user" + id,
        data
    )
}


//删除用户
export function delete_user(id) {
    return axios.post(
        "/user/delete_user",
        { "id":id }
    )
}