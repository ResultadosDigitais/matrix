# Environment Setup

If you need to create google credential follow [this](https://developers.google.com/identity/sign-in/web/sign-in) steps.

## Running with Docker
Run the following command on the terminal:
```sh
docker-compose up
```

Then open your browser at: `http://localhost:8080/`

## Running with local nodejs

After repository cloning, run: `npm install`. This will feed all the project needs

To start: `npm start`

And then open chrome at: `http://localhost:8080`

## Running with production

1) Configure `GOOGLE_CREDENTIAL` environment with your google autenticator ID follow [this](https://developers.google.com/identity/sign-in/web/sign-in) steps for create a valid credential.
2) Configure `ENFORCE_SSL=false` to force redirect user when http access  
3) Configure `ROOMS_DATA` take care, use a unique UUID per room in `id`

```sh
[
   {
      "id":"${UUID}",
      "name":"Lounge",
      "disableMeeting":true
   },
   {
      "id":"${UUID}",
      "name":"WAR ROOM CDP"
   },
   {
      "id":"${UUID}",
      "name":"Data Services"
   }
 ]
``` 
