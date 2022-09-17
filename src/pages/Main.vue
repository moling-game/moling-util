<template>
  <div id="app">
    <!-- 顶栏 -->
    <van-row>
      <van-col span="21"></van-col>
      <van-col span="2">
        <van-icon color="#fff" style="margin-top: 14px" size="32" name="user-circle-o" @click="to('/login')" />
      </van-col>
      <van-col span="1"></van-col>
    </van-row>

    <!-- 背景占位 -->
    <div class="bg"></div>

    <van-cell-group inset>
      <van-grid :column-num="4" clickable :border="false">
        <van-grid-item to="/molings?type=2" :icon="require('@/assets/icons/money_bag.png')" text="胎二" @click="notSupport" />
        <van-grid-item to="/molings?type=3" :icon="require('@/assets/icons/money_bag.png')" text="胎三" @click="notSupport" />
        <van-grid-item to="/molings?type=4" :icon="require('@/assets/icons/money_bag.png')" text="胎四" @click="notSupport" />
        <van-grid-item to="/molings?type=5" :icon="require('@/assets/icons/money_bag.png')" text="胎五" @click="notSupport" />
        <van-grid-item to="/molings?type=2z" :icon="require('@/assets/icons/money_bag.png')" text="觉醒胎二" @click="notSupport" />
      </van-grid>
    </van-cell-group>

    <div class="split"></div>

    <!-- 广告 -->
    <van-cell-group inset>
      <van-notice-bar :scrollable="false" left-icon="bullhorn-o" text="广告" />
      <van-cell-group>
        <van-cell>
          <template #default>
            <div class="van-multi-ellipsis--l2">
              【西瓜】保熟亲，要的扣我微信：xxxxxxx
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template #default>
            <div class="van-multi-ellipsis--l2">
              雷电云手机 iOS
              版上线！内存大，网速快，挂机效率高。手机断网断电也能 24 小时挂机~
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template #default>
            <div class="van-multi-ellipsis--l2">
              【西瓜】保熟亲，要的扣我微信：xxxxxxx
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </van-cell-group>

    <div class="split"></div>

    <!-- 更新公告 -->
    <van-cell-group inset>
      <van-notice-bar color="#EEEEEE" background="rgba(0,0,0,0.4)" left-icon="info-o" :scrollable="false">
        数据同步日期: 2202/09/17
      </van-notice-bar>
    </van-cell-group>

    <div class="split"></div>

    <!-- 社区热帖 -->
    <van-cell-group inset>
      <van-cell is-link>
        <template #title>
          <van-tag plain type="primary">排行</van-tag> &nbsp;
          <span class="custom-title">泛用性最广的火属性魔灵</span>
        </template>
      </van-cell>
      <van-cell is-link>
        <template #title>
          <van-tag plain type="primary">排行</van-tag> &nbsp;
          <span class="custom-title">最不适合会战的魔灵们</span>
        </template>
      </van-cell>
      <van-cell is-link>
        <template #title>
          <van-tag plain type="primary">排行</van-tag> &nbsp;
          <span class="custom-title">泛用性最广的光属性魔灵</span>
        </template>
      </van-cell>
    </van-cell-group>

    <div class="split"></div>

    <!-- 链接 -->
    <van-cell-group inset>
      <van-cell title="联系我们" is-link @click="notSupport" />
    </van-cell-group>

    <div class="split"></div>

    <!-- 版权 -->
    <van-cell :border="false" class="copyright" title="© 2022 Muyu" value="Version 0.0.1-alpha"
      label="沪ICP备xxxxxx号-x" />
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    to(url) {
      this.$router.push(url);
    },
    notSupport() {
      Toast.fail({
        duration: 1000,
        message: "暂未开放",
      });
    },
  },
};
</script>

<style scoped>
#app {
  background: url("~@/assets/bg.png") top center no-repeat;
  background-size: 100% auto;
  background-color: rgb(65, 105, 180);
}

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
