import axios from 'axios';

const BASE_URL = 'https://mopsplus.twse.com.tw/mops';

export async function fetchFinancialReport(companyId, year, reportType) {
  try {
    const response = await axios.get(`${BASE_URL}/web/t164sb0${getReportNumber(reportType)}`, {
      params: {
        encodeURIComponent: 1,
        step: 1,
        firstin: 1,
        off: 1,
        isQuery: 'Y',
        TYPEK: 'all',
        year: year,
        season: 4,
        co_id: companyId,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching financial report:', error);
    throw new Error('無法取得財報資料');
  }
}

function getReportNumber(reportType) {
  switch (reportType) {
    case 'balance': return '3';
    case 'income': return '4';
    case 'cashflow': return '5';
    default: throw new Error('不支援的報表類型');
  }
}