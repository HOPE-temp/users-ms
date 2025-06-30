import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PublicUser } from './publicUser.entity';
import { PrivateUser } from './privateUser.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @OneToOne(() => PublicUser, (publicInfo) => publicInfo.user, {
    cascade: true,
  })
  publicInfo: PublicUser;

  @Exclude()
  @OneToOne(() => PrivateUser, (privateInfo) => privateInfo.user, {
    cascade: true,
  })
  privateInfo: PrivateUser;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @Exclude()
  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt?: Date;

  @Expose()
  get info() {
    // const privateUser: Omit<PrivateUser,'password'>= this.privateInfo
    const { password, id: _private, ...privateUser } = this.privateInfo;

    const { id: _public, ...publicUser } = this.publicInfo;

    return {
      ...privateUser,
      ...publicUser,
    };
  }
}
