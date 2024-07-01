import { useAuth } from "@/AuthProvider";
import { AccountCircle } from "@mui/icons-material";
import { Button, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import SignInForm from "../auth/SignInForm";
import { useModal } from "../layout/Layout";
import SignUpForm from "../auth/SignUpForm";
import { AppBarLink } from "@/styles/mui-classes";
import Link from "next/link";
import { useRouter } from "next/router";
import { BLACK_COLOR } from "@/styles/constants";

const MobileMenu = ({
  isOpen,
  anchorEl,
  handleProfileMenuOpen,
  handleMobileMenuClose,
}: {
  isOpen: boolean;
  anchorEl: null | HTMLElement;
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMobileMenuClose: () => void;
}) => {
  const { handleModalComponent } = useModal();
  const router = useRouter();
  const { user, logout } = useAuth();
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="mobile-menu"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isOpen}
      onClose={handleMobileMenuClose}
    >
      {user ? (
        <>
          <MenuItem
            onClick={(e) => {
              handleMobileMenuClose();
              handleProfileMenuOpen(e);
              router.push("./statistics");
            }}
          >
            Statistiques
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleMobileMenuClose();
              handleProfileMenuOpen(e);
              router.push("./rides");
            }}
          >
            Trajets
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={(e) => {
              handleMobileMenuClose();
              handleProfileMenuOpen(e);
              router.push("./profil");
            }}
          >
            Profil
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleMobileMenuClose();
              handleProfileMenuOpen(e);
              logout();
            }}
          >
            Log out
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem
            onClick={(e) => {
              handleMobileMenuClose();
              handleModalComponent(<SignInForm />);
            }}
          >
            Sign In
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleMobileMenuClose();
              handleModalComponent(<SignUpForm />);
            }}
          >
            Sign Up
          </MenuItem>
        </>
      )}
    </Menu>
  );
};

export default MobileMenu;
