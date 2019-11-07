<template>
  <div id="indexPage" :class="theme" :style="styleFormatter">
    <header class="helper container">
        <div class="row">
            <div class="col-sm-2"><a @click="onClickNewBtn" href="#" :title="LanguageHelper.t('StartNewButtonHint')">{{ LanguageHelper.t('StartNewButton') }}</a></div>
            <div class="col-sm-5"></div>  
            <div class="col-sm-2"><a @click="onClickResetBtn" href="#" :title="LanguageHelper.t('ResetButtonHint')">{{ LanguageHelper.t('ResetButton') }}</a></div>  
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
                <button class="doc" @click="onClickRageButton">{{ LanguageHelper.t('RageButton') }}</button>
            </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
            <button class="cool-down"> Cool down </button>
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
        saturation: {
            type: Number,
            default: 1
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
        styleFormatter: function () {
            return 'filter: saturate(' + this.saturation + ');';
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
        onClickResetBtn: function() {
            this.$emit('reset');
        },
        onClickRageButton: function() {
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
    -webkit-transition: background-color 1000ms linear;
    -ms-transition: background-color 1000ms linear;
    transition: background-color 1000ms linear;
    @mixin theme($color, $inverse) {
        background-color: $color;
        button.doc {
            background-color: $color;
            @if $inverse == 1 {
                color:rgb(255, 255, 255);
                border: 1px solid rgba(255, 255, 255, 0.473);
            } @else {
                color:rgb(0, 0, 0);
                border: 1px solid rgb(0, 0, 0);
            }
        }
        .cool-down {
            background-color: $color;
            border: 1px solid rgb(0, 141, 206);
            border-radius: 5px;
            color: rgb(0, 141, 206);
            &:hover {
                box-shadow: 0 0 5px rgb(0, 141, 206);
            }
        }
    }
    &.white {
        @include theme(rgb(255, 255, 255), 0);
    }
    &.white-yellow {
        @include theme(rgb(255, 255, 205), 0);
    }
    &.yellow {
        @include theme(rgb(255, 255, 124), 0);
    }
    &.yellow-red {
        @include theme(rgb(138, 69, 6), 1);
    }
    &.red {
        @include theme(rgb(146, 0, 0), 1);
    }
    &.black {
        @include theme(rgb(31, 0, 0), 1);
    }
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
        margin: 28% 7rem;
        button.doc {
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
            &:hover {
                box-shadow: 0 0 15px rgba(0,0,0,0.5);
            }
            &:active {
                box-shadow: 0 0 5px rgba(0,0,0,0.5);
            }
        }
    }
}
</style>