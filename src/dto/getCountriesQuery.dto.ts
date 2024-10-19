import { IsOptional, IsString, IsIn } from 'class-validator';

export class GetCountriesQueryDto {
  @IsOptional()
  @IsString()
  filter?: string;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'], { message: 'Order must be either "asc" or "desc"' }) // Validates that order is either "asc" or "desc"
  order?: string;
}
