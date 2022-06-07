import type { RouterLink, RouterView } from 'vue-router';

declare module 'vue' {
	export interface GlobalComponents {
		RouterLink: typeof RouterLink;
		RouterView: typeof RouterView;
	}
}
