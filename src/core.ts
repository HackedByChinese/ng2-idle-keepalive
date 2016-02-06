import {Keepalive} from './keepalive';

export * from './keepalive';

export const KEEPALIVE_PROVIDERS: any[] = [Keepalive];

export default {directives: [KEEPALIVE_PROVIDERS]}
