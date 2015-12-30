function routes (app, passport) {
	// Homepage
	app.get('/', function (req, res) {
		res.render('pages/index.ejs');
	});

	// Login form
	app.get('/login', function (req, res) {
		// Render the page and pass in any flash data if it exists
		res.render('pages/login.ejs', { message: req.flash('loginMessage') });
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// Signup form
	app.get('/signup', function (req, res) {
		// Render the page and pass in any flash data if it exists
		res.render('pages/signup.ejs', { message: req.flash('signupMessage') });
	});

	// Process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFlash : true // allow flash messages
	}));

	// Profile page
	app.get('/profile', isLoggedIn, function (req, res) {
		res.render('pages/profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// Facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', {
		scope : 'email'
	}));

	// Handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect : '/profile',
		failureRedirect : '/'
	}));

	// Logout redirect
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});
}

// Route middleware to make sure a user is logged in. If they aren't,
// redirect them to the home page
function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) return next();
	else res.redirect('/');
}

module.exports = routes;
