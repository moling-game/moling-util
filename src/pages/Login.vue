<template>
  <div id="app">
    <van-field readonly name="picker" value="魔灵召唤工具箱" @click="showPicker = true" input-align="center" class="choose"
      is-link arrow-direction="down" />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>
    <van-button class="start" plain color="#7232dd" @click="showPopup">登录</van-button>

    <van-popup v-model="show">
      <van-form @submit="onSubmit">
        <van-field v-model="username" name="账号" label="账号" placeholder="账号" />
        <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted() { },
  methods: {
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    onSubmit(values) {
      console.log("submit", values);
      this.toMain();
    },
    showPopup() {
      this.show = true;
    },
    toMain() {
      this.$router.push("/");
    },
  },
  data() {
    return {
      show: false,
      username: "",
      password: "",
      value: "",
      columns: ["魔灵召唤工具箱"],
      showPicker: false,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  /* background: url("~@/assets/login_1.jpg") center center no-repeat; */
  background-size: 230% 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.choose {
  background-color: rgba(255, 255, 255, 0.8);
}

.start {
  background-color: rgba(255, 255, 255, 0.9);
  top: 62%;
  width: 50%;
  left: 25%;
}
</style>
