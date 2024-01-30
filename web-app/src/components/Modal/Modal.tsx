import { ReactNode } from "react";
import * as styled from "./Modal.styled";

const Modal = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
  return (
    <>
      <styled.ModalOverlay onClick={onClose} />
      <styled.Modal aria-modal>{children}</styled.Modal>
    </>
  );
};

export default Modal;
export { ModalContainer } from "./Modal.styled";
