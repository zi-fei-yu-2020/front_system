<template>
    <el-row class="login-container">
        <el-col :lg="16" :md="12" class="left">
            <div>
                <div class="welcome-left">欢迎光临</div>
                <div class="site-name">SRE运维平台</div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right">
            <h2 class="welcome-right">欢迎回来</h2>
            <div class="login-form">
                <span class="right-left-span"></span>
                <span>账号密码登录</span>
                <span class="right-left-span"></span>
            </div>
            <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
                <el-form-item prop="username">
                    <el-input
                        v-model="form.username"
                        placeholder="请输入用户名"
                    >
                        <template #prefix>
                            <el-icon><User /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password>
                        <template #prefix>
                            <el-icon><Lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        round
                        color="#626aef"
                        class="w-[250px]"
                        type="primary"
                        @click="onSubmit"
                        :loading="loading"
                        >登 录</el-button
                    >
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>



<script setup>
import { ref,reactive,onMounted,onBeforeUnmount } from 'vue'
import { login } from "@/api/api.js"
import { useRouter } from 'vue-router';
import { toast } from '@/utils/tips.js'
import { setToken } from "@/utils/auth.js"
import { useStore } from 'vuex';


const store = useStore()
const router = useRouter()

// do not use same name with ref
const form = reactive({
    username: '',
    password: ''
})


const rules = {
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
    ]
}

const formRef = ref(null)
const loading = ref(false)
const onSubmit = () => {
    formRef.value.validate((valid) => { 
        if (!valid) { 
            return false
        }
        loading.value = true

        login(form.username, form.password)
            .then((response) => {
                if (response.data.code === 200) {
                    toast("登录成功")


                    //存储token
                    setToken(response.data.result.token)

                    router.push("/")

                } else if (response.data.code === 500) { 
                    toast("账号或者密码错误","error")
                }
            }).finally(() => { 
                loading.value=false
        })
    })
}

// 监听回车事件
function onKeyUp(e){
    if(e.key == "Enter") onSubmit()
}

// 添加键盘监听
onMounted(()=>{
    document.addEventListener("keyup",onKeyUp)
})
// 移除键盘监听
onBeforeUnmount(()=>{
    document.removeEventListener("keyup",onKeyUp)
})
</script>



<style>
.login-container {
    @apply min-h-screen;
}

.left {
    @apply bg-indigo-500 flex items-center justify-center;
}

.right {
    @apply bg-light-50 flex items-center justify-center flex-col;
}

.right-left-span {
    @apply h-[1px] w-16 bg-gray-200;
}

.welcome-right {
    @apply font-bold text-3xl text-gray-800;
}

.welcome-left {
    @apply font-bold text-3xl text-light-50 mb-4;
}

.login-form {
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.site-name{
    @apply font-bold text-gray-200 text-6xl;
}
</style>