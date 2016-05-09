import {Keepalive} from './keepalive';
import {KeepaliveSvc} from 'ng2-idle/core';
import {provide} from '@angular/core';

export * from './keepalive';

export const KEEPALIVE_PROVIDERS: any[] =
    [Keepalive, provide(KeepaliveSvc, {useExisting: Keepalive})];

export default {providers: [KEEPALIVE_PROVIDERS]}
