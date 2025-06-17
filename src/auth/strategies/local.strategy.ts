import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStartegy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, passport: string) {
    const user = this.authService.validateUser(email, passport);

    if (!user) {
      throw new UnauthorizedException('email or password incorrect');
    }

    return user;
  }
}
