<template>
    <div id="app" :class="{'music_bar-on': audio_data}">
        <!-- 内容层 -->
        <transition name='fade'>
            <keep-alive>
                <router-view/></router-view>
            </keep-alive>
        </transition>
        <!-- 音乐控制条 -->
        <music-bar></music-bar>
        <!-- 页面加载进度条 -->
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>
<script>
import '@/assets/css/reset.css'
import 'material-design-icons/iconfont/material-icons.css'
import fastClick from 'fastclick'
import { mapGetters, mapMutations } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'audio_data'
        ])
    },
    methods: {
        ...mapMutations([
            'set_app_cache'
        ]),
        init() {
            $(function () {
                fastClick.attach(document.body)
            })
            this.set_app_cache()
        }
    },
    created() {
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
        this.init()
        this.$Progress.finish()
    }
}
</script>
<style lang='stylus'>
#app {
    position: relative;
    width: 100%;
    height: 100%;
    background: #eee;
    overflow: hidden;
    &.music_bar-on{
        padding-bottom: 1.3rem;
    }
}
.fade-enter,.fade-leave-active{
    opacity: 0;
}
.fade-enter-active,.fade-leave{
    opacity: 1;
}
.fade-enter-active,.fade-leave-active{
    transition: all 0.2s ease
}
</style>