<template>
    <div class="error" v-if='visible' :class="{'absolute': type === 'absolute'} " >
        <slot>
            <div class="error_wrap">
                <p>网络出现错误</p>
                <mu-raised-button class="error_btn" label="重新加载" icon="error" @click.stop="reload"/>
            </div>
        </slot>
    </div>
</template>
<script>
export default {
    props: {
        visible: Boolean,
        reload: Function,
        type: {
            default: 'fixed'
        }
    }
}
</script>
<style scoped lang='stylus'>
.error {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 20170909;
    text-align: center;
    &.absolute{
        position: absolute;
    }
    .error_wrap{
        position: absolute;
        top:45%;
        left:50%;
        transform:translate(-50%,-40%);
        text-align: center;
        p{
            font-size: 18px;
            color: #999;
            margin-bottom: 5px;
        }
        .error_btn{
            background-color: #ef5350;
            color: #fff;
        }
    }
}
</style>