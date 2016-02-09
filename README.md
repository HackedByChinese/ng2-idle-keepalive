# Introduction

[![Join the chat at https://gitter.im/HackedByChinese/ng2-keepalive](https://badges.gitter.im/HackedByChinese/ng2-keepalive.svg)](https://gitter.im/HackedByChinese/ng2-keepalive?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/HackedByChinese/ng2-keepalive.svg?branch=master)](https://travis-ci.org/HackedByChinese/ng2-keepalive)

An Angular2 module for pinging a server

This module is used to ping a server in the background. It is primarily intended to be used as an optional component in `ng2-idle`.

**This project is still under development**

## Features

* Ping a remote HTTP endpoint using a configurable request.
* Pinging can be done manually or at a configurable interval.
* Emits `onPing` event for other handling of pinging (if the built-in HTTP request approach won't suffice).
* Emits `onPingResponse` event containing the configured HTTP request's response (so you can update your cached token or whatever else from the response).

## Quick Start

Install and save `ng2-keepalive` as a dependency of your project.

     npm install ng2-keepalive

Now you may configure `Keepalive` as a provider in your app's root `bootstrap` routine, which will make the service instance available across your entire application, or include as a local dependency to a route.

[include example here]

## Developing

This repository uses TypeScript (with Typings as the definition manager), Gulp, tslint, eslint (for JS files used in Gulp tasks), Karma, and Jasmine.

To run Gulp tasks, you'll need to install the `gulp-cli`.

     npm install -g gulp-cli

Once you have cloned the repository, install all packages.

     npm install

You can now build and run tests.

     gulp test

If you want to continuously build and test, first execute this task in a *separate window*:

     gulp build:dev:watch

Then run this task:

     gulp test:watch

If you wish to prepare a branch for a pull request, run this command and fix any errors:

     gulp build

You can use `clang-format` to automatically correct most style errors and then commit the results:

     gulp clang:format

## Contributing

See the [contributing guide](https://github.com/HackedByChinese/ng2-keepalive/blob/master/CONTRIBUTING.md).

## License

Authored by **Mike Grabski** @HackedByChinese me@mikegrabski.com

Licensed under MIT
