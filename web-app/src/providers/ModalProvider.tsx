import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/system";
import {
  useState,
  ReactNode,
  useEffect,
  createContext,
  useContext,
} from "react";
import BaseModal from "../components/modal/BaseModal";

type ModalContextType = {
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleModalResponsive: () => void;
  handleModalComponent: (_component: ReactNode) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalResponsive, setIsModalResponsive] = useState(false);
  const [modalComponent, setModalComponent] = useState<ReactNode | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleModalResponsive = () => {
    setIsModalResponsive(true);
  };

  const handleModalComponent = (component: ReactNode) => {
    setModalComponent(component);
    handleOpenModal();
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (isModalResponsive && isModalOpen && !isSmallScreen) {
      setIsModalOpen(false);
    }
  }, [isSmallScreen]);

  return (
    <ModalContext.Provider
      value={{
        handleOpenModal,
        handleCloseModal,
        handleModalResponsive,
        handleModalComponent,
      }}
    >
      {children}
      {modalComponent && (
        <BaseModal open={isModalOpen} onClose={handleCloseModal}>
          {modalComponent}
        </BaseModal>
      )}
    </ModalContext.Provider>
  );
};

export function useModal() {
  return useContext(ModalContext) as ModalContextType;
}
