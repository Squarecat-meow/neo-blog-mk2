import { JWTPayload } from 'jose';

export interface IAccessTokenPayload extends JWTPayload {
  userId: string;
  iat: number;
  iss: string;
  exp: number;
}
