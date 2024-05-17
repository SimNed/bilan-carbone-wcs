import Layout from '@/components/Layout/Layout';
import BaselineMUI from '@/pages/home_page/components/Baseline/BaselineMUI';
import { Box, Grid } from '@mui/material';

export default function HomePage() {
  return (
    <Layout>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
        style={{ minHeight: '80vh' }}
      >
        <Box>
          <BaselineMUI />
        </Box>
      </Grid>
    </Layout>
  );
}
