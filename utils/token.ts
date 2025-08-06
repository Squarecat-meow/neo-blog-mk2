import * as jose from 'jose';

export async function publishAccessToken(userId: string) {
  const secret = jose.base64url.decode(process.env.JWT_SECRET!);
  const jwt = await new jose.SignJWT({ userId: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER ?? 'http://localhost:3000')
    .setExpirationTime('15m')
    .sign(secret);

  return jwt;
}

export async function publishRefreshToken(userId: string) {
  const secret = jose.base64url.decode(process.env.JWT_SECRET!);
  const jwt = await new jose.SignJWT({ userId: userId, type: 'REFRESH' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER ?? 'http://localhost:3000')
    .setExpirationTime('7d')
    .setJti(crypto.randomUUID())
    .sign(secret);

  return jwt;
}

export async function verifyToken(token: string) {
  const secret = jose.base64url.decode(process.env.JWT_SECRET!);
  const { payload } = await jose.jwtVerify(token, secret);

  return payload;
}

export async function isTokenValid(token: string) {
  const secret = jose.base64url.decode(process.env.JWT_SECRET!);
  const { payload } = await jose.jwtVerify(token, secret);
  const currentTime = Math.floor(Date.now() / 1000);

  try {
    if (payload.exp && payload.exp > currentTime) {
      return true;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}
