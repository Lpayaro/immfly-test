import { Injectable } from '@nestjs/common';
import { CountryRecord } from './interfaces/countries';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  COUNTRIES_URL = 'https://api.jsonbin.io/v3/b/5f69afbe65b18913fc510ce8';

  getHello(): string {
    return `Hello! This is a simple NestJS application for an Immfly backed test for Lorenzo P!
Feel free to explore the following endpoints:

- GET /countries - List all countries
- GET /countries?filter={filter} - Filter countries by name or code
- GET /countries?order={asc|desc} - Order countries by VAT
- GET /reverse/{text} - Reverse a string and capitalize vowels
- GET /append?start={start}&end={end} - Append to a simple array

Example supposing immfly-test.onrender.com as host: <a href="https://immfly-test.onrender.com/reverse/chocolate">https://immfly-test.onrender.com/reverse/chocolate</a>

Enjoy exploring the API!`.replace(/\n/g, '<br>');
  }

  async getCountries(
    filter?: string,
    order?: string,
  ): Promise<Array<CountryRecord>> {
    const response = await fetch(this.COUNTRIES_URL);
    const data = await response.json();
    let filteredRecords = data.record;

    if (filter) {
      filteredRecords = filteredRecords.filter(
        (e: CountryRecord) =>
          e.country.includes(filter) || e.code.includes(filter),
      );
    }

    if (order === 'asc') {
      filteredRecords = filteredRecords.sort(
        (a: CountryRecord, b: CountryRecord) => a.vat - b.vat,
      );
    } else if (order === 'desc') {
      filteredRecords = filteredRecords.sort(
        (a: CountryRecord, b: CountryRecord) => b.vat - a.vat,
      );
    }

    return filteredRecords;
  }

  reverse(input: string): string {
    const reversed = input.split('').reverse();

    const vowelsUppercased = reversed.map((char) => {
      const isVowel = 'aeiou'.includes(char.toLowerCase());
      return isVowel ? char.toUpperCase() : char;
    });

    return vowelsUppercased.join('');
  }

  append(start?: string, end?: string): string[] {
    const simpleArray = [this.configService.get<string>('SIMPLE_ARRAY')];

    if (start) {
      simpleArray.unshift(start);
    }

    if (end) {
      simpleArray.push(end);
    }

    return simpleArray;
  }
}
