<template>
  <div class="task-form">
    <el-input v-model="newTask.title" placeholder="New task..." @keyup.enter="handleAdd" />
    <el-select v-model="newTask.category" placeholder="Category">
      <el-option label="Work" value="Work" />
      <el-option label="Personal" value="Personal" />
      <el-option label="Study" value="Study" />
    </el-select>
    <el-date-picker
      v-model="newTask.deadline"
      type="date"
      placeholder="Deadline"
      format="YYYY-MM-DD"
    />
    <el-button type="primary" @click="handleAdd">Add</el-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTasks } from "../composables/useTasks";

const props = defineProps({
  onTaskAdded: Function,
});

const { addTask } = useTasks();

const newTask = ref({
  title: "",
  category: "",
  deadline: null,
});

const handleAdd = async () => {
  if (!newTask.value.title) return;

  await addTask({
    title: newTask.value.title,
    category: newTask.value.category || "Personal",
    deadline: newTask.value.deadline,
  });

  // 👇 Принудительно перезагружаем список
  if (props.onTaskAdded) {
    await props.onTaskAdded();
  }

  newTask.value = {
    title: "",
    category: "",
    deadline: null,
  };
};
</script>
