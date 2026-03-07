import { createApp } from "vue";
import App from "./App.vue";

// Импортируем Element Plus и его CSS
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// Создаем приложение и подключаем Element Plus
const app = createApp(App);
app.use(ElementPlus);
app.mount("#app");
