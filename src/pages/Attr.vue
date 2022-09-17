<template>
  <div id="app">
    <van-nav-bar title="素质点" left-arrow @click-left="onClickLeft" />
    <van-grid :column-num="1" clickable direction="horizontal">
      <van-grid-item
        to="/job"
        :icon="require('@/assets/icons/bussiness-man.png')"
        text="职业树"
      />
    </van-grid>

    <van-cell-group>
      <van-cell>
        <template #default>
          <van-col span="6"><span>角色名</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.name }}</span></van-col
          >
          <van-col span="6"><span>职业</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.job.name }}</span></van-col
          >
        </template>
      </van-cell>
      <van-cell>
        <template #default>
          <van-col span="6"><span>Base</span></van-col>
          <van-col span="6"
            ><span>Lv{{ myAttr.baseLv }}</span></van-col
          >
          <van-col span="6"><span>Job</span></van-col>
          <van-col span="6"
            ><span>Lv{{ myAttr.jobLv }}/{{ myAttr.jobMaxLv }}</span></van-col
          >
        </template>
      </van-cell>
    </van-cell-group>

    <van-row id="roww">
      <van-col span="11">
        <div id="container"></div>
      </van-col>
      <van-col span="13">
        <van-cell :border="false">
          <template #default>
            <van-col span="8"><span>力量Str</span></van-col>
            <van-col span="4"
              ><span>{{ myAttr.attr.str + todoAttr.str }}</span></van-col
            >
            <van-col span="11" offset="1"
              ><span>
                <van-stepper
                  @plus="onAttrChange('str', 1)"
                  @minus="onAttrChange('str', -1)"
                  :disable-minus="disableMinus.str"
                  :disable-plus="disablePlus.str"
                  step="0"
                  v-model="limitAttr.str"
                  theme="round"
                  button-size="18"
                  disable-input /></span
            ></van-col>
          </template>
        </van-cell>
        <van-cell :border="false">
          <template #default>
            <van-col span="8"><span>敏捷Agi</span></van-col>
            <van-col span="4"
              ><span>{{ myAttr.attr.agi + todoAttr.agi }}</span></van-col
            >
            <van-col span="11" offset="1"
              ><span>
                <van-stepper
                  @plus="onAttrChange('agi', 1)"
                  @minus="onAttrChange('agi', -1)"
                  :disable-minus="disableMinus.agi"
                  :disable-plus="disablePlus.agi"
                  step="0"
                  v-model="limitAttr.agi"
                  theme="round"
                  button-size="18"
                  disable-input /></span
            ></van-col>
          </template>
        </van-cell>
        <van-cell :border="false">
          <template #default>
            <van-col span="8"><span>体质Vit</span></van-col>
            <van-col span="4"
              ><span>{{ myAttr.attr.vit + todoAttr.vit }}</span></van-col
            >
            <van-col span="11" offset="1"
              ><span>
                <van-stepper
                  @plus="onAttrChange('vit', 1)"
                  @minus="onAttrChange('vit', -1)"
                  :disable-minus="disableMinus.vit"
                  :disable-plus="disablePlus.vit"
                  step="0"
                  v-model="limitAttr.vit"
                  theme="round"
                  button-size="18"
                  disable-input /></span
            ></van-col>
          </template>
        </van-cell>
        <van-cell :border="false">
          <template #default>
            <van-col span="8"><span>智力Int</span></van-col>
            <van-col span="4"
              ><span>{{ myAttr.attr.int + todoAttr.int }}</span></van-col
            >
            <van-col span="11" offset="1"
              ><span>
                <van-stepper
                  @plus="onAttrChange('int', 1)"
                  @minus="onAttrChange('int', -1)"
                  :disable-minus="disableMinus.int"
                  :disable-plus="disablePlus.int"
                  step="0"
                  v-model="limitAttr.int"
                  theme="round"
                  button-size="18"
                  disable-input /></span
            ></van-col>
          </template>
        </van-cell>
        <van-cell :border="false">
          <template #default>
            <van-col span="8"><span>灵巧Dex</span></van-col>
            <van-col span="4"
              ><span>{{ myAttr.attr.dex + todoAttr.dex }}</span></van-col
            >
            <van-col span="11" offset="1"
              ><span>
                <van-stepper
                  @plus="onAttrChange('dex', 1)"
                  @minus="onAttrChange('dex', -1)"
                  :disable-minus="disableMinus.dex"
                  :disable-plus="disablePlus.dex"
                  step="0"
                  v-model="limitAttr.dex"
                  theme="round"
                  button-size="18"
                  disable-input /></span
            ></van-col>
          </template>
        </van-cell>
        <van-cell :border="false">
          <template #default>
            <van-col span="8"><span>幸运Luk</span></van-col>
            <van-col span="4"
              ><span>{{ myAttr.attr.luk + todoAttr.luk }}</span></van-col
            >
            <van-col span="11" offset="1"
              ><span>
                <van-stepper
                  @plus="onAttrChange('luk', 1)"
                  @minus="onAttrChange('luk', -1)"
                  :disable-minus="disableMinus.luk"
                  :disable-plus="disablePlus.luk"
                  step="0"
                  v-model="limitAttr.luk"
                  theme="round"
                  button-size="18"
                  disable-input /></span
            ></van-col>
          </template>
        </van-cell>
        <van-cell :border="false">
          <template #default>
            <van-col span="8"><span>剩余点数</span></van-col>
            <van-col span="4"
              ><span>{{ remainAttrPoint }}</span></van-col
            >
            <van-col span="11" offset="1">
              <van-button
                v-show="submitShow"
                hairline
                type="info"
                block
                size="mini"
                @click="submitAttr"
                >确定</van-button
              >
            </van-col>
          </template>
        </van-cell>
      </van-col>
    </van-row>

    <van-cell-group title="基础属性">
      <van-cell>
        <template #default>
          <van-col span="6"><span>Hp</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.info.hp }}/{{ myAttr.info.maxHp }}</span></van-col
          >
          <van-col span="6"><span>Sp</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.info.sp }}/{{ myAttr.info.maxSp }}</span></van-col
          >
        </template>
      </van-cell>
      <van-cell>
        <template #default>
          <van-col span="6"><span>Hp恢复</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.info.hp恢复 }}</span></van-col
          >
          <van-col span="6"><span>Sp恢复</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.info.sp恢复 }}</span></van-col
          >
        </template>
      </van-cell>
      <van-cell>
        <template #default>
          <van-col span="6"><span>物理攻击</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.info.物理攻击 }}</span></van-col
          >
          <van-col span="6"><span>魔法攻击</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.info.魔法攻击 }}</span></van-col
          >
        </template>
      </van-cell>
      <van-cell>
        <template #default>
          <van-col span="6"><span>物理防御</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.info.物理防御 }}</span></van-col
          >
          <van-col span="6"><span>魔法防御</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.info.魔法防御 }}</span></van-col
          >
        </template>
      </van-cell>
      <van-cell>
        <template #default>
          <van-col span="6"><span>命中</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.info.命中 }}</span></van-col
          >
          <van-col span="6"><span>移动速度</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.info.移动速度 }}%</span></van-col
          >
        </template>
      </van-cell>
      <van-cell>
        <template #default>
          <van-col span="6"><span>闪避</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.info.闪避 }}</span></van-col
          >
          <van-col span="6"><span>攻击速度</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.info.攻击速度 }}%</span></van-col
          >
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="六维总体属性">
      <van-cell>
        <template #default>
          <van-col span="6"><span>力量</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.attrSum.str }}</span></van-col
          >
          <van-col span="6"><span>敏捷</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.attrSum.agi }}</span></van-col
          >
        </template>
      </van-cell>
      <van-cell>
        <template #default>
          <van-col span="6"><span>体质</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.attrSum.vit }}</span></van-col
          >
          <van-col span="6"><span>智力</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.attrSum.int }}</span></van-col
          >
        </template>
      </van-cell>
      <van-cell>
        <template #default>
          <van-col span="6"><span>灵巧</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.attrSum.dex }}</span></van-col
          >
          <van-col span="6"><span>幸运</span></van-col>
          <van-col span="6"
            ><span>{{ myAttr.attrSum.luk }}</span></van-col
          >
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="穿刺、暴击、吟唱">
      <van-cell center label="计算物理穿刺时，忽视对方对应数值的物伤减免">
        <template #title>
          <van-row type="flex" justify="space-between">
            <van-col span="12">物理穿刺</van-col>
            <van-col span="12" style="text-align: right"
              >{{ myAttr.detailAttr.物理穿刺 }}%</van-col
            >
          </van-row>
        </template>
      </van-cell>
      <van-cell center label="计算魔法穿刺时，忽视对方对应数值的魔伤减免">
        <template #title>
          <van-row type="flex" justify="space-between">
            <van-col span="12">魔法穿刺</van-col>
            <van-col span="12" style="text-align: right"
              >{{ myAttr.detailAttr.魔法穿刺 }}%</van-col
            >
          </van-row>
        </template>
      </van-cell>
      <van-cell center label="提高物理普通攻击时触发暴击的概率">
        <template #title>
          <van-row type="flex" justify="space-between">
            <van-col span="12">暴击</van-col>
            <van-col span="12" style="text-align: right">{{
              myAttr.detailAttr.暴击
            }}</van-col>
          </van-row>
        </template>
      </van-cell>
      <van-cell center title="暴伤" label="提高暴击时的暴击伤害">
        <template #title>
          <van-row type="flex" justify="space-between">
            <van-col span="12">暴伤</van-col>
            <van-col span="12" style="text-align: right"
              >{{ myAttr.detailAttr.暴伤 }}%</van-col
            >
          </van-row>
        </template>
      </van-cell>
      <van-cell center label="提高暴击时的暴击伤害">
        <template #title>
          <van-row type="flex" justify="space-between">
            <van-col span="12">暴击防护</van-col>
            <van-col span="12" style="text-align: right">{{
              myAttr.detailAttr.暴击防护
            }}</van-col>
          </van-row>
        </template>
      </van-cell>
      <van-cell center label="吟唱技能时，可变吟唱时间减少或增加对应百分百">
        <template #title>
          <van-row type="flex" justify="space-between">
            <van-col span="12">可变吟唱时间修正%</van-col>
            <van-col span="12" style="text-align: right"
              >{{ myAttr.detailAttr.可变吟唱时间修正 }}%</van-col
            >
          </van-row>
        </template>
      </van-cell>
      <van-cell center label="每30点灵巧可以减少1秒可变吟唱时间">
        <template #title>
          <van-row type="flex" justify="space-between">
            <van-col span="12">吟唱减免</van-col>
            <van-col span="12" style="text-align: right">{{
              myAttr.detailAttr.吟唱减免
            }}</van-col>
          </van-row>
        </template>
      </van-cell>
      <van-cell center label="提高自己受到治愈技能的效果">
        <template #title>
          <van-row type="flex" justify="space-between">
            <van-col span="12">受治疗加成</van-col>
            <van-col span="12" style="text-align: right"
              >{{ myAttr.detailAttr.受治疗加成 }}%</van-col
            >
          </van-row>
        </template>
      </van-cell>
      <van-cell center label="提高自己使用治愈技能的效果">
        <template #title>
          <van-row type="flex" justify="space-between">
            <van-col span="12">治疗加成</van-col>
            <van-col span="12" style="text-align: right"
              >{{ myAttr.detailAttr.治疗加成 }}%</van-col
            >
          </van-row>
        </template>
      </van-cell>
      <van-cell
        center
        title="普攻伤害加成"
        v-bind:value="myAttr.detailAttr.普攻伤害加成 + '%'"
        label=""
      />
      <van-cell
        center
        title="普攻伤害减免"
        v-bind:value="myAttr.detailAttr.普攻伤害减免 + '%'"
        label=""
      />
      <van-cell
        center
        title="技能伤害减免"
        v-bind:value="myAttr.detailAttr.技能伤害减免 + '%'"
        label=""
      />
    </van-cell-group>
    <van-cell-group title="物理属性">
      <van-cell
        center
        title="物理攻击%"
        v-bind:value="myAttr.detailAttr.物理攻击 + '%'"
        label=""
      />
      <van-cell
        center
        title="物理防御%"
        v-bind:value="myAttr.detailAttr.物理防御 + '%'"
        label=""
      />
      <van-cell center label="对目标造成的物理伤害提高">
        <template #title>
          <van-row type="flex" justify="space-between">
            <van-col span="12">物伤加成</van-col>
            <van-col span="12" style="text-align: right"
              >{{ myAttr.detailAttr.物伤加成 }}%</van-col
            >
          </van-row>
        </template>
      </van-cell>
      <van-cell center label="对目标攻击时，无视目标的物理防御">
        <template #title>
          <van-row type="flex" justify="space-between">
            <van-col span="12">忽视物防</van-col>
            <van-col span="12" style="text-align: right"
              >{{ myAttr.detailAttr.忽视物防 }}%</van-col
            >
          </van-row>
        </template>
      </van-cell>
      <van-cell center label="受到物理伤害降低">
        <template #title>
          <van-row type="flex" justify="space-between">
            <van-col span="12">物伤减免</van-col>
            <van-col span="12" style="text-align: right"
              >{{ myAttr.detailAttr.物伤减免 }}%</van-col
            >
          </van-row>
        </template>
      </van-cell>
      <van-cell
        center
        title="远程物理伤害减免"
        v-bind:value="myAttr.detailAttr.远程物理伤害减免 + '%'"
        label=""
      />
      <van-cell
        center
        title="精炼物攻"
        v-bind:value="myAttr.detailAttr.精炼物攻"
        label=""
      />
      <van-cell
        center
        title="精炼物免"
        v-bind:value="myAttr.detailAttr.精炼物免 + '%'"
        label=""
      />
    </van-cell-group>
    <van-cell-group title="魔法属性">
      <van-cell
        center
        title="魔法攻击%"
        v-bind:value="myAttr.detailAttr.魔法攻击 + '%'"
        label=""
      />
      <van-cell
        center
        title="魔法防御%"
        v-bind:value="myAttr.detailAttr.魔法防御 + '%'"
        label=""
      />
      <van-cell center label="对目标造成的魔法伤害提高">
        <template #title>
          <van-row type="flex" justify="space-between">
            <van-col span="12">魔伤加成</van-col>
            <van-col span="12" style="text-align: right"
              >{{ myAttr.detailAttr.魔伤加成 }}%</van-col
            >
          </van-row>
        </template>
      </van-cell>
      <van-cell center label="对目标攻击时，无视目标的魔法防御">
        <template #title>
          <van-row type="flex" justify="space-between">
            <van-col span="12">忽视魔防</van-col>
            <van-col span="12" style="text-align: right"
              >{{ myAttr.detailAttr.忽视魔防 }}%</van-col
            >
          </van-row>
        </template>
      </van-cell>
      <van-cell center label="受到魔法伤害降低">
        <template #title>
          <van-row type="flex" justify="space-between">
            <van-col span="12">魔伤减免</van-col>
            <van-col span="12" style="text-align: right"
              >{{ myAttr.detailAttr.魔伤减免 }}%</van-col
            >
          </van-row>
        </template>
      </van-cell>
      <van-cell
        center
        title="精炼魔攻"
        v-bind:value="myAttr.detailAttr.精炼魔攻"
        label=""
      />
      <van-cell
        center
        title="精炼魔免"
        v-bind:value="myAttr.detailAttr.精炼魔免 + '%'"
        label=""
      />
    </van-cell-group>

    <div class="split"></div>
  </div>
</template>

<script>
import { Radar } from "@antv/g2plot";
import myAttrService from "../services/myAttr";
import _ from "lodash";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted() {
    const container = document.getElementById("roww");
    const height = container.scrollHeight || 200;

    this.$data.radarPlot = new Radar("container", {
      data: [],
      xField: "name",
      height: height,
      yField: "score",
      appendPadding: [0, 4, 0, 10],
      color: "red",
      meta: {
        score: {
          alias: "分数",
          min: 0,
          nice: true,
        },
      },
      lineStyle: {
        lineWidth: 1,
      },
      tooltip: {
        showMarkers: false,
        showContent: false,
      },
      xAxis: {
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null,
            },
          },
        },
      },
      yAxis: {
        min: 0,
        max: this.$data.maxAttr,
        tickCount: 4,
        label: false,
        line: null,
        tickLine: null,
        grid: {
          alternateColor: ["rgba(204,238,255,0.7)", "rgba(204,238,255,0.4)"],
          line: {
            type: "line",
            style: {
              lineDash: null,
            },
          },
        },
      },
      area: {},
    });
    this.$data.radarPlot.render();
    this.refresh();
  },
  methods: {
    refresh() {
      myAttrService.getMyAttr().then((myAttr) => {
        this.$data.myAttr = myAttr;
        this.$data.attrs = [
          { name: "Str", score: myAttr.attrSum.str },
          { name: "Agi", score: myAttr.attrSum.agi },
          { name: "Vit", score: myAttr.attrSum.vit },
          { name: "Int", score: myAttr.attrSum.int },
          { name: "Dex", score: myAttr.attrSum.dex },
          { name: "Luk", score: myAttr.attrSum.luk },
        ];
        this.$data.radarPlot.changeData(this.attrs);
        this.getAllLimitAttr();
      });
    },
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
    async submitAttr() {
      await myAttrService.addMyAttr(
        this.$data.todoAttr.str,
        this.$data.todoAttr.agi,
        this.$data.todoAttr.vit,
        this.$data.todoAttr.int,
        this.$data.todoAttr.dex,
        this.$data.todoAttr.luk
      );
      this.$data.todoAttr.str = 0;
      this.$data.todoAttr.agi = 0;
      this.$data.todoAttr.vit = 0;
      this.$data.todoAttr.int = 0;
      this.$data.todoAttr.dex = 0;
      this.$data.todoAttr.luk = 0;
      this.$data.opAttrHistory = {
        str: [],
        agi: [],
        vit: [],
        int: [],
        dex: [],
        luk: [],
      };
      myAttrService.getMyAttr().then((myAttr) => {
        this.$data.myAttr = myAttr;
        this.$data.attrs = [
          { name: "Str", score: myAttr.attrSum.str },
          { name: "Agi", score: myAttr.attrSum.agi },
          { name: "Vit", score: myAttr.attrSum.vit },
          { name: "Int", score: myAttr.attrSum.int },
          { name: "Dex", score: myAttr.attrSum.dex },
          { name: "Luk", score: myAttr.attrSum.luk },
        ];
        this.$data.radarPlot.changeData(this.attrs);
      });
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
