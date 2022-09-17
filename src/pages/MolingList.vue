<template>
  <div id="app">
    <van-nav-bar title="胎三魔灵" left-arrow @click-left="onClickLeft" />

    <van-dropdown-menu>
      <van-dropdown-item v-model="value" :options="option" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>

    <div class="split"></div>

    <van-grid :column-num="5" icon-size="64px" clickable gutter="8" square>
      <van-grid-item v-for="item in data" :key="item.id" :icon="require(`@/assets/molings/${item.icon}.jpg`)"
        @click="showDetail(item)" />
    </van-grid>

    <div class="split"></div>
  </div>
</template>

<script>
import { Dialog } from "vant";
// import monsterService from "../services/monster";

export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  // mounted() {
  //   this.load();
  // },
  methods: {
    showDetail(item) {
      this.$router.push(`/moling?id=${item.id}`);
    },
    onClickLeft() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    onConfirm() {
      this.$refs.item.toggle();
    },
    // load() {
    //   monsterService.getAll().then(res => {
    //     this.$data.data = res;
    //   });
    // },
  },
  data() {
    return {
      currItem: {
        name: "",
      },
      show: false,
      value: 0,
      value2: 0,
      data: [
        { id: 1, icon: 1 },
        { id: 2, icon: 1 },
        { id: 3, icon: 1 },
        { id: 4, icon: 1 },
        { id: 5, icon: 1 },
        { id: 6, icon: 1 },
        { id: 7, icon: 1 },
      ],
      option: [
        { text: "所有属性", value: 0 },
        { text: "火属性", value: 1 },
        { text: "水属性", value: 2 },
        { text: "风属性", value: 3 },
        { text: "光属性", value: 4 },
        { text: "暗属性", value: 5 },
      ],
      option2: [
        { text: "所有类型", value: 0 },
        { text: "攻击型", value: 1 },
        { text: "防御型", value: 2 },
        { text: "体力型", value: 3 },
        { text: "辅助型", value: 4 },
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
