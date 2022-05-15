import * as fs from 'node:fs';
import * as path from 'node:path';

import { contentPackageDir } from '~/utils/paths.js';

interface ContentMetadata {
	files: string[];
}

export async function generateContentMetadata() {
	const metadataDir = path.join(contentPackageDir, 'metadata');

	const contentDirNames = ['daily-timeblocks', 'metadata', 'tasks'];
	await Promise.all(
		contentDirNames.map(async (contentDirName) => {
			const contentMetadata = {} as ContentMetadata;
			const contentDir = path.join(contentPackageDir, contentDirName);

			const files = await fs.promises.readdir(contentDir);
			contentMetadata.files = files;

			const metadataFilePath = path.join(metadataDir, `${contentDirName}.json`);
			await fs.promises.writeFile(
				metadataFilePath,
				JSON.stringify(contentMetadata)
			);
		})
	);
}
