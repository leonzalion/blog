<script setup lang="ts">
import './css/prose.postcss';
</script>

<template>
	<router-view />
</template>

<style>
body,
html,
#app {
	height: 100%;
	background-color: rgb(251, 251, 251);
}

#app {
	font-family: Avenir, Arial, sans-serif;
}

#app .markdown-body {
	background-color: rgb(251, 251, 251);
	font-family: Avenir, Arial, sans-serif;
}

#app input[type='checkbox'] {
	margin-right: 2px;
}
</style>
