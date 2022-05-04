import { ApiProperty } from '@nestjs/swagger';

export class UpsertUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
