# Ticketing E-commerce Microservices App

This repository contains a microservices-based e-commerce application named "Ticketing." The app is built using Docker and Kubernetes, leveraging various technologies including Typescript, NextJs, Jest, and BootstrapJs. Additionally, it utilizes JWT (JSON Web Tokens) for authentication, and the JWT key is provided through the environment variable.

## Microservices

### Auth Microservice
- Manages user authentication
- Utilizes JWT for secure authentication
- Shared library for authentication requests as an npm package

### Tickets Microservice
- Handles ticket-related functionality
- Interacts with the Auth microservice for authentication

## Technologies Used
- Docker: Containerization of microservices
- Kubernetes: Orchestration and deployment of microservices
- Typescript: Typed superset of JavaScript
- NextJs: React framework for server-side rendering
- Jest: Testing framework
- BootstrapJs: Front-end framework for responsive design

## Features
- Microservices architecture for scalability and maintainability
- Shared authentication library for seamless authentication across services
- Automated tests using Jest and Supertest
- Server-side rendering with NextJs for SEO optimization and mobile support

## Getting Started
To start all microservices, run the following command using Skaffold:
```bash
skaffold dev
```

This command will initiate the development environment and deploy the microservices using Kubernetes.

Environment Variable
Make sure to provide the JWT key as an environment variable.


Running Tests
To run tests for the microservices, use the following npm script:
```bash
npm run tests
```
Make sure you are in the root directory wherere skaffold.yaml file is located
