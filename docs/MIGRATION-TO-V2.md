# Migration to version 2.0.0

In version 2.0.0, the authentication architecture was changed to provide better security.

> "You do not truly know someone until you fight them."
> - Seraph

## Authentication keys

In previous version the authentication environment variable was:

```
GOOGLE_CREDENTIAL=xxxxxxxxxxx.apps.googleusercontent.com
```

Now you must change to:

```
GOOGLE_CLIENT_ID=yyyyyyyyyyy.apps.googleusercontent.com
GOOGLE_SECRET=XXXX
GOOGLE_CALLBACK_URL=http://MY-DOMAIN/auth/google/callback
```

To obtain the Google client id and secret just follow [this step by step](./GOOGLE-CREDENTIAL-STEP-BY-STEP.md).

In the callback URL you must put the domain where the project is hosted, followed by the context `/auth/google/callback`.

## Session

Now a session control is done to support Google authentication on the backend, you can change the secret and duration of the session by the environment variables:

```
COOKIE_SESSION_SECRET=nebuchadnezzar
COOKIE_SESSION_MAX_AGE=2592000000
```
These values ​​are not required. The default values ​​are `matrix-session` and` 30 days` respectively
## Whitelist

It's now possible to add domains from users' emails to restrict access through the environment variable:
**Attention:** When you did not provide the `WHITELIST_DOMAINS` your matrix will be open for everyone use. Be sure that what you want
```
WHITELIST_DOMAINS=["resultadosdigitais.com.br", "matrix.com"]
```
