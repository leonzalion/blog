<script setup lang="ts">
import { mdiCalendar, mdiPen } from '@mdi/js';
</script>

<template>
	<div class="row items-center p-4">
		<router-link
			to="/articles"
			class="font-bold hover:text-orange-600 transition-colors"
		>
			blog.leonzalion.com
		</router-link>
		<div class="flex-1"></div>
		<router-link
			to="/articles"
			class="row items-center gap-1 rounded-md group hover:text-blue-500 transition-colors"
			exact-active-class="text-blue-500"
		>
			<VueIcon
				:icon="mdiPen"
				size="20"
				class="text-blue-500 group-hover:text-blue-600 transition-colors"
			/>
			Articles
		</router-link>
		<div class="self-stretch w-[1px] bg-gray-300 mx-2"></div>
		<router-link
			to="/daily-timeblocks"
			class="row items-center gap-1 rounded-md group hover:text-green-500 transition-colors"
			exact-active-class="text-green-500"
		>
			<VueIcon
				:icon="mdiCalendar"
				size="20"
				class="text-green-500 group-hover:text-green-600 transition-colors"
			/>
			Daily Timeblocks
		</router-link>
	</div>
</template>
