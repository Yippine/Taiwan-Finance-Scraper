import axios from 'axios';
import * as cheerio from 'cheerio';
import { REPORT_TYPES } from './types';
import { parseBalanceSheet, parseIncomeStatement, parseCashFlow } from './parsers/financialParsers';

const BASE_URL = 'https://mopsplus.twse.com.tw/mops';

export async function fetchFinancialReport(companyId, year, reportType) {
  try {
    const reportUrl = getReportUrl(reportType);
    const response = await axios.get(reportUrl, {
      params: getRequestParams(companyId, year)
    });

    return parseFinancialData(response.data, reportType);
  } catch (error) {
    console.error('Error fetching financial report:', error);
    throw new Error('無法取得財報資料');
  }
}

function getReportUrl(reportType) {
  const reportNumber = getReportNumber(reportType);
  return `${BASE_URL}/web/t164sb0${reportNumber}`;
}

function getReportNumber(reportType) {
  const reportNumbers = {
    [REPORT_TYPES.BALANCE_SHEET]: '3',
    [REPORT_TYPES.INCOME_STATEMENT]: '4',
    [REPORT_TYPES.CASH_FLOW]: '5'
  };
  return reportNumbers[reportType] || '3';
}

function getRequestParams(companyId, year) {
  return {
    encodeURIComponent: 1,
    step: 1,
    firstin: 1,
    off: 1,
    isQuery: 'Y',
    TYPEK: 'all',
    year,
    season: 4,
    co_id: companyId,
    dataType: 2,
    subsidiaryCompanyId: ''
  };
}

function parseFinancialData(html, reportType) {
  const $ = cheerio.load(html);
  
  const parsers = {
    [REPORT_TYPES.BALANCE_SHEET]: parseBalanceSheet,
    [REPORT_TYPES.INCOME_STATEMENT]: parseIncomeStatement,
    [REPORT_TYPES.CASH_FLOW]: parseCashFlow
  };

  return parsers[reportType]($);
}