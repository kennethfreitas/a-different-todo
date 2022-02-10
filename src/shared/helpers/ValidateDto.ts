import { plainToInstance } from 'class-transformer';
import { BaseDto } from './BaseDto';

export function ValidateDto<T extends BaseDto>(dtoClass: new () => T) {
  return function (_target: unknown, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      const [arg] = args;
      const dto = plainToInstance(dtoClass, arg);
      await dto.validateDto!();

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
