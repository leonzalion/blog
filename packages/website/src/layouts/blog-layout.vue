<script setup lang="ts">
import { VueSpinnerPuff } from 'vue3-spinners';

import NavigationHeader from '~/components/navigation-header.vue';
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
