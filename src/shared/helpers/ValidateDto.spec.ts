import { IsPositive } from 'class-validator';
import { BaseDto } from './BaseDto';
import { ValidateDto } from './ValidateDto';

describe('ValidateDto Test Suite', () => {
  test('It should validate an dto', () => {
    class GenericDto extends BaseDto {
      @IsPositive() numeral!: number;

      constructor() {
        super();
      }
    }
    class Testable {
      @ValidateDto(GenericDto)
      method(_generic: GenericDto): boolean {
        return true;
      }
    }
    const testObj = new Testable();

    expect(testObj.method({ numeral: 5 })).resolves.not.toThrow();
  });
});
