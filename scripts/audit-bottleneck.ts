import assert from 'node:assert/strict';
import { estimateBottleneck, compareRenderScaleFps, type GamingResolution } from '../src/lib/bottleneck';

const resolutions: GamingResolution[] = ['1080p', '1440p', '4K'];
const order = { cpu: 0, balanced: 1, gpu: 2 };
let count = 0;
for (let cpu = 1; cpu <= 4; cpu++) {
  for (let gpu = 1; gpu <= 4; gpu++) {
    const results = resolutions.map(res => estimateBottleneck(cpu, gpu, res));
    count += results.length;
    for (let i = 1; i < results.length; i++) {
      assert.ok(results[i].gpuEffectiveTier < results[i - 1].gpuEffectiveTier);
      assert.ok(order[results[i].kind] >= order[results[i - 1].kind]);
    }
  }
}
assert.equal(estimateBottleneck(2, 2, '1080p').kind, 'balanced');
assert.equal(estimateBottleneck(2, 2, '4K').kind, 'gpu');
assert.equal(estimateBottleneck(1, 4, '1080p').kind, 'cpu');
assert.equal(estimateBottleneck(4, 1, '1080p').kind, 'gpu');
assert.equal(compareRenderScaleFps(80, 110), 37.5);
assert.equal(compareRenderScaleFps(100, 100), 0);
assert.equal(compareRenderScaleFps(100, 75), -25);
assert.equal(compareRenderScaleFps(0, 100), null);
assert.equal(compareRenderScaleFps(100, NaN), null);
assert.equal(compareRenderScaleFps(-1, 100), null);
console.log('PASS: ' + count + ' tier/resolution combinations, resolution direction and measured FPS comparison.');
