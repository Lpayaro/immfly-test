
## Description

Application that uses the Nest Framework for a backend developer test at Immfly. Small API consisting of 3 endpoints which its respective unit tests.
A docker image is hosted at Docker Hub: https://hub.docker.com/r/payaro/immfly-test/tags
Finally deployed at Render: https://immfly-test.onrender.com/

If you want to make requests to Render, take in consideration that the web server could take up to 50 seconds to start.

Example requests:

- GET https://immfly-test.onrender.com/countries?filter=ES&order=asc
- GET https://immfly-test.onrender.com/reverse/chocolate
- GET https://immfly-test.onrender.com/append?start=hello&end=bye


## Project setup

```bash
$ npm install
```
Set environment variable SIMPLE_ARRAY to any string you want to appear in the array.

Example:
```
SIMPLE_ARRAY=IMMFLYING
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```