export const REPORT_TYPES = {
  BALANCE_SHEET: 'balance',
  INCOME_STATEMENT: 'income',
  CASH_FLOW: 'cashflow'
};

export const REPORT_FIELDS = {
  BALANCE_SHEET: {
    流動資產: 'currentAssets',
    非流動資產: 'nonCurrentAssets',
    流動負債: 'currentLiabilities',
    非流動負債: 'nonCurrentLiabilities',
    歸屬於母公司業主之權益: 'equity',
    股本: 'capital',
    資本公積: 'capitalSurplus',
    保留盈餘: 'retainedEarnings',
    其他權益: 'otherEquity'
  },
  INCOME_STATEMENT: {
    營業收入: 'operatingRevenue',
    營業成本: 'operatingCost',
    營業毛利: 'grossProfit',
    營業費用: 'operatingExpenses',
    營業利益: 'operatingIncome',
    稅前淨利: 'incomeBeforeTax',
    本期淨利: 'netIncome',
    每股盈餘: 'eps'
  },
  CASH_FLOW: {
    營業活動之淨現金流入: 'operatingCashFlow',
    投資活動之淨現金流入: 'investingCashFlow',
    籌資活動之淨現金流入: 'financingCashFlow',
    本期現金及約當現金增加數: 'netCashFlow',
    期末現金及約當現金餘額: 'endingCashBalance'
  }
};