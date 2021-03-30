export const required = value => {
  if (!value) {
    return 'Error: field is required'
  }
  return undefined;
}

export const maxLengthValidatorCreate = (maxLength) => (value) => {
  if (value.length > maxLength) {
    return `Error: max length field is ${maxLength}`;
  }
  return undefined;
}