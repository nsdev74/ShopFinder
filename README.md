# ShopFinder

MEAN stack coding challenge project.
Project study, guidelines and conception can be found [here](https://docs.google.com/document/d/1F0iZQ5LoI4vWC4NqgxOGogGbodKx6wFHQ4nOXTAwNNQ/edit#).

#### Version 0.0.5

-Includes:
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

Wait for it to finish, once done, start the dev environment using:

```
ng serve
```

Next, to start the database, make sure you have MongoDB installed then run Mongod.exe through CMD by navigating to its location.

The application should work with the default configuration, in case it doesn't, please modify the URI [inside this file](./../backend/db/mongoose.js) to use your port and collection name after the / .

To start the server, open a second terminal, navigate to the project location then input the following before confirmation:

```
npm run start:server
```

Both the angular front end and backend should be up and running for local dev environment now, access the angular page by browsing this URL:

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

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
