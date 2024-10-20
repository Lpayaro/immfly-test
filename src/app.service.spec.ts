import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CountryRecord } from './interfaces/countries';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('[Countries Function]', () => {
    const mockCountries: CountryRecord[] = [
      { country: 'Denmark', code: 'DK', vat: 25 },
      { country: 'Estonia', code: 'EE', vat: 20 },
      { country: 'Finland', code: 'FI', vat: 24 },
    ];
    beforeAll(() => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue({ record: mockCountries }),
      } as any);
     })
    it('should filter countries by code as well as country name', async () => {

      const resultByCountry = await appService.getCountries('Finland');
      expect(resultByCountry).toEqual([mockCountries[2]]);

      const resultByCode = await appService.getCountries('DK');
      expect(resultByCode).toEqual([mockCountries[0]]);

      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenCalledWith(appService.COUNTRIES_URL);
    });

    it('should sort countries in ascending order of VAT', async () => {
      const result = await appService.getCountries(undefined, 'asc');

      expect(result).toEqual([
        { country: 'Estonia', code: 'EE', vat: 20 },
        { country: 'Finland', code: 'FI', vat: 24 },
        { country: 'Denmark', code: 'DK', vat: 25 },
      ]);
    });

    it('should sort countries in descending order of VAT', async () => {

      const result = await appService.getCountries(undefined, 'desc');

      expect(result).toEqual([
        { country: 'Denmark', code: 'DK', vat: 25 },
        { country: 'Finland', code: 'FI', vat: 24 },
        { country: 'Estonia', code: 'EE', vat: 20 },
      ]);
      expect(global.fetch).toHaveBeenCalledWith(appService.COUNTRIES_URL);
    });

    // it('should return an empty array when no countries match the filter', async () => {
    //   const mockCountries: CountryRecord[] = [
    //     { country: 'Denmark', code: 'DK', vat: 25 },
    //     { country: 'Estonia', code: 'EE', vat: 20 },
    //   ];
    //   const filterParam = 'NonexistentCountry';
    //   jest.spyOn(appService, 'getCountries').mockResolvedValue([]);

    //   const result = await appService.getCountries( filterParam );

    //   expect(result).toEqual([]);
    //   expect(appService.getCountries).toHaveBeenCalledWith(
    //     filterParam
    //   );
    // });

    it('should handle case where COUNTRIES_URL is invalid or unreachable', async () => {
      const mockFetch = jest.fn().mockRejectedValue(new Error('Network error'));
      global.fetch = mockFetch;

      await expect(appService.getCountries()).rejects.toThrow('Network error');

      expect(mockFetch).toHaveBeenCalledWith(appService.COUNTRIES_URL);
    });
  });

  describe('[Reverse Function]', () => {
    it('should reverse a string and uppercase vowels correctly', () => {
      const input = 'hello world';
      const expected = 'dlrOw OllEh';

      const result = appService.reverse(input);

      expect(result).toBe(expected);
    });

    it('should handle empty string input for reverse function', () => {
      const result = appService.reverse('');
      expect(result).toBe('');
    });
  });

  describe('[Append Function]', () => {
    let configServiceMock;
    let appService: AppService;

    beforeEach(() => {
      configServiceMock = {
        get: jest.fn(),
      };
      appService = new AppService(configServiceMock as any);
      configServiceMock.get.mockReturnValue('middle');
    });

    it('should append start and end strings to the array correctly', () => {
      const result = appService.append('start', 'end');

      expect(configServiceMock.get).toHaveBeenCalledWith('SIMPLE_ARRAY');
      expect(result).toEqual(['start', 'middle', 'end']);
    });

    it('should return only the config array when no start or end parameters are provided', () => {
      const result = appService.append();
      
      expect(result).toEqual([ 'middle']);
      expect(configServiceMock.get).toHaveBeenCalledWith('SIMPLE_ARRAY');
    });
  });

});
