const { Client } = require('pg');
const c = new Client({connectionString:'postgresql://postgres.cebeiqnvggwycmerrzus:Monivia24%40Banca@aws-0-eu-west-1.pooler.supabase.com:5432/postgres'});

async function main() {
  await c.connect();

  const tables = ['User','Account','Card','Transaction','RefreshToken','PasswordResetToken','InviteToken','RateLimitEntry'];
  console.log('=== RECORD COUNTS ===');
  for (const t of tables) {
    try {
      const r = await c.query(`SELECT COUNT(*) as count FROM "${t}"`);
      console.log(`${t}: ${r.rows[0].count}`);
    } catch(e) { console.log(`${t}: TABLE NOT FOUND`); }
  }

  console.log('\n=== ORPHAN CHECK ===');
  const orphanTokens = await c.query('SELECT COUNT(*) as count FROM "RefreshToken" rt LEFT JOIN "User" u ON rt."userId" = u.id WHERE u.id IS NULL');
  console.log('Orphaned RefreshTokens:', orphanTokens.rows[0].count);

  const orphanCards = await c.query('SELECT COUNT(*) as count FROM "Card" ca LEFT JOIN "Account" a ON ca."accountId" = a.id WHERE a.id IS NULL');
  console.log('Orphaned Cards:', orphanCards.rows[0].count);

  const orphanTx = await c.query('SELECT COUNT(*) as count FROM "Transaction" t LEFT JOIN "Account" a ON t."accountId" = a.id WHERE a.id IS NULL');
  console.log('Orphaned Transactions:', orphanTx.rows[0].count);

  const negBalance = await c.query('SELECT id, iban, balance FROM "Account" WHERE balance < 0');
  console.log('\n=== NEGATIVE BALANCES ===');
  negBalance.rows.forEach(r => console.log(JSON.stringify(r)));

  const dupEmails = await c.query('SELECT email, COUNT(*) as count FROM "User" GROUP BY email HAVING COUNT(*) > 1');
  console.log('\n=== DUPLICATE EMAILS ===');
  dupEmails.rows.forEach(r => console.log(JSON.stringify(r)));

  const admins = await c.query("SELECT id, email, role FROM \"User\" WHERE role = 'ADMIN'");
  console.log('\n=== ADMIN USERS ===');
  admins.rows.forEach(r => console.log(JSON.stringify(r)));

  const sessions = await c.query('SELECT u.email, COUNT(*) as sessions FROM "RefreshToken" rt JOIN "User" u ON rt."userId" = u.id GROUP BY u.email ORDER BY sessions DESC');
  console.log('\n=== SESSIONS PER USER ===');
  sessions.rows.forEach(r => console.log(JSON.stringify(r)));

  const expiredTokens = await c.query('SELECT COUNT(*) as count FROM "RefreshToken" WHERE "expiresAt" < NOW()');
  console.log('\n=== EXPIRED REFRESH TOKENS (not cleaned) ===');
  console.log(JSON.stringify(expiredTokens.rows[0]));

  try {
    const cardCols = await c.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'Card' ORDER BY ordinal_position");
    console.log('\n=== CARD TABLE COLUMNS ===');
    cardCols.rows.forEach(r => console.log(r.column_name));
  } catch(e) {}

  try {
    const userCols = await c.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'User' ORDER BY ordinal_position");
    console.log('\n=== USER TABLE COLUMNS ===');
    userCols.rows.forEach(r => console.log(r.column_name));
  } catch(e) {}

  await c.end();
}
main().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
