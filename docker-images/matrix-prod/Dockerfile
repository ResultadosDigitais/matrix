FROM node:10.15.3-alpine

RUN mkdir -p /var/app
WORKDIR /var/app

COPY . .

RUN apt-get update && apt-get install -y dnsutils && chmod +x entrypoint.sh

RUN npm install
RUN npm run build-backend
RUN npm run build-frontend

ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm" , "run", "start-backend"]