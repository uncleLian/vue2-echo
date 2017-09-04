<template>
    <div id="app" :class="{'music_bar-on': visible}">
        <!-- 内容层 -->
        <transition name='fade'>
            <keep-alive exclude='detail'>
                <router-view class='child-view'></router-view>
            </keep-alive>
        </transition>
        <!-- 导航层 -->
        <music-bar v-show='visible'></music-bar>
        <vue-progress-bar/>
    </div>
</template>
<script>
import '@/assets/css/reset.css'
import fastClick from 'fastclick'
import musicBar from '@/components/music_bar'
import { mapGetters, mapActions } from 'vuex'
export default {
    components: { musicBar },
    data() {
        return {
            visible: false
        }
    },
    computed: {
        ...mapGetters([
            'current_sound_data'
        ])
    },
    watch: {
        $route(to, from) {
            // if (to.path.includes('detail')) {
            //     this.visible = false
            // } else if (this.current_sound_data) {
            //     this.visible = true
            // }
            if (this.current_sound_data) {
                this.visible = true
            }
        }
    },
    methods: {
        ...mapActions([
            'get_app_cache'
        ]),
        init() {
            $(function () {
                fastClick.attach(document.body)
            })
            this.get_app_cache()
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