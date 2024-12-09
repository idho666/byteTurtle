import * as XLSX from 'xlsx';
import type { FileData } from '../types';

export const downloadExcel = (data: FileData[][], filename = 'converted_excel.xlsx') => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, filename);
};