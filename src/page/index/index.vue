<template>
    <div id='index'>
        <div class="header_bg"><img src="~@/assets/img/header_bg_.jpg"></div>
        <my-banner :json='bannerJson'></my-banner>
        <div class="recommend">
            <h3 class="recommen_title">echo每日推荐</h3>
            <p class="recommend_tip">刚刚推荐</p>
            <my-list :json='recommentJson'></my-list>
        </div>
        <mu-infinite-scroll :scroller="scroller" :loading="bottom_loading" @load="get_recommend"/>
        <my-loading :visible='loading'/>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
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
    methods: {
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
            top: 55px;
            z-index: 2;
            width: 117px;
            height: 26px;
            text-indent: 10px;
            line-height: 26px;
            color: #ffffff;
            font-size: 12px;
        }
    }
}
</style>
<style>
.recommend_tip{
    background: url(~@/assets/icon/echo_mobile_sprites@3_8.png)no-repeat;
    background-size: 400px;
    background-position: -131px -334px;
}
</style>