<script setup lang="ts">
import RichEditor from '~/components/RichEditor.vue'
const tag = ref(false)
</script>

<template>
	<main class="flex flex-col items-center gap-[16px] p-[16px]">
		<h1>hello-quilljs</h1>
		<RichEditor />
		<span>
			<label for="tag">enabled tag: </label>
			<input
				id="tag"
				v-model="tag"
				type="checkbox"
			>
		</span>
	</main>
</template>
