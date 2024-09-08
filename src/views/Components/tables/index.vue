<template>
  <div class="container">
    <!-- 表单 -->
    <el-form label-width="80px" :model="formModel">
      <el-form-item prop="time" label="时间">
        <el-input
          style="width: 240px"
          v-model="formModel.time"
          placeholder="输入时间"
        ></el-input>
      </el-form-item>
      <el-form-item prop="filters" label="条件筛选">
        <el-select
          v-model="formModel.filters"
          multiple
          placeholder="选择筛选条件"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 新增按钮 -->
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <!-- 表格 -->
    <el-table
      :data="
        tableData.slice(
          (paginationParams.page - 1) * paginationParams.pageSize,
          paginationParams.page * paginationParams.pageSize,
        )
      "
    >
      <!-- 序号列 -->
      <el-table-column label="序号" width="60">
        <template #default="scope">
          {{
            (paginationParams.page - 1) * paginationParams.pageSize +
            scope.$index +
            1
          }}
        </template>
      </el-table-column>
      <!-- 星期列 -->
      <el-table-column label="星期一" prop="monday"></el-table-column>
      <el-table-column label="星期二" prop="tuesday"></el-table-column>
      <el-table-column label="星期三" prop="wednesday"></el-table-column>
      <el-table-column label="星期四" prop="thursday"></el-table-column>
      <el-table-column label="星期五" prop="friday"></el-table-column>
      <el-table-column label="星期六" prop="saturday"></el-table-column>
      <el-table-column label="星期日" prop="sunday"></el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleInfo(scope.row)">详情</el-button>
          <el-popconfirm
            title="确认删除吗？"
            @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button type="text">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <El-pagination
        :config="config"
        :paginationParams="paginationParams"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
      />
    </div>
    <!-- 编辑/新增对话框 -->
    <el-dialog
      width="30%"
      height="600px"
      v-model="dialogVisible"
      :title="dialogTitle"
      @close="onDialogClose"
    >
      <el-form label-width="80px" class="dialogForm" :model="editForm">
        <el-form-item prop="monday" label="星期一:">
          <el-input
            style="width: 100%"
            v-model="editForm.monday"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item prop="tuesday" label="星期二:">
          <el-input
            style="width: 100%"
            v-model="editForm.tuesday"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item prop="wednesday" label="星期三:">
          <el-input
            style="width: 100%"
            v-model="editForm.wednesday"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item prop="thursday" label="星期四:">
          <el-input
            style="width: 100%"
            v-model="editForm.thursday"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item prop="friday" label="星期五:">
          <el-input
            style="width: 100%"
            v-model="editForm.friday"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item prop="saturday" label="星期六:">
          <el-input
            style="width: 100%"
            v-model="editForm.saturday"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onDialogClose">取消</el-button>
          <el-button type="primary" @click="saveEdit">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 查看详情对话框 -->
    <el-dialog
      width="50%"
      v-model="infoVisible"
      title="详情"
      @close="infoVisible = false"
    >
      <pre>{{ JSON.stringify(currentRow, null, 2) }}</pre>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { message } from "@/Hooks/Element-plus"
import { ref, watchEffect, reactive, computed } from "vue"
import type {
  paginationConfigType,
  paginationParamsType,
} from "../../../components/ElementPlus_components/El-pagination/type"

const dialogVisible = ref(false)
const infoVisible = ref(false)
const editForm = ref({})
const currentRow = ref({})
const tableData = ref([
  {
    id: 1,
    monday: "css",
    tuesday: "js",
    wednesday: "vue2",
    thursday: "vue3",
    friday: "webpack",
    saturday: "vite",
    sunday: "react",
  },
  {
    id: 2,
    monday: "css",
    tuesday: "js",
    wednesday: "vue2",
    thursday: "vue3",
    friday: "webpack",
    saturday: "vite",
    sunday: "react",
  },
  {
    id: 3,
    monday: "css",
    tuesday: "js",
    wednesday: "vue2",
    thursday: "vue3",
    friday: "webpack",
    saturday: "vite",
    sunday: "react",
  },
  {
    id: 4,
    monday: "css",
    tuesday: "js",
    wednesday: "vue2",
    thursday: "vue3",
    friday: "webpack",
    saturday: "vite",
    sunday: "react",
  },
  {
    id: 5,
    monday: "css",
    tuesday: "js",
    wednesday: "vue2",
    thursday: "vue3",
    friday: "webpack",
    saturday: "vite",
    sunday: "react",
  },
  {
    id: 6,
    monday: "css",
    tuesday: "js",
    wednesday: "vue2",
    thursday: "vue3",
    friday: "webpack",
    saturday: "vite",
    sunday: "react",
  },
])
const dialogTitle = ref("编辑")

// 表单模型
const formModel = reactive({
  time: "",
  filters: [] as string[],
})
const options = [
  { value: "Option1", label: "Option1" },
  { value: "Option2", label: "Option2" },
  { value: "Option3", label: "Option3" },
]

// 分页配置
const config = reactive({
  background: true,
  small: false,
  disabled: false,
  layout: "total, sizes, prev, pager, next, jumper",
  page_sizes: [10, 20],
})
const paginationParams = reactive({
  page: 1,
  pageSize: config.page_sizes[0],
  total: tableData.value.length,
})

// 分页事件处理
const pageChange = (val: number) => {
  message("info", "当前页变化")
  paginationParams.page = val
}
const pageSizeChange = (val: number) => {
  message("info", "每页条数变化")
  paginationParams.pageSize = val
}

// 行操作
const handleAdd = () => {
  message("info", "新增")
  dialogVisible.value = true
  dialogTitle.value = "新增"
  editForm.value = { id: tableData.value.length + 1 }
}
const handleEdit = (row: any) => {
  message("info", "编辑")
  dialogVisible.value = true
  dialogTitle.value = "编辑"
  editForm.value = { ...row }
}
const handleInfo = (row: any) => {
  message("info", "详情")
  infoVisible.value = true
  currentRow.value = row
}
const handleDelete = (row: any) => {
  message("info", "删除")
  const index = tableData.value.findIndex((item) => item.id === row.id)
  if (index !== -1) {
    tableData.value.splice(index, 1)
    paginationParams.total = tableData.value.length
  }
}

// 对话框关闭事件
const onDialogClose = () => {
  dialogVisible.value = false
  editForm.value = {}
}

// 保存编辑
const saveEdit = () => {
  dialogVisible.value = false
  if (dialogTitle.value === "新增") {
    tableData.value.push(editForm.value)
  } else {
    const index = tableData.value.findIndex(
      (item) => item.id === editForm.value.id,
    )
    if (index !== -1) {
      tableData.value[index] = { ...editForm.value }
    }
  }
  paginationParams.total = tableData.value.length
}
</script>

<style scoped lang="scss">
::v-deep .el-form {
  display: flex;
}
.dialogForm {
  display: flex;
  flex-direction: column;
}

.container {
  width: 100%;
  height: 100%;
  margin: 20px;

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
