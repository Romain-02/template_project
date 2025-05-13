FROM php:8.4-apache

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions pdo_pgsql intl

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

RUN apt update && apt install -yqq nodejs npm

COPY . /var/www/html

COPY ./apache.conf /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html

RUN composer install && \
    npm install --force && \
    npm run build

EXPOSE 80