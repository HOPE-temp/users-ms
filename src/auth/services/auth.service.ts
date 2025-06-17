import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { PrivateUser } from 'src/users/entities/privateUser.entity';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwrService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      return user;
    }

    return null;
  }

  generateJWT(user: PrivateUser) {
    const payload: PayloadToken = { role: user.rol, sub: user.id };

    return {
      accessToken: this.jwrService.sign(payload),
      user,
    };
  }
}
