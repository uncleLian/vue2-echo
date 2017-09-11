<template>
    <div id='loading' v-if='visible' :class="{'absolute': type === 'absolute'} ">
        <mu-circular-progress :size="40" class='icon'/>
    </div>
</template>
<script>
export default {
    props: {
        visible: Boolean,
        type: {
            default: 'fixed'
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
    z-index: 20170909;
    &.absolute{
        position: absolute;
    }
    .icon{
        position: absolute;
        top:45%;
        left:50%;
        transform:translate(-50%,-50%);
        text-align: center;
    }
}
</style>