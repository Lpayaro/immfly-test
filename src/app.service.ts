import { Injectable } from '@nestjs/common';
import { CountryRecord } from './interfaces/countries';

@Injectable()
export class AppService {
  COUNTRIES_URL = 'https://api.jsonbin.io/v3/b/5f69afbe65b18913fc510ce8';

  getHello(): string {
    return 'Hello World!';
  }

  async getCountries(filter?: string, order?: string): Promise<Array<CountryRecord>> {
  
    const response = await fetch(this.COUNTRIES_URL);
    const data = await response.json();
    let filteredRecords = data.record;

    if (filter) {
      filteredRecords = filteredRecords.filter(
        (e: CountryRecord) => e.country.includes(filter) || e.code.includes(filter),
      );
    }

    if (order === 'asc') {
      filteredRecords = filteredRecords.sort((a: CountryRecord, b: CountryRecord) => a.vat - b.vat)
    } else if (order === 'desc') {
      filteredRecords = filteredRecords.sort((a: CountryRecord, b: CountryRecord) => b.vat - a.vat)
    }

    return filteredRecords; 
  }

  reverse(input: string): string {
    const reversed = input.split('').reverse();

    const vowelsUppercased = reversed.map(char => {
      const isVowel = 'aeiou'.includes(char.toLowerCase());
      return isVowel ? char.toUpperCase() : char;
    });
    
    return vowelsUppercased.join('');
  }


}
