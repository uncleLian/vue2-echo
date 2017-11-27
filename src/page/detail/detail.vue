<template>
    <div id='detail' v-if='audio_data'>
        <!-- 用户 -->
        <div class="sound_user">
            <a class="user_img">
                <img :src="audio_data.sound.user.avatar_50">
                <img class='v-icon' src="https://ws-qn-echo-image-cdn.app-echo.com/Foz1CX1MdKHnTiDV26btgAmDJ3Y-?imageMogr2/auto-orient/quality/100%7CimageMogr2/thumbnail/!100x100r/gravity/Center/crop/100x100/dx/0/dy/0">
            </a>
            <a class="user_name">{{audio_data.sound.user.name}}</a>
            <a class='user_fans'>粉丝 <em>{{audio_data.sound.user.followed_count}}</em></a>
        </div>

        <!-- 封面 -->
        <div class="sound_cover">
            <!-- 弹幕 -->
            <div class="danmu_box" @click.stop="set_audio_play(!audio_play)"></div>
            <img :src="audio_data.sound.pic_500">
            <!-- 进度条 -->
            <div class="progress_bar" @click.stop='seek'>
                <span :style="`width:${audio_progress}`"></span>
                <em>{{audio_currentTime | sec2his}}/{{audio_duration | sec2his}}</em>
            </div>
            <!-- 控制 -->
            <div class="controls">
                <!-- 播放按钮 -->
                <div class="play_btn" :class="audio_play?'pause':'play'" @click.stop="set_audio_play(!audio_play)"></div>
                <div class="info">
                    <p class="sound_name">{{audio_data.sound.name}}</p>
                    <p>
                        <a class="sound_author"><em>{{audio_data.sound.user.name}}</em></a>
                        发布在 
                        <a class='sound_channel'><em>{{audio_data.sound.channel.name}}</em></a>
                        频道
                    </p>
                </div>
                <!-- 弹幕按钮 -->
                <div class="danmu_btn" :class="danmu? 'on': 'off'" @click.stop="danmu = !danmu"></div>
            </div>
        </div>

        <!-- 信息 -->
        <div class="sound_info">
            <!-- 基本信息 -->
            <div class="info_bar">
                <div class="play_num">100000+ 播放</div>
                <div class="like_num">{{audio_data.sound.like_count}} 喜欢</div>
                <!-- 手机铃声按钮 -->
                <div class="to_bell_btn">设为手机铃声</div>
            </div>
            <!-- 歌词 -->
            <div class="info_lyric">
                <template v-if='audio_data.sound.song_info'>
                    <p v-if='audio_data.sound.song_info.album_name'>{{audio_data.sound.song_info.album_name.type}} : {{audio_data.sound.song_info.album_name.name}}</p>
                    <p v-if='audio_data.sound.song_info.author'>{{audio_data.sound.song_info.author.type}} : {{audio_data.sound.song_info.author.name}}</p>
                    <p v-if='audio_data.sound.song_info.name'>{{audio_data.sound.song_info.name.type}} : {{audio_data.sound.song_info.name.name}}</p>
                </template>
                <div v-if="audio_data.sound.lyrics" v-html="audio_data.sound.lyrics"></div>
            </div>
        </div>

        <!-- 更多推荐 -->
        <div class="sound_more">
            <h3>相关推荐</h3>
            <div class="recommend">
                <my-list :json='recommentJson'></my-list>
            </div>
        </div>

        <my-loading :visible='loading'></my-loading>
        <my-error :visible='error' :reload="get_sound" ></my-error>
    </div>
</template>
<script>
import Util from '@/config/util.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'detail',
    data() {
        return {
            recommentJson: [],
            danmu: false,
            loading: false,
            error: false
        }
    },
    computed: {
        ...mapGetters([
            'audio_ele', // auido元素
            'audio_data', // 当前播放的音乐数据
            'audio_play', // audio播放状态
            'audio_duration', // audio 时长
            'audio_currentTime', // audio当前秒数s的播放进度
            'audio_progress' // audio当前百分比%的播放进度
        ])
    },
    filters: {
        sec2his: Util.sec2his   // 让currentTime 秒数转换成 03:30 这样的格式的方法
    },
    watch: {
        $route(to, from) {
            if (this.$route.path.includes('detail')) {
                this.init()
            }
        }
    },
    methods: {
        ...mapMutations([
            'set_audio_data',   // 设置audio数据
            'set_audio_ele',    // 设置audio元素
            'set_audio_play'    // 设置audio播放状态
        ]),
        ...mapActions([
            'get_music_data',   // 获取音乐数据
            'get_recommend_data'    // 获取推荐数据
        ]),
        get_sound() {
            this.error = false
            this.loading = true
            this.get_music_data(this.$route.params.id)
            .then(res => {
                if (res) {
                    this.set_audio_data(res)
                }
                this.loading = false
            })
            .catch(err => {
                console.log(err)
                this.error = true
                this.loading = false
            })
        },
        get_recommend() {
            this.get_recommend_data()
            .then(res => {
                if (res.data) {
                    this.recommentJson = res.data
                }
            })
        },
        // 点击调节进度条
        seek(e) {
            e = e || window.event
            var percent = (e.pageX / window.innerWidth).toFixed(2)  // 取小数点后2位数
            this.audio_ele.currentTime = this.audio_ele.duration * percent
        },
        init() {
            this.get_sound()
            this.get_recommend()
        }
    },
    mounted() {
        this.init()
    }
}
</script>
<style lang='stylus'>
img_height = 10rem
controls_height = 1.5rem
#detail{
    width: 100%;
    position: relative;
    -webkit-overflow-scrolling: touch;
    background: #f6f6f6;
    a {
        text-decoration: none;
        em{
            color: #6ed56c;
            font-size: 0.32rem;
        }
    }
    .sound_user{
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
            font-size: 12px;
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
            width: 100%;
            height: img_height;
            object-fit: cover;
        }
        .danmu_box {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 8.1rem;
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
            .play_btn{
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
            .danmu_btn{
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
        background: #fff;
        margin-bottom: 0.25rem;
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
        background: #fff;
        h3{
            height: 1.28rem;
            line-height: 1.28rem;
            color: #6ed56c;
            font-size: 14px;
            text-align: center;
        }
       .recommend{
            width: 100%;
            position: relative;
            padding-top: 0.4rem;
        } 
    }
}
</style>
<style scoped>
.play_btn.pause{
    background: url(~@/assets/img/play.png) no-repeat;
}
.play_btn.play{
    background: url(~@/assets/img/pause.png) no-repeat;
}
.danmu_btn.on{
    background: url(~@/assets/img/danmu_on.png) no-repeat;
}
.danmu_btn.off{
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