import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('public_user')
export class PublicUser {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => User, (user) => user.publicInfo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' }) // usa el mismo id
  user: User;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    name: 'avatar',
    length: 100,
    nullable: true,
  })
  avatar: string;

  @Column({
    type: 'varchar',
    name: 'location',
    length: 150,
    nullable: true,
  })
  location: string;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;
}
