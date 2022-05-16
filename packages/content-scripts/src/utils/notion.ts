import { Client } from '@notionhq/client';
import process from 'node:process';
import { NotionToMarkdown } from 'notion-to-md';
import onetime from 'onetime';

export const getNotionClient = onetime(() => {
	if (process.env.NOTION_KEY === undefined) {
		throw new Error('`NOTION_KEY` not found in environment.');
	}

	return new Client({ auth: process.env.NOTION_KEY });
});

export const getNotionToMarkdown = onetime(() => {
	const n2m = new NotionToMarkdown({ notionClient: getNotionClient() });

	return n2m;
});
