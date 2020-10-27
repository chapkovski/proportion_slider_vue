<template>
  <div>
    <h1>&nbsp</h1>
    <div class="slider-wrapper">
      <div class="left-wrap"></div>

      <vue-slider
        class="slider-itself"
        :railStyle="rail"
        v-model="value"
        tooltip="none"
        :process="process"
        :min-range="0"
        :tooltip-placement="['bottom', 'top', 'top', 'bottom']"
        :dotOptions="[
          { disabled: true, tooltip: 'none' },
          { disabled: false, tooltip: 'none' },
          { disabled: false, tooltip: 'none' },
          { disabled: true, tooltip: 'none' },
        ]"
        :height="100"
        :enableCross="false"
      >
        <template v-slot:process="{ start, end, style, index }">
          <div
            :class="[
              'vue-slider-process',
              index === 0 && 'left-radius',
              index === 2 && 'right-radius',
            ]"
            :style="jopa(style, index)"
          >
            <div
              class="merge-slider vue-slider-dot-tooltip-inner"
              :class="inner(index, start, end)"
            >
              <span class="label">JOPA</span>
              <span class="percentage">
                {{ value[index + 1] - value[index] }}%
              </span>
            </div>
          </div>
        </template>
        <template v-slot:dot="{ pos, index }">
          <div :class="sliderStyle(pos, index)">
            <img
              src="https://animesonar.com/slider-arrows.svg"
              height="80%"
              width="80%"
            />
          </div>
        </template>
      </vue-slider>
      <div class="right-wrap"></div>
    </div>
    <highcharts
      :options="chartOptions"
      :updateArgs="[true, true, true]"
    ></highcharts>
  </div>
</template>


<script>
import VueSlider from "vue-slider-component";
import { Chart } from "highcharts-vue";
import "vue-slider-component/theme/default.css";
import _ from "lodash";
export default {
  components: {
    VueSlider,
    highcharts: Chart,
  },
  data: function () {
    return {
      value: [0, 50, 75, 100],
      rail: {
        background: "gray",
        "border-radius": "0px",
      },
      process: (val) => [
        [val[0], val[1]],
        [val[1], val[2]],
        [val[2], val[3]],
      ],
      hcInstance: Chart,
      chartOptions: {
        chart: {
          type: "column",
          margin: [50, 50, 100, 80],
        },
        plotOptions: {
          column: {
            colorByPoint: true,
          },
        },
        colors: ["black", "blue", "orange"],
        series: [
          {
            data: [1, 2, 33],
          },
        ],
      },
    };
  },
  watch: {
    value(newV, oldV) {
      var result = _.map(newV, function (e, i) {
        return newV[i + 1] - e;
      });

      result.pop();
      this.chartOptions.series[0].data = result;
    },
  },
  methods: {
    x() {
      return this.value;
    },
    jopa(style, index) {
      const colors = ["black", "blue", "orange"];
      style["background"] = colors[index];

      if (index === 0) {
        return [style, "left-radius"];
      }
      return [style];
    },
    inner(index, s, e) {
      const classes = ["first", "second", "third"];

      if (this.value[index + 1] - this.value[index] < 10) {
        return "inv";
      }

      return classes[index];
    },
    sliderStyle(pos, index) {
      if (index !== 0 && index !== 3) {
        return "slider-button";
      }
      return "inv";
    },
  },
};
</script>

<style>
.left-wrap {
  background: black;
  border-radius: 50px 0px 0px 50px !important;
  width: 50px;
  margin: 7px 0px;
}
.right-wrap {
  background: orange;
  border-radius: 0px 50px 50px 0px !important;
  width: 50px;
  margin: 7px 0px;
}
.slider-wrapper {
  display: flex;
  flex-direction: row;
}

.slider-itself {
  flex-grow: 1;
}

.vue-slider-process {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 0px 0px !important;
}
.left-radius {
  /* border-radius: 50px 0px 0px 50px !important; */
}
.right-radius {
  /* border-radius: 0px 50px 50px 0px !important; */
}
.jjj {
  width: 30px;
  background: yellow;
}
.inv {
  display: none;
}
.first {
  background: black !important;
}
.second {
  background: blue !important;
}
.third {
  background: orange !important;
}
.pizda {
  height: 100px !important;
}
.jopa {
  background: yellow !important;
  width: 100px !important;
  height: 100px;
}

.slider-button {
  width: 2em;
  height: 2em;
  background-color: white !important;
  position: absolute;
  border-radius: 2em;
  right: calc(-0.6em);
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  margin: auto;
  z-index: 10;
  cursor: ew-resize;
  user-select: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.merge-tooltip {
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, -15px);
}
.label {
  color: white;
  font-weight: 700;
  user-select: none;
  display: block;
  overflow: hidden;
  font-family: sans-serif;
}
</style>
