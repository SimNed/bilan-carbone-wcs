import React from 'react';
import { Typography, Button, Container } from '@mui/material';

export default function BaselineMUI() {
  return (
    <Container maxWidth='sm'>
      <Typography
        variant='h4'
        align='center'
        gutterBottom
        style={{ marginTop: '2rem' }}
      >
        Calculez votre empreinte carbone simplement 👇🏻
      </Typography>
      <div style={{ marginTop: '1rem' }}>
        <Button
          href='./carbonEmissionPage'
          variant='contained'
          size='large'
          color='primary'
          style={{ width: '100%', marginBottom: '1rem' }}
        >
          Ajouter une dépense carbone
        </Button>
        <Button
          href='./profil'
          variant='contained'
          size='large'
          color='primary'
          style={{ width: '100%' }}
        >
          Voir mes dépenses carbone
        </Button>
      </div>
    </Container>
  );
}
