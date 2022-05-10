<script setup lang="ts">
import { mdiVideo } from '@mdi/js';

let hasStreamPlayerBeenExpanded = $ref(false);
let isStreamPlayerExpanded = $ref(false);

const twitchIframeSrc = import.meta.env.DEV
	? 'https://player.twitch.tv/?channel=leonzalion&parent=localhost&muted=true'
	: 'https://player.twitch.tv/?channel=leonzalion&parent=blog.leonzalion.com&muted=true';

function onStreamButtonClick() {
	hasStreamPlayerBeenExpanded = true;
	isStreamPlayerExpanded = !isStreamPlayerExpanded;
}

const streamPlayerContainerClass = $computed(() => {
	if (isStreamPlayerExpanded) {
		return 'w-[533px] h-[300px]';
	}
});

const streamPlayerExpandButtonClass = $computed(() => {
	if (isStreamPlayerExpanded) {
		return [
			'rounded-br-xl top-0 left-0 hover:(pr-0.5 pb-0.5 w-7.5 h-7.5) opacity-80',
		];
	} else {
		return ['bottom-0 right-0 hover:(pl-0.5 pt-0.5 w-7.5 h-7.5)'];
	}
});
</script>

<template>
	<div class="fixed bottom-0 right-0">
		<router-link
			v-if="isStreamPlayerExpanded"
			class="absolute top-0 transform -translate-y-full right-0 z-1 bg-orange-500 px-2 pt-1 rounded-tl-xl font-bold text-white underline"
			to="/stream-information"
		>
			Stream Information
		</router-link>
		<div
			class="absolute bg-orange-500 w-7 h-7 column items-center justify-center cursor-pointer transition-all rounded-tl-xl z-1"
			:class="streamPlayerExpandButtonClass"
			@click="onStreamButtonClick"
		>
			<VueIcon :icon="mdiVideo" class="text-white" size="15" />
		</div>
		<div
			class="relative border-t-2 border-l-2 border-orange-500 border-orange-500 rounded-tl-xl transition-all right-0 bottom-0 overflow-hidden pointer-events-none cursor-not-allowed bg-white"
			:class="streamPlayerContainerClass"
		>
			<div v-show="isStreamPlayerExpanded" class="w-full h-full">
				<iframe
					v-if="hasStreamPlayerBeenExpanded"
					:src="twitchIframeSrc"
					class="w-full h-full"
				></iframe>
			</div>
		</div>
	</div>
</template>
