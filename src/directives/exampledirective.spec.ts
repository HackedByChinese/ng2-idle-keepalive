import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it,
} from 'angular2/testing';

import {Component} from 'angular2/core';
import {ExampleDirective} from './exampledirective';

export function main() {
  describe('ExampleDirective', () => {
    it('should work', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
         return tcb.createAsync(TestComponent).then((rootTC) => {
           let el = rootTC.debugElement.children[0].nativeElement;
           expect(el.attributes.getNamedItem('title').value).toEqual('Hello, World!');
         });
       }));
  });
}

@Component({
  directives: [ExampleDirective],
  selector: 'test-dir',
  template: '<div example-directive></div>'
})
class TestComponent {
}
