<!-- html结构 -->
<template>
  <div class="footer">
    <n-popconfirm @positive-click="todos.handlePositiveClick">
      <template #trigger>
        <n-button type="error">删除全部</n-button>
      </template>
      一切都将一去杳然，任何人都无法将其捕获。
    </n-popconfirm>
    <n-button type="success" @click="todos.completedTodo"
      >完成的该取消啦！</n-button
    >
  </div>
</template>

<!-- vue(Ts)代码 -->
<script setup lang="ts">
import { useTodosStore } from "../stores/todosStore";
const todos = useTodosStore();
</script>

<!-- 样式设置 -->
<style scoped>
.footer {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
