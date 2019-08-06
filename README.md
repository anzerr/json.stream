
### `Intro`
Split a streamed json into parsable chunks.

#### `Install`
``` bash
npm install --save git+https://github.com/anzerr/json.stream.git
```

### `Example`
``` javascript
const JsonStream = require('json.stream');

let s = new JsonStream();

s.on('data', (chunk) => {
	console.log(JSON.parse(chunk.toString()));
});

s.write('{"cat":1}{"cat":2}{"cat":3}');
```