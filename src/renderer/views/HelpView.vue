<template>
    <article id="help-view">
        <img src="../assets/help-en.png" alt="Help img 1" @click="onClickHelpImg">
    </article>
</template>

<script>
export default {
    name: 'helpView',
    methods: {
        onClickHelpImg: function() {
            this.$emit('hide-help');
        }
    }
}
</script>

<style lang="scss">
#help-view {
    position: absolute;
    top: 0;
    left: 0;
}
</style>