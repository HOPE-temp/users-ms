import { FindManyOptions, QueryFailedError, Repository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { PublicUser } from '../entities/publicUser.entity';
import { PrivateUser } from '../entities/privateUser.entity';

import {
  CreatePrivateUserDto,
  CreatePublicUserDto,
  CreateUserDto,
} from '../dto/create-user.dto';
import {
  UpdatePasswordUserDto,
  UpdatePrivateUserDto,
  UpdatePublicUserDto,
} from '../dto/update-user.dto';
import { FilterUsersDto } from '../dto/filter-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(PublicUser)
    private readonly publicUserRepo: Repository<PublicUser>,
    @InjectRepository(PrivateUser)
    private readonly privateUserRepo: Repository<PrivateUser>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepo.create();

      const userPublic: CreatePublicUserDto = createUserDto;
      const userPrivate: CreatePrivateUserDto = createUserDto;

      user.publicInfo = this.publicUserRepo.create(userPublic);
      user.privateInfo = this.privateUserRepo.create(userPrivate);

      const res = await this.userRepo.save(user);
      return res;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        Logger.error(error.message);
        throw new ConflictException(error.message);
      } else {
        throw new BadRequestException(error.message);
      }
    }
  }

  findAll(params?: FilterUsersDto) {
    const options: FindManyOptions<PublicUser> = {
      take: 10,
      skip: 0,
    };

    if (params) {
      const { limit, offset } = params;
      options.take = limit || 10;
      options.skip = offset || 0;
    }

    return this.publicUserRepo.find(options);
  }

  findAllExtend(params?: FilterUsersDto) {
    const options: FindManyOptions<User> = {
      relations: ['publicInfo', 'privateInfo'],
      take: 10,
      skip: 0,
      withDeleted: true,
    };

    if (params) {
      const { limit, offset } = params;
      options.take = limit || 10;
      options.skip = offset || 0;
    }

    return this.userRepo.find(options);
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['publicInfo', 'privateInfo'],
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.privateUserRepo.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User #${email} not found`);
    }

    return user;
  }

  async findOnePrivate(id: number) {
    const user = await this.privateUserRepo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async updatePublic(id: number, updateUserDto: UpdatePublicUserDto) {
    const user = await this.findOne(id);
    this.publicUserRepo.merge(user.publicInfo, updateUserDto);

    const res = await this.publicUserRepo.save(user);
    return res;
  }

  async updatePrivate(id: number, updateUserDto: UpdatePrivateUserDto) {
    const user = await this.findOnePrivate(id);
    this.privateUserRepo.merge(user, updateUserDto);

    const res = await this.privateUserRepo.save(user);
    return res;
  }

  async updatePassword(id: number, updateUserDto: UpdatePasswordUserDto) {
    const user = await this.findOnePrivate(id);
    this.privateUserRepo.merge(user, updateUserDto);

    return this.publicUserRepo.save(user);
  }

  remove(id: number) {
    return this.publicUserRepo.softDelete(id);
  }
}
