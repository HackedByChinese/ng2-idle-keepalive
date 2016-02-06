// Import all directives
import {ExampleDirective} from './directives/exampledirective';
import {ExampleComponent} from './directives/examplecomponent';

// Export all directives
export * from './directives/exampledirective';
export * from './directives/examplecomponent';

export const DIRECTIVES: any[] = [ExampleDirective, ExampleComponent];
