import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import { useState } from "react";
import Modal from "../Modal/Modal";
import SignInPage from "@/pages/sign-in";
import SignUpPage from "@/pages/sign-up";
import PublicIcon from "@mui/icons-material/Public";
import Link from "next/link";
import { Link as MUILink } from "@mui/material";
import { AppBarLink } from "@/styles/mui-classes";
import { useAuth } from "@/AuthProvider";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("signIn");
  const { user, logout } = useAuth();

  const toggleModalContent = () => {
    setModalContent(modalContent === "signIn" ? "signUp" : "signIn");
  };
  const handleOpenModal = () => {
    openModal();
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <AppBar position="static">
      <Toolbar
        disableGutters
        sx={{
          height: "inherit",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={0} sx={{ height: "inherit" }}>
          <AppBarLink href="/">
            <PublicIcon sx={{ mr: 1 }} /> Bilan Carbone
          </AppBarLink>
          <AppBarLink href="/">Données monde</AppBarLink>
          <AppBarLink href="/">Données france</AppBarLink>
        </Stack>

        <Stack direction="row" spacing={3} sx={{ mr: 3 }}>
          {user ? (
            <Button color="primary" variant="outlined" onClick={logout}>
              Log Out
            </Button>
          ) : (
            <>
              <Button
                color="primary"
                variant="outlined"
                onClick={handleOpenModal}
              >
                Sign In
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={handleOpenModal}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          {modalContent === "signIn" ? (
            <SignInPage
              onToggleModalContent={toggleModalContent}
              closeModal={closeModal}
            />
          ) : (
            <SignUpPage onToggleModalContent={toggleModalContent} />
          )}
        </Modal>
      )}
    </AppBar>
  );
};

export default Header;
