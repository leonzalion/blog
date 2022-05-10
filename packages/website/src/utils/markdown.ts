import Markdown from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItPrism from 'markdown-it-prism';
// @ts-expect-error
import markdownItTaskCheckbox from 'markdown-it-task-checkbox';
import onetime from 'onetime';

export const getMarkdownInstance = onetime(() => {
	const md = new Markdown({
		html: true,
		linkify: true,
		typographer: true,
	});

	md.linkify.set({ fuzzyLink: false });

	md.use(markdownItTaskCheckbox);
	md.use(markdownItAnchor);
	md.use(markdownItPrism);

	return md;
});
