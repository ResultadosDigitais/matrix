FROM node

WORKDIR /app
COPY ..

RUN apt-get update && apt-get install -y dnsutils && chmod +x entrypoint-prod.sh

RUN npm install

ENTRYPOINT ["./entrypoint.sh"]
