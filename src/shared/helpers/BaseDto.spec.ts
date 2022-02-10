import { IsPositive } from 'class-validator';
import { BaseDto } from './BaseDto';

describe('BaseDto Test Suite', () => {
  class GenericDto extends BaseDto {
    @IsPositive() numeral: number;

    constructor(numeral: number) {
      super();
      this.numeral = numeral;
    }
  }

  test('It should validate an object that extends it', () => {
    const dto = new GenericDto(5);
    expect(dto.validateDto!()).resolves.not.toThrow();
  });

  test('It should validate an object that extends it and throw an error if finds', () => {
    const dto = new GenericDto(-5);
    expect(dto.validateDto!()).rejects.toThrow();
  });
});
