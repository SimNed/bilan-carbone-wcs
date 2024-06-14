import { SnackbarProvider } from "notistack";
import { Container } from "@mui/material";
import Header from "@/components/Header/Header";
import { ReactNode, createContext, useContext, useState } from "react";
import { useAuth } from "@/AuthProvider";
import SignInPage from "@/pages/sign-in";
import Modal from "../Modal/Modal";
import SignUpPage from "@/pages/sign-up";
import { ModalParams } from "@/type/ModalParams.type";

interface LayoutProps {
  children: ReactNode;
}

const ModalContext = createContext({
  handleOpenModal: () => {},
  handleCloseModal: () => {},
  handleModalParams: ({
    content,
    redirectionPath,
    subtitle,
  }: ModalParams) => {},
});

const Layout = ({ children }: LayoutProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState<ModalParams>({
    content: "",
    redirectionPath: "",
    subtitle: "",
  });

  const handleModalParams = (params: {
    content: string;
    redirectionpath?: string;
    subtitle?: string;
  }) => {
    setModalParams(params);
    handleOpenModal();
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const modalContextValue = {
    handleOpenModal,
    handleCloseModal,
    handleModalParams,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      <SnackbarProvider>
        <Header />
        <Container>{children}</Container>
        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            {modalParams.content === "signIn" ? (
              <SignInPage modalParams={modalParams} />
            ) : (
              <SignUpPage />
            )}
          </Modal>
        )}
      </SnackbarProvider>
    </ModalContext.Provider>
  );
};

export default Layout;

export const useModal = () => useContext(ModalContext);
