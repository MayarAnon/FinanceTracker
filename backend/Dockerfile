# Backend Dockerfile
FROM node:20

WORKDIR /app
#Installiere PostgreSQL Client Tools für pg_isready
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

COPY . .

EXPOSE 4000

ENTRYPOINT ["entrypoint.sh"]
CMD [ "npm", "run", "start" ]
