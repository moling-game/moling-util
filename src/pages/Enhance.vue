<template>
  <div id="app">
    <van-nav-bar title="神碑" left-arrow @click-left="onClickLeft" />

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
            if (cfg.id) {
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
      const height = window.screen.height;
      const graph = new G6.TreeGraph({
        container: "mountNode",
        width,
        height,
        linkCenter: true,
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
          type: "sql",
        },
        layout: {
          type: "dendrogram",
          direction: "LR",
          nodeSep: 20,
          rankSep: 100,
          radial: true,
        },
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
        id: "Modeling Methods",
        img: require("../assets/skill_禅心.png"),
        children: [
          {
            id: "Classification",
            img: require("../assets/skill_禅心.png"),
            children: [
              {
                id: "Logistic regression",
                img: require("../assets/skill_禅心.png"),
              },
              {
                id: "Linear discriminant analysis",
                img: require("../assets/skill_禅心.png"),
              },
              { id: "Rules", img: require("../assets/skill_禅心.png") },
              {
                id: "Decision trees",
                img: require("../assets/skill_禅心.png"),
              },
              { id: "Naive Bayes", img: require("../assets/skill_禅心.png") },
              {
                id: "K nearest neighbor",
                img: require("../assets/skill_禅心.png"),
              },
              {
                id: "Probabilistic neural network",
                img: require("../assets/skill_禅心.png"),
              },
              {
                id: "Support vector machine",
                img: require("../assets/skill_禅心.png"),
              },
            ],
          },
          {
            id: "Consensus",
            img: require("../assets/skill_禅心.png"),
            children: [
              {
                id: "Models diversity",
                img: require("../assets/skill_禅心.png"),
                children: [
                  {
                    id: "Different initializations",
                    img: require("../assets/skill_禅心.png"),
                  },
                  {
                    id: "Different parameter choices",
                    img: require("../assets/skill_禅心.png"),
                  },
                  {
                    id: "Different architectures",
                    img: require("../assets/skill_禅心.png"),
                  },
                  {
                    id: "Different modeling methods",
                    img: require("../assets/skill_禅心.png"),
                  },
                  {
                    id: "Different training sets",
                    img: require("../assets/skill_禅心.png"),
                  },
                  {
                    id: "Different feature sets",
                    img: require("../assets/skill_禅心.png"),
                  },
                ],
              },
              {
                id: "Methods",
                img: require("../assets/skill_禅心.png"),
                children: [
                  {
                    id: "Classifier selection",
                    img: require("../assets/skill_禅心.png"),
                  },
                  {
                    id: "Classifier fusion",
                    img: require("../assets/skill_禅心.png"),
                  },
                ],
              },
              {
                id: "Common",
                img: require("../assets/skill_禅心.png"),
                children: [
                  { id: "Bagging", img: require("../assets/skill_禅心.png") },
                  { id: "Boosting", img: require("../assets/skill_禅心.png") },
                  { id: "AdaBoost", img: require("../assets/skill_禅心.png") },
                ],
              },
            ],
          },
          {
            id: "Regression",
            img: require("../assets/skill_禅心.png"),
            children: [
              {
                id: "Multiple linear regression",
                img: require("../assets/skill_禅心.png"),
              },
              {
                id: "Partial least squares",
                img: require("../assets/skill_禅心.png"),
              },
              {
                id: "Multi-layer feedforward neural network",
                img: require("../assets/skill_禅心.png"),
              },
              {
                id: "General regression neural network",
                img: require("../assets/skill_禅心.png"),
              },
              {
                id: "Support vector regression",
                img: require("../assets/skill_禅心.png"),
              },
            ],
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
</style>
