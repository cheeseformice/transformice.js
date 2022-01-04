/** @type {import('@docusaurus/types').Config} */
module.exports = {
	title: "Transformice.js",
	tagline: "Transformice.js is a Node.js Client for Transformice that allows you to create bots.",
	url: "https://github.com/cheeseformice/transformice.js",
	baseUrl: "/",
	onBrokenLinks: "warn",
	onBrokenMarkdownLinks: "warn",
	favicon: "img/favicon.ico",
	organizationName: "Cheeseformice", // Usually your GitHub org/user name.
	projectName: "Transformice.js", // Usually your repo name.
	themeConfig: {
		navbar: {
			title: "Transformice.js",
			items: [
				{
					to: "docs/",
					activeBasePath: "docs",
					label: "Docs",
					position: "left",
				},
				{
					href: "https://github.com/cheeseformice/transformice.js",
					label: "Source",
					position: "left",
				},
				{
					href: "http://npmjs.com/package/@cheeseformice/transformice.js",
					label: "NPM",
					position: "left",
				},
			],
		},
		footer: {
			style: "dark",
			copyright: `Copyright © ${new Date().getFullYear()}`,
		},
	},
	presets: [
		[
			"@docusaurus/preset-classic",
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve("./sidebars.js"),
				},
				theme: {
					customCss: require.resolve("./src/css/custom.css"),
				},
			}),
		],
	],
	plugins: [
		[
			"docusaurus-plugin-typedoc",
			/** @type {import('docusaurus-plugin-typedoc/dist/types').PluginOptions} */
			({
				entryPoints: ['../src/index.ts'],
				//entryPointStrategy: "expand",
        		tsconfig: '../tsconfig.json',
				excludePrivate: true,
				excludeProtected: true,
				excludeExternals: true,
				disableSources: true,
				plugin: ["typedoc-plugin-no-inherit", "typedoc-plugin-missing-exports"],
				internalNamespace: "Internal"
			}),
		],
		require.resolve("@cmfcmf/docusaurus-search-local"),
	],
};
