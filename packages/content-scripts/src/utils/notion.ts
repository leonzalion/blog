import { Client } from '@notionhq/client';
import process from 'node:process';
import onetime from 'onetime';

export const getNotionClient = onetime(() => {
	if (process.env.NOTION_KEY === undefined) {
		throw new Error('`NOTION_KEY` not found in environment.');
	}

	return new Client({ auth: process.env.NOTION_KEY });
});
