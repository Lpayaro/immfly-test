import { IsString } from 'class-validator';

export class ReverseStringDto {
  @IsString()
  param: string;
}
