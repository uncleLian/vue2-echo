<template>
    <div id="sound_bar" v-if='current_sound_data'>
        <div class='sound'>
            <!-- audio -->
            <audio id='audio' autoplay="autoplay" :src="current_sound_data.sound.source"></audio>

            <!-- 封面 -->
            <router-link class="cover" tag='div' :to="`/detail/${current_sound_data.sound.id}`">
                <img :src="current_sound_data.sound.pic_500">
            </router-link>

            <!-- 信息 -->
            <div class="info">
                <p class="name">{{current_sound_data.sound.name}}</p>
                <p class="author">{{current_sound_data.sound.user.name}}</p>
            </div>

            <!-- 控制 -->
            <div class="control">
                <mu-icon-button class='playList_btn' @click.stop.native="playList_state = !playList_state" />
                <mu-icon-button class='play_btn'  :class="play?'pause':'play'" @click.stop.native="set_play(!play)" />
                <mu-icon-button class='next_btn' @click.stop.native="playNextSound" />
            </div>
        </div>

        <!-- 进度条 -->
        <div class="progress_bar" :style="`width:${progress}`"></div>
            
        <!-- 播放列表 -->
        <mu-bottom-sheet sheetClass='playListSheet' :open="playList_state" @close="playList_state = false"  overlayColor='#fff' :overlayOpacity="0"> 
            <div class="title">
                播放列表<span>（{{playList.length}}首）</span>
                <mu-icon-button :icon="playMode_icon" class="playMode_btn" @click.stop="playMode_state = true" />
            </div>
            <mu-list class='list'>
                <mu-list-item class="list_item" v-for="(item,index) in playList" :key="index" :class="{'play':current_sound_data.sound.id === item.sound.id}" @click.stop="set_current_sound_data(item)">{{item.sound.name}}</mu-list-item>
            </mu-list>
        </mu-bottom-sheet>
        
        <!-- 播放模式 -->
        <mu-bottom-sheet sheetClass='playModeSheet' :open="playMode_state" @close="playMode_state = false" >
            <mu-list class="list" :value="playMode" @change="playModeChange">
                <mu-list-item class='list_item' value='default' title='默认'><mu-icon  slot="right" value="more_vert" /></mu-list-item>
                <mu-list-item class='list_item' value='random' title='随机播放'><mu-icon  slot="right" value="all_inclusive" /></mu-list-item>
                <mu-list-item class='list_item' value='singleRepeat' title='单曲循环'><mu-icon  slot="right" value="repeat_one" /></mu-list-item>
                <mu-list-item class='list_item' value='listRepeat' title='列表循环'><mu-icon  slot="right" value="repeat" /></mu-list-item>
            </mu-list>
        </mu-bottom-sheet>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
            playList_state: false,
            playMode_state: false
        }
    },
    computed: {
        ...mapGetters([
            'current_sound_data',
            'playList',
            'audio',
            'play',
            'duration',
            'currentTime',
            'progress',
            'playMode'
        ]),
        playMode_icon() {
            switch (this.playMode) {
                case 'random': return 'all_inclusive'
                case 'listRepeat': return 'repeat'
                case 'singleRepeat': return 'repeat_one'
                default: return 'more_vert'
            }
        }
    },
    watch: {
        $route(val) {
            this.playList_state = false
            this.playMode_state = false
        },
        current_sound_data(val) {
            if (val) {
                this.$nextTick(() => {
                    this.audio_init()
                })
            }
        },
        play(val) {
            if (val) {
                this.audio.play()
            } else {
                this.audio.pause()
            }
        }
    },
    methods: {
        ...mapMutations([
            'set_current_sound_data',
            'set_play',
            'set_audio',
            'set_duration',
            'set_currentTime',
            'set_playMode'
        ]),
        audio_init() {
            let _audio = this.$el.querySelector('#audio')
            this.set_audio(_audio)
            _audio.oncanplay = () => {
                _audio.play()
                this.set_duration(_audio.duration)
            }
            _audio.ontimeupdate = () => {
                this.set_currentTime(~~_audio.currentTime)
            }
            _audio.onplay = () => {
                this.set_play(true)
            }
            _audio.onpause = () => {
                this.set_play(false)
            }
            _audio.onended = () => {
                this.set_play(false)
                if (!this.$route.path.includes('detail')) {
                    if (this.playMode === 'random') {
                        let index = Math.floor(Math.random() * this.playList.length)
                        if (this.playList[index].sound.id === this.current_sound_data.sound.id) {
                           this.playNextSound()
                        } else {
                            this.set_current_sound_data(this.playList[index])
                        }
                    } else if (this.playMode === 'singleRepeat') {
                        _audio.load()
                        _audio.play()
                    } else if (this.playMode === 'listRepeat') {
                        this.playNextSound()
                    }
                }
            }
        },
        playNextSound() {
            let currentIndex = this.playList.findIndex(n => n.sound.id === this.current_sound_data.sound.id)
            let nextIndex
            if (this.playList.length > 1 && currentIndex > -1) {
                if (currentIndex === this.playList.length - 1) {
                    nextIndex = 0
                } else {
                    nextIndex = currentIndex + 1
                }
                this.set_current_sound_data(this.playList[nextIndex])
            } else {
                this.audio.load()
                this.audio.play()
            }
        },
        playModeChange(val) {
            this.set_playMode(val)
            this.playMode_state = false
        }
    }
}
</script>
<style scoped lang='stylus'>
#sound_bar{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 20170821;
    width: 100%;
    background-color: rgba(255,255,255,0.9);
    .sound{
        position: relative;
        width: 100%;
        height: 1.28rem;
        padding: 0 0.14rem;
        display: flex;
        align-items: center;
        .cover{
            display: inline-block;
            width: 1rem;
            height: 1rem;
            overflow: hidden;
            img{
                width: 100%;
            }
        }
        .info{
            flex: 1;
            overflow: hidden;
            padding: 0 0.2rem;
            p{
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }
        .controls{
            color: #666;
        }
    }
    .progress_bar{
        width: 0%;
        height: 1.5px;
        background: #6ed56c
    }
    
}
</style>
<style lang='stylus'>
.playListSheet{
    max-height: 6rem;
    bottom: 1.28rem;
    border-top: 1px solid #eee;
    .title{
        position: relative;
        height: 1rem;
        line-height: 1rem;
        font-size: 14px;
        color: #6ed56c;
        text-align: center;
        margin-top: 0.2rem;
        span{
            font-size: 12px;
        }
        .playMode_btn{
            position: absolute;
            right: 5px;
            top: 0;
            width: 1rem;
            height: 1rem;
            padding: 0;
            .mu-icon{
                font-size: 20px;
            }
        }
    }
    .list{
        max-height: 5rem;
        overflow-x: hidden;
        overflow-y: auto;
        .list_item{
            position: relative;
            &:before{
                content: "";
                position: absolute;
                width: 5px;
                height: 5px;
                left: 0.5rem;
                top: 20px;
                border-radius: 50%;
                background-color: #e8e8e8;
            }
            &.play:before{
                content: "";
                position: absolute;
                width: 0;
                height: 0;
            }
            &.play .mu-item{
                color: #666;
            }
            &:last-child .mu-item{
                border: none;
            }
            .mu-item{
                font-size: 14px;
                color: #999;
                padding: 0.3rem 0;
                margin-left: 1rem;
                margin-right: 0.6rem;
                border-bottom: 1px solid #f4f4f4;
                min-height: 0;
                .mu-item-content{
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
        }
    }
}
.playModeSheet{
    z-index: 20170822 !important;
    .list{
        .list_item{
            .mu-item-title{
                font-size: 14px;
            }
            .mu-item.selected{
                .mu-item-right{
                    color: #6ed56c;
                }
                .mu-item-title{
                    color: #6ed56c;
                }
            }
        }
    }
}
</style>
<style>
    .next_btn{
        background: url(~@/assets/img/next.png) no-repeat center center !important;
        background-size: 36px !important;
    }
    .play_btn.play{
        background: url(~@/assets/img/play-black.png) no-repeat center center !important;
        background-size: 36px !important;
    }
    .play_btn.pause{
        background: url(~@/assets/img/pause-black.png) no-repeat center center !important;
        background-size: 36px !important;
    }
    .playList_btn{
        background: url(~@/assets/img/playList.png) no-repeat center center !important;
        background-size: 36px !important;
    }
    .playListSheet .list_item.play{
        background: url(~@/assets/img/icon-play.png) no-repeat 0.35rem 46% !important;
        background-size: 16px !important;
    }
</style>
