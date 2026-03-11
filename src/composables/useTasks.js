import { ref } from "vue";
import { supabase } from "../lib/supabase";
import { ElMessage } from "element-plus";

let instance = null; // <-- синглтон

export function useTasks() {
  // Если экземпляр уже есть, возвращаем его
  if (instance) {
    return instance;
  }

  const tasks = ref([]);
  const loading = ref(false);

  // Загрузить задачи текущего пользователя
  const loadTasks = async () => {
    try {
      loading.value = true;

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      tasks.value = data || [];
    } catch (error) {
      ElMessage.error("Ошибка загрузки задач: " + error.message);
    } finally {
      loading.value = false;
    }
  };

  // Добавить задачу
  const addTask = async (taskData) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Не авторизован");

      const { data, error } = await supabase
        .from("tasks")
        .insert([
          {
            ...taskData,
            user_id: user.id,
            completed: false,
          },
        ])
        .select();

      if (error) throw error;

      if (data) {
        tasks.value = [data[0], ...tasks.value];
        console.log("🔥 addTask: tasks.value ОБНОВЛЕН, новая длина:", tasks.value.length);
        console.log("🔥 addTask: первый элемент:", tasks.value[0]);
        ElMessage.success("Задача добавлена");
      }
    } catch (error) {
      ElMessage.error("Ошибка: " + error.message);
    }
  };

  // Обновить задачу
  const updateTask = async (id, updates) => {
    try {
      const { error } = await supabase.from("tasks").update(updates).eq("id", id);

      if (error) throw error;

      tasks.value = tasks.value.map((t) => (t.id === id ? { ...t, ...updates } : t));
    } catch (error) {
      ElMessage.error("Ошибка обновления: " + error.message);
    }
  };

  // Удалить задачу
  const deleteTask = async (id) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);

      if (error) throw error;

      tasks.value = tasks.value.filter((t) => t.id !== id);
      ElMessage.success("Задача удалена");
    } catch (error) {
      ElMessage.error("Ошибка удаления: " + error.message);
    }
  };

  // Переключить статус выполнения
  const toggleComplete = async (task) => {
    await updateTask(task.id, { completed: !task.completed });
  };

  return {
    tasks,
    loading,
    loadTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
  };
}
