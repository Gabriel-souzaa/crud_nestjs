import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpsertUserDto } from './dto/upsertUser.dto';

@ApiTags('User')
@Controller('user')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async execute(@Body() body: UpsertUserDto, @Res() response: Response) {
    try {
      const { name, email, password } = body;

      const user = await this.userService.create({
        name,
        email,
        password,
      });

      return response.status(201).json(user);
    } catch (err) {
      return response.status(404).json({ error: err.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async show(@Res() response: Response) {
    try {
      const users = await this.userService.find();
      return response.status(200).json(users);
    } catch (err) {
      return response.status(404).json({ error: err.message });
    }
  }

  @ApiParam({
    name: 'id',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async upsert(
    @Param() params,
    @Body() body: UpsertUserDto,
    @Res() response: Response,
  ) {
    try {
      const { id } = params;
      const { name, email } = body;

      const user = await this.userService.update({
        id,
        name,
        email,
      });

      return response.status(201).json(user);
    } catch (err) {
      return response.status(404).json({ error: err.message });
    }
  }

  @ApiParam({
    name: 'id',
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params, @Res() response: Response) {
    try {
      const { id } = params;

      await this.userService.delete(id);

      return response.status(200).json({
        message: `id ${id} deleted!`,
      });
    } catch (err) {
      return response.status(404).json({
        error: err.message,
      });
    }
  }
}

export { UserController };
