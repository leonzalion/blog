declare global {
	namespace NodeJS {
		interface ProcessEnv {
			GIFT_CARD_CODE: string;
			TWITCH_CLIENT_ID: string;
			TWITCH_CLIENT_SECRET: string;
			NODE_ENV: string;
			GITHUB_BOT_TOKEN: string;
			NOTION_KEY: string;
		}
	}
}

export {};
