import { ValidationOptions } from '../ValidationOptions';
import { buildMessage, ValidateBy } from '../common/ValidateBy';
import isIPRangeValidator from 'validator/lib/isIPRange';

export type IsIpRangeVersion = '4' | '6' | 4 | 6;

export const IS_IP_RANGE = 'isIpRange';

/**
 * Checks if the string is an IP CIDR range (version 4 only).
 * If given value is not a string, then it returns false.
 */
export function isIPRange(value: unknown): boolean {
  return typeof value === 'string' && isIPRangeValidator(value);
}

/**
 * Checks if the string is an IP CIDR range (version 4 only).
 * If given value is not a string, then it returns false.
 */
export function IsIPRange(version?: IsIpRangeVersion, validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_IP_RANGE,
      constraints: [version],
      validator: {
        validate: (value): boolean => isIPRange(value),
        defaultMessage: buildMessage(
          eachPrefix => eachPrefix + '$property must be an ip address range',
          validationOptions
        ),
      },
    },
    validationOptions
  );
}
