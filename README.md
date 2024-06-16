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

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

In the project directory, you can run:

- `npm run start`

  Starts the development server.

- `npm run build`

  Builds the app for production to the `build` folder.\
  It correctly bundles React in production mode and optimizes the build for the best performance.

  The build is minified and the filenames include the hashes.\
  Your app is ready to be deployed!

- `npm run test`

  Launches the test runner in the interactive watch mode.

- `npm run test:coverage`

  Runs tests and generates a coverage report.

- `npm run eject`

  This command will remove the single build dependency from your project.\
  **Note: This is a one-way operation. Once you eject, you can’t go back!**

- `npm run format:check`

  Checks the code formatting using Prettier.

- `npm run format:fix`

  Fixes the code formatting issues using Prettier.

- `npm run lint`

  Lints the code using ESLint.

- `npm run storybook`

  Starts Storybook for isolated component development at port `6006`.

- `npm run build-storybook`

  Builds the Storybook static site.

## Project Structure

```graphql
src
├── components  # All components used in Storybook
├── lib         # Library facades (MD5 TypeScript)
├── mocks       # JSON examples of app data structures and API responses
├── pages       # Main app pages (characters, characters-detail) and layout
├── routes      # Definitions of routes for each page using React Router DOM
├── services    # Services for API requests and utilities for local storage
├── store       # Application state management (reducers, actions, Context API)
├── tests       # Utilities for app testing (test providers)
├── types       # Models and TypeScript types
└── utils       # App utilities and services utilities (api, time, hashing)
index.ts        # Entry point of the app

```

## Project Design

### Component-Driven Development (CDD)

The project adopts a [component-driven](https://www.componentdriven.org/) development approach, emphasizing meticulous documentation, pixel-perfect design, and mobile-first principles using [Storybook](https://storybook.js.org/) for isolated development. Components focus solely on presentation, managing state through props and callbacks. Accessibility was a core consideration, ensuring compliance with [standards](https://www.w3.org/WAI/standards-guidelines/aria/) for enhanced usability across various environments and devices. The application is designed to be fully responsive, adapting seamlessly to different screen sizes and devices to provide an optimal user experience.

### State Management

Utilizes a [Redux](https://redux.js.org/)-inspired architecture powered by [React's Context API](https://react.dev/learn/scaling-up-with-reducer-and-context). It implements reducers, actions, slices, context, and custom hooks to efficiently manage application-wide state. This approach ensures robust state handling, promoting scalability and maintainability across the application.

### MVC-like Architecture

The project adopts a model-view-controller-like pattern, where components primarily serve as views, maintaining a strict separation of concerns. Pages function as containers or controllers, responsible for managing data flow and business logic. They utilize hooks to resolve props and callbacks for child components, orchestrating the flow of data. This approach promotes modularity and reusability, leveraging shared hooks across pages and utilizing service hooks for API calls and local storage operations. Services and modules adhere to the [co-location](https://kentcdodds.com/blog/colocation) principle, ensuring that related logic resides within the same folder structure, while non-related code is centralized in a top-level shared folder for clarity and organization.

### Entity Modeling

Entities or data models are defined in the `types` folder, ensuring a centralized and consistent representation of data structures throughout the application.

### UI Design

The project's UI design adheres to guidelines provided in the following links:

- [Figma Prototype](https://www.figma.com/proto/HkJ6yO2kSh0WdL7wlHdDF1/Labs-%2F-Zara-Web-Challenge?node-id=232-6395&source=email_invite&starting-point-node-id=232%3A6632&show-proto-sidebar=1&t=eh7O51J2iT7eLW2N-1)
  - [Mobile Version](https://www.figma.com/proto/HkJ6yO2kSh0WdL7wlHdDF1/Labs-%2F-Zara-Web-Challenge?node-id=217-3484&source=email_invite&starting-point-node-id=228%3A5703&show-proto-sidebar=1&t=eh7O51J2iT7eLW2N-1)
- [Figma Design](https://www.figma.com/design/HkJ6yO2kSh0WdL7wlHdDF1/Labs-%2F-Zara-Web-Challenge?node-id=0-1&t=qisMrTrpHFNlrtie-1)
