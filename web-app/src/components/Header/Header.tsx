import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import Modal from "../Modal/Modal";
import SignInPage from "@/pages/sign-in";
import SignUpPage from "@/pages/sign-up";
import PublicIcon from "@mui/icons-material/Public";
import { HEADER_HEIGHT, WARNING_COLOR } from "@/styles/constants";
import Link from "next/link";
import { Link as MUILink } from "@mui/material";
import { useStyles } from "@/styles/mui-classes";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("signIn");

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

  const classes = useStyles();

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
          <Link href="/" style={{ height: "100%", textDecoration: "none" }}>
            <MUILink className={classes.appBarLink}>
              <PublicIcon sx={{ mr: 1 }} /> Bilan Carbone
            </MUILink>
          </Link>
          <Link
            href="/world_carbone_map"
            style={{ height: "100%", textDecoration: "none" }}
          >
            <MUILink className={classes.appBarLink}>Données monde</MUILink>
          </Link>
          <Link href="/" style={{ height: "100%", textDecoration: "none" }}>
            <MUILink className={classes.appBarLink}>Données france</MUILink>
          </Link>
        </Stack>

        <Stack direction="row" spacing={3} sx={{ mr: 3 }}>
          <Button color="primary" variant="outlined" onClick={handleOpenModal}>
            Sign In
          </Button>
          <Button color="primary" variant="contained" onClick={handleOpenModal}>
            Sign Up
          </Button>
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
