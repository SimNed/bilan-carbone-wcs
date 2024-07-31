import { SnackbarProvider } from "notistack";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import Header from "@/components/headers/Header";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import BaseModal from "../modal/BaseModal";
import { DEFAULT_CONTENT_HEIGHT } from "@/styles/constants";

interface LayoutProps {
  children: ReactNode;
}

const ModalContext = createContext({
  handleOpenModal: () => {},
  handleCloseModal: () => {},
  handleModalResponsive: () => {},
  handleModalComponent: (_component: ReactNode) => {},
});

const Layout = ({ children }: LayoutProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalResponsive, setIsModalResponsive] = useState(false);
  const [modalComponent, setModalComponent] = useState<ReactNode | null>(null);

  const handleModalComponent = (component: ReactNode) => {
    setModalComponent(component);
    handleOpenModal();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleModalResponsive = () => {
    setIsModalResponsive(true);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleCloseModal = () => setIsModalOpen(false);

  const modalContextValue = {
    handleOpenModal,
    handleCloseModal,
    handleModalResponsive,
    handleModalComponent,
  };

  useEffect(() => {
    if (isModalResponsive && isModalOpen && !isSmallScreen)
      setIsModalOpen(false);
  }, [isSmallScreen]);

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
        {modalComponent && (
          <BaseModal open={isModalOpen} onClose={handleCloseModal}>
            {modalComponent}
          </BaseModal>
        )}
      </SnackbarProvider>
    </ModalContext.Provider>
  );
};

export default Layout;

export const useModal = () => useContext(ModalContext);
