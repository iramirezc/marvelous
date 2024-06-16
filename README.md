# Marveloux

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

A simple React application that fetches and displays Marvel characters using the Marvel API. With this app, you can search for your favorite characters and add them to your favorites list.

**Key Features:**

- Search for Marvel characters by name.
- View detailed information about each character.
- Add characters to your favorites list.
- Persist favorites across different sessions.

**Technologies Used:**

- React.js
- TypeScript
- HTML
- CSS

## Installation

**Prerequisites:**

- Node >= 18.18.0

**Instructions:**

1. Install the Dependencies

   After cloning the project, open your terminal and run the following command to install the necessary dependencies:

   ```sh
   npm install
   ```

2. Set Up Environment Variables

   Create a `.env` file in the root directory of your project. You need to provide your [Marvel's API private and public keys](https://developer.marvel.com/documentation/getting_started) as well as the API URL. You can use the `.env.example` file as a reference. Your `.env` file should look something like this:

   ```txt
   REACT_APP_API_URL=https://gateway.marvel.com
   REACT_APP_API_PUBLIC_KEY=your_public_key
   REACT_APP_API_PRIVATE_KEY=your_private key
   ```

3. Start the Application:

   Run the following command to start the application on port `3000`:

   ```sh
   npm run start
   ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run lint`

Runs ESLint to check if there are any issues with the code.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
