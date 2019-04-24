<template>
    <div class="popup" :class="{'playMode': playModeVisible}">
        <!-- 播放列表 -->
        <mt-popup class="playListSheet" v-model="playListVisible" position="bottom">
            <div class="playList-header">
                播放列表
                <div class="playList-count">（{{playList.length}}首）</div>
                <div class="my-icon-more playList-mode-btn" @click="playModeVisible = true"></div>
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
                    <div class="item-close my-icon-close" @click.stop="deletePlayList(item, index)"></div>
                </li>
            </ul>
            <div class="playList-nothing" v-else>什么都没有了T T~</div>
        </mt-popup>

        <!-- 播放模式 -->
        <mt-popup class="playModeSheet" v-model="playModeVisible" position="bottom">
            <div class="playModeList">
                <mt-cell class="playMode-item" :class="{'active': playMode === item.value}" v-for="(item, index) in playModeOptions" :key="index" :title="item.title" @click.native="playModeChange(item.value)">
                    <div class="item-icon" :class="item.icon"></div>
                </mt-cell>
            </div>
        </mt-popup>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Mutation, Action } from 'vuex-class'
import playMode from '@/utils/playMode'

@Component
export default class Popup extends Vue {
    playModeOptions: any[] = [
        { title: '默认', value: playMode.default, icon: 'my-icon-more' },
        { title: '随机播放', value: playMode.random, icon: 'my-icon-random' },
        { title: '单曲循环', value: playMode.singleRepeat, icon: 'my-icon-repeatone' },
        { title: '列表循环', value: playMode.listRepeat, icon: 'my-icon-repeat' }
    ]
    playListVisible: boolean = false
    playModeVisible: boolean = false
    @State audio: any
    @State playMode: any
    @State playList: any
    @Mutation SET_AUDIO_DATA: any
    @Mutation SET_PLAY_MODE: any
    @Mutation SET_PLAY_LIST: any

    @Watch('$route') closePopup(to: any, from: any) {
        this.playListVisible = this.playModeVisible = false
    }
    // 切换音乐
    muiscChange(val: any) {
        this.playListVisible = false
        this.SET_AUDIO_DATA(val)
    }
    // 切换播放模式
    playModeChange(val: boolean) {
        this.playModeVisible = false
        this.SET_PLAY_MODE(val)
        this.$toast('设置成功')
    }
    // 删除播放列表
    deletePlayList(item: any, index: number) {
        this.playList.splice(index, 1)
        this.SET_PLAY_LIST(this.playList)
    }
    // 切换显示
    toggleVisible() {
        this.playListVisible = !this.playListVisible
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
        .playList-count {
            font-size: toRem(12);
        }
        .playList-mode-btn {
            position: absolute;
            right: toRem(5);
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            width: toRem(36);
            height: toRem(36);
            font-size: toRem(20);
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
