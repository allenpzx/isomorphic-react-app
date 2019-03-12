const express = require('express');
const app = express();
const PORT = process.env.PORT || 9090;
const fs = require('fs');
app
.use(express.static('dist'))
.use('/upload', (req, res, next)=>{
    // console.log('req: ', req);
})
.listen(PORT, (error)=>{
    if(error){
        console.log('[error]-', error);
    }
    console.log(`App is listent on PORT http://localhost${PORT}`);
})