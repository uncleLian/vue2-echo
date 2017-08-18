<template>
    <div id="sound_bar">
        <div class='sound' v-if='current_sound_data'>
            <audio id='audio' autoplay="autoplay" :src="current_sound_data.sound.source"></audio>
            <router-link class="cover" tag='div' :to="`/detail/${current_sound_data.sound.id}`">
                <img :src="current_sound_data.sound.pic_500">
            </router-link>
            <div class="info">
                <p class="name">{{current_sound_data.sound.name}}</p>
                <p class="author">{{current_sound_data.sound.user.name}}</p>
            </div>
            <div class="control">
                <mu-icon-button class='menu_btn'></mu-icon-button>
                <mu-icon-button class='play_btn' :class="play?'pause':'play'" @click.stop.native="set_play(!play)"></mu-icon-button>
                <mu-icon-button class='next_btn'></mu-icon-button>
            </div>
        </div>
        <div class="progress_bar"></div>
    </div>
    
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'current_sound_data',
            'play',
            'duration',
            'currentTime'
        ])
    },
    watch: {
        current_sound_data(val) {
            this.$nextTick(() => {
                this.audio_init()
            })
        },
        play(val) {
            console.log(val)
            let _audio = this.$el.querySelector('#audio')
            if (val) {
                _audio.play()
            } else {
                _audio.pause()
            }
        }
    },
    methods: {
        ...mapMutations([
            'set_play',
            'set_duration',
            'set_currentTime',
            'set_progress'
        ]),
        audio_init() {
            let _audio = this.$el.querySelector('#audio')
            _audio.oncanplay = () => {
                _audio.play()
                this.set_duration(_audio.duration)
            }
            _audio.onplay = () => {
                this.set_play(true)
            }
            _audio.onpause = () => {
                this.set_play(false)
            }
            _audio.onended = () => {
                this.set_play(false)
            }
            _audio.ontimeupdate = () => {
                this.set_currentTime(~~_audio.currentTime)
                this.set_progress((_audio.currentTime / _audio.duration * 100).toFixed(2) + '%')
            }
        }
    }
}
</script>
<style scoped lang='stylus'>
#sound_bar{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 222;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    background-color: rgba(255,255,255,0.7);
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
            
        }
    }
    .progress_bar{
        width: 100%;
        height: 2px;
        background: rgba(110,213,108,0.2)
    }
}


</style>
