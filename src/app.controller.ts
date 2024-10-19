import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CountryRecord } from './interfaces/countries';
import { GetCountriesQueryDto } from './dto/getCountriesQuery.dto';

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
}
