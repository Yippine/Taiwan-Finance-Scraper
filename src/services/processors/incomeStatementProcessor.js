import { REPORT_FIELDS } from '../types';

export function processIncomeStatementData(data, year) {
  const fields = REPORT_FIELDS.INCOME_STATEMENT;
  return {
    year: `${year}年度`,
    ...Object.entries(fields).reduce((acc, [key, field]) => ({
      ...acc,
      [key]: data[field]
    }), {})
  };
}