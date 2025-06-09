# Frontend Dockerfile

# --- Stage 1: Build der React-Anwendung (Build-Phase) ---
FROM node:20 AS build-stage

WORKDIR /app

# Erstelle die Systemgruppe 'nodejs'
RUN addgroup --system nodejs
# Erstelle den Nicht-Root-Benutzer 'nodeuser'
# und weise ihm die UID 1001 und die primäre Gruppe 'nodejs' zu.
RUN adduser --system --uid 1001 --ingroup nodejs nodeuser

# Kopiere package.json und package-lock.json (oder package-lock.json)
# und führe npm install als root aus, damit alle Abhängigkeiten korrekt installiert werden.
COPY package*.json ./
RUN npm install

# Ändere den Besitzer des /app-Verzeichnisses zu unserem neuen Benutzer
# Das ist wichtig, damit der nodeuser Lesezugriff auf die installierten Module hat
# und zukünftige Operationen im /app Verzeichnis (z.B. Log-Dateien) schreiben kann.
RUN chown -R nodeuser:nodejs /app

# Wechsle zum neuen Benutzer für alle nachfolgenden Befehle
USER nodeuser

# Kopiere den restlichen Anwendungscode
COPY . .

# Führe den Build-Befehl aus
RUN npm run build

# --- Stage 2: Serve die statischen Dateien mit Nginx (Produktions-Phase) ---
# Wir verwenden ein schlankes Nginx-Image, um die gebuildeten statischen Dateien auszuliefern.
FROM nginx:alpine as production-stage

# Kopiere die gebuildeten statischen Dateien aus der 'build-stage'
# in das Standard-Webserver-Verzeichnis von Nginx.
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE den Port, auf dem Nginx standardmäßig lauscht (Port 80).
# Dein docker-compose.yml wird Host-Port 3000 auf diesen Container-Port 80 mappen.
EXPOSE 80

# Der CMD-Befehl sollte nur Nginx starten, da dieser Container keine Node.js-Umgebung hat.
CMD ["nginx", "-g", "daemon off;"]