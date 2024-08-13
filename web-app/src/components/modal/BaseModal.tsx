import { ReactNode } from "react";
import { Stack } from "@mui/material";

import Modal from "@mui/material/Modal";
import { WHITE_COLOR } from "@/styles/constants";

interface BaseModalProps {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
}

const BaseModal = ({ open = false, children, onClose }: BaseModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        position="absolute"
        top="50%"
        left="50%"
        minWidth="500px"
        maxWidth="660px"
        minHeight="256px"
        sx={{
          transform: "translate(-50%, -50%)",
          backgroundColor: WHITE_COLOR,
        }}
      >
        {children}
      </Stack>
    </Modal>
  );
};

export default BaseModal;
