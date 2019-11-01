<template>
  <div id="indexPage">
    <header class="helper container">
        <div class="row">
            <div class="col-sm-2"><a @click="onClickNewBtn" href="#" title="This will reset current rage level for new metering">Start new</a></div>
            <div class="col-sm-8"></div>  
            <div class="col-sm-2"><a @click="onClickHelpBtn" href="#" title="What does it all mean? (help me)">What ?</a></div>
        </div>
    </header>
    <main class="btn-area">
      <div class="row">
        <div class="col-sm-12">
            <div class="button-group">
                <button class="doc" @click="onRageButtonClick">Rage button</button>
            </div>
        </div>
      </div>
      <div class="row">
          <div class="col-sm-12">
              Level: {{this.$store.getters.getCurrentRageLevel}}
              Max: {{this.$store.getters.getMaxRageLevel}}
          </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
    name: 'indexView',
    mounted: function() {
        this.$store.dispatch('loadStorage');
    },
    methods: {
        onClickHelpBtn: function() {
            this.$emit('help');
        },
        onClickNewBtn: function() {
            this.$store.dispatch('startNewMetering');
        },
        onRageButtonClick: function() {
            /*if (this.$store.getters.getMaxRageLevel === 0) {
                this.$emit('new-storage');
                this.$store.dispatch('createNewStorage');
            } else {
                this.$store.dispatch('incrementRage');            
            }*/
            if (this.$store.getters.getMaxRageLevel === 0) {
                this.$emit('new-storage');
            }
            this.$store.dispatch('incrementRage');
        }
    }
}
</script>

<style lang="scss" scoped>
.helper {
    height: 1.5rem;
    a {
        color: #000000;
    }
}
.btn-area {
    .button-group {
        height: 25%;
        margin: 25% 7rem;
    }
}
</style>