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

let frameWidth = $ref(533);
let frameHeight = $ref(300);
const streamPlayerContainerStyle = $computed(() => {
	if (isStreamPlayerExpanded) {
		return {
			width: `${frameWidth}px`,
			height: `${frameHeight}px`,
		};
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

let isResizeDragging = $ref(false);

function onResizeMouseDown(_event: MouseEvent) {
	isResizeDragging = true;
}

window.addEventListener('mousemove', (event) => {
	if (isResizeDragging) {
		frameWidth = window.innerWidth - event.clientX;
		frameHeight = window.innerHeight - event.clientY;
	}
});

window.addEventListener('mouseup', () => {
	isResizeDragging = false;
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
			class="relative border-t-2 border-l-2 border-orange-500 border-orange-500 rounded-tl-xl transition-all right-0 bottom-0 overflow-hidden cursor-not-allowed bg-white"
			:style="streamPlayerContainerStyle"
		>
			<div
				v-if="isStreamPlayerExpanded"
				class="h-[7px] w-[7px] absolute top-0 left-0 z-2"
				style="cursor: nwse-resize"
				@mousedown.prevent="onResizeMouseDown"
			></div>
			<div v-show="isStreamPlayerExpanded" class="w-full h-full">
				<iframe
					v-if="hasStreamPlayerBeenExpanded"
					:src="twitchIframeSrc"
					class="w-full h-full pointer-events-none"
				></iframe>
			</div>
		</div>
	</div>
</template>
