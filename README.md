# Storage service for hostify

This is the backend for upload and storage packages in hostify.

## Requirements

- heroku account
- [MongoDB Atlas](https://cloud.mongodb.com) account

## Preparing

1. Create a cluster in [MongoDB Atlas](https://cloud.mongodb.com). An M0 group is sufficient in most cases.
2. Create a database user in Atlas. They must have the database read and write permission.
3. Get the connection string from the database and insert the username and password of the created one. It should look something like this: `mongodb+srv://username:password@zyxwvu.fedcba.mongodb.net@cluster0.ssezy.mongodb.net/hostifypackagedb?retryWrites=true&w=majority`.
4. Save this connection string in heroku Config Vars with name `MONGODB_URI` and value key` MongoURI`.
5. create an environment variable called `SECRET_JWT` and add your JWT token

## Deploy

1. Install `heroku` CLI.
2. Sign in to `heroku` and created your dyno cluster

then run the command

```bash
git push heroku master
```

> **note**: remember to have the aforementioned environment variables already configured before deploy the application

## Development

To run the backend locally, make sure you have node js and mongoDB compass installed. Then run:

```sh
npm run dev
```
