import { IAccessTokenPayload } from '@/types/TokenType';
import * as jose from 'jose';

const secret = jose.base64url.decode(process.env.JWT_SECRET!);

export async function publishAccessToken(userId: string) {
  const jwt = await new jose.SignJWT({ userId: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER ?? 'http://localhost:3000')
    .setExpirationTime('15m')
    .sign(secret);

  return jwt;
}

export async function publishRefreshToken(userId: string) {
  const jwt = await new jose.SignJWT({ userId: userId, type: 'REFRESH' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER ?? 'http://localhost:3000')
    .setExpirationTime('7d')
    .setJti(crypto.randomUUID())
    .sign(secret);

  return jwt;
}

export async function verifyAndRefreshAccessToken(token: string) {
  try {
    const decoded = (await verifyToken(token)) as IAccessTokenPayload;
    const newAccessToken = await publishAccessToken(decoded.userId);

    return newAccessToken;
  } catch (err) {
    if (err instanceof Error)
      throw new Error('Refresh Token이 유효하지 않습니다!');
  }
}

export async function verifyToken(token: string) {
  const { payload } = await jose.jwtVerify(token, secret);

  return payload as IAccessTokenPayload;
}

export async function isTokenValid(token: string) {
  const { payload } = await jose.jwtVerify(token, secret);
  const currentTime = Math.floor(Date.now() / 1000);

  if (payload.exp && payload.exp > currentTime) {
    return true;
  } else {
    return false;
  }
}
