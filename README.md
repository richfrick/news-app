# NC News

## Getting started

in order to use this you will need define environment variables for connecting to the test and development databases while running locally

1. npm run setup-dbs
2. .env.development\*\* with a single variable of PGDATABASE=nc_news
3. .env.test\*\* with a single variable of PGDATABASE=nc_news

this will allow you to seed data into test & dev by running npm run test-seed/seed-dev

\*\*gitignore already excludes these
