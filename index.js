const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const flash        = require('connect-flash');
const morgan       = require('morgan');
const passport     = require('passport');
const session      = require('express-session');

const db = require('./db');
const app = express();
app.set('port', (process.env.PORT || 8080));

// Attach express middleware
app.use(morgan('dev'));  // Log every request to the console
app.use(cookieParser()); // Read cookies (needed for auth)
app.use(bodyParser());   // Parse information from HTML forms

// Set up views and public assets
app.use(express.static(`${__dirname}/public/dist`));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

// Set up passport
require('./config/passport')(db, passport);
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // TODO(riley): no.
app.use(passport.initialize());
app.use(passport.session()); // Persistent login sessions
app.use(flash());            // Flash messages stored in session

// Set up our routes and start listening for requests
require('./app/routes.js')(app, passport);
app.listen(app.get('port'), () => console.log(
	`THISTHAT server up and running on port ${app.get('port')}! ⚡`
));
