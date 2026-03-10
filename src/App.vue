<template>
  <div class="container">
    <app-header />
    <main>
      <div v-if="!tasks"><!--empty--></div>
    </main>
    <app-footer />
  </div>
</template>

<script setup>
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";

// const tasks = ref([
//   {
//     id: 1,
//     title: "Изучить Vue 3",
//     completed: false,
//     priority: "high",
//     category: "Обучение",
//   },
//   {
//     id: 2,
//     title: "Сделать проект с Element Plus",
//     completed: true,
//     priority: "medium",
//     category: "Работа",
//   },
//   {
//     id: 3,
//     title: "Купить продукты",
//     completed: false,
//     priority: "low",
//     category: "Личное",
//   },
//   {
//     id: 4,
//     title: "Позвонить жене",
//     completed: false,
//     priority: "high",
//     category: "Личное",
//   },
// ]);
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
