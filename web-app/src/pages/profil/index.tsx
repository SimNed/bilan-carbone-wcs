import { formatDateToDisplay, getDefaultUser } from '@/utils';
import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { GetRidesQuery } from '@/gql/graphql';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent, Grid, Typography } from '@mui/material';

export default function ProfilPage() {
  const defaultUser = getDefaultUser();

  const GET_RIDES = gql`
    query GetRides {
      rides {
        id
        label
        distance
        date
        transportation {
          id
          label
          carboneEmission
        }
      }
    }
  `;
  const { data, refetch } = useQuery<GetRidesQuery>(GET_RIDES);

  useEffect(() => {
    refetch();
  }, []);

  // Calcul du nombre de trajets
  let NbRides = 0;
  if (data && data.rides.length > 0) {
    NbRides = data.rides.length;
  }

  // Calcul de la dépense totale en CO2
  let totalCO2 = 0;
  if (data && data.rides.length > 0) {
    totalCO2 = data.rides.reduce(
      (accumulator, ride) =>
        accumulator +
        (ride.distance * ride.transportation.carboneEmission) / 1000,
      0
    );
  }

  return (
    <>
      <Layout>
        <div style={{ padding: '1.5rem' }}>
          <Typography variant='h4' style={{ marginBottom: '1.5rem' }}>
            Mon Profil :
          </Typography>

          <div style={{ marginBottom: '1.5rem' }}>
            <Grid container spacing={3} justifyContent='space-around'>
              <Grid item xs={12} sm={6} md={3}>
                <Card style={{ minWidth: '150px', textAlign: 'center' }}>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      Nombre de trajets réalisés :
                    </Typography>
                    <Typography variant='h4'>{NbRides}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card style={{ minWidth: '150px', textAlign: 'center' }}>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      Total émission de CO2 :
                    </Typography>
                    <Typography variant='h4'>{totalCO2}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>

          <Typography variant='h5' gutterBottom>
            Trajets effectués :
          </Typography>

          <Grid container spacing={3}>
            {data &&
              data.rides.map((ride) => (
                <Grid item xs={12} sm={6} md={4} key={ride.id}>
                  <Card
                    style={{
                      width: '110%',
                      marginBottom: '2rem',
                      marginTop: '2rem',
                    }}
                  >
                    <CardContent style={{ padding: '1rem' }}>
                      <Typography
                        variant='h6'
                        gutterBottom
                        style={{ marginBottom: '0.5rem' }}
                      >
                        {ride.label}
                      </Typography>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <Typography variant='body1'>
                          <strong>Date:</strong>{' '}
                          {formatDateToDisplay(ride.date)}
                        </Typography>
                        <Typography variant='body1'>
                          <strong>Moyen de transport:</strong>{' '}
                          {ride.transportation.label}
                        </Typography>
                        <Typography variant='body1'>
                          <strong>Distance:</strong> {ride.distance} km
                        </Typography>
                        <Typography variant='body1'>
                          <strong>Émission CO2:</strong>{' '}
                          {(ride.distance *
                            ride.transportation.carboneEmission) /
                            1000}{' '}
                          kg
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </div>
      </Layout>
    </>
  );
}
