<template>
  <div id="app">
    <van-nav-bar title="挂机" left-arrow @click-left="onClickLeft" />
    <van-field
      clickable
      name="area"
      :value="value"
      label="挂机地图"
      placeholder="点击选择地图"
      @click="showArea = true"
    />
    <van-popup v-model="showArea" position="top" round>
      <van-area
        :area-list="areaList"
        @confirm="onConfirm"
        @cancel="showArea = false"
        :columns-num="3"
        :readonly="mapSelectReadonly"
      />
    </van-popup>

    <van-row type="flex" justify="center">
      <van-col span="4">
        <van-grid icon-size="37" column-num="1">
          <van-grid-item :icon="click.monsterIcon" :text="click.monsterName" />
        </van-grid>
      </van-col>
      <van-col span="16">
        <van-grid icon-size="10" direction="horizontal" :column-num="2">
          <van-grid-item :text="`附近怪物 ${click.monsterCount}`" />
          <van-grid-item :text="`附近玩家 ${click.playerCount}`" />
          <van-grid-item :text="`人均密度 ${click.avg}%`" />
          <van-grid-item
            :text="`${
              alreadyMinutes == null ? '尚未开始' : alreadyMinutes + '分钟'
            }`"
          />
        </van-grid>
      </van-col>
      <van-col span="4">
        <van-grid icon-size="42" column-num="1" clickable>
          <!-- <van-icon name="cross" /> -->
          <van-grid-item
            :icon="`${alreadyMinutes == null ? 'success' : 'cross'}`"
            :text="`${alreadyMinutes == null ? '开始挂机' : '停止挂机'}`"
            @click="showWorkOption"
          />
        </van-grid>
      </van-col>
    </van-row>
    <van-row type="flex" justify="center">
      <van-col span="24"
        ><van-cell title="挂机坐标" :value="click.x + ',' + click.y"
      /></van-col>
    </van-row>

    <div id="mountNode"></div>

    <van-grid square :column-num="6" icon-size="48">
      <van-grid-item :icon="skill_火箭术" />
      <van-grid-item icon="photo-o" />
      <van-grid-item icon="photo-o" />
      <van-grid-item icon="photo-o" />
      <van-grid-item icon="photo-o" />
      <van-grid-item icon="photo-o" />
    </van-grid>

    <van-cell-group title="应获收益">
      <van-cell :border="false" title="金币 230,112" />
      <van-cell :border="false" title="BaseExp 230,112" />
      <van-cell :border="false" title="JobExp 230,112" />
    </van-cell-group>

    <div class="split"></div>

    <van-popup v-model="isShowWorkOption" round :style="{ width: '90%' }">
      <van-field name="slider" label="挂机时长">
        <template #input>
          <van-slider
            v-model="workOption.durationMinus"
            active-color="#ee0a24"
            max="720"
            min="10"
            step="1"
          >
            <template #button>
              <div class="custom-button">{{ workOption.durationMinus }}</div>
            </template>
          </van-slider>
        </template>
      </van-field>
      <van-cell center title="原地挂机">
        <template #right-icon>
          <van-switch v-model="workOption.原地挂机" size="24" />
        </template>
      </van-cell>
      <van-cell center title="尽可能走位">
        <template #right-icon>
          <van-switch v-model="workOption.尽可能走位" size="24" />
        </template>
      </van-cell>
      <van-button type="default" block @click="startWork">确认</van-button>
    </van-popup>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Scatter } from "@antv/g2plot";
import _ from "lodash";
import mapService from "../services/map";
import fightWorkService from "../services/fight/work";
import moment from "moment";

export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted() {
    this.$data.plot = new Scatter("mountNode", {
      appendPadding: [-4, 16, 16, 16],
      data: [],
      slider: false,
      shape: "circle",
      height: 300,
      autoFit: true,
      xField: "x",
      yField: "y",
      colorField: "monsterName",
      sizeField: "monsterCount",
      pointStyle: {
        lineWidth: 2,
      },
      size: 6,
      yAxis: {
        min: 0,
        max: 10,
        label: false,
        nice: true,
        line: null,
        grid: null,
      },
      tooltip: {
        showMarkers: false,
        showContent: false,
      },
      xAxis: {
        min: 0,
        max: 10,
        label: false,
        grid: null,
        line: null,
      },
      legend: {
        layout: "horizontal",
        position: "top",
      },
      label: {
        content: (v) => {
          return v.id;
        },
      },
    });
    this.$data.plot.render();

    this.$data.plot.on("plot:touchend", (e) => {
      if (e.data == null) {
        this.cleanClick();
      } else {
        this.$data.click.x = _.round(e.gEvent.x);
        this.$data.click.y = _.round(e.gEvent.y);
        this.clickMapXyId(e.data.data.id);
      }
    });
    this.refresh();
    this.viewWork();
  },
  methods: {
    clickMapXyId(mapXyId) {
      const map = _.find(this.$data.mapData, { id: mapXyId });
      this.$data.click.monsterName = map.monsterName;
      this.$data.click.monsterId = map.monsterId;
      this.$data.click.monsterIcon = map.monsterIcon;
      this.$data.click.monsterCount = map.monsterCount;
      this.$data.click.playerCount = map.playerCount;
      this.$data.click.avg = _.round(
        (map.monsterCount / map.playerCount) * 100,
        1
      );
      this.$data.click.xyId = map.id;
    },
    viewWork() {
      fightWorkService.getView().then((res) => {
        if (res == null) {
          return;
        } else {
          const alreadyMinutes = moment(res.now_at).diff(
            moment(res.begin_at),
            "minutes"
          );
          this.$data.alreadyMinutes = alreadyMinutes;
          this.getMap(res.map_id).then((map) => {
            this.clickMapXyId(res.map_xy_id);
            this.$data.value = map.name;
          });
          return;
        }
      });
    },
    async startWork() {
      const body = {
        workOption: this.$data.workOption,
        mapInfo: {
          mapId: this.$data.mapId,
          mapXyId: this.$data.click.xyId,
        },
        skillInfo: {},
      };
      await fightWorkService.postStart(body);
      this.$data.isShowWorkOption = false;
    },
    validClick() {
      if (
        this.$data.click.monsterId == null ||
        this.$data.click.xyId == null ||
        this.$data.mapId == null
      ) {
        this.$toast.fail("未选择挂机点");
        return false;
      }
      return true;
    },
    showWorkOption() {
      const valid = this.validClick();
      if (!valid) {
        return;
      }
      this.$data.isShowWorkOption = true;
    },
    cleanClick() {
      this.$data.click.monsterName = "未选中";
      this.$data.click.monsterId = 0;
      this.$data.click.monsterIcon = "circle";
      this.$data.click.monsterCount = 0;
      this.$data.click.playerCount = 0;
      this.$data.click.avg = 0;
      this.$data.click.x = 0;
      this.$data.click.y = 0;
      this.$data.click.xyId = null;
    },
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
      this.value = values[2].name;
      this.showArea = false;
      if (values[2] != null) {
        this.$data.mapId = values[2].code;
        this.getMap(values[2].code);
      }
    },
    async refresh() {
      const maps = await mapService.getMaps();
      let data = [{}, {}, {}];
      for (let i = 1; i <= 3; i++) {
        for (const item of _.filter(maps, (v) => v.rank === i)) {
          data[i - 1][item.id] = item.name;
        }
      }
      this.$data.areaList = {
        province_list: data[0],
        city_list: data[1],
        county_list: data[2],
      };
    },
    async getMap(id) {
      const map = await mapService.getMap(id);
      this.$data.mapData = map.map_data;
      this.$data.plot.changeData(map.map_data);
      this.cleanClick();
      return map;
    },
  },
  computed: {
    mapSelectReadonly() {
      return this.alreadyMinutes == null ? false : true;
    },
  },
  data() {
    return {
      mapData: [],
      alreadyMinutes: null,
      workOption: {
        durationMinus: 10,
        尽可能走位: false,
        原地挂机: false,
      },
      isShowWorkOption: false,
      plot: null,
      checkboxGroup: [],
      click: {
        x: 0,
        y: 0,
        monsterName: "未选中",
        monsterId: 0,
        monsterIcon: "circle",
        monsterCount: 0,
        playerCount: 0,
        avg: 0,
        xyId: null,
      },
      checked: false,
      checkeds: [false, false, false, false, false],
      value: "",
      showArea: false,
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {},
      },
      mapId: null,
      item_1: require("@/assets/item_1.png"),
      m_波利: require("@/assets/m_波利.png"),
      skill_火箭术: require("@/assets/skill_1.png"),
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
.custom-button {
  width: 28px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px;
}
</style>
