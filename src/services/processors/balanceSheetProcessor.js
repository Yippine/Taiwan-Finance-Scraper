import { REPORT_FIELDS } from '../types';

export function processBalanceSheetData(data, year) {
  const fields = REPORT_FIELDS.BALANCE_SHEET;
  return {
    year: `${year}年12月31日`,
    ...Object.entries(fields).reduce((acc, [key, field]) => ({
      ...acc,
      [key]: data[field]
    }), {})
  };
}