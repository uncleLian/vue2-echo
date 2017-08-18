<template>
    <div id="app">
        <transition name='fade'>
            <keep-alive exclude='detail'>
                <router-view class='child-view'></router-view>
            </keep-alive>
        </transition>
        <music-bar></music-bar>
    </div>
</template>
<script>
import '@/assets/css/reset.css'
import musicBar from '@/components/music_bar'
export default {
    components: { musicBar }
}
</script>
<style lang='stylus'>
#app {
    width: 100%;
    position: relative;
    background: #ebebeb;
}
.fade-enter,.fade-leave-active{
    opacity: 0;
}
.fade-enter-active,.fade-leave{
    opacity: 1;
}
.fade-enter-active,.fade-leave-active{
    transition: all 0.3s ease
}
</style>