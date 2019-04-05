const fs = require('fs');
const path = require('path');

function cleanDir(dir) {
    try{
        const files = fs.readdirSync(dir);
        for (let i of files) {
            const _dir = path.resolve(dir, i);
            const detail = fs.statSync(_dir);
            detail.isDirectory() ? cleanDir(_dir) : fs.unlinkSync(_dir);
        }
        fs.rmdirSync(dir);
    }catch(e) {
        if(e) throw e;
    }

}

module.exports = cleanDir