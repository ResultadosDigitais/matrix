FROM node:10.16.0-alpine

WORKDIR /var/app

# Cache npm install
COPY package.json /var/app/package.json
RUN npm install --ignore-scripts

# Copy the docker entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh

# Copy the application's files
COPY . .

# Install application
RUN npm run bootstrap
RUN npm run build-backend
RUN npm run build-frontend

# Run tests
RUN npm run test:ci
RUN npm run cover

EXPOSE 8080

ENTRYPOINT ["sh","/docker-entrypoint.sh"]
CMD ["npm" ,  "--prefix", "backend/", "run", "start-backend"]
