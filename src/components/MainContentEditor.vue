<template>
    <div>
        <textarea class="border !border-red-600" id="editor2" name="editor2"> </textarea>
    </div>
</template>

<script>
import {onMounted, ref} from 'vue';

export default {

    name: "CkEditor",
    props: ["content"],

    setup (props, {emit}) {
        const content = ref(props.content);
        let ckEditor;
        onMounted(()=>{
            ckEditor = window.CKEDITOR.replace("editor2")
            ckEditor.setData(content.value)
            ckEditor.on('change', ()=>{
                emit('sendContent', ckEditor.getData())
            })
        })
    }
}
</script>

<style lang="scss" scoped>

</style>