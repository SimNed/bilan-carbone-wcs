import { useAuth } from "@/AuthProvider";
import { Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";

const HeaderProfilNav = ({
  isOpen,
  anchorEl,
  handleHeaderProfilNavClose,
}: {
  isOpen: boolean;
  anchorEl: null | HTMLElement;
  handleHeaderProfilNavClose: () => void;
}) => {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="profil-menu"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isOpen}
      onClose={handleHeaderProfilNavClose}
    >
      <MenuItem
        onClick={() => {
          handleHeaderProfilNavClose();
          router.push("./profil");
        }}
      >
        Profil
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleHeaderProfilNavClose;
          logout();
        }}
      >
        Log Out
      </MenuItem>
    </Menu>
  );
};

export default HeaderProfilNav;
