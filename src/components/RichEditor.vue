<script setup lang="ts">
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

import Quill from 'quill'
import initWzIdPlaceholderModule from '~/components/QuillWzIdPlaceholderModule'

const editor = shallowRef()

Quill.register('modules/placeholder', initWzIdPlaceholderModule(Quill))

onMounted(() => {
	editor.value = Object.freeze(new Quill(editor.value, {
		theme: 'snow',
		formats: [
			'placeholder',
		],
		modules: {
			// toolbar: false,
			toolbar: { container: '#toolbar' },
			placeholder: {
				placeholders: [
					{id: 'foo', label: 'Foo'},
				],
			},
		},
	}))
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
		<div ref="editor" />
	</section>
</template>
