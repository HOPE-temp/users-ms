import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { RoleUser } from 'src/auth/models/roles.model';
import { IsPeruvianDocument } from 'src/common/validators/is-document.validator';

export class CreatePublicUserDto {
  @IsString()
  @MaxLength(50)
  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty({ description: 'Username user' })
  readonly username: string;

  @IsUrl()
  @MaxLength(300)
  @ApiProperty({ description: "Url's avatar" })
  @IsOptional()
  readonly avatar: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: "District's user" })
  readonly location: string;
}

export class CreatePrivateUserDto {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty({ description: 'Complete first of user' })
  readonly firstName: string;

  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty({ description: 'Complete last name of user' })
  readonly lastName: string;

  @IsStrongPassword()
  @MaxLength(50)
  @ApiProperty({ description: "Password's user" })
  readonly password: string;

  @IsEmail()
  @MaxLength(50)
  @IsOptional()
  @ApiProperty({ description: "Email's user" })
  readonly email: string;

  @IsPhoneNumber('PE')
  @MaxLength(50)
  @ApiProperty({ description: "Phone's user" })
  readonly phone: string;

  @IsString()
  @MaxLength(50)
  @MinLength(6)
  @IsOptional()
  @ApiProperty({ description: "Address's user" })
  readonly address: string;

  @IsPeruvianDocument()
  @ApiProperty({ description: "Document's user" })
  readonly documentNumber: string;

  @IsEnum(RoleUser)
  @ApiProperty({ description: "Rol's user" })
  readonly rol: RoleUser;
}

export class CreateUserDto extends IntersectionType(
  CreatePublicUserDto,
  CreatePrivateUserDto,
) {}
