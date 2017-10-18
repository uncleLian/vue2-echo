<template>
    <ul class='list'>
        <li class="list-item" v-for='(item,index) in json' :key="index">
            <router-link :to="url(item)">
                <div class="pic_wrap">
                    <img :src="item.sound.pic_500">
                    <span class="fire" v-if='item.sound.is_hot' :class='hotClass(item.sound.is_hot)'></span>
                </div>
                <h4>{{item.sound.name}}</h4>
            </router-link>
            <p class="channel">
                <a>{{item.sound.channel.name}}</a>
                频道
            </p>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        json: Array
    },
    methods: {
        url(item) {
            return `/detail/${item.sound.id}`
        },
        hotClass(hot) {
            switch (hot) {
                case 1: return 'fire-red'
                case 3: return 'fire-yellow'
                case 4: return 'fire-blue'
            }
        }
    }
}
</script>
<style scoped lang='stylus'>
img_height = 4.6666rem
.list{
    font-size: 0;
    .list-item{
        display: inline-block;
        width: 50%;
        padding: 0 10px 6px;
        a{
            text-decoration: none;
        }
        .pic_wrap{
            width: 100%;
            height: img_height;
            position: relative;
            overflow-y: hidden;
            img{
                width: 100%;
                min-height: img_height;
            }
            .fire{
                position: absolute;
                top: 15px;
                right: 15px;
                width: 22px;
                height: 22px;
                &.fire-red{
                    display: block;
                    background-position: -162px -215px;
                }
                &.fire-yellow{
                    display: block;
                    background-position: -0px -215px;
                }
                &.fire-blue{
                    display: block;
                    background-position: -299px -215px;
                }
            }
        }
        h4{
            width: 100%;
            font-size: 14px;
            color: #666666;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            padding-top: 5px;
        }
        .channel{
            font-size: 12px;
            color: #999999;
            a{
                display: inline-block;
                width: 75%;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                vertical-align: middle;
                color: #7DD97F;
            }
        }
    }
}
</style>
<style scoped>
.fire{
    background: url(~@/assets/icon/echo_mobile_sprites@3_8.png)no-repeat;
    background-size: 320px;
}
</style>