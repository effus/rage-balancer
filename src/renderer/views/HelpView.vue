<template>
    <article id="help-view">
        <img v-if="page === 'what'" src="../assets/help-en.png" alt="Help img 1" @click="onClickHelpImg" />
        <img v-if="page === 'new_storage'" src="../assets/new-storage-en.png" alt="Help img 3" @click="onClickHelpImg" />
    </article>
</template>

<script>
export default {
    name: 'helpView',
    props: {
        page: {
            type: String,
            default: 'what'
        }
    },
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