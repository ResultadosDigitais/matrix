# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added

### Removed

### Changed

## [2.0.1] 2020-05-05
### Added
- New `ctrl+click` to open a embeded Jitsi Meet in a new Tab.
- Now we are using `jest`for backend tests
- Added new kind `ROOMS_SOURCE=REMOTE` to load room via remote file `ROOMS_DATA=https://myroomsdatafile.json`
- New Issues templates (Bug, Feature, Cleanup, Documentation)
- New ChangeLog file 
- New Contributors Session managed by [all-contributors](https://github.com/all-contributors/all-contributors)
   
### Removed
- We removed `mocha` for backend tests 

### Changed
- Improve heroku urlcallback in app.json from `http://localhost:8080/auth/google/callback` to `https://${app.name}.herokuapp.com/auth/google/callback`
- The Environment variable `WHITELIST_DOMAINS` now is not necessary to use `@` (eg. `@mydomain.com`) to run this versiion is necessary to remove `@` (eg. `mydomain.com`)

## [2.0.0] - 2020-03-20
### Changed
- Following more security, We changed the way to execute oauth login with google button. 

## [1.0.0] - 2019-07-18
### Added
- New Layout called Mortheus  
