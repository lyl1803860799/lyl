<template>
    <div id="link-container">
        <!-- <el-link href="https://element.eleme.io" target="_blank">默认链接</el-link> -->
        <template v-for="item in dataList" >
            <el-link 
                :key="item.key"
                :type="colorList[item.key]"
                style="margin:10px"
                @click="urlChange(item.url)"
            >
                {{item.text}}
            </el-link>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            colorList: ['primary','success','warning', 'danger', 'info'],
        }
    },
    props: {
        other: {
            default: false,
            type: Boolean,
        },
        dataList: {
            type: Array,
            default: () => {[]},
        }
    },
    methods: {
        urlChange(url) {
            if(this.other) {
                // window.history.pushState({}, 0,  url );
                window.location.href = url
            }else {
                this.$router.push(`${url}`)
            }
        }
    }
}
</script>

<style>

</style>