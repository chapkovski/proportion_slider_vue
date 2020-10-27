import Vue from "vue";
import App from "./App.vue";
import HighchartsVue from "highcharts-vue";
Vue.config.productionTip = false;
Vue.use(HighchartsVue);

import Vuetify from "vuetify";

Vue.use(Vuetify);

import "vuetify/dist/vuetify.min.css";

new Vue({
  vuetify: new Vuetify({ icons: { iconfont: "mdi" } }),

  render: (h) => h(App)
}).$mount("#app");
