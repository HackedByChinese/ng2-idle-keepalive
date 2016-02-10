# Introduction

[![Join the chat at https://gitter.im/HackedByChinese/ng2-keepalive](https://badges.gitter.im/HackedByChinese/ng2-keepalive.svg)](https://gitter.im/HackedByChinese/ng2-keepalive?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/HackedByChinese/ng2-keepalive.svg?branch=master)](https://travis-ci.org/HackedByChinese/ng2-keepalive)

An Angular2 module for pinging a server

This module is used to ping a server in the background. It is primarily intended to be used as an optional component in `ng2-idle`.

## Design Considerations

The primary application of this module is for session management. Commonly, an authn/authz strategy will involve the application requesting a token (an OAuth bearer token, Forms Auth ticket, or other token system, which could be in cookie form, supplied as a header, etc.). Also common is a strategy that invalidates that token after some period of inactivity.

This approach requires the client to interact with the server at regular intervals while their session is active to keep it active on the server side. This module provides a way for your application to regularly check on the user's session status, either to keep it alive or to respond to the user's session being ended by the server, whatever your particular workflow is.

This module is most effective when used in conjunction with `ng2-idle`, which can detect user activity (such as typing, touching, and scrolling) during long periods of active use that doesn't trigger any interaction with the server.

For example, if a user logs into an email application, the server may choose to reject session tokens after 5 minutes of inactivity to increase security. However, the user may take much more time than that to type out their email and send it. It would be frustrating to find you are logged out when you were actively using the software! `ng2-keepalive` could be running in the background pinging the server every 5 minutes while they write that email, and then stop when they are inactive.

## Features

* Ping a remote HTTP endpoint using a configurable request.
* Pinging can be done manually or at a configurable interval.
* Emits `onPing` event for other handling of pinging (if the built-in HTTP request approach won't suffice).
* Emits `onPingResponse` event containing the configured HTTP request's response (so you can update your cached token or whatever else from the response).

## Getting Started

**NOTE ON ANGULAR**: This module is was written against Angular version `2.0.0-beta.3`. You may run into difficulties installing and running this module with prior versions.

Install and save `ng2-keepalive` as a dependency of your project.

     npm install ng2-keepalive

Now you may configure `Keepalive` as a provider in your app's root `bootstrap` routine, which will make the service instance available across your entire application, include as a local dependency to a route, or make it a local dependency to a component or directive.

As an example: let's assume we have an application with this structure (omitting boilerplate, project artifacts, build tasks, etc.):

```
.
└── src
    ├── about
    │   └── components
    │       ├── about.e2e.ts
    │       ├── about.html
    │       ├── about.ts
    │       └── about.spec.ts
    ├── app
    │   └── components
    │       ├── app.css
    │       ├── app.e2e.ts
    │       ├── app.html
    │       ├── app.ts
    │       └── app.spec.ts
    ├── home
    │   └── components
    │       ├── home.css
    │       ├── home.html
    │       ├── home.ts
    │       ├── home.e2e.ts
    │       └── home.spec.ts
    ├── main.ts
    └── index.html

```

In `src/main.ts`, we bootstrap the application. It might look something like this:

```
import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http'; // You'll need to import HTTP providers
import {KEEPALIVE_PROVIDERS} from 'ng2-keepalive/core'; // You'll also need to import Keepalive providers

import {AppCmp} from './app/components/app'; // include your root application component

bootstrap(AppCmp, [
  HTTP_PROVIDERS,
  KEEPALIVE_PROVIDERS
  // any additional providers your application needs
]);
```

In `src/app/components/app.ts`, we inject `Keepalive` and configure it for our application. This single instance of `Keepalive` will be used in all dependency hierarchies below the root (unless you choose to override them).

```
import {Component, ViewEncapsulation} from 'angular2/core';
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';

import {Keepalive} from 'ng2-keepalive/core';

import {HomeCmp} from '../../home/components/home';
import {AboutCmp} from '../../about/components/about';

@Component({
  selector: 'app',
  templateUrl: './app/components/app.html',
  styleUrls: ['./app/components/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', component: HomeCmp, as: 'Home' },
  { path: '/about', component: AboutCmp, as: 'About' }
])
export class AppCmp {

  // when this component is loaded, keepalive will be injected, configured, and start pinging right away
  constructor(private keepalive: Keepalive) {
    keepalive.onPing.subscribe(() => {
      console.log('Keepalive.ping() called!');
    });
    keepalive.interval(5);
    keepalive.start();
  }
}
```

Optionally, you can have `Keepalive` ping an HTTP location by specifying a string URL or a `Request` object. Before start above, add these lines:

```
// will assume a GET request; you can specify a full Request object if you need something else, want to include headers, etc.
keepalive.request('/path/to/endpoint');
// this event is optional; it allows you to do something with the request's response if you'd like
keepalive.onPingRequest.subscribe(response => {
    console.log('Keepalive.ping() response status: ' + response.status);
  });
```

In `src/about/components/about.ts`, we see how you can interact with the `Keepalive` instance we created, to do things like stopping and starting pinging. You'll note that our subscription to `onPing` occurs in addition to the subscription we created when we configured the service in `AppCmp` above.

```
import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Keepalive} from 'ng2-keepalive/core';

@Component({
  selector: 'about',
  templateUrl: './about/components/about.html',
  directives: [CORE_DIRECTIVES]
})
export class AboutCmp {
  pings: Array<string> = new Array;

  constructor(private keepalive: Keepalive) {
    keepalive.onPing.subscribe(() => {
      this.pings.push(new Date().toISOString());
    });
  }

  clearPings(): void {
    this.pings.length = 0;
  }

  startPinging(): void {
    this.keepalive.start();
  }

  stopPinging(): void {
    this.keepalive.stop();
  }

  pingNow(): void {
    this.keepalive.ping();
  }

  isPinging(): boolean {
    return this.keepalive.isRunning();
  }
}
```

Here's the associated HTML template, `src/about/components/about.html`:

```
<p>Keepalive pings:</p>
<div>
  <button type="button" (click)="clearPings()">Clear list</button>
  <button type="button" (click)="startPinging()" [disabled]="isPinging()">Start</button>
  <button type="button" (click)="stopPinging()" [disabled]="!isPinging()">Stop</button>
  <button type="button" (click)="pingNow()">Ping</button>
</div>
<ul>
  <li *ngFor="#ping of pings">{{ping}}</li>
</ul>
```

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
