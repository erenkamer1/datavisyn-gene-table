import { useState, useEffect } from 'react';
import { MantineProvider, Container, Title, Text, Group, Flex, Box, Paper, Loader, Center, Alert } from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';
import { IconDna, IconTestPipe, IconAlertCircle } from '@tabler/icons-react';
import GeneTable from './components/GeneTable';
import GeneDetail from './components/GeneDetail';
import { Gene } from './types/gene';
import { loadGenesFromCSV, getSampleGeneData } from './utils/csvParser';

function App() {
  const [selectedGene, setSelectedGene] = useState<Gene | null>(null);
  const [geneData, setGeneData] = useState<Gene[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleGeneSelect = (gene: Gene) => {
    setSelectedGene(gene);
  };

  // Load gene data from CSV file
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await loadGenesFromCSV();
        
        if (result.errors.length > 0) {
          notifications.show({
            title: 'Data Loading Warning',
            message: `${result.meta.invalidRows} rows skipped. Total ${result.meta.validRows} genes loaded.`,
            color: 'yellow',
            icon: <IconAlertCircle size="1rem" />,
          });
        }
        
        if (result.data.length === 0) {
          // Use sample data if CSV cannot be loaded
          const sampleData = getSampleGeneData();
          setGeneData(sampleData);
          setError('CSV file could not be loaded, showing sample data.');
          notifications.show({
            title: 'Info',
            message: 'CSV file could not be loaded. Showing sample data.',
            color: 'blue',
            icon: <IconDna size="1rem" />,
          });
        } else {
          setGeneData(result.data);
          notifications.show({
            title: 'Success!',
            message: `${result.data.length} genes loaded successfully.`,
            color: 'green',
            icon: <IconDna size="1rem" />,
          });
        }
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        
        // Use sample data in case of error
        const sampleData = getSampleGeneData();
        setGeneData(sampleData);
        
        notifications.show({
          title: 'Error!',
          message: 'An error occurred while loading gene data. Showing sample data.',
          color: 'red',
          icon: <IconAlertCircle size="1rem" />,
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <Box style={{ width: '100vw', minHeight: '100vh', margin: 0, padding: '20px' }}>
      <MantineProvider 
        withGlobalStyles 
        withNormalizeCSS
        theme={{
          primaryColor: 'blue',
          colorScheme: 'light',
          fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif'
        }}
      >
      <Notifications />
      
      {/* Header */}
      <Paper 
        shadow="lg" 
        p="xl" 
        mb="md"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '16px',
          width: '100%',
        }}
      >
        <Box style={{ width: '100%', maxWidth: 'none' }}>
          <Flex align="center" justify="space-between">
            <Group spacing="lg">
              <Box
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '50%',
                  padding: '12px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <IconDna size={36} color="white" />
              </Box>
              <div>
                <Title 
                  order={1} 
                  style={{ 
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '2.2rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  Datavisyn Gene Explorer
                </Title>
                <Text 
                  size="lg" 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 500
                  }}
                >
                  Advanced Genomic Data Analysis Platform
                </Text>
                <Text 
                  size="sm" 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontWeight: 400,
                    marginTop: '4px'
                  }}
                >
                  Developed by Eren Kamer
                </Text>
              </div>
            </Group>
            <Group spacing="md">
              <Box
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Group spacing="xs">
                  <IconTestPipe size={20} color="white" />
                  <Text size="md" fw={600} style={{ color: 'white' }}>
                    {geneData.length.toLocaleString()}
                  </Text>
                  <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    genes loaded
                  </Text>
                </Group>
              </Box>
            </Group>
          </Flex>
        </Box>
      </Paper>

      {/* Main Content */}
      <Box
        style={{
          background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
          minHeight: '100vh',
          padding: '20px',
          borderRadius: '16px',
          width: '100%',
          maxWidth: 'none',
        }}
      >
        {/* Loading State */}
        {loading && (
          <Center py="xl">
            <Box
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '16px',
                padding: '40px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              }}
            >
              <Group spacing="lg">
                <Loader size="lg" color="blue" />
                <Text size="lg" fw={500} c="dimmed">Loading gene data...</Text>
              </Group>
            </Box>
          </Center>
        )}

        {/* Error State */}
        {error && !loading && (
          <Alert 
            icon={<IconAlertCircle size="1rem" />} 
            title="Warning" 
            color="yellow" 
            mb="md"
            style={{
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              border: '1px solid #f59e0b',
            }}
          >
            {error}
          </Alert>
        )}

        {/* Main Content */}
        {!loading && (
          <Flex gap="xl" style={{ width: '100%' }}>
            {/* Gene Table */}
            <Box 
              style={{ 
                flex: selectedGene ? '1 1 65%' : '1 1 100%',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                minWidth: '0',
              }}
            >
              <GeneTable 
                data={geneData}
                onGeneSelect={handleGeneSelect}
                loading={loading}
                error={error || undefined}
              />
            </Box>

            {/* Gene Detail Sidebar */}
            {selectedGene && (
              <Box style={{ flex: '0 0 380px', minWidth: '380px' }}>
                <Box
                  style={{ 
                    position: 'sticky', 
                    top: '20px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  }}
                >
                  <GeneDetail 
                    gene={selectedGene} 
                    onClose={() => setSelectedGene(null)} 
                  />
                </Box>
              </Box>
            )}
          </Flex>
        )}
      </Box>
    </MantineProvider>
    </Box>
  );
}

export default App
