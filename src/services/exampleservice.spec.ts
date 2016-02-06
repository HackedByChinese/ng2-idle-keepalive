import {it, inject, beforeEachProviders} from 'angular2/testing';

import {ExampleService} from './exampleservice';

export function main() {
  describe('ExampleService', () => {
    beforeEachProviders(() => [ExampleService]);

    it('sayHello() should say hello to specified name',
       inject([ExampleService], (exampleService) => {
         expect(exampleService.sayHello('Mike')).toBe('Hello, Mike!');
       }));
  });
}
