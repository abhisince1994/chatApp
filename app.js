const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const loginRout = require('./routes/login')
const message = require('./routes/message')

app.use(bodyParser.urlencoded({extended:false}))
app.use('/login',loginRout)
app.use('/message',message)
app.listen(3000)