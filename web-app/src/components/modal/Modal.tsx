import { ReactNode } from "react";
import { ModalContent, ModalOverlay } from "./Modal.styled";

const Modal = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContent aria-modal>{children}</ModalContent>
    </>
  );
};

export default Modal;
