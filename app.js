const express = require('express');
const moongose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
//Db bağlantısı
moongose.connect('mongodb://127.0.0.1:27017/smartedu-db');

//static folder
app.use(express.static('public'));

//template engine
app.set('view engine', 'ejs');

//middlewares
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/category',categoryRoute);
app.use('/users',userRoute);

app.listen(port, () => {
  console.log(`Server ${port} üzerinde başlatıldı`);
});
