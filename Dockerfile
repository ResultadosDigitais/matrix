FROM node:10.15.3-alpine

RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .


EXPOSE 8080

RUN npm install
RUN npm run build-backend
RUN npm run build-frontend

ENTRYPOINT ["sh","entrypoint.sh"]
CMD ["npm" , "run", "start-backend"]
