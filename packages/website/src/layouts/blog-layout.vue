<script setup lang="ts">
import NavigationHeader from '~/components/navigation-header.vue';
import { VueSpinnerPuff } from 'vue3-spinners';
import StreamPlayer from '~/components/stream-player.vue';
</script>

<template>
	<div class="column">
		<NavigationHeader />
		<div class="px-4">
			<Suspense>
				<RouterView />
				<template #fallback>
					<div class="h-full w-full column items-center justify-center">
						<div>Loading...</div>
						<VueSpinnerPuff />
					</div>
				</template>
			</Suspense>
		</div>
		<StreamPlayer />
	</div>
</template>
