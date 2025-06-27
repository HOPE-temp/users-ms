import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  UpdatePrivateUserDto,
  UpdatePublicUserDto,
} from '../dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleUser } from 'src/auth/models/roles.model';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { FilterUsersDto } from '../dto/filter-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

 // @Roles(RoleUser.ADMIN)
  @Public()
  @Post()
  @ApiOperation({ summary: 'Register user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(RoleUser.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Get list of users' })
  findAll(@Query() params?: FilterUsersDto) {
    return this.usersService.findAllExtend(params);
  }

  @Roles(RoleUser.ADMIN)
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Roles(RoleUser.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update public info of user' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdatePublicUserDto,
  ) {
    return this.usersService.updatePublic(id, updateUserDto);
  }

  @Roles(RoleUser.ADMIN)
  @Patch(':id/private')
  @ApiOperation({ summary: 'Update private info of user' })
  updatePrivate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdatePrivateUserDto,
  ) {
    return this.usersService.updatePrivate(id, updateUserDto);
  }

  @Roles(RoleUser.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
