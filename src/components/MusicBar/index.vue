<template>
    <div id="musicBarContainer">
        <div id="musicBar" v-if='audio_data'>
            <div class='music'>
                <!-- audio -->
                <audio id='audio' autoplay="autoplay" :src="audio_data.sound.source"></audio>
                <!-- 封面 -->
                <router-link class="music-cover" :to="{ name: 'detail', query: { id: audio_data.sound.id } }">
                    <img :src="audio_data.sound.pic_500">
                </router-link>
                <!-- 信息 -->
                <div class="music-info">
                    <div class="info-name">{{audio_data.sound.name}}</div>
                    <div class="info-author">{{audio_data.sound.user.name}}</div>
                </div>
                <!-- 按钮 -->
                <div class="music-control">
                    <!-- 播放列表 -->
                    <div class="my-icon-menu control-icon" @click="$refs.popup.toggleVisible()"></div>
                    <!-- 播放/暂停 -->
                    <div class="control-icon control-icon-mid" :class="audio_play ? 'my-icon-pause' : 'my-icon-arrow'" @click="SET_AUDIO_PLAY(!audio_play)"></div>
                    <!-- 下一首 -->
                    <div class="my-icon-next control-icon" @click="listRepeatMode"></div>
                </div>
            </div>
            <!-- 进度条 -->
            <div class="progress_bar">
                <div class="progress_bar_inner" :style="`width:${audio_progress}`"></div>
            </div>
        </div>
        <!-- 播放列表 & 播放模式 -->
        <app-popup ref="popup" v-if='audio_data' />
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Mutation, Action } from 'vuex-class'
import appPopup from '@/components/Popup/index.vue'

@Component({
    components: { appPopup }
})
export default class MusicBar extends Vue {
    @State(state => state.audio.ele) audio_ele: any
    @State(state => state.audio.data) audio_data: any
    @State(state => state.audio.play) audio_play: any
    @State playMode: any
    @State playList: any
    @Getter audio_progress: any
    @Mutation SET_AUDIO_ELE: any
    @Mutation SET_AUDIO_DATA: any
    @Mutation SET_AUDIO_PLAY: any
    @Mutation SET_AUDIO_DURATION: any
    @Mutation SET_AUDIO_CURREN_TIME: any
    @Mutation SET_PLAY_MODE: any
    @Mutation SET_PLAY_LIST: any

    // 切换音乐，等dom更新完后重新初始化audio
    @Watch('audio_data') onMusicChange(val: any) {
        if (val) {
            this.$nextTick(() => {
                this.AddToPlayList(val)
                this.audioInit()
            })
        }
    }
    @Watch('audio_play') onPlayChange(val: any) {
        val ? this.audio_ele.play() : this.audio_ele.pause()
    }

    audioInit() {
        // 设置audio元素
        let _audio: any = this.$el.querySelector('#audio')
        this.SET_AUDIO_ELE(_audio)
        // 可以播放
        _audio.oncanplay = () => {
            // Tip: 如果直接打开音乐详情页在一些浏览器中是不允许自动播放的，如：chrome、safari等
            _audio.play()
            // 设置时长
            this.SET_AUDIO_DURATION(_audio.duration)
        }
        // 播放位置改变
        _audio.ontimeupdate = () => {
            // 设置当前时间
            this.SET_AUDIO_CURREN_TIME(Math.floor(_audio.currentTime))
        }
        // 正在播放
        _audio.onplay = () => {
            this.SET_AUDIO_PLAY(true)
        }
        // 暂停
        _audio.onpause = () => {
            this.SET_AUDIO_PLAY(false)
        }
        // 结束
        _audio.onended = () => {
            this.SET_AUDIO_PLAY(false)
            // 加载播放模式逻辑
            switch (this.playMode) {
                case 'random':
                    this.randomMode()
                    break
                case 'singleRepeat':
                    this.singleRepeatMode()
                    break
                case 'listRepeat':
                    this.listRepeatMode()
                    break
            }
        }
    }
    // 随机播放
    randomMode() {
        // 0 ~ 播放列表的长度，随机得到一个数
        // 如果随机数对应的音乐和当前播放的音乐相同的话，采取listRepeat方法的逻辑，否则播放
        let index: number = ~~(Math.random() * this.playList.length)
        if (this.playList[index].sound.id === this.audio_data.sound.id) {
            this.listRepeatMode()
        } else {
            this.SET_AUDIO_DATA(this.playList[index])
        }
    }
    // 单曲循环
    singleRepeatMode() {
        this.audio_ele.load()
        this.audio_ele.play()
    }
    // 列表循环
    listRepeatMode() {
        // 获取当前音乐位置currentIndex
        // currentIndex是结尾的话，nextIndex就等于0，否则 +1
        // 只有一首音乐，播放模式是列表循环或者用户点击下一首的情况：重新加载并播放当前的音乐
        let currentIndex: number = this.playList.findIndex((n: any) => n.sound.id === this.audio_data.sound.id)
        if (currentIndex > -1) {
            let nextIndex: number
            currentIndex === this.playList.length - 1
                ? nextIndex = 0
                : nextIndex = currentIndex + 1
            let isCurrentSame: boolean = this.playList[nextIndex].sound.id === this.audio_data.sound.id
            if (isCurrentSame) {
                this.singleRepeatMode()
            } else {
                this.SET_AUDIO_DATA(this.playList[nextIndex])
            }
        } else {
            console.warn('正常逻辑不会到这里啊')
        }
    }
    // 添加音乐到播放列表
    AddToPlayList(item: any) {
        let ishas: boolean = false
        if (this.playList.find((n: any) => n.sound.id === item.sound.id)) {
            ishas = true
        }
        if (!ishas) {
            this.playList.unshift(item)
            this.SET_PLAY_LIST(this.playList)
        }
    }
}
</script>
<style lang='stylus'>
#musicBarContainer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    #musicBar {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        width: 100%;
        border-top: 1px solid $borderColor;
        background-color: rgba(255, 255, 255, 0.9);
        .music {
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
            height: $musicBarHeight;
            padding: 0 toRem(5);
            .music-cover {
                display: inline-block;
                width: toRem(36);
                height: toRem(36);
                overflow: hidden;
                border: 1px solid #fff;
                box-shadow: 0 0 toRem(2) rgba(0, 0, 0, 0.2);
                img {
                    display: block;
                    width: 100%;
                }
            }
            .music-info {
                flex: 1;
                font-size: toRem(12);
                padding: 0 toRem(8);
                overflow: hidden;
                .info-name {
                    text-ellipsis();
                }
                .info-author {
                    text-ellipsis();
                    margin-top: toRem(5);
                }
            }
            .music-control {
                display: flex;
                align-items: center;
                .control-icon {
                    flex-center();
                    width: toRem(34);
                    height: toRem(34);
                    line-height: 1;
                    color: $normalColor;
                    font-size: toRem(22);
                    margin: 0 toRem(8);
                    border: 1px solid $normalColor;
                    border-radius: 100%;
                    background: #fff;
                    &.control-icon-mid {
                        width: toRem(38);
                        height: toRem(38);
                        font-size: toRem(26);
                    }
                }
            }
        }
        .progress_bar {
            height: toRem(1.5);
            background: rgba(255, 255, 255, 0.9);
            .progress_bar_inner {
                width: 0%;
                height: 100%;
                background-color: $appColor;
            }
        }
    }
}
</style>
