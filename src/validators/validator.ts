import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';
import { PayloadTooLargeException } from '@nestjs/common';

@ValidatorConstraint({ name: 'containsChinese', async: false })
export class ContainsChineseConstraint implements ValidatorConstraintInterface {
  validate(text: string) {
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

export function commentContentLength(content: string): void {
  if (content.length > 1000) {
    throw new PayloadTooLargeException(
      'Content length exceeds the limit of 1000 characters',
    );
  }
}

export function reviewContentLength(content: string): void {
  if (content.length > 2000) {
    throw new PayloadTooLargeException(
      'Content length exceeds the limit of 2000 characters',
    );
  }
}
