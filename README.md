# ShopFinder

MEAN stack coding challenge project.
Project study, guidelines and conception can be found [here](https://docs.google.com/document/d/1F0iZQ5LoI4vWC4NqgxOGogGbodKx6wFHQ4nOXTAwNNQ/edit#).

#### Version 0.2.2

-Includes:
* Core app features working properly for the client and the server.
* Route guards.
* Geolocation request.
* Proper authentication and query authorization.
* Basic front end interactions and file structure.
* JWT Authentication and hashed password registration.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have installed the following before starting the project:

* [Node JS](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)

### Setup

**Note: The instructions below are for windows, please refer to the official documentation for each of the resources mentioned to find the appropriate way to init the app for your OS.**



Open a CMD or Batch terminal and install angular globally with the following command:

```
npm install -g @angular/cli
```

Now navigate to the project's path and run this command:

```
npm install
```

Wait for it to finish, afterwards, to start the database, make sure you have MongoDB installed, import [this](https://drive.google.com/file/d/1X9oGXDVLK8WURdYX3KJlqODaius4qjJq/view?usp=sharing) collection to the database as "shops" then run Mongod.exe through CMD by navigating to its location.

Don't forget to modify the URI [inside this file](backend/db/mongoose.js) to use your port and database name after the / .

To start the server, open a second terminal, navigate to the project location then input the following before confirmation:

```
npm run start:server
```

Once done, start the Angular front end development environment using:

```
ng serve
```

Both the Angular front end and NodeJS backend should be up and running for local dev environment now, access the Angular page by browsing this URL:

```
localhost:3000/
```

## Built with

* [Node JS](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* [Angular 6](https://angular.io/)
* [Express JS](https://expressjs.com/)
* [Bootstrap 3](https://getbootstrap.com/docs/3.3/)
* And other smaller libraries..

## Author

* **Nakach Salim** @ [nsdev74](https://github.com/nsdev74)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
