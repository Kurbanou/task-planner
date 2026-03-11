import { ref, computed } from "vue";
import { supabase } from "../lib/supabase";
import { ElMessage } from "element-plus";

export function useAuth() {
  const user = ref(null);
  const loading = ref(false);

  // Проверяем текущую сессию при загрузке
  const initAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    user.value = session?.user ?? null;

    // Слушаем изменения авторизации
    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null;
    });
  };

  // Вход
  const signIn = async (email, password) => {
    try {
      loading.value = true;
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      ElMessage.success("Добро пожаловать!");
    } catch (error) {
      ElMessage.error(error.message);
    } finally {
      loading.value = false;
    }
  };

  // Регистрация
  const signUp = async (email, password) => {
    try {
      loading.value = true;
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      ElMessage.success("Проверьте почту для подтверждения");
    } catch (error) {
      ElMessage.error(error.message);
    } finally {
      loading.value = false;
    }
  };

  // Выход
  const signOut = async () => {
    try {
      loading.value = true;
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      ElMessage.error(error.message);
    } finally {
      loading.value = false;
    }
  };

  const isAuthenticated = computed(() => !!user.value);

  return {
    user,
    loading,
    isAuthenticated,
    initAuth,
    signIn,
    signUp,
    signOut,
  };
}
