const fs = require('fs');
const path = require('path');
const dist = path.resolve(__dirname, '../dist');
const manifest = JSON.parse(fs.readFileSync(dist+'/server.manifest.json', 'utf8'));

console.log('manifest: ', manifest['server.js']);

require(dist+'/'+manifest['server.js']);