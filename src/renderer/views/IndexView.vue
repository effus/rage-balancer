<template>
  <div id="indexPage">
    <header class="helper container">
        <div class="row">
            <div class="col-sm-10"></div>  
            <div class="col-sm-2"><a @click="onClickHelpBtn" href="#" title="What does it all mean? (help me)">What ?</a></div>
        </div>
    </header>
    <main class="btn-area">
      <div class="row">
        <div class="col-sm-12">
            <div class="button-group">
                <button class="doc">Rage button</button>
            </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
    name: 'indexView',
    methods: {
        onClickHelpBtn: function() {
            this.$emit('help');
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