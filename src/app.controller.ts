import { Controller, Get, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CountryRecord } from './interfaces/countries';
import { GetCountriesQueryDto } from './dto/getCountriesQuery.dto';
import { ReverseStringDto } from './dto/reverseParam.dto';
import { AppendStringsDto } from './dto/appendStrings.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/countries')
  async getCountries(
    @Query() query: GetCountriesQueryDto,
  ): Promise<CountryRecord[]> {
    return await this.appService.getCountries(query.filter, query.order);
  }

  @Get('/reverse/:param')
  getReversed(@Param() params: ReverseStringDto): string {
    const { param } = params;
    return this.appService.reverse(param);
  }

  @Get('/append')
  appendStrings(@Query() query: AppendStringsDto): string[] {
    const { start, end } = query;
    return this.appService.append(start, end);
  }
}
