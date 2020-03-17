<h3 align="center">Matrix</h3>

<p align="center">Online open-source workplace for distributed teams.</p>

<p align="center">
  <a href="https://codeclimate.com/github/ResultadosDigitais/matrix/maintainability"><img src="https://api.codeclimate.com/v1/badges/a41e6e73f69c94d8b9c5/maintainability" /></a>
  <a href="https://circleci.com/gh/ResultadosDigitais/matrix"><img alt="CircleCI Status" src="https://img.shields.io/circleci/project/github/babel/babel/master.svg?label=CircleCI&maxAge=43200"></a>
</p>

## Welcome to the Matrix

The objective of Matrix project is to offer a virtual environment office, as nice as physical offices. When we are working in a physical office is very common entering in discussion threads in many different environments, for example: on coffee, on lunch and others.

When we are working remotely there are no conversations like in a physical office. The Matrix project was born as a proposal to better that experience. The idea is to create a lot of virtual rooms where people can see and enter these rooms to participate.

Matrix produces a virtual office for remote teams. In this project, you can run a virtual office to simulate the physical environment. Read more on [this post in Medium](https://medium.com/rd-shipit/matrix-d4cfc4ad4c75).

![Matrix Home Screenshot](docs/img/matrix-morpheus.png)

## Authentication

The login is so simple. You only need to create a google client id and configure the environment variable GOOGLE_CREDENTIAL=xxxxxxxxxxx.apps.googleusercontent.com. Follow [this step by step](/docs/GOOGLE-CREDENTIAL-STEP-BY-STEP.md) to configure your own google client key.

|                                 Login                                 |                                   Login in Dark Mode                                    |
| :-------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: |
| <img src="docs/img/matrix-login.png" title="Login page" width="100%"> | <img src="docs/img/matrix-dark-login.png" title="Login page in Dark Mode" width="100%"> |

## The rooms Inside of #matrix
 
The inside of #matrix there are some rooms. In this rooms is possible to see others colleagues and if they are talking or in a meeting in the avatar will apear a head set icon. (eg. In the image the guys in the Platform-Email romm are in a meeting)  

![Matrix Room](docs/img/matrix-rooms.png)

![Matrix Online](/docs/img/matrix-online.png)

## The meeting window

You can only enter in a room to show for the other that you are avaliable there through the `ENTER ROOM` button or enter in a meeting through the button `ENTER MEETING`. 

![Matrix Meet](docs/img/matrix-meet-room.png)


## Getting Started

If you want run the Matrix, you need follow steps:

1. We are using Google to authorizations, you need create a credential [here](/docs/GOOGLE-CREDENTIAL-STEP-BY-STEP.md) you can follow step by step

2. Run appplication with docker compose:

		$ docker-compose up

3. Open your brownser and access: 

		http://localhost:8080/

4. When you finish, you can run:

		$ docker-compose down
		
## On Heroku
If you prefer, you can run Matrix in Heroku: 

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/ResultadosDigitais/matrix)


## Environments

The Matrix project has some environments that important to define.

1. We are using Google to authorizations, you need create a credential [here](https://developers.google.com/identity/sign-in/web/sign-in) and before define this:

		GOOGLE_CREDENTIAL=${paste_your_credention_here}

2. If you are running with ssl It's important to configure SSL, to define this:

		ENFORCE_SSL=true

3. The Matrix needs to know, where it get rooms definitions:

		ROOMS_SOURCE=ENVIRONMENT

4. There is a config that define the rooms of The Matrix, if you prefer you can generate the unique id per room [here](https://www.uuidgenerator.net), to define this:


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



`"The answer is out there, Neo, and it's looking for you, and it will find you if you want it to."`
