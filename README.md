# thisthat
A barebones Node.js app using Passport, PostgreSQL and Express 4.

## Running Locally
Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.
You'll also want to install [nodemon](https://github.com/remy/nodemon) before starting:

```sh
npm i -g nodemon
git clone https://github.com/rileyjshaw/thisthat
cd thisthat
npm install
npm start
```

Your app should now be running on [localhost:8080](http://localhost:8080/).

## Deploying to Heroku

```
heroku create
git push heroku master
heroku open
```
