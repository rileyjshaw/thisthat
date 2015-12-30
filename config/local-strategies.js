var LocalStrategy = require('passport-local').Strategy;

var LOCAL_OPTIONS = { passReqToCallback: true };

function localStrategies (db, passport) {
	function verifySignup (req, username, password, done) {
		db('users')
		.where('users.username', username)
		.select()
		.limit(1)
		.then(function (users) {
			if (users[0]) {
				return done(null, false, req.flash(
					'signupMessage', 'That username is already taken.'
				));
			} else {
				return db
				.insert({ username: username }, 'id')
				.into('users');
			}})
		.then(function (ids) {
			return db
			.from('local_accounts')
			.insert({
				password: password,
				user_id: ids[0],
			}, 'user_id');
		})
		.then(function (ids) {
			return done(null, ids[0]);
		});
	}

	function verifyLogin (req, username, password, done) {
		db('users')
		.leftOuterJoin('local_accounts', 'users.id', 'local_accounts.user_id')
		.where('users.username', username)
		.select('users.id', 'users.username', 'local_accounts.password')
		.limit(1)
		.then(function (users) {
			var user = users[0];

			if (!user) {
				return done(null, false, req.flash(
					'loginMessage', 'No user found.'
				));
			} else if (user.password !== password) {
				return done(null, false, req.flash(
					'loginMessage', 'Oops! Wrong password.'
				));
			} else {
				return done(null, user.id);
			}
		});
	}

	function createLocalStrategy (name, verify) {
		passport.use(name, new LocalStrategy(LOCAL_OPTIONS, verify));
	}

	createLocalStrategy('local-signup', verifySignup);
	createLocalStrategy('local-login', verifyLogin);
}

module.exports = localStrategies;
