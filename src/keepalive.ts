import {Injectable} from 'angular2/core';

/**
 * An example of an injectable service.
 */
@Injectable()
export class Keepalive {
  /**
   * Returns a greeting using the specified name.
   * @param name - The name to use in the greeting.
   * @return The greeting.
   */
  sayHello(name: string): string { return 'Hello, ' + name + '!'; }
}
