<template>
    <div id='index' v-infinite-scroll="getListDataMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="0">
        <!-- banner -->
        <music-banner :json='bannerJson' />
        <!-- 推荐 -->
        <div class="recommend">
            <div class="recommen-title">echo每日推荐</div>
            <!-- 一键播放 -->
            <div class="playAll" @click="playAll">
                <div class="my-icon-arrow playAll-icon"></div>
                <div class="playAll-label" type="default">一键播放</div>
            </div>
            <!-- 列表 -->
            <music-list :json='listJson' />
        </div>
        <!-- 底部加载提示 -->
        <bottom-loading :loading="loading" />
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { getBanner, getList } from '@/api/index.ts'
import MusicBanner from '@/components/MusicBanner/index.vue'
import MusicList from '@/components/MusicList/index.vue'
import BottomLoading from '@/components/BottomLoading/index.vue'
import playMode from '@/utils/playMode'

@Component({
    name: 'index',
    components: { MusicBanner, MusicList, BottomLoading }
})
export default class index extends Vue {
    bannerJson: any[] = []
    listJson: any[] = []
    page: number = 1
    loading: string = ''
    lock: boolean = false
    @State audio: any
    @Mutation SET_AUDIO_DATA: any
    @Mutation SET_PLAY_MODE: any
    @Mutation SET_PLAY_LIST: any

    mounted() {
        this.getBannerData()
        this.getListData()
    }
    getBannerData() {
        getBanner().then((res: any) => {
            if (res.data && res.data.length > 0) {
                this.bannerJson = res.data
            }
        })
    }
    getListData() {
        this.$indicator.open()
        this.page = 1
        getList(this.page)
            .then((res: any) => {
                // console.log(res)
                if (res.data && res.data.length > 0) {
                    this.listJson = res.data
                    this.page = 2
                }
                this.$indicator.close()
            })
            .catch(_ => {
                this.$indicator.close()
            })
    }
    getListDataMore() {
        this.lock = true
        this.loading = 'loading'
        getList(this.page)
            .then((res: any) => {
                // console.log(res)
                if (res.data && res.data.length > 0) {
                    this.listJson.push(...res.data)
                    this.page++
                    this.loading = ''
                    this.lock = false
                } else {
                    this.loading = 'nothing'
                }
            })
            .catch(_ => {
                this.loading = 'error'
                this.lock = false
            })
    }
    // 一键播放
    playAll() {
        // 设置播放列表
        this.SET_PLAY_LIST(this.listJson)
        // 设置播放模式：列表循环
        this.SET_PLAY_MODE(playMode.listRepeat.value)
        // 当前音乐是否等于即将要播放的音乐？重新加载播放 ： 播放即将的音乐
        if (this.audio.data && this.listJson[0].sound.id === this.audio.data.sound.id) {
            this.audio.ele.load()
            this.audio.ele.play()
        } else {
            this.SET_AUDIO_DATA(this.listJson[0])
        }
    }
}
</script>
<style lang='stylus'>
#index {
    position: relative;
    width: 100%;
    background: #fff;
    .recommend {
        width: 100%;
        position: relative;
        .recommen-title {
            display: flex;
            align-items: center;
            justify-content: center;
            width: toRem(120);
            height: toRem(26);
            color: $darkColor;
            font-size: toRem(12);
            margin: toRem(20) auto;
            border-radius: toRem(13);
            background-color: $shallowColor;
        }
        .playAll {
            position: absolute;
            left: 0;
            top: toRem(60);
            z-index: 22;
            display: flex;
            align-items: center;
            font-size: toRem(14);
            height: toRem(28);
            padding-left: toRem(10);
            padding-right: toRem(16);
            border-radius: toRem(16);
            background-color: $appColor;
            .playAll-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: toRem(18);
                height: toRem(18);
                color: $appColor;
                margin-right: toRem(5);
                background: #fff;
                border-radius: 100%;
            }
            .playAll-label {
                color: #fff;
            }
        }
    }
}
</style>
