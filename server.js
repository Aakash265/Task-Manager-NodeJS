require('./models/db');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');


const taskController = require('./controllers/taskController');

var app = express();

app.use(bodyparser.urlencoded({
    extended: true,
}));

app.use(bodyparser.json());

app.set('views', path.join(__dirname, '/views/'));

// app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));

app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Started at port : 3000');
});

app.use('/task', taskController);