import {Injectable, PipeTransform, Pipe} from 'angular2/core';

/**
 * An example pipe
 */
@Pipe({name: 'examplePipe'})
@Injectable()
export class ExamplePipe implements PipeTransform {
  /**
   * Transforms the specified value into upper case.
   * @param value - The original value.
   * @param args - Any arguments to use in the transform.
   * @return A transformed string.
   */
  transform(value: any, args: any[] = null): string {
    return value !== void 0 ? value.toString().toUpperCase() : value;
  }
}
