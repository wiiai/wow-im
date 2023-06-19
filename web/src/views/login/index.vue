<template>
  <div class="container">
    <v-card class="v-card mx-auto px-6 py-8" max-width="400">
      <div class="title2">
        <h2>友友IM</h2>
      </div>
      <v-text-field
        v-model="account"
        :readonly="loading"
        class="mb-2"
        clearable
        persistent-hint
        color="primary"
        label="账户"
        variant="solo"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :readonly="loading"
        class="mb-2"
        clearable
        persistent-hint
        color="primary"
        label="密码"
        variant="solo"
      ></v-text-field>

      <v-btn
        :onclick="onSubmit"
        :disabled="!password || !account"
        :loading="loading"
        block
        color="success"
        size="large"
        type="submit"
        variant="elevated"
      >
        立即登录
      </v-btn>
      <div class="tip">可使用账号：000001、000002、0000003 密码均为 666666</div>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { useSocketStore } from "@/stores/socket";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

const account = ref("");
const password = ref("");
const loading = ref(false);
const userStore = useUserStore();
const router = useRouter();
const socket = useSocketStore();

const onSubmit = (values: any) => {
  if (!password.value || !account.value) {
    return;
  }

  loading.value = true;
  userStore
    .login({
      account: account.value,
      password: password.value,
    })
    .then(() => {
      loading.value = false;
      socket.connect();
      socket.initData();
      router.push("/");
    });
};
</script>

<style scoped>
.form {
  width: 600px;
  margin: 0 auto;
  margin-top: 10%;
}

.v-card {
  margin-top: -5%;
  box-shadow: 1px 1px 10px #ccc;
}

.title {
  padding-top: 60px;
  text-align: center;
  margin-bottom: 30px;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  height: 100vh;
  background-color: #fff;
  background: url(../../assets/img/bg.svg);
}

.tip {
  margin-top: 16px;
  color: #666;
}

.title2 {
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
}
</style>
