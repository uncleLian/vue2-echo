<template>
    <div id='banner'>
        <mt-swipe class="swiper" :auto="0">
            <mt-swipe-item class="swiper-item" v-for="(item, index) in json" :key="index">
                <router-link :to="{ name: 'detail', query: { 'id': item.sound.id } }">
                    <img :src="item.sound.pic_640">
                </router-link>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class MusicBanner extends Vue {
    @Prop({ type: Array, required: true, default: [] }) json!: any[]
}
</script>
<style lang='stylus' scoped>
$banner_height = toRem(160);
#banner {
    width: 100%;
    padding: toRem(10);
    height: $banner_height;
    background-color: #e8e8e8;
    .swiper {
        width: 100%;
        height: 100%;
    }
    .swiper-item {
        width: 100%;
        height: 100%;
        a {
            display: block;
        }
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
