#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Waiting for PostgreSQL to start..."
# Add a small delay or a proper wait-for-it script if db is not ready immediately
sleep 5

echo "Running database migrations..."
npx sequelize-cli db:migrate

echo "Migrations completed."

echo "Starting the application..."
exec "$@"