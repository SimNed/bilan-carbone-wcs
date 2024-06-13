import { useState } from 'react';
import { SignUpMutation, SignUpMutationVariables } from '@/gql/graphql';
import { useMutation } from '@apollo/client';
import { TextField } from '@/components/Input/Input';
import { Button, Container, Link, Typography } from '@mui/material';
import { SIGN_UP_FORM } from '@/api-gql/mutations/user.mutations';

interface SignUpPageProps {
  onToggleModalContent: () => void;
}

export default function SignUpPage({ onToggleModalContent }: SignUpPageProps) {
  const [formData, setFormData] = useState<SignUpMutationVariables>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const updateFormData = (
    partialFormData: Partial<SignUpMutationVariables>
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const [signUpMutation] = useMutation<SignUpMutation, SignUpMutationVariables>(
    SIGN_UP_FORM
  );

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signUp = async () => {
    if (!isEmailValid(formData.email)) {
      setError("L'adresse email n'est pas valide.");
      return;
    }

    if (formData.password.length < 12) {
      setError('Le mot de passe doit comporter au moins 12 caractères.');
      return;
    }
    setError(null);
    try {
      const { data } = await signUpMutation({ variables: formData });
      if (data && data.signUp) {
        setTimeout(() => {
          onToggleModalContent();
        }, 300);
      }
    } catch (error: any) {
      if (
        error.graphQLErrors.some((e: any) =>
          e.message.includes('duplicate key value violates unique constraint')
        )
      ) {
        setError("L'adresse email est déjà utilisée.");
      } else {
        setError("Une erreur s'est produite. Veuillez réessayer.");
      }
    }
  };

  return (
    <>
      <Container
        component='main'
        maxWidth='xs'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '32px',
        }}
      >
        <Typography variant='h5'>Créer un compte</Typography>
        <form
          style={{ width: '100%', marginTop: '1rem' }}
          onSubmit={(event) => {
            event.preventDefault();
            signUp();
          }}
        >
          <Typography variant='body1'>Prénom :</Typography>
          <TextField
            style={{ marginBottom: '1rem', width: '100%' }}
            onChange={(event) => {
              updateFormData({ firstName: event.target.value });
            }}
          />
          <Typography variant='body1'>Nom :</Typography>
          <TextField
            style={{ marginBottom: '1rem', width: '100%' }}
            onChange={(event) => {
              updateFormData({ lastName: event.target.value });
            }}
          />
          <Typography variant='body1'>Adresse email :</Typography>
          <TextField
            style={{ marginBottom: '1rem', width: '100%' }}
            onChange={(event) => {
              updateFormData({ email: event.target.value });
            }}
          />
          <Typography variant='body1'>Mot de passe :</Typography>
          <TextField
            type='password'
            style={{ marginBottom: '1rem', width: '100%' }}
            onChange={(event) => {
              updateFormData({ password: event.target.value });
            }}
          />
          {error && (
            <Typography color='error' style={{ marginBottom: '1rem' }}>
              {error}
            </Typography>
          )}
          <div style={{ marginTop: '16px' }}>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              style={{ width: '100%' }}
            >
              Créer un compte
            </Button>
          </div>
        </form>
        <Typography>
          Vous avez déjà un compte ?{' '}
          <Link href='#' onClick={onToggleModalContent}>
            cliquez ici
          </Link>
        </Typography>
      </Container>
    </>
  );
}
