
### `Intro`
![GitHub Actions status | publish](https://github.com/anzerr/json.stream/workflows/publish/badge.svg)

Split a streamed json into parsable chunks.

#### `Install`
``` bash
npm install --save git+https://github.com/anzerr/json.stream.git
npm install --save @anzerr/json.stream
```

### `Example`
``` javascript
const {JsonStream, Parser} = require('json.stream');

let s = new JsonStream();

s.on('data', (chunk) => {
	console.log(JSON.parse(chunk.toString()));
});

let p = new Parser();
console.log(p.push('{"cat":1}{"cat":2}{"cat":3}').process());

s.write('{"cat":1}{"cat":2}{"cat":3}');
```