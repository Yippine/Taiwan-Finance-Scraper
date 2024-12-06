import { isAfter, isBefore, parse } from 'date-fns';

export function determineLatestQ4Year() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  // Convert to ROC calendar year
  const rocYear = currentYear - 1911;
  
  // Q4 reports deadline is March 31st of the following year
  const q4Deadline = parse(`${currentYear}/03/31`, 'yyyy/MM/dd', new Date());
  
  // If current date is before March 31st, we need to use Q4 from 2 years ago
  if (isBefore(currentDate, q4Deadline)) {
    return rocYear - 2;
  }
  
  // If after March 31st, we can use last year's Q4
  return rocYear - 1;
}

export function generateYearRange(latestYear) {
  return Array.from({ length: 5 }, (_, index) => latestYear - index);
}