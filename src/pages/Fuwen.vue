<template>
  <div id="app">
    <van-nav-bar title="符文" left-arrow @click-left="onClickLeft" />
    <van-grid :column-num="4" clickable>
      <van-grid-item text="镶嵌" />
      <van-grid-item text="升级" />
      <van-grid-item text="鉴定" />
      <van-grid-item text="融炼" />
    </van-grid>

    <van-popup
      v-model="show"
      round
      :overlay-style="{ background: 'rgba(0,0,0,0)' }"
      style="background: rgba(0, 0, 0, 0.7); width: 40%"
    >
      <van-cell-group inset title="魔法防御" style="color: #fff">
        <van-cell
          title="Mdef +1.5"
          :border="false"
          style="background: rgba(0, 0, 0, 0.7); color: #969799"
        />
        <van-cell
          title=""
          style="background: rgba(0, 0, 0, 0.7); color: #969799"
        />
      </van-cell-group>
      <van-cell-group inset title="金章 -150"> </van-cell-group>
    </van-popup>

    <div class="toolbox" id="toolbox"></div>
    <div id="mountNode"></div>

    <div class="split"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6"; //在需要的js文件引入

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted() {
    this.initTree(this.$data.data);
  },
  methods: {
    onClickLeft() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    showPopup() {
      this.show = true;
    },
    initTree(data) {
      const tc = document.createElement("div");
      tc.id = "toolbarContainer";
      document.body.appendChild(tc);

      const toolbar = new G6.ToolBar({
        container: "toolbox",
        className: "toolbox",
      });

      const width = window.screen.width;
      const height = window.screen.height;
      const graph = new G6.Graph({
        container: "mountNode",
        width,
        height,
        modes: {
          default: [
            {
              type: "drag-canvas",
            },
            {
              type: "zoom-canvas",
            },
          ],
        },
        defaultNode: {
          size: 20,
          type: "donut", // 节点类型
          donutAttrs: {
            prop1: 1,
            prop2: 1,
            prop3: 1,
          },
          donutColorMap: {
            prop1: "red",
            prop2: "blue",
            prop3: "yellow",
          },
          anchorPoints: [
            [0, 0],
            [0.5, 0],
            [1, 0],
            [0, 0.5],
            [1, 0.5],
            [0, 1],
            [0.5, 1],
            [1, 1],
          ],
          labelCfg: {
            position: "top",
            offset: -1,
            style: {},
          },
          icon: {
            show: true,
            img: require("@/assets/item_1.png"),
            width: 16,
            height: 16,
          },
        },
        defaultEdge: {
          style: {
            stroke: "#b5b5b5",
          },
        },
        plugins: [toolbar],
      });

      graph.data(data);
      graph.on("node:touchend", () => {
        this.showPopup();
      });
      graph.render();
      graph.fitCenter();
    },
  },
  data() {
    return {
      show: false,
      data: {
        nodes: [
          {
            id: "node1",
            x: -150,
            y: -300,
            label: "node1",
          },
          {
            id: "node2",
            x: -100,
            y: -200,
            label: "node2",
          },
          {
            id: "node3",
            x: -200,
            y: -200,
            label: "node3",
          },
          {
            id: "node4",
            x: -50,
            y: -100,
            label: "node4",
          },
          {
            id: "node5",
            x: -150,
            y: -100,
            label: "node5",
          },
          {
            id: "node6",
            x: -250,
            y: -100,
            label: "node6",
          },
          {
            id: "node7",
            x: -0,
            y: -0,
            label: "node7",
          },
          {
            id: "node8",
            x: -100,
            y: -0,
            label: "node8",
          },
          {
            id: "node9",
            x: -200,
            y: -0,
            label: "node9",
          },
          {
            id: "node10",
            x: -300,
            y: -0,
            label: "node10",
          },
          {
            id: "core1",
            x: -150,
            y: -250,
            label: "core1",
          },
          {
            id: "core2",
            x: -100,
            y: -150,
            label: "core2",
          },
          {
            id: "core3",
            x: -200,
            y: -150,
            label: "core3",
          },
          {
            id: "core4",
            x: -50,
            y: -50,
            label: "core4",
          },
          {
            id: "core5",
            x: -150,
            y: -50,
            label: "core5",
          },
          {
            id: "core6",
            x: -250,
            y: -50,
            label: "core6",
          },
        ],
        edges: [
          {
            source: "node1",
            target: "core1",
          },
          {
            source: "node2",
            target: "core1",
          },
          {
            source: "node3",
            target: "core1",
          },
          {
            source: "node2",
            target: "core2",
          },
          {
            source: "node4",
            target: "core2",
          },
          {
            source: "node5",
            target: "core2",
          },
          {
            source: "node3",
            target: "core3",
          },
          {
            source: "node5",
            target: "core3",
          },
          {
            source: "node6",
            target: "core3",
          },
          {
            source: "node4",
            target: "core4",
          },
          {
            source: "node7",
            target: "core4",
          },
          {
            source: "node8",
            target: "core4",
          },
          {
            source: "node5",
            target: "core5",
          },
          {
            source: "node8",
            target: "core5",
          },
          {
            source: "node9",
            target: "core5",
          },
          {
            source: "node6",
            target: "core6",
          },
          {
            source: "node9",
            target: "core6",
          },
          {
            source: "node10",
            target: "core6",
          },
        ],
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  background-color: rgba(98, 110, 31, 0.644);
}
#mountNode {
  background: rgba(0, 0, 0, 0);
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
.toolbox {
  position: absolute;
  bottom: 12px;
  right: 12px;
  z-index: 100;
}
</style>
