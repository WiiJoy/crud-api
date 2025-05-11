# crud-api

## Install Server
- Clone this repo: ```git clone https://github.com/WiiJoy/crud-api.git```
- Go to repo folder: ```cd crud-api```
- Go to the `dev` branch: ```git checkout dev```
- Install dependencies: ```npm i```
- Rename `.env.sample` to `.env`

## Run server
- Run the App in development mode: ```npm run start:dev```
- Create bundle and run the App in production mode: ```npm run start:prod```
- Run tests: ```npm run test```

## Endpoints
- `GET api/users` to get all users
- `GET api/users/{USER-ID}` to get user by id
- `POST api/users` to add new user
- `PUT api/users/{USER-ID}` to update user
- `DELETE api/users/{USER-ID}` to delete user