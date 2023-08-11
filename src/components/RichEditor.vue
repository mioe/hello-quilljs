<script setup lang="ts">
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

import Quill from 'quill'
import initWzIdPlaceholderModule from '~/components/QuillWzIdPlaceholderModule'

const quill = ref()
const editorRef = shallowRef()
const editorDelta = ref()

Quill.register('modules/placeholder', initWzIdPlaceholderModule(Quill))

onMounted(() => {
	quill.value = markRaw(new Quill(editorRef.value, {
		theme: 'snow',
		placeholder: 'hello world..',
		formats: ['placeholder'],
		modules: {
			// toolbar: false,
			toolbar: { container: '#toolbar' },
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
		<div id="toolbar">
			<select class="ql-placeholder">
				<option value="foo">
					Foo
				</option>
			</select>
		</div>
		<div ref="editorRef" />

		<section>
			<p>editorDelta:</p>
			<p>{{ editorDelta }}</p>
		</section>
	</section>
</template>

<style>
.ql-picker.ql-placeholder {
	width: 118px;
}

.ql-picker.ql-placeholder > span.ql-picker-label::before {
	content: 'Placeholders';
}

.ql-picker.ql-placeholder > span.ql-picker-options > span.ql-picker-item::before {
	content: attr(data-label);
}

.ql-wz-id-placeholder {
	background-color: #eee;
	color: #212121;
	border-radius: 16px;
	display: inline-block;
	letter-spacing: .4px;
	padding: 0 10px;
}
</style>
