<template>
  <div id="app">
    <van-nav-bar title="装备" left-arrow @click-left="onClickLeft" />

    <van-tabs sticky swipeable>
      <van-tab title="装备">
        <van-grid :column-num="5" icon-size="36px" clickable :border="false">
          <van-grid-item
            :icon="getEquipmentIcon(0)"
            text="副手"
            @click="showDetail(0)"
          />
          <van-grid-item />
          <van-grid-item /> <van-grid-item />
          <van-grid-item
            :icon="getEquipmentIcon(6)"
            @click="showDetail(6)"
            text="武器"
          />
        </van-grid>
        <van-grid :column-num="5" icon-size="36px" clickable :border="false">
          <van-grid-item
            :icon="getEquipmentIcon(1)"
            text="盔甲"
            @click="showDetail(1)"
          />
          <van-grid-item /> <van-grid-item /> <van-grid-item />
          <van-grid-item
            :icon="getEquipmentIcon(7)"
            text="头饰"
            @click="showDetail(7)"
          />
        </van-grid>
        <van-grid :column-num="5" icon-size="36px" clickable :border="false">
          <van-grid-item
            :icon="getEquipmentIcon(2)"
            text="披风"
            @click="showDetail(2)"
          />
          <van-grid-item /> <van-grid-item /> <van-grid-item />
          <van-grid-item
            :icon="getEquipmentIcon(8)"
            text="脸部"
            @click="showDetail(8)"
          />
        </van-grid>
        <van-grid :column-num="5" icon-size="36px" clickable :border="false">
          <van-grid-item
            :icon="getEquipmentIcon(3)"
            text="鞋子"
            @click="showDetail(3)"
          />
          <van-grid-item /> <van-grid-item /> <van-grid-item />
          <van-grid-item
            :icon="getEquipmentIcon(9)"
            text="嘴部"
            @click="showDetail(9)"
          />
        </van-grid>
        <van-grid :column-num="5" icon-size="36px" clickable :border="false">
          <van-grid-item
            :icon="getEquipmentIcon(4)"
            text="饰品"
            @click="showDetail(4)"
          />
          <van-grid-item /> <van-grid-item /> <van-grid-item />
          <van-grid-item
            :icon="getEquipmentIcon(10)"
            text="背部"
            @click="showDetail(10)"
          />
        </van-grid>
        <van-grid :column-num="5" icon-size="36px" clickable :border="false">
          <van-grid-item
            :icon="getEquipmentIcon(5)"
            text="饰品"
            @click="showDetail(5)"
          />
          <van-grid-item />
          <van-grid-item icon="photo-o" text="坐骑" @click="showDetail" />
          <van-grid-item />
          <van-grid-item
            :icon="getEquipmentIcon(11)"
            text="尾部"
            @click="showDetail(11)"
          />
        </van-grid>
      </van-tab>
      <van-tab title="物品">
        <van-grid :column-num="6" :border="false" clickable>
          <van-grid-item
            :icon="require('@/assets/icons/ALL.png')"
            @click="getMyItems()"
          />
          <van-grid-item
            :icon="require('@/assets/icons/爱心.png')"
            @click="getMyItems(2)"
          />
          <van-grid-item
            :icon="require('@/assets/icons/药水.png')"
            @click="getMyItems(0)"
          />
          <van-grid-item
            :icon="require('@/assets/icons/equipment.png')"
            @click="getMyItems(3)"
          />
          <van-grid-item
            :icon="require('@/assets/icons/钻石.png')"
            @click="getMyItems(1)"
          />
          <van-grid-item
            :icon="require('@/assets/icons/卡片.png')"
            @click="getMyItems(4)"
          />
        </van-grid>
        <van-grid :column-num="5" icon-size="36px" clickable gutter="6" square>
          <van-grid-item
            v-for="myItem in myItems"
            :key="myItem.id"
            :badge="myItem.count"
            :icon="
              myItem.item != null ? myItem.item.icon : myItem.equipment.icon
            "
          />
        </van-grid>
      </van-tab>
      <van-tab title="时装">暂未支持</van-tab>
    </van-tabs>

    <van-dialog
      v-model="show"
      confirmButtonText="卸下"
      :closeOnClickOverlay="true"
    >
      <van-card
        currency=""
        price="277,000 z"
        :desc="`类型： ${currData.equipment.catalog}`"
        :title="`+${currData.refine_lv} ${currData.equipment.name}`"
        :thumb="currData.equipment.icon"
      >
        <template #num>
          <van-button icon="search" size="mini" />
        </template>
      </van-card>
      <van-cell value="物理防御+180" />
      <van-cell
        :border="false"
        :title="`强化(${currData.strengthen_lv}/${170})`"
        value="物理防御+255.0"
      />
      <van-cell
        :title="`精炼(${currData.refine_lv}/${15})`"
        value="精炼物免+9.0%"
      />
      <van-cell :border="false" value="* 力量 +12" />
      <van-cell :border="false" value="* 生命上限 +2800" />
      <van-cell
        value="* 近战物理伤害+10%; 精炼+10时, 近战物理伤害+4%; 精炼+15时, 近战物理伤害+4%"
      />
      <van-cell :border="false" value="附魔属性" />
    </van-dialog>

    <div class="split"></div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import myService from "../services/my";
import _ from "lodash";

export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted() {
    this.load();
  },
  methods: {
    showDetail(index) {
      this.$data.currData = _.find(this.$data.data, { in: index });
      this.$data.show = true;
    },
    onClickLeft() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    load() {
      myService.getMyEquipments().then((res) => {
        this.$data.data = res;
      });
      this.getMyItems();
    },
    getMyItems(catalogId) {
      myService.getMyItems(catalogId).then((res) => {
        this.$data.myItems = res;
      });
    },
    getEquipmentIcon(index) {
      return _.get(
        _.find(this.$data.data, { in: index }),
        "equipment.icon",
        null
      );
    },
  },
  data() {
    return {
      currData: {
        equipment: {},
      },
      data: [],
      myItems: [],
      active: 0,
      show: false,
      furniture_1: require("@/assets/furniture_1.png"),
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
