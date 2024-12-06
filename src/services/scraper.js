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
  const data = await Promise.all(
    years.map(year => fetchFinancialReport(companyId, year, REPORT_TYPES.BALANCE_SHEET)
      .then(report => processBalanceSheetData(report, year)))
  );
  return transformDataForExcel(data);
}

async function scrapeIncomeStatement(companyId, years) {
  const data = await Promise.all(
    years.map(year => fetchFinancialReport(companyId, year, REPORT_TYPES.INCOME_STATEMENT)
      .then(report => processIncomeStatementData(report, year)))
  );
  return transformDataForExcel(data);
}

async function scrapeCashFlow(companyId, years) {
  const data = await Promise.all(
    years.map(year => fetchFinancialReport(companyId, year, REPORT_TYPES.CASH_FLOW)
      .then(report => processCashFlowData(report, year)))
  );
  return transformDataForExcel(data);
}

function transformDataForExcel(data) {
  const years = data.map(item => item.year);
  const fields = Object.keys(data[0]).filter(key => key !== 'year');
  
  return fields.map(field => {
    const row = { '項目': field };
    years.forEach((year, index) => {
      row[year] = data[index][field];
    });
    return row;
  });
}

function generateExcelWorkbook(reports) {
  const workbook = XLSX.utils.book_new();
  
  Object.entries(reports).forEach(([sheetName, data]) => {
    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: ['項目', ...data[0] ? Object.keys(data[0]).filter(key => key !== '項目') : []],
    });
    
    const columnWidths = [
      { wch: 30 },
      ...Array(data[0] ? Object.keys(data[0]).length - 1 : 0).fill({ wch: 15 })
    ];
    worksheet['!cols'] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });
  
  return workbook;
}