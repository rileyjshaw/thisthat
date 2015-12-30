const facebookStrategies = require('./facebook-strategies');
const localStrategies = require('./local-strategies');
const twitterStrategies = require('./twitter-strategies');

function configurePassport (db, passport) {
	// User ID serialization is required for persistent login sessions
	passport.serializeUser(function (id, done) {
		done(null, id);
	});

	passport.deserializeUser(function (id, done) {
		db.select(
			'users.id',
			'users.username',
			'users.email',
			'local_accounts.password',
			'facebook_accounts.account_id',
			'facebook_accounts.token',
			'facebook_accounts.name')
		.from('users')
		.where('users.id', id)
		.leftOuterJoin('local_accounts', 'users.id', 'local_accounts.user_id')
		.leftOuterJoin('facebook_accounts', 'users.id', 'facebook_accounts.user_id')
		.limit(1)
		.then(function (users) {
			return done(null, users[0]);
		})
		.catch(function (err) {
			return done(err, null);
		});
	});

	// Attach our strategies to Passport
	facebookStrategies(db, passport);
	localStrategies(db, passport);
	twitterStrategies(db, passport);
}

module.exports = configurePassport;
