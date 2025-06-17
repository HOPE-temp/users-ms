import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { CreatePrivateUserDto, CreatePublicUserDto } from './create-user.dto';

export class UpdatePublicUserDto extends PartialType(CreatePublicUserDto) {}
export class UpdatePrivateUserDto extends PartialType(
  OmitType(CreatePrivateUserDto, ['password', 'documentNumber']),
) {}
export class UpdatePasswordUserDto extends PartialType(
  PickType(CreatePrivateUserDto, ['password']),
) {}
