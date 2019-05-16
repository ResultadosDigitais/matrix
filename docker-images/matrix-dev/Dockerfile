FROM node:10.15.3-alpine

RUN mkdir -p /var/app
WORKDIR /var/app
COPY docker-entrypoint.sh /docker-entrypoint.sh

COPY . /var/app

EXPOSE 8080
ENTRYPOINT ["sh","/docker-entrypoint.sh"]
CMD ["npm" , "run", "start-server"]
