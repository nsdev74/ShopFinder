# Shop Finder

MEAN stack coding challenge project.
Project study, guidelines and conception can be found [here](https://docs.google.com/document/d/1F0iZQ5LoI4vWC4NqgxOGogGbodKx6wFHQ4nOXTAwNNQ/edit#).


**Note regarding deployment:** The initial goal of this project was to deploy the application on heroku for general preview, however, due to browser's *geolocation requests being deprecated over non secure connections (non HTTPS)* that will not be possible *(Because we cannot install a SSL certificate globally for free unless you do it for your local machine only or every single machine that accesses the page **manually**)* , please keep that in mind if you intend to deploy this application or access it from a different device within the same local network.

#### Version 1.0.0

-Includes:
* The app's full core features.
* Mobile-friendly design.
* Proper user experience

### What's missing?

* SEO.
* 404 Handling.


As those features may vary depending on how the application is deployed.


* Automatic unit testing.


As it has been done manually considering each generic possible user operation.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

**Note: The instructions below are for windows, please refer to the official documentation for each of the resources mentioned to find the appropriate way to init the app for your OS.**

**Additionally, it is recommended to use Chrome for this project, Firefox currently has some bugs when it comes to requesting geolocation and may result in slow behavior.**

**Internet explorer 11 is known to not work, Edge may have issues as geolocation needs to be allowed from windows settings.**

**Other browsers were not tested.**

### Prerequisites

You will need to have installed the following before starting the project:

* [Node JS](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)

Alternatively, download all the necessary files with [this all in one package](http://mean.io/).

### Setup

Clone the repository using the following command on your git bash terminal:

```
$ git clone https://github.com/nsdev74/ShopFinder.git
```

Open a CMD or Bash terminal and install angular globally with the following command:

```
npm install -g @angular/cli
```

Now navigate to the project's directory and run this command:

```
npm install
```

Wait for it to finish, afterwards, to start the database, make sure you have MongoDB installed, import [this](https://drive.google.com/file/d/1X9oGXDVLK8WURdYX3KJlqODaius4qjJq/view?usp=sharing) collection to the database as "shops" then run Mongod.exe through CMD by navigating to its location, you can do so using the following command:

```
mongorestore -d db_name -c shops /yourpath/shops.bson
```
**Note**: By default, the database's name should be ShopFinder .


Don't forget to modify the URI [inside this file](backend/config.json) to use your port and database name after the / .

For NodeJS, [edit this file](server.js) in order to set your port.

For Angular, [modify this file](src/app/environments/environment.ts) to connect to the desired NodeJS backend URI.


To start the server, open a second terminal, navigate to the project location then input the following before confirmation:

```
npm run start:server
```

Once done, start the Angular front end development environment using:

```
ng serve --aot
```
**Note**: Due to a bug in the angular CLI, if you get errors past the first compilation, you will need to CTRL+C to exit and run the command again.


Both the Angular front end and NodeJS backend should be up and running for local dev environment now, access the Angular page by browsing this URL:

```
localhost:3000/
```
(3000 being the default port in this project, if you decided to modify yours, you will have to use your own.)


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
