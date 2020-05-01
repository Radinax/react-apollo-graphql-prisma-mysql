# REACT APOLLO PRISMA GRAPHQL MYSQL LOGIN APP CLIENT SIDE

## Folder structure

- src
    - components
        - informationBox
        - login
        - navbar
    - pages
        - home
        - panel
    - queries
    - App.js
    - App.css
    - constants.js
    - index.js

For client we use a simple structure separated by pages (where we put the components) and components (reusable components) folders. The file constant.js has a simple string as const for putting the value of the token we get when login in our application. App.js and App.css are where we put our routing with react-router-dom.

Inside our index.js file in src folder we connect apollo with prisma through the URI, then we can add queries and mutations in order to login inside our app and make posts that will go inside an informationBox.

**Made by Eng Adrian Beria**
