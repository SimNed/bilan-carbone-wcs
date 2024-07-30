import { SnackbarProvider } from "notistack";
import { Stack } from "@mui/material";
import Header from "@/components/headers/Header";
import { ReactNode, createContext, useContext, useState } from "react";
import Modal from "../modal/Modal";
import { DEFAULT_CONTENT_HEIGHT } from "@/styles/constants";

interface LayoutProps {
  children: ReactNode;
}

const ModalContext = createContext({
  handleOpenModal: () => {},
  handleCloseModal: () => {},
  handleModalComponent: (_component: ReactNode) => {},
});

const Layout = ({ children }: LayoutProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState<ReactNode | null>(null);

  const handleModalComponent = (component: ReactNode) => {
    setModalComponent(component);
    handleOpenModal();
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const modalContextValue = {
    handleOpenModal,
    handleCloseModal,
    handleModalComponent,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      <SnackbarProvider>
        <Stack maxWidth="100%" minHeight="100vh" component="main">
          <Header />
          <Stack
            maxWidth="inherit"
            minHeight={DEFAULT_CONTENT_HEIGHT}
            justifyContent="center"
            alignItems="center"
          >
            {children}
          </Stack>
        </Stack>
        {isModalOpen && modalComponent && (
          <Modal onClose={handleCloseModal}>{modalComponent}</Modal>
        )}
      </SnackbarProvider>
    </ModalContext.Provider>
  );
};

export default Layout;

export const useModal = () => useContext(ModalContext);
