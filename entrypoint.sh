#!/bin/bash

# Clear Laravel's config cache, route cache, and view cache
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Symbolic link to storage
php artisan storage:link

if [ "$1" == "migrate" ]; then
    echo "Running migrations..."
    php artisan migrate --seed --force
    shift
fi

apache2-foreground
