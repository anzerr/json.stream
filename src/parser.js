
const char = Buffer.from('{}"\\');

class Parser {

	constructor() {
		this._stack = {
			data: Buffer.alloc(0),
			start: null
		};
		this.max = Math.pow(2, 18);
	}

	isQuote(data, i) {
		if (data[i] === char[2]) {
			let esc = 0, x = i;
			while (data[x] === char[3]) {
				esc += 1;
				x--;
			}
			return [esc % 2 === 1, esc];
		}
		return [false, 0];
	}

	process() {
		let data = this._stack.data;
		if (data.length === 0) {
			return [];
		}
		if (this._stack.start === null) {
			let i = 0, found = false;
			while (i < data.length) {
				if (data[i] === char[0]) {
					found = true;
					break;
				}
				i++;
			}
			if (found) {
				this._stack.start = i;
			}
			return found ? this.process() : [];
		}
		let o = [];
		let quoted = false, side = [0, 0], start = this._stack.start;
		for (let i = start; i < data.length; i++) {
			if (!quoted) {
				if (data[i] === char[0]) {
					side[0] += 1;
				}
				if (data[i] === char[1]) {
					side[1] += 1;
				}
				if (side[0] === side[1]) {
					let json = data.slice(start, i + 1);
					this._stack.data = data.slice(i, data.length);
					this._stack.start = null;
					o.push(json);
					return o.concat(this.process());
				}
			} else {
				let quote = this.isQuote(data, i);
				if (quote[0]) {
					if (quoted) {
						quoted = false;
					} else {
						quoted = true;
					}
				}
			}
		}
		return o;
	}

	push(chunk) {
		this._stack.data = Buffer.concat([this._stack.data, Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)]);
		let data = this._stack.data;
		this._stack.data = data.slice(Math.max(0, data.length - this.max), data.length);
		return this;
	}

}

module.exports = Parser;
