import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secretKey: string = 'blog-version.0.0.1'; // Change this to your actual secret key

  generateToken(payload: any): string {
    const expiresIn = '1d';
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  verifyToken(token: string): any {
    try {
      const payload = jwt.verify(token, this.secretKey);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
