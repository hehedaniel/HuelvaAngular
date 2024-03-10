# Huelva

Project about Huelva, a city located in the south of Spain in Andalusia.

It features a home page displaying all locations using the Angular Material 'cards' component. Each card presents the place's name as a title, a main image, a brief description of 50 words or less, the average ratings for the location, and a "Read More" button leading to the detailed page of the site.

On the specific site page, the name is displayed as a title, along with 9 photos showcasing a central main image and the rest on the sides. Clicking on one of the central images replaces it with the central image. Following this, information about the site is provided, along with a section for rating.

The project includes a login and registration system that utilizes a manually created JWT token, which needs to be inserted into the dbHuelva.json file acting as a database.

Additionally, there is a PDF generator that creates a PDF containing all the information and images of each site.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

## Install dependencies

Run `npm install or npm install --force` in case of errors.

## Development server

Run `ng serve` (`ng serve -o` to automatically open the page in the browser ) for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Backed

In this project, I have used a JSON file as a database. Therefore, to use the website correctly, you should execute '`json-server --watch src/dbHuelva.json`'.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


Project developed by: Daniel Martin Hermoso Hermoso como proyecto usando Angular
