const FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_AUTH = require('./auth').facebook;

function facebookStrategies (db, passport) {
	// Facebook will send back the token and profile
	function verify (token, refreshToken, profile, done) {
		db('facebook_accounts')
		.where('facebook_accounts.account_id', profile.id)
		.select()
		.limit(1)
		.then(function (users) {
			const user = users[0];

			// If the user is found, log them in
			//
			// TODO(riley): how to we handle existing users who haven't used
			// Facebook login before?
			if (user) {
				return done(null, user.id);
			} else {
				// Sign 'em up!
				//
				// Facebook can return multiple emails so we'll take the first
				// TODO(riley): sketchy? Is this their primary email?
				let email = profile.emails && profile.emails[0].value;
				return db
				.insert({ email }, 'id')
				.into('users');
			}})
		.then(function (ids) {
			return db
			.from('facebook_accounts')
			.insert({
				account_id: profile.id,
				name: `${profile.name.givenName} ${profile.name.familyName}`,
				token: token,
				user_id: ids[0],
			}, 'user_id');
		})
		.then(function (ids) {
			return done(null, ids[0]);
		});
	}

	passport.use('facebook', new FacebookStrategy(FACEBOOK_AUTH, verify));
}

module.exports = facebookStrategies;
