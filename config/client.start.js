const express = require('express');
const app = express();
const PORT = process.env.PORT || 9090;
const path = require('path');
app
.use(express.static(path.resolve(__dirname, '../dist')))
.use('*', function (req, res){
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'))
})
.listen(PORT, (err)=>{
    if(err) throw err
    console.log(`Test client:prod is listerned on http://localhost:${PORT}`);
});