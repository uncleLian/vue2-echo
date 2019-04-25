<template>
    <ul class="list">
        <li class="list-item" v-for="item in json" :key="item.sound.id">
            <router-link class="item-link" :to="{ path: 'detail', query: { 'id': item.sound.id } }">
                <!-- 图片 -->
                <div class="item-image-container">
                    <img class="item-image" :src="item.sound.pic_500">
                    <div class="my-icon-hot item-fire" v-if='item.sound.is_hot' :class='item.sound.is_hot | hotClass'></div>
                </div>
                <!-- 名字 -->
                <div class="item-name">{{item.sound.name}}</div>
            </router-link>
            <!-- 频道 -->
            <div class="item-channel">
                <a class="item-channel-value">{{item.sound.channel.name}}</a>
                <div class="item-channel-label">频道</div>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        json: {
            type: Array,
            default: () => [],
            required: true
        }
    }
}
</script>
<style lang='stylus' scoped>
$imageHeight = toRem(175);
.list {
    display: flex;
    flex-wrap: wrap;
    .list-item {
        width: 50%;
        padding: 0 toRem(10);
        margin-bottom: toRem(8);
        .item-link {
            display: block;
            .item-image-container {
                width: 100%;
                height: $imageHeight;
                position: relative;
                overflow: hidden;
                .item-image {
                    width: 100%;
                    min-height: $imageHeight;
                }
                .item-fire {
                    position: absolute;
                    top: toRem(15);
                    right: toRem(15);
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: toRem(22);
                    height: toRem(22);
                    font-size: toRem(16);
                    border-radius: 100%;
                    background: #fff;
                    &.fire-red {
                        color: $redColor;
                    }
                    &.fire-blue {
                        color: $blueColor;
                    }
                    &.fire-yellow {
                        color: $yellowColor;
                    }
                }
            }
            .item-name {
                width: 100%;
                color: $normalColor;
                font-size: toRem(14);
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                margin-top: toRem(8);
            }
        }
        .item-channel {
            display: flex;
            align-items: center;
            color: $infoColor;
            font-size: toRem(12);
            margin-top: toRem(5);
            .item-channel-value {
                max-width: 80%;
                width: 80%;
                color: $linkColor;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }
    }
}
</style>
