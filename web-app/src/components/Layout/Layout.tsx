import { SnackbarProvider } from "notistack";
import { Container } from "@mui/material";
import Header from "@/components/Header/Header";
import { ReactNode, createContext, useContext, useState } from "react";
import Modal from "../Modal/Modal";
import { HEADER_HEIGHT } from "@/styles/constants";

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
        <Header />
        <Container
          sx={{
            height: `calc(100vh - ${HEADER_HEIGHT})`,
            position: "relative",
            top: HEADER_HEIGHT,
          }}
          maxWidth={false}
          disableGutters
        >
          {children}
        </Container>
        {isModalOpen && modalComponent && (
          <Modal onClose={handleCloseModal}>{modalComponent}</Modal>
        )}
      </SnackbarProvider>
    </ModalContext.Provider>
  );
};

export default Layout;

export const useModal = () => useContext(ModalContext);
