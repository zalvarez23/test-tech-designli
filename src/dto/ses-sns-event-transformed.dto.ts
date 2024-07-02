import { IsBoolean, IsString, IsArray } from 'class-validator';

class SesSnsEventTransformedDto {
  @IsBoolean()
  spam: boolean;

  @IsBoolean()
  virus: boolean;

  @IsBoolean()
  dns: boolean;

  @IsString()
  mes: string;

  @IsBoolean()
  retrasado: boolean;

  @IsString()
  emisor: string;

  @IsArray()
  receptor: string[];
}

export default SesSnsEventTransformedDto;
