import { Expose } from 'class-transformer';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

import { v4 as uuidV4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driverLicense: string;

  @Column()
  isAdmin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  @Expose({ name: 'avatar_url' })
  avatarUrl(): string {
    switch (process.env.DISK) {
      case 'local':
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      default: 
        return null;
    }
  }
  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
