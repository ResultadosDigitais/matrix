# matrix

Matrix produces a virtual office for remote teams. In this project, you can run a virtual office to simulate the physical environment.

In local environment use "localhost:8080" 

To create google credential follow [this](https://developers.google.com/identity/sign-in/web/sign-in) steps.

## We are using the baby steps strategy.

In this moment is possible:
- Execute login via Google Credentials
- Navigate into all rooms
- Notify clients when another connected user go away
- Redirect to /home when unlogged user enter in /office
- Open external meeting when the user enter in a room
- On reload, keep user in the last room

Next priority steps:

- Implement socket.io tests

Next cool steps:
- Notify when an user enter in a room
- Notify when an user go out in a room
- Implement room Design
- Implement a cool login page
