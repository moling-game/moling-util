<template>
  <div id="app">
    <van-nav-bar title="职业" left-arrow @click-left="onClickLeft" />

    <div id="mountNode"></div>

    <div class="split"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6"; //在需要的js文件引入
import jobService from "../services/job";

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
            if (cfg.type === "empty") {
              return group.addShape("text", {
                attrs: {
                  text: "",
                  x: 0,
                  y: 0,
                  fill: "#00287E",
                  fontSize: 14,
                  textAlign: "center",
                  textBaseline: "middle",
                  fontWeight: "bold",
                },
                name: "empty-shape",
              });
            }
            const rect = group.addShape("image", {
              attrs: {
                img: cfg.icon,
                x: -32,
                y: -32,
                width: 64,
                height: 64,
                fill: "#00287E",
                fontSize: 14,
                textAlign: "center",
                textBaseline: "middle",
                fontWeight: "bold",
              },
              name: "image-shape",
            });
            group.addShape("text", {
              attrs: {
                text: cfg.id,
                x: 0,
                y: 24,
                fill: "#00287E",
                fontSize: 18,
                textAlign: "center",
                textBaseline: "middle",
                fontWeight: "bold",
              },
              name: "text-shape",
            });
            return rect;
          },
        },
        "single-node"
      );

      const width = window.screen.width;
      const height = window.screen.height;
      const graph = new G6.Graph({
        container: "mountNode",
        width,
        height,
        layout: {
          type: "dagre",
          nodesepFunc: (d) => {
            if (d.id === "3") {
              return 500;
            }
            return 50;
          },
          ranksep: 70,
          controlPoints: true,
        },
        defaultNode: {
          type: "sql",
        },
        defaultEdge: {
          type: "polyline",
          style: {
            radius: 20,
            offset: 45,
            endArrow: true,
            lineWidth: 2,
            stroke: "#C2C8D5",
          },
        },
        nodeStateStyles: {
          selected: {
            stroke: "#d9d9d9",
            fill: "#5394ef",
          },
        },
        modes: {
          default: [
            "drag-canvas",
            "zoom-canvas",
            "click-select",
            {
              type: "tooltip",
              formatText(model) {
                const cfg = model.conf;
                const text = [];
                cfg.forEach((row) => {
                  text.push(row.label + ":" + row.value + "<br>");
                });
                return text.join("\n");
              },
              offset: 30,
            },
          ],
        },
      });

      graph.data(data);
      graph.on("node:touchend", () => {
        this.showPopup();
      });
      graph.render();
      graph.fitCenter();

      jobService.getTree().then((res) => {
        this.$data.data.nodes = res.nodes;
        this.$data.data.edges = res.edges;
        graph.changeData(res);
      });
    },
  },
  data() {
    return {
      show: false,
      data: {
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
  background-color: rgba(0, 0, 0, 0.767);
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
