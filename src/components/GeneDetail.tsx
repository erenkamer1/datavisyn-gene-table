/**
 * GeneDetail Component - Gene detail view and visualization
 */

import { useMemo } from 'react';
import {
  Stack,
  Title,
  Text,
  Badge,
  Group,
  Card,
  Divider,
  ActionIcon,
  Box,
  SimpleGrid,
  ThemeIcon,
  Button,
} from '@mantine/core';
import {
  IconX,
  IconDna,
  IconRuler,
  IconMapPin,
  IconBrandGithub,
  IconExternalLink,
} from '@tabler/icons-react';
import ReactECharts from 'echarts-for-react';
import { GeneDetailProps } from '../types/gene';

const GeneDetail = ({ gene, onClose }: GeneDetailProps) => {
  // Gene length calculation
  const geneLength = useMemo(() => {
    if (!gene) return 0;
    return gene.seqRegionEnd - gene.seqRegionStart;
  }, [gene]);

  // Data for genomic position chart
  const genomicPositionChart = useMemo(() => {
    if (!gene) return null;

    const option = {
      title: {
        text: 'Genomic Position',
        textStyle: { fontSize: 14, fontWeight: 'bold' }
      },
      tooltip: {
        formatter: (params: any) => {
          return `Position: ${params.value.toLocaleString()}`;
        }
      },
      xAxis: {
        type: 'value',
        name: 'Chromosome Position',
        axisLabel: {
          formatter: (value: number) => (value / 1000000).toFixed(1) + 'M'
        }
      },
      yAxis: {
        type: 'category',
        data: ['Gene Region']
      },
      series: [
        {
          name: 'Gene Region',
          type: 'bar',
          data: [
            {
              value: geneLength,
              itemStyle: {
                color: gene.biotype === 'Protein Coding' ? '#51cf66' : 
                       gene.biotype === 'Lnc RNA' ? '#339af0' : '#8c5cf6'
              }
            }
          ],
          barWidth: '60%',
        }
      ],
      grid: {
        left: '15%',
        right: '10%',
        top: '15%',
        bottom: '15%'
      }
    };

    return option;
  }, [gene, geneLength]);

  // Sample data for biotype distribution (in real project comes from API)
  const biotypeChart = useMemo(() => {
    const biotypeColors: Record<string, string> = {
      'Protein Coding': '#51cf66',
      'Lnc RNA': '#339af0', 
      'Antisense': '#ff922b',
      'Processed': '#868e96',
    };

    const option = {
      title: {
        text: 'Gene Biotype',
        textStyle: { fontSize: 14, fontWeight: 'bold' }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          data: [
            { value: gene?.biotype === 'Protein Coding' ? 1 : 0, name: 'Protein Coding' },
            { value: gene?.biotype === 'Lnc RNA' ? 1 : 0, name: 'Lnc RNA' },
            { value: gene?.biotype === 'Antisense' ? 1 : 0, name: 'Antisense' },
            { value: gene?.biotype === 'Processed' ? 1 : 0, name: 'Processed' },
          ].filter(item => item.value > 0),
          itemStyle: {
            color: (params: any) => biotypeColors[params.name] || '#868e96'
          },
          label: {
            fontSize: 12
          }
        }
      ]
    };

    return option;
  }, [gene]);

  if (!gene) {
    return (
      <Stack align="center" justify="center" h={200}>
        <Text c="dimmed">No gene selected</Text>
      </Stack>
    );
  }

  return (
    <Stack spacing="md">
      {/* Header */}
      <Box
        p="lg"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
          color: 'white',
        }}
      >
        <Group justify="space-between">
          <Group spacing="md">
            <Box
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '50%',
                padding: '12px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <IconDna size={24} color="white" />
            </Box>
            <div>
              <Title order={3} style={{ color: 'white', fontWeight: 700 }}>
                Gene Details
              </Title>
              <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Genomic Information & Analytics
              </Text>
            </div>
          </Group>
          {onClose && (
            <ActionIcon 
              variant="subtle" 
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
              }}
            >
              <IconX size={16} />
            </ActionIcon>
          )}
        </Group>
      </Box>

      <Divider />

      {/* Basic Information */}
      <Card 
        withBorder
        shadow="md"
        style={{
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid #e2e8f0',
        }}
      >
        <Stack spacing="sm">
          <Group position="apart">
            <Text fw={500}>Ensembl ID</Text>
            <Text ff="monospace" size="sm" c="blue">{gene.ensembl}</Text>
          </Group>
          
          <Group position="apart">
            <Text fw={500}>Gene Symbol</Text>
            {gene.geneSymbol ? (
              <Badge variant="light" color="cyan">{gene.geneSymbol}</Badge>
            ) : (
              <Text size="sm" c="dimmed" fs="italic">No symbol</Text>
            )}
          </Group>

          <Group position="apart" align="flex-start">
            <Text fw={500}>Name</Text>
            <Text size="sm" ta="right" maw={200}>
              {gene.name || 'Unnamed gene'}
            </Text>
          </Group>

          <Group position="apart">
            <Text fw={500}>Biotype</Text>
            <Badge 
              variant="filled" 
              color={
                gene.biotype === 'Protein Coding' ? 'green' :
                gene.biotype === 'Lnc RNA' ? 'blue' :
                gene.biotype === 'Antisense' ? 'orange' : 'gray'
              }
            >
              {gene.biotype}
            </Badge>
          </Group>
        </Stack>
      </Card>

      {/* Genomic Location */}
      <Card 
        withBorder
        shadow="md"
        style={{
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid #e2e8f0',
        }}
      >
        <Stack spacing="sm">
          <Group>
            <IconMapPin size={16} />
            <Text fw={500}>Genomic Location</Text>
          </Group>
          
          <SimpleGrid cols={2}>
            <Box>
              <Text size="xs" c="dimmed" tt="uppercase" fw={500}>Chromosome</Text>
              <Badge variant="outline" size="lg">{gene.chromosome}</Badge>
            </Box>
            <Box>
              <Text size="xs" c="dimmed" tt="uppercase" fw={500}>Length</Text>
              <Group spacing="xs">
                <IconRuler size={14} />
                <Text size="sm" ff="monospace">{geneLength.toLocaleString()} bp</Text>
              </Group>
            </Box>
          </SimpleGrid>

          <Box>
            <Text size="xs" c="dimmed" tt="uppercase" fw={500} mb="xs">Position Range</Text>
            <Text size="sm" ff="monospace">
              {gene.seqRegionStart.toLocaleString()} - {gene.seqRegionEnd.toLocaleString()}
            </Text>
          </Box>
        </Stack>
      </Card>

      {/* Genomic Position Visualization */}
      {genomicPositionChart && (
        <Card 
          withBorder
          shadow="md"
          style={{
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid #e2e8f0',
          }}
        >
          <ReactECharts 
            option={genomicPositionChart} 
            style={{ height: '200px' }}
          />
        </Card>
      )}

      {/* Biotype Distribution */}
      {biotypeChart && (
        <Card 
          withBorder
          shadow="md"
          style={{
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid #e2e8f0',
          }}
        >
          <ReactECharts 
            option={biotypeChart} 
            style={{ height: '200px' }}
          />
        </Card>
      )}

      {/* External Links */}
      <Card 
        withBorder
        shadow="md"
        style={{
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid #e2e8f0',
        }}
      >
        <Stack spacing="sm">
          <Text fw={500}>External Links</Text>
          
          <Group>
            <Button
              variant="light"
              size="xs"
              leftIcon={<IconExternalLink size={14} />}
              component="a"
              href={`https://www.ensembl.org/Homo_sapiens/Gene/Summary?g=${gene.ensembl}`}
              target="_blank"
            >
              Ensembl
            </Button>
            
            {gene.geneSymbol && (
              <Button
                variant="light" 
                size="xs"
                leftIcon={<IconBrandGithub size={14} />}
                component="a"
                href={`https://www.genecards.org/cgi-bin/carddisp.pl?gene=${gene.geneSymbol}`}
                target="_blank"
              >
                GeneCards
              </Button>
            )}
          </Group>
        </Stack>
      </Card>

      {/* Placeholder for future features */}
      <Card 
        withBorder 
        c="dimmed"
        shadow="md"
        style={{
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          border: '1px solid #e2e8f0',
        }}
      >
        <Stack spacing="xs" align="center">
          <Text size="sm" ta="center">🚀 Coming Soon</Text>
          <Text size="xs" ta="center">
            • Gene expression data<br/>
            • Pathway analysis<br/>
            • Protein interactions
          </Text>
        </Stack>
      </Card>
    </Stack>
  );
};

export default GeneDetail;
