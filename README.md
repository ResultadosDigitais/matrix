# Welcome to Matrix

[![Maintainability](https://api.codeclimate.com/v1/badges/a41e6e73f69c94d8b9c5/maintainability)](https://codeclimate.com/github/ResultadosDigitais/matrix/maintainability) [![CircleCI](https://circleci.com/gh/ResultadosDigitais/matrix.svg?style=svg)](https://circleci.com/gh/ResultadosDigitais/matrix)

## What's Matrix

The objective of Matrix project is to offer a virtual environment office, as nice as fisical offices. When we are working in a fisical office is very common entering in discussion threads in many diferents environments, for example: On coffe, On lunch and others.

When we are working remotely there are no conversations like in a fisical office. The Matrix project was born as a proposal to better that experience. The idea is to create a lot of virtual rooms where people can see and enter these rooms to participate.

Matrix produces a virtual office for remote teams. In this project, you can run a virtual office to simulate the physical environment. Read more [here](https://medium.com/rd-shipit/matrix-d4cfc4ad4c75)

## Getting Started

If you want run the Matrix, you need follow steps:

1. Run appplication with docker compose:

		$ docker-compose up -d

2. Open your brownser and access: 

		http://localhost:8080/

3. When you finish, you can run:

		$ docker-compose down
		
## On Heroku
If you prefer, you can run Matrix in Heroku: 

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/ResultadosDigitais/matrix)


## Environments

The Matrix project has some environments that important to define.

1. We are using Google to authorizations, you need create a credential [here](https://developers.google.com/identity/sign-in/web/sign-in) and before define this:

		GOOGLE_CREDENTIAL=${paste_your_credention_here}

2. It's importante configure SSL, to define this:

		ENFORCE_SSL=true

3. The Matrix needs to know, where it get rooms definitions:

		ROOMS_SOURCE=environment

4. There is a config that define the rooms of The Matrix, if you prefer you can generate [here](https://www.uuidgenerator.net), to define this:


		ROOMS_DATA=[
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


## Contributing
We encourage you to contribute to The Matrix!

Everyone interacting in Matrix codebase, issue trackers, chat rooms, and mailing lists is expected to follow [code of conduct](docs/CODE_OF_CONDUCT.md).


## License
The Matrix is released under the [MIT License](docs/LICENSE)



[ _"The answer is out there, Neo, and it's looking for you, and it will find you if you want it to."_](SETUP.md)
