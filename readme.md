# Template Project (Romain Hannoir)

## Installation of the project

1. Clone the repository

    ```bash
    git clone https://github.com/Romain-02/template_project
    ```

2. Build the Docker image

    ```bash
    docker compose -f docker-compose.yml up -d --build
    ```

3. Open terminal in the container

    ```bash
    docker exec -it template-project-server bash
    ```

4. Install composer

    ```bash
    composer install
    ```
5. Generate the JWT keys

     ```bash
    php bin/console lexik:jwt:generate-keypair
     ```

6. Copy .env

     ```bash
     cp .env .env.local
     ```

7. Install npm

    ```bash
    npm install
    ```

8. Create database

    ```bash
    php bin/console doctrine:database:create
    php bin/console doctrine:migrations:migrate
    ```

9. Copy docker files in project (not in the container)
   ```
    docker cp template-project-server:/var/www/html/vendor .
    docker cp template-project-server:/var/www/html/node_modules .
    ```

10. Update the react front

    ```bash
    npm run dev
    ```

# Task to do to use the template for new projects

1. Use ctrl+r+shift to replace "template-project" everywhere with the name of the app

2. Do the same with the name of the folders

3. Use this command from the folder script to generate entities, fixtures and ts type from a xml file.

   ```bash
   npx ts-node script/fileGenerator.ts xml_path
   ```

## Commands to create the template :

### Create the project

- composer create-project symfony/skeleton template_template
- cd template_template
- composer require api
- composer require symfony/webpack-encore-bundle
- composer require symfony/maker-bundle --dev
- composer require lexik/jwt-authentication-bundle
- composer require --dev symfony/profiler-pack
- composer require --dev orm-fixtures
- composer require fakerphp/faker
- npm install
- composer require encore
- npm install --save-dev @symfony/webpack-encore

### Adding security to the template

- composer require symfony/security-bundle
- php bin/console make:user
- composer require form
- php bin/console make:registration-form
- php bin/console security:hash-password
- php bin/console make:security:form-login
- php bin/console make:controller Login

### Adding react to the project

- npm install react react-dom
- npm install --save-dev @babel/preset-react
- npm install react-router-dom
- npm install --save-dev @types/react-router-dom

### Adding ts to project

- npx tsc --init
- npm install typescript ts-loader@^9.0.0 --save-dev
- npm install ts-node@10.9.2

### Add redux to the template

- npm install @reduxjs/toolkit
- npm install react-redux

### Add mui and other components to the template

- npm install @mui/styles
- npm install @mui/material@5.15.14 @emotion/react @emotion/styled mui/icons-material@5.15.11

### Components and others

- npm install framer-motion
- npm install i18next react-i18next i18next-browser-languagedetector
- npm install notistack
- npm install @iconify/react
- npm install date-fns@3.2.0
- npm install @mui/x-date-pickers@6.20.2
- npm install axios
- npm install webpack-notifier@^1.6.0 --save-dev
- npm install fs-extra
- npm install fast-xml-parser
