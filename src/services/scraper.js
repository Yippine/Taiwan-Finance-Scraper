import { fetchFinancialReport } from './api';
import { determineLatestQ4Year, generateYearRange } from '../utils/dateUtils';
import { REPORT_TYPES } from './types';
import { processBalanceSheetData } from './processors/balanceSheetProcessor';
import { processIncomeStatementData } from './processors/incomeStatementProcessor';
import { processCashFlowData } from './processors/cashFlowProcessor';
import * as XLSX from 'xlsx-js-style';

export async function scrapeFinancialData(companyId) {
  try {
    const latestYear = determineLatestQ4Year();
    const years = generateYearRange(latestYear);
    
    const reports = {
      資產負債表: await scrapeBalanceSheet(companyId, years),
      綜合損益表: await scrapeIncomeStatement(companyId, years),
      現金流量表: await scrapeCashFlow(companyId, years)
    };

    return generateExcelWorkbook(reports);
  } catch (error) {
    console.error('Error scraping financial data:', error);
    throw new Error('資料擷取失敗');
  }
}

async function scrapeBalanceSheet(companyId, years) {
  const data = [];
  for (const year of years) {
    const report = await fetchFinancialReport(companyId, year, REPORT_TYPES.BALANCE_SHEET);
    data.push(processBalanceSheetData(report, year));
  }
  return data;
}

async function scrapeIncomeStatement(companyId, years) {
  const data = [];
  for (const year of years) {
    const report = await fetchFinancialReport(companyId, year, REPORT_TYPES.INCOME_STATEMENT);
    data.push(processIncomeStatementData(report, year));
  }
  return data;
}

async function scrapeCashFlow(companyId, years) {
  const data = [];
  for (const year of years) {
    const report = await fetchFinancialReport(companyId, year, REPORT_TYPES.CASH_FLOW);
    data.push(processCashFlowData(report, year));
  }
  return data;
}

function generateExcelWorkbook(reports) {
  const workbook = XLSX.utils.book_new();
  
  Object.entries(reports).forEach(([sheetName, data]) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });
  
  return workbook;
}