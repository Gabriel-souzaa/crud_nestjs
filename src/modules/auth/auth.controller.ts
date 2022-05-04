import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async execute(@Body() body: AuthDto, @Res() response: Response) {
    try {
      const { email, password } = body;

      const auth = await this.authService.auth({
        email,
        password,
      });

      return response.status(200).json(auth);
    } catch (err) {
      return response.status(404).json({ error: err.message });
    }
  }
}

export { AuthController };
