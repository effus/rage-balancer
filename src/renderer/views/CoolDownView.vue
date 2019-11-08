<template>
    <main class="cool-down-area">
        <div class="bg" :style="styleRender"></div>
        <h5>{{coolDownAdvice}}</h5>
        <progress class="coolbar" :value="barPercent" max="100"></progress>
    </main>
</template>

<script>
import {LanguageHelper} from '../helpers/LanguageHelper.js';
export default {
    name: "CoolDownView",
    props: {
        startCount: {
            type: Number,
            default: 0
        },
        clicks: {
            type: Number,
            default: 0
        }
    },
    computed: {
        styleRender: function() {
            return 'top:45%;width:72%;padding:6%;';
        },
        barPercent: function() {
            if (this.startCount === 0) {
                return 0;
            }
            const prc = Math.round(this.clicks / this.startCount * 100);
            return 100 - prc;
        },
        coolDownAdvice: function() {
            return LanguageHelper.t('CoolDownAdvice1');
        }
    }
}
</script>

<style lang="scss">
@keyframes image_blur {
    0% { top: 45%; width: 70%; padding: 2%; left: 6%; height: 15%; filter: blur(5px);}
    50% { top: 15%; width: 80%; padding: 6% 2%; left: 0%; height: 55%; filter: blur(25px);}
    100% { top: 45%; width: 70%; padding: 2%; left: 6%; height: 15%; filter: blur(5px);}
}
progress.coolbar {
    position: absolute;
}
.cool-down-area {
    width: 100%;
    height: 80%;
    display: block;
    position: relative;
    .bg {
        position: absolute;
        top: 45%;
        left: 4%;
        height: 15%;
        margin: auto 40px;
        padding: 2%;
        border-radius: 25px;
        background-color: #ffffff;
        filter: blur(5px);
        transition: filter 1000ms linear;
        animation: image_blur 4s;
        animation-iteration-count:infinite;
    }
    h5 {
        position: absolute;
        top: 45%;
        margin: auto 50px;
        text-align: center;
        width: calc(80% - 40px);
        padding: 20px;
        color: #008dce;
    }
}
</style>