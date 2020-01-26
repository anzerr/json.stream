
const {JsonStream} = require('./index.js'),
	pack = require('./package.json'),
	packlock = require('./package-lock.json');

let s = new JsonStream();

let tick = 0;
const think = setInterval(() => {
	let data = '';
	for (let i = 0; i < 200; i++) {
		let r = Math.floor(Math.random() * 5);
		if (r === 0) {
			data += JSON.stringify(pack);
		} else if (r === 1) {
			data += JSON.stringify(packlock);
		} else if (r === 2) {
			data += [1, 1, 1, 1, 1, 1].map(() => Math.random().toString(26)).join('');
		} else if (r === 3) {
			data += '{"cat": 1, 5e4g6z4ge65e}';
		} else if (r === 4) {
			data += '{"cat": 1,';
		}
	}
	s.write(data);
	if (tick > 10) {
		clearInterval(think);
	}
	tick += 1;
}, 100);

let found = 1, valid = 1;
s.on('data', (chunk) => {
	try {
		JSON.parse(chunk.toString());
		valid++;
	} catch (e) {
		//
	}
	found++;
	console.log(found, valid);
});
