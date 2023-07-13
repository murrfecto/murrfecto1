# Murrfecto Project Management

Murrfecto is a web application that allows users to browse and adopt cats. The project consists of a client-side application built with React and a server-side application built with Node.js and Express.

## Getting Started

To get started with the project, you will need to install the necessary dependencies. You can do this by running the following command:

`npm install`

This will install the dependencies for both the client and server applications.

## Running the Project

To run the project, you can use the following command:

`npm start`

This will start both the client and server applications concurrently. The client application will be available at `http://localhost:3001`, and the server application will be available at `http://localhost:3000`.

## Client-Side Application

The client-side application is built with React and uses Axios for making HTTP requests to the server. The application is organized into components, with each component responsible for rendering a specific part of the UI.

### Dependencies

The client-side application has the following dependencies:

- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- axios
- react
- react-dom
- react-router-dom
- react-scripts
- sass
- web-vitals

### Scripts

The client-side application has the following scripts:

- start: Starts the development server on port 3001.
- build: Builds the production-ready application.
- test: Runs the test suite.
- eject: Ejects the application from the create-react-app setup.

## Server-Side Application

The server-side application is built with Node.js and Express, and uses MongoDB for data storage. The application provides a RESTful API for the client-side application to interact with.

### Dependencies

The server-side application has the following dependencies:

- body-parser
- cors
- dotenv
- express
- joi
- mongodb
- mongoose
- multer

### Scripts

The server-side application has the following scripts:

- server: Starts the server using nodemon for automatic reloading.

## Project Management

The project is managed using npm scripts. The `start` script starts both the client and server applications concurrently. The `install-dependencies` script installs the dependencies for both the client and server applications. The `setup-production` script installs the dependencies, builds the client-side application, and installs the production dependencies. The `install-client` script installs the dependencies for the client-side application. The `build-client` script builds the client-side application. The `client` script starts the client-side application.
