import { AppBarLink } from "@/styles/mui-classes";
import { Menu, MenuItem } from "@mui/material";

const HeaderNav = ({
  isOpen,
  anchorEl,
  handleHeaderNavMenuClose,
}: {
  isOpen: boolean;
  anchorEl: null | HTMLElement;
  handleHeaderNavMenuClose: () => void;
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      id="header-nav-mobile-menu"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={isOpen}
      onClose={handleHeaderNavMenuClose}
    >
      <MenuItem>
        <AppBarLink href="./">BC</AppBarLink>
      </MenuItem>
      <MenuItem>
        <AppBarLink href="./world-footprint-map">Données monde</AppBarLink>
      </MenuItem>
      <MenuItem>
        <AppBarLink href="./">Données france</AppBarLink>
      </MenuItem>
    </Menu>
  );
};

export default HeaderNav;
