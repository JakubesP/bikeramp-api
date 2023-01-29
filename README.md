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

Before it, create `env.stage.dev` file in the project directory:

```text
HTTP_PORT=3000
DATABASE_URL="postgresql://admin:admin@localhost:5432/bikeramp_api?schema=public"
GOOGLE_MAPS_API_KEY=[YOUR_API_KEY]
```

then:

```bash
# watch mode
$ npm run start:dev
```

## Unit tests

```bash
$ npm run test
```

## Integrational tests

Before it, create `env.stage.test` file in the project directory:

```text
HTTP_PORT=3000
DATABASE_URL="postgresql://admin:admin@localhost:5433/bikeramp_api_test?schema=public"
GOOGLE_MAPS_API_KEY=[YOUR_API_KEY]
```

then:

```bash
# run container
$ docker compose -f docker-compose.test.yml up -d

# deploy migrations
$ dotenv -e .env.stage.test --  npx prisma migrate deploy

# run tests
$ npm run test:e2e
```

## License

Nest is [MIT licensed](LICENSE).
