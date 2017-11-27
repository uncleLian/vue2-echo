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
                <mu-icon-button class='control-icon-btn small' icon="queue_music"  @click.stop="$refs.sheet.toggleVisible()" />
                <!-- 播放/暂停 -->
                <mu-icon-button class='control-icon-btn' :icon="audio_play? 'pause' : 'play_arrow'"  @click.stop="set_audio_play(!audio_play)" />
                <!-- 下一首按钮 -->
                <mu-icon-button class='control-icon-btn small' icon="skip_next"  @click.stop="listRepeat" />
            </div>
        </div>

        <!-- 进度条 -->
        <div class="progress_bar" :style="`width:${audio_progress}`"></div>
        
        <!-- 播放列表/播放模式 -->
        <my-sheet ref="sheet"></my-sheet>

    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'audio_ele', // auido元素
            'audio_data', // 当前播放的音乐数据
            'audio_play', // audio播放状态
            'audio_duration', // audio 时长
            'audio_currentTime', // audio当前秒数s的播放进度
            'audio_progress', // audio当前百分比%的播放进度
            'playMode', // 播放模式
            'playList'  // 播放列表
        ])
    },
    watch: {
        audio_data(val) {
            // 当前audio数据改变了，等dom更新完，初始化audio
            if (val) {
                this.$nextTick(() => {
                    this.audio_init()
                })
            }
        },
        audio_play(val) {
            val ? this.audio_ele.play() : this.audio_ele.pause()
        }
    },
    methods: {
        ...mapMutations([
            'set_audio_data',   // 设置audio数据
            'set_audio_ele',    // 设置audio元素
            'set_audio_play',   // 设置audio播放状态
            'set_audio_duration',   // 设置audio时长
            'set_audio_currentTime',    // 设置audio当前进度
            'set_audio_playMode',   // 设置播放模式
            'set_playList'  // 设置播放列表数据
        ]),
        // audio元素初始化
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
            switch (this.playMode) {
                case 'random': this.randomPlay()
                break
                case 'singleRepeat': this.singleRepeat()
                break
                case 'listRepeat': this.listRepeat()
                break
            }
        },
        // 随机播放
        randomPlay() {
            // 0 ~ 播放列表的长度，随机得到一个数
            // 如果随机数对应的音乐和当前播放的音乐相同的话，采取listRepeat方法的逻辑，否则播放
            let index = Math.floor(Math.random() * this.playList.length)
            if (this.playList[index].sound.id === this.audio_data.sound.id) {
               this.listRepeat()
            } else {
                this.set_audio_data(this.playList[index])
            }
        },
        // 单曲循环
        singleRepeat() {
            this.audio_ele.load()
            this.audio_ele.play()
        },
        // 列表循环
        listRepeat() {
            // 获取当前音乐位置currentIndex
            // currentIndex是结尾的话，nextIndex就等于0，否则 +1
            // 只有一首音乐，播放模式是列表循环或者用户点击下一首歌的情况，重新加载并播放当前的音乐
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
            font-size: 12px;
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
</style>
