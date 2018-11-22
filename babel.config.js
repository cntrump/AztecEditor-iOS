module.exports = function( api ) {
	api.cache( true );
	return {
		presets: [
			'module:metro-react-native-babel-preset',
		],
		plugins: [
			/*'@babel/plugin-transform-async-to-generator',*/ /* <--- commented out to make the wpandroid release build work */
			'@babel/plugin-proposal-async-generator-functions',
			'@babel/plugin-transform-runtime',
			'react-native-classname-to-style',
			[
				'react-native-platform-specific-extensions',
				{
					extensions: [
						'css',
						'scss',
						'sass',
					],
				},
			],
		],
		overrides: [
			{ // Transforms JSX into JS function calls and use `createElement` instead of the default `React.createElement`
				plugins: [
					[
						'@babel/plugin-transform-react-jsx',
						{
							pragma: 'createElement',
						},
					],
				],
				exclude: /node_modules\/react-native/,
			},
			{ // Auto-add `import { createElement } from '@wordpress/element';` when JSX is found
				plugins: [
					[
						'@wordpress/babel-plugin-import-jsx-pragma',
						{
							scopeVariable: 'createElement',
							source: '@wordpress/element',
							isDefault: false,
						},
					],
				],
				exclude: /node_modules\/react-native/,
			},
		],
		env: {
			development: {
				plugins: [
					'@babel/transform-react-jsx-source',
				],
			},
		},
	};
};