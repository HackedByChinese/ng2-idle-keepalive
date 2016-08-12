import {addProviders, inject} from '@angular/core/testing';
import {HTTP_PROVIDERS} from '@angular/http';
import {IDLE_PROVIDERS, Idle, KeepaliveSvc} from 'ng2-idle/core';

import {KEEPALIVE_PROVIDERS, Keepalive} from './core';

export function main() {
  describe('core', () => {
    beforeEach(() => { addProviders([HTTP_PROVIDERS, KEEPALIVE_PROVIDERS, IDLE_PROVIDERS]); });

    it('KEEPALIVE_PROVIDERS should register Idle-compatible KeepaliveSvc provider',
       inject([Idle], (idle: Idle) => { expect(idle.getKeepaliveEnabled()).toBe(true); }));

    it('KEEPALIVE_PROVIDERS should register the same instance for Keepalive and KeepaliveSvc',
       inject([Keepalive, KeepaliveSvc], (k1: Keepalive, k2: KeepaliveSvc) => {
         expect(k1).toBe(k2);
       }));
  });
}
