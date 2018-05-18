<template>
    <div id='index'>
        <!-- banner -->
        <my-banner :json='bannerJson'></my-banner>
        <!-- recommend -->
        <div class="recommend">
            <h3 class="recommen_title">echo每日推荐</h3>
            <!-- 一键播放 -->
            <mu-raised-button label="一键播放" class="recommend_tip" backgroundColor='#6ed56c' @click.stop="playAll" />
            <!-- 列表 -->
            <my-list id="scroller-container" :json='recommentJson'></my-list>

        </div>
        <div class="loadingText">
            <div class="loading" v-if="loading === 'loading'">
                <mu-circular-progress class="loading-icon" :size="26" /> 加载中...</div>
            <div class="nothing" v-else-if="loading === 'nothing'">没有数据啦 ~</div>
            <div class="nothing" v-else-if="loading === 'error'">出错啦T T~</div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    name: 'index',
    data() {
        return {
            bannerJson: [],
            recommentJson: [],
            page: 1,
            lock: false,
            loading: 'loading'
        }
    },
    computed: {
        ...mapState([
            'audio'
        ])
    },
    methods: {
        ...mapMutations([
            'set_audio_data',
            'set_playList'
        ]),
        ...mapActions([
            'get_banner_data',
            'get_recommend_data'
        ]),
        // 获取banner数据
        get_banner() {
            this.get_banner_data()
                .then(res => {
                    if (res.data) {
                        this.bannerJson = res.data
                    }
                })
                .catch(err => {
                    console.log('get_banner', err)
                })
        },
        // 获取推荐数据
        get_recommend() {
            this.get_recommend_data(this.page)
                .then(res => {
                    if (res.data) {
                        this.recommentJson = res.data
                        this.page = 2
                    }
                })
                .catch(err => {
                    console.log('get_recommend', err)
                })
        },
        get_recommend_more() {
            this.lock = true
            this.loading = 'loading'
            this.get_recommend_data(this.page)
                .then(res => {
                    if (res.data) {
                        this.recommentJson.push(...res.data)
                        this.page++
                    } else {
                        this.loading = 'nothing'
                    }
                    this.lock = false
                })
                .catch(err => {
                    this.loading = 'error'
                    this.lock = false
                    console.log('get_recommend', err)
                })
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
            // 利用setTimeout节流（保证效果实现的同时减少代码运行次数）
            let timeoutRef
            if (timeoutRef) {
                clearTimeout(timeoutRef)
            }
            timeoutRef = setTimeout(() => {
                let scrollTop = $(window).scrollTop()
                let windowHeight = $(window).height()
                let documentHeight = $("#index").height()
                let distance = 5
                let isBottom = scrollTop + windowHeight + distance >= documentHeight
                let isLock = this.lock
                if (isBottom && !isLock && this.loading !== 'nothing' && this.recommentJson.length > 0) {
                    this.get_recommend_more()
                }
            }, 150)
        },
        init() {
            this.get_banner()
            this.get_recommend()
            this.$nextTick(() => {
                $(window).on('scroll', this.onScroll)
            })
        }
    },
    mounted() {
        this.init()
    },
    // 开启keep-alive的时候进入页面钩子
    activated() {
        $(window).on('scroll', this.onScroll)
    },
    // 离开页面钩子
    beforeRouteLeave(to, from, next) {
        $(window).off('scroll', this.onScroll)
        next()
    }
}
</script>
<style lang='stylus'>
#index {
    position: relative;
    width: 100%;
    background: #fff;
    -webkit-overflow-scrolling: touch;
    .headerTheme {
        img {
            width: 100%;
        }
    }
    .recommend {
        width: 100%;
        position: relative;
        .recommen_title {
            width: toRem(120);
            height: toRem(26);
            line-height: toRem(26);
            font-size: 12px;
            font-weight: 400;
            color: #639E5E;
            background-color: #d6ffd6;
            text-align: center;
            border-radius: toRem(13);
            margin: 20px auto;
        }
        .recommend_tip {
            position: absolute;
            left: 0;
            top: 60px;
            z-index: 22;
            height: 28px;
            line-height: 28px;
            font-size: 14px;
            color: #fff;
            font-style: normal;
            background-color: #6ed56c;
            background-image: url('../../assets/img/play-all.png');
            background-repeat: no-repeat;
            background-position: 10px 4px;
            border-radius: 14px;
            padding-left: 10px;
            text-indent: 10px;
        }
    }
    .loadingText {
        width: 100%;
        height: 50px;
        line-height: 50px;
        .loading, .nothing {
            width: 100%;
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            color: #999;
            text-align: center;
        }
        .error {
            color: red;
        }
        .loading-icon {
            margin-right: 5px;
            overflow: initial;
        }
    }
}
</style>
