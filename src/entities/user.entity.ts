import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { v4 as uuid } from 'uuid';

@Entity('user')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
