# News App

## Table of contents

- [About](#-about)
- [Pre-requsites](#-minimum-versions)
- [Getting started](#-getting-started)
- [Testing](#testing)
- [Useful features](#useful-features)
- [Hosted version](#hosted-version)

## 🚀 About

A small news app that allows you post articles then interact with them via up or downvoting and leaving comments.

## 📚 Pre-requsites

Min Versions

- [node v20 or above](https://nodejs.org/api/https.html)
- [Postgres v17 or above](https://postgresapp.com/)

## 📝 Getting started

In order to use this you will need define environment variables for connecting to the test and development databases we'll cover in the steps below. The rest of the setup will make use of pre-defined scripts.

1. Clone the repo

   `git clone https://github.com/richfrick/news-app.git`

2. Install dependencies

   `npm install`

3. Create a file called _.env.development_\*\* with a single variable of

   ` PGDATABASE=nc_news`

4. Create a file called _.env.test_\*\* with a single variable of

   `PGDATABASE=nc_news_test`

5. Create your DBs

   `npm run setup-dbs`

6. Seed the data into you development DB

   `npm run seed-dev`

7. Start you server

   `npm run start`

8. By default this will run on `port: 9090`

\*\*gitignore will exclude these

## 🚀 Usage

For a list of endponts and direction on their use consult the [/api](http://localhost:9090/api) enpoint of the running service

## 📝 Testing

The repo has an number of unit & integration tests which you can run should you want to check the impact of any changes you have made OR in the event you are a fan of testing.

As part of this the database will be seeded before each test to ensure tests are not impacted by persistent data. Just run:

    npm test

## 🤝 Useful Features

1. nodemon allows you to run the app and make changes without restarting it. To use this, in package.json update the "start" script to use nodemon

   `"start": "nodemon ./app/listen.js"`

## 📚 Hosted version

https://news-app-ugpw.onrender.com/api/
