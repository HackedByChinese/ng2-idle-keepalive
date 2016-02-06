import {Directive, ElementRef, Renderer} from 'angular2/core';

/**
 * A directive that adds a title attribute with the text "Hello, World!".
 */
@Directive({selector: '[example-directive]'})
export class ExampleDirective {
  /*
   * Initializes a new instance of the class.
   * @param el - The element.
   * @param renderer - A renderer.
   */
  constructor(private el: ElementRef, private renderer: Renderer) {
    renderer.setElementAttribute(el.nativeElement, 'title', 'Hello, World!');
  }
}
