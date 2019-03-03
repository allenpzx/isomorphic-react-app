const express = require('express');
const app = express();
const PORT = process.env.PORT || 9090;
app
.use(express.static('dist'))
.listen(PORT, (err)=>{
    if(err) throw err
    console.log(`Test client:prod is on PORT ${PORT}`);
});