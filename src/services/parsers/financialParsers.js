export function parseBalanceSheet($) {
  return {
    currentAssets: extractValue($, '流動資產合計'),
    nonCurrentAssets: extractValue($, '非流動資產合計'),
    currentLiabilities: extractValue($, '流動負債合計'),
    nonCurrentLiabilities: extractValue($, '非流動負債合計'),
    equity: extractValue($, '歸屬於母公司業主之權益合計'),
    capital: extractValue($, '股本合計'),
    capitalSurplus: extractValue($, '資本公積合計'),
    retainedEarnings: extractValue($, '保留盈餘合計'),
    otherEquity: extractValue($, '其他權益合計')
  };
}

export function parseIncomeStatement($) {
  return {
    operatingRevenue: extractValue($, '營業收入合計'),
    operatingCost: extractValue($, '營業成本合計'),
    grossProfit: extractValue($, '營業毛利（毛損）'),
    operatingExpenses: extractValue($, '營業費用合計'),
    operatingIncome: extractValue($, '營業利益（損失）'),
    incomeBeforeTax: extractValue($, '稅前淨利（淨損）'),
    netIncome: extractValue($, '本期淨利（淨損）'),
    eps: extractValue($, '基本每股盈餘（元）')
  };
}

export function parseCashFlow($) {
  return {
    operatingCashFlow: extractValue($, '營業活動之淨現金流入（流出）'),
    investingCashFlow: extractValue($, '投資活動之淨現金流入（流出）'),
    financingCashFlow: extractValue($, '籌資活動之淨現金流入（流出）'),
    netCashFlow: extractValue($, '本期現金及約當現金增加（減少）數'),
    endingCashBalance: extractValue($, '期末現金及約當現金餘額')
  };
}

function extractValue($, selector) {
  const value = $(`td:contains("${selector}")`).next().text().trim();
  return value || '0';
}