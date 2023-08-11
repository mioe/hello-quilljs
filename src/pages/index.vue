<script setup lang="ts">
import RichEditor from '~/components/RichEditor.vue'
const tag = ref(false)
</script>

<template>
	<main class="flex flex-col items-center gap-[16px] p-[16px]">
		<h1>hello-quilljs</h1>
		<header class="flex flex-col items-center gap-[4px]">
			<h2>references:</h2>
			<a
				href="https://ckeditor.com/docs/ckeditor5/latest/examples/framework/content-placeholder.html"
				target="_blank"
			>
				ckeditor5-content-placeholder
			</a>
			<a
				href="https://github.com/jspaine/quill-placeholder-module"
				target="_blank"
			>
				quill-placeholder-module
			</a>
		</header>
		<div class="w-full flex flex-col items-center gap-[4px]">
			<h2>result:</h2>
			<RichEditor />
			<span>
				<label for="tag">enabled tag: </label>
				<input
					id="tag"
					v-model="tag"
					type="checkbox"
				>
			</span>
		</div>
	</main>
</template>
