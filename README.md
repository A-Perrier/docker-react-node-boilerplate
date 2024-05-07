# Docker React/Node boilerplate

This boilerplate bootstraps a Node.js API consumed by a React app (`./client`) powered by Webpack.

A Nginx reverse-proxy makes able to communicate between the API and the client, keeping live-reload in dev mode.

The implementation is really basic to make agnostic the boilerplate and making you able to customize everything to your needs.

## Requirements

- Having Docker and Docker Compose installed on your environment

## Installation

- Create the database volume running `docker volume create db_dev` (change volume name to your needs in `./docker-compose.dev.yml`)
- Start the containers running `docker compose -f docker-compose.dev.yml up --build`
- As in dev mode, the DB don't have any authentication flow, go on http://localhost and you're ready. 
For database testing purposes, `./api/src/index.js` does only have a /api/count route, which can be enabled by inserting into the DB
an entry in the collection Count (`db.count.insertOne({ count: 0 })`). Feel free to delete this route and develop your app to your needs.


## Production
- As you run the services for the first time with `docker compose -f docker-compose.prod.yml up --build`, be aware that you'll need to
create a user into the DB first. For this boilerplate, we'll do it in command line but a script would be much better. 
With containers running, run the following : 

`docker compose -f ./docker-compose.prod.yml exec db sh`

`mongosh`

`use admin`

`db.auth({ user: 'yourAdminUsername', pwd: 'yourAdminPassword' })`

As defined in your ./api/.env file
`db.createUser({ user: 'username', pwd: 'password', roles: [{ role: 'readWrite', db: 'yourDbName' }]})`

- Then exit the container and your app is ready to go.