<template>
    <div id='loading' v-if='visible' :class="type === 1? '' : 'absolute'">
        <mu-circular-progress :size="40" class='icon'/>
    </div>
</template>
<script>
export default {
    props: {
        visible: Boolean,
        type: {
            default: 1
        }
    }
}
</script>
<style scoped lang='stylus'>
#loading{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 333;
    &.absolute{
        position: absolute;
    }
    .icon{
        position: absolute;
        top: 40%;
        left: 50%;
        margin-top: -20px;
        margin-left: -20px;
    }
}
</style>