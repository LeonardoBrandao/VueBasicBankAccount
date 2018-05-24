var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Account = require('./models/accountsModel'), //created model loading here
    bodyParser = require('body-parser');

var cors = require('cors');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Accountsdb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

var routes = require('./routes/accountsRoutes'); //importing route
routes(app); //register the route

app.listen(port);