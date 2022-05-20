<script setup lang="ts">
import NavigationHeader from '~/components/navigation-header.vue';
import PageLoadingBar from '~/components/page-loading-bar.vue';
import StreamPlayer from '~/components/stream-player.vue';
</script>

<template>
	<div class="column">
		<PageLoadingBar />
		<NavigationHeader />
		<div class="px-4">
			<Suspense>
				<RouterView />
			</Suspense>
		</div>
		<StreamPlayer />
	</div>
</template>
