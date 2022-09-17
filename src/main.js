import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'

import { Grid, GridItem } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Image as VanImage } from 'vant';
import { Cell, CellGroup } from 'vant';
import { NoticeBar } from 'vant';
import { Collapse, CollapseItem } from 'vant';
import { Card } from 'vant';
import { Tag } from 'vant';
import { Button } from 'vant';
import { Icon } from 'vant';
import { Col, Row } from 'vant';
import { Popup } from 'vant';
import { NavBar } from 'vant';
import { Stepper } from 'vant';
import { Popover } from 'vant';
import { Step, Steps } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import { Form } from 'vant';
import { Field } from 'vant';
import { Picker } from 'vant';
import { Area } from 'vant';
import { Toast } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { Divider } from 'vant';
import { Tab, Tabs } from 'vant';
import { Switch } from 'vant';
import { Slider } from 'vant';

Vue.use(Slider);
Vue.use(Switch);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Divider);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Toast);
Vue.use(Area);
Vue.use(Picker);
Vue.use(Form);
Vue.use(Field);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Popover);
Vue.use(Stepper);
Vue.use(NavBar);
Vue.use(Popup);
Vue.use(Col);
Vue.use(Row);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Tag)
Vue.use(Card);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(NoticeBar);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(VanImage);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Swipe);
Vue.use(SwipeItem);

Vue.config.productionTip = false

Vue.use(VueRouter)

document.title = "魔灵召唤工具箱"

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
