type ValidatorType = (value: string) => string | undefined

export const required: ValidatorType = value => {
  if (!value) {
    return 'Error: field is required'
  }
  return undefined;
}

export const maxLengthValidatorCreate = (maxLength: number): ValidatorType => (value) => {
  if (value.length > maxLength) {
    return `Error: max length field is ${maxLength}`;
  }
  return undefined;
}