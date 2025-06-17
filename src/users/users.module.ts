import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PrivateUser } from './entities/privateUser.entity';
import { PublicUser } from './entities/publicUser.entity';
import { ProfileMeController } from './controllers/profile-me.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, PublicUser, PrivateUser])],
  exports: [UsersService],
  controllers: [UsersController, ProfileMeController],
  providers: [UsersService],
})
export class UsersModule {}
