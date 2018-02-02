var express = require('express');
var app = express();

app.use(express.static('test'));

console.log('server start at 3001')
app.listen(3001);
