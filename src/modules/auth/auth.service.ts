import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { IAuth } from './auth.interface';

@Injectable()
class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async auth({ email, password }: IAuth) {
    const userAlreadyExists = await this.findUserByEmail(email);

    if (!userAlreadyExists) {
      throw new Error('User not exists');
    }

    const passMath = await compare(password, userAlreadyExists.password);

    if (!passMath) {
      throw new Error('Password incorret');
    }

    const token = this.jwtService.sign({
      username: userAlreadyExists.email,
      sub: userAlreadyExists.id,
    });

    return {
      access_token: token,
    };
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.authRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}

export { AuthService };
