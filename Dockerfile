FROM node:10.15.3-alpine
# Set the working directory to /app
RUN mkdir -p /var/app
WORKDIR /var/app

# Copy the current directory contents into the container at /app
COPY . .

# Make port 80 available to the world outside this container
EXPOSE 8080

RUN apt-get update && apt-get install -y \
  dnsutils

RUN npm install

RUN npm run build

ENTRYPOINT '/var/app/entrypoint.sh'


CMD ["npm" , "run", "start-server"]
