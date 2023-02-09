<template>
  <van-form class="form" @submit="onSubmit">
    <div class="title">
      <h2>欢迎登录</h2>
    </div>

    <van-cell-group inset>
      <van-field
        v-model="account"
        name="账户"
        placeholder="账户"
        :rules="[{ required: true, message: '请填写账户' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>

    <div style="margin: 30px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>

    <div class="tip">可使用账号：000001、000002、0000003 密码均为 666666</div>
  </van-form>
</template>

<script lang="ts" setup>
import { useSocketStore } from "@/stores/socket";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

const account = ref("000001");
const password = ref("666666");
const userStore = useUserStore();
const router = useRouter();
const socket = useSocketStore();

const onSubmit = (values: any) => {
  userStore
    .login({
      account: account.value,
      password: password.value,
    })
    .then(() => {
      router.push("/");
      socket.connect();
      socket.initData();
    });
};
</script>

<style scoped>
.title {
  padding-top: 60px;
  text-align: center;
  margin-bottom: 30px;
}

.tip {
  padding: 0 30px;
  color: #666;
}
</style>
