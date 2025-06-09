#!/bin/bash

# Warte auf die PostgreSQL-Datenbank
echo "Waiting for PostgreSQL to start..."
while ! pg_isready -h db -p 5432 > /dev/null 2>&1; do
  sleep 1
done
echo "PostgreSQL started."

# Führe Datenbankmigrationen aus
echo "Running database migrations..."
# Stelle sicher, dass npm install ausgeführt wurde (im Dockerfile)
# Verwende npx, um sequelize-cli aus node_modules/.bin auszuführen
npx sequelize-cli db:migrate

# Starte die Hauptanwendung
exec "$@"