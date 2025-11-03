# News App

## Table of contents

-   [About](#-about)
-   [Hosted version](#-hosted-version)
-   [Pre-requsites](#-pre-requsites)
-   [Getting started](#-getting-started)
-   [Testing](#-testing)
-   [Useful features](#-useful-features)

## 🚀 About

A small news app that allows you read & post articles. once in the article you can interact with it via up/downvoting or leaving comments.

## 📝 Hosted version

Currently hosted on a free version of render which tears down after 15 mins on inactivity, so hitting this for the first time could take up to 50s to respond as the service spins back up.

https://news-app-ugpw.onrender.com/api/

## 📚 Pre-requsites

Min Versions

-   [docker](https://www.docker.com/get-started/) - built using v28.3.2

## 📚 Getting started

You can start the service in dev mode which is a containerised environment with a postgresdb seeded with test data ready to use. Alternatively there are steps if you would rather run locally.

1. Clone the repo

    > git clone https://github.com/richfrick/news-app.git

2. Create a file called _.env.docker_

    > PGHOST=postgres \
    >  PGDATABASE=nc_news \
    >  PGUSER=postgres \
    >  PGPASSWORD=postgres \
    >  PGPORT=5432

3. Create a file called _.env.test_

    > PGHOST=postgres \
    >  PGDATABASE=nc_news_test \
    >  PGUSER=postgres \
    >  PGPASSWORD=postgres \
    >  PGPORT=5432

4. Start in dev mode

    this launches using nodemon so will hot reload when you sve changes

    > docker-compose -f compose.dev.yaml up --build -d

5. View logs

    To view the container logs while the service is running

    All Logs

    > docker compose -f compose.dev.yaml logs -f

    > docker compose -f compose.dev.yaml logs -f dev_runner/pgdev #delete as appropriate

If you would rather run locally ensure you have a minimum of node v20 postgres v17 installed then

1. Install dependencies

    > npm install

2. Create your test DB

    > npm run setup-test-db

3. Create your dev DB

    > npm run setup-dev-db

4. Seed the data into you development DB

    > npm run seed-dev

5. Start you server

    > npm run start-dev

6. By default this will run on `port: 9090`

## 🚀 Usage

For a list of endponts and direction on their use consult the [/api](http://localhost:9090/api) enpoint of the running service

## 📝 Testing

The repo has an number of unit & integration tests which you can run should you want to check the impact of any changes you have made OR in the event you are a fan of testing.

As part of this the database will be seeded before each test to ensure tests are not impacted by persistent data.

1. run using docker

    > docker-compose -f compose.test.yaml up --build --abort-on-container-exit --remove-orphans

2. if you ar running locally
    > npm test

## 🤝 Useful Info

**Gochas**

When running using docker:

`if the permissions are denied when the app_runner tries to access wait-for-it then run 'chmod +x scripts/wait-for-it.sh' from the root of the project`

If you are seeing any issues when stopping and starting the app in containerssimply run the below followed by the compose up to re-start the app

docker compose -f <compose_file_name>.yaml down -v
