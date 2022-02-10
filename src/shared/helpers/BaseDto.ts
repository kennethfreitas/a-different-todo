import { validate } from 'class-validator';

export abstract class BaseDto {
  async validateDto?(): Promise<void> {
    const errors = await validate(this);
    if (errors.length) {
      const invalidProps = errors.map(el => el.property).join(',');
      throw new Error(`The following properties are invalid ${invalidProps}`);
    }
  }
}
