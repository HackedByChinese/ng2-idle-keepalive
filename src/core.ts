import {KeepaliveSvc} from 'ng2-idle/core';

import {Keepalive} from './keepalive';

export * from './keepalive';

export const KEEPALIVE_PROVIDERS: any[] =
    [Keepalive, {provide: KeepaliveSvc, useExisting: Keepalive}];

export default {providers: [KEEPALIVE_PROVIDERS]};
