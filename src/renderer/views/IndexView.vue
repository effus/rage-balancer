<template>
  <div id="indexPage" :class="theme">
    <header class="helper container">
        <div class="row">
            <div class="col-sm-2"><a @click="onClickNewBtn" href="#" :title="LanguageHelper.t('StartNewButtonHint')">{{ LanguageHelper.t('StartNewButton') }}</a></div>
            <div class="col-sm-7"></div>  
            <div class="col-sm-2"><a @click="onClickHelpBtn" href="#" :title="LanguageHelper.t('WhatButtonHint')">{{ LanguageHelper.t('WhatButton') }}</a></div>
            <div class="col-sm-1">
                <language-selector v-on:switch="onSwitchLanguage"></language-selector>
            </div>
        </div>
    </header>
    <main class="btn-area">
      <div class="row">
        <div class="col-sm-12">
            <div class="button-group">
                <button class="doc" @click="onRageButtonClick">{{ LanguageHelper.t('RageButton') }} {{$store.getters.getLastMeasure}}</button>
            </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import LanguageSelector from '../components/LanguageSelector.vue';
import {LanguageHelper} from '../helpers/LanguageHelper.js';
export default {
    name: 'indexView',
    components: {
        LanguageSelector
    },
    props: {
        theme: {
            type: String,
            default: 'white'
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
    mounted: function() {
        this.LanguageHelper.setLocale(this.locale);
    },
    methods: {
        onClickHelpBtn: function() {
            this.$emit('help');
        },
        onClickNewBtn: function() {
            this.$emit('new');
        },
        onRageButtonClick: function() {
            this.$emit('rage');
        },
        onSwitchLanguage: function(payload) {
            this.$emit('switch-language', payload);
        }
    },
    watch: {
        locale: function(val) {
            this.LanguageHelper.setLocale(val);
        }
    }
}
</script>

<style lang="scss" scoped>
#indexPage {
    width: 500px;
    height: 400px;
    border: 1px solid grey;
}
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