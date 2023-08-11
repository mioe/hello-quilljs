<script setup lang="ts">
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.core.css'

const editor = shallowRef()

onMounted(() => {
	editor.value = Object.freeze(new Quill(editor.value, {
		theme: 'snow',
		formats: [],
		modules: {
			toolbar: false,
		},
	}))
})
</script>

<template>
	<section class="max-w-[380px] w-full">
		<div ref="editor" />
	</section>
</template>
