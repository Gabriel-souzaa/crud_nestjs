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
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpsertEventDto } from './dto/upsertEvent.dto';
import { EventService } from './event.service';

@ApiBearerAuth()
@ApiTags('Event')
@Controller('event')
class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async execute(@Body() body: UpsertEventDto, @Res() response: Response) {
    try {
      const { address, city, complement, date, email, fone, images, name, uf } =
        body;

      const event = await this.eventService.create({
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

      return response.status(201).json(event);
    } catch (err) {
      return response.status(404).json({ error: err.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async show(@Res() response: Response) {
    try {
      const events = await this.eventService.find();
      return response.status(201).json(events);
    } catch (err) {
      return response.status(404).json({ error: err.message });
    }
  }

  @ApiParam({
    name: 'id',
    required: true,
  })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async upsert(
    @Param() params,
    @Body() body: UpsertEventDto,
    @Res() response: Response,
  ) {
    try {
      const { address, city, complement, date, email, fone, images, name, uf } =
        body;

      const { id } = params;

      const event = await this.eventService.update({
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
      });

      return response.status(201).json(event);
    } catch (err) {
      return response.status(404).json({ error: err.message });
    }
  }

  @ApiParam({
    name: 'id',
    required: true,
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params, @Res() response: Response) {
    try {
      const { id } = params;

      await this.eventService.delete(id);

      return response.status(200).json({
        message: `id ${id} deleted!`,
      });
    } catch (err) {
      return response.status(404).json({ error: err.message });
    }
  }
}

export { EventController };
