<template>
  <div id="app">
    <index-view v-on:help="onHelpEvent" v-on:empty-rage-level="onEmptyRageLevelEvent" v-on:new-storage="onNewStorageEvent"></index-view>
    <help-view v-if="isShowHelp" v-on:hide-help="onHideHelpEvent" v-bind:page="helpPage"></help-view>
  </div>
</template>

<script>
  import IndexView from '@/views/IndexView.vue';
  import HelpView from '@/views/HelpView.vue';

  export default {
    name: 'rage-balancer',
    components: {
      IndexView,
      HelpView
    },
    data: () => {
      return {
        isShowHelp: false,
        helpPage: 'what'
      }
    },
    methods: {
      onHelpEvent: function() {
        this.isShowHelp = true;
      },
      onHideHelpEvent: function() {
        this.isShowHelp = false;
      },
      onNewStorageEvent: function() {
        this.helpPage = 'new_storage';
        this.isShowHelp = true;
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