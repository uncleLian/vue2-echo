<template>
    <div id='detail' v-if='audio.data'>
        <!-- 用户 -->
        <div class="sound_user">
            <a class="user_img">
                <img :src="audio.data.sound.user.avatar_50">
                <img class='v-icon' src="https://ws-qn-echo-image-cdn.app-echo.com/Foz1CX1MdKHnTiDV26btgAmDJ3Y-?imageMogr2/auto-orient/quality/100%7CimageMogr2/thumbnail/!100x100r/gravity/Center/crop/100x100/dx/0/dy/0">
            </a>
            <a class="user_name">{{audio.data.sound.user.name}}</a>
            <a class='user_fans'>粉丝 <em>{{audio.data.sound.user.followed_count}}</em></a>
        </div>
        <!-- 封面 -->
        <div class="sound_cover">
            <!-- 弹幕 -->
            <div class="danmu_box" @click.stop="set_audio_play(!audio.play)"></div>
            <img :src="audio.data.sound.pic_500">
            <!-- 进度条 -->
            <div class="progress_bar" @click.stop='seek'>
                <span :style="`width:${$store.getters.audio_progress}`"></span>
                <em>{{audio.currentTime | sec2his}}/{{audio.duration | sec2his}}</em>
            </div>
            <!-- 控制 -->
            <div class="controls">
                <!-- 播放按钮 -->
                <div class="play_btn" :class="audio.play?'pause':'play'" @click.stop="set_audio_play(!audio.play)"></div>
                <div class="info">
                    <p class="sound_name">{{audio.data.sound.name}}</p>
                    <p>
                        <a class="sound_author"><em>{{audio.data.sound.user.name}}</em></a> 发布在
                        <a class='sound_channel'><em>{{audio.data.sound.channel.name}}</em></a> 频道
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
                <div class="play_num">{{audio.data.sound.view_count}} 播放</div>
                <div class="like_num">{{audio.data.sound.like_count}} 喜欢</div>
                <!-- 手机铃声按钮 -->
                <div class="to_bell_btn">设为手机铃声</div>
            </div>
            <!-- 歌词 -->
            <div class="info_lyric">
                <template v-if='audio.data.sound.song_info'>
                    <p v-if='audio.data.sound.song_info.album_name'>{{audio.data.sound.song_info.album_name.type}} : {{audio.data.sound.song_info.album_name.name}}</p>
                    <p v-if='audio.data.sound.song_info.author'>{{audio.data.sound.song_info.author.type}} : {{audio.data.sound.song_info.author.name}}</p>
                    <p v-if='audio.data.sound.song_info.name'>{{audio.data.sound.song_info.name.type}} : {{audio.data.sound.song_info.name.name}}</p>
                </template>
                <div v-if="audio.data.sound.lyrics" v-html="audio.data.sound.lyrics"></div>
                <div v-if="!audio.data.sound.song_info && !audio.data.sound.lyric" class="noLyric">没有相关的歌词T T~ </div>
            </div>
        </div>
        <!-- 更多推荐 -->
        <div class="sound_more">
            <h3>相关推荐</h3>
            <div class="recommend">
                <my-list :json='otherJson'></my-list>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    name: 'detail',
    data() {
        return {
            otherJson: [],
            danmu: false
        }
    },
    computed: {
        ...mapState([
            'audio'
        ])
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
            'set_audio_data',
            'set_audio_ele',
            'set_audio_play'
        ]),
        ...mapActions([
            'get_music_data',
            'get_other_data'
        ]),
        // 获取音乐数据
        get_sound() {
            this.get_music_data(this.$route.params.id)
            .then(res => {
                if (res) {
                    this.set_audio_data(res)
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        // 获取推荐数据
        get_recommend() {
            this.get_other_data()
            .then(res => {
                if (res.data) {
                    this.otherJson = res.data
                }
            })
        },
        // 点击调节进度条
        seek(e) {
            e = e || window.event
            var percent = (e.pageX / window.innerWidth).toFixed(2)  // 取小数点后2位数
            this.audio.ele.currentTime = this.audio.ele.duration * percent
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
img_height=10rem 
controls_height=1.5rem 
#detail {
    width: 100%;
    position: relative;
    -webkit-overflow-scrolling: touch;
    background: #f6f6f6;
    a {
        text-decoration: none;
        em {
            color: #6ed56c;
            font-size: toRem(12);
        }
    }
    .sound_user {
        position: relative;
        width: 100%;
        height: toRem(55);
        line-height: toRem(55);
        background: #fbfbfb;
        padding: 0 toRem(15);
        a {
            color: #666;
            display: inline-block;
        }
        .user_img {
            position: relative;
            width: toRem(35);
            height: toRem(35);
            margin: toRem(5) 0;
            overflow: hidden;
            img {
                width: 100%;
                border-radius: 50%;
            }
            .v-icon {
                width: toRem(15);
                height: toRem(15);
                border-radius: 50%;
                position: absolute;
                bottom: 0;
                right: 0;
            }
        }
        .user_name {
            padding-left: toRem(10);
            font-size: 14px;
            text-align: left;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .user_fans {
            float: right;
            font-size: 12px;
            em {
                color: #00ae05;
            }
        }
    }
    .sound_cover {
        width: 100%;
        height: img_height;
        position: relative;
        img {
            width: 100%;
            height: img_height;
            object-fit: cover;
        }
        .danmu_box {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: toRem(300);
        }
        .progress_bar {
            position: absolute;
            bottom: controls_height;
            width: 100%;
            height: toRem(15);
            line-height: toRem(15);
            background: rgba(0, 0, 0, 0.2);
            color: #fff;
            font-size: toRem(12);
            span {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                background: rgba(110, 213, 108, 0.2);
                &:after {
                    content: "";
                    display: inline-block;
                    width: toRem(6);
                    height: 100%;
                    background: #6ed56c;
                    position: absolute;
                    top: 0;
                    right: -toRem(6);
                }
            }
            em {
                padding-left: toRem(10);
            }
        }
        .controls {
            width: 100%;
            height: controls_height;
            line-height: controls_height;
            position: absolute;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            .play_btn {
                width: toRem(37.5);
                height: toRem(37.5);
                margin: toRem(10);
                background-size: cover;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            }
            .info {
                color: #fff;
                height: toRem(37.5);
                vertical-align: top;
                flex: 1;
                overflow: hidden;
                p {
                    width: 100%;
                    line-height: 1.432;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    font-size: toRem(11);
                }
                .sound_name {
                    font-size: toRem(14);
                }
            }
            .danmu_btn {
                width: toRem(55);
                height: toRem(25);
                margin: 0 toRem(12);
                background-size: cover;
                border-radius: toRem(14);
            }
        }
    }
    .sound_info {
        width: 100%;
        background: #fff;
        margin-bottom: toRem(10);
        .info_bar {
            width: 100%;
            height: toRem(55);
            border-bottom: 1px solid #e8e8e8;
            font-size: 0;
            padding: 0 toRem(16);
            .play_num {
                display: inline-block;
                height: toRem(55);
                line-height: toRem(55);
                font-size: toRem(12);
                color: #a9a9a9;
                margin-right: toRem(20);
                &:before {
                    width: toRem(8);
                    height: toRem(9);
                    margin-right: toRem(6);
                    display: inline-block;
                    content: "";
                    background-size: cover;
                }
            }
            .like_num {
                display: inline-block;
                height: toRem(55);
                line-height: toRem(55);
                font-size: toRem(12);
                color: #a9a9a9;
                margin-right: toRem(20);
                &:before {
                    width: toRem(10);
                    height: toRem(9);
                    margin-right: toRem(6);
                    display: inline-block;
                    content: "";
                    background-size: cover;
                }
            }
            .to_bell_btn {
                float: right;
                height: toRem(55);
                line-height: toRem(55);
                font-size: toRem(13);
                color: #6ed56c;
                &:before {
                    display: inline-block;
                    width: toRem(20);
                    height: toRem(20);
                    margin-right: toRem(6);
                    content: "";
                    background-size: cover;
                    position: relative;
                    top: toRem(6);
                }
            }
        }
        .info_lyric {
            padding: toRem(14) toRem(15) 0.8rem;
            white-space: pre-wrap;
            text-align: left;
            font-size: 14px;
            line-height: 1.5em;
            .noLyric{
                text-align: center;
                color: #999;
            }
            p {
                line-height: 1;
            }
        }
    }
    .sound_more {
        width: 100%;
        background: #fff;
        h3 {
            height: toRem(48);
            line-height: toRem(48);
            color: #6ed56c;
            font-size: 14px;
            text-align: center;
        }
        .recommend {
            width: 100%;
            position: relative;
            padding-top: toRem(15);
        }
    }
}
</style>
<style scoped>
.play_btn.pause {
    background: url(~@/assets/img/play.png) no-repeat;
}

.play_btn.play {
    background: url(~@/assets/img/pause.png) no-repeat;
}

.danmu_btn.on {
    background: url(~@/assets/img/danmu_on.png) no-repeat;
}

.danmu_btn.off {
    background: url(~@/assets/img/danmu_off.png) no-repeat;
}

.play_num:before {
    background: url(~@/assets/img/play_num.png) no-repeat;
}

.like_num:before {
    background: url(~@/assets/img/like_num.png) no-repeat;
}

.to_bell_btn:before {
    background: url(~@/assets/img/bell.png) no-repeat;
}
</style>
