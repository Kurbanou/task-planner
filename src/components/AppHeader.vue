<template>
  <el-header>
    <div class="header-content">
      <h1>Task Manager</h1>

      <div class="header-actions">
        <!-- Кнопка добавления задачи в шапке -->
        <el-button
          type="primary"
          :icon="Plus"
          circle
          size="default"
          @click="$emit('addTask')"
          title="Add new task"
        />

        <!-- Информация о пользователе и выход -->
        <div v-if="user" class="user-info">
          <el-text class="user-email">{{ user.email }}</el-text>
          <el-button type="danger" size="small" @click="$emit('logout')" :icon="SwitchButton">
            Logout
          </el-button>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script setup>
import { Plus, SwitchButton } from "@element-plus/icons-vue";

defineProps({
  user: Object,
});

defineEmits(["logout", "addTask"]);
</script>

<style scoped>
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-email {
  font-size: 14px;
  color: var(--el-text-color-regular);
}

@media (max-width: 768px) {
  .user-email {
    display: none; /* скрываем email на мобильных */
  }
}
</style>
