import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import moment from "moment";
import { useMessage, useNotification } from "naive-ui";
import { nanoid } from "nanoid";

interface TableData {
  id: string;
  date: string;
  name: string;
  thing: string;
  isDone: boolean; //是否完成
}

export const useTodosStore = defineStore({
  id: "todos",
  state: () => ({
    //控制添加input框的内容
    input: ref<string>(""),
    message: useMessage(),
    notification: useNotification(),
    myName: ref<string>(""),
    //全选按钮
    isAll: ref<boolean>(false),
    //展示的数据todo
    tableData:
      reactive<TableData[]>(
        JSON.parse(localStorage.getItem("todos") as string)
      ) || reactive<TableData[]>([]),
  }),
  getters: {},
  actions: {
    // 存储到localStorage中，改变一次值就应该重新存储
    setLocal(): void {
      localStorage.setItem("todos", JSON.stringify(this.tableData));
    },
    //添加todo
    addTodo(): void {
      // 判断input是否为空
      if (this.myName.trim() && this.input.trim()) {
        // 生成时间
        const date: string = moment(+new Date()).format("YYYY-MM-DD");
        // 初始化todo数据
        const todo: TableData = {
          id: nanoid(), //nanoid是一种随机id
          date,
          name: this.myName,
          thing: this.input,
          isDone: false, //添加事件默认未完成
        };

        // 添加到tableData中
        this.tableData.unshift(todo);
        this.message.success("添加成功");
        this.input = "";
        this.todoDone();
        return;
      }
      this.input = "";
      this.message.error("错误");
    },
    //删除所有
    handlePositiveClick(): void {
      if (this.tableData.length > 0) {
        //清空tableData的数据
        this.tableData.length = 0;
        this.message.success("要努力啊");
        this.setLocal();
      }
    },
    //干掉已完成的（已经被标记过的）
    completedTodo(): void {
      if (this.tableData.length > 0) {
        const x = this.tableData.filter((todo) => !todo.isDone);
        if (x.length !== this.tableData.length) {
          this.tableData.length = 0;
          this.notification.info({
            title: "通知框序号: 恭喜你",
            content: "完成了你想做的",
          });
          Object.assign(this.tableData, x);
          this.setLocal();
          return;
        }
        this.notification.warning({
          title: "你还没有完成事情的",
          content: "请先选择哦",
        });
      }
    },
    //全选按钮
    changAll(checked: boolean): void {
      if (this.tableData.length > 0) {
        this.tableData.forEach((e) => {
          e.isDone = checked;
        });
        this.isAll = checked;
        this.setLocal();
      }
    },
    //反向确认全选按钮
    todoDone(): void {
      let x = this.tableData.filter((v) => {
        if (v.isDone) {
          return v;
        }
      });
      if (x.length === this.tableData.length) {
        this.isAll = true;
      } else {
        this.isAll = false;
      }
      this.setLocal();
    },
    //单独删除一个todo右边按钮
    delOneTodo(id: string) {
      this.tableData.forEach((e, i) => {
        if (e.id === id) {
          this.tableData.splice(i, 1);
          return;
        }
      });
      this.setLocal();
    },
  },
});
