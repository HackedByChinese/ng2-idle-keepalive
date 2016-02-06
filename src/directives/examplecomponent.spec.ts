import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it,
} from 'angular2/testing';

import {Component} from 'angular2/core';
import {ExampleComponent} from './examplecomponent';

export function main() {
  describe('ExampleComponent', () => {
    it('should work', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
         return tcb.createAsync(TestComponent).then((rootTC) => {
           let el = rootTC.debugElement.children[0].nativeElement;

           expect(el.textContent).toEqual('Hello, World!');
         });
       }));
  });
}

@Component({
  directives: [ExampleComponent],
  selector: 'test-cmp',
  template: '<div><example-component></example-component></div>'
})
class TestComponent {
}
