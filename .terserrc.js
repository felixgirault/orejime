const {name, version, license} = require('./package.json');

module.exports = {
	output: {
		preamble: `/*
${name} v${version} - ${license} license,
original work Copyright (c) 2018 DPKit,
modified work Copyright (c) 2022 Empreinte Digitale,
all rights reserved.
*/`
	}
}
