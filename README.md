<h1 align="center">#matrix</h1>

<p align="center">Online open-source workplace for distributed teams.</p>

<p align="center">
  <a href="https://codeclimate.com/github/ResultadosDigitais/matrix/maintainability"><img src="https://api.codeclimate.com/v1/badges/a41e6e73f69c94d8b9c5/maintainability" /></a>
  <a href="https://circleci.com/gh/ResultadosDigitais/matrix"><img alt="CircleCI Status" src="https://img.shields.io/circleci/project/github/babel/babel/master.svg?label=CircleCI&maxAge=43200"></a>
  <a href="http://hash-matrix.slack.com/"><img alt="chat on Slack" src="https://img.shields.io/badge/Slack-chat%20with%20us-blue?logo=slack"></a>
</p>

## Welcome to the **#matrix**

The objective of **#matrix** project is to offer a virtual environment office, as nice as physical offices. When we are working in a physical office is very common entering in discussion threads in many different environments, for example: on coffee, on lunch and others.

When we are working remotely there are no conversations like in a physical office. The **#matrix** project was born as a proposal to better that experience. The idea is to create a lot of virtual rooms where people can see and enter these rooms to participate.

**#matrix** produces a virtual office for remote teams. In this project, you can run a virtual office to simulate the physical environment. Read more on [this post in Medium](https://medium.com/rd-shipit/matrix-d4cfc4ad4c75).

![Matrix Home Screenshot](docs/img/matrix-morpheus.png)

## Table of Contents
- [Welcome to the **#matrix**](#welcome-to-the-matrix)
- [Table of Contents](#table-of-contents)
- [Understanding #matrix](#understanding-matrix)
	- [Rooms](#rooms)
	- [Availability And Meetings](#availability-and-meetings)
- [Installation](#installation)
	- [Environment Variables](#environment-variables)
		- [External Meet](#external-meet)
	- [Authentication](#authentication)
	- [Docker Compose](#docker-compose)
	- [On GCP](#on-gcp)
	- [On Heroku](#on-heroku)
	- [Production concerns](#production-concerns)
- [Versions](#versions)
- [Contributing](#contributing)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Get in Touch](#get-in-touch)
- [License](#license)

## Understanding #matrix
### Rooms
The inside of **#matrix** there are some rooms. In this rooms is possible to see others colleagues and if they are talking or in a meeting in the avatar will appear a head set icon. (eg. In the image the guys in the Platform-Email room are in a meeting)  

|                              Office Page                               |                                     With Sidebar                                     |
| :--------------------------------------------------------------------: | :----------------------------------------------------------------------------------: |
| <img src="docs/img/matrix-rooms.png" title="Office page" width="100%"> | <img src="docs/img/matrix-online.png" title="Office page with Sidebar" width="100%"> |

### Availability And Meetings
**#matrix** is a virtual environment office, so you can show you are available for the other on enter in a room through the `ENTER ROOM` button. This is like "Hey, I am here in the office".
Or you can enter in a meeting through the button `ENTER MEETING`. 

The embeded meet is provided by [meet.jit.si](https://meet.jit.si) service and this service is maintained by the [Jitsi team](https://jitsi.org/the-community/#meet-our-team)
at [8x8](https://8x8.com). Access the [jitsi GitHub](https://github.com/jitsi/jitsi-meet#security) and learn more about this amazing video bridge service. You can change that using [external meet option](#External-Meet) in any room.


|                                Meeting Room                                |                                          With Sidebar                                           |
| :------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: |
| <img src="docs/img/matrix-meet-room.png" title="Office page" width="100%"> | <img src="docs/img/matrix-meet-room-sidebar.png" title="Office page with Sidebar" width="100%"> |

## Installation
### Environment Variables
The **#matrix** project has some environment variables that important to define.

- We are using Google to authorizations, you need create a credential [here](https://developers.google.com/identity/sign-in/web/sign-in) and before define this variables:

		GOOGLE_CLIENT_ID=${paste_your_client_id_here}
		GOOGLE_SECRET={paste_your_secret_here}
		GOOGLE_CALLBACK_URL=http://localhost:8080/auth/google/callback

- You can change the secret and maximum age from session:

		COOKIE_SESSION_SECRET=matrix-session
		COOKIE_SESSION_MAX_AGE=2592000000

- You can define a white List of trusted email domains can enter in the **#matrix**

		WHITELIST_DOMAINS=["@domain1.com","@domain2.com"]

- If you are running with ssl It's important to configure SSL, to define this:

		ENFORCE_SSL=true

- The **#matrix** needs to know, where it get rooms definitions:

		ROOMS_SOURCE=ENVIRONMENT

- There is a config that define the rooms of The **#matrix**, If you want to customize your rooms or add and a new room, you have to configure a `ROOMS_SOURCE=ENVIRONMENT` and config `ROOMS_DATA` like the example:


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
		      "name":"Data Services",
			  "externalMeetUrl": "https://external-url-room/key-room"
		   }
		 ]


#### External Meet
The embeded meet is provided by [meet.jit.si](https://meet.jit.si) service, but you can change that in any room, using serices like [Meet](https://meet.google.com/) or [Zoom](https://zoom.us/). For that, you just need provide the parameter `externalMeetUrl` in your room config:

		ROOMS_DATA=[
		   {
		      "id":"${UUID}",
		      "name":"Meeting External",
		      "externalMeetUrl": "https://external-url-room/key-room"
		   }
		 ]
### Authentication

The login is so simple. You only need to configure the Google API credentials following [this step by step](/docs/GOOGLE-CREDENTIAL-STEP-BY-STEP.md) .

|                                 Login                                 |                                   Login in Dark Mode                                    |
| :-------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: |
| <img src="docs/img/matrix-login.png" title="Login page" width="100%"> | <img src="docs/img/matrix-dark-login.png" title="Login page in Dark Mode" width="100%"> |
		
### Docker Compose

If you want run the **#matrix**, you need [docker-compose](https://docs.docker.com/compose/) and follow steps:

1. Clone this repository `git clone git@github.com:ResultadosDigitais/matrix.git`

2. We are using Google to authorizations, you need create a credential [here](/docs/GOOGLE-CREDENTIAL-STEP-BY-STEP.md) you can follow step by step

3. duplicate file `variables.example.env` and rename to `variables.env`, after that set your environment variables;

4. Run application with docker compose:

		$ docker-compose up

5. Open your browser and access: 

		http://localhost:8080/

6. When you finish, you can run:

		$ docker-compose down

### On GCP 

If you prefer, you can run **#matrix** on GCP:

<a href="https://deploy.cloud.run?git_repo=https://github.com/ResultadosDigitais/matrix&revision=gcp-deploy-button">
<img alt="Run on Google Cloud" src="https://deploy.cloud.run/button.svg" style="max-width:200px"  />
</a>

### On Heroku

If you prefer, you can run **#matrix** in Heroku: 

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/ResultadosDigitais/matrix)

### Production concerns

If you will run in production we strongly recommend you close your environment using an internal VPN. In this solution everybody with the link and a valid google credential can enter your virtual office. Because this is important for you to maintain your environment closed. Or you can define a variable `WHITELIST_DOMAINS` to limit only authorized users to enter in the **#matrix**. You have to choose a strong key to the `COOKIE_SESSION_SECRET` and have to put in `GOOGLE_CALLBACK_URL` your production domain.

GOOGLE_CLIENT_ID=833875294305-5082ophis3b20aokui3kgudja92kts07.apps.googleusercontent.com
GOOGLE_SECRET=MoGShTOdI0R3JJ0zfBjIj5hn
GOOGLE_CALLBACK_URL=http://localhost:8080/auth/google/callback
COOKIE_SESSION_SECRET=matrix-session
COOKIE_SESSION_MAX_AGE=2592000000
ENFORCE_SSL=false
WHITELIST_DOMAINS="['@gmail.com','@blox.education','@nave.rs']"
BIGBLUEBUTTON_URL=https://bbbapi.com/bigbluebutton/api
BIGBLUEBUTTON_SECRET=mysupersecrebigbluebuttonhash
BIGBLUEBUTTON_PASSWORD=professorpassword
BIGBLUEBUTTON_ALWAYS_MODERATOR=true
BIGBLUEBUTTON_MAX_PARTICIPANTS=10
BIGBLUEBUTTON_ENABLE_RECORD=false
BIGBLUEBUTTON_DURATION=40
BIGBLUEBUTTON_CONTROL_RECORDING=true
BIGBLUEBUTTON_WEBCAM_ONLY_MODERATOR=false
BIGBLUEBUTTON_DISABLE_WEBCAM=false
BIGBLUEBUTTON_PRESENTATION=true
INSTITUTION_NAME=Nome da instituição
INSTITUTION_SLOGAN=Frase abaixo do logo
LOGO_URL=https://www.google.com/logos/doodles/2020/thank-you-grocery-workers-6753651837108758.2-law.gif
BACKGROUND_IMAGE_URL=https://images.unsplash.com/photo-1586768402091-1b4015017d8a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
ROOMS_SOURCE=ENVIRONMENT
ROOMS_DATA=[{"id":"papo-de-buteco","name":"Papo de Buteco","header_color":"#4EB585","blox_color":"#56D59A"},{"id":"implementacao-pedagogica","name":"Implementação Pedagógica","header_color":"#2196F3","blox_color":"#2380C1"},{"id":"dev","name":"Dev","header_color":"#EA8B68","blox_color":"#D66C45"},{"id":"comercial","name":"Comercial","header_color":"#2196F3","blox_color":"#13628E"},{"id":"product-owner-scrum-master","name":"Product Owner/Scrum Master","header_color":"#D82E60","blox_color":"#B4254F"}]

		WHITELIST_DOMAINS=["@domain1.com","@domain2.com"]

## Versions

| Version | Name | Description | Docs |
| --- | --- | --- | --- |
| 2.0.0 | Seraph | New authentication | [Migration guide to 2.0.0](/docs/MIGRATION-TO-V2.md) |
| 1.1.0 | Morpheus | New layout | [Pull request](https://github.com/ResultadosDigitais/matrix/pull/174) |
| 1.0.0 | Neo | The one project | - |


## Contributing

We encourage you to contribute to The **#matrix**!

Everyone interacting in **#matrix** codebase, issue trackers, chat rooms, and mailing lists is expected to follow [code of conduct](docs/CODE_OF_CONDUCT.md).

## Frequently Asked Questions

Some questions come up over and over again. Check here first:
[FAQ](docs/faq.md)

## Get in Touch

There are several ways to get in touch with us:

* Open an issue at: https://github.com/ResultadosDigitais/matrix/issues
* See questions on Stackoverflow using tags: https://stackoverflow.com/questions/tagged/hash-matrix
* Chat with us on: http://hash-matrix.slack.com/ ([Invite here](https://join.slack.com/t/hash-matrix/shared_invite/zt-cwglw6te-kMlJiimq7qn4WeSTiv91og))

## License

The **#matrix** is released under the [MIT License](docs/LICENSE)

> "The answer is out there, Neo, and it's looking for you, and it will find you if you want it to."
