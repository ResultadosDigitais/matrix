FROM node:10.16.0-alpine

RUN mkdir -p /var/app
WORKDIR /var/app
COPY docker-entrypoint.sh /docker-entrypoint.sh

COPY ./ /var/app

EXPOSE 8080

RUN npm install --ignore-scripts
RUN npm run bootstrap
RUN npm run build-backend
RUN npm run build-frontend

ENTRYPOINT ["sh","/docker-entrypoint.sh"]
CMD ["npm" ,  "--prefix", "backend/", "run", "start-backend"]

