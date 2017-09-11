<template>
    <div id="musicBar" v-if='audio_data'>

        <div class='sound'>
            <!-- audio -->
            <audio id='audio' autoplay="autoplay" :src="audio_data.sound.source"></audio>

            <!-- 封面 -->
            <router-link class="cover" tag='a' :to="`/detail/${audio_data.sound.id}`">
                <img :src="audio_data.sound.pic_500">
            </router-link>

            <!-- 信息 -->
            <div class="info">
                <p class="name">{{audio_data.sound.name}}</p>
                <p class="author">{{audio_data.sound.user.name}}</p>
            </div>

            <!-- 控制 -->
            <div class="control">
                <!-- 列表按钮 -->
                <mu-icon-button class='control-icon-btn small playList_btn' icon="queue_music"  @click.stop="playList_visible = !playList_visible" />
                <!-- 播放按钮 / 暂停按钮 -->
                <mu-icon-button class='control-icon-btn play_btn' :icon="audio_play? 'pause' : 'play_arrow'"  @click.stop="set_audio_play(!audio_play)" />
                <!-- 下一首按钮 -->
                <mu-icon-button class='control-icon-btn small next_btn' icon="skip_next"  @click.stop="playNextSound" />
            </div>
        </div>

        <!-- 进度条 -->
        <div class="progress_bar" :style="`width:${audio_progress}`"></div>
            
        <!-- 播放列表 -->
        <mu-bottom-sheet sheetClass='playListSheet' :open="playList_visible" @close="playList_visible = false"  overlayColor='#fff' :overlayOpacity="0">
            <div class="playList-header">
                播放列表<span>（{{playList.length}}首）</span>
                <!-- 播放模式按钮 -->
                <mu-icon-button class="playMode_btn" :icon="playMode_icon" @click.stop="playMode_visible = true" />
            </div>
            <mu-list class='list'>
                <mu-list-item class="list-item" v-for="(item, index) in playList" :key="index" :class="{'playing': audio_data.sound.id === item.sound.id}" @click.stop="set_audio_data(item)">
                    <mu-icon class="playing_icon" v-show="audio_data.sound.id === item.sound.id" slot="left" value="play_circle_filled" />
                    {{item.sound.name}}
                    <mu-icon class="close_btn" slot="right" value="close" @click.stop="deleteItem(item)"/>
                </mu-list-item>
                <!-- nothing -->
                <mu-list-item class="list-item list-item-nothing" v-if="playList.length === 0">什么都没有了T T~ </mu-list-item>
            </mu-list>
        </mu-bottom-sheet>
        
        <!-- 播放模式 -->
        <mu-bottom-sheet sheetClass='playModeSheet' :open="playMode_visible" @close="playMode_visible = false" >
            <mu-list class="list" :value="playMode" @change="playModeChange">
                <mu-list-item class="list-item" v-for="(item, index) in playMode_item" :key="index"  :title="item.title" :value="item.val">
                    <mu-icon  slot="right" :value="item.icon" />
                </mu-list-item>
            </mu-list>
        </mu-bottom-sheet>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
            playList_visible: false,
            playMode_visible: false,
            playMode_item: [
                {title: '默认', val: 'default', icon: 'more_vert'},
                {title: '随机播放', val: 'random', icon: 'all_inclusive'},
                {title: '单曲循环', val: 'singleRepeat', icon: 'repeat_one'},
                {title: '列表循环', val: 'listRepeat', icon: 'repeat'}
            ]
        }
    },
    computed: {
        ...mapGetters([
            'audio_data',
            'audio_ele',
            'audio_play',
            'audio_duration',
            'audio_currentTime',
            'audio_progress',
            'playMode',
            'playList'
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
            this.playList_visible = false
            this.playMode_visible = false
        },
        audio_data(val) {
            if (val) {
                this.$nextTick(() => {
                    if (this.$route.path.includes('detail')) {
                        this.$router.push(`/detail/${val.sound.id}`)
                    }
                    this.audio_init()
                })
            }
        },
        audio_play(val) {
            if (val) {
                this.audio_ele.play()
            } else {
                this.audio_ele.pause()
            }
        }
    },
    methods: {
        ...mapMutations([
            'set_audio_data',
            'set_audio_ele',
            'set_audio_play',
            'set_audio_duration',
            'set_audio_currentTime',
            'set_audio_playMode',
            'set_playList'
        ]),
        audio_init() {
            let _audio = this.$el.querySelector('#audio') // 获取audio元素
            this.set_audio_ele(_audio) // 设置audio元素
            // 可以播放
            _audio.oncanplay = () => {
                _audio.play()
                this.set_audio_duration(_audio.duration)
            }
            // 播放位置改变
            _audio.ontimeupdate = () => {
                this.set_audio_currentTime(~~_audio.currentTime)
            }
            // 播放
            _audio.onplay = () => {
                this.set_audio_play(true)
            }
            // 暂停
            _audio.onpause = () => {
                this.set_audio_play(false)
            }
            // 结束
            _audio.onended = () => {
                this.set_audio_play(false)
                this.playMode_init() // 加载播放模式
            }
        },
        playMode_init() {
            // 随机播放
            if (this.playMode === 'random') {
                let index = Math.floor(Math.random() * this.playList.length)
                if (this.playList[index].sound.id === this.audio_data.sound.id) {
                   this.playNextSound()
                } else {
                    this.set_audio_data(this.playList[index])
                }
            // 单曲循环
            } else if (this.playMode === 'singleRepeat') {
                this.audio_ele.load()
                this.audio_ele.play()
            // 列表循环
            } else if (this.playMode === 'listRepeat') {
                this.playNextSound()
            }
        },
        playModeChange(val) {
            this.set_audio_playMode(val)
            this.playMode_visible = false
        },
        playNextSound() {
            let currentIndex = this.playList.findIndex(n => n.sound.id === this.audio_data.sound.id)
            if (currentIndex > -1) {
                let nextIndex
                currentIndex === this.playList.length - 1 ? nextIndex = 0 : nextIndex = currentIndex + 1
                if (this.playList[nextIndex].sound.id === this.audio_data.sound.id) {
                    this.audio_ele.load()
                    this.audio_ele.play()
                } else {
                    this.set_audio_data(this.playList[nextIndex])
                }
            } else {
                console.warn('正常逻辑不会到这里啊')
            }
        },
        deleteItem(item) {
            let index = this.playList.findIndex(n => n.sound.id === item.sound.id)
            this.playList.splice(index, 1)
            this.set_playList(this.playList)
        }
    }
}
</script>
<style lang='stylus'>
#musicBar{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 20170821;
    width: 100%;
    background-color: rgba(255,255,255,0.9);
    border-top: 1px solid #e8e8e8;
    .sound{
        position: relative;
        width: 100%;
        height: 1.3rem;
        padding: 0 0.14rem;
        display: flex;
        align-items: center;
        .cover{
            display: inline-block;
            width: 1rem;
            height: 1rem;
            border: 1px solid #fff;
            box-shadow: 0 0 2px rgba(0,0,0,.2);
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
        .control{
            color: #666;
            .control-icon-btn{
                width: 38px;
                height: 38px;
                color: #5e5e5e;
                padding: 6px;
                border: 1px solid #5e5e5e;
                border-radius: 50%;
                background: #fff;
                margin-right: 8px;
                &.small{
                    width: 34px;
                    height: 34px;
                    padding: 5px;
                }
            }
        }
    }
    .progress_bar{
        width: 0%;
        height: 1.5px;
        background: #6ed56c
    }
}
.playListSheet{
    max-height: 5rem;
    bottom: 1.3rem;
    border-top: 1px solid #eee;
    .playList-header{
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
        position: relative;
        max-height: 4rem;
        overflow-x: hidden;
        .list-item{
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
            &.playing .mu-item{
                color: #333;
            }
            &:last-child .mu-item{
                border: none;
            }
            .mu-item{
                font-size: 14px;
                color: #999;
                padding: 0.3rem 45px 0.3rem 1rem;
                border-bottom: 1px solid #f4f4f4;
                min-height: 0;
                .mu-item-content{
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .mu-item-left{
                    left: 0.5rem;
                    margin-left: -5px;
                }
                .mu-item-right{
                    right: 5px;
                }
            }
            .playing_icon{
                color: #6ed56c;
                font-size: 18px;
            }
            .close_btn{
                font-size: 16px;
                color: #bababa;
                border:1px solid #bababa;
                border-radius: 100%;            
            }
        }
        .list-item-nothing{
            text-align: center;
            font-size: 14px;
            color: #9B9B9B;
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
