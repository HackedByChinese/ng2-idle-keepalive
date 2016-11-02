import {inject, TestBed} from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {Idle, IDLE_PROVIDERS, KeepaliveSvc} from 'ng2-idle/core';

import {Keepalive, KEEPALIVE_PROVIDERS} from './core';

export function main() {
  describe('core', () => {
    beforeEach(() => {
      TestBed.configureTestingModule(
          {imports: [HttpModule], providers: [KEEPALIVE_PROVIDERS, IDLE_PROVIDERS]});
    });

    it('KEEPALIVE_PROVIDERS should register Idle-compatible KeepaliveSvc provider',
       inject([Idle], (idle: Idle) => {
         expect(idle.getKeepaliveEnabled()).toBe(true);
       }));

    it('KEEPALIVE_PROVIDERS should register the same instance for Keepalive and KeepaliveSvc',
       inject([Keepalive, KeepaliveSvc], (k1: Keepalive, k2: KeepaliveSvc) => {
         expect(k1).toBe(k2);
       }));
  });
}
