import { IsOptional, IsString } from 'class-validator';

export class AppendStringsDto {
  @IsOptional() // start parameter is optional
  @IsString() // validate that it is a string if provided
  start?: string;

  @IsOptional() // end parameter is optional
  @IsString() // validate that it is a string if provided
  end?: string;
}
