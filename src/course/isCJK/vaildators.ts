import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator } from 'class-validator';

@ValidatorConstraint({ name: 'containsChinese', async: false })
export class ContainsChineseConstraint implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (!text) return true; // Allow empty values
    return /[\u4E00-\u9FFF]/.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} can optionally contain Chinese characters`;
  }
}

export function ContainsChinese(validationOptions?: Record<string, any>) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ContainsChineseConstraint,
    });
  };
}
