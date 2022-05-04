import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { IUser } from './user.interface';
import { hash } from 'bcryptjs';
import { classToPlain } from 'class-transformer';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create({ name, email, password, id }: IUser): Promise<any> {
    const userAlreadyExists = await this.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const hashPassword = await hash(password, 8);

    const user = this.userRepository.create({
      email,
      name,
      password: hashPassword,
    });

    await this.userRepository.save(user);

    return classToPlain(user);
  }

  async find(): Promise<any> {
    const users = await this.userRepository.find();
    return classToPlain(users);
  }

  async update({ name, email, id }: IUser): Promise<any> {
    const userAlreadyExists = await this.findById(id);

    if (!userAlreadyExists) {
      throw new Error('User not exists');
    }

    const user = this.userRepository.create({
      id: userAlreadyExists.id,
      email,
      name,
    });

    await this.userRepository.save(user);

    return classToPlain(user);
  }

  async delete(id: string): Promise<void> {
    const userAlreadyExists = await this.findById(id);

    if (!userAlreadyExists) {
      throw new Error('User not exists for deleting');
    }

    await this.userRepository.delete({
      id,
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }
}

export { UserService };
