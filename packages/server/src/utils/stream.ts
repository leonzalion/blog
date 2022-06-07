import { got } from 'got';
import process from 'node:process';

/**
	If stream is inactive, reveal a gift card code
*/
export async function checkIsTwitchStreamActive() {
	// Retrieve an OAuth2 token from Twitch
	const keys = await got
		.post('https://id.twitch.tv/oauth2/token', {
			json: {
				client_id: process.env.TWITCH_CLIENT_ID,
				client_secret: process.env.TWITCH_CLIENT_SECRET,
				grant_type: 'client_credentials',
			},
		})
		.json<{ access_token: string }>();

	// Get an info about a user's active streams
	const streamData = await got
		.get('https://api.twitch.tv/helix/streams?user_login=leonzalion', {
			headers: {
				'Client-ID': process.env.TWITCH_CLIENT_ID,
				Authorization: `Bearer ${keys.access_token}`,
			},
		})
		.json<{ data: unknown[] }>();

	return streamData.data.length > 0;
}
