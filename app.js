const express = require('express');

const app = express();
const port = 3000;
const pageRoute = require('./routes/pageRoute');

//static folder
app.use(express.static('public'));

//template engine
app.set('view engine', 'ejs');

app.use('/', pageRoute);

app.listen(port, () => {
  console.log(`Server ${port} üzerinde başlatıldı`);
});
