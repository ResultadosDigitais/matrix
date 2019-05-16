FROM node

WORKDIR /app
COPY ..

RUN apt-get update && apt-get install -y dnsutils && chmod +x entrypoint.sh

RUN npm install

ENTRYPOINT ["./entrypoint.sh"]
