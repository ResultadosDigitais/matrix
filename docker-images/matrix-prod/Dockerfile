FROM node:10.15.3-alpine

RUN mkdir -p /var/app
WORKDIR /var/app

COPY . .

RUN npm install --ignore-scripts
RUN npm run bootstrap
RUN npm run build-backend
RUN npm run build-frontend

# ENTRYPOINT ["sh", "./entrypoint.sh"]
CMD ["npm" , "--prefix", "backend/", "run", "start-backend"]
