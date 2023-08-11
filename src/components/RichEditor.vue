<script setup lang="ts">
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

import Quill from 'quill'
import initWzIdPlaceholderModule from '~/components/QuillWzIdPlaceholderModule'

const quill = ref()
const editorRef = shallowRef()
const qlPlaceholderButtonRef = shallowRef()
const editorDelta = ref()

Quill.register('modules/placeholder', initWzIdPlaceholderModule(Quill))

onMounted(() => {
	quill.value = markRaw(new Quill(editorRef.value, {
		theme: 'snow',
		placeholder: 'hello world..',
		formats: ['placeholder'],
		modules: {
			toolbar: { container: '#ql-ghost-toolbar' },
			placeholder: true,
		},
	}))

	quill.value.on('text-change', () => {
		editorDelta.value = quill.value.getContents()
	})
})
</script>

<template>
	<section class="max-w-[380px] w-full">
		<div
			v-show="false"
			id="ql-ghost-toolbar"
		>
			<button
				ref="qlPlaceholderButtonRef"
				class="ql-placeholder"
			/>
		</div>
		<div ref="editorRef" />

		<button @click="qlPlaceholderButtonRef.click()">
			toggle placeholder
		</button>

		<section>
			<p>editorDelta:</p>
			<pre>{{ editorDelta }}</pre>
		</section>
	</section>
</template>

<style>
.ql-wz-id-placeholder {
	background-color: #eee;
	color: #212121;
	border-radius: 16px;
	display: inline-block;
	letter-spacing: .4px;
	padding: 0 10px;
}
</style>
