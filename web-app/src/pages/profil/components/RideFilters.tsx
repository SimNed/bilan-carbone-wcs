import { GET_TRANSPORTATIONS } from '@/api-gql/queries/transportation.queries';
import { GetTransportationsQuery } from '@/gql/graphql';
import { RideFilterData } from '@/type/RideFilterData.type';
import { capitalizeFirstLetter } from '@/utils';
import { useQuery } from '@apollo/client';
import {
  Container,
  Button,
  Select,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';

const RideFilters = ({
  handleRideFilter,
  closeModal,
}: {
  handleRideFilter: (filterData: RideFilterData) => void;
  closeModal: () => void;
}) => {
  const [filterData, setFilterData] = useState<RideFilterData>({});

  const { data } = useQuery<GetTransportationsQuery>(GET_TRANSPORTATIONS);

  const handleClearFilters = () => {
    const clearedFilterData: RideFilterData = {};
    setFilterData(clearedFilterData);
    handleRideFilter(clearedFilterData);
    closeModal();
  };

  return (
    <Container component='main' maxWidth='md'>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleRideFilter(filterData);
        }}
      >
        <div
          style={{
            width: '100%',
            marginTop: '1rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body1'>Nom du trajet:</Typography>
            <TextField
              placeholder='Rechercher'
              value={filterData.label || ''}
              onChange={(e) =>
                setFilterData({ ...filterData, label: e.target.value })
              }
              sx={{ marginBottom: '1rem', width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body1'>A partir du :</Typography>
            <TextField
              type='date'
              value={
                filterData.startDate
                  ? filterData.startDate.toISOString().split('T')[0]
                  : ''
              }
              onChange={(event) => {
                setFilterData({
                  ...filterData,
                  startDate: new Date(event.target.value),
                });
              }}
              sx={{ marginBottom: '1rem', width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body1'>Jusqu'au :</Typography>
            <TextField
              type='date'
              value={
                filterData.endDate
                  ? filterData.endDate.toISOString().split('T')[0]
                  : ''
              }
              onChange={(event) => {
                setFilterData({
                  ...filterData,
                  endDate: new Date(event.target.value),
                });
              }}
              sx={{ marginBottom: '1rem', width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body1'>Distance minimum :</Typography>
            <TextField
              type='number'
              value={filterData.minDistance || ''}
              onChange={(event) => {
                setFilterData({
                  ...filterData,
                  minDistance: parseInt(event.target.value),
                });
              }}
              sx={{ marginBottom: '1rem', width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body1'>Distance maximum :</Typography>
            <TextField
              type='number'
              value={filterData.maxDistance || ''}
              onChange={(event) => {
                setFilterData({
                  ...filterData,
                  maxDistance: parseInt(event.target.value),
                });
              }}
              sx={{ marginBottom: '1rem', width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body1'>Moyen de transport :</Typography>
            <Select
              value={filterData.transportationMode || ''}
              onChange={(event) => {
                setFilterData({
                  ...filterData,
                  transportationMode: event.target.value,
                });
              }}
              sx={{ marginBottom: '1rem', width: '100%' }}
            >
              {data?.transportations.map((transportation) => (
                <MenuItem key={transportation.id} value={transportation.label}>
                  {capitalizeFirstLetter(transportation.label)}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>

        <div style={{ marginTop: '16px', display: 'flex', gap: '1rem' }}>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            sx={{ flex: 1 }}
          >
            Rechercher
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            onClick={handleClearFilters}
            sx={{ flex: 1 }}
          >
            Effacer les filtres
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default RideFilters;
