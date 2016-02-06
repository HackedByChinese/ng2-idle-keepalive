import {it} from 'angular2/testing';

import {ExamplePipe} from './examplepipe';

export function main() {
  describe('ExamplePipe', () => {
    let pipe: ExamplePipe;

    beforeEach(() => { pipe = new ExamplePipe; });

    it('transform() should return original value in all caps',
       () => { expect(pipe.transform('Hello, World!')).toBe('HELLO, WORLD!'); });
  });
}
