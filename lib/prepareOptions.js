"use strict";

module.exports = function prepareOptions(options, argv) {
	argv = argv || {};

	options = handlePlugins(options);
	options = handleExport(options);

	if(Array.isArray(options)) {
		options = options.map(_options => handleFunction(_options, argv));
	} else {
		options = handleFunction(options, argv);
	}
	return options;
};

function handleExport(options) {
	const isES6DefaultExported = (
		typeof options === "object" && options !== null && typeof options.default !== "undefined"
	);
	options = isES6DefaultExported ? options.default : options;
	return options;
}

function handleFunction(options, argv) {
	if(typeof options === "function") {
		options = options(argv.env, argv);
	}
	return options;
}

function handlePlugins(options) {
	if(Array.isArray(options.plugins) || options.plugins === undefined) {
		return options;
	}
	options.plugins = Object.keys(options.plugins).reduce((memo, k) => memo.push(options.plugins[k]), []);
	return options;
}
