<template>
  <div id="app">
    <index-view v-on:help="onHelpEvent"></index-view>
    <help-view v-if="isShowHelp" v-on:hide-help="onHideHelpEvent"></help-view>
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
        isShowHelp: false
      }
    },
    methods: {
      onHelpEvent: function() {
        this.isShowHelp = true;
      },
      onHideHelpEvent: function() {
        this.isShowHelp = false;
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