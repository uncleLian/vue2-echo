<template>
    <div id="app" :class="{'musicBar-on': audio.data}">
        <!-- 视图层 -->
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <!-- 音乐控制条 -->
        <my-music-bar></my-music-bar>
        <!-- 页面加载进度条 -->
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import musicBar from '@/components/musicBar'
export default {
    components: { 'my-music-bar': musicBar },
    computed: {
        ...mapState([
            'audio'
        ])
    },
    created() {
        this.getAppCache()
        this.$Progress.start()
        this.$router.beforeEach((to, from, next) => {
            this.$Progress.start()
            next()
        })
        this.$router.afterEach((to, from) => {
            this.$Progress.finish()
        })
    },
    mounted() {
        this.$Progress.finish()
    },
    methods: {
        ...mapActions([
            'getAppCache'
        ])
    }
}
</script>
<style lang='stylus'>
#app {
    position: relative;
    &.musicBar-on {
        padding-bottom: $musicBarHeight;
    }
    a {
        color: $linkColor;
    }
}
// 重置mint-ui 样式，适配屏幕大小
.mint-indicator-wrapper {
    padding: toRem(15) !important;
    .mint-spinner-snake {
        width: toRem(32) !important;
        height: toRem(32) !important;
    }
}

[class^=mint-spinner-triple-bounce-] {
    width: toRem(8) !important;
    height: toRem(8) !important;
}
</style>
