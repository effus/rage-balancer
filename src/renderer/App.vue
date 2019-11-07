<template>
  <div id="app">
    <index-view 
      v-bind:theme="theme"
      v-bind:saturation="saturation"
      v-bind:locale="locale"
      v-on:rage="onIncreaseRageEvent" 
      v-on:new="onNewRageMeasureEvent" 
      v-on:help="onShowHelpEvent"
      v-on:switch-language="onSwitchLanguage"
      v-on:reset="onResetEvent"
      ></index-view>
    <help-view v-if="isShowHelp" v-on:hide-help="onHideHelpEvent" v-bind:page="helpPage"></help-view>
    {{$store.getters.getLastMeasure}}
    {{getRagePercent}}%
    {{theme}}
  </div>
</template>

<script>
  import IndexView from '@/views/IndexView.vue';
  import HelpView from '@/views/HelpView.vue';
  import loadYamlFile from 'load-yaml-file';
  import { mapState } from "vuex";

  const RageThemeMapping = [
    {until: 25, theme: 'white'},
    {until: 50, theme: 'white-yellow'},
    {until: 75, theme: 'yellow'},
    {until: 85, theme: 'yellow-red'},
    {until: 95, theme: 'red'},
    {until: 100, theme: 'black'}
  ];

  export default {
    name: 'rage-balancer',
    components: {
      IndexView,
      HelpView
    },
    data: () => {
      return {
        isShowHelp: false,
        helpPage: 'what',
        locale: 'en'
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
        console.debug('reset');
        this.$store.dispatch('ResetStore');
      }
    }
  }
</script>

<style lang="scss" src="mini.css/src/flavors/mini-nord.scss"></style>
<style lang="scss" src="./styles/style.scss"></style>
<style lang="scss">
body {
    overflow: hidden;
  }
</style>