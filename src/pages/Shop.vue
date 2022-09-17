<template>
  <div id="app">
    <van-nav-bar title="商人" left-arrow @click-left="onClickLeft" />
    <van-grid :column-num="3" clickable direction="horizontal">
      <van-grid-item icon="photo-o" text="武器商人" />
      <van-grid-item icon="photo-o" text="防具商人" />
      <van-grid-item icon="photo-o" text="头饰商人" />
      <van-grid-item icon="photo-o" text="料理商人" />
      <van-grid-item icon="photo-o" text="道具商人" />
      <van-grid-item icon="photo-o" text="符文商人" />
    </van-grid>

    <van-field
      readonly
      clickable
      name="area"
      :value="value"
      label="筛选"
      placeholder="点击选择分类"
      @click="showArea = true"
    />
    <van-popup v-model="showArea" position="top" round>
      <van-area
        :area-list="areaList"
        @confirm="onConfirm"
        @cancel="showArea = false"
        :columns-num="2"
      />
    </van-popup>

    <van-grid :column-num="2" clickable direction="horizontal">
      <van-grid-item v-for="value in 20" :key="value">
        <template #default>
          <van-cell center>
            <template #label>
              单价
              <van-tag round color="rgb(229,236,243)" text-color="#000"
                >2,634,002&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</van-tag
              >
            </template>
            <template #title> 盗贼之衣 </template>
            <template #right-icon>
              <van-icon size="32" :name="item_1" />
            </template>
          </van-cell>
        </template>
      </van-grid-item>
    </van-grid>

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
      value: "",
      showArea: false,
      areaList: {
        province_list: {
          100000: "装备",
          110000: "材料",
          120000: "图纸",
          130000: "头饰",
          140000: "坐骑",
        },
        city_list: {
          100001: "武器",
          100002: "副手",
          100003: "盔甲",
        },
      }, // 数据格式见 Area 组件文档
      item_1: require("@/assets/item_1.png"),
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
