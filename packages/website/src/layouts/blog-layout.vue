<script setup lang="ts">
import NavigationHeader from '~/components/navigation-header.vue';
</script>

<template>
	<div class="column">
		<NavigationHeader />
		<div class="px-4">
			<Suspense>
				<RouterView />
			</Suspense>
		</div>
	</div>
</template>
