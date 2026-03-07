<template>
  <el-header>
    <h1>Мой планировщик задач</h1>
  </el-header>
  <el-main>
    <el-alert> title="Проект запущен" type="success" :closadle="false" show-icon </el-alert>
  </el-main>
</template>

<script setup></script>

<style scoped>
/* Базовые стили */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
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
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}
</style>
