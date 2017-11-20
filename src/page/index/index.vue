<template>
    <div id='index'>
        <!-- header -->
        <div class="headerTheme"><img src="~@/assets/img/header_theme.jpg"></div>

        <!-- banner -->
        <my-banner :json='bannerJson'></my-banner>

        <!-- recommend -->
        <div class="recommend">
            <h3 class="recommen_title">echo每日推荐</h3>
            <!-- 一键播放 -->
            <mu-raised-button label="一键播放" class="recommend_tip" backgroundColor='#6ed56c' @click.stop="playAll"/>
            <!-- 列表 -->
            <my-list :json='recommentJson'></my-list>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'index',
    data() {
        return {
            bannerJson: [],
            recommentJson: []
        }
    },
    computed: {
        ...mapGetters([
            'audio_data', // audio数据
            'audio_ele' // audio元素
        ])
    },
    methods: {
        ...mapMutations([
            'set_audio_data',   // 设置audio数据
            'set_playList'  // 设置播放列表数据
        ]),
        ...mapActions([
            'get_banner_data',
            'get_recommend_data'
        ]),
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
        get_recommend() {
            this.get_recommend_data()
            .then(res => {
                if (res.data) {
                    this.recommentJson.push(...res.data)
                }
            })
            .catch(err => {
                console.log('get_recommend', err)
            })
        },
        playAll() {
            this.set_playList(this.recommentJson)
            // 当前音乐是否等于即将要播放的音乐？重新加载播放 ： 播放即将的音乐
            if (this.audio_data && this.recommentJson[0].sound.id === this.audio_data.sound.id) {
                this.audio_ele.load()
                this.audio_ele.play()
            } else {
                this.set_audio_data(this.recommentJson[0])
            }
        },
        init() {
            this.get_banner()
            this.get_recommend()
        }
    },
    mounted() {
        this.init()
    }
}
</script>
<style lang='stylus'>
#index{
    position: relative;
    width: 100%;
    background: #fff;
    -webkit-overflow-scrolling: touch;
    .headerTheme {
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