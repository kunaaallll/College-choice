/**
 * Recovery: create or reset a CMS Admin from the server shell, e.g. if everyone
 * is locked out. Prints a temporary password that must be changed at sign-in,
 * and turns off two-factor for that account.
 *
 *   docker compose -f docker-compose.prod.yml exec api node dist/src/cli/adminUser.js you@example.com "Your Name"
 *   (locally: npx tsx src/cli/adminUser.ts you@example.com "Your Name")
 */
import "dotenv/config";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma";

async function main() {
  const [emailArg, ...nameParts] = process.argv.slice(2);
  const email = emailArg?.trim().toLowerCase();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    console.error('Usage: adminUser <email> ["Full name"]');
    process.exit(1);
  }
  const temp = crypto.randomBytes(9).toString("base64url"); // 12 chars
  const passwordHash = await bcrypt.hash(temp, 12);
  const existing = await prisma.adminUser.findUnique({ where: { email } });
  const user = existing
    ? await prisma.adminUser.update({
        where: { email },
        data: { passwordHash, role: "ADMIN", active: true, mustChangePassword: true, totpEnabled: false, totpSecret: null },
      })
    : await prisma.adminUser.create({
        data: { email, name: nameParts.join(" ") || email.split("@")[0], passwordHash, role: "ADMIN", mustChangePassword: true },
      });
  await prisma.adminSession.deleteMany({ where: { userId: user.id } });
  await prisma.auditLog.create({
    data: { userId: user.id, userEmail: user.email, action: "user.cli_reset", summary: `${existing ? "Reset" : "Created"} admin account from the server shell` },
  });
  console.log(`${existing ? "Reset" : "Created"} Admin ${email}`);
  console.log(`Temporary password: ${temp}`);
  console.log("They'll be asked to choose a new password at sign-in.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
