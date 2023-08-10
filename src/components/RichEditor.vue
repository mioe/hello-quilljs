<script setup lang="ts">
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.core.css'

const editor = shallowRef()
const counter = shallowRef()

Quill.register('modules/counter', function(quill, options) {
	var container = counter.value
	quill.on('text-change', function() {
		var text = quill.getText()
		// There are a couple issues with counting words
		// this way but we'll fix these later
		container.innerText = text.split(/\s+/).length
	})
})

onMounted(() => {
	editor.value = Object.freeze(new Quill(editor.value, {
		theme: 'snow',
		formats: [],
		modules: {
			toolbar: false,
			counter: true,
		},
	}))
})
</script>

<template>
	<section class="max-w-[380px] w-full">
		<div ref="editor" />
		<div ref="counter">
			0
		</div>
	</section>
</template>
