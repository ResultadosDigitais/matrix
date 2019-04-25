# matrix

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/ResultadosDigitais/matrix)

[![Maintainability](https://api.codeclimate.com/v1/badges/a41e6e73f69c94d8b9c5/maintainability)](https://codeclimate.com/github/ResultadosDigitais/matrix/maintainability) [![CircleCI](https://circleci.com/gh/ResultadosDigitais/matrix.svg?style=svg)](https://circleci.com/gh/ResultadosDigitais/matrix)

Matrix produces a virtual office for remote teams. In this project, you can run a virtual office to simulate the physical environment.

## We are using the baby steps strategy.

In this moment is possible:

- Execute login via Google Credentials
- Navigate into all rooms
- Notify clients when another connected user go away
- Redirect to /home when unlogged user enter in /office
- Open external meeting when the user enter in a room
- On reload, keep user in the last room
- Notify when an user enter in a room
- Identify when user in a video meeting
- Right click to call other user to my room

Next priority steps:

- Implement socket.io tests
- Configure code coverage codeclimate
- Refactoring before start refactor please read [[this article](https://martinfowler.com/articles/refactoring-document-load.html)]

Next cool steps:

- Notify when an user go out in a room

## Development environment setup

[ _"The answer is out there, Neo, and it's looking for you, and it will find you if you want it to."_](SETUP.md)
