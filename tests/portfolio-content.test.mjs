import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const script = readFileSync(new URL('../script.js', import.meta.url), 'utf8');

const requiredText = [
  ['current company', '한국심리교육원'],
  ['kiphealing project', 'kiphealing'],
  ['xesnara project', 'xesnara'],
  ['Nuxt 4 stack', 'Nuxt 4'],
  ['Vue 3 stack', 'Vue 3'],
  ['Playwright coverage', 'Playwright'],
  ['FSD architecture', 'FSD 아키텍처'],
  ['AI-assisted workflow', 'AI 기반 개발 워크플로'],
];

for (const [label, text] of requiredText) {
  assert.ok(html.includes(text), `Expected portfolio to include ${label}: ${text}`);
}

const sensitiveText = [
  '010-4601-3390',
  '1997.10.06',
  '생년월일',
];

for (const text of sensitiveText) {
  assert.ok(!html.includes(text), `Portfolio should not publish sensitive text: ${text}`);
}

const requiredPhrases = [
  'Software Engineer',
  'Nuxt/Vue Engineer',
];

for (const phrase of requiredPhrases) {
  assert.ok(script.includes(phrase), `Expected typewriter phrases to include: ${phrase}`);
}

assert.ok(
  !html.includes('Frontend Developer'),
  'Portfolio identity should use Software Engineer instead of Frontend Developer',
);
