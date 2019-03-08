const express = require('express');
const app = express();
const PORT = process.env.PORT || 9090;
const htmlGenerator = require('./html-generator.js').default;

app
.use(express.static('dist'))
.use('*', (req, res, next)=>htmlGenerator(req, res, next))
.listen(PORT, (error)=>{
    if(error){
        console.log('[error]-', error);
    }
    console.log(`App is listent on PORT http://localhost${PORT}`);
})