import { supabase } from "./lib/supabase";

const testConnection = async () => {
  console.log("🔄 Проверяем подключение к Supabase...");

  const { data, error } = await supabase
    .from("tasks")
    .select("count", { count: "exact", head: true });

  if (error) {
    console.error("❌ Ошибка:", error.message);
  } else {
    console.log("✅ Подключение работает!");
  }
};

testConnection();
