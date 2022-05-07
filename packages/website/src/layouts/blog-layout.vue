<script setup lang="ts">
import NavigationHeader from '~/components/navigation-header.vue';
import { VueSpinnerPuff } from 'vue3-spinners';
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
	</div>
</template>
