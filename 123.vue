<!-- html结构 -->
<template>
  <el-card>
    <div class="header">
      <el-input v-model="input" placeholder="Please input"></el-input>
      <el-button type="primary" style="margin-left: 10px;" @click="addTodo">添加</el-button>
    </div>
    <div class="main" style="margin-top: 10px;">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        ref="TableRef"
        @select="selected"
        @select-all="selectAll"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="thing" label="Thing" :show-overflow-tooltip="true" />
      </el-table>
    </div>

    <div class="footer">
      <el-popconfirm
        confirm-button-text="Yes"
        cancel-button-text="No"
        :icon="InfoFilled"
        icon-color="red"
        title="真的要全部删除吗?"
        @confirm="confirmEvent"
      >
        <template #reference>
          <el-button type="danger">全部删除</el-button>
        </template>
      </el-popconfirm>
      <div class="right">
        <el-button type="success">确定完成任务</el-button>
        <el-button type="warning" @click="delTheTask">删除完成的任务</el-button>
      </div>
    </div>
  </el-card>
</template>

<!-- vue(Ts)代码 -->
<script setup lang="ts">
import { ElMessage, ElTable } from "element-plus"
import { ref, reactive, nextTick } from "vue"
import { InfoFilled } from '@element-plus/icons-vue'
import moment from "moment"
const input = ref<string>("")
let isDoneAll: boolean = false

const TableRef = ref<InstanceType<typeof ElTable>>()
interface TableData {
  id: string
  date: string,
  name: string,
  thing: string,
  isDone: boolean
}

let tableData = reactive<TableData[]>([
  {
    id: "001",
    date: "2022-3-28",
    name: "周月1",
    thing: "吃饭",
    isDone: false
  },
  {
    id: "002",
    date: "2022-3-28",
    name: "周月3",
    thing: "吃饭",
    isDone: false
  },
  {
    id: "004",
    date: "2022-3-28",
    name: "周月2",
    thing: "吃饭",
    isDone: true
  },
])

const addTodo = () => {
  if (!input.value) {
    return ElMessage.warning("请输入待办事项")
  }
  const date = moment(+new Date()).format(('YYYY-MM-DD'))
  const todo: TableData = {
    id: "005",
    date,
    name: "周岳",
    thing: input.value,
    isDone: false
  }
  tableData.push(todo)
  input.value = ""
}

const confirmEvent = () => {
  tableData.length = 0
}

const toggle = () => {
  if (tableData.length) {
    nextTick(() => {
      tableData.forEach((item) => {
        TableRef.value!.toggleRowSelection(item, item.isDone)
      })
    })
  }
}
toggle()

const selected = (selection: TableData[], row: TableData) => {
  tableData[tableData.indexOf(row)].isDone = !row.isDone
}

const selectAll = (selection: TableData[]) => {
  if (selection.length) {
    isDoneAll = true
  } else {
    isDoneAll = false
  }
  tableData.forEach((item) => {
    item.isDone = isDoneAll
  })
}

const delTheTask = () => {

}

</script>

<!-- 样式设置 -->
<style scoped >
.header {
  display: flex;
}
.footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>