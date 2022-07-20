# Create different types of apps

[![npm version](https://badge.fury.io/js/%40kev_nz%2Fcreate.svg)](https://badge.fury.io/js/%40kev_nz%2Fcreate)

This creates various apps. It can createa fullstack app with a Hapi based API and GraphQL server, a React based front end and Webpack to build the assets. It can also create just the back-end or just the front-end. Additionally it can create a base setup for writing modules and a MDX-Deck slide deck for creating a presentation.

## Usage

```
npm init @kev_nz myapp
```

### A module

```
npm init @kev_nz my-module -- -m
npm init @kev_nz my-module -- --module
```

### A React.JS Front-End

```
npm init @kev_nz web-app -- -w
npm init @kev_nz web-app -- --web
```

### A Hapi.js Back-End

```
npm init @kev_nz web-server -- -s
npm init @kev_nz web-server -- --server
```

### MDX-Deck Slide Deck

```
npm init @kev_nz my-slides -- -d
npm init @kev_nz my-slides -- --deck
```

## Application Types

### Back-End

For the database access it has an included Docker Compose file that includes PostgresSQL, MongoDB, Redis and Neo4j.

### Front-End

React.JS, and Webpack

### Module

Base module setup with Jest, coveralls, and @kev_nz/publisher installed.
