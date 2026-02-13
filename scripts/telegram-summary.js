/**
 * Отправка сводки по тестам в Telegram
 * Считает passed/failed/skipped из allure-results/*-result.json
 * Добавляет простую текстовую диаграмму
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const resultsDir = path.join(process.cwd(), 'allure-results');
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const reportLink = process.env.REPORT_LINK || '';
const runLink = process.env.RUN_LINK || '';

if (!token || !chatId) {
  console.log('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set, skipping summary');
  process.exit(0);
}

let passed = 0, failed = 0, skipped = 0;

if (fs.existsSync(resultsDir)) {
  const files = fs.readdirSync(resultsDir).filter(f => f.endsWith('-result.json'));
  for (const file of files) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(resultsDir, file), 'utf8'));
      const status = (data.status || data.state || '').toLowerCase();
      if (status === 'passed') passed++;
      else if (status === 'failed' || status === 'broken') failed++;
      else if (status === 'skipped') skipped++;
      else passed++;
    } catch (_) {}
  }
}

const total = passed + failed + skipped;
const statusText = failed === 0 ? '✅ Успех' : '❌ Есть падения';

// Простейшая диаграмма
const diagram = `📊 Диаграмма:
✅ ${'■'.repeat(passed)} (${passed})
❌ ${'■'.repeat(failed)} (${failed})
⚠️ ${'■'.repeat(skipped)} (${skipped})`;

let text = `Прогон тестов завершён
Статус: ${statusText}
Всего: ${total}

${diagram}`;

if (runLink) text += ` | <a href="${runLink}">Open run</a>`;

const params = new URLSearchParams({ chat_id: chatId, parse_mode: 'HTML', text });
const body = params.toString();

const req = https.request({
  hostname: 'api.telegram.org',
  path: `/bot${token}/sendMessage`,
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) },
}, (res) => {
  if (res.statusCode !== 200) {
    console.error('Telegram API error:', res.statusCode);
    process.exit(1);
  }
});
req.on('error', (e) => {
  console.error('Failed to send Telegram summary:', e.message);
  process.exit(1);
});
req.write(body);
req.end();
