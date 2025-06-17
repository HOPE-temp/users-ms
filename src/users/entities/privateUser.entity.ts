import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { RoleUser } from 'src/auth/models/roles.model';

@Entity('private_user')
export class PrivateUser {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => User, (user) => user.privateInfo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  user: User;

  @Column({
    type: 'varchar',
    name: 'last_name',
    length: 50,
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    name: 'first_name',
    length: 50,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;

  @Exclude()
  @Column({
    name: 'password_hash',
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: false,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  address: string;

  @Column({
    name: 'document_number',
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  documentNumber: string;

  @Column({
    type: 'enum',
    enum: RoleUser,
    default: RoleUser.VOLUNTEER,
    nullable: false,
  })
  rol: RoleUser;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (!this.password) return;

    const salt = bcrypt.genSaltSync(10);

    this.password = bcrypt.hashSync(this.password, salt);
  }
}
