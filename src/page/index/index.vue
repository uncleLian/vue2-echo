<template>
    <div id='index'>
        <!-- header -->
        <div class="header_bg"><img src="~@/assets/img/header_bg_.jpg"></div>

        <!-- banner -->
        <my-banner :json='bannerJson'></my-banner>

        <!-- recommend -->
        <div class="recommend">
            <h3 class="recommen_title">echo每日推荐</h3>
            <mu-raised-button label="一键播放" class="recommend_tip" backgroundColor='#6ed56c' @click.stop="playAll"/>
            <my-list :json='recommentJson'></my-list>
        </div>
        
        <!-- 加载更多 -->
        <!-- <mu-infinite-scroll :scroller="scroller" :loading="bottom_loading" @load="get_recommend"/> -->

    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'index',
    data() {
        return {
            bannerJson: [],
            recommentJson: [],
            scroller: '',
            loading: false,
            bottom_loading: false
        }
    },
    computed: {
        ...mapGetters([
            'audio_data',
            'audio_ele'
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
        async init () {
            this.get_banner()
            this.get_recommend()
        },
        get_banner() {
            this.get_banner_data()
            .then(res => {
                if (res.data) {
                    this.bannerJson = res.data
                }
            })
        },
        get_recommend() {
            this.bottom_loading = true
            this.get_recommend_data()
            .then(res => {
                if (res.data) {
                    this.recommentJson.push(...res.data)
                    this.page++
                    this.bottom_loading = false
                }
            })
        },
        playAll() {
            this.set_playList(this.recommentJson)
            if (this.audio_data && this.recommentJson[0].sound.id === this.audio_data.sound.id) {
                this.audio_ele.load()
                this.audio_ele.play()
            } else {
                this.set_audio_data(this.recommentJson[0])
            }
        },
        handleLocaltion(type) {
            if (type === 'get') {
                this.$nextTick(() => {
                    if (this.localtion > 0) {
                        $('#index').scrollTop(this.localtion)
                    }
                })
            } else if (type === 'set') {
                let scrollTop = $('#index').scrollTop()
                this.localtion = scrollTop
            }
        }
    },
    created() {
        this.init()
        this.$nextTick(() => {
            this.scroller = this.$el
        })
    },
    activated() {
        this.handleLocaltion('get')
    },
    deactivated() {
        this.handleLocaltion('set')
    }
}
</script>
<style scoped lang='stylus'>
#index{
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    .header_bg {
        img{
            width: 100%;
        }
    }
    .recommend{
        width: 100%;
        position: relative;
        .recommen_title{
            width: 120px;
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            color: #639E5E;
            background-color: #d6ffd6;
            text-align: center;
            border-radius: 13px;
            margin: 20px auto;
        }
        .recommend_tip{
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
            background-image: url(../../assets/img/play-all.png);
            background-repeat: no-repeat;
            background-position: 10px 4px;
            border-radius: 14px;
            padding-left: 10px;
            text-indent: 10px;        
        }
    }
}
</style>