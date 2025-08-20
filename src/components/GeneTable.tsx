/**
 * GeneTable Component - Mantine React Table Implementation
 * Performant table for 5000 gene data
 */

import { useMemo, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_RowSelectionState,
} from 'mantine-react-table';
import {
  Badge,
  Group,
  Text,
  ActionIcon,
  Tooltip,
  Box,
  Stack,
  Button,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDna, IconEye, IconChevronRight } from '@tabler/icons-react';
import { Gene, GeneTableProps } from '../types/gene';

const GeneTable = ({ data, onGeneSelect, loading = false, error }: GeneTableProps) => {
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  // Mantine React Table columns
  const columns = useMemo<MRT_ColumnDef<Gene>[]>(
    () => [
      {
        accessorKey: 'ensembl',
        header: 'Ensembl ID',
        size: 150,
        Cell: ({ cell }) => (
          <Text size="sm" ff="monospace" c="blue">
            {cell.getValue<string>()}
          </Text>
        ),
      },
      {
        accessorKey: 'geneSymbol',
        header: 'Gene Symbol',
        size: 120,
        Cell: ({ cell }) => {
          const symbol = cell.getValue<string>();
          return symbol ? (
            <Badge variant="light" color="cyan" size="sm">
              {symbol}
            </Badge>
          ) : (
            <Text size="xs" c="dimmed" fs="italic">No symbol</Text>
          );
        },
      },
      {
        accessorKey: 'name',
        header: 'Gene Name',
        size: 250,
        Cell: ({ cell }) => {
          const name = cell.getValue<string>();
          return (
            <Tooltip label={name} multiline maw={300}>
              <Text size="sm" lineClamp={2}>
                {name || 'Unnamed gene'}
              </Text>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: 'biotype',
        header: 'Biotype',
        size: 140,
        Cell: ({ cell }) => {
          const biotype = cell.getValue<string>();
          const getBiotypeColor = (type: string) => {
            switch (type.toLowerCase()) {
              case 'protein coding': return 'green';
              case 'lnc rna': return 'blue';
              case 'antisense': return 'orange';
              case 'processed': return 'gray';
              default: return 'violet';
            }
          };
          
          return (
            <Badge 
              variant="filled" 
              color={getBiotypeColor(biotype)}
              size="sm"
            >
              {biotype}
            </Badge>
          );
        },
        filterVariant: 'multi-select',
        filterSelectOptions: Array.from(new Set(data.map(gene => gene.biotype))),
      },
      {
        accessorKey: 'chromosome',
        header: 'Chr',
        size: 80,
        Cell: ({ cell }) => (
          <Badge variant="outline" color="gray" size="sm">
            {cell.getValue<string>()}
          </Badge>
        ),
        filterVariant: 'multi-select',
        filterSelectOptions: Array.from(new Set(data.map(gene => gene.chromosome)))
          .sort((a, b) => {
            // Chromosome sorting: 1-22, X, Y
            if (a === 'X') return b === 'Y' ? -1 : 1;
            if (a === 'Y') return 1;
            if (b === 'X' || b === 'Y') return -1;
            return parseInt(a) - parseInt(b);
          }),
      },
      {
        accessorKey: 'seqRegionStart',
        header: 'Start Position',
        size: 120,
        Cell: ({ cell }) => (
          <Text size="sm" ff="monospace">
            {cell.getValue<number>().toLocaleString()}
          </Text>
        ),
      },
      {
        accessorKey: 'seqRegionEnd',
        header: 'End Position', 
        size: 120,
        Cell: ({ cell }) => (
          <Text size="sm" ff="monospace">
            {cell.getValue<number>().toLocaleString()}
          </Text>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 100,
        enableSorting: false,
        enableFiltering: false,
        Cell: ({ row }) => (
          <Group gap="xs">
            <Tooltip label="View gene details">
              <ActionIcon
                variant="light"
                color="blue"
                size="sm"
                onClick={() => onGeneSelect?.(row.original)}
              >
                <IconEye size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Select gene">
              <ActionIcon
                variant="subtle"
                color="gray"
                size="sm"
                onClick={() => onGeneSelect?.(row.original)}
              >
                <IconChevronRight size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        ),
      },
    ],
    [data, onGeneSelect]
  );

  const table = useMantineReactTable({
    columns,
    data,
    // Performance optimizations
    enableRowVirtualization: true, // Virtualization for 5000 rows
    enableColumnVirtualization: false,
    enablePagination: true,
    enableBottomToolbar: true,
    enableTopToolbar: true,
    
    // Filtering and search
    enableGlobalFilter: true,
    enableColumnFilters: true,
    enableFilters: true,
    
    // Sorting
    enableSorting: true,
    enableMultiSort: true,
    
    // Selection
    enableRowSelection: false, // Disabled for now, using action button for detail view
    onRowSelectionChange: setRowSelection,
    
    // Display features
    enableDensityToggle: true,
    enableFullScreenToggle: true,
    enableColumnResizing: true,
    
    // Header and tools
    renderTopToolbar: ({ table }) => (
      <Box 
        p="xl"
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #1e40af 50%, #4338ca 100%)',
          color: 'white',
          borderRadius: '12px 12px 0 0',
        }}
      >
        <Group justify="space-between">
          <Group spacing="lg">
            <Box
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '50%',
                padding: '8px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <IconDna size={24} color="white" />
            </Box>
            <div>
              <Text fw={700} size="xl" style={{ color: 'white' }}>
                Gene Expression Explorer
              </Text>
              <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Modern genomic data visualization
              </Text>
            </div>
          </Group>
          <Group spacing="md">
            <Box
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '8px 12px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Text size="sm" fw={600} style={{ color: 'white' }}>
                {table.getFilteredRowModel().rows.length} of {data.length} genes
              </Text>
            </Box>
            <Button
              variant="white"
              color="dark"
              leftSection={<IconEye size={16} />}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
              onClick={() => {
                notifications.show({
                  title: 'Info',
                  message: 'This feature will be added soon :)',
                  color: 'blue',
                  icon: <IconEye size="1rem" />,
                });
              }}
            >
              Export Data
            </Button>
          </Group>
        </Group>
      </Box>
    ),
    
    // Pagination
    initialState: {
      pagination: { pageIndex: 0, pageSize: 50 },
      density: 'sm',
    },
    
    // Loading, error and selection states
    state: {
      rowSelection,
      isLoading: loading,
      showLoadingOverlay: loading,
    },
    
    mantineTableProps: {
      highlightOnHover: true,
      withColumnBorders: true,
      withRowBorders: true,
      style: {
        borderRadius: '0 0 12px 12px',
        overflow: 'hidden',
        width: '100%',
        minWidth: '100%',
      },
    },
    mantineTableHeadCellProps: {
      style: {
        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
        fontWeight: 700,
        fontSize: '14px',
        color: '#334155',
        borderBottom: '2px solid #cbd5e1',
      },
    },
    mantineTableBodyRowProps: ({ row, rowIndex }) => ({
      onClick: () => onGeneSelect?.(row.original),
      style: {
        cursor: 'pointer',
        backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f8fafc',
        transition: 'all 0.2s ease',
      },
      onMouseEnter: (event) => {
        event.currentTarget.style.background = 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)';
        event.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
      },
      onMouseLeave: (event) => {
        event.currentTarget.style.background = rowIndex % 2 === 0 ? '#ffffff' : '#f8fafc';
        event.currentTarget.style.boxShadow = 'none';
      },
    }),
  });

  if (error) {
    return (
      <Stack align="center" p="xl">
        <Text c="red" fw={500}>Error loading gene data</Text>
        <Text size="sm" c="dimmed">{error}</Text>
      </Stack>
    );
  }

  return <MantineReactTable table={table} />;
};

export default GeneTable;
