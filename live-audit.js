const https = require('https');

const BANCA_BASE = 'https://banca.monivia.it';
const WWW_BASE = 'https://www.monivia.it';

const BANCA_TESTS = [
  { method: 'GET', path: '/', expect: [200], desc: 'Homepage' },
  { method: 'GET', path: '/login', expect: [200], desc: 'Login page' },
  { method: 'GET', path: '/forgot-password', expect: [200], desc: 'Forgot password' },
  { method: 'GET', path: '/reset-password/test', expect: [200, 404], desc: 'Reset password (test token)' },
  { method: 'GET', path: '/invite/test', expect: [200, 404], desc: 'Invite (test code)' },
  { method: 'GET', path: '/dashboard', expect: [307], desc: 'Dashboard → redirect to login' },
  { method: 'GET', path: '/dashboard/transactions', expect: [307], desc: 'Transactions → redirect' },
  { method: 'GET', path: '/dashboard/cards', expect: [307], desc: 'Cards → redirect' },
  { method: 'GET', path: '/dashboard/payments', expect: [307], desc: 'Payments → redirect' },
  { method: 'GET', path: '/dashboard/prelievo', expect: [307], desc: 'Prelievo → redirect' },
  { method: 'GET', path: '/dashboard/settings', expect: [307], desc: 'Settings → redirect' },
  { method: 'GET', path: '/admin/dashboard', expect: [307], desc: 'Admin dashboard → redirect' },
  { method: 'GET', path: '/admin/provision', expect: [307], desc: 'Admin provision → redirect' },
  { method: 'GET', path: '/admin/approvals', expect: [307], desc: 'Admin approvals → redirect' },
  { method: 'GET', path: '/admin/timeline', expect: [307], desc: 'Admin timeline → redirect' },
  { method: 'GET', path: '/admin/users', expect: [307], desc: 'Admin users → redirect' },
  { method: 'GET', path: '/api/csrf', expect: [200], desc: 'CSRF token endpoint', checkJson: (data) => !!data.csrfToken },
  { method: 'GET', path: '/api/auth/login', expect: [405], desc: 'Auth login (GET=405)' },
  { method: 'GET', path: '/api/auth/logout', expect: [405], desc: 'Auth logout (GET=405)' },
  { method: 'GET', path: '/api/auth/refresh', expect: [405], desc: 'Auth refresh (GET=405)' },
  { method: 'GET', path: '/api/auth/forgot-password', expect: [405], desc: 'Auth forgot-password (GET=405)' },
  { method: 'GET', path: '/api/auth/reset-password', expect: [405], desc: 'Auth reset-password (GET=405)' },
  { method: 'GET', path: '/api/admin/stats', expect: [401], desc: 'Admin stats (unauth)' },
  { method: 'GET', path: '/api/admin/transactions', expect: [401], desc: 'Admin transactions (unauth)' },
  { method: 'GET', path: '/api/admin/accounts', expect: [401], desc: 'Admin accounts (unauth)' },
  { method: 'GET', path: '/api/admin/cards/test/status', expect: [401], desc: 'Admin card status (unauth)' },
  { method: 'GET', path: '/api/admin/accounts/test/status', expect: [401], desc: 'Admin account status (unauth)' },
  { method: 'GET', path: '/api/admin/send-credentials', expect: [401, 405], desc: 'Admin send-credentials (unauth)' },
  { method: 'GET', path: '/api/notifications', expect: [401], desc: 'Notifications (unauth)' },
  { method: 'GET', path: '/api/transactions', expect: [401], desc: 'Transactions (unauth)' },
  { method: 'GET', path: '/api/transactions/history', expect: [401], desc: 'Transactions history (unauth)' },
  { method: 'GET', path: '/api/user/account', expect: [401], desc: 'User account (unauth)' },
  { method: 'GET', path: '/api/user/transactions', expect: [401], desc: 'User transactions (unauth)' },
  { method: 'GET', path: '/api/prelievo', expect: [401, 405], desc: 'Prelievo API (unauth)' },
  { method: 'GET', path: '/api/invites/test', expect: [200, 404], desc: 'Invites test (unauth)' },
  { method: 'GET', path: '/robots.txt', expect: [200], desc: 'robots.txt' },
  { method: 'GET', path: '/.env', expect: [404], desc: '.env file (must be hidden)' },
  { method: 'GET', path: '/.git/config', expect: [404], desc: '.git/config (must be hidden)' },
  { method: 'GET', path: '/.git/HEAD', expect: [404], desc: '.git/HEAD (must be hidden)' },
  { method: 'GET', path: '/debug', expect: [404], desc: 'Debug page' },
  { method: 'GET', path: '/api/debug', expect: [404], desc: 'Debug API' },
  { method: 'GET', path: '/server-info', expect: [404], desc: 'Server info' },
  { method: 'GET', path: '/wp-admin', expect: [404], desc: 'WordPress admin' },
  { method: 'GET', path: '/phpmyadmin', expect: [404], desc: 'phpMyAdmin' },
];

const WWW_TESTS = [
  { method: 'GET', path: '/', expect: [200], desc: 'Homepage' },
  { method: 'GET', path: '/chi-siamo', expect: [200], desc: 'Chi siamo' },
  { method: 'GET', path: '/contatti', expect: [200], desc: 'Contatti' },
  { method: 'GET', path: '/trasparenza', expect: [200], desc: 'Trasparenza' },
  { method: 'GET', path: '/privacy-policy', expect: [200], desc: 'Privacy policy' },
  { method: 'GET', path: '/note-legali', expect: [200], desc: 'Note legali' },
  { method: 'GET', path: '/cookie-policy', expect: [200], desc: 'Cookie policy' },
  { method: 'GET', path: '/lavora-con-noi', expect: [200], desc: 'Lavora con noi' },
  { method: 'GET', path: '/prestiti/personale', expect: [200], desc: 'Prestito personale' },
  { method: 'GET', path: '/prestiti/auto', expect: [200], desc: 'Prestito auto' },
  { method: 'GET', path: '/prestiti/immobiliare', expect: [200], desc: 'Prestito immobiliare' },
  { method: 'GET', path: '/prestiti/consolidamento', expect: [200], desc: 'Prestito consolidamento' },
  { method: 'GET', path: '/prestiti/business', expect: [200], desc: 'Prestito business' },
  { method: 'GET', path: '/api/csrf', expect: [200], desc: 'CSRF token endpoint' },
  { method: 'GET', path: '/api/loan', expect: [405], desc: 'Loan API (GET=405)' },
  { method: 'GET', path: '/api/contact', expect: [405], desc: 'Contact API (GET=405)' },
  { method: 'GET', path: '/api/career', expect: [405], desc: 'Career API (GET=405)' },
  { method: 'GET', path: '/robots.txt', expect: [200], desc: 'robots.txt' },
  { method: 'GET', path: '/sitemap.xml', expect: [200], desc: 'sitemap.xml' },
  { method: 'GET', path: '/.env', expect: [404], desc: '.env file (must be hidden)' },
  { method: 'GET', path: '/.git/config', expect: [404], desc: '.git/config (must be hidden)' },
  { method: 'GET', path: '/admin', expect: [307, 404], desc: 'Admin panel' },
  { method: 'GET', path: '/admin/dashboard', expect: [307, 404], desc: 'Admin dashboard' },
  { method: 'GET', path: '/api/admin', expect: [404], desc: 'Admin API' },
];

function fetchUrl(base, path, followRedirects = false) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, base);
    const options = {
      method: 'GET',
      headers: { 'User-Agent': 'Monivia-Security-Audit/1.0' },
      timeout: 15000,
    };

    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(body); } catch(e) {}
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body,
          json,
          location: res.headers.location || null,
        });
      });
    });

    req.on('error', (err) => reject(err));
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
    req.end();
  });
}

function printResult(domain, test, result) {
  const pass = test.expect.includes(result.status);
  const tag = pass ? '\x1b[32mPASS\x1b[0m' : '\x1b[31mFAIL\x1b[0m';
  const extra = pass ? '' : ` (expected: ${test.expect.join('|')})`;
  const redirect = result.location ? ` → ${result.location}` : '';
  console.log(`  ${tag} [${result.status}${redirect}] ${test.method} ${test.path} — ${test.desc}${extra}`);
  return { pass, result, test };
}

async function checkSecurityHeaders(base) {
  const result = await fetchUrl(base, '/');
  const h = result.headers;
  const securityHeaders = {
    'strict-transport-security': h['strict-transport-security'] || null,
    'x-content-type-options': h['x-content-type-options'] || null,
    'x-frame-options': h['x-frame-options'] || null,
    'x-xss-protection': h['x-xss-protection'] || null,
    'content-security-policy': h['content-security-policy'] || null,
    'referrer-policy': h['referrer-policy'] || null,
    'permissions-policy': h['permissions-policy'] || null,
    'x-download-options': h['x-download-options'] || null,
    'cross-origin-opener-policy': h['cross-origin-opener-policy'] || null,
    'cross-origin-resource-policy': h['cross-origin-resource-policy'] || null,
    'cross-origin-embedder-policy': h['cross-origin-embedder-policy'] || null,
  };
  return securityHeaders;
}

async function runTests(base, tests, label) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`  AUDITING: ${label} (${base})`);
  console.log(`${'='.repeat(70)}`);

  const results = [];
  for (const test of tests) {
    try {
      const res = await fetchUrl(base, test.path);
      const r = printResult(label, test, res);

      if (test.checkJson && res.json) {
        const jsonPass = test.checkJson(res.json);
        const jsonTag = jsonPass ? '\x1b[32mPASS\x1b[0m' : '\x1b[31mFAIL\x1b[0m';
        console.log(`    ${jsonTag} JSON check: ${jsonPass ? 'csrfToken found' : 'csrfToken MISSING'}`);
        r.jsonCheck = jsonPass;
      }

      results.push(r);
    } catch (err) {
      console.log(`  \x1b[31mERR\x1b[0m  ${test.method} ${test.path} — ${err.message}`);
      results.push({ pass: false, result: { status: 'ERR' }, test, error: err.message });
    }
  }
  return results;
}

async function main() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║          MONIVIA SECURITY AUDIT — LIVE ENDPOINTS           ║');
  console.log('║          ' + new Date().toISOString() + '                   ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');

  const allResults = [];

  const bancaResults = await runTests(BANCA_BASE, BANCA_TESTS, 'banca.monivia.it');
  allResults.push(...bancaResults);

  const wwwResults = await runTests(WWW_BASE, WWW_TESTS, 'www.monivia.it');
  allResults.push(...wwwResults);

  // Security headers
  console.log(`\n${'='.repeat(70)}`);
  console.log('  SECURITY HEADERS CHECK');
  console.log(`${'='.repeat(70)}`);

  for (const [label, base] of [['banca.monivia.it', BANCA_BASE], ['www.monivia.it', WWW_BASE]]) {
    console.log(`\n  --- ${label} ---`);
    try {
      const headers = await checkSecurityHeaders(base);
      for (const [name, value] of Object.entries(headers)) {
        const status = value ? '\x1b[32mSET\x1b[0m  ' : '\x1b[33mMISS\x1b[0m';
        const val = value ? ` = ${value}` : ' (not set)';
        console.log(`    ${status} ${name}${val}`);
      }
    } catch (err) {
      console.log(`    \x1b[31mERR\x1b[0m  Could not fetch headers: ${err.message}`);
    }
  }

  // Summary
  const passed = allResults.filter(r => r.pass).length;
  const failed = allResults.filter(r => !r.pass).length;
  const total = allResults.length;

  console.log(`\n${'='.repeat(70)}`);
  console.log('  SUMMARY');
  console.log(`${'='.repeat(70)}`);
  console.log(`  Total tests:   ${total}`);
  console.log(`  \x1b[32mPassed:        ${passed}\x1b[0m`);
  console.log(`  \x1b[31mFailed:        ${failed}\x1b[0m`);
  console.log(`  Pass rate:     ${((passed / total) * 100).toFixed(1)}%`);

  if (failed > 0) {
    console.log(`\n  \x1b[31mFAILED TESTS:\x1b[0m`);
    for (const r of allResults.filter(r => !r.pass)) {
      const got = r.result ? r.result.status : 'ERR';
      console.log(`    ✗ [${got}] ${r.test.method} ${r.test.path} — expected: ${r.test.expect.join('|')}`);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('  Audit complete.');
  console.log('='.repeat(70));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
