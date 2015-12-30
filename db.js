var db = require('knex')({
	client: 'pg',
	connection: process.env.DATABASE_URL,
});

db.schema.createTable('users', function (table) {
	table.bigIncrements('id').primary();
	table.string('first_name', 100);
	table.string('last_name', 100);
	table.string('username', 100);
	table.string('email', 100);
	table.text('bio');
}).catch(function (e) {
	if (e.message.search('already exists') === -1) throw e;
});

db.schema.createTable('local_accounts', function (table) {
	table.bigIncrements('id').primary();
	table.bigInteger('user_id').unsigned().references('users.id');
	table.string('password', 100);
}).catch(function (e) {
	if (e.message.search('already exists') === -1) throw e;
});

db.schema.createTable('twitter_accounts', function (table) {
	table.bigIncrements('id').primary();
	table.bigInteger('user_id').unsigned().references('users.id');
	// TODO(riley): fix types
	table.string('account_id', 100);
	table.string('token', 100);
	table.string('username', 100);
	table.string('display_name', 100);
}).catch(function (e) {
	if (e.message.search('already exists') === -1) throw e;
});

db.schema.createTable('facebook_accounts', function (table) {
	table.bigIncrements('id').primary();
	table.bigInteger('user_id').unsigned().references('users.id');
	table.string('account_id', 32);
	table.string('token');
	table.string('name', 100);
}).catch(function (e) {
	if (e.message.search('already exists') === -1) throw e;
});

module.exports = db;
