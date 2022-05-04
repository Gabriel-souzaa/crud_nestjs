import { ApiProperty } from '@nestjs/swagger';

export class UpsertEventDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  uf: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  complement: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  fone: string;

  @ApiProperty()
  images: string;

  @ApiProperty()
  date: string;
}
