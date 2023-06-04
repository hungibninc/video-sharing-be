<div align="center">
<h1><a href="https://video-sharing-be-production-7451.up.railway.app/" target="_blank" rel="noopener noreferrer">Funny Movie API</a></h1>
</div>

<div align="center">
    <img src="https://img.shields.io/badge/-Swagger-85EA2D?logo=swagger&logoColor=black">
    <img src="https://img.shields.io/badge/-Socket.io-black?logo=socket.io&logoColor=white">
    <img src="https://img.shields.io/badge/-nestjs-ff3f59?logo=nestjs&logoColor=white">
    <img src="https://img.shields.io/badge/-Railway-0B0D0E?logo=Railway">
    <img src="https://img.shields.io/badge/-youtube-ff0000?logo=youtube&logoColor=white">
</div>

<br>

<p align="center">This <strong>RESTFUL</strong> API works as the backend for a React web app.

<br>


## Introduction

Funny Movie API is the backend for a ***fully responsive*** web app. The front end of the app is handled separately by another app. The [repo for the front-end is here](https://github.com/hungibninc/video-sharing-fe). We use cross-site session cookies to handle user authentication. We use TypeORM which supports all of the most commonly used database-supported column types.

### Features
- authenticate user
- create new user
- create video
- show all videoes
- real-time notification about the newly shared video

## Prerequisites

- Node v18.10.0
- Git bash
- MySQL

## Installation & Configuration

To get a local copy up and running, follow these simple example steps.

#### Get files
1. Open your terminal or command prompt.
2. If you do not have git installed in your system, skip this step and go to step 3; otherwise, go to the directory where you want to copy the project files and clone it by copying this text into your command prompt/terminal:
   
```
  git clone git@github.com:hungibninc/video-sharing-be.git
```
  <br>

1. Download the program files by clicking on the green button that says “**Code**” on the upper right side of the project frame.
2. You will see a dropdown menu. Click on “**Download ZIP**.”
3. Go to the directory where you downloaded the **ZIP file** and open it. Extract its contents to any directory you want in your system.

### Local deploy

#### Environment variable

Copy the API Environment variable into your .env file

```
COOKIE_KEY=<random_string>
API_KEY=<google_key_enable_youtube_data_api>
API_GOOGLE_URL=<https://www.googleapis.com/youtube/v3/videos?part=snippet&fields=items(id,snippet)>
API_YOUTUBE_URL=https://www.youtube.com/watch?v=
```

#### Install Dependencies
1. If you are not in your system terminal/command prompt already, please open it and go to the directory where you cloned the remote repository or extracted the project files.
2. While in the project root directory, type
   
```
yarn
```

This command will install all the necessary dependencies in your system.

## Database Setup

Open ormconfig.js and follow these steps

1. Update dbConfig.synchronize to true
2. Update database name, database username, database password with the database in your local

## Running the app

#### development mode
```bash
$ yarn run start
```

#### watch mode
```bash
$ yarn run start:dev
```

#### production mode
```bash
$ yarn run start:prod
```

## Test

#### unit tests

```bash
$ yarn run test
```

#### e2e tests
```bash
$ yarn run test:e2e
```

#### test coverage
```bash
$ yarn run test:cov
```

## Usage

All the endpoints necessary to use our API here:
[Documentation](https://video-sharing-be-production-7451.up.railway.app/api/)