<template>
    <div id='detail' v-if='json'>
        <div class="top_user">
            <a class="user_img">
                <img :src="json.sound.user.avatar_50">
                <img class='v-icon' src="https://ws-qn-echo-image-cdn.app-echo.com/Foz1CX1MdKHnTiDV26btgAmDJ3Y-?imageMogr2/auto-orient/quality/100%7CimageMogr2/thumbnail/!100x100r/gravity/Center/crop/100x100/dx/0/dy/0">
            </a>
            <a class="user_name">{{json.sound.user.name}}</a>
            <a class='user_fans'>粉丝 <em>{{json.sound.user.followed_count}}</em></a>
        </div>
        <div class="sound_cover">
            <img :src="json.sound.pic_500">
            <div class="progress_bar">
                <span :style="`width:${progress}`"></span>
                <em>{{currentTime | sec2his}}/{{duration | sec2his}}</em>
            </div>
            <div class="controls">
                <div class="controls_btn" :class="play?'pause':'play'" @click.stop='audio_play_toggle'></div>
                <div class="info">
                    <p class="sound_name">{{json.sound.name}}</p>
                    <p>
                        <a class="sound_author"><em>{{json.sound.user.name}}</em></a>
                         发布在 
                        <a class='sound_channel'><em>{{json.sound.channel.name}}</em></a>
                        频道
                    </p>
                </div>
                <div class="danmu" :class="danmu? 'on': 'off'"></div>
            </div>
        </div>
        <div class="sound_info">
            <div class="info_bar">
                <div class="play_num">100000+ 播放</div>
                <div class="like_num">{{json.sound.like_count}} 喜欢</div>
                <div class="to_bell_btn">设为手机铃声</div>
            </div>
            <div class="info_lyric" v-if='json.sound.song_info'>
                <p v-if='json.sound.song_info.album_name'>{{json.sound.song_info.album_name.type}} : {{json.sound.song_info.album_name.name}}</p>
                <p v-if='json.sound.song_info.author'>{{json.sound.song_info.author.type}} : {{json.sound.song_info.author.name}}</p>
                <p v-if='json.sound.song_info.name'>{{json.sound.song_info.name.type}} : {{json.sound.song_info.name.name}}</p>
            </div>
        </div>
        <div class="sound_more">
            <h4>相关推荐</h4>
            <div class="recommend">
                <my-list :json='recommentJson'></my-list>
            </div>
        </div>
    </div>
</template>
<script>
import Util from '@/config/util.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'detail',
    data() {
        return {
            json: null,
            danmu: false,
            recommentJson: []
        }
    },
    computed: {
        ...mapGetters([
            'current_sound_data',
            'play',
            'currentTime',
            'duration',
            'progress'
        ])
    },
    filters: {
        sec2his: Util.sec2his
    },
    watch: {
        currentTime(val) {
            this.currentTime_change = val
        },
        currentTime_change(val) {
            this.set_currentTime(val)
        }
    },
    methods: {
        ...mapMutations([
            'set_current_sound_data',
            'set_play',
            'set_currentTime'
        ]),
        ...mapActions([
            'get_sound_data',
            'get_recommend_data'
        ]),
        json_init() {
            this.get_sound_data(this.$route.params.id)
            .then(res => {
                if (res) {
                    this.set_current_sound_data(res)
                    this.json = res
                }
            })
            this.get_recommend()
        },
        audio_play_toggle() {
            this.set_play(!this.play)
        },
        get_recommend() {
            this.get_recommend_data()
            .then(res => {
                if (res.data) {
                    this.recommentJson = res.data
                }
            })
        },
        seek: function(e) {
            e = e || window.event
            var percent = (e.pageX / window.innerWidth).toFixed(2)
            _player.currentTime = _player.duration * percent
        }
    },
    created() {
        this.json_init()
    }
}
</script>
<style lang='stylus'>
img_height = 10rem
controls_height = 1.5rem
#detail{
    width: 100%;
    height: 100%;
    position: relative;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    background: #fff;
    a {
        text-decoration: none;
        em{
            color: #6ed56c;
            font-size: 0.32rem;
        }
    }
    .top_user{
        position: relative;
        width: 100%;
        height: 1.4rem;
        line-height: 1.4rem;
        background: #fbfbfb;
        padding: 0 0.42rem;
        a{
            color: #666;
            display: inline-block;
        }
        .user_img{
            position: relative;
            width: 0.9rem;
            height: 0.9rem;
            margin: 0.25rem 0;
            overflow: hidden;
            img{
                width: 100%;
                border-radius: 50%;
            }
            .v-icon{
                width: 0.4rem;
                height: 0.4rem;
                border-radius: 50%;
                position: absolute;
                bottom: 0;
                right: 0;
            }
        }
        .user_name{
            padding-left: 0.266rem;
            font-size: 14px;
            text-align: left;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .user_fans{
            float: right;
            em{
                color: #00ae05;
            }
        }
    }
    .sound_cover{
        width: 100%;
        height: img_height;
        position: relative;
        img{
            width: img_height;
            height: img_height;
            object-fit: cover;
        }
        .progress_bar{
            position: absolute;
            bottom: controls_height;
            width: 100%;
            height: 0.4rem;
            line-height: 0.4rem;
            background: rgba(0, 0, 0, 0.2);
            color: #fff;
            font-size: 0.3rem;
            span{
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                background: rgba(110, 213, 108, 0.2);
                &:after{
                  content: "";
                  display: inline-block;
                  width: 0.16rem;
                  height: 100%;
                  background: #6ed56c;
                  position: absolute;
                  top: 0;
                  right: -0.16rem;
                }
            }
            em {
                padding-left: 0.25rem;
            }
        }
        .controls{
            width: 100%;
            height: controls_height;
            line-height: controls_height;
            position: absolute;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            .controls_btn{
                width: 1rem;
                height: 1rem;
                margin: 0.25rem;
                background-size: cover;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            }
            .info{
                color: #fff;
                height: 1rem;
                vertical-align: top;
                flex: 1;
                overflow: hidden;
                p{
                    width: 100%;
                    line-height: 1.432;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    font-size: 0.293rem;
                }
                .sound_name{
                    font-size: 0.373rem;
                }
            }
            .danmu{
                width: 1.45rem;
                height: 0.67rem;
                margin: 0 0.3rem;
                background-size: cover;
                border-radius: 0.373rem;
            }
        }
    }
    .sound_info{
        width: 100%;
        .info_bar{
            width: 100%;
            height: 1.4rem;
            border-bottom: 1px solid #e8e8e8;
            font-size: 0;
            padding: 0 0.42rem;
            .play_num{
                display: inline-block;
                height: 1.4rem;
                line-height: 1.4rem;
                font-size: 0.32rem;
                color: #a9a9a9;
                margin-right: 0.53rem;
                &:before{
                    width: 0.226rem;
                    height: 0.253rem;
                    margin-right: 0.18rem;
                    display: inline-block;
                    content: "";
                    background-size: cover;
                }
            }
            .like_num{
                display: inline-block;
                height: 1.4rem;
                line-height: 1.4rem;
                font-size: 0.32rem;
                color: #a9a9a9;
                margin-right: 0.53rem;
                &:before{
                    width: 0.293rem;
                    height: 0.25rem;
                    margin-right: 0.18rem;
                    display: inline-block;
                    content: "";
                    background-size: cover;
                }
            }
            .to_bell_btn{
                float: right;
                height: 1.4rem;
                line-height: 1.4rem;
                font-size: 0.346rem;
                color: #6ed56c;
                &:before{
                    display: inline-block;
                    width: 0.525rem;
                    height: 0.56rem;
                    margin-right: 0.18rem;
                    content: "";
                    background-size: cover;
                    position: relative;
                    top: 0.16rem;
                }
            }
        }
        .info_lyric{
            padding: 0.373rem 0.4rem 0.8rem;
            white-space: pre-wrap;
            text-align: left;
            font-size: 14px;
            line-height: 1.5em;
            p{
                line-height: 1;
            }
        }
    }
    .sound_more{
        width: 100%;
        padding: 0.4rem 0;
        h4{
            height: 1.28rem;
            line-height: 1.28rem;
            color: #6ed56c;
            font-size: 14px;
            text-align: center;
        }
       .recommend{
            width: 100%;
            position: relative;
            padding: 0.4rem 0;
        } 
    }
}
</style>
<style scoped>
.controls_btn.pause{
    background: url(~@/assets/img/play.png) no-repeat;
}
.controls_btn.play{
    background: url(~@/assets/img/pause.png) no-repeat;
}
.danmu.on{
    background: url(~@/assets/img/danmu_on.png) no-repeat;
}
.danmu.off{
    background: url(~@/assets/img/danmu_off.png) no-repeat;
}
.play_num:before{
    background: url(~@/assets/img/play_num.png) no-repeat;
}
.like_num:before{
    background: url(~@/assets/img/like_num.png) no-repeat;
}
.to_bell_btn:before{
    background: url(~@/assets/img/bell.png) no-repeat;
}
</style>