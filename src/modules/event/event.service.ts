import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../entities/event.entity';
import { Repository } from 'typeorm';
import { IEvent } from './event.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
  ) {}

  async create({
    address,
    city,
    complement,
    date,
    email,
    fone,
    images,
    name,
    uf,
  }: IEvent): Promise<Event> {
    const event = this.eventRepository.create({
      address,
      city,
      complement,
      date,
      email,
      fone,
      images,
      name,
      uf,
    });

    await this.eventRepository.save(event);

    return event;
  }

  async find(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  async update({
    address,
    city,
    complement,
    date,
    email,
    fone,
    images,
    name,
    uf,
    id,
  }: IEvent) {
    const eventAlreadyExists = await this.findById(id);

    if (!eventAlreadyExists) {
      throw new Error('Event not exists');
    }

    const event = this.eventRepository.create({
      address,
      city,
      complement,
      date,
      email,
      fone,
      images,
      name,
      uf,
      id: eventAlreadyExists.id,
    });

    await this.eventRepository.save(event);

    return event;
  }

  async delete(id: string): Promise<void> {
    const eventAlreadyExists = await this.findById(id);

    if (!eventAlreadyExists) {
      throw new Error('Event not exist for deleted');
    }

    await this.eventRepository.delete({
      id,
    });
  }

  async findById(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: {
        id,
      },
    });

    return event;
  }
}

export { EventService };
