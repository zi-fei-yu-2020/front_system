<template>
    <div>
        <el-button type="primary" @click="handler_button">我是按钮{{ count }}</el-button>
    </div>
</template>
<script setup>
import { ref } from "vue";

const count = ref(0)


function handler_button() {
    count.value++ 
    console.log("我是按钮，在被点击");
}


</script>