<template>
  <div id="app">
    <van-nav-bar title="家具" left-arrow @click-left="onClickLeft" />

    <van-dropdown-menu>
      <van-dropdown-item v-model="value" :options="option" />
      <van-dropdown-item title="筛选" ref="item">
        <van-cell center title="xxx">
          <template #right-icon> sss </template>
        </van-cell>
        <van-cell center title="xxxx">
          <template #right-icon> ssss </template>
        </van-cell>
        <div style="padding: 5px 16px">ssss</div>
      </van-dropdown-item>
    </van-dropdown-menu>

    <div class="split"></div>

    <van-grid :column-num="5" clickable gutter="6" square>
      <van-grid-item
        v-for="value in 200"
        :key="value"
        :icon="furniture_1"
        @click="showDetail"
      />
    </van-grid>

    <van-dialog
      v-model="show"
      confirmButtonText="制作家具"
      :closeOnClickOverlay="true"
    >
      <div style="position: relative">
        <van-image
          width="100%"
          height="200"
          fit="cover"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <p
          style="
            color: azure;
            width: 100%;
            text-indent: 16px;
            line-height: 32px;
            position: absolute;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            margin: 0;
          "
        >
          床 · 轩辕
        </p>
      </div>
      <van-cell
        :border="false"
        value="棉麻质地的沙发椅，依稀能感到秋意。至于上面的抓痕，克拉拉说她并不知情。"
      />
      <van-cell :border="false" title="[属性奖励]" />
      <van-cell
        :border="false"
        value="制作床 · 轩辕，生命上限 +20、物理攻击 +1"
      />
    </van-dialog>

    <div class="split"></div>
  </div>
</template>

<script>
import { Dialog } from "vant";

export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted() {},
  methods: {
    showDetail() {
      this.$data.show = true;
    },
    onClickLeft() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    onConfirm() {
      this.$refs.item.toggle();
    },
  },
  data() {
    return {
      furniture_1: require("@/assets/furniture_1.png"),
      show: false,
      value: 0,
      option: [
        { text: "所有家具", value: 0 },
        { text: "xxxx家具", value: 1 },
        { text: "xxxx家具", value: 2 },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.copyright {
  background: rgba(0, 0, 0, 0);
  color: #fff;
  padding-bottom: 1.4rem;
}
.split {
  margin-bottom: 0.8rem;
}
.bg {
  height: 8.6rem;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
