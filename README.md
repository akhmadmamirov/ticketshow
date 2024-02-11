# TicketShow E-commerce Microservices App

Server-side network for the E-commerce ticketing application. 
Cloud Services & Distributed Systems.

## Utilized: 
- Kubernetes, Docker, Typescript, Jest, Supertest, React, Next.js, Nats, Node.js, Express.js, MongoDB, Stripe API, GitHub, Redis, Bull.

## Features Implemented:

- Developed 5+ Node.js microservices hosted and containerized on Kubernetes using Typescript, Docker, GCP/GKE, MongoDB. Designed integrations with APIs like Stripe for payments ✅

- Used Kubernetes-focused architecture. K8s Ingress Nginx for load balancing. NATS streaming service and queue groups for equal event distribution. Improved SEO by leveraging server side rendering using Next.js ✅

- Implemented cross-service data replication to handle concurrency issues, making services easily discoverable,decentralized, with zero trust security ✅

- Developed robust test suites leveraging: Jest for unit tests, Postman and Supertest for integration testing, mock callbacks for event publication reporting, and Github Pipelines for: build, test, deploy, and CI/CD DevOps procedures ✅

## Routes Documentation:
- Refer to this [documentation](https://akhmadmamirov.github.io/ticketShow-Routes-doc) for routing rules.
<img width="700" height="400" alt="image" src="https://github.com/akhmadmamirov/ticketshow/assets/105142060/286154b7-a66c-4dfa-8729-6d405bf020dd">


## Microservices Breakdown:

- Auth, client, expiration, payments, orders, tickets, client (frontend)

### Event Bus:
- Nats streaming service
  
### Load Balancer:
- K8s Ingress Nginx

### K8s deployments:
- infra/k8s

### Common library:
- ticketing-npm 

<img width="400" height="250" alt="k8s ingress" src="https://github.com/akhmadmamirov/ticketing/assets/105142060/4447114c-3927-44ab-90e2-95aa8f0f293b">

## Video Walkthrough:
https://github.com/akhmadmamirov/ticketshow/assets/105142060/047d71e5-fc9e-46b0-9907-8cd0b859f215


<img width="400" height="220" alt="k8scluster" src="https://github.com/akhmadmamirov/ticketing/assets/105142060/1168b372-e630-4522-b837-0ba9488db390">
<img width="400" height="220" alt="docker" src="https://github.com/akhmadmamirov/ticketing/assets/105142060/b33c8fdd-f154-4455-aed1-81fa987a526d">

## Getting Started 🐳 :
- Install dependencies in each service by cding into each service and running: npm install
- Ex: cd tickets -> npm install
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

## Environment Variables:
Make sure to provide the JWT key and Stripe secret key as an environment variable.
```bash
kubectl create secret generic your-secret --from-l
iteral NAME_OF_THE_KEY=VAL_OF_THE_KEY
```

## Running Tests:
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

## Common Troubleshoot:

Encountering errors like "502 Bad Gateway" or connection refused (econnrefused 127.0.0.1)?
- Delete the ingress
```bash
kubectl delete namespace ingress-nginx
```
- Reinstall it from the [official website](https://kubernetes.github.io/ingress-nginx/deploy/)

## Future Development:
- Frontend (client)
- Add in HTTPS support
- Add in email support
- Add in 'build' steps for prod cluster (building Docker images in a prod style)
- Create a staging cluster
- Adding addtional services
