
const {Transform} = require('stream'),
	Parser = require('./src/parser.js');

class JsonStream extends Transform {

	constructor() {
		super({writableObjectMode: true});
		this.parser = new Parser();
	}

	_transform(chunk, encoding, callback) {
		let o = this.parser.push(chunk).process();
		for (let i in o) {
			this.push(o[i]);
		}
		callback();
	}

}

module.exports = JsonStream;
