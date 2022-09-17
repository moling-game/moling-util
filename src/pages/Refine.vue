<template>
  <div id="app">
    <van-nav-bar title="精炼" left-arrow @click-left="onClickLeft" />
    <van-grid :column-num="3" clickable direction="horizontal">
      <van-grid-item icon="photo-o" text="精炼" />
      <van-grid-item icon="photo-o" text="强化" />
      <van-grid-item icon="photo-o" text="萃取" />
    </van-grid>

    <van-image
      width="100%"
      height="200"
      fit="cover"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
    />

    <van-grid :column-num="5" clickable gutter="6" square>
      <van-grid-item
        v-for="value in 200"
        :key="value"
        :icon="item_1"
        @click="showDetail"
      />
    </van-grid>

    <van-dialog
      v-model="show"
      confirmButtonText="精炼"
      :closeOnClickOverlay="true"
    >
      <van-card desc="类型： 副手-盾牌">
        <template #title>
          <h3>+15 噩梦原典</h3>
        </template>
        <template #thumb>
          <van-image width="80" height="80" fit="cover" :src="item_1" />
        </template>
      </van-card>
      <van-cell :border="false" title="* 精炼等级">
        <template #default>
          <van-row>
            <van-col span="7">+1</van-col>
            <van-col span="4">-></van-col>
            <van-col span="10">+2</van-col>
          </van-row>
        </template>
      </van-cell>
      <van-cell title="* 精炼物免">
        <template #default>
          <van-row>
            <van-col span="7">+0.9%</van-col>
            <van-col span="4">-></van-col>
            <van-col span="10">+1.8%</van-col>
          </van-row>
        </template>
      </van-cell>
      <van-cell :border="false" value="所需消耗:" />
      <van-grid :column-num="5" icon-size="22px">
        <van-grid-item icon="photo-o" text="407/1" />
      </van-grid>
      <p style="text-align: center">消耗: 20000</p>
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
  },
  data() {
    return {
      item_1: require("@/assets/item_1.png"),
      show: false,
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
