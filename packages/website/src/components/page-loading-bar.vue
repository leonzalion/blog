<script setup lang="ts">
import anime, { AnimeInstance } from 'animejs';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const barShineElement = $ref<HTMLDivElement>();
const barContainerElement = $ref<HTMLDivElement>();

let initialAnimation!: AnimeInstance;
let completedAnimation!: AnimeInstance;
onMounted(() => {
	initialAnimation = anime({
		targets: barContainerElement,
		width: ['0%', '100%'],
		duration: 10_000,
		autoplay: false,
	});

	completedAnimation = anime({
		targets: barContainerElement,
		width: '100%',
		opacity: 0,
		duration: 1000,
		autoplay: false,
	});
});

// Start animating the bar
router.beforeEach(() => {
	completedAnimation.pause();
	completedAnimation.seek(0);
	barContainerElement.style.width = '0%';
	barContainerElement.style.opacity = '1';
	initialAnimation.seek(0);
	initialAnimation.play();
});

// Finish animating the bar
router.afterEach(async () => {
	initialAnimation.pause();
	completedAnimation.play();
});
</script>

<template>
	<div
		ref="barContainerElement"
		class="fixed top-0 left-0 h-[2px] bg-orange-500"
	>
		<div
			ref="barShineElement"
			class="bg-orange-300 absolute top-0 bottom-0 w-[5px]"
		></div>
	</div>
</template>
