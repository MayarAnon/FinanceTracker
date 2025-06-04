# Backend Dockerfile
FROM node:16

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

COPY . .

EXPOSE 4000

ENTRYPOINT ["entrypoint.sh"]
CMD [ "npm", "run", "dev" ]
