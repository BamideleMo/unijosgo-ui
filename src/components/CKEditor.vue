<template>
    <div>
        <textarea id="editor1" name="editor1"> </textarea>
    </div>
</template>

<script>
import {ref} from 'vue';

export default {

    name: "CKEditor",
    props: ["content"],

    setup (props) {
        const content = ref(props.content)

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>