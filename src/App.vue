<template>
  <el-container>
    <el-radio-group v-model="radio1">
      <!-- works when >=2.6.0, recommended ✔️ not work when <2.6.0 ❌ -->
      <el-radio value="Value 1">Option 1</el-radio>
      <!-- works when <2.6.0, deprecated act as value when >=3.0.0 -->
      <el-radio label="Label 2 & Value 2">Option 2</el-radio>
    </el-radio-group>
    <el-header>
      <h1>Мой Планировщик Задач</h1>
    </el-header>

    <el-main>
      <!-- Секция со статистикой -->
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="8">
          <el-card shadow="hover">
            <div class="stat-item">
              <div class="stat-label">Всего задач</div>
              <div class="stat-value">{{ tasks.length }}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div class="stat-item">
              <div class="stat-label">Выполнено</div>
              <div class="stat-value">{{ completedCount }}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div class="stat-item">
              <div class="stat-label">Осталось</div>
              <div class="stat-value">{{ activeCount }}</div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- Список задач -->
      <el-card class="tasks-card">
        <template #header>
          <div class="card-header">
            <span>Список задач</span>
            <el-tag type="info" size="small">{{ tasks.length }} задач</el-tag>
          </div>
        </template>

        <!-- Проверяем, есть ли задачи -->
        <div v-if="tasks.length === 0" class="empty-tasks">
          <el-empty description="Задач пока нет" />
        </div>

        <!-- Отображаем задачи -->
        <div v-else class="task-list">
          <div
            v-for="task in tasks"
            :key="task.id"
            class="task-item"
            :class="{ 'task-completed': task.completed }"
          >
            <el-row :gutter="16" align="middle">
              <el-col :span="1">
                <el-checkbox v-model="task.completed" />
              </el-col>
              <el-col :span="10">
                <span class="task-title">{{ task.title }}</span>
              </el-col>
              <el-col :span="4">
                <el-tag :type="getPriorityType(task.priority)" size="small" effect="plain">
                  {{ task.priority }}
                </el-tag>
              </el-col>
              <el-col :span="4">
                <el-tag size="small" type="info" effect="plain">
                  {{ task.category }}
                </el-tag>
              </el-col>
              <el-col :span="3" :offset="2">
                <el-button
                  type="danger"
                  :icon="Delete"
                  circle
                  size="small"
                  @click="deleteTask(task.id)"
                />
              </el-col>
            </el-row>
          </div>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, computed } from "vue";

import { Delete } from "@element-plus/icons-vue"; // импортируем иконку
const tasks = ref([
  {
    id: 1,
    title: "Изучить Vue 3",
    completed: false,
    priority: "high",
    category: "Обучение",
  },
  {
    id: 2,
    title: "Сделать проект с Element Plus",
    completed: true,
    priority: "medium",
    category: "Работа",
  },
  {
    id: 3,
    title: "Купить продукты",
    completed: false,
    priority: "low",
    category: "Личное",
  },
  {
    id: 4,
    title: "Позвонить жене",
    completed: false,
    priority: "high",
    category: "Личное",
  },
]);

// Вычисляемые свойства для статистики
const completedCount = computed(() => {
  return tasks.value.filter((task) => task.completed).length;
});
const activeCount = computed(() => {
  return tasks.value.filter((task) => !task.completed).length;
});

// Метод для определения типа тега приоритета
const getPriorityType = (priority) => {
  switch (priority) {
    case "high":
      return "danger";
    case "medium":
      return "warning";
    case "low":
      return "info";
    default:
      return "info";
  }
};

// Метод удаления задачи (пока просто заглушка)
const deleteTask = (id) => {
  console.log("Удалить задачу с id:", id);
  // Позже добавим реальное удаление
};
</script>

<style>
/* Глобальные стили */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #f5f7fa;
}

.el-header {
  background-color: #409eff;
  color: white;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.el-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.el-main {
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
}

/* Статистика */
.stat-item {
  text-align: center;
  padding: 10px;
}

.stat-label {
  font-size: 0.9rem;
  color: #909399;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #303133;
}

/* Карточка с задачами */
.tasks-card {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Список задач */
.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-item {
  padding: 12px;
  border-radius: 8px;
  background-color: #f8f9fa;
  transition: all 0.3s;
}

.task-item:hover {
  background-color: #ecf5ff;
}

.task-item.task-completed {
  opacity: 0.7;
  background-color: #f0f2f5;
}

.task-item.task-completed .task-title {
  text-decoration: line-through;
  color: #909399;
}

.task-title {
  font-size: 1rem;
  color: #303133;
}

/* Пустой список */
.empty-tasks {
  padding: 40px 0;
}
</style>
