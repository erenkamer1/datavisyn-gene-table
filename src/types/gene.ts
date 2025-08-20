/**
 * Datavisyn Gene Table Challenge - Type Definitions
 * TypeScript interfaces for gene data
 */

import React from 'react';

export interface Gene {
  ensembl: string;           // ENSG00000250577
  geneSymbol: string;        // GPR82, GPR85, etc.
  name: string;              // G protein-coupled receptor 82
  biotype: string;           // Protein Coding, Lnc RNA, Antisense, etc.
  chromosome: string;        // 1-22, X, Y
  seqRegionStart: number;    // Genomic position start
  seqRegionEnd: number;      // Genomic position end
}

export interface GeneTableProps {
  data: Gene[];
  onGeneSelect?: (gene: Gene) => void;
  loading?: boolean;
  error?: string;
}

export interface FilterState {
  globalFilter: string;
  biotype: string[];
  chromosome: string[];
  seqRegionRange: [number, number];
}

export interface GeneDetailProps {
  gene: Gene | null;
  onClose?: () => void;
}

export interface ChartData {
  name: string;
  value: number;
  category?: string;
}

// Custom type extension for Mantine React Table
export type GeneColumnDef = {
  accessorKey: keyof Gene;
  header: string;
  size?: number;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  Cell?: ({ cell }: { cell: any }) => React.ReactElement;
};
