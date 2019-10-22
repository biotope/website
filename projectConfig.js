module.exports = {
	project: 'Biotope - The Frontend Ecosystem Framework',
	global: {
		tasks: {
			htmlhint: false
		},
		externalResources: {
			'vi-css-helper': ['helper.css', 'print.css'],
			'sanitize.css': 'sanitize.css',
			'handlebars': 'dist/handlebars.runtime.js',
			'@webcomponents/webcomponentsjs': [
				'custom-elements-es5-adapter.js'
			  ]
		},
		tsEntryPoints: [
			'resources/ts/**/*.ts',
			'components/**/*.ts'
		]
	},
	webpack: {
		watchScss: true
	},
	uglify: {
		ignoreList: [
		  'src/resources/js/polyfills/object-assign.polyfill.js',
		  'resources/js/vendor/custom-elements-es5-adapter.js',
		  'resources/js/polyfills/webcomponents-loader.js',
		  'resources/js/polyfills/bundles/webcomponents-ce.js',
		  'resources/js/polyfills/bundles/webcomponents-sd-ce-pf.js',
		  'resources/js/polyfills/bundles/webcomponents-sd-ce.js',
		  'resources/js/polyfills/bundles/webcomponents-sd.js'
		]
	  },
	  connect: {
		  port: 9002
	  },
	  favicons: {
		  path: '/favicons/'
	  }
};
