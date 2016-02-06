import {it, inject, beforeEachProviders} from 'angular2/testing';

import {Keepalive} from './keepalive';

export function main() {
  describe('Keepalive', () => {
    beforeEachProviders(() => [Keepalive]);

    it('sayHello() should say hello to specified name', inject([Keepalive], (keepalive) => {
         expect(keepalive.sayHello('Mike')).toBe('Hello, Mike!');
       }));
  });
}
