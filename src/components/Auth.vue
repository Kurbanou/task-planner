<template>
  <div class="auth-container">
    <el-card class="auth-card">
      <template #header>
        <h2>{{ isLogin ? "Sign In" : "Sign Up" }}</h2>
      </template>

      <el-form @submit.prevent="handleSubmit">
        <el-form-item>
          <el-input
            v-model="email"
            placeholder="Email"
            type="email"
            size="large"
            :prefix-icon="User"
          />
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="password"
            placeholder="Password"
            type="password"
            size="large"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            size="large"
            :loading="loading"
            class="submit-btn"
          >
            {{ isLogin ? "Sign In" : "Sign Up" }}
          </el-button>
        </el-form-item>
      </el-form>

      <div class="auth-footer">
        <el-button link @click="toggleMode">
          {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
        </el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { useAuth } from "../composables/useAuth";

const { signIn, signUp, loading } = useAuth();

const email = ref("");
const password = ref("");
const isLogin = ref(true);

const toggleMode = () => {
  isLogin.value = !isLogin.value;
};

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    ElMessage.warning("Заполните все поля");
    return;
  }

  if (isLogin.value) {
    await signIn(email.value, password.value);
  } else {
    await signUp(email.value, password.value);
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.auth-card {
  width: 100%;
  max-width: 400px;
}

.submit-btn {
  width: 100%;
}

.auth-footer {
  text-align: center;
  margin-top: 16px;
}
</style>
