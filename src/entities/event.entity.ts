import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('event')
class Event {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column()
  address: string;

  @Column()
  complement: string;

  @Column()
  email: string;

  @Column()
  fone: string;

  @Column()
  images: string;

  @Column()
  date: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Event };
