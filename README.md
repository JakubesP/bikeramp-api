## Description

[Go to task description](https://elpassion.notion.site/Bikeramp-API-fa05688d0f6644ee9fa7ab5fe1a30fe3).

## Installation

```bash
$ npm install
```

## Prepare database

```bash
# run container
$ docker compose up -d

# install dotenv-cli
$ npm install -g dotenv-cli

# deploy migrations
$ dotenv -e .env.stage.dev --  npx prisma migrate deploy
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
