<template>
    <!-- <div id='index' v-infinite-scroll="getRecommentMore" infinite-scroll-disabled="lock" infinite-scroll-immediate-check="false" infinite-scroll-distance="20"> -->
    <div id='index'>
        <!-- banner -->
        <my-banner :json='bannerJson'></my-banner>
        <!-- 推荐 -->
        <div class="recommend">
            <div class="recommen-title">echo每日推荐</div>
            <!-- 一键播放 -->
            <div class="playAll" @click="playAll">
                <div class="my-icon-arrow playAll-icon"></div>
                <div class="playAll-label" type="default">一键播放</div>
            </div>
            <!-- 列表 -->
            <my-list :json='recommentJson'></my-list>
        </div>
        <!-- 底部加载提示 -->
        <div class="loading-container">
            <span class="loading" v-if="loading === 'loading'">
                <mt-spinner type="triple-bounce" color="#6ed56c"></mt-spinner>
            </span>
            <span class="nothing" v-else-if="loading === 'nothing'">没有更多了T T~</span>
            <span class="error" v-else-if="loading === 'error'">出错啦T T~</span>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { getBanner, getList } from '@/api'
import myBanner from '@/components/banner'
export default {
    name: 'index',
    components: { myBanner },
    data() {
        return {
            bannerJson: [],
            recommentJson: [],
            page: 1,
            lock: false,
            loading: false
        }
    },
    computed: {
        ...mapState([
            'audio'
        ])
    },
    mounted() {
        this.getBannerData()
        this.getRecommentData()
    },
    activated() {
        this.lock = false
        window.addEventListener('scroll', this.onScroll)
    },
    beforeRouteLeave(to, from, next) {
        window.removeEventListener('scroll', this.onScroll)
        this.lock = true
        next()
    },
    methods: {
        ...mapMutations([
            'set_audio_data',
            'set_playList'
        ]),
        getBannerData() {
            getBanner().then(res => {
                if (res.data) {
                    this.bannerJson = res.data
                }
            })
        },
        getRecommentData() {
            this.$indicator.open()
            getList(this.page).then(res => {
                if (res.data) {
                    this.recommentJson = res.data
                    this.page = 2
                }
                this.$indicator.close()
            }).catch(() => {
                this.$indicator.close()
            })
        },
        // 加载更多
        getRecommentMore() {
            if (!this.loading) {
                this.lock = true
                this.loading = 'loading'
                getList(this.page).then(res => {
                    console.log(res)
                    if (res.data && res.data.length > 0) {
                        this.recommentJson.push(...res.data)
                        this.page++
                        this.loading = false
                        this.lock = false
                    } else {
                        this.loading = 'nothing'
                        this.lock = true
                    }
                }).catch(() => {
                    this.loading = 'error'
                    this.lock = true
                })
            }
        },
        // 一键播放
        playAll() {
            this.set_playList(this.recommentJson)
            // 当前音乐是否等于即将要播放的音乐？重新加载播放 ： 播放即将的音乐
            if (this.audio.data && this.recommentJson[0].sound.id === this.audio.data.sound.id) {
                this.audio.ele.load()
                this.audio.ele.play()
            } else {
                this.set_audio_data(this.recommentJson[0])
            }
        },
        // 自行实现滚到页面底部加载
        onScroll() {
            // 利用requestAnimationFrame保证流畅性和精准度，相对于setTimeout执行次数会增多
            requestAnimationFrame(() => {
                // 滚动高度
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
                // 窗口高度
                let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
                // 文档高度
                let documentHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
                // 距离
                let distance = 10
                // this.$toast(`滚动高度：${scrollTop}, 窗口高度：${windowHeight}, 文档高度：${documentHeight}, `)
                let isBottom = scrollTop + windowHeight + distance >= documentHeight
                if (isBottom && !this.lock) {
                    this.getRecommentMore()
                }
            })
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
    .loading-container {
        width: 100%;
        height: toRem(50);
        display: flex;
        align-items: center;
        justify-content: center;
        .loading, .nothing, .error {
            font-size: toRem(14);
            color: #999;
            text-align: center;
        }
        .error {
            color: $redColor;
        }
    }
}
</style>
