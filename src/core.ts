import {Keepalive} from './keepalive';
import {KeepaliveSvc} from 'ng2-idle/core';
import {provide} from 'angular2/core';

export * from './keepalive';

export const KEEPALIVE_PROVIDERS: any[] = [Keepalive, provide(KeepaliveSvc, {useClass: Keepalive})];

export default {directives: [KEEPALIVE_PROVIDERS]}
