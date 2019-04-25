<template>
    <div class="popup" :class="{'playMode': playModeVisible}">
        <!-- 播放列表 -->
        <mt-popup class="playListSheet" v-model="playListVisible" position="bottom">
            <div class="playList-header">
                <div class="playList-mode-btn left" @click="clearablePlayList">清空</div>
                <div class="playList-title">播放列表<span class="playList-count">（{{playList.length}}首）</span>
                </div>
                <div class="playList-mode-btn right my-icon-more" @click="playModeVisible = true"></div>
            </div>
            <ul class="playList" v-if="playList && playList.length > 0">
                <li class="playList-item" v-for="(item, index) in playList" :key="item.sound.id" :class="{'playing': audio.data.sound.id === item.sound.id}" @click="muiscChange(item)">
                    <div class="item-name">
                        <!-- icon -->
                        <div class="name-icon-container">
                            <div class="name-icon" :class="audio.data.sound.id === item.sound.id ? 'my-icon-circle-play': 'smallCircle' "></div>
                        </div>
                        <!-- 名字 -->
                        <div class="name-value" :class="audio.data.sound.id === item.sound.id ? 'onPlay': '' ">{{item.sound.name}}</div>
                    </div>
                    <!-- 删除按钮 -->
                    <div class="item-close my-icon-close" @click.stop="deletePlayListItem(item, index)"></div>
                </li>
            </ul>
            <div class="playList-nothing" v-else>什么都没有了T T~</div>
        </mt-popup>

        <!-- 播放模式 -->
        <mt-popup class="playModeSheet" v-model="playModeVisible" position="bottom">
            <div class="playModeList">
                <mt-cell class="playMode-item" :class="{'active': playMode === item.value}" v-for="(item, index) in playModeOptions" :key="index" :title="item.label" @click.native="playModeChange(item.value)">
                    <div class="item-icon" :class="item.icon"></div>
                </mt-cell>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { ArrayOptions } from '@/utils/playMode'
export default {
    data() {
        return {
            playModeOptions: ArrayOptions,
            playListVisible: false,
            playModeVisible: false
        }
    },
    computed: {
        ...mapState([
            'audio',
            'playMode',
            'playList'
        ])
    },
    watch: {
        $route(val) {
            // 路由跳转，关闭弹框
            this.playListVisible = this.playModeVisible = false
        },
        playListVisible(val) {
            // 打开弹框禁止页面滚动
            if (val) {
                document.querySelector('html').style.overflow = 'hidden'
                document.querySelector('body').style.overflow = 'hidden'
            } else {
                document.querySelector('html').style.overflow = ''
                document.querySelector('body').style.overflow = ''
            }
        }
    },
    methods: {
        ...mapMutations([
            'SET_AUDIO_DATA',
            'SET_PLAY_MODE',
            'SET_PLAY_LIST'
        ]),
        // 切换音乐
        muiscChange(val) {
            this.playListVisible = false
            this.SET_AUDIO_DATA(val)
        },
        // 更改播放模式
        playModeChange(val) {
            this.playModeVisible = false
            this.SET_PLAY_MODE(val)
        },
        // 清空播放列表
        clearablePlayList() {
            this.SET_PLAY_LIST([])
        },
        // 删除播放列表里的某一首
        deletePlayListItem(item, index) {
            this.playList.splice(index, 1)
            this.SET_PLAY_LIST(this.playList)
        },
        // 切换显示
        toggleVisible() {
            this.playListVisible = !this.playListVisible
        }
    }
}
</script>
<style lang='stylus'>
.popup {
    .v-modal {
        opacity: 0;
    }
    &.playMode {
        .v-modal {
            opacity: 0.5;
        }
    }
}
.playListSheet {
    width: 100%;
    max-height: toRem(188);
    border-top: 1px solid $borderColor;
    margin-bottom: $musicBarHeight;
    .playList-header {
        position: relative;
        flex-center();
        height: toRem(36);
        color: $appColor;
        font-size: toRem(14);
        margin-top: toRem(8);
        .playList-title {
            white-space: nowrap;
            .playList-count {
                font-size: toRem(12);
            }
        }
        .playList-mode-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: toRem(20);
            &.left {
                left: toRem(18);
                font-size: toRem(14);
            }
            &.right {
                right: toRem(5);
                width: toRem(36);
                height: toRem(36);
            }
        }
    }
    .playList {
        position: relative;
        max-height: toRem(135);
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        .playList-item {
            position: relative;
            display: flex;
            align-items: center;
            padding: toRem(7) toRem(8);
            border-bottom: 1px solid $borderColor;
            line-height: 1;
            .item-name {
                display: flex;
                align-items: center;
                .name-icon-container {
                    flex-center();
                    width: toRem(18);
                    height: toRem(18);
                    margin: 0 toRem(5);
                    .name-icon {
                        color: $appColor;
                        font-size: toRem(18);
                        &.smallCircle {
                            width: toRem(4);
                            height: toRem(4);
                            border-radius: 100%;
                            background: $bgColor;
                        }
                    }
                }
                .name-value {
                    text-ellipsis();
                    max-width: toRem(295);
                    color: $infoColor;
                    font-size: toRem(14);
                    &.onPlay {
                        color: $mainColor;
                    }
                }
            }
            .item-close {
                color: $lessColor;
                font-size: toRem(20);
                padding: toRem(5) toRem(6);
                margin-left: auto;
            }
        }
    }
    .playList-nothing {
        flex-center();
        color: $infoColor;
        font-size: toRem(14);
        text-align: center;
        height: toRem(60);
    }
}
.playModeSheet {
    width: 100%;
    z-index: 10000 !important;
    .playModeList {
        position: relative;
        width: 100%;
        padding: toRem(8) 0;
        .playMode-item {
            width: 100%;
            min-height: toRem(48);
            background: none;
            &.active {
                .mint-cell-text {
                    color: $appColor;
                }
                .item-icon {
                    color: $appColor;
                }
            }
            .mint-cell-wrapper {
                padding: 0 toRem(16);
                background: none;
            }
            .mint-cell-text {
                color: $lessColor;
                font-size: toRem(14);
            }
            .item-icon {
                color: $lessColor;
                font-size: toRem(24);
            }
        }
    }
}
</style>
