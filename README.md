# 📋 Task Manager

A simple and elegant task management application built with **Vue 3** and **Element Plus**.
Organize your daily tasks with priorities and categories in a beautiful interface.

![Vue](https://img.shields.io/badge/Vue-3.x-brightgreen)
![Element Plus](https://img.shields.io/badge/Element%20Plus-latest-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- ✅ **Create Tasks** — Add new tasks with title, priority (high/medium/low), and category
- ✅ **Track Progress** — Mark tasks as completed with interactive checkboxes
- ✅ **Smart Filtering** — Filter tasks by status (All / Active / Completed)
- ✅ **Visual Priority** — Color-coded tags for different priority levels
- ✅ **Task Statistics** — Real-time counters for total, completed, and active tasks
- ✅ **Responsive Design** — Works perfectly on desktop, tablet, and mobile
- ✅ **Auto-save** — Tasks are automatically saved to localStorage (coming soon)

## 🚀 Live Demo

[View Live Demo](https://your-demo-link.com) — _Coming soon_

## 📸 Screenshots

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **UI Library**: Element Plus
- **Icons**: @element-plus/icons-vue
- **Build Tool**: Vite
- **Package Manager**: npm / yarn

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-planner.git
   cd task-planner
   ```

## Install dependencies

```bash
npm install
# or
yarn install
```

## Run development server

```bash
npm run dev
# or
yarn dev
```

## Build for production

```bash
npm run build
# or
yarn build
```

# ELEMENT +

## Links

```html
<!-- Базовые цвета -->
<el-link href="https://example.com">Обычная ссылка</el-link>
<el-link type="primary">Основная ссылка</el-link>
<el-link type="success">Успех</el-link>
<el-link type="warning">Предупреждение</el-link>
<el-link type="danger">Опасность</el-link>
<el-link type="info">Информация</el-link>

<!-- Управление подчеркиванием -->
<el-link :underline="false">Без подчеркивания</el-link>
<el-link underline="always">Всегда подчеркнута</el-link>
<el-link underline="hover">Только при наведении</el-link>

<!-- Отключенная ссылка -->
<el-link disabled>Неактивная ссылка</el-link>

<!-- С иконкой -->
<el-link :icon="Edit">Редактировать</el-link>
```

## Разметка

```xml
<!--Базовая структура-->
<el-row :gutter="20" justify="center">
  <el-col :span="8">колонка 1 (33.3%)</el-col>
  <el-col :span="8">колонка 2 (33.3%)</el-col>
  <el-col :span="8">колонка 3 (33.3%)</el-col>
</el-row>
<!-- justify="center" выравнивание  :gutter="20" отступы gap-->

<!--Таблица значений span ширина использование
24	100%	вся ширина
12	50%	половина
8	33.3%	треть
6	25%	четверть
4	16.6%	одна шестая
3	12.5%	одна восьмая
2	8.33%	мелкие детали
1	4.16%	минимальная единица-->
```

### Адаптивный контент

```html
<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4"> </el-col>
```

Breakpoints (точки перелома):

- xs мобильные < 768px
- sm планшеты ≥ 768px
- md маленькие десктопы ≥ 992px
- lg десктопы ≥ 1200px
- xl большие десктопы ≥ 1920px

## Tags (Теги) в Element Plus

```html
<!-- Базовые цвета -->
<el-tag>Обычный тег</el-tag>
<el-tag type="primary">Primary</el-tag>
<el-tag type="success">Success</el-tag>
<el-tag type="warning">Warning</el-tag>
<el-tag type="danger">Danger</el-tag>
<el-tag type="info">Info</el-tag>
```

- Обычный тег — серый фон
- primary — синий
- success — зеленый
- warning — желтый
- danger — красный
- info — светло-серый

## Icon

https://element-plus.org/en-US/component/icon.html

### Installation

```bash
$ npm install @element-plus/icons-vue


# main.js
import { createApp } from "vue";
import App from "./App.vue";

// Импортируем Element Plus и его CSS
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// Создаем приложение и подключаем Element Plus
const app = createApp(App);
app.use(ElementPlus);

// Регистрируем все иконки глобально
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
```

### Пример использования

```html
<!-- Use el-icon to provide attributes to SVG icon -->
<template>
  <div>
    <el-icon :size="size" :color="color">
      <Edit />
    </el-icon>
    <!-- Or use it independently without derive attributes from parent -->
    <Edit />
  </div>
</template>
```
