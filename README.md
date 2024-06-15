# cryptid-spot
## Description
* Welcome to Cryptid Spotter, the ultimate platform for cryptid enthusiasts! Our website allows users to share their cryptid sightings, pin them on an interactive map, and contribute to the growing community of cryptozoology. Users can also upload images of the cryptids they encounter and view sightings reported by others. Whether you're a believer, a skeptic, or just curious, Cryptid Spotter provides a space for everyone interested in the mysterious and unknown creatures of our world.

## Installation
* Install npm packages by running this code in the terminal ``` npm install ```
* Set up the database by runnning this code in the terminal ``` psql -U postgres ``` and enter postgres password
* Run schema sql file by running this code in the terminal ``` \i schema.sql ``` 
* Seed the database by running this code in the terminal ```npm run seed```

## Usage
* To start the application run this code in the terminal ``` npm run start```
* The server will be running at `http://localhost:3001`
* Use Insomnia or any other API client to test the API endpoints.

## Application Page
* ![main-page](./public/images/application%20page/main-page.png)
* ![library-page](./public/images/application%20page/library.page.png)
* ![add-cryptid-page](./public/images/application%20page/add-cryptid.png)
* ![new-sighting-page](./public/images/application%20page/new-sighting.png)
* ![profile-page](./public/images/application%20page/profile.png)

## Technologies Used
* Front-End 
    * HTML, CSS, Javascript, DaisyUI
* Back-End 
    * Node.js
    * Express.js
    * Sequelize
    * Dotenv
    * PostgreSQL
    * Handlebars
    * Google Maps API
    * Cloudinary API

## Credits
* This project was made with collaboration from [Jacob Ramusson](https://github.com/JakeRasmusson), [Larry Logan](https://github.com/LerieLogin) and [Veysel Arslan](https://github.com/veyselarslan12) who both added greatly to the project.