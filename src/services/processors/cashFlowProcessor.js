import { REPORT_FIELDS } from '../types';

export function processCashFlowData(data, year) {
  const fields = REPORT_FIELDS.CASH_FLOW;
  return {
    year: `${year}年度`,
    ...Object.entries(fields).reduce((acc, [key, field]) => ({
      ...acc,
      [key]: data[field]
    }), {})
  };
}