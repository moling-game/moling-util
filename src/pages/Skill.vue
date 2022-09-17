<template>
  <div id="app">
    <van-nav-bar title="技能" left-arrow @click-left="onClickLeft" />
    <!-- <van-grid :column-num="2" clickable direction="horizontal">
      <van-grid-item dot icon="photo-o" text="技能" />
      <van-grid-item icon="photo-o" text="四转技能" />
    </van-grid> -->
    <div id="mountNode"></div>

    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <van-cell-group inset>
        <van-cell value="火箭术 Lv.1" />
        <van-cell
          value="从天空中降落火箭攻击敌方单体，使其受到魔法攻击100%火属性魔法伤害和少量真实魔法伤害"
        />
        <van-cell title="施法距离" value="6m" />
        <van-cell title="吟唱时间" value="0.8s（可变0.64s+固定0.16s）" />
        <van-cell title="技能延迟" value="1s" />
        <van-cell title="SP消耗" value="10" />
        <van-row>
          <van-col span="6"
            ><van-button type="primary" block>-1</van-button></van-col
          >
          <van-col span="6"
            ><van-button type="primary" block>+1</van-button></van-col
          >
          <van-col span="6"
            ><van-button type="primary" block>⇐</van-button></van-col
          >
          <van-col span="6"
            ><van-button type="primary" block>⇒</van-button></van-col
          >
        </van-row>
      </van-cell-group>
    </van-popup>

    <div class="split"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6"; //在需要的js文件引入
import skillService from "../services/skill";

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
      G6.registerNode(
        "sql",
        {
          drawShape(cfg, group) {
            const rect = group.addShape("rect", {
              attrs: {
                x: -20,
                y: -20,
                width: 40,
                height: 40,
                radius: 10,
                lineWidth: 3,
              },
              name: "rect-shape",
            });
            if (cfg.name) {
              group.addShape("image", {
                attrs: {
                  x: -20,
                  y: -20,
                  width: 40,
                  height: 40,
                  img: cfg.img,
                },
                name: "image-shape",
              });
            }
            return rect;
          },
        },
        "single-node"
      );

      const width = window.screen.width;
      const height = window.screen.height || 700;
      const graph = new G6.Graph({
        container: "mountNode",
        width,
        height,
        layout: {
          type: "grid",
          begin: [0, 0], // 可选，
          preventOverlap: true, // 可选，必须配合 nodeSize
          preventOverlapPdding: 3, // 可选
          nodeSize: 10, // 可选
          condense: false, // 可选
          rows: 7, // 可选
          cols: 6, // 可选
          sortBy: "id", // 可选
          workerEnabled: true, // 可选，开启 web-worker
        },
        defaultCombo: {
          type: "rect",
          style: {
            fill: "rgba(0, 0, 0, 0)",
            stroke: "#eaff8f",
            lineWidth: 1,
          },
          size: [40, 10], // The minimum size of the Combo
          padding: [30, 20, 10, 20],
          labelCfg: {
            refY: 10,
            refX: 20,
            position: "top",
            style: {
              fill: "#fff",
            },
          },
        },
        defaultNode: {
          type: "sql",
        },
        defaultEdge: {
          type: "polyline",
          style: {
            radius: 20,
            offset: 45,
            endArrow: false,
            lineWidth: 3,
            stroke: "#7bc81b",
          },
        },
        nodeStateStyles: {
          selected: {
            stroke: "#d9d9d9",
            fill: "#5394ef",
          },
        },
        comboStateStyles: {
          dragenter: {
            lineWidth: 4,
            stroke: "#FE9797",
          },
        },
        modes: {
          default: [
            // "drag-canvas",
            // "zoom-canvas",
            "click-select-node",
            {
              type: "tooltip",
              formatText(model) {
                return model.id;
              },
              offset: 30,
            },
          ],
        },
        fitView: true,
      });

      graph.data(data);
      graph.on("node:click", (evt) => {
        console.log("evt", evt);
        this.showPopup();
      });
      graph.render();

      skillService.getTree().then((res) => {
        this.$data.data.nodes = res.nodes;
        this.$data.data.edges = res.edges;
        this.$data.data.combos = res.combos;
        graph.changeData(res);
      });
    },
  },
  data() {
    return {
      show: false,
      data: {
        combos: [],
        nodes: [],
        edges: [],
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  background-color: #333;
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
</style>
