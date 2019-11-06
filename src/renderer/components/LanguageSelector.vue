<template>
    <div class="language-selector">
        <a href="javascript:" @click="onClick" :class="current"></a>
    </div>    
</template>
<script>
export default {
    data: () => {
        return {
            current: 'en',
            alowed: ['en', 'ru']
        }        
    },
    methods: {
        onClick: function() {
            const pos = this.alowed.indexOf(this.current);
            if (pos + 1 >= this.alowed.length) {
                this.current = this.alowed[0];
            } else {
                this.current = this.alowed[pos + 1];
            }
            this.$emit('switch', this.current);
        }
    }
}
</script>
<style lang="scss" scoped>
.language-selector {
    margin-top: 2px;
    a {
        display: inline-block;
        width: 30px;
        height: 20px;
        background-size: 100% 200%;
        background-image: url('../assets/lang-flags.png');
        background-repeat: no-repeat;
        &.en {
            background-position: 0% 0%;
        }
        &.ru {
            background-position: 0% 100%;
        }
    }
}
</style>