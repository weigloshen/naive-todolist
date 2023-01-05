<!-- html结构 -->
<template>
  <div class="main">
    <n-space vertical>
      <n-table striped size="large">
        <thead>
          <tr>
            <th width="15">
              <n-checkbox
                size="large"
                v-model:checked="isAll"
                :on-update:checked="todos.changAll"
                label="全选"
              ></n-checkbox>
            </th>
            <th>姓名</th>
            <th>日期</th>
            <th>待办事项</th>
            <th>操作</th>
          </tr>
        </thead>
        <transition-group
          tag="tbody"
          enter-active-class="animate__animated animate__fadeIn "
          leave-active-class="animate__animated animate__fadeOut"
        >
          <tr v-for="td in tableData" :key="td.id">
            <td>
              <n-checkbox v-model:checked="td.isDone" @click="todos.todoDone" />
            </td>
            <td>{{ td.name }}</td>
            <td>{{ td.date }}</td>
            <td>{{ td.thing }}</td>
            <td>
              <n-button
                color="#8a2be2"
                tertiary
                round
                type="warning"
                @click="todos.delOneTodo(td.id)"
                >删除</n-button
              >
            </td>
          </tr>
        </transition-group>
      </n-table>
    </n-space>
  </div>
</template>

<!-- vue(Ts)代码 -->
<script setup lang="ts">
import { useTodosStore } from "../stores/todosStore";
import { storeToRefs } from "pinia";
import "animate.css";
const todos = useTodosStore();

let { tableData, isAll } = storeToRefs(todos);
todos.todoDone();
</script>

<!-- 样式设置 -->
<style scoped>
.main {
  margin-top: 15px;
  width: 600px;
}
</style>
