<template>
  <div id="app">
    <van-nav-bar title="火圈" left-arrow @click-left="onClickLeft" />
    <van-cell-group title="满级基础属性">
      <van-cell>
        <template #default>
          <van-col span="6"><span>属性</span></van-col>
          <van-col span="6"><span>火属性</span></van-col>
          <van-col span="6"><span>类型</span></van-col>
          <van-col span="6"><span>攻击型</span></van-col>
        </template>
      </van-cell>
      <van-cell>
        <template #default>
          <van-col span="6"><span>体力</span></van-col>
          <van-col span="6"><span>10872</span></van-col>
          <van-col span="6"><span>速度</span></van-col>
          <van-col span="6"><span>103</span></van-col>
        </template>
      </van-cell>
      <van-cell>
        <template #default>
          <van-col span="6"><span>攻击力</span></van-col>
          <van-col span="6"><span>765</span></van-col>
          <van-col span="6"><span>防御力</span></van-col>
          <van-col span="6"><span>455</span></van-col>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="AI推测">
      <van-cell>
        <template #default>
          <van-col span="6"><span>PVE魔灵</span></van-col>
          <van-col span="6"><span>是</span></van-col>
          <van-col span="6"><span>PVP魔灵</span></van-col>
          <van-col span="6"><span>是</span></van-col>
        </template>
      </van-cell>
      <van-cell>
        <template #default>
          <van-col span="6"><span>会战魔灵</span></van-col>
          <van-col span="6"><span>强势</span></van-col>
          <van-col span="6"><span>RTA魔灵</span></van-col>
          <van-col span="6"><span>暂不支持</span></van-col>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="阵容推荐">
      <van-cell center label="AI点评: 热门选择" value="#1">
        <template #title>
          <van-grid :column-num="3" icon-size="48px" clickable gutter="8" square :border="false">
            <van-grid-item :icon="require(`@/assets/molings/1.jpg`)" />
            <van-grid-item :icon="require(`@/assets/molings/1.jpg`)" />
            <van-grid-item :icon="require(`@/assets/molings/1.jpg`)" />
          </van-grid>
        </template>
      </van-cell>
      <van-cell center label="AI点评: 依赖特定阵容，易被针对" value="#2">
        <template #title>
          <van-grid :column-num="3" icon-size="48px" clickable gutter="8" square :border="false">
            <van-grid-item :icon="require(`@/assets/molings/1.jpg`)" />
            <van-grid-item :icon="require(`@/assets/molings/1.jpg`)" />
            <van-grid-item :icon="require(`@/assets/molings/1.jpg`)" />
          </van-grid>
        </template>
      </van-cell>
    </van-cell-group>

    <div class="split"></div>
  </div>
</template>

<script>
import _ from "lodash";
// import myAttrService from "../services/myAttr";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted() {

  },
  methods: {
    onClickLeft() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    onAttrChange(attrKey, value) {
      this.$data.todoAttr[attrKey] += value;
      const v2 = this.$data.myAttr.attr[attrKey];
      const v = this.$data.todoAttr[attrKey] + v2;
      const result = (v - (v % 10)) / 10 + 2;
      this.getLimitAttr(attrKey);
      if (value > 0) {
        this.$data.opAttrHistory[attrKey].push(result);
      } else {
        this.$data.opAttrHistory[attrKey].pop();
      }
    },
    getLimitAttr(attrKey) {
      const v2 = this.$data.myAttr.attr[attrKey];
      const v = this.$data.todoAttr[attrKey] + v2;
      const result = (v + 1 - ((v + 1) % 10)) / 10 + 2;
      this.$data.limitAttr[attrKey] = result;
    },
    getAllLimitAttr() {
      this.getLimitAttr("str");
      this.getLimitAttr("agi");
      this.getLimitAttr("vit");
      this.getLimitAttr("int");
      this.getLimitAttr("dex");
      this.getLimitAttr("luk");
    },
    disablePlusFunc(attrKey) {
      return this.$data.myAttr.attr[attrKey] + this.$data.todoAttr[attrKey] >=
        159
        ? true
        : this.remainAttrPoint < this.$data.limitAttr[attrKey]
          ? true
          : false;
    },
  },
  computed: {
    maxAttr() {
      return Math.max([
        this.$data.attrs.myAttr.attrSum.str,
        this.$data.attrs.myAttr.attrSum.agi,
        this.$data.attrs.myAttr.attrSum.vit,
        this.$data.attrs.myAttr.attrSum.int,
        this.$data.attrs.myAttr.attrSum.dex,
        this.$data.attrs.myAttr.attrSum.luk,
      ]);
    },
    disablePlus() {
      return {
        str: this.disablePlusFunc("str"),
        agi: this.disablePlusFunc("agi"),
        vit: this.disablePlusFunc("vit"),
        int: this.disablePlusFunc("int"),
        dex: this.disablePlusFunc("dex"),
        luk: this.disablePlusFunc("luk"),
      };
    },
    disableMinus() {
      return {
        str: this.$data.opAttrHistory["str"].length <= 0 ? true : false,
        agi: this.$data.opAttrHistory["agi"].length <= 0 ? true : false,
        vit: this.$data.opAttrHistory["vit"].length <= 0 ? true : false,
        int: this.$data.opAttrHistory["int"].length <= 0 ? true : false,
        dex: this.$data.opAttrHistory["dex"].length <= 0 ? true : false,
        luk: this.$data.opAttrHistory["luk"].length <= 0 ? true : false,
      };
    },
    remainAttrPoint() {
      return this.$data.myAttr.attr.remainPoint - this.consumedAttrPoint;
    },
    consumedAttrPoint() {
      let points = [];
      const d = _.concat(points, ...Object.values(this.$data.opAttrHistory));
      return _.sum(d);
    },
    submitShow() {
      let points = [];
      const d = _.concat(points, ...Object.values(this.$data.opAttrHistory));
      return d.length === 0 ? false : true;
    },
  },
  data() {
    return {
      opAttrHistory: {
        str: [],
        agi: [],
        vit: [],
        int: [],
        dex: [],
        luk: [],
      },
      radarPlot: null,
      myAttr: {
        attr: {},
        job: {},
        info: {},
        attrSum: {},
        detailAttr: {},
      },
      limitAttr: {
        str: 2,
        agi: 2,
        vit: 2,
        int: 2,
        dex: 2,
        luk: 2,
      },
      todoAttr: {
        str: 0,
        agi: 0,
        vit: 0,
        int: 0,
        dex: 0,
        luk: 0,
        // remainPoint: 0,
      },
      attrs: [],
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
