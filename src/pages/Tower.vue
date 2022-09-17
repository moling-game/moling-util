<template>
  <div id="app">
    <van-nav-bar title="爬塔" left-arrow @click-left="onClickLeft" />
    <van-grid :column-num="2" clickable>
      <van-grid-item dot icon="photo-o" text="收益" />
      <van-grid-item icon="photo-o" text="停止爬塔" />
    </van-grid>

    <van-collapse v-model="activeNames">
      <van-collapse-item name="1">
        <template #title>
          <van-cell :border="false" center>
            <template #title>
              <h2>2F</h2>
            </template>
            <template #default>
              <h3>00:02:13</h3>
            </template>
            <template #icon>
              <van-icon size="40" :name="m" style="margin-right: 8px" />
            </template>
          </van-cell>
        </template>
        <van-cell title="MVP/MINI" />
        <van-grid direction="horizontal" :column-num="3">
          <van-grid-item :icon="m" text="波利" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
        </van-grid>
        <van-cell title="战利品" />
        <van-grid :column-num="6">
          <van-grid-item :icon="item_1" badge="13+" />
          <van-grid-item icon="photo-o" />
          <van-grid-item icon="photo-o" />
          <van-grid-item icon="photo-o" />
          <van-grid-item icon="photo-o" />
          <van-grid-item icon="photo-o" />
        </van-grid>
        <van-cell title="结算时间" value="2030-11-31 23:21:22" />
      </van-collapse-item>
      <van-collapse-item name="2">
        <template #title>
          <van-cell :border="false" center>
            <template #title>
              <h2>1F</h2>
            </template>
            <template #default>
              <h3>00:02:13</h3>
            </template>
            <template #icon>
              <van-icon size="40" :name="m" style="margin-right: 8px" />
            </template>
          </van-cell>
        </template>
        内容
      </van-collapse-item>
    </van-collapse>

    <div class="split"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted() {},
  methods: {
    onClickLeft() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
  data() {
    return {
      activeNames: [],
      m: require("../assets/m_波利.png"),
      item_1: require("../assets/item_1.png"),
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
