import { useAuth } from "@/AuthProvider";
import { Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";

const ProfileMenu = ({
  isOpen,
  anchorEl,
  handleProfileMenuClose,
}: {
  isOpen: boolean;
  anchorEl: null | HTMLElement;
  handleProfileMenuClose: () => void;
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
      onClose={handleProfileMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleProfileMenuClose();
          router.push("./profil");
        }}
      >
        Profil
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleProfileMenuClose;
          logout();
        }}
      >
        Log Out
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
