import { Client } from '@notionhq/client';
import process from 'node:process';
import onetime from 'onetime';

export const getNotionClient = onetime(
	() => new Client({ auth: process.env.NOTION_KEY })
);
