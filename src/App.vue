<template>
    <div id="app">
        <!-- 视图层 -->
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <!-- 音乐控制条 -->
        <music-bar />
        <!-- 页面加载进度条 -->
        <vue-progress-bar />
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation, Action } from 'vuex-class'
import MusicBar from '@/components/MusicBar/index.vue'

@Component({
    components: { MusicBar }
})
export default class index extends Vue {
    @Action INIT_APP_CACHE: any
    created() {
        this.INIT_APP_CACHE()

        this.$Progress.start()
        this.$router.beforeEach((to: any, from: any, next: any) => {
            this.$Progress.start()
            next()
        })
        this.$router.afterEach((to: any, from: any) => {
            this.$Progress.finish()
        })
    }
    mounted() {
        this.$Progress.finish()
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
