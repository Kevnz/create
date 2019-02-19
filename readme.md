# Create an app

[![npm version](https://badge.fury.io/js/%40kev_nz%2Fcreate.svg)](https://badge.fury.io/js/%40kev_nz%2Fcreate)

This creates a fullstack app using Hapi on the backend and React on the front end. This setup is my current stack that I feel makes me super productive. It creates a Hapi based API and GraphQL server, a React based front end and uses Webpack to build the assets. For the database access it has an included Docker Compose file that includes PostgresSQL, MongoDB, Redis and Neo4j.

## Usage

```
npm init @kev_nz myapp
```
### Base web server app

```
npm init @kev_nz myapp -b
```
