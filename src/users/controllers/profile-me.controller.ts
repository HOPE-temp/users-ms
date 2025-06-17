import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PayloadToken } from 'src/auth/models/token.model';
import { ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { UpdatePublicUserDto } from '../dto/update-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('profile_me')
export class ProfileMeController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get profile of user' })
  getProfile(@Req() req: Request) {
    const { sub } = req.user as PayloadToken;

    return this.usersService.findOne(sub);
  }

  @Post()
  @ApiOperation({ summary: 'Update profile of user' })
  update(@Req() req: Request, @Body() updateUserDto: UpdatePublicUserDto) {
    const { sub } = req.user as PayloadToken;
    return this.usersService.updatePublic(sub, updateUserDto);
  }
}
