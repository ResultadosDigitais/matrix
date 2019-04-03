FROM node:8-alpine

RUN mkdir -p /var/app
WORKDIR /var/app
COPY docker-entrypoint.sh /docker-entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["sh","/docker-entrypoint.sh"]
CMD [ "npm", "start" ]