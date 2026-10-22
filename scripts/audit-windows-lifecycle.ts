import { DATA_CHECKED, records, esuRecords } from '../src/data/windows-support-lifecycle';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error('[lifecycle audit] ' + message);
}

function findRecord(family: string, version: string, edition: string) {
  return records.find(record => record.family === family && record.version === version && record.edition === edition);
}

const keys = new Set<string>();
for (const record of records) {
  const key = [record.family, record.version, record.edition].join('|');
  assert(!keys.has(key), 'Duplicate record: ' + key);
  keys.add(key);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(record.endDate), 'Invalid end date format on ' + key);
  assert(!Number.isNaN(Date.parse(record.endDate + 'T00:00:00Z')), 'Unparseable end date on ' + key);
  assert(record.sourceUrl.startsWith('https://'), 'Non-HTTPS source URL on ' + key);
  if (record.latestKb) assert(/^KB\d{7}$/.test(record.latestKb), 'Malformed KB reference on ' + key);
  if (record.latestKbDate) assert(/^\d{4}-\d{2}-\d{2}$/.test(record.latestKbDate), 'Malformed KB date on ' + key);
}

const facts = [
  ['Windows 11', '26H2', 'homePro', '2028-10-10'],
  ['Windows 11', '26H2', 'enterpriseEducation', '2029-10-09'],
  ['Windows 11', '26H1', 'homePro', '2028-03-14'],
  ['Windows 11', '25H2', 'homePro', '2027-10-12'],
  ['Windows 11', '25H2', 'enterpriseEducation', '2028-10-10'],
  ['Windows 11', '24H2', 'homePro', '2026-10-13'],
  ['Windows 11', '24H2', 'enterpriseEducation', '2027-10-12'],
  ['Windows 11', '23H2', 'enterpriseEducation', '2026-11-10'],
  ['Windows 10', '22H2', 'homePro', '2025-10-14'],
  ['Windows 10', '2021 LTSC', 'enterpriseLtsc', '2027-01-12'],
  ['Windows 10', '2021 LTSC', 'iotEnterpriseLtsc', '2032-01-13'],
  ['Windows 11', '2024 LTSC', 'enterpriseLtsc', '2029-10-09'],
  ['Windows 11', '2024 LTSC', 'iotEnterpriseLtsc', '2034-10-10'],
] as const;

for (const [family, version, edition, endDate] of facts) {
  const record = findRecord(family, version, edition);
  assert(record, 'Required coverage missing: ' + [family, version, edition].join(' / '));
  assert(record.endDate === endDate, 'Unexpected lifecycle date for ' + [family, version, edition].join(' / ') + ': got ' + record.endDate + ', expected ' + endDate);
}

assert(findRecord('Windows 11', '26H2', 'homePro')?.latestKb === 'KB5127648', '26H2 monthly KB snapshot is missing');
assert(findRecord('Windows 11', '26H1', 'homePro')?.latestKb === 'KB5127646', '26H1 monthly KB snapshot is missing');
assert(findRecord('Windows 11', '23H2', 'enterpriseEducation')?.latestKb === 'KB5126653', '23H2 monthly KB snapshot is missing');
assert(findRecord('Windows 10', '22H2', 'homePro')?.latestKb === 'KB5126657', 'Windows 10 ESU KB snapshot is missing');
assert(esuRecords.consumer.endDate === '2027-10-12', 'Consumer Windows 10 ESU end date mismatch');
assert(esuRecords.commercial1.endDate === '2026-10-13', 'Commercial ESU year 1 end date mismatch');
assert(esuRecords.commercial2.endDate === '2027-10-12', 'Commercial ESU year 2 end date mismatch');
assert(esuRecords.commercial3.endDate === '2028-10-10', 'Commercial ESU year 3 end date mismatch');
assert(DATA_CHECKED === '2026-10-22', 'Update the snapshot date when the source dataset is refreshed');

console.log('[lifecycle audit] PASS — ' + records.length + ' release/edition records and ' + Object.keys(esuRecords).length + ' ESU scenarios checked; snapshot ' + DATA_CHECKED + '.');
