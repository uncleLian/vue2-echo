<template>
    <div id='detail' v-if="audio.data && !loading">
        <div class="detail-container">
            <!-- 用户信息 -->
            <div class="detail-user">
                <div class="user-left">
                    <div class="user-img-container">
                        <img class="user-img" :src="audio.data.sound.user.avatar_50">
                        <img v-if="audio.data.sound.user.famous_type" class='user-vip' src="https://ws-qn-echo-image-cdn.app-echo.com/Foz1CX1MdKHnTiDV26btgAmDJ3Y-?imageMogr2/auto-orient/quality/100%7CimageMogr2/thumbnail/!100x100r/gravity/Center/crop/100x100/dx/0/dy/0">
                    </div>
                    <div class="user-name">{{audio.data.sound.user.name}}</div>
                </div>
                <div class="user-right">
                    <div class="user-fans-label">粉丝</div>
                    <div class="user-fans-value">{{audio.data.sound.user.followed_count}}</div>
                </div>
            </div>
            <!-- 封面 -->
            <div class="detail-cover">
                <img class="cover-img" :src="audio.data.sound.pic_500">
                <div class="cover-danmu" @click="handlePlay"></div>
                <div class="progress-bar-container" @click='handleSeek'>
                    <div class="progress-time">{{audio.currentTime | sec2his}}/{{audio.duration | sec2his}}</div>
                    <div class="progress-bar" :style="`width:${audio_progress}`"></div>
                </div>
                <!-- 控制 -->
                <div class="control">
                    <!-- 播放按钮 -->
                    <div class="control-playBtn" :class="audio.play ? 'pause' : 'play'" @click="handlePlay"></div>
                    <div class="control-info">
                        <div class="info-name">{{audio.data.sound.name}}</div>
                        <div class="info-source">
                            <a class="info-author">{{audio.data.sound.user.name}}</a>
                            <div class="info-label">发布在</div>
                            <a class='info-channel'>{{audio.data.sound.channel.name}}</a>
                            <div class="info-label">频道</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 信息 -->
            <div class="detail-info">
                <div class="info-left">
                    <div class="info-item">
                        <div class="my-icon-play item-icon"></div>
                        <div class="item-value"> {{audio.data.sound.view_count}} 播放</div>
                    </div>
                    <div class="info-item">
                        <div class="my-icon-like item-icon"></div>
                        <div class="item-value"> {{audio.data.sound.like_count}} 喜欢</div>
                    </div>
                </div>
                <div class="info-bell">
                    <div class="my-icon-bell bell-icon"></div>
                    <div class="bell-label">设为手机铃声</div>
                </div>
            </div>
            <!-- 歌词 -->
            <div class="detail-lyric">
                <template v-if='audio.data.sound.song_info'>
                    <p v-if='audio.data.sound.song_info.album_name'>{{audio.data.sound.song_info.album_name.type}} : {{audio.data.sound.song_info.album_name.name}}</p>
                    <p v-if='audio.data.sound.song_info.author'>{{audio.data.sound.song_info.author.type}} : {{audio.data.sound.song_info.author.name}}</p>
                    <p v-if='audio.data.sound.song_info.name'>{{audio.data.sound.song_info.name.type}} : {{audio.data.sound.song_info.name.name}}</p>
                </template>
                <!-- 歌词 -->
                <div v-if="audio.data.sound.lyrics" v-html="audio.data.sound.lyrics"></div>
                <!-- 没有歌词 -->
                <div v-if="!audio.data.sound.song_info && !audio.data.sound.lyrics" class="noLyric">没有相关的歌词T T~ </div>
            </div>
            <!-- 更多推荐 -->
            <div class="detail-other">
                <div class="other-title">
                    <a>相关推荐</a>
                </div>
                <div class="other-recommend">
                    <music-list :json='otherJson' />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { getDetail, getOther } from '@/api'
import MusicList from '@/components/MusicList/index.vue'
export default {
    name: 'detail',
    components: { MusicList },
    data() {
        return {
            otherJson: [],
            loading: false
        }
    },
    computed: {
        ...mapState([
            'audio'
        ]),
        ...mapGetters([
            'audio_progress'
        ])
    },
    watch: {
        $route(to, from) {
            if (this.$route.path.includes('detail')) {
                this.getMusicData()
                this.getOtherData()
            }
        }
    },
    mounted() {
        this.getMusicData()
        this.getOtherData()
    },
    methods: {
        ...mapMutations([
            'SET_AUDIO_DATA',
            'SET_AUDIO_PLAY'
        ]),
        getMusicData() {
            this.$indicator.open()
            this.loading = true
            let id = this.$route.query.id
            getDetail(id).then(res => {
                this.$indicator.close()
                this.loading = false
                if (res && res.data) {
                    this.SET_AUDIO_DATA(res.data)
                }
            }).catch(() => {
                this.$indicator.close()
                this.loading = false
            })
        },
        getOtherData() {
            getOther().then(res => {
                if (res.data && res.data.length > 0) {
                    this.otherJson = res.data
                }
            })
        },
        // 播放/暂停
        handlePlay() {
            let playStatus = !this.audio.play
            this.SET_AUDIO_PLAY(playStatus)
        },
        // 调节进度条
        handleSeek(e) {
            e = e || window.event
            let percent = Math.floor(e.pageX / window.innerWidth * 100) / 100
            this.audio.ele.currentTime = this.audio.ele.duration * percent
        }
    }
}
</script>
<style lang='stylus'>
$coverHeight = toRem(375);
$controlHeight = toRem(60);
$progressBarHeight = toRem(15);
$danmuHeight = $coverHeight - $controlHeight - $progressBarHeight;
#detail {
    width: 100%;
    position: relative;
    background: #f6f6f6;
    .detail-user {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        height: toRem(55);
        background: #fbfbfb;
        padding: 0 toRem(15);
        color: $normalColor;
        .user-left {
            display: flex;
            align-items: center;
            max-width: 70%;
            .user-img-container {
                position: relative;
                .user-img {
                    display: block;
                    min-width: toRem(36);
                    width: toRem(36);
                    height: toRem(36);
                    border-radius: 100%;
                    overflow: hidden;
                }
                .user-vip {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: toRem(14);
                    height: toRem(14);
                    border-radius: 100%;
                    z-index: 10;
                }
            }
            .user-name {
                margin-left: toRem(10);
                font-size: toRem(14);
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }
        .user-right {
            display: flex;
            align-items: center;
            margin-left: auto;
            max-width: 30%;
            font-size: toRem(12);
            .user-fans-label {
                white-space: nowrap;
            }
            .user-fans-value {
                color: $deepColor;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                margin-left: toRem(6);
            }
        }
    }
    .detail-cover {
        width: 100%;
        height: $coverHeight;
        position: relative;
        .cover-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .cover-danmu {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: $danmuHeight;
        }
        .progress-bar-container {
            position: absolute;
            bottom: $controlHeight;
            left: 0;
            right: 0;
            height: $progressBarHeight;
            color: #fff;
            font-size: toRem(12);
            background: rgba(0, 0, 0, 0.2);
            .progress-time {
                display: flex;
                align-items: center;
                height: 100%;
                line-height: 1;
                margin-left: toRem(10);
            }
            .progress-bar {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                background: rgba($appColorRGB, 0.2);
                &:after {
                    content: '';
                    display: inline-block;
                    width: toRem(6);
                    height: 100%;
                    background: $appColor;
                    position: absolute;
                    top: 0;
                    right: toRem(-6);
                }
            }
        }
        .control {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            width: 100%;
            height: $controlHeight;
            background: rgba(0, 0, 0, 0.5);
            padding: 0 toRem(12);
            .control-playBtn {
                width: toRem(38);
                height: toRem(38);
                margin-right: toRem(12);
                &.pause {
                    background: url('~@/assets/img/play.png') no-repeat;
                    background-size: cover;
                }
                &.play {
                    background: url('~@/assets/img/pause.png') no-repeat;
                    background-size: cover;
                }
            }
            .control-info {
                display: flex;
                flex-direction: column;
                max-width: 80%;
                color: #fff;
                font-size: toRem(12);
                .info-name {
                    font-size: toRem(14);
                    margin-bottom: toRem(6);
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .info-source {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    .info-label {
                        margin: 0 toRem(4);
                        white-space: nowrap;
                    }
                    .info-author {
                        max-width: 50%;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .info-channel {
                        max-width: 50%;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
    .detail-info {
        display: flex;
        align-items: center;
        width: 100%;
        height: toRem(50);
        padding: 0 toRem(16);
        background: #fff;
        border-bottom: 1px solid $borderColor;
        .info-left {
            display: flex;
            align-items: center;
            max-width: 70%;
            .info-item {
                display: flex;
                align-items: center;
                color: $infoColor;
                font-size: toRem(12);
                line-height: 1;
                padding-right: toRem(12);
                white-space: nowrap;
                &:last-child {
                    margin-right: 0;
                }
                .item-icon {
                    margin-right: toRem(5);
                }
                .item-value {
                    text-ellipsis();
                }
            }
        }
        .info-bell {
            margin-left: auto;
            display: flex;
            align-items: center;
            color: $linkColor;
            white-space: nowrap;
            .bell-icon {
                font-size: toRem(22);
                margin-right: toRem(5);
                transform: rotate(-15deg);
            }
            .bell-label {
                font-size: toRem(12);
            }
        }
    }
    .detail-lyric {
        font-size: toRem(14);
        line-height: 1.5em;
        white-space: pre-wrap;
        padding: toRem(15) toRem(16) toRem(30);
        margin-bottom: toRem(10);
        background: #fff;
        .noLyric {
            text-align: center;
            color: #999;
        }
        p {
            line-height: 1;
        }
    }
    .detail-other {
        position: relative;
        width: 100%;
        background: #fff;
        .other-title {
            padding: toRem(12) 0 toRem(20);
            display: flex;
            align-items: center;
            justify-content: center;
            a {
                color: $appColor;
                font-size: toRem(14);
                text-align: center;
                border-bottom: 1px solid $appColor;
                padding: toRem(6) toRem(10);
            }
        }
        .other-recommend {
            position: relative;
            width: 100%;
        }
    }
}
</style>
