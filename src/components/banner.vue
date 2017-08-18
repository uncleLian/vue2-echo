<template>
    <div id='banner'>
        <swiper class='swiper' :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for='item in json' :key='item'>
                <img :src="item">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
</template>
<script>
export default {
    props: {
        json: Array
    },
    data() {
        return {
            swiperOption: {
                notNextTick: true,
                pagination: '.swiper-pagination',
                paginationClickable: true,
                autoplay: 3000,
                autoplayDisableOnInteraction: false
            }
        }
    },
    computed: {

    },
    methods: {

    },
    mounted() {

    }
}
</script>
<style lang='stylus'>
banner_height = 4.26rem
#banner{
    width: 100%;
    padding: 10px;
    height: banner_height;
    background-color: #e8e8e8;
    .swiper{
        width: 100%;
        height: 100%;
        .swiper-slide{
            img{
                width: 100%;
                min-height: banner_height;
            }
        }
        .swiper-pagination{
            width: 100%;
            left: 0;
            bottom: 0.2666rem;
            .swiper-pagination-bullet{
                background: #fff;
            }
        }
    }
}
</style>