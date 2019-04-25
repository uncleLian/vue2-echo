<template>
    <div id="app" :class="{'musicBar-on': audio.data}">
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
<script>
import { mapState, mapActions } from 'vuex'
import MusicBar from '@/components/MusicBar'
export default {
    components: { MusicBar },
    computed: {
        ...mapState([
            'audio'
        ])
    },
    created() {
        this.INIT_APP_CACHE()
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
            'INIT_APP_CACHE'
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
</style>
