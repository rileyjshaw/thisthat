module.exports = {

	'facebook' : {
		'clientID'      : '1596084840656548',    // App ID
		'clientSecret'  : process.env.FB_SECRET, // App secret
		'callbackURL'   : 'http://localhost:5100/auth/facebook/callback',
	},

	'twitter' : {
		'consumerKey'       : 'your-consumer-key-here',
		'consumerSecret'    : 'your-client-secret-here',
		'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
	},

	'google' : {
		'clientID'      : 'your-secret-clientID-here',
		'clientSecret'  : 'your-client-secret-here',
		'callbackURL'   : 'http://localhost:8080/auth/google/callback'
	}

};
