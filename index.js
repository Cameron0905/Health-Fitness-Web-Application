const express = require('express');
const app = express();
const path  = require('path');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

// Express-handlebars setup
app.engine('hbs', hbs.engine({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'hbs')

// Sets public folder as static
app.use(express.static(path.join(__dirname, 'public')));

// Request parsing middleware
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// Routes
app.use('/', require('./server/routes/default'));
app.use('/createAccount', require('./server/routes/createAccount'));
app.use('/login', require('./server/routes/login'));
app.use('/user', require('./server/routes/user'));

// Creates port URL
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));