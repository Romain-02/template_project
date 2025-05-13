# Projet Template (Romain Hannoir)

## Getting Started

### Installation

1. Clone the repository

    ```bash
    git clone https://github.com/Romain-02/template_project
    ```

2. Build the Docker image

    - dev
    ```bash
    docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
    ```

3. Open terminal in the container

    ```bash
    docker exec -it template-project-devserver bash
    ```

4. Install the project (the commands until the 8 is in the installation file)

    ```bash
    composer install

    When you see :  The recipe for this package contains some Docker configuration.

    This may create/update compose.yaml or update Dockerfile (if it exists).

    Do you want to include Docker configuration from recipes?
    [y] Yes
    [n] No
    [p] Yes permanently, never ask again for this project
    [x] No permanently, never ask again for this project
    (defaults to y): 

    Choose no

    ```

5. Generate the JWT keys

    ```bash
   php bin/console lexik:jwt:generate-keypair
    ```
   or
    ```bash
   mkdir -p config/jwt
   openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
   openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout
    ```
   put the phrase in the .env

6. Copy .env

    ```bash
    cp .env .env.local
    ```

7. Install yarn
   ```bash
   npm install
   ```

8. Create database

    ```bash
    php bin/console make:migration
    php bin/console doctrine:migrations:migrate
    ```

9. Copy docker files in project
   ```
    docker cp stock-check-devserver:/var/www/html/vendor .
    docker cp stock-check-devserver:/var/www/html/node_modules .
    ```

## Task to do to use the template for new projects

1. Replace all "template" and "template project" with crtrl+maj+r (be careful of cases, underscore etc).

2. Use this command from the folder script to generate entities, fixtures and ts type from a xml file.

   ```bash
   node fileGenerator xml_path_from_root
   ```
   
## Commands to create the template :

### Create the project

- composer create-project symfony/skeleton template_template
- composer require api
- cd template_template
- composer require symfony/webpack-encore-bundle
- composer require symfony/maker-bundle --dev
- composer require lexik/jwt-authentication-bundle
- composer require --dev symfony/profiler-pack
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
- npm install react-helmet-async

### Adding ts to project

- npx tsc --init
- npm install typescript ts-loader@^9.0.0 --save-dev

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
