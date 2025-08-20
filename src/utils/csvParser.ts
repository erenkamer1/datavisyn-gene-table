/**
 * CSV Parser Utility for Gene Data
 * Functions for processing Excel gene data
 */

import Papa from 'papaparse';
import { Gene } from '../types/gene';

export interface CSVParseResult {
  data: Gene[];
  errors: string[];
  meta: {
    totalRows: number;
    validRows: number;
    invalidRows: number;
  };
}

/**
 * Converts CSV string to Gene array
 */
export const parseGeneCSV = (csvContent: string): CSVParseResult => {
  const result: CSVParseResult = {
    data: [],
    errors: [],
    meta: {
      totalRows: 0,
      validRows: 0,
      invalidRows: 0
    }
  };

  try {
    const parseResult = Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
      delimiter: ';', // CSV file uses semicolon delimiter
      transformHeader: (header: string) => {
        // Normalize CSV headers
        const headerMap: Record<string, string> = {
          'Ensembl': 'ensembl',
          'Gene symbol': 'geneSymbol', 
          'Gene Symbol': 'geneSymbol',
          'Name': 'name',
          'Biotype': 'biotype',
          'Chromosome': 'chromosome',
          'Seq region start': 'seqRegionStart',
          'Seq region end': 'seqRegionEnd'
        };
        
        // Log header transformation for debug
        let transformed = headerMap[header];
        if (!transformed) {
          // Fallback: remove spaces and make camelCase
          transformed = header.toLowerCase()
            .replace(/\s+/g, '')
            .replace(/start$/, 'Start')
            .replace(/end$/, 'End')
            .replace(/symbol$/, 'Symbol');
        }
        
        console.log(`Header transform: "${header}" -> "${transformed}"`);
        return transformed;
      }
    });

    result.meta.totalRows = parseResult.data.length;

    parseResult.data.forEach((row: any, index: number) => {
      try {
        // Log first few rows for debug
        if (index < 3) {
          console.log(`Row ${index + 1} raw data:`, row);
        }
        
        const gene = validateAndTransformGene(row, index);
        if (gene) {
          result.data.push(gene);
          result.meta.validRows++;
        } else {
          result.meta.invalidRows++;
          result.errors.push(`Row ${index + 1}: Invalid gene data`);
        }
      } catch (error) {
        result.meta.invalidRows++;
        result.errors.push(`Row ${index + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    });

    // Also add Papa parse errors
    if (parseResult.errors.length > 0) {
      result.errors.push(...parseResult.errors.map((err: any) => err.message));
    }

  } catch (error) {
    result.errors.push(`CSV Parse Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  return result;
};

/**
 * Converts raw CSV row to Gene object and validates it
 */
const validateAndTransformGene = (row: any, rowIndex: number): Gene | null => {
  // Check fields in first few rows for debug
  if (rowIndex < 3) {
    console.log(`Row ${rowIndex + 1} fields:`, Object.keys(row));
    console.log(`Row ${rowIndex + 1} seqRegionStart:`, row.seqRegionStart, row.seqregionstart);
    console.log(`Row ${rowIndex + 1} seqRegionEnd:`, row.seqRegionEnd, row.seqregionend);
  }

  // Check required fields - only ensembl and chromosome are mandatory
  if (!row.ensembl || !row.chromosome) {
    return null;
  }

  // Convert numeric values - try different field names
  const seqRegionStart = parseNumericValue(
    row.seqRegionStart || row.seqregionStart || row.seqregionstart
  );
  const seqRegionEnd = parseNumericValue(
    row.seqRegionEnd || row.seqregionEnd || row.seqregionend
  );

  if (seqRegionStart === null || seqRegionEnd === null) {
    throw new Error('Invalid sequence region coordinates');
  }

  return {
    ensembl: String(row.ensembl).trim(),
    geneSymbol: String(row.geneSymbol || row.genesymbol || row.geneSymbol || '').trim(),
    name: String(row.name || '').trim(),
    biotype: String(row.biotype || '').trim().replace(/\s+/g, ' '), // Normalize spaces
    chromosome: String(row.chromosome).trim(),
    seqRegionStart,
    seqRegionEnd
  };
};

/**
 * Converts string value to number (scientific notation support)
 */
const parseNumericValue = (value: any): number | null => {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  // Clean if string
  if (typeof value === 'string') {
    value = value.trim().replace(/,/g, '').replace(/\s+/g, '');
  }

  const num = Number(value);
  
  // Detailed log for debug
  if (isNaN(num)) {
    console.warn('Cannot parse numeric value:', value, 'type:', typeof value);
    return null;
  }
  
  return num;
};

/**
 * Reading CSV from file
 */
export const readCSVFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const content = event.target?.result as string;
      resolve(content);
    };
    
    reader.onerror = () => {
      reject(new Error('File reading failed'));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Loads gene data from local CSV file
 */
export const loadGenesFromCSV = async (): Promise<CSVParseResult> => {
  try {
    // Load CSV file with fetch
    const response = await fetch('/genes_human.csv');
    if (!response.ok) {
      throw new Error(`Failed to load CSV file: ${response.statusText}`);
    }
    
    const csvContent = await response.text();
    return parseGeneCSV(csvContent);
  } catch (error) {
    return {
      data: [],
      errors: [`Failed to load CSV file: ${error instanceof Error ? error.message : 'Unknown error'}`],
      meta: {
        totalRows: 0,
        validRows: 0,
        invalidRows: 0
      }
    };
  }
};

/**
 * Sample gene data (for testing)
 */
export const getSampleGeneData = (): Gene[] => {
  return [
    {
      ensembl: "ENSG00000250577",
      geneSymbol: "",
      name: "Lnc RNA",
      biotype: "Lnc RNA",
      chromosome: "4",
      seqRegionStart: 139948,
      seqRegionEnd: 136942432
    },
    {
      ensembl: "ENSG00000171657",
      geneSymbol: "GPR82",
      name: "G protein-coupled receptor 82",
      biotype: "Protein Coding",
      chromosome: "X",
      seqRegionStart: 41724155,
      seqRegionEnd: 41730135
    },
    {
      ensembl: "ENSG00000249877",
      geneSymbol: "",
      name: "Lnc RNA",
      biotype: "Lnc RNA", 
      chromosome: "4",
      seqRegionStart: 189291336,
      seqRegionEnd: 189291336
    }
  ];
};
