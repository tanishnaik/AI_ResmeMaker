import crypto from 'crypto';

const TOKEN_SECRET = process.env.JWT_SECRET || 'resumeiq-dev-secret-change-me';

function base64Url(input) {
  return Buffer.from(JSON.stringify(input)).toString('base64url');
}

export function generateToken(payload, expiresInSeconds = 60 * 60 * 24 * 7) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const body = { ...payload, iat: now, exp: now + expiresInSeconds };
  const unsigned = `${base64Url(header)}.${base64Url(body)}`;
  const signature = crypto.createHmac('sha256', TOKEN_SECRET).update(unsigned).digest('base64url');
  return `${unsigned}.${signature}`;
}

export function verifyToken(token) {
  const [encodedHeader, encodedBody, signature] = token.split('.');
  if (!encodedHeader || !encodedBody || !signature) throw new Error('Invalid token');

  const unsigned = `${encodedHeader}.${encodedBody}`;
  const expected = crypto.createHmac('sha256', TOKEN_SECRET).update(unsigned).digest('base64url');
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    throw new Error('Invalid token signature');
  }

  const payload = JSON.parse(Buffer.from(encodedBody, 'base64url').toString('utf8'));
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) throw new Error('Token expired');
  return payload;
}

