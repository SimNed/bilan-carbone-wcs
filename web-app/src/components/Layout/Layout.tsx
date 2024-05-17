import { ReactNode, useState } from 'react';
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';

import Modal from '../Modal/Modal';
import SignInPage from '@/pages/sign-in';
import SignUpPage from '@/pages/sign-up';

export default function Layout({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('signIn');

  const toggleModalContent = () => {
    setModalContent(modalContent === 'signIn' ? 'signUp' : 'signIn');
  };
  const handleOpenModal = () => {
    openModal();
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div>
        <AppBar position='static'>
          <Toolbar>
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1, cursor: 'pointer' }}
              onClick={() => (window.location.href = '/')}
            >
              Bilan carbone
            </Typography>
            <Button color='inherit' onClick={handleOpenModal}>
              Connexion
            </Button>
          </Toolbar>
        </AppBar>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
          }}
        >
          {children}
        </Container>

        {isModalOpen && (
          <Modal onClose={closeModal}>
            {modalContent === 'signIn' ? (
              <SignInPage
                onToggleModalContent={toggleModalContent}
                closeModal={closeModal}
              />
            ) : (
              <SignUpPage onToggleModalContent={toggleModalContent} />
            )}
          </Modal>
        )}
      </div>
    </>
  );
}
