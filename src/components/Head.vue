<!-- html结构 -->
<template>
    <div class="head">
        <n-input-group>
            <n-input v-model:value="myName" placeholder="输入一下名字吧" />
            <n-input v-model:value="input" placeholder="请输入待办事项" @keyup.enter="todos.addTodo" />
            <n-button type="primary" @click="todos.addTodo">添加</n-button>
        </n-input-group>
    </div>
</template>

<!-- vue(Ts)代码 -->
<script setup lang="ts">
import { useTodosStore } from "../stores/todosStore"
import { storeToRefs } from 'pinia'
const todos = useTodosStore()
let { input, myName } = storeToRefs(todos)
</script>

<!-- 样式设置 -->
<style scoped lang="less">
</style>