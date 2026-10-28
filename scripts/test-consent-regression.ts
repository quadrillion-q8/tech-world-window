import { strict as assert } from 'node:assert';
import { loadAnalytics, revokeAnalytics } from '../src/lib/consent';

const measurementId = 'G-TEST123';
const disableKey = `ga-disable-${measurementId}`;
const fakeWindow = {
  dataLayer: [] as unknown[],
  localStorage: {
    getItem: (_key: string) => null,
    setItem: (_key: string, _value: string) => undefined,
  },
};
const fakeDocument = {
  createElement: (_tag: string) => ({ async: false, src: '' }),
  head: { appendChild: (_element: unknown) => undefined },
};

Object.defineProperty(globalThis, 'window', { configurable: true, writable: true, value: fakeWindow });
Object.defineProperty(globalThis, 'document', { configurable: true, writable: true, value: fakeDocument });

loadAnalytics(measurementId);
assert.equal((globalThis.window as unknown as Record<string, unknown>)[disableKey], false,
  'granting consent should leave the GA disable flag cleared');

revokeAnalytics(measurementId);
assert.equal((globalThis.window as unknown as Record<string, unknown>)[disableKey], true,
  'withdrawing consent should set the GA disable flag');

loadAnalytics(measurementId);
assert.equal((globalThis.window as unknown as Record<string, unknown>)[disableKey], false,
  'granting consent again should clear the GA disable flag');

console.log('Runtime regression test passed: analytics consent can be granted, withdrawn, and granted again.');
