const express = require('express');
const moongose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const winston = require('winston');
var flash = require('connect-flash');
const port = 3000;
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

//global variables
global.userID = null;


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.Console(),
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//Db bağlantısı
moongose.connect('mongodb://127.0.0.1:27017/smartedu-db');

//static folder
app.use(express.static('public'));

//template engine
app.set('view engine', 'ejs');

//middlewares
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/smartedu-db' })
  })
);

app.use('*', (req, res, next) => {
  userID = req.session.userID;
  next();
});

app.use(flash());
app.use('*',(req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

//log operations with logger library
// app.use('*',(req,res,next) => {
//   console.log("res:",res);
//   logger.log({
//     level:'info',
//     message: `url:${req.url} method:${req.method} statusCode:${req.statusCode}`
//   });
//   next();
// });


app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/category', categoryRoute);
app.use('/users', userRoute);

app.listen(port, () => {
  console.log(`Server ${port} üzerinde başlatıldı`);
});
