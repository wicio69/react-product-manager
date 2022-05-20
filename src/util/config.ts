// Normally, I would put this URL in .env:
export const API_BASE_URL: string =
  'http://hbalabkhmw.cdprojektred.com:3000/api/Products';

export const ValidationConsts = {
  MAX_NAME_LENGTH: 5,
  NAME_VALIDATION: `Name must be at least 5 characters long.`,
  REGEX_EMAIL:
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  EMAIL_VALIDATION: 'E-mail must have a correct format.',
  MAX_DESC_LENGTH: 20,
  DESC_VALIDATION: 'Description must be no longer than 20 character.',
};

export const BASE_ID = 1;
