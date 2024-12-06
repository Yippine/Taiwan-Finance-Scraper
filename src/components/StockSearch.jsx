import React, { useState } from 'react';
import { scrapeFinancialData } from '../services/scraper';
import * as XLSX from 'xlsx-js-style';

export default function StockSearch() {
  const [companyId, setCompanyId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyId.trim()) {
      setError('請輸入公司代號');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const workbook = await scrapeFinancialData(companyId);
      XLSX.writeFile(workbook, `${companyId}_financial_reports.xlsx`);
    } catch (err) {
      setError(err.message || '資料擷取失敗，請稍後再試');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">台股財報查詢系統</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="companyId" className="block text-sm font-medium text-gray-700">
            公司代號
          </label>
          <input
            type="text"
            id="companyId"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="例：5410"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {loading ? '資料擷取中...' : '查詢財報'}
        </button>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}