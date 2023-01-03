<!-- heading -->
# NBA Teams
Visit the application at [https://63b4a98bdb9107506b01f060--amazing-alfajores-033517.netlify.app/](https://63b4a98bdb9107506b01f060--amazing-alfajores-033517.netlify.app/)

This project is a simple application that displays a list of NBA teams in tabular format and their details. You can search for a specific team, view details about a team, and see a random game from that team's 2021 season.

<!-- bulleted list -->
## Features

- Display a list of NBA teams
- Search for a specific team by name
- View details about a team, including their full name, total games played in 2021, and a random game from their 2021 season
- Close the team details panel
- Sort the table by columns
- Paginated table

## Getting Started
1. Clone the repository - `git clone https://github.com/abhi1381/nba-games-stat.git`
2. Run `npm install` to install the dependencies
3. Run `npm start` to start the development server
4. Open http://localhost:3000 in your browser to view the application

## Testing
This project uses `Cypress` for unit testing.

To run the tests, run:
```bash
# To run the Cypress tests, run npm run cypress:open to open the Cypress test runner.
npm run test
```



## Linting
This project uses `ESLint` for linting.

To lint the code, run:
```bash
npm run lint
```


## Built With
- **React** - JavaScript library for building user interfaces
- **React Bootstrap** - Bootstrap components built with React
- **Cypress** - Unit testing framework
- **ESLint** - JavaScript linter
- **Lodash/sortBy** - JavaScript utility library

## API
Data is fetched from the [Ball Don't Lie API](https://www.balldontlie.io/#introduction).

## Folder Structure
```
nba-games-stat
├── cypress - contains the Cypress configuration
│   ├── fixtures
│   └── support
├── public
└── src
    ├── components - contains the React components with their respective unit tests
    │── App.css
    ├── App.js - contains the main Root React component
    ├── index.css
    ├── index.js
    ├── reportWebVitals.js
├── .eslintrc.js - contains the ESLint configuration
├── .gitignore
├── cypress.config.js - contains the Cypress configuration
├── package.json
├── package-lock.json
└── README.md
```

## Author
Abhishek Tiwari