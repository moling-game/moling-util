<template>
  <div id="app">
    <van-nav-bar title="MVP/MINI" left-arrow @click-left="onClickLeft" />
    <van-grid :column-num="1" clickable direction="horizontal">
      <van-grid-item icon="photo-o" text="加入战斗" />
    </van-grid>

    <van-image
      width="100%"
      height="400"
      fit="cover"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
    />

    <van-grid square :column-num="6" icon-size="48">
      <van-grid-item :icon="skill_火箭术" />
      <van-grid-item icon="photo-o" />
      <van-grid-item icon="photo-o" />
      <van-grid-item icon="photo-o" />
      <van-grid-item icon="photo-o" />
      <van-grid-item icon="photo-o" />
    </van-grid>

    <van-divider>战况</van-divider>
    <van-cell :border="false" title="我造成伤害" value="333.0M" />
    <van-cell :border="false" title="我吸引仇恨" value="132.0s" />
    <van-cell :border="false" title="我参与治疗" value="13,111" />
    <van-cell :border="false" title="复活时长" value="43.0s" />

    <van-divider>战利品</van-divider>
    <van-grid :column-num="6" :border="false">
      <van-grid-item :icon="item_1" badge="13+" />
      <van-grid-item icon="photo-o" />
      <van-grid-item icon="photo-o" />
      <van-grid-item icon="photo-o" />
      <van-grid-item icon="photo-o" />
      <van-grid-item icon="photo-o" />
    </van-grid>
    <van-cell :border="false" title="金币 230,112" />
    <van-cell :border="false" title="BaseExp 230,112" />
    <van-cell :border="false" title="JobExp 230,112" />

    <van-divider>战报</van-divider>
    <van-cell :border="false" title="参战人数" value="13,111" />
    <van-cell :border="false" title="综合排行" value="No.33" />
    <van-cell :border="false" title="MVP" value="zhuzhu" />

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
    onClickLeft() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    goCat() {
      this.$data.catStep = true;
      this.$data.detailStep = false;
    },
    goDetail() {
      this.$data.catStep = false;
      this.$data.detailStep = true;
    },
    onConfirm(values) {
      this.value = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      this.showArea = false;
    },
  },
  data() {
    return {
      checked: false,
      checkeds: [false, false, false, false, false],
      value: "",
      showArea: false,
      areaList: {
        province_list: {
          100000: "米德加尔特大陆",
          110000: "未知领域",
        },
        city_list: {
          100100: "普隆德拉区域",
          100200: "依斯鲁得岛区域",
          100300: "吉芬区域",
          100400: "梦罗克区域",
        },
        county_list: {
          100101: "普隆德拉",
          100102: "普隆德拉南门",
          100201: "依斯鲁得岛",
          100301: "吉芬",
          100401: "梦罗克",
        },
      },
      item_1: require("@/assets/item_1.png"),
      m_波利: require("@/assets/m_波利.png"),
      skill_火箭术: require("@/assets/skill_1.png"),
      activeNames: ["1"],
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
