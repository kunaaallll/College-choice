/**
 * Time-based one-time passwords (RFC 6238 / Google Authenticator compatible):
 * 6 digits, 30-second steps, HMAC-SHA1, base32 secrets.
 */
import crypto from "node:crypto";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function base32Encode(buf: Buffer): string {
  let bits = 0, value = 0, out = "";
  for (const byte of buf) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += ALPHABET[(value << (5 - bits)) & 31];
  return out;
}

export function base32Decode(s: string): Buffer {
  const clean = s.toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = 0, value = 0;
  const out: number[] = [];
  for (const ch of clean) {
    value = (value << 5) | ALPHABET.indexOf(ch);
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return Buffer.from(out);
}

export const generateSecret = () => base32Encode(crypto.randomBytes(20));

function hotp(secret: Buffer, counter: number): string {
  const msg = Buffer.alloc(8);
  msg.writeBigUInt64BE(BigInt(counter));
  const h = crypto.createHmac("sha1", secret).update(msg).digest();
  const offset = h[h.length - 1] & 0xf;
  const code = (h.readUInt32BE(offset) & 0x7fffffff) % 1_000_000;
  return code.toString().padStart(6, "0");
}

/** Check a 6-digit code, allowing one step of clock drift either way. */
export function verifyTotp(secretB32: string, code: string, now = Date.now()): boolean {
  const c = String(code).replace(/\s/g, "");
  if (!/^\d{6}$/.test(c)) return false;
  const secret = base32Decode(secretB32);
  const step = Math.floor(now / 30_000);
  return [-1, 0, 1].some((d) => crypto.timingSafeEqual(Buffer.from(hotp(secret, step + d)), Buffer.from(c)));
}

/** Current code (used by tests). */
export const totpNow = (secretB32: string, now = Date.now()) => hotp(base32Decode(secretB32), Math.floor(now / 30_000));

export const otpauthUrl = (secretB32: string, account: string, issuer = "College Choice CMS") =>
  `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(account)}?secret=${secretB32}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;
