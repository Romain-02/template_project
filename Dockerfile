FROM php:8.4-apache

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    libpq-dev \
    libzip-dev \
    nodejs \
    npm \
    && docker-php-ext-install intl pdo pdo_pgsql opcache zip

RUN a2enmod rewrite

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY ./apache.conf /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html

COPY . .

RUN composer install --no-scripts --no-interaction

RUN chown -R www-data:www-data var

EXPOSE 80

CMD ["apache2-foreground"]
