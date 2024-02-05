# Ticketing E-commerce Microservices App

This repository contains a microservices-based e-commerce application named "Ticketing." The app is built using Docker and Kubernetes, leveraging various technologies including Typescript, NextJs, Jest, and BootstrapJs. Additionally, it utilizes JWT (JSON Web Tokens) for authentication, and the JWT key is provided through the environment variable.

## Microservices
<img width="400" height="250" alt="k8s ingress" src="https://github.com/akhmadmamirov/ticketing/assets/105142060/4447114c-3927-44ab-90e2-95aa8f0f293b">

### Auth Microservice
- Manages user authentication
- Utilizes JWT for secure authentication
- Shared library for authentication requests as an npm package

### Tickets Microservice
- Handles ticket-related functionality
- Interacts with the Auth microservice for authentication

## Technologies Used
<img width="400" height="250" alt="k8scluster" src="https://github.com/akhmadmamirov/ticketing/assets/105142060/1168b372-e630-4522-b837-0ba9488db390">

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
<img width="450" height="220" alt="docker" src="https://github.com/akhmadmamirov/ticketing/assets/105142060/b33c8fdd-f154-4455-aed1-81fa987a526d">

Building the first docker image:
```bash
 docker build -t yourDockerUsername/nameOfTheService .
```
Then push it to docker hub
```bash
 docker push yourDockerUsername/nameOfTheService 
```
To start all microservices, run the following command using Skaffold:
```bash
skaffold dev
```

This command will initiate the development environment and deploy the microservices using Kubernetes.

Environment Variable
Make sure to provide the JWT key as an environment variable.
```bash
kubectl create secret generic jwt-secret --from-l
iteral=JWT_KEY=yourkey
```

## Running Tests
To run tests for the microservices, use the following npm script from the serice that hosts tests:
```bash
npm run tests
```
To test nats streaming service: first port forward nats using
```bash
  kubectl port-forward <pod Name> <from matrching port>: <to forwarding port> 
  Ex: kubectl port-forward nats-depl-78874bcd8f-m6vxg 4222:4222
```

Make sure you are in the root directory wherere skaffold.yaml file is located

## Common Troubleshoot

Encountering errors like "502 Bad Gateway" or connection refused (econnrefused 127.0.0.1)?
- Delete the ingress
```bash
kubectl delete namespace ingress-nginx
```
- Reinstall it from the [official website](https://kubernetes.github.io/ingress-nginx/deploy/)
