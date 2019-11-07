<template>
  <div id="app">
    <index-view 
      v-bind:theme="theme"
      v-bind:saturation="saturation"
      v-bind:locale="locale"
      v-bind:is-allow-cool-down-btn="getRagePercent > 5"
      v-bind:is-cool-down="isCoolDown"
      v-on:rage="onIncreaseRageEvent" 
      v-on:new="onNewRageMeasureEvent" 
      v-on:help="onShowHelpEvent"
      v-on:switch-language="onSwitchLanguage"
      v-on:reset="onResetEvent"
      v-on:cool-down="onCoolDownEvent"
      ></index-view>
    <help-view v-if="isShowHelp" v-on:hide-help="onHideHelpEvent" v-bind:page="helpPage"></help-view>
    {{$store.getters.getLastMeasure.value}}
    {{getRagePercent}}%
    {{theme}}
    {{getRagePercent > 25}}
    <progress v-if="getRagePercent > 0" :value="getRagePercent" max="100" :class="{'inline':getRagePercent < 99, 'secondary':getRagePercent >= 99}"></progress>
  </div>
</template>

<script>
  import IndexView from '@/views/IndexView.vue';
  import HelpView from '@/views/HelpView.vue';
  import CoolDown from '@/views/CoolDownView.vue';
  import loadYamlFile from 'load-yaml-file';
  import { mapState } from "vuex";

  const RageThemeMapping = [
    {until: 5, theme: 'white'},
    {until: 15, theme: 'white-white-yellow'},
    {until: 40, theme: 'white-yellow'},
    {until: 50, theme: 'white-yellow-yellow'},
    {until: 55, theme: 'yellow'},
    {until: 75, theme: 'yellow-orange'},
    {until: 85, theme: 'yellow-red'},
    {until: 95, theme: 'red'},
    {until: 100, theme: 'black'}
  ];

  export default {
    name: 'rage-balancer',
    components: {
      IndexView,
      HelpView,
      CoolDown
    },
    data: () => {
      return {
        isShowHelp: false,
        helpPage: 'what',
        locale: 'en',
        isCoolDown: false
      }
    },
    computed: {
      getRagePercent: function() {
        const lastMeasure = this.$store.getters.getLastMeasure;
        return Math.round(lastMeasure.value / lastMeasure.max * 100);
      },
      theme: function() {
        let prevPercent = 0;
        for (let i in RageThemeMapping) {
          if (this.getRagePercent >= prevPercent && this.getRagePercent <= RageThemeMapping[i].until) {
            return RageThemeMapping[i].theme;
          }
          prevPercent = RageThemeMapping[i].until;
        }
        return 'white';
      },
      saturation: function() {
        return 1;
      }
    },
    mounted: function() {
      this.loadConfig();
    },
    methods: {
      loadConfig: function() {
        loadYamlFile('src/config.yml').then((conf) => {
          this.locale = conf.locale;
        });
      },
      onHideHelpEvent: function() {
        this.isShowHelp = false;
      },
      onIncreaseRageEvent: function() {
        this.$store.dispatch('IncreaseRage');
      },
      onNewRageMeasureEvent: function() {
        this.$store.dispatch('NewMeasure');
      },
      onShowHelpEvent: function() {
        this.isShowHelp = true;
      },
      onSwitchLanguage: function(payload) {
        this.locale = payload;
      },
      onResetEvent: function() {
        this.$store.dispatch('ResetStore');
      },
      onCoolDownEvent: function() {
        console.debug('onCoolDownEvent');
        this.isCoolDown = true;
      }
    }
  }
</script>

<style lang="scss" src="mini.css/src/flavors/mini-nord.scss"></style>
<style lang="scss" src="./styles/style.scss"></style>
<style lang="scss">
body {
    overflow: hidden;
    progress {
      position: absolute;
      top: 18px;
      left: -7px;
      width: 100% !important;
      right: 0;
      vertical-align: top;
    }
  }
</style>