<template>
  <footer class="app-footer">
    <el-row :gutter="20">
      <!-- Левая колонка: название -->
      <el-col :md="3" :sm="8"> Task Manager </el-col>

      <!-- Центральная колонка: разработчик -->
      <el-col :md="15" :sm="8">
        <User :width="18" :height="18" />
        <span>Разработчик:</span> <strong>Kurbanou Farid</strong>
      </el-col>

      <!-- Правая колонка: GitHub и версия -->
      <el-col :md="3" :sm="8">
        <el-link
          href="https://github.com/Kurbanou"
          target="_blank"
          rel="noopener noreferrer"
          class="github-link"
          title="GitHub"
          underline="never"
        >
          <icon-github :width="18" :height="18" />
        </el-link>

        <el-divider direction="vertical" />

        <el-tag size="small" color="#c6e2ff" type="info">v1.0.0</el-tag>
      </el-col>
    </el-row>
  </footer>
</template>

<script setup>
import IconGithub from "./icons/IconGithub.vue";
</script>

<style scoped>
.app-footer {
  margin-top: 40px;
  padding: 20px 0;
  border-top: 1px solid var(--el-border-color-light);
  user-select: none;
}

footer .el-row {
  row-gap: 10px;
}

footer .el-col {
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 5px;
}
.el-tag {
  color: var(--el-color-primary);
}
footer a {
  display: flex;
  align-items: center;
}
</style>
