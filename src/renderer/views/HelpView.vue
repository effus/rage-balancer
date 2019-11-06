<template>
    <article id="help-view">
        <img :src="getImgPath" alt="Help img 1" @click="onClickHelpImg" />
        <!-- img v-if="page === 'new_storage'" src="../assets/new-storage-en.png" alt="Help img 3" @click="onClickHelpImg" / -->
    </article>
</template>

<script>
import {LanguageHelper} from '../helpers/LanguageHelper.js';
export default {
    name: 'helpView',
    props: {
        page: {
            type: String,
            default: 'what'
        },
        locale: {
            type: String,
            default: 'en'
        }
    },
    data: () => {
        return {
            LanguageHelper
        }
    },
    computed: {
        getImgPath: function() {
            return LanguageHelper.t('HelpPage_' + this.page);
        }
    },
    methods: {
        onClickHelpImg: function() {
            this.$emit('hide-help');
        }
    },
    watch: {
        locale: function(val) {
            this.LanguageHelper.setLocale(val);
        }
    }
}
</script>

<style lang="scss">
#help-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 500px;
    height: 400px;
}
</style>