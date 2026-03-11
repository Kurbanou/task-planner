<template>
  <div class="container">
    <app-header :user="user" @logout="signOut" @addTask="dialogVisible = true" />

    <main>
      <Auth v-if="!isAuthenticated" />

      <template v-else>
        <!-- Диалог с формой -->
        <el-dialog
          v-model="dialogVisible"
          title="Create New Task"
          width="400px"
          destroy-on-close
          class="styled-dialog"
          :close-on-click-modal="false"
          :show-close="true"
        >
          <TaskForm :onTaskAdded="handleTaskAdded" />
        </el-dialog>

        <!-- Показываем загрузку -->
        <div v-if="tasksLoading" class="loading">
          <el-skeleton :rows="3" animated />
        </div>

        <!-- Список задач -->
        <el-row :gutter="20" v-else-if="tasks?.length" class="tasks-row">
          <el-col
            :span="24"
            v-for="task in sortedByDeadline"
            :key="task.id"
            :class="{ completed: task.completed }"
            class="task-col"
          >
            <el-checkbox :model-value="task.completed" @change="toggleComplete(task)" />
            <span class="task-title">{{ task.title }}</span>
            <el-tag :type="getCurrentPriority(task.deadline)" size="small">
              {{ getPriorityLabel(task.deadline) }}
            </el-tag>
            <el-button
              type="danger"
              :icon="Delete"
              circle
              size="small"
              @click="deleteTask(task.id)"
              class="delete-btn"
            />
          </el-col>
        </el-row>

        <el-empty v-else description="No tasks yet" />
      </template>
    </main>

    <app-footer />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { Delete } from "@element-plus/icons-vue";
import { useAuth } from "./composables/useAuth";
import { useTasks } from "./composables/useTasks";
import Auth from "./components/Auth.vue";
import TaskForm from "./components/TaskForm.vue"; // <-- импортируем форму
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

console.log("🟦 App.vue: создается useTasks");
const tasksTest = useTasks();

console.log("🟦 App.vue tasksTest ID:", tasksTest.tasks._rawValue?.length);

const { user, isAuthenticated, signOut, initAuth } = useAuth();
const { tasks, loading: tasksLoading, loadTasks, toggleComplete, deleteTask } = useTasks();
watch(
  tasks,
  (newVal) => {
    console.log("👀 App.vue WATCH: tasks изменился!", newVal?.length);
  },
  { deep: true, immediate: true },
);
onMounted(() => {
  initAuth();
});

// Загружаем задачи при авторизации
watch(
  isAuthenticated,
  async (newVal) => {
    if (newVal) {
      await loadTasks();
    }
  },
  { immediate: true },
);

// Функции для работы с датами
const getDaysDiff = (deadline) => {
  if (!deadline) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  const diffTime = deadlineDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const getCurrentPriority = (deadline) => {
  const daysDiff = getDaysDiff(deadline);
  if (daysDiff === null) return "info";
  if (daysDiff < 0) return "danger";
  if (daysDiff === 0) return "danger";
  if (daysDiff === 1) return "warning";
  if (daysDiff <= 7) return "primary";
  return "info";
};

const getPriorityLabel = (deadline) => {
  const daysDiff = getDaysDiff(deadline);
  if (daysDiff === null) return "No deadline";
  if (daysDiff < 0) return "Overdue!";
  if (daysDiff === 0) return "Today";
  if (daysDiff === 1) return "Tomorrow";
  if (daysDiff <= 7) return `${daysDiff} days left`;
  return `${daysDiff} days left`;
};

// Сортировка по дедлайну
const sortedByDeadline = computed(() => {
  return [...tasks.value].sort((a, b) => {
    const daysA = getDaysDiff(a.deadline) ?? Infinity;
    const daysB = getDaysDiff(b.deadline) ?? Infinity;
    return daysA - daysB;
  });
});

const dialogVisible = ref(false);

const handleTaskAdded = async () => {
  await loadTasks();
  dialogVisible.value = false; // закрываем диалог после добавления
};
</script>

<style>
/* Глобальные стили */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #f5f7fa;
}

.container {
  min-height: 100vh;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
}
main {
  flex-grow: 1;
}

a {
  color: blue;
}

@media (max-width: 500px) {
  .container {
    padding: 0 10px;
  }
}
</style>

<style scoped>
.add-button-container {
  margin-bottom: 24px;
  display: flex;
  justify-content: flex-end;
}
.task-form {
  margin-bottom: 24px;
}

.tasks-row {
  margin-top: 20px;
}

.task-col {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: var(--el-fill-color-light);
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.3s;
}

.task-col:hover {
  background-color: var(--el-fill-color);
}

.task-col.completed {
  opacity: 0.7;
}

.task-col.completed .task-title {
  text-decoration: line-through;
  color: var(--el-text-color-secondary);
}

.task-title {
  flex: 1;
}

.delete-btn {
  opacity: 0;
  transition: opacity 0.3s;
}

.task-col:hover .delete-btn {
  opacity: 1;
}

.loading {
  padding: 40px;
}
/* Стили для диалога */
:deep(.styled-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

:deep(.styled-dialog .el-dialog__header) {
  background: linear-gradient(135deg, #409eff 0%, #79bbff 100%);
  color: white;
  margin: 0;
  padding: 20px;
  text-align: center;
}

:deep(.styled-dialog .el-dialog__title) {
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
}

:deep(.styled-dialog .el-dialog__headerbtn) {
  top: 20px;
  right: 20px;
}

:deep(.styled-dialog .el-dialog__headerbtn .el-dialog__close) {
  color: white;
  font-size: 18px;
}

:deep(.styled-dialog .el-dialog__headerbtn:hover .el-dialog__close) {
  color: rgba(255, 255, 255, 0.8);
  transform: scale(1.1);
}

:deep(.styled-dialog .el-dialog__body) {
  padding: 30px 24px;
  background-color: #ffffff;
}

:deep(.styled-dialog .task-form) {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

:deep(.styled-dialog .el-button--primary) {
  width: 100%;
  margin-top: 8px;
  height: 40px;
  font-weight: 500;
  border-radius: 20px;
}

/* Анимация появления */
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: all 0.3s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
