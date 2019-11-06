<template>
  <div id="app">
    <index-view 
      v-bind:theme="theme" 
      v-bind:locale="locale"
      v-on:rage="onRageBtnClick" 
      v-on:new="onNewRageMeterClick" 
      v-on:help="onHelpBtnClick"
      v-on:switch-language="onSwitchLanguage"
      ></index-view>
    <help-view v-if="isShowHelp" v-on:hide-help="onHideHelpEvent" v-bind:page="helpPage"></help-view>
  </div>
</template>

<script>
  import IndexView from '@/views/IndexView.vue';
  import HelpView from '@/views/HelpView.vue';
  import loadYamlFile from 'load-yaml-file';
  import { mapState } from "vuex";

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
        theme: 'white',
        locale: 'en'
      }
    },
    mounted: function() {
      this.loadConfig();
      this.$store.dispatch('LoadStorage');
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
      onRageBtnClick: function() {
        this.$store.dispatch('IncreaseRage');
      },
      onNewRageMeterClick: function() {

      },
      onHelpBtnClick: function() {
        this.isShowHelp = true;
      },
      onSwitchLanguage: function(payload) {
        this.locale = payload;
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