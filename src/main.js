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
