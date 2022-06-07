const createESLintConfig = require('lionconfig/eslint');

module.exports = createESLintConfig(__dirname, {
	rules: {
		'@typescript-eslint/no-unnecessary-condition': 'off',
	},
});
